# Anaheim Auto Repair & Muffler Care Website

A professional React + TypeScript + Tailwind CSS web application for **Anaheim Auto Repair & Muffler Care**, a family-owned auto repair and muffler specialty shop serving Anaheim and Orange County, CA since 1978.

This project has been refined to establish strict coding standards, set up quality gates, and consolidate business data into a single source of truth.

---

## Project Info

* **Package Name:** `anaheim-auto-repair`
* **Purpose:** High-performance, accessible, and responsive marketing landing page with structured lead generation and Google Maps integration.
* **Core Contact:** Carson (Manager)
* **Phone:** (714) 826-4444
* **Address:** 2583 W Ball Rd, Anaheim, CA 92804

---

## Technology Stack

* **Build Tool:** [Vite](https://vitejs.dev/)
* **Frontend Library:** [React](https://react.dev/) (v18.3)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.0 via `@tailwindcss/vite`)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* **Quality Gates:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or v20 recommended)
* [npm](https://www.npmjs.com/) (v9+ recommended)

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Local Development

Start the Vite development server:

```bash
npm run dev
```

The app will start at `http://localhost:3000` and automatically open in your default browser.

---

## Commands

* **Run Dev Server:** `npm run dev`
* **Production Build:** `npm run build` (Outputs optimized assets to `/build`)
* **Linting:** `npm run lint` (Checks TypeScript and React files)
* **TypeScript Type Check:** `npm run typecheck`
* **Run Tests:** `npm run test` (Executes Vitest unit & integration tests)
* **Formatting Check:** `npm run format:check`
* **Format Files:** `npm run format`
* **Generate HTML:** `node scripts/generate-html.js` (Regenerates static page entries from pagesContent.json)

---

## Lead-Flow Architecture

Lead request submissions from the **Request an Estimate** form are processed as follows:

```
Browser (Intake Form) 
   └── [POST /api/lead] 
         ├── Server Validation (Strict typeguards & field limits)
         ├── Bot Verification (Cloudflare Turnstile or Google reCAPTCHA)
         └── Proxy Request (HTTP POST with X-Anaheim-Token)
               └── Protected n8n Dispatch Webhook
```

1. **Intake Form:** User enters estimate details in `src/components/ContactSection.tsx`.
2. **Serverless Endpoint:** The form POSTs a JSON request to `/api/lead`.
3. **Strict Validation:** The serverless function validates all types, digit counts, bounds, and ranges. Unexpected parameters or structures are rejected with HTTP `400`.
4. **Bot Filtering:** If Turnstile or reCAPTCHA is configured, the handler verifies the client token against the provider API. Providers are given a 4-second timeout, failing closed on outage with HTTP `503`.
5. **Proxy Webhook:** The handler forwards the normalized compatibility payload to n8n with a 5-second timeout, appending authorization headers including `X-Anaheim-Token` to protect the webhook.

---

## Environment Variables

Configure the following environment variables in your hosting provider (e.g. Vercel) or a local `.env` file:

* `N8N_ANAHEIM_WEBHOOK_URL`: The URL of the protected n8n lead-intake webhook.
* `N8N_ANAHEIM_WEBHOOK_SECRET`: The shared authorization secret sent in the `Authorization` (Bearer) and `X-Anaheim-Token` headers.
* `TURNSTILE_SECRET_KEY`: (Optional) The Cloudflare Turnstile secret key. If set, verification is mandatory.
* `RECAPTCHA_SECRET_KEY`: (Optional) The Google reCAPTCHA secret key. Fallback verification provider.
* `VITE_TURNSTILE_SITE_KEY`: (Optional) Cloudflare Turnstile site key exposed to the client.
* `ALLOW_LEAD_SIMULATION`: Set to `true` in local development (`NODE_ENV === "development"`) to simulate lead success if the webhook URL is unconfigured.
* `VITE_GA_MEASUREMENT_ID`: Google Analytics measurement ID (neutralized, failsafe wrapper).

Production canonical URL is: `https://anaheim-auto-repair.vercel.app`

---

## Content and Asset Verification Rules

To maintain high data integrity and prevent regressions:

1. **Fact Verification:** Do not invent ratings, review counts, warranties, or staff names. All business facts must match records verified in `src/config/business.ts`.
2. **No Image Placeholders:** Do not render fallback blocks showing "Photo coming soon" or placeholder boxes. If genuine image assets are missing, hide the affected section entirely.
3. **Interactive Controls:** All buttons, inputs, and links must have a visible `:focus-visible` state. Do not disable outlines globally.
4. **No Credentials:** Never commit credentials, API keys, or webhooks inside client code. Use environment variables.

---

## Acknowledgements & Licenses

* **UI Components Base:** Inherited components from [shadcn/ui](https://ui.shadcn.com/) used under the [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
* **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) licensed under the SIL Open Font License.