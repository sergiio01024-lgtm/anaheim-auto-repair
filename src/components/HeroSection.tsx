import { businessConfig } from "../config/business";

export function HeroSection() {
  return (
    <section className="relative bg-white pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-zinc-200">
      {/* Decorative subtle background gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,rgba(200,32,47,0.02),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tagline / Eyebrow */}
            <div className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-red-500/10 mb-6">
              Serving Anaheim & Orange County Since {businessConfig.established}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Anaheim's Trusted Auto & Muffler Repair Shop
            </h1>

            {/* Subheading focusing on muffler and exhaust specialty */}
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-zinc-600 font-medium">
              Specializing in mufflers, catalytic converters, custom exhausts, brakes, and complete
              auto diagnostics. Family-owned and committed to honest rates with zero pressure.
            </p>

            {/* Key Value Points */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-zinc-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="text-primary text-base">✓</span> {businessConfig.yearsInBusiness}+
                Years of Local Trust
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-primary text-base">✓</span> Yelp-Rated {businessConfig.rating.value}★ ({businessConfig.rating.reviewsCount} Reviews)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-primary text-base">✓</span> Clear Quotes & No Upselling
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <a
                href={businessConfig.phone.link}
                className="w-full sm:w-auto rounded-md bg-primary hover:bg-red-700 px-6 py-4 text-base font-bold text-white shadow-md transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                📞 Call Now: {businessConfig.phone.display}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto rounded-md bg-zinc-100 hover:bg-zinc-200 px-6 py-4 text-base font-bold text-zinc-800 shadow-sm border border-zinc-300 transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
              >
                Request Free Estimate
              </a>
            </div>
          </div>

          {/* Right Column: Storefront Image */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="img-frame ratio-4-3 shadow-xl border border-zinc-200">
              <img
                src="/images/storefront-daytime.webp"
                alt="Anaheim Auto Repair Storefront"
                className="img-cover hero-kenburns"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
