import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function AboutSection() {
  return (
    <section id="about" aria-label="About Our Shop" className="bg-[#F6F6F3] py-24 sm:py-28 border-b border-[#DDE0E3]">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C8202F] block mb-3 uppercase">
                OUR SHOP & HISTORY
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16191D] leading-[1.1] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Serving Anaheim Drivers Since {businessConfig.established}.
              </h2>
              <div className="space-y-5 text-sm sm:text-base text-[#606770] leading-relaxed">
                <p>
                  Anaheim Auto Repair & Muffler Care has served Anaheim drivers since {businessConfig.established}. Over {businessConfig.yearsInBusiness} years, we&apos;ve provided dedicated auto care trusted by generations of Orange County drivers.
                </p>
                <p>
                  Built on a simple principle: diagnose accurately, communicate clearly, and complete repair work with integrity. We service domestic and import vehicles — Honda, Toyota, Ford, Chevrolet, BMW, Mercedes, Nissan, Lexus, and more.
                </p>
                <p>
                  Our goal is clear communication about vehicle condition, recommended service, safety, and performance.
                </p>
              </div>

              {/* Key Facts */}
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#DDE0E3] pt-8">
                <div>
                  <span
                    className="text-3xl sm:text-4xl font-black text-[#C8202F] block tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.yearsInBusiness}+
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#818891] mt-1.5 block uppercase">Years in Business</span>
                </div>
                <div>
                  <span
                    className="text-3xl sm:text-4xl font-black text-[#16191D] block tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.rating.reviewsCount}+
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#818891] mt-1.5 block uppercase">Yelp Reviews</span>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2 rounded-2xl overflow-hidden border border-[#DDE0E3] shadow-sm group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src="/images/service-bays.webp"
                    alt="Anaheim Auto Repair service bays with vehicles on lifts"
                    className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#DDE0E3] shadow-sm group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/front-desk.webp"
                    alt="Customer service front desk area at Anaheim Auto Repair"
                    className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#DDE0E3] shadow-sm group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/storefront-daytime.webp"
                    alt="Exterior view of Anaheim Auto Repair shop on West Ball Road"
                    className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
