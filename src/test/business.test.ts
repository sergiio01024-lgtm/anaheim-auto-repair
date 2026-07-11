import { describe, it, expect } from "vitest";
import { businessConfig } from "../config/business";

describe("businessConfig data verification", () => {
  it("should have correct business info", () => {
    expect(businessConfig.name.full).toBe("Anaheim Auto Repair & Muffler Care");
    expect(businessConfig.phone.display).toBe("(714) 826-4444");
    expect(businessConfig.address.full).toContain("2583 W Ball Rd");
    expect(businessConfig.established).toBe(1978);
  });

  it("should have verified communities", () => {
    expect(businessConfig.cities).toContain("Anaheim");
    expect(businessConfig.cities).toContain("Garden Grove");
  });
});
