const badges = [
  "Licensed C-10 Contractor",
  "Fully Insured & Bonded",
  "5-Star Yelp Rated",
  "Permits Pulled on Every Job",
  "Union-Trained Electrician",
  "Accepts Credit Cards",
  "16 Years Experience",
  "Free Estimates",
  "Locally Owned & Operated",
];

export function TrustBar() {
  const doubledBadges = [...badges, ...badges];

  return (
    <div className="bg-orange-500 py-3 overflow-hidden whitespace-nowrap">
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
