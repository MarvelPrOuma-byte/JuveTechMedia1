import { describe, expect, it } from "vitest";
import {
  formatPackagePrice,
  packagePrices,
  pricingCurrency,
  individualServices,
} from "../lib/pricing";

describe("Kenyan shilling package pricing", () => {
  it("uses KES for every numeric package price", () => {
    expect(pricingCurrency).toBe("KES");
    for (const amount of Object.values(packagePrices)) {
      expect(formatPackagePrice(amount)).toMatch(/^KSh \d{1,3}(,\d{3})*$/);
    }
  });
  it("prices each requested service in Kenyan shillings", () => {
    expect(individualServices.map((service) => service.id)).toEqual([
      "social-media",
      "video-production",
      "web-design",
      "app-development",
      "seo",
      "branding",
      "local-seo",
    ]);
    for (const service of individualServices) {
      expect(formatPackagePrice(service.amount)).toMatch(/^KSh \d{1,3}(,\d{3})*$/);
    }
  });
});
