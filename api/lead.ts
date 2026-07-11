import type { VercelRequest, VercelResponse } from "@vercel/node";

interface CanonicalPayload {
  request_id: string;
  submitted_at: string;
  source: string;
  page_url: string;
  name: string;
  phone: string;
  email?: string;
  vehicle_year: number;
  vehicle_make: string;
  vehicle_model: string;
  mileage?: number | null;
  drivable?: boolean | null;
  warning_lights?: string[];
  service_type: string;
  symptoms: string;
  preferred_contact: string;
  preferred_date?: string;
  preferred_time?: string;
  sms_consent: boolean;
  campaign?: string;
  referrer?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now();
  const requestId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

  // 1. Accept POST only
  if (req.method !== "POST") {
    console.warn(
      JSON.stringify({
        requestId,
        status: "rejected",
        reason: "method_not_allowed",
        method: req.method,
      })
    );
    res.setHeader("Allow", "POST");
    return res.status(455).json({ error: "Method not allowed. Only POST is accepted." });
  }

  // 2. Reject unsupported content types
  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("application/json")) {
    console.warn(
      JSON.stringify({
        requestId,
        status: "rejected",
        reason: "unsupported_content_type",
        contentType,
      })
    );
    return res
      .status(415)
      .json({ error: "Unsupported media type. Only application/json is accepted." });
  }

  try {
    const body = req.body;

    // 3. Honeypot check (hidden fields commonly filled by spam bots)
    if (body.website_url || body.fax_number || body.zipcode_check) {
      console.warn(JSON.stringify({ requestId, status: "rejected", reason: "honeypot_triggered" }));
      // Return a fake success to confuse the spam bot
      return res.status(200).json({ success: true, message: "Request received successfully." });
    }

    // 4. Validate and Parse Schema
    const {
      name,
      phone,
      email,
      year,
      make,
      model,
      vin,
      service,
      message,
      mileage,
      drivable,
      warning_lights,
      preferred_contact,
      preferred_date,
      preferred_time,
      sms_consent,
      page_url,
      referrer,
      campaign,
    } = body;

    // Required fields check
    if (!name || !phone || !year || !make || !model || !service || !message) {
      console.warn(
        JSON.stringify({ requestId, status: "rejected", reason: "missing_required_fields" })
      );
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Length limit checks to prevent buffer overflow/abuse
    if (
      name.length > 100 ||
      phone.length > 30 ||
      (email && email.length > 100) ||
      make.length > 50 ||
      model.length > 50 ||
      (vin && vin.length > 17) ||
      service.length > 50 ||
      message.length > 2000
    ) {
      console.warn(
        JSON.stringify({ requestId, status: "rejected", reason: "length_limits_exceeded" })
      );
      return res.status(400).json({ error: "Invalid field lengths. Please shorten your inputs." });
    }

    // Normalizations
    const normalizedName = name.trim();
    const normalizedPhone = phone.replace(/[^\d+()-\s]/g, "").trim();
    const normalizedEmail = email ? email.trim().toLowerCase() : "";
    const normalizedMake = make.trim();
    const normalizedModel = model.trim();
    const normalizedSymptoms = message.trim();
    const parsedYear = parseInt(year, 10);
    const parsedMileage = mileage ? parseInt(mileage, 10) : null;
    const isDrivable = drivable === true || drivable === "true";
    const hasSmsConsent = sms_consent === true || sms_consent === "true";

    // Validate email format if provided
    if (normalizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Validate phone length
    if (normalizedPhone.length < 7) {
      return res.status(400).json({ error: "Invalid phone number." });
    }

    // Validate year range
    if (isNaN(parsedYear) || parsedYear < 1900 || parsedYear > new Date().getFullYear() + 2) {
      return res.status(400).json({ error: "Invalid vehicle year." });
    }

    // 5. Bot Verification Provider check
    const botSecret = process.env.TURNSTILE_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY;
    const botResponse = body["cf-turnstile-response"] || body["g-recaptcha-response"];

    if (botSecret && botResponse) {
      const verifyUrl = process.env.TURNSTILE_SECRET_KEY
        ? "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        : "https://www.google.com/recaptcha/api/siteverify";

      try {
        const verifyRes = await fetch(verifyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(botSecret)}&response=${encodeURIComponent(botResponse)}`,
        });
        const verifyJson = (await verifyRes.json()) as { success: boolean };
        if (!verifyJson.success) {
          console.warn(
            JSON.stringify({ requestId, status: "rejected", reason: "bot_verification_failed" })
          );
          return res.status(400).json({ error: "Bot verification failed. Please try again." });
        }
      } catch (err) {
        console.error(
          JSON.stringify({
            requestId,
            status: "error",
            message: "bot_verification_error",
            error: String(err),
          })
        );
        // Fail-safe: don't block genuine users if verification service is down, but log it
      }
    }

    // 6. Build Canonical Payload
    const canonicalPayload: CanonicalPayload = {
      request_id: requestId,
      submitted_at: new Date().toISOString(),
      source: "website",
      page_url: page_url || "",
      name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail || undefined,
      vehicle_year: parsedYear,
      vehicle_make: normalizedMake,
      vehicle_model: normalizedModel,
      mileage: parsedMileage,
      drivable: isDrivable,
      warning_lights: Array.isArray(warning_lights) ? warning_lights : [],
      service_type: service,
      symptoms: normalizedSymptoms,
      preferred_contact: preferred_contact || "phone",
      preferred_date: preferred_date || undefined,
      preferred_time: preferred_time || undefined,
      sms_consent: hasSmsConsent,
      campaign: campaign || undefined,
      referrer: referrer || undefined,
    };

    // 7. Backward Compatibility Adapter for Legacy n8n Workflow
    const webhookUrl = process.env.N8N_ANAHEIM_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_ANAHEIM_WEBHOOK_SECRET;

    if (!webhookUrl) {
      // In development or if not configured, log it and return success for preview testing
      console.warn(
        JSON.stringify({
          requestId,
          status: "warning",
          message: "N8N_ANAHEIM_WEBHOOK_URL not configured",
        })
      );
      return res.status(200).json({
        success: true,
        message: "Estimate request simulated successfully (Development Mode).",
        request_id: requestId,
      });
    }

    // Format job description combining vehicle specs for the legacy n8n parser
    const vehicleLabel = `${canonicalPayload.vehicle_year} ${canonicalPayload.vehicle_make} ${canonicalPayload.vehicle_model}`;
    const warningLabel =
      canonicalPayload.warning_lights && canonicalPayload.warning_lights.length > 0
        ? `Warning Lights: ${canonicalPayload.warning_lights.join(", ")}`
        : "No Warning Lights";
    const mileageLabel = canonicalPayload.mileage ? `Mileage: ${canonicalPayload.mileage}` : "";
    const drivableLabel =
      canonicalPayload.drivable !== undefined
        ? `Drivable: ${canonicalPayload.drivable ? "Yes" : "No"}`
        : "";

    const combinedJobDesc = [
      `Vehicle: ${vehicleLabel}`,
      vin ? `VIN: ${vin}` : "",
      mileageLabel,
      drivableLabel,
      warningLabel,
      `Symptoms: ${canonicalPayload.symptoms}`,
      `Preferred Contact: ${canonicalPayload.preferred_contact}`,
      `SMS Marketing Consent: ${canonicalPayload.sms_consent ? "Granted" : "Not Granted"}`,
    ]
      .filter(Boolean)
      .join("\n");

    const compatibilityPayload = {
      name: canonicalPayload.name,
      phone: canonicalPayload.phone,
      email: canonicalPayload.email || "",
      service_type: canonicalPayload.service_type,
      job_description: combinedJobDesc,
      property_address: "", // Deprecated, sent as empty
      preferred_date: canonicalPayload.preferred_date || "",
      preferred_time: canonicalPayload.preferred_time || "",
      request_type: "quote",
      message: combinedJobDesc,
      canonical: canonicalPayload, // Append nested canonical payload for future compatibility
    };

    // 8. Forward to n8n with timeout and authorization headers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (webhookSecret) {
      headers["Authorization"] = `Bearer ${webhookSecret}`;
      headers["X-Anaheim-Signature"] = webhookSecret;
    }

    try {
      const n8nRes = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(compatibilityPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const durationMs = Date.now() - startTime;

      if (!n8nRes.ok) {
        console.error(
          JSON.stringify({
            requestId,
            status: "failed",
            reason: "n8n_error_response",
            statusCode: n8nRes.status,
            durationMs,
          })
        );
        return res.status(502).json({ error: "Failed to forward request to dispatch webhook." });
      }

      console.log(
        JSON.stringify({
          requestId,
          status: "success",
          serviceType: canonicalPayload.service_type,
          durationMs,
        })
      );

      return res.status(200).json({
        success: true,
        message: "Estimate request submitted successfully.",
        request_id: requestId,
      });
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      const durationMs = Date.now() - startTime;

      if (fetchErr.name === "AbortError") {
        console.error(
          JSON.stringify({ requestId, status: "failed", reason: "n8n_timeout", durationMs })
        );
        return res.status(504).json({ error: "Connection to dispatch system timed out." });
      }

      console.error(
        JSON.stringify({
          requestId,
          status: "error",
          reason: "forward_failed",
          error: String(fetchErr),
          durationMs,
        })
      );
      return res.status(502).json({ error: "Failed to connect to dispatch system." });
    }
  } catch (parseErr) {
    console.error(
      JSON.stringify({
        requestId,
        status: "error",
        reason: "json_parse_failed",
        error: String(parseErr),
      })
    );
    return res.status(400).json({ error: "Invalid JSON format." });
  }
}
