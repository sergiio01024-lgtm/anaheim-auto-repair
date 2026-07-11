import { useEffect } from "react";
import { trackEvent } from "../utils/analytics";
import { ContactSection } from "./ContactSection";
import { businessConfig } from "../config/business";

export function ContactPage() {
  useEffect(() => {
    trackEvent({ type: "service_page_view", path: "/contact" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 text-center">
          Contact Our Shop
        </h1>

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="border border-zinc-200 rounded-xl p-8 bg-zinc-50 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">📍 Address & Details</h2>
            <p className="text-zinc-650 font-semibold mb-2">
              {businessConfig.name.full}
              <br />
              {businessConfig.address.full}
            </p>
            <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
              Located on W Ball Rd. On-site customer parking is available.
            </p>
          </div>

          <div className="border border-zinc-200 rounded-xl p-8 bg-zinc-50 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">🕒 Shop Hours</h2>
            <p className="text-zinc-650 font-semibold mb-2">
              Monday – Friday: {businessConfig.hours.weekdays}
              <br />
              Saturday: {businessConfig.hours.saturday}
            </p>
            <p className="text-xs text-zinc-500 font-semibold">
              Sunday: {businessConfig.hours.sunday}
            </p>
          </div>
        </div>

        <ContactSection />
      </div>
    </div>
  );
}
