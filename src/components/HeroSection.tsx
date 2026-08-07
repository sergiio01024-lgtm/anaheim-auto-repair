import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-[#17191C]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/storefront-front.webp"
          alt="Anaheim Auto Repair storefront on West Ball Road"
          className="img-cover hero-kenburns"
          fetchPriority="high"
        />
        {/* Controlled Directional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17191C]/92 via-[#17191C]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17191C]/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-28 sm:py-36 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-5 flex items-center gap-2.5">
              <span className="inline-block w-6 h-0.5 bg-[#C8202F]" aria-hidden="true" />
              Anaheim · Serving Drivers Since {businessConfig.established}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Auto Repair Without the Runaround.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-body)' }}>
              Mufflers, brakes, diagnostics, transmissions, alignment, and complete maintenance from an Anaheim shop trusted since {businessConfig.established}.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={businessConfig.phone.link}
                onClick={() => trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })}
                className="rounded-lg bg-[#C8202F] hover:bg-[#AE1D2A] px-7 py-3.5 text-base font-semibold text-white transition-colors text-center shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Call Shop: {businessConfig.phone.display}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3.5 text-base font-semibold transition-colors text-center backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request Estimate
              </a>
            </div>
          </div>

          {/* Simple human-facing proof panel on large screens */}
          <div className="hidden lg:block w-full max-w-sm bg-[#13171C]/95 border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Red accent edge */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C8202F]" />
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Muffler, Exhaust & Auto Repair
                </h3>
              </div>
              
              <div className="border-t border-white/10 pt-5">
                <div className="text-xl font-extrabold text-[#D99A24]">
                  {businessConfig.rating.value} ★ on Yelp
                </div>
                <p className="text-sm text-slate-300 mt-1">
                  590+ Reviews
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-base font-semibold text-white">
                  Anaheim, CA
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {businessConfig.address.street}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Concise Proof Line */}
        <div className="mt-10 flex items-center gap-2.5">
          <span className="inline-block size-2.5 rounded-full bg-[#D99A24]" aria-hidden="true" />
          <p className="text-sm font-medium text-slate-200">
            <span className="text-[#D99A24] font-semibold">{businessConfig.rating.value} ★ on Yelp</span>
          </p>
        </div>
      </div>
    </section>
  );
}
