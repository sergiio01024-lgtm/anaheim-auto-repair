import { useTheme } from "../context/ThemeContext";
import { ScrollReveal } from "./ScrollReveal";

const cities = [
  "Anaheim", "Santa Ana", "Garden Grove", "Orange", "Fullerton",
  "Buena Park", "Stanton", "Cypress", "Placentia", "Yorba Linda",
  "Tustin", "Costa Mesa", "Westminster", "La Palma", "Brea",
  "Villa Park", "Fountain Valley", "Anaheim Hills", "La Habra", "Midway City"
];

export function ServiceAreaMap() {
  const { theme } = useTheme();

  return (
    <div className="bg-gray-50 dark:bg-gray-950/40 py-24 sm:py-32 border-y border-gray-200 dark:border-white/5">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-base font-semibold text-red-650 dark:text-red-400">Service Area</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Serving Anaheim & Orange County
              </p>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Located on W Ball Rd in Anaheim, we serve drivers from all over Orange County — walk-ins and appointments welcome.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-2">
                {cities.map((city) => (
                  <div key={city} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <svg className="size-4 text-red-600 dark:text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {city}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-md bg-red-600 hover:bg-red-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                >
                  Check Your Area →
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 h-[500px] lg:h-[600px]">
                <iframe
                  title="Anaheim Auto Repair Service Area"
                  src="https://maps.google.com/maps?q=Anaheim+Auto+Repair+Muffler+Care,+2583+W+Ball+Rd,+Anaheim,+CA+92804&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: theme === "dark" ? "invert(90%) hue-rotate(180deg)" : "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
