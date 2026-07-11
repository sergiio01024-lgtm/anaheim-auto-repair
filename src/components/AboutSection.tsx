import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
              About Our Shop
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
              Family-Owned & Trusted in Anaheim Since {businessConfig.established}
            </h2>

            <div className="mt-8 text-base sm:text-lg text-zinc-650 leading-relaxed font-semibold space-y-6 text-left">
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

            <div className="mt-10 border-t border-zinc-150 pt-8 flex justify-center gap-8 text-sm text-zinc-500 font-semibold">
              <div>📍 2583 W Ball Rd, Anaheim</div>
              <div>📞 {businessConfig.phone.display}</div>
              <div>🕒 {businessConfig.hours.summary}</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
