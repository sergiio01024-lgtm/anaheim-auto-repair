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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should reject non-POST requests with 455", async () => {
    mockReq.method = "GET";
    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(setHeaderMock).toHaveBeenCalledWith("Allow", "POST");
    expect(statusMock).toHaveBeenCalledWith(455);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it("should reject non-JSON Content-Type with 415", async () => {
    mockReq.headers!["content-type"] = "text/plain";
    await handler(mockReq as VercelRequest, mockRes as VercelResponse);

    expect(statusMock).toHaveBeenCalledWith(415);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it("should detect bot honeypot and return 200 silent success", async () => {
    mockReq.body = {
      name: "Spam Bot",
      phone: "1234567890",
      year: "2020",
      make: "Toyota",
      model: "Corolla",
      service: "muffler-exhaust",
      message: "Spam",
      fax_number: "555-555-5555", // Honeypot
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
      expect.objectContaining({ error: "Missing required fields." })
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
      expect.objectContaining({ error: "Invalid field lengths. Please shorten your inputs." })
    );
  });

  it("should simulate success when n8n webhook URL is not set (development fallback)", async () => {
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

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: expect.stringContaining("Development Mode"),
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
          "X-Anaheim-Signature": "super_secret_token",
        }),
      })
    );
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it("should handle n8n non-2xx failures gracefully with 502", async () => {
    process.env.N8N_ANAHEIM_WEBHOOK_URL = "https://n8n.test/webhook";
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
});
