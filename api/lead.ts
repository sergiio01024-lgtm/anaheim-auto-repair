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

function validateInput(body: any): { isValid: boolean; error?: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { isValid: false, error: "Invalid payload format." };
  }

  // Honeypots must be strings if provided
  if (body.website_url !== undefined && typeof body.website_url !== "string") {
    return { isValid: false, error: "Invalid honeypot type." };
  }
  if (body.fax_number !== undefined && typeof body.fax_number !== "string") {
    return { isValid: false, error: "Invalid honeypot type." };
  }
  if (body.zipcode_check !== undefined && typeof body.zipcode_check !== "string") {
    return { isValid: false, error: "Invalid honeypot type." };
  }

  // Required string fields
  if (typeof body.name !== "string" || body.name.trim().length === 0 || body.name.length > 100) {
    return { isValid: false, error: "Name must be a string between 1 and 100 characters." };
  }
  if (typeof body.phone !== "string" || body.phone.trim().length === 0) {
    return { isValid: false, error: "Phone number is required." };
  }
  const digitCount = body.phone.replace(/\D/g, "").length;
  if (digitCount < 7 || digitCount > 15) {
    return { isValid: false, error: "Phone number must have between 7 and 15 digits." };
  }

  // Required service Whitelist
  const serviceWhitelist = [
    "muffler-exhaust",
    "catalytic-converters",
    "brakes-suspension",
    "engine-diagnostics",
    "transmission-service",
    "routine-maintenance",
    "other"
  ];
  if (typeof body.service !== "string" || !serviceWhitelist.includes(body.service)) {
    return { isValid: false, error: "Invalid service category." };
  }

  // Required message
  if (typeof body.message !== "string" || body.message.trim().length === 0 || body.message.length > 2000) {
    return { isValid: false, error: "Issue description must be a string between 1 and 2000 characters." };
  }

  // Required make & model
  if (typeof body.make !== "string" || body.make.trim().length === 0 || body.make.length > 50) {
    return { isValid: false, error: "Vehicle make must be a string between 1 and 50 characters." };
  }
  if (typeof body.model !== "string" || body.model.trim().length === 0 || body.model.length > 50) {
    return { isValid: false, error: "Vehicle model must be a string between 1 and 50 characters." };
  }

  // Required year (integer from 1900 to currentYear + 2)
  const yearNum = Number(body.year);
  const currentYear = new Date().getFullYear();
  if (
    body.year === undefined ||
    body.year === null ||
    body.year === "" ||
    typeof body.year === "object" ||
    Array.isArray(body.year) ||
    isNaN(yearNum) ||
    !Number.isInteger(yearNum) ||
    yearNum < 1900 ||
    yearNum > currentYear + 2
  ) {
    return { isValid: false, error: `Vehicle year must be an integer between 1900 and ${currentYear + 2}.` };
  }

  // Email validation
  if (body.email !== undefined && body.email !== null && body.email !== "") {
    if (typeof body.email !== "string" || body.email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return { isValid: false, error: "Invalid email address format." };
    }
  }

  // Preferred contact method
  const preferredContactWhitelist = ["phone", "sms", "email"];
  if (body.preferred_contact !== undefined && !preferredContactWhitelist.includes(body.preferred_contact)) {
    return { isValid: false, error: "Invalid preferred contact method." };
  }
  if (body.preferred_contact === "email") {
    if (!body.email || typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return { isValid: false, error: "Email address is required when preferred contact method is email." };
    }
  }

  // VIN validation
  if (body.vin !== undefined && body.vin !== null && body.vin !== "") {
    if (typeof body.vin !== "string" || body.vin.length > 17 || !/^[A-HJ-NPR-Z0-9]{1,17}$/i.test(body.vin)) {
      return { isValid: false, error: "Invalid VIN format." };
    }
  }

  // Mileage validation
  if (body.mileage !== undefined && body.mileage !== null && body.mileage !== "") {
    const milNum = Number(body.mileage);
    if (
      typeof body.mileage === "object" ||
      Array.isArray(body.mileage) ||
      isNaN(milNum) ||
      !Number.isInteger(milNum) ||
      milNum < 0 ||
      milNum > 999999
    ) {
      return { isValid: false, error: "Mileage must be a non-negative integer up to 999,999." };
    }
  }

  // Drivable validation
  if (body.drivable !== undefined && body.drivable !== null && body.drivable !== "") {
    if (
      body.drivable !== true &&
      body.drivable !== false &&
      body.drivable !== "true" &&
      body.drivable !== "false"
    ) {
      return { isValid: false, error: "Drivable must be a boolean or null." };
    }
  }

  // Warning lights validation
  if (body.warning_lights !== undefined && body.warning_lights !== null) {
    if (!Array.isArray(body.warning_lights)) {
      return { isValid: false, error: "Warning lights must be an array." };
    }
    const warningLightsWhitelist = [
      "Check Engine",
      "ABS / Braking",
      "Battery / Charging",
      "Traction / Stability",
      "Airbag / SRS"
    ];
    for (const light of body.warning_lights) {
      if (typeof light !== "string" || !warningLightsWhitelist.includes(light)) {
        return { isValid: false, error: "Invalid warning light selection." };
      }
    }
  }

  // Appointment date
  const dateWhitelist = ["", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  if (body.preferred_date !== undefined && typeof body.preferred_date === "string") {
    if (!dateWhitelist.includes(body.preferred_date.toLowerCase())) {
      return { isValid: false, error: "Invalid preferred date." };
    }
  }

  // Preferred time
  if (body.preferred_time !== undefined && typeof body.preferred_time === "string") {
    if (body.preferred_time.length > 50) {
      return { isValid: false, error: "Preferred time is too long." };
    }
  }

  // Bounded optional strings
  const stringLimits = { page_url: 200, referrer: 200, campaign: 200 };
  for (const [key, limit] of Object.entries(stringLimits)) {
    const val = body[key];
    if (val !== undefined && val !== null) {
      if (typeof val !== "string" || val.length > limit) {
        return { isValid: false, error: `${key} must be a string up to ${limit} characters.` };
      }
    }
  }

  return { isValid: true };
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
    return res.status(405).json({ error: "Method not allowed. Only POST is accepted." });
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

    // 4. Validate Schema (Fail closed on type issues)
    const validationResult = validateInput(body);
    if (!validationResult.isValid) {
      console.warn(
        JSON.stringify({
          requestId,
          status: "rejected",
          reason: "validation_failed",
          error: validationResult.error
        })
      );
      return res.status(400).json({ error: validationResult.error });
    }

    // 5. Bot Verification Provider check (Fail closed)
    const botSecret = process.env.TURNSTILE_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY;
    const botResponse = body["cf-turnstile-response"] || body["g-recaptcha-response"];

    if (botSecret) {
      if (!botResponse || typeof botResponse !== "string") {
        console.warn(
          JSON.stringify({
            requestId,
            status: "rejected",
            reason: "missing_bot_token"
          })
        );
        return res.status(400).json({ error: "Bot verification token is missing." });
      }

      const verifyUrl = process.env.TURNSTILE_SECRET_KEY
        ? "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        : "https://www.google.com/recaptcha/api/siteverify";

      // 4-second timeout for bot verification
      const botController = new AbortController();
      const botTimeoutId = setTimeout(() => botController.abort(), 4000);

      try {
        const verifyRes = await fetch(verifyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(botSecret)}&response=${encodeURIComponent(botResponse)}`,
          signal: botController.signal,
        });

        clearTimeout(botTimeoutId);

        if (!verifyRes.ok) {
          console.error(
            JSON.stringify({
              requestId,
              status: "error",
              reason: "bot_provider_status_error",
              statusCode: verifyRes.status,
            })
          );
          return res.status(503).json({ error: "Verification system is temporarily unavailable." });
        }

        const verifyJson = (await verifyRes.json()) as { success: boolean };
        if (!verifyJson.success) {
          console.warn(
            JSON.stringify({
              requestId,
              status: "rejected",
              reason: "bot_verification_failed"
            })
          );
          return res.status(400).json({ error: "Bot verification failed. Please try again." });
        }
      } catch (err: any) {
        clearTimeout(botTimeoutId);
        console.error(
          JSON.stringify({
            requestId,
            status: "error",
            reason: "bot_verification_exception",
            error: String(err.message || err),
          })
        );
        return res.status(503).json({ error: "Verification system is temporarily offline." });
      }
    }

    // 6. Config check / Fail-Closed on missing Webhook URL
    const webhookUrl = process.env.N8N_ANAHEIM_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_ANAHEIM_WEBHOOK_SECRET;

    if (!webhookUrl) {
      console.error(
        JSON.stringify({
          requestId,
          status: "error",
          reason: "missing_configuration",
          message: "N8N_ANAHEIM_WEBHOOK_URL environment variable is missing."
        })
      );

      const isDev = process.env.NODE_ENV === "development";
      const allowSim = process.env.ALLOW_LEAD_SIMULATION === "true";

      if (isDev && allowSim) {
        return res.status(200).json({
          success: true,
          message: "Estimate request simulated successfully (Development Mode).",
          request_id: requestId,
        });
      }

      return res.status(503).json({
        error: "Service temporarily unavailable. Please call the shop directly."
      });
    }

    // 7. Parse Normalized Fields
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

    // 8. Build Canonical Payload
    const canonicalPayload: CanonicalPayload = {
      request_id: requestId,
      submitted_at: new Date().toISOString(),
      source: "white-label-form",
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
      referrer: referrer || undefined,
      campaign: campaign || undefined,
    };

    // Format job description combining specs for the legacy n8n parser
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
      canonical: canonicalPayload,
    };

    // 9. Forward to n8n with timeout and authorization headers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (webhookSecret) {
      headers["Authorization"] = `Bearer ${webhookSecret}`;
      headers["X-Anaheim-Token"] = webhookSecret; // Renamed from X-Anaheim-Signature
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
          error: String(fetchErr.message || fetchErr),
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
