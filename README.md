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

The strategy-call form prepares a WhatsApp message for `+254 757 544 494`. The visitor must
send the prepared message in WhatsApp; the selected date and time are requests, not confirmed
calendar bookings.

Newsletter signups use Mailchimp's double-opt-in flow. Configure these server-only variables
in the local environment or deployment secret store:

- `MAILCHIMP_API_KEY` — the Mailchimp API key, including its data-center suffix (for example, `-usX`).
- `MAILCHIMP_AUDIENCE_ID` — the ID of the Mailchimp audience that should receive signups.

Copy `.env.example` to `.env` for local setup. Never expose the API key through a `VITE_` variable
or commit it to source control. The newsletter endpoint reports an unavailable state until both
Mailchimp values are configured.

## Pages and content

- `/case-studies` contains the King Solomon Comprehensive School website project. Only client and
  project details supplied for publication are included; no results or testimonial are fabricated.
- `/services` links to individual service pages under `/services/`.
- `/blog` lists practical guides, with individual articles under `/blog/`.
