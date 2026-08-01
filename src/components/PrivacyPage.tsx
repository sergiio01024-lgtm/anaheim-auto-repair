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
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-zinc-400 text-xs mb-8">Draft for Owner & Legal Review — Last Updated: July 2026</p>

        <div className="space-y-6 text-sm text-zinc-650 font-semibold leading-relaxed">
          <p>
            At {businessConfig.name.full}, we are committed to respecting visitor and customer privacy.
            This Privacy Policy describes how information submitted through our service intake form is collected and used.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">1. Information We Collect</h2>
          <p>When you submit an estimate request on our website, we ask for:</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Your Name</li>
            <li>Your Phone Number</li>
            <li>Your Email Address (Optional)</li>
            <li>Vehicle specifications (Year, Make, Model, VIN, Mileage)</li>
            <li>Vehicle warning lights and symptoms</li>
          </ul>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">2. How Information Is Used</h2>
          <p>
            We use submitted details to process estimate requests, schedule service appointments, and communicate regarding your vehicle repair needs.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">3. SMS Service Updates</h2>
          <p>
            If you check the box consenting to receive service status updates, we may send text messages regarding your service request, diagnostic findings, and scheduling. Consent to receive text messages is optional and not required to obtain service.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">4. Service Providers</h2>
          <p>
            Submitted information is processed through web hosting and lead dispatch infrastructure solely to deliver your request to shop staff.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">5. Contact Information</h2>
          <p>
            If you have questions about this policy, please contact our shop at:
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
      </div>
    </div>
  );
}
