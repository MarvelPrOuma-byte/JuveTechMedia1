import { describe, expect, it } from "vitest";
import { formatPackagePrice, packagePrices, pricingCurrency, individualServices } from "../lib/pricing";

describe("Kenyan shilling package pricing", () => {
  it("uses KES for every numeric package price", () => {
    expect(pricingCurrency).toBe("KES");
    for (const amount of Object.values(packagePrices)) {
      expect(formatPackagePrice(amount)).toMatch(/^KSh \d{1,3}(,\d{3})*$/);
    }
  });
  it("prices each of the five individual services in Kenyan shillings", () => {
    expect(individualServices.map(s => s.id)).toEqual(["web", "seo", "ads", "graphic", "video"]);
    for (const service of individualServices) {
      expect(formatPackagePrice(service.amount)).toMatch(/^KSh \d{1,3}(,\d{3})*$/);
    }
  });
});