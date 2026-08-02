import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "INSPECT",
    description:
      "We reproduce the issue and inspect the relevant system.",
  },
  {
    number: "02",
    title: "EXPLAIN",
    description:
      "We explain the findings and recommended next steps.",
  },
  {
    number: "03",
    title: "REPAIR",
    description:
      "We complete the repair work and check the result.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-y border-[#DDE0E3]">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">
              How It Works
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#16191D] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Transparent From Start to Finish
            </h2>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
            {/* Connecting Line */}
            <div
              className="absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-[#DDE0E3]"
              aria-hidden="true"
            />

            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center px-6">
                {/* Step Number Circle */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 shadow-sm ${idx === 0
                      ? 'border-[#C8202F] bg-[#C8202F] text-white'
                      : 'border-[#DDE0E3] bg-white text-[#16191D]'
                    }`}
                >
                  <span
                    className="text-base font-semibold font-mono"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3
                  className="text-base sm:text-lg font-bold text-[#16191D] mb-2 tracking-wide uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  className="text-sm sm:text-base text-[#606770] leading-relaxed max-w-[280px]"
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden space-y-0">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-5">
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 shadow-sm ${idx === 0
                        ? 'border-[#C8202F] bg-[#C8202F] text-white'
                        : 'border-[#DDE0E3] bg-white text-[#16191D]'
                      }`}
                  >
                    <span className="text-xs font-semibold font-mono">
                      {step.number}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-[#DDE0E3] mt-1.5" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 pt-1">
                  <h3
                    className="text-base font-bold text-[#16191D] mb-1.5 tracking-wide uppercase"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#606770] leading-relaxed">
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
