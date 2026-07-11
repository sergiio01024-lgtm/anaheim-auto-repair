import { useEffect } from "react";
import { trackEvent } from "../utils/analytics";
import { businessConfig } from "../config/business";

export function PrivacyPage() {
  useEffect(() => {
    trackEvent({ type: "service_page_view", path: "/privacy" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <main id="main-content" className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-zinc-400 text-xs mb-8">Last Updated: July 11, 2026</p>

        <div className="space-y-6 text-sm text-zinc-650 font-semibold leading-relaxed">
          <p>
            At {businessConfig.name.full}, we are committed to protecting the privacy of our
            visitors and customers. This Privacy Policy details how we collect, use, and protect
            your information when you request a service estimate or visit our website.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">1. Information We Collect</h2>
          <p>When you request an estimate using our online service intake form, we ask for:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Your Name</li>
            <li>Your Phone Number</li>
            <li>Your Email Address (Optional)</li>
            <li>Your Vehicle specifications (Year, Make, Model, VIN, Mileage)</li>
            <li>Your vehicle's warning lights and symptoms</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">2. How We Use Your Information</h2>
          <p>
            We use this information strictly to process your auto-repair estimate requests, schedule
            appointments, and communicate with you about your vehicle. We do not use this data for
            marketing mailings or sell it to third-party lists.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">3. SMS Communications & Consent</h2>
          <p>
            If you check the optional box consenting to receive automated updates, we may send you
            text messages regarding your service request, diagnostic findings, and scheduling.
            Consent to receive text messages is optional and not required to obtain repair services.
            You can opt-out at any time by replying <strong>STOP</strong> to any message we send.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">4. Third-Party Sharing</h2>
          <p>
            We share your data with trusted hosting partners and our lead routing service (n8n
            webhook proxy) solely to process your request. We do not sell, rent, or lease personal
            information to third parties.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">5. Contact Information</h2>
          <p>
            If you have questions about this policy or wish to request removal of your records,
            please contact us at:
          </p>
          <p className="pl-4 font-bold text-zinc-800">
            {businessConfig.name.full}
            <br />
            {businessConfig.address.street}
            <br />
            Anaheim, CA {businessConfig.address.zip}
            <br />
            Phone: {businessConfig.phone.display}
          </p>
        </div>
      </main>
    </div>
  );
}
