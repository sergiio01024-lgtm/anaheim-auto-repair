import { businessConfig } from "../config/business";

export function TrustBar() {
  const badges = [
    `Serving Anaheim Since ${businessConfig.established}`,
    `${businessConfig.rating.value}★ on Yelp`,
    `${businessConfig.rating.reviewsCount}+ Reviews`,
    "Honest, No Upsell",
    "All Makes & Models",
    "Muffler & Exhaust Specialists",
    "Free Estimates",
    "Straight Phone Quotes",
    "Family-Owned & Operated",
  ];

  const doubledBadges = [...badges, ...badges];

  return (
    <div className="bg-red-500 py-3 overflow-hidden whitespace-nowrap">
      <div className="scroll-ticker-container">
        {doubledBadges.map((badge, i) => (
          <span key={i} className="text-sm font-medium text-white whitespace-nowrap shrink-0">
            ✓ {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
