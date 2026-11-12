import { z } from "zod";

import { handleNewsletterRequest, type NewsletterEnvironment } from "./newsletter.server";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  website: z.string().trim().max(255),
  service: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(1000),
  callDate: z.string().trim().min(1).max(100),
  callTime: z.string().trim().min(1).max(20),
  newsletterConsent: z.boolean(),
});

export type InquiryEnvironment = NewsletterEnvironment & {
  GOOGLE_SHEETS_WEBHOOK_URL?: string | undefined;
  GOOGLE_SHEETS_WEBHOOK_TOKEN?: string | undefined;
};

type InquiryResponse = {
  success: boolean;
  message: string;
  newsletterMessage?: string | null;
};

function response(status: number, body: InquiryResponse) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function handleInquiryRequest(
  request: Request,
  environment: InquiryEnvironment,
  fetcher: typeof fetch = fetch,
) {
  if (request.method !== "POST") {
    return response(405, { success: false, message: "Use POST to send an inquiry." });
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return response(403, { success: false, message: "This inquiry was not accepted." });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return response(400, { success: false, message: "Please check your inquiry and try again." });
  }

  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return response(400, { success: false, message: "Please check your inquiry and try again." });
  }

  const webhookUrl = environment.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookToken = environment.GOOGLE_SHEETS_WEBHOOK_TOKEN;
  if (!webhookUrl || !webhookToken) {
    console.error("Inquiry capture is missing Google Sheets server configuration.");
    return response(503, {
      success: false,
      message: "Inquiry submission is temporarily unavailable. Please contact us directly.",
    });
  }

  let parsedWebhookUrl: URL;
  try {
    parsedWebhookUrl = new URL(webhookUrl);
  } catch {
    console.error("Inquiry capture has an invalid Google Sheets webhook URL.");
    return response(503, {
      success: false,
      message: "Inquiry submission is temporarily unavailable. Please contact us directly.",
    });
  }

  if (parsedWebhookUrl.protocol !== "https:") {
    console.error("Inquiry capture requires an HTTPS Google Sheets webhook URL.");
    return response(503, {
      success: false,
      message: "Inquiry submission is temporarily unavailable. Please contact us directly.",
    });
  }

  let sheetResponse: Response;
  try {
    sheetResponse = await fetcher(parsedWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        token: webhookToken,
      }),
    });
  } catch (error) {
    console.error("Google Sheets inquiry request failed.", error);
    return response(502, {
      success: false,
      message: "We couldn't save your inquiry. Please try again later.",
    });
  }

  let sheetAccepted = false;
  try {
    const result: unknown = await sheetResponse.json();
    sheetAccepted =
      sheetResponse.ok &&
      typeof result === "object" &&
      result !== null &&
      "success" in result &&
      result.success === true;
  } catch (error) {
    console.error("Could not read the Google Sheets inquiry response.", error);
  }

  if (!sheetAccepted) {
    console.error("Google Sheets did not accept an inquiry.", { status: sheetResponse.status });
    return response(502, {
      success: false,
      message: "We couldn't save your inquiry. Please try again later.",
    });
  }

  let newsletterMessage: string | null = null;
  if (parsed.data.newsletterConsent) {
    const newsletterRequest = new Request(request.url, {
      method: "POST",
      headers: {
        Origin: origin,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: parsed.data.email }),
    });
    const newsletterResponse = await handleNewsletterRequest(
      newsletterRequest,
      environment,
      fetcher,
    );
    const newsletterBody: unknown = await newsletterResponse.json();
    newsletterMessage =
      typeof newsletterBody === "object" &&
      newsletterBody !== null &&
      "message" in newsletterBody &&
      typeof newsletterBody.message === "string"
        ? newsletterBody.message
        : "Your inquiry was saved, but newsletter signup could not be completed.";
  }

  return response(200, {
    success: true,
    message: "Your inquiry has been saved. Open WhatsApp and press Send to contact us.",
    newsletterMessage,
  });
}
