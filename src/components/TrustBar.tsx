import { businessConfig } from "../config/business";

export function TrustBar() {
  return (
    <div className="bg-zinc-50 border-b border-zinc-200 py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-center divide-y-0 md:divide-x divide-zinc-200">
          <div className="flex flex-col items-center justify-center px-4">
            <span className="text-xl font-extrabold text-zinc-900">
              Since {businessConfig.established}
            </span>
            <span className="text-xs text-zinc-500 font-semibold mt-1">
              48+ Years of Local Trust
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <span className="text-xl font-extrabold text-zinc-900">Specialist Shop</span>
            <span className="text-xs text-zinc-500 font-semibold mt-1">
              Mufflers & Catalytic Converters
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <a
              href={businessConfig.urls.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center focus-visible:outline-2 focus-visible:outline-primary rounded px-2"
            >
              <span className="text-xl font-extrabold text-primary group-hover:underline flex items-center gap-1">
                {businessConfig.rating.value} ★
              </span>
              <span className="text-xs text-zinc-500 font-semibold mt-1 group-hover:text-primary transition-colors">
                {businessConfig.rating.reviewsCount} Yelp Reviews ↗
              </span>
            </a>
          </div>

          <div className="flex flex-col items-center justify-center px-4">
            <span className="text-xl font-extrabold text-zinc-900">Honest Rates</span>
            <span className="text-xs text-zinc-500 font-semibold mt-1">
              Real Diagnostics, No Upsells
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
