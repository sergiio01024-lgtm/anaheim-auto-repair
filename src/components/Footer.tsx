import React from "react";
import { Wrench } from "lucide-react";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

const pathMap: Record<string, string> = {
  "Muffler & Exhaust": "/muffler-repair-anaheim",
  "Catalytic Converters": "/catalytic-converter-anaheim",
  "Brakes & Suspension": "/brake-repair-anaheim",
  "Engine Diagnostics": "/engine-repair-anaheim",
  "Transmission Service": "/transmission-repair-anaheim",
  "Routine Maintenance": "/auto-maintenance-anaheim",
};

const footerServicesList = [
  "Muffler & Exhaust",
  "Catalytic Converters",
  "Brakes & Suspension",
  "Engine Diagnostics",
  "Transmission Service",
  "Routine Maintenance",
];

export function Footer() {
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    trackEvent({ type: "service_page_view", path });
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <footer className="bg-[#101214] border-t-2 border-[#C8202F] text-slate-300 relative">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Column 1: Branding & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-9 bg-[#C8202F] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <Wrench className="size-5" />
              </div>
              <div className="flex flex-col justify-center">
                <span
                  className="text-base font-bold tracking-tight leading-none text-white uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {businessConfig.name.short}
                </span>
                <span
                  className="text-[10px] font-medium tracking-[0.15em] leading-none mt-1 text-slate-400 uppercase"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {businessConfig.name.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Auto repair and muffler specialty shop serving Anaheim and Orange County
              since {businessConfig.established}.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mr-2">PH</span>
                <a
                  href={businessConfig.phone.link}
                  onClick={() =>
                    trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                  }
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded font-mono font-semibold text-white"
                >
                  {businessConfig.phone.display}
                </a>
              </p>
              <p className="flex items-start">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mr-2 flex-shrink-0">LOC</span>
                <span>{businessConfig.address.full}</span>
              </p>
              <div className="pt-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">HOURS</span>
                <p className="text-[11px] text-slate-400 font-mono">Mon–Fri: {businessConfig.hours.weekdays}</p>
                <p className="text-[11px] text-slate-400 font-mono">Sat: {businessConfig.hours.saturday}</p>
                <p className="text-[11px] text-slate-400 font-mono">Sun: {businessConfig.hours.sunday}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">SERVICES</span>
            <ul className="space-y-2.5 text-xs">
              {footerServicesList.map((s) => {
                const path = pathMap[s] || "/";
                return (
                  <li key={s}>
                    <a
                      href={path}
                      onClick={(e) => handleNavigation(e, path)}
                      className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                    >
                      {s}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Reviews & Directions */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">PROOF & LOCATION</span>
            <ul className="space-y-2.5 text-xs font-semibold mb-6">
              <li>
                <a
                  href={businessConfig.urls.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "reviews_click", source: "yelp" })}
                  className="text-[#D99A24] hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                >
                  Read Yelp Reviews ↗
                </a>
              </li>
              <li>
                <a
                  href={businessConfig.urls.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "directions_click" })}
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                >
                  Get Directions on Google Maps ↗
                </a>
              </li>
            </ul>
            <div className="rounded-xl border border-[#2A2E33] bg-[#17191C] p-4 max-w-[220px]">
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {businessConfig.rating.value} ★ on Yelp
              </p>
              <p className="text-[10px] font-mono text-slate-400 mt-1">
                {businessConfig.rating.reviewsCount}+ Yelp Reviews
              </p>
            </div>
          </div>

          {/* Column 4: Service Area */}
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">SERVICE AREA</span>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNavigation(e, "/contact")}
                  className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNavigation(e, "/privacy")}
                  className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
            <p className="text-xs text-slate-400 leading-relaxed">
              Serving drivers in Anaheim, Garden Grove, Stanton, Orange, Cypress, Buena Park, and
              surrounding Orange County communities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#2A2E33] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} {businessConfig.name.full}. All rights reserved.
          </p>
          <p>
            Built by{" "}
            <a
              href="https://kratosintelligence.com"
              className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
            >
              Kratos Intelligence
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
