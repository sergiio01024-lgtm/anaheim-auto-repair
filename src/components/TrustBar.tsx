import { businessConfig } from "../config/business";

export function TrustBar() {
  return (
    <div className="bg-white border-b border-[#DDE0E3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Est 1978 */}
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#16191D] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.established}
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#818891] uppercase mt-2">
              ESTABLISHED
            </span>
          </div>

          {/* Yelp Rating */}
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D99A24] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.rating.value} ★
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#818891] uppercase mt-2">
              YELP RATING
            </span>
          </div>

          {/* Reviews */}
          <a
            href={businessConfig.urls.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col group focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-[#16191D] group-hover:text-[#C8202F] transition-colors tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.rating.reviewsCount}+
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#818891] group-hover:text-[#606770] uppercase mt-2">
              YELP REVIEWS ↗
            </span>
          </a>

          {/* Specialist Care */}
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-[#16191D] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Mufflers & Exhaust
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#818891] uppercase mt-2">
              SPECIALIST CARE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
