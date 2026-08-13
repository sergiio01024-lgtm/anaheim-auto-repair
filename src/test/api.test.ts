import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../../api/lead";

describe("/api/lead Serverless Function", () => {
  let mockReq: Partial<VercelRequest>;
  let mockRes: Partial<VercelResponse>;
  let statusMock: any;
  let jsonMock: any;
  let setHeaderMock: any;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockImplementation(() => ({ json: jsonMock }));
    setHeaderMock = vi.fn();

    mockReq = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {},
    };

    mockRes = {
      status: statusMock,
      setHeader: setHeaderMock,
    };

    // Mock global fetch
    global.fetch = vi.fn();

    // Clear env vars
    delete process.env.N8N_ANAHEIM_WEBHOOK_URL;
    delete process.env.N8N_ANAHEIM_WEBHOOK_SECRET;
    delete process.env.ALLOW_LEAD_SIMULATION;
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.RECAPTCHA_SECRET_KEY;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should reject non-POST requests with 405", async () => {
    mockReq.method = "GET";
    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(setHeaderMock).toHaveBeenCalledWith("Allow", "POST");
    expect(statusMock).toHaveBeenCalledWith(405);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it("should reject non-JSON Content-Type with 415", async () => {
    mockReq.headers!["content-type"] = "text/plain";
    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(415);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it("should forward lead to n8n even if hp_a, hp_b, or hp_c honeypot field is filled, without including honeypots in payload", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";

    // Test hp_a filled
    mockReq.body = {
      name: "John Smith",
      phone: "(714) 826-4444",
      year: "2020",
      make: "Toyota",
      model: "Camry",
      service: "muffler-exhaust",
      message: "Exhaust pipe rattle",
      hp_a: "bot_autofill_value",
      form_elapsed_ms: 8000,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const callArgs = (global.fetch as any).mock.calls[0];
    const forwardedBody = JSON.parse(callArgs[1].body);

    expect(forwardedBody.name).toBe("John Smith");
    expect(forwardedBody.hp_a).toBeUndefined();
    expect(forwardedBody.hp_b).toBeUndefined();
    expect(forwardedBody.hp_c).toBeUndefined();
    expect(forwardedBody.canonical.hp_a).toBeUndefined();

    // Test hp_b filled
    (global.fetch as any).mockClear();
    mockReq.body.hp_a = "";
    mockReq.body.hp_b = "some_autofill_phone";
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Test hp_c filled
    (global.fetch as any).mockClear();
    mockReq.body.hp_b = "";
    mockReq.body.hp_c = "some_autofill_address";
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should return 200 silent success and not call fetch if timing trap is triggered", async () => {
    mockReq.body = {
      name: "Spam Bot",
      phone: "1234567890",
      year: "2020",
      make: "Toyota",
      model: "Corolla",
      service: "muffler-exhaust",
      message: "Spam",
      form_elapsed_ms: 300, // too fast
    };

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message: "Request received successfully.",
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should reject payload with missing required fields with 400", async () => {
    mockReq.body = {
      name: "Dylan",
      // missing phone, year, make, model, service, message
    };

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });

  it("should reject payload with exceeding field lengths with 400", async () => {
    mockReq.body = {
      name: "A".repeat(150), // Limit is 100
      phone: "1234567890",
      year: "2020",
      make: "Toyota",
      model: "Corolla",
      service: "muffler-exhaust",
      message: "Noise",
    };

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });

  it("should simulate success when n8n webhook URL is not set (development fallback)", async () => {
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    process.env.ALLOW_LEAD_SIMULATION = "true";

    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing the rear exhaust pipe segment.",
    };

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    process.env.NODE_ENV = originalNodeEnv;

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: expect.stringContaining("simulated"),
      })
    );
  });

  it("should forward payload to n8n and sign headers when webhook envs are present", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";

    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing exhaust segments",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://n8n.test/webhook",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer super_secret_token",
          "X-Anaheim-Token": "super_secret_token",
        }),
      })
    );
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it("should handle n8n non-2xx failures gracefully with 502", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";
    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing exhaust segments",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(502);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Failed to forward request to dispatch webhook.",
    });
  });

  it("should map unanswered drivable to null and omit from job description", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";

    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing exhaust segments",
      drivable: "", // empty / unanswered
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://n8n.test/webhook",
      expect.objectContaining({
        body: expect.stringContaining('"drivable":null'),
      })
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://n8n.test/webhook",
      expect.objectContaining({
        body: expect.not.stringContaining("Drivable:"),
      })
    );
  });

  it("should map drivable true and false correctly", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";

    // Test true
    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing exhaust segments",
      drivable: "true",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://n8n.test/webhook",
      expect.objectContaining({
        body: expect.stringContaining('"drivable":true'),
      })
    );

    // Test false
    mockReq.body.drivable = false;
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://n8n.test/webhook",
      expect.objectContaining({
        body: expect.stringContaining('"drivable":false'),
      })
    );
  });

  it("should return 503 if webhook URL is configured but webhook secret is missing, and not forward request", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    delete process.env.N8N_ANAHEIM_WEBHOOK_SECRET;

    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing exhaust segments",
    };

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(503);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should require client Turnstile token if Turnstile secret key is configured", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";
    process.env.TURNSTILE_SECRET_KEY = "turnstile_secret";

    mockReq.body = {
      name: "Dylan",
      phone: "(714) 826-4444",
      year: "2015",
      make: "Honda",
      model: "Civic",
      service: "muffler-exhaust",
      message: "Replacing exhaust segments",
      // missing cf-turnstile-response
    };

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Bot verification token is missing." })
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should correctly harden the canonical payload (vin, sms->text mapping, warning light slugs, source) while keeping compatibility wrapper intact", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
    process.env.N8N_ANAHEIM_WEBHOOK_SECRET = "super_secret_token";

    mockReq.body = {
      name: "Jane Doe",
      phone: "(714) 555-0199",
      email: "jane@example.com",
      year: "2021",
      make: "Toyota",
      model: "RAV4",
      vin: "1HGCR2F83HA000000",
      service: "brakes-suspension",
      message: "Squeaking brakes when stopping",
      warning_lights: ["Check Engine", "ABS / Braking"],
      preferred_contact: "sms",
      sms_consent: true,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const callArgs = (global.fetch as any).mock.calls[0];
    const forwardedBody = JSON.parse(callArgs[1].body);

    // Verify outer compatibility wrapper fields
    expect(forwardedBody.name).toBe("Jane Doe");
    expect(forwardedBody.phone).toBe("(714) 555-0199");
    expect(forwardedBody.service_type).toBe("brakes-suspension");
    expect(forwardedBody.request_type).toBe("quote");
    expect(forwardedBody.property_address).toBe("");
    expect(forwardedBody.job_description).toContain("VIN: 1HGCR2F83HA000000");
    expect(forwardedBody.job_description).toContain("Warning Lights: Check Engine, ABS / Braking");
    expect(forwardedBody.job_description).toContain("Preferred Contact: sms");

    // Verify nested canonical object hardening
    const canonical = forwardedBody.canonical;
    expect(canonical).toBeDefined();
    expect(canonical.source).toBe("anaheim-auto-website");
    expect(canonical.vin).toBe("1HGCR2F83HA000000");
    expect(canonical.preferred_contact).toBe("text");
    expect(canonical.warning_lights).toEqual(["check-engine", "abs-braking"]);
    expect(canonical.sms_consent).toBe(true);
    expect(canonical.vehicle_year).toBe(2021);
    expect(canonical.vehicle_make).toBe("Toyota");
    expect(canonical.vehicle_model).toBe("RAV4");
  });
});
