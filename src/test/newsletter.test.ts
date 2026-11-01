import { describe, expect, it, vi } from "vitest";

import { handleNewsletterRequest } from "../lib/newsletter.server";

const signupRequest = (body: unknown, origin = "https://juvetech.example") =>
  new Request("https://juvetech.example/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
    },
    body: JSON.stringify(body),
  });

describe("Mailchimp newsletter signup", () => {
  it("uses the configured audience and requests double opt-in", async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 200 }));
    const response = await handleNewsletterRequest(
      signupRequest({ email: "person@example.com" }),
      { MAILCHIMP_API_KEY: "private-key-us19", MAILCHIMP_AUDIENCE_ID: "audience-123" },
      fetcher,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    expect(fetcher).toHaveBeenCalledWith(
      "https://us19.api.mailchimp.com/3.0/lists/audience-123/members",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email_address: "person@example.com", status: "pending" }),
      }),
    );
  });

  it("reports missing configuration without claiming the visitor subscribed", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const response = await handleNewsletterRequest(
      signupRequest({ email: "person@example.com" }),
      {},
      fetcher,
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ success: false });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("rejects cross-origin requests", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const response = await handleNewsletterRequest(
      signupRequest({ email: "person@example.com" }, "https://attacker.example"),
      {},
      fetcher,
    );

    expect(response.status).toBe(403);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("rejects malformed email addresses without calling Mailchimp", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const response = await handleNewsletterRequest(
      signupRequest({ email: "not-an-email" }),
      { MAILCHIMP_API_KEY: "private-key-us19", MAILCHIMP_AUDIENCE_ID: "audience-123" },
      fetcher,
    );

    expect(response.status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("does not expose provider errors or credentials to visitors", async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        Response.json(
          { title: "Invalid Resource", detail: "private provider detail" },
          { status: 401 },
        ),
      );
    const response = await handleNewsletterRequest(
      signupRequest({ email: "person@example.com" }),
      { MAILCHIMP_API_KEY: "private-key-us19", MAILCHIMP_AUDIENCE_ID: "audience-123" },
      fetcher,
    );
    const body = await response.text();

    expect(response.status).toBe(502);
    expect(body).not.toContain("private provider detail");
    expect(body).not.toContain("private-key-us19");
  });
});
