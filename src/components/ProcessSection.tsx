import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "INSPECT",
    description:
      "We check the relevant system and identify the cause. Our focus is on genuine repair needs and vehicle safety.",
  },
  {
    number: "02",
    title: "EXPLAIN",
    description:
      "We explain what we found and the recommended next steps. We walk you through the findings so you understand what needs priority attention.",
  },
  {
    number: "03",
    title: "REPAIR",
    description:
      "Approved work is completed and the result is checked. We focus on completing the repair carefully and addressing the vehicle concern.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-[#101214] py-20 sm:py-24 border-y border-white/5">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C8202F] block mb-3 uppercase">
              WORKFLOW TIMELINE
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Service Process
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Clear, straightforward diagnostic and repair steps for every vehicle.
            </p>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
            {/* Connecting Line */}
            <div
              className="absolute top-8 left-[16.67%] right-[16.67%] h-px bg-white/10"
              aria-hidden="true"
            />

            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center px-6">
                {/* Step Number Circle */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full border-2 border-[#C8202F] bg-[#17191C] flex items-center justify-center mb-5 shadow-lg shadow-black/40"
                >
                  <span
                    className="text-base font-bold font-mono text-[#C8202F]"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3
                  className="text-base sm:text-lg font-bold text-white mb-2 tracking-widest uppercase font-mono"
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  className="text-sm text-slate-400 leading-relaxed max-w-[280px]"
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden space-y-0 max-w-md mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-5">
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-[#C8202F] bg-[#17191C] flex items-center justify-center flex-shrink-0 shadow-md shadow-black/40"
                  >
                    <span className="text-sm font-bold font-mono text-[#C8202F]">
                      {step.number}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-px h-12 bg-white/10 mt-1.5" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 pt-1">
                  <h3
                    className="text-base font-bold text-white mb-1.5 tracking-widest uppercase font-mono"
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
