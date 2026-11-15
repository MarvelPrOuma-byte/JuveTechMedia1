import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  website: z.string().trim().max(255),
  service: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(1000),
  callDate: z.string().trim().min(1).max(100),
  callTime: z.string().trim().min(1).max(20),
});

export type InquiryEnvironment = {
  GOOGLE_SHEETS_WEBHOOK_URL?: string | undefined;
  GOOGLE_SHEETS_WEBHOOK_TOKEN?: string | undefined;
};

type InquiryResponse = {
  success: boolean;
  message: string;
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
      message: "We couldn't email your inquiry. Please try again later.",
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
    console.error("Inquiry webhook did not accept an inquiry.", { status: sheetResponse.status });
    return response(502, {
      success: false,
      message: "We couldn't email your inquiry. Please try again later.",
    });
  }

  return response(200, {
    success: true,
    message: "Your inquiry has been emailed to info@juvetechmedia.co.ke.",
  });
}
