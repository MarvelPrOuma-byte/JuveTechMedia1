import { describe, expect, it } from "vitest";

import { buildInquiryWhatsAppUrl, inquiryWhatsAppNumber } from "../lib/contact";

describe("WhatsApp inquiry links", () => {
  it("encodes the inquiry and selected booking slot for the agency number", () => {
    const url = new URL(
      buildInquiryWhatsAppUrl({
        name: "Sam Client",
        email: "sam@example.com",
        website: "https://example.com",
        service: "Search Engine Optimization",
        message: "I need help with SEO & content.",
        callDate: "Monday, November 2, 2026",
        callTime: "09:00",
      }),
    );

    expect(url.origin + url.pathname).toBe(`https://wa.me/${inquiryWhatsAppNumber}`);
    expect(url.searchParams.get("text")).toContain("Sam Client");
    expect(url.searchParams.get("text")).toContain("I need help with SEO & content.");
    expect(url.searchParams.get("text")).toContain("Requested time: 09:00 EAT");
  });
});
