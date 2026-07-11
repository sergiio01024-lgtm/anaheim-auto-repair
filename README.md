# Anaheim Auto Repair & Muffler Care Website

A professional React + TypeScript + Tailwind CSS web application for **Anaheim Auto Repair & Muffler Care**, a family-owned auto repair and muffler specialty shop serving Anaheim and Orange County, CA since 1978.

This project was refined to remove inherited boilerplate, establish strict coding standards, set up quality gates, and consolidate business data into a single source of truth.

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

---

## Lead-Flow Architecture

Lead request submissions from the **Request an Estimate** form are handled as follows:

1. User enters name, phone, email, service needed, address, and job description in `src/components/ContactSection.tsx`.
2. The form triggers a client-side `fetch` POST request to a webhook hosted at `https://n8n.kratosintelligence.com/webhook/anaheim-auto-lead`.
3. Payload matches the parameters expected by the lead processor:
   * `name`: string
   * `phone`: string
   * `email`: string
   * `service_type`: string (mapped internally from the display service select option to internal keys like `muffler_exhaust`, `brakes_suspension`, etc.)
   * `job_description`: string
   * `property_address`: string
   * `request_type`: `"quote"`
4. Upon successful receipt (`res.ok`), a confirmation banner is displayed to the user.

---

## Content and Asset Verification Rules

To maintain high data integrity and prevent regressions:

1. **Fact Verification:** Do not invent ratings, review counts, warranties, or staff names. All business facts must match records verified in `src/config/business.ts`.
2. **Ratings & Reviews:** External Yelp ratings, review counts, and staff lists must include a code comment/field stating when they were `lastVerified`.
3. **No Image Placeholders:** Do not render fallback blocks showing "Photo coming soon" or placeholder boxes on production. If genuine image assets are missing, hide the affected section entirely (e.g., photo galleries) rather than rendering placeholders.
4. **Interactive Controls:** All buttons, inputs, and links must have a visible `:focus-visible` state. Do not disable outlines globally.
5. **No Credentials:** Never commit credentials, API keys, or webhooks inside client code. Use environment variables if secrets are required.

---

## Acknowledgements & Licenses

* **UI Components Base:** Inherited components from [shadcn/ui](https://ui.shadcn.com/) used under the [MIT License](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
* **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) licensed under the SIL Open Font License.