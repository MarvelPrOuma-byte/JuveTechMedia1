import { describe, expect, it, vi } from "vitest";

import { handleInquiryRequest } from "../lib/inquiry.server";

const inquiry = {
  name: "Sam Client",
  email: "sam@example.com",
  website: "https://example.com",
  service: "Search Engine Optimization",
  message: "I need help with SEO and content.",
  callDate: "Monday, November 2, 2026",
  callTime: "09:00",
};

const request = (body: unknown, origin = "https://juvetech.example") =>
  new Request("https://juvetech.example/api/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
    },
    body: JSON.stringify(body),
  });

const environment = {
  GOOGLE_SHEETS_WEBHOOK_URL: "https://script.google.com/macros/s/test/exec",
  GOOGLE_SHEETS_WEBHOOK_TOKEN: "private-webhook-token",
};

describe("Google Sheets inquiry capture", () => {
  it("saves the inquiry through the configured email webhook", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: true }));
    const response = await handleInquiryRequest(request(inquiry), environment, fetcher);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      success: true,
      message: "Your inquiry has been emailed to info@juvetechmedia.co.ke.",
    });
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(
      new URL(environment.GOOGLE_SHEETS_WEBHOOK_URL),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ ...inquiry, token: environment.GOOGLE_SHEETS_WEBHOOK_TOKEN }),
      }),
    );
  });

  it("rejects cross-origin and invalid submissions before contacting Google", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const crossOrigin = await handleInquiryRequest(
      request(inquiry, "https://attacker.example"),
      environment,
      fetcher,
    );
    const invalidEmail = await handleInquiryRequest(
      request({ ...inquiry, email: "not-an-email" }),
      environment,
      fetcher,
    );

    expect(crossOrigin.status).toBe(403);
    expect(invalidEmail.status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("does not claim success when sheet integration is not configured or rejects the inquiry", async () => {
    const noConfig = await handleInquiryRequest(request(inquiry), {}, vi.fn<typeof fetch>());
    const rejected = await handleInquiryRequest(
      request(inquiry),
      environment,
      vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: false })),
    );

    expect(noConfig.status).toBe(503);
    expect(rejected.status).toBe(502);
  });
});
