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
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Column 1: NAP & Branding */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Wrench className="size-5" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-extrabold tracking-tight leading-none text-white uppercase">
                  {businessConfig.name.short}
                </span>
                <span className="text-[9px] font-bold tracking-widest leading-none mt-1 text-[#CC0000] uppercase">
                  {businessConfig.name.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-semibold">
              Family-owned auto repair and muffler specialty shop serving Anaheim and Orange County
              since {businessConfig.established}.
            </p>
            <div className="space-y-2 text-xs text-zinc-300 font-semibold">
              <p>
                📞{" "}
                <a
                  href={businessConfig.phone.link}
                  onClick={() =>
                    trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                  }
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  {businessConfig.phone.display}
                </a>
              </p>
              <p>📍 {businessConfig.address.full}</p>
              <p className="pt-2 text-zinc-450 text-[10px] font-bold uppercase tracking-wider">
                Hours
              </p>
              <p>Mon–Fri: {businessConfig.hours.weekdays}</p>
              <p>Sat: {businessConfig.hours.saturday}</p>
              <p>Sun: {businessConfig.hours.sunday}</p>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-xs font-semibold">
              {footerServicesList.map((s) => {
                const path = pathMap[s] || "/";
                return (
                  <li key={s}>
                    <a
                      href={path}
                      onClick={(e) => handleNavigation(e, path)}
                      className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                    >
                      {s}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Trust & Reviews */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Reviews & Directions</h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a
                  href={businessConfig.urls.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "reviews_click", source: "yelp" })}
                  className="hover:text-white transition-colors text-primary flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Read Yelp Reviews ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Anaheim+Auto+Repair+Muffler+Care,+2583+W+Ball+Rd,+Anaheim,+CA+92804"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "directions_click" })}
                  className="hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Get Directions on Google Maps ↗
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-lg bg-zinc-850 border border-zinc-800 p-4 max-w-[200px]">
              <p className="text-xs font-bold text-white">
                {businessConfig.rating.value} ★ on Yelp
              </p>
              <p className="text-[10px] text-zinc-400 mt-1">
                {businessConfig.rating.reviewsCount} verified reviews
              </p>
            </div>
          </div>

          {/* Column 4: Nearby Areas */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs font-semibold mb-4">
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNavigation(e, "/contact")}
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNavigation(e, "/privacy")}
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
            <p className="text-xs text-zinc-450 leading-relaxed font-semibold">
              Serving drivers in Anaheim, Garden Grove, Stanton, Orange, Cypress, Buena Park, and
              surrounding Orange County communities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-semibold text-zinc-500">
          <p>
            © {new Date().getFullYear()} {businessConfig.name.full}. All rights reserved.
          </p>
          <p>
            Built by{" "}
            <a
              href="https://kratosintelligence.com"
              className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary rounded"
            >
              Kratos Intelligence
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
