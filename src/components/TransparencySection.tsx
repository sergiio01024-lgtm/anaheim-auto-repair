import { reputationConfig } from "../config/reputation";

export function TransparencySection() {
  return (
    <section
      aria-label="Shop Transparency and Expectations"
      className="bg-[#F6F6F3] border-y border-[#DDE0E3] py-20 px-4 sm:px-6 lg:px-8"
      id="transparency"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Title and Intro */}
          <div className="lg:col-span-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C8202F] block mb-3 uppercase">
              TRANSPARENCY COMMITMENT
            </span>
            <h2 className="text-[#16191D] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
              What You Can Expect
            </h2>
            <p className="text-[#606770] text-sm sm:text-base leading-relaxed">
              Straightforward communication about findings, recommendations, and next steps for your vehicle.
            </p>
          </div>

          {/* Right Column: 4 Refined Vertical Modules */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-10">
            {reputationConfig.transparencyCommitments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-[#DDE0E3] last:border-b-0 pb-8 last:pb-0"
              >
                {/* Large technical index */}
                <span className="text-2xl font-mono font-black text-[#C8202F]/60 flex-shrink-0 leading-none">
                  {item.id}
                </span>
                
                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-[#16191D] text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#606770] leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                  <span className="inline-block text-[9px] font-mono font-bold text-[#818891] uppercase tracking-wider mt-1 bg-white border border-[#DDE0E3] px-2 py-0.5 rounded">
                    Shop Commitment
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
