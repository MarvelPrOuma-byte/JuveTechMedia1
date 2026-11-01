import { z } from "zod";

const signupSchema = z.object({
  email: z.string().trim().email().max(254),
});

export type NewsletterEnvironment = {
  MAILCHIMP_API_KEY?: string | undefined;
  MAILCHIMP_AUDIENCE_ID?: string | undefined;
};

type NewsletterResponse = {
  success: boolean;
  message: string;
};

function response(status: number, body: NewsletterResponse) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function handleNewsletterRequest(
  request: Request,
  environment: NewsletterEnvironment,
  fetcher: typeof fetch = fetch,
) {
  if (request.method !== "POST") {
    return response(405, { success: false, message: "Use POST to subscribe." });
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return response(403, { success: false, message: "This signup request was not accepted." });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return response(400, { success: false, message: "Please submit a valid email address." });
  }

  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return response(400, { success: false, message: "Please enter a valid email address." });
  }

  const apiKey = environment.MAILCHIMP_API_KEY;
  const audienceId = environment.MAILCHIMP_AUDIENCE_ID;
  const dataCenter = apiKey?.match(/-([a-z0-9]+)$/i)?.[1];

  if (!apiKey || !audienceId || !dataCenter) {
    console.error("Newsletter signup is missing valid Mailchimp server configuration.");
    return response(503, {
      success: false,
      message: "Newsletter signup is temporarily unavailable. Please contact us directly.",
    });
  }

  let mailchimpResponse: Response;
  try {
    mailchimpResponse = await fetcher(
      `https://${dataCenter}.api.mailchimp.com/3.0/lists/${encodeURIComponent(audienceId)}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`juvetech:${apiKey}`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: parsed.data.email,
          status: "pending",
        }),
      },
    );
  } catch (error) {
    console.error("Mailchimp newsletter request failed.", error);
    return response(502, {
      success: false,
      message: "We couldn't reach the newsletter service. Please try again later.",
    });
  }

  if (mailchimpResponse.ok) {
    return response(200, {
      success: true,
      message: "Thanks for signing up. Please check your inbox to confirm your subscription.",
    });
  }

  let errorTitle = "";
  try {
    const body: unknown = await mailchimpResponse.json();
    if (typeof body === "object" && body !== null && "title" in body) {
      errorTitle = typeof body.title === "string" ? body.title : "";
    }
  } catch (error) {
    console.error("Could not read Mailchimp's error response.", error);
  }

  if (mailchimpResponse.status === 400 && errorTitle === "Member Exists") {
    return response(200, {
      success: true,
      message: "This email may already be subscribed. Contact us if you need help confirming.",
    });
  }

  console.error("Mailchimp rejected a newsletter signup.", {
    status: mailchimpResponse.status,
    title: errorTitle,
  });
  return response(502, {
    success: false,
    message: "We couldn't complete your signup. Please try again later.",
  });
}
