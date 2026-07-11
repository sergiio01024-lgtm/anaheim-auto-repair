import { Wrench } from "lucide-react";
import { footerServices } from "../data/services";
import { businessConfig } from "../config/business";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-400 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {/* Wordmark logo adapted for dark background */}
            <div className="flex items-center gap-3 mb-4">
              <div className="size-9 bg-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
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
            <p className="text-sm text-gray-400 mb-4">
              Family-owned auto & muffler repair serving Anaheim & Orange County since{" "}
              {businessConfig.established}.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <a href={businessConfig.phone.link} className="hover:text-white transition-colors">
                  {businessConfig.phone.display}
                </a>
              </p>
              <p>{businessConfig.address.full}</p>
              <p className="mt-3 text-sm font-semibold text-white">Hours</p>
              <p>Mon–Fri: {businessConfig.hours.weekdays}</p>
              <p>Sat: {businessConfig.hours.saturday}</p>
              <p>Sun: {businessConfig.hours.sunday}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {footerServices.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {businessConfig.cities.slice(0, 12).map((c) => (
                <li key={c} className="text-sm text-gray-400">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ["Services", "#services"],
                ["About", "#about"],
                ["Reviews", "#reviews"],
                ["FAQ", "#faq"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              <p className="text-xs text-gray-400">{businessConfig.rating.value} ★ on Yelp</p>
              <p className="text-xs text-gray-400 mt-1">
                {businessConfig.rating.reviewsCount} Reviews
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Serving Anaheim Since {businessConfig.established}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {businessConfig.name.full}. All rights reserved. · Anaheim,
            CA
          </p>
          <p className="text-xs text-gray-400">
            Built by{" "}
            <a href="https://kratosintelligence.com" className="text-red-400 hover:text-red-300">
              Kratos Intelligence
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
