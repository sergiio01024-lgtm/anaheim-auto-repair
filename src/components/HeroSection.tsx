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

          {/* Technical specification panel on large screens */}
          <div className="hidden lg:block w-full max-w-sm bg-[#13171C]/90 border border-white/10 p-6 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-md">
            {/* Red accent edge */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C8202F]" />
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#C8202F] uppercase mb-6 pl-2">
              SHOP SPECIFICATIONS
            </h3>
            <div className="space-y-3.5 font-mono text-xs pl-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">SHOP</span>
                <span className="text-white font-bold text-right">{businessConfig.name.full}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">SPECIALTY</span>
                <span className="text-white font-bold text-right">Mufflers & Catalytic Converters</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">LOCATION</span>
                <span className="text-white font-bold text-right">{businessConfig.address.city}, {businessConfig.address.state}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">ESTABLISHED</span>
                <span className="text-white font-bold text-right">{businessConfig.established}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-medium">RATING</span>
                <span className="text-white font-bold text-right">4.7 ★ on Yelp</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400 font-medium">REVIEWS</span>
                <span className="text-white font-bold text-right">590+ Yelp Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Concise Proof Line */}
        <div className="mt-10 flex items-center gap-2.5">
          <span className="inline-block size-2.5 rounded-full bg-[#D99A24]" aria-hidden="true" />
          <p className="text-sm font-medium text-slate-200">
            <span className="text-[#D99A24] font-semibold">{businessConfig.rating.value} ★ on Yelp</span>
            <span className="mx-2 text-slate-400">·</span>
            <span>Serving Anaheim since {businessConfig.established}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
