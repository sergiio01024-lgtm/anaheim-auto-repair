const services = [
  "Panel Upgrades",
  "EV Charger Installation",
  "Residential Wiring",
  "Commercial Electrical",
  "Lighting Installation",
  "Outlet & Switch Repair",
  "Emergency Repairs",
  "Ceiling Fan Installation",
  "Security Lighting",
  "Low Voltage",
  "Troubleshooting",
  "Generator Installations",
  "Temporary Power Connections",
];
const cities = ["San Diego", "Chula Vista", "El Cajon", "Santee", "Escondido", "La Mesa", "Lemon Grove", "National City", "Spring Valley", "Lakeside", "Poway", "Coronado"];

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">LTE Electric</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">Licensed C-10 electrical contractor serving all of San Diego County since 2018.</p>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
              <p><a href="tel:8589979251" className="hover:text-gray-900 dark:hover:text-white transition-colors">(858) 997-9251</a></p>
              <p>San Diego, CA</p>
              <p>CA C-10 License #1072569</p>
              <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">Hours</p>
              <p>Mon – Sat: Open 24 Hours</p>
              <p>Sun: Closed</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {cities.map((c) => <li key={c} className="text-sm text-gray-700 dark:text-gray-400">{c}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[["Services", "#services"], ["About", "#about"], ["Reviews", "#reviews"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-white dark:bg-white/5 ring-1 ring-gray-200 dark:ring-white/10 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">$2,000,000 Liability Insurance</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">$25,000 Bonded</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">BuildZoom Score: 112 (Top 3%)</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} LTE Electric. All rights reserved. Licensed Electrical Contractor · San Diego, CA</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Built by <a href="https://kratosintelligence.com" className="text-orange-400 hover:text-orange-300">Kratos Intelligence</a></p>
        </div>
      </div>
    </footer>
  );
}
