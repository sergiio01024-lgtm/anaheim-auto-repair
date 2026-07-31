import { businessConfig } from "../config/business";

export function TrustBar() {
  return (
    <div className="bg-white border-b border-[#DDE0E3] shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4.5">
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-3.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#818891]">Est.</span>
            <span className="text-sm font-bold text-[#16191D]" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.established}
            </span>
          </div>

          <div className="h-4 w-px bg-[#DDE0E3] hidden sm:block" aria-hidden="true" />

          <a
            href={businessConfig.urls.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded px-1"
          >
            <span className="text-sm font-bold text-[#D99A24]" style={{ fontFamily: 'var(--font-display)' }}>
              {businessConfig.rating.value} ★
            </span>
            <span className="text-xs font-medium text-[#606770] group-hover:text-[#16191D] transition-colors">
              {businessConfig.rating.reviewsCount}+ Yelp Reviews ↗
            </span>
          </a>

          <div className="h-4 w-px bg-[#DDE0E3] hidden sm:block" aria-hidden="true" />

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#818891]">Specialist</span>
            <span className="text-sm font-semibold text-[#16191D]" style={{ fontFamily: 'var(--font-body)' }}>
              Mufflers & Catalytic Converters
            </span>
          </div>

          <div className="h-4 w-px bg-[#DDE0E3] hidden md:block" aria-hidden="true" />

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#818891]">{businessConfig.yearsInBusiness}+ Yrs</span>
            <span className="text-sm font-semibold text-[#16191D]" style={{ fontFamily: 'var(--font-body)' }}>
              Same Anaheim Location
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
