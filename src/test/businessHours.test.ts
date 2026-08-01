import { describe, it, expect } from "vitest";
import { getAnaheimBusinessStatus } from "../utils/businessHours";

describe("America/Los_Angeles Timezone Business Hours Helper", () => {
  it("returns closed for weekday before opening (Mon 7:00 AM PST)", () => {
    const mondayEarly = new Date("2026-08-03T14:00:00Z"); // 7:00 AM PDT (UTC-7)
    const status = getAnaheimBusinessStatus(mondayEarly);
    expect(status.isOpen).toBe(false);
    expect(status.message).toContain("Opens Today at 8:30 AM");
  });

  it("returns open for weekday during business hours (Mon 10:00 AM PST)", () => {
    const mondayOpen = new Date("2026-08-03T17:00:00Z"); // 10:00 AM PDT (UTC-7)
    const status = getAnaheimBusinessStatus(mondayOpen);
    expect(status.isOpen).toBe(true);
    expect(status.message).toContain("Open Today until 5:30 PM");
  });

  it("returns closed for weekday after closing (Mon 6:00 PM PST)", () => {
    const mondayLate = new Date("2026-08-04T01:00:00Z"); // 6:00 PM PDT (UTC-7)
    const status = getAnaheimBusinessStatus(mondayLate);
    expect(status.isOpen).toBe(false);
    expect(status.message).toContain("Closed");
  });

  it("returns open for Saturday during business hours (Sat 11:00 AM PST)", () => {
    const saturdayOpen = new Date("2026-08-08T18:00:00Z"); // 11:00 AM PDT (UTC-7)
    const status = getAnaheimBusinessStatus(saturdayOpen);
    expect(status.isOpen).toBe(true);
    expect(status.message).toContain("Open Today until 4:30 PM");
  });

  it("returns closed for Saturday after closing (Sat 5:00 PM PST)", () => {
    const saturdayLate = new Date("2026-08-09T00:00:00Z"); // 5:00 PM PDT (UTC-7)
    const status = getAnaheimBusinessStatus(saturdayLate);
    expect(status.isOpen).toBe(false);
    expect(status.message).toContain("Opens Monday at 8:30 AM");
  });

  it("returns closed for Sunday (Sun 12:00 PM PST)", () => {
    const sunday = new Date("2026-08-09T19:00:00Z"); // 12:00 PM PDT (UTC-7)
    const status = getAnaheimBusinessStatus(sunday);
    expect(status.isOpen).toBe(false);
    expect(status.message).toContain("Closed Today");
  });

  it("calculates Pacific time correctly even when date object originates from a non-Pacific caller timezone offset", () => {
    // 10:00 AM PDT in Anaheim corresponds to 1:00 PM EDT in New York (UTC-4) or 5:00 PM UTC
    const dateFromNYCaller = new Date("2026-08-03T17:00:00.000Z");
    const status = getAnaheimBusinessStatus(dateFromNYCaller);
    expect(status.isOpen).toBe(true);
    expect(status.message).toContain("Open Today until 5:30 PM");
  });
});
