import { businessConfig } from "../config/business";

export function TrustBar() {
  return (
    <div className="bg-white border-b border-[#DDE0E3]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Since 1978 */}
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black text-[#16191D] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Since {businessConfig.established}
            </span>
            <span className="text-xs font-medium text-[#606770] mt-1.5 uppercase tracking-wider">
              Serving Anaheim
            </span>
          </div>

          {/* Yelp Reviews */}
          <a
            href={businessConfig.urls.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col group focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
          >
            <span className="text-2xl sm:text-3xl font-black text-[#16191D] group-hover:text-[#C8202F] transition-colors tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.rating.reviewsCount}+
            </span>
            <span className="text-xs font-medium text-[#606770] group-hover:text-[#C8202F] mt-1.5 uppercase tracking-wider">
              Yelp Reviews ↗
            </span>
          </a>

          {/* Muffler & Exhaust Specialists */}
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-[#16191D] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Muffler & Exhaust
            </span>
            <span className="text-xs font-medium text-[#606770] mt-1.5 uppercase tracking-wider">
              Specialists
            </span>
          </div>

          {/* Address Location */}
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-[#16191D] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.address.street}
            </span>
            <span className="text-xs font-medium text-[#606770] mt-1.5 uppercase tracking-wider">
              {businessConfig.address.city}, CA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
