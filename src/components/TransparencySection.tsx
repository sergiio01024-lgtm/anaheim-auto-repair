import { reputationConfig } from "../config/reputation";

export function TransparencySection() {
  return (
    <section
      aria-label="Shop Transparency and Expectations"
      className="bg-[#F1F2F2] border-y border-[#DDE0E3] py-16 px-4 sm:px-6 lg:px-8"
      id="transparency"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#C8202F] font-bold text-xs uppercase tracking-widest block mb-2">
            OUR TRANSPARENCY COMMITMENT
          </span>
          <h2 className="text-[#16191D] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            What You Can Expect
          </h2>
          <p className="text-[#606770] text-base leading-relaxed">
            Straightforward diagnostic communication, clear pricing before repair work starts, and no high-pressure sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reputationConfig.transparencyCommitments.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DDE0E3] p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:border-[#C9CDD2] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-[#3E9B68]/10 text-[#3E9B68] flex items-center justify-center font-extrabold text-sm">
                    ✓
                  </span>
                  <span className="text-xs font-mono font-bold text-[#818891]">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-[#16191D] text-lg font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-[#606770] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#F1F2F2] text-[11px] font-semibold text-[#818891] uppercase tracking-wider">
                Shop Commitment
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
