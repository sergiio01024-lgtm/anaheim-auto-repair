import { useEffect } from "react";
import { trackEvent } from "../utils/analytics";
import { ContactSection } from "./ContactSection";
import { businessConfig } from "../config/business";

export interface ServicePageProps {
  title: string;
  description: string;
  longDescription: string;
  symptoms: string[];
  process: string[];
  related: string[];
  faq: { q: string; a: string }[];
  path: string;
}

export function ServicePage({
  title,
  description,
  longDescription,
  symptoms,
  process,
  related,
  faq,
  path,
}: ServicePageProps) {
  // Track page view event on mount
  useEffect(() => {
    trackEvent({ type: "service_page_view", path });
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header Space padding is handled by pt-24 */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <ol className="flex gap-2">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                className="hover:underline hover:text-primary font-semibold"
              >
                Home
              </a>
              <span className="ml-2">&gt;</span>
            </li>
            <li className="font-bold text-zinc-800" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">
                {title} in Anaheim, CA
              </h1>
              <p className="text-lg text-zinc-650 leading-relaxed font-semibold">{description}</p>
            </div>

            <div className="text-sm text-zinc-600 leading-relaxed space-y-4 font-medium">
              <p>{longDescription}</p>
            </div>

            {/* Symptoms */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">
                Common Warning Signs & Symptoms
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {symptoms.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-zinc-700 font-semibold"
                  >
                    <span className="text-primary font-bold">⚠️</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                Our Service & Repair Process
              </h2>
              <ol className="space-y-4">
                {process.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-zinc-600 font-semibold">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Service FAQ */}
            <div className="border-t border-zinc-200 pt-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Frequently Asked Questions</h2>
              <dl className="space-y-6">
                {faq.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <dt className="text-sm font-bold text-zinc-900">Q: {item.q}</dt>
                    <dd className="text-sm text-zinc-600 font-semibold pl-4 border-l-2 border-primary">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Sidebar / CTAs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50 shadow-sm text-center">
              <h3 className="text-base font-bold text-zinc-900 mb-3">Speak With Carson</h3>
              <p className="text-xs text-zinc-500 font-semibold mb-6">
                Get an instant estimate over the phone or check our availability.
              </p>
              <a
                href={businessConfig.phone.link}
                className="block w-full rounded-md bg-primary hover:bg-red-700 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary"
              >
                📞 Call {businessConfig.phone.display}
              </a>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 mb-3">Related Offerings</h3>
              <ul className="space-y-2 text-xs font-semibold">
                {related.map((item, idx) => (
                  <li key={idx} className="text-zinc-600 flex items-center gap-2">
                    <span className="text-primary">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-zinc-200 rounded-xl p-6 bg-zinc-50 shadow-sm text-center">
              <h3 className="text-sm font-bold text-zinc-900 mb-2">Shop Hours</h3>
              <p className="text-xs text-zinc-600 font-semibold">
                Mon–Fri: {businessConfig.hours.weekdays}
                <br />
                Saturday: {businessConfig.hours.saturday}
                <br />
                Sunday: {businessConfig.hours.sunday}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intake form preview included on all service detail pages */}
      <ContactSection />
    </div>
  );
}
