import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function AboutSection() {
  return (
    <section id="about" className="bg-[#F6F6F3] py-20 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">Our Shop</span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#16191D] leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Same Corner. Same Family. Since {businessConfig.established}.
              </h2>
              <div className="space-y-4 text-base text-[#606770] leading-relaxed">
                <p>
                  Anaheim Auto Repair & Muffler Care started on West Ball Road in {businessConfig.established} as a muffler and exhaust shop. That's still our specialty — but over {businessConfig.yearsInBusiness} years, we've grown into a full-service repair center trusted by families across Orange County.
                </p>
                <p>
                  Owner {businessConfig.staff.owner} built this shop on a simple idea: be upfront about what's wrong, give an honest price, and do the job right. That approach hasn't changed. His nephew {businessConfig.staff.manager} runs the front office now, and master mechanic {businessConfig.staff.mechanic} has been running the bays for over a decade.
                </p>
                <p>
                  We work on all makes and models — Honda, Toyota, Ford, Chevy, BMW, Mercedes, Nissan, Lexus, and more. Prices are quoted upfront. There's no pressure and no fine print.
                </p>
              </div>

              {/* Key Facts */}
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#DDE0E3] pt-6">
                <div>
                  <span
                    className="text-3xl sm:text-4xl font-bold text-[#C8202F] block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.yearsInBusiness}+
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#818891] mt-1 block" style={{ fontFamily: "var(--font-mono)" }}>Years in Business</span>
                </div>
                <div>
                  <span
                    className="text-3xl sm:text-4xl font-bold text-[#16191D] block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.rating.reviewsCount}+
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#818891] mt-1 block" style={{ fontFamily: "var(--font-mono)" }}>Yelp Reviews</span>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 img-frame rounded-2xl overflow-hidden border border-[#DDE0E3] shadow-sm">
                <div className="aspect-[16/9]">
                  <img
                    src="/images/service-bays.webp"
                    alt="Anaheim Auto Repair service bays with vehicles on lifts"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="img-frame rounded-xl overflow-hidden border border-[#DDE0E3] shadow-sm">
                <div className="aspect-[4/3]">
                  <img
                    src="/images/front-desk.webp"
                    alt="Front desk and customer area at Anaheim Auto Repair"
                    className="img-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="img-frame rounded-xl overflow-hidden border border-[#DDE0E3] shadow-sm">
                <div className="aspect-[4/3]">
                  <img
                    src="/images/storefront-daytime.webp"
                    alt="Exterior view of Anaheim Auto Repair shop"
                    className="img-cover"
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
