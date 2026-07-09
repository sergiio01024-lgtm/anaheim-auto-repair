import { Wrench } from "lucide-react";

const services = [
  "Muffler & Exhaust",
  "Brakes & Suspension",
  "Engine Repair",
  "Transmission Service",
  "Oil Changes",
  "AC & Heating Repair",
  "Check Engine Diagnostics",
  "Tune-Ups",
  "Alignment",
  "Batteries",
  "Catalytic Converters",
  "Smog Check Prep",
];

const cities = [
  "Anaheim",
  "Santa Ana",
  "Garden Grove",
  "Orange",
  "Fullerton",
  "Buena Park",
  "Stanton",
  "Cypress",
  "Placentia",
  "Yorba Linda",
  "Tustin",
  "Westminster",
];

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
                  Anaheim Auto Repair
                </span>
                <span className="text-[9px] font-bold tracking-widest leading-none mt-1 text-[#CC0000] uppercase">
                  & Muffler Care
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">Family-owned auto & muffler repair serving Anaheim & Orange County since 1978.</p>
            <div className="space-y-2 text-sm text-gray-400">
              <p><a href="tel:7148264444" className="hover:text-white transition-colors">(714) 826-4444</a></p>
              <p>2583 W Ball Rd, Anaheim, CA 92804</p>
              <p className="mt-3 text-sm font-semibold text-white">Hours</p>
              <p>Mon–Fri: 8:30am – 5:30pm</p>
              <p>Sat: 8:30am – 4:30pm</p>
              <p>Sun: Closed</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
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
              {cities.map((c) => <li key={c} className="text-sm text-gray-400">{c}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[["Services", "#services"], ["About", "#about"], ["Reviews", "#reviews"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
              <p className="text-xs text-gray-400">4.7 ★ on Yelp</p>
              <p className="text-xs text-gray-400 mt-1">595 Reviews</p>
              <p className="text-xs text-gray-400 mt-1">Serving Anaheim Since 1978</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-gray-550">© {new Date().getFullYear()} Anaheim Auto Repair and Muffler Care. All rights reserved. · Anaheim, CA</p>
          <p className="text-xs text-gray-555">Built by <a href="https://kratosintelligence.com" className="text-red-400 hover:text-red-300">Kratos Intelligence</a></p>
        </div>
      </div>
    </footer>
  );
}
