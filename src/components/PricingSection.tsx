import { ScrollReveal } from "./ScrollReveal";

export function PricingSection() {
  return (
    <div id="pricing" className="bg-gray-50 dark:bg-gray-950 py-24 sm:py-32 border-y border-gray-200 dark:border-white/5">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold text-orange-400">Pricing</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Ballpark Price Ranges
            </p>
            <p className="mt-4 text-xl font-medium text-orange-400">
              Free estimates on all jobs.
            </p>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              These are typical ranges — final price depends on scope.
            </p>
          </div>

          <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
            {/* Card 1: Panel Upgrades */}
            <div className="flex flex-col justify-between rounded-3xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 hover:ring-orange-500/30 transition-all duration-300">
              <div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">Panel Upgrades</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">$1,500–$3,500</span>
                </p>
                <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Upgrade your home to a modern 200-amp service. Includes new breaker panel, meter main, and full permitting.
                </p>
              </div>
            </div>

            {/* Card 2: EV Charger Installation */}
            <div className="flex flex-col justify-between rounded-3xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 hover:ring-orange-500/30 transition-all duration-300">
              <div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">EV Charger Installation</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">$800–$1,800</span>
                </p>
                <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Level 2 home charging outlet or hardwired station. Includes load assessment, dedicated circuit, and installation.
                </p>
              </div>
            </div>

            {/* Card 3: Residential Wiring */}
            <div className="flex flex-col justify-between rounded-3xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 hover:ring-orange-500/30 transition-all duration-300">
              <div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">Residential Wiring</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">$500–$2,000</span>
                </p>
                <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Rewiring, switch/outlet replacements, recessed lighting installs, and circuit additions.
                </p>
              </div>
            </div>

            {/* Card 4: Commercial Electrical */}
            <div className="flex flex-col justify-between rounded-3xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 hover:ring-orange-500/30 transition-all duration-300">
              <div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">Commercial Electrical</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Custom Quote</span>
                </p>
                <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Tenant improvements, large-scale commercial build-outs, and switchgear maintenance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
