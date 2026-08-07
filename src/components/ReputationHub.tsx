import { reputationConfig } from "../config/reputation";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function ReputationHub() {
  const handleYelpClick = () => {
    trackEvent({ type: "reviews_click", source: "reputation_hub" });
  };

  return (
    <section 
      aria-label="Reputation and Trust"
      className="bg-white border-y border-[#DDE0E3] py-16 sm:py-20 px-6 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Primary Reputation Metric */}
          <div className="lg:col-span-5 bg-[#F6F6F3] border border-[#DDE0E3] rounded-2xl p-8 shadow-sm">
            <span className="text-[#C8202F] font-bold text-xs uppercase tracking-widest block mb-3">
              Yelp Feedback
            </span>
            <h2 className="text-[#16191D] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Trusted by Anaheim Drivers Since {businessConfig.established}
            </h2>
            <p className="text-[#606770] text-sm leading-relaxed mb-6">
              Decades of automotive repair work serving Anaheim drivers since {businessConfig.established}.
            </p>

            {/* Rating Highlight Block */}
            <div className="bg-white border border-[#DDE0E3] rounded-xl p-5 mb-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-[#16191D]" style={{ fontFamily: "var(--font-display)" }}>
                  {reputationConfig.primaryPlatform.rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center space-x-0.5" aria-label={`Rating: ${reputationConfig.primaryPlatform.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-[#D99A16]"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-[#16191D] mt-1">
                    {reputationConfig.primaryPlatform.reviewsCountDisplay} Yelp Reviews
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#818891] leading-relaxed">
                Authentic, unedited reviews published by local drivers.
              </p>
            </div>

            {/* Read Reviews CTA */}
            <a
              href={reputationConfig.externalLinks.yelpProfile}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleYelpClick}
              className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-[#C8202F] hover:bg-[#AE1D2A] text-white font-bold text-sm rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C8202F]"
            >
              Read Reviews on Yelp ↗
            </a>
          </div>

          {/* Right Column: Clean human introduction */}
          <div className="lg:col-span-7">
            <h3 className="text-[#16191D] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Straightforward Care for Your Vehicle
            </h3>
            <p className="text-[#606770] text-base sm:text-lg leading-relaxed">
              Since {businessConfig.established}, our shop has provided reliable muffler, exhaust, and general auto repair to the Anaheim community. We focus on direct explanations and quality mechanical work so you can get back on the road safely.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
