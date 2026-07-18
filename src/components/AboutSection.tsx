import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Copy */}
            <div className="text-center lg:text-left space-y-6">
              <span className="text-sm font-bold tracking-widest uppercase text-primary block">
                About Our Shop
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Family-Owned & Trusted in Anaheim Since {businessConfig.established}
              </h2>

              <div className="text-base sm:text-lg text-zinc-650 leading-relaxed font-semibold space-y-6">
                <p>
                  For over {businessConfig.yearsInBusiness} years, {businessConfig.name.full} has been
                  the local automotive shop Anaheim drivers count on for quality work and transparent
                  pricing. Our technicians handle everything from complete muffler replacements and
                  catalytic converters to suspension service, brake repair, and check-engine
                  diagnostics.
                </p>
                <p>
                  When you call, you speak directly with our shop manager,{" "}
                  {businessConfig.staff.manager}. We pride ourselves on giving clear quotes over the
                  phone and standing by them when you arrive. We operate with a simple philosophy: we
                  do honest work, charge a fair price, and never push repairs you do not need.
                </p>
              </div>

              <div className="border-t border-zinc-150 pt-6 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-zinc-500 font-semibold">
                <div>📍 2583 W Ball Rd, Anaheim</div>
                <div>🕒 {businessConfig.hours.summary}</div>
              </div>
            </div>

            {/* Right Column: Double Image Collage */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto lg:max-w-none">
              <div className="img-frame ratio-4-3 shadow-md border border-zinc-200">
                <img
                  src="/images/storefront-angle.webp"
                  alt="Anaheim Auto Repair Exterior Angle"
                  className="img-cover"
                />
              </div>
              <div className="img-frame ratio-4-3 shadow-md border border-zinc-200">
                <img
                  src="/images/front-desk.webp"
                  alt="Anaheim Auto Repair Front Desk Manager"
                  className="img-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
