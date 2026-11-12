# JuveTech Digital Growth

Responsive digital marketing agency website for JuveTech Media, built with TanStack Start, React, TypeScript, Tailwind CSS, and Vite.

## Development

Requires Node.js and npm.

```sh
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm test` — run the test suite

## Brand assets

Add the brand assets to `public/` using these exact filenames:

- `juvetechmedia.png` — the JuveTech logo used in the header and as the favicon (square/icon-ready works best for the favicon).
- `digitalmarketing.mp4` — a compressed, web-ready video used as the homepage hero background. The existing dashboard image remains as its poster and fallback.

The hero automatically uses the dashboard image as a poster while the video loads, and the text wordmark is a fallback if the logo cannot load.

## Contact and newsletter

The strategy-call form saves the inquiry to a Google Sheet before preparing a WhatsApp message
for `+254 757 544 494`. The visitor must still send the prepared message in WhatsApp; the selected
date and time are requests, not confirmed calendar bookings. Newsletter consent is optional and
unchecked by default. Only visitors who opt in are sent to Mailchimp's double-opt-in flow.

To connect the inquiry form to Google Sheets:

1. Create a Google Sheet and copy its spreadsheet ID from the URL.
2. In the sheet, open **Extensions → Apps Script**, replace the editor contents with
   [`GoogleSheetsWebApp.gs`](./GoogleSheetsWebApp.gs), and save.
3. In Apps Script **Project Settings → Script Properties**, add `SPREADSHEET_ID` (the ID from
   step 1) and `WEBHOOK_TOKEN` (a long random secret you generate). Use the same token in the
   server environment; never put it in browser code or share it publicly.
4. Choose **Deploy → New deployment → Web app**, set **Execute as** to yourself and access to
   **Anyone**, then deploy and authorize it. The endpoint is public, but it rejects submissions
   without the secret token. Copy the web app URL ending in `/exec`.
5. Set `GOOGLE_SHEETS_WEBHOOK_URL` to that URL and `GOOGLE_SHEETS_WEBHOOK_TOKEN` to the same
   secret in `.env` for local work and in the deployment's server-side environment variables.
   Redeploy after changing production variables.
6. Submit a test inquiry with newsletter consent off, then on. Confirm both rows appear in the
   `Inquiries` sheet and that the opted-in address receives Mailchimp's confirmation email.

Newsletter signups use Mailchimp's double-opt-in flow. Configure these server-only variables
in the local environment or deployment secret store:

- `MAILCHIMP_API_KEY` — the Mailchimp API key, including its data-center suffix (for example, `-usX`).
- `MAILCHIMP_AUDIENCE_ID` — the ID of the Mailchimp audience that should receive signups.

Copy `.env.example` to `.env` for local setup. Never expose secrets through a `VITE_` variable or
commit them to source control. Inquiry capture reports an unavailable state until both Google
Sheets variables are configured. Newsletter signups report an unavailable state until both
Mailchimp values are configured.

## Deploying to Vercel

Import `MarvelPrOuma-byte/JuveTechMedia1` into Vercel and use the repository root as the project
root. The project is configured for TanStack Start with Nitro's Vercel deployment target; Vercel
should detect the `npm run build` command and Nitro output automatically. Add
`GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_TOKEN`, `MAILCHIMP_API_KEY`, and
`MAILCHIMP_AUDIENCE_ID` as server-side environment variables in the Vercel project settings.
Redeploy after adding or changing environment variables.

## Search visibility

The public site URL is `https://www.juvetechmedia.co.ke`. Page canonicals and social preview URLs
use this domain; `public/robots.txt` points crawlers to `public/sitemap.xml`. Update the sitemap
when adding or removing public pages. After deployment, verify the domain in Google Search Console
and submit `https://www.juvetechmedia.co.ke/sitemap.xml`. Search rankings depend on many factors
and cannot be guaranteed by site metadata alone.

## Pages and content

- `/case-studies` contains the King Solomon Comprehensive School website project. Only client and
  project details supplied for publication are included; no results or testimonial are fabricated.
- `/services` links to individual service pages under `/services/`.
- `/blog` lists practical guides, with individual articles under `/blog/`.
