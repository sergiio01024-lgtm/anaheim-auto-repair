import { reviewsData } from "../data/reviews";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function TestimonialsSection() {
  const featured = reviewsData[0];
  const supporting = reviewsData.slice(1, 4);

  const handleYelpClick = () => {
    trackEvent({ type: "reviews_click", source: "testimonials_section" });
  };

  return (
    <section 
      aria-label="Customer Reviews"
      className="bg-white border-y border-[#DDE0E3] py-24 sm:py-28 px-4 sm:px-6 lg:px-8" 
      id="reviews"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[#C8202F] font-mono text-xs font-bold tracking-[0.25em] block mb-3 uppercase">
              YELP REVIEWS
            </span>
            <h2 className="text-[#16191D] text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              What Drivers Say About Us
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="flex items-center space-x-0.5" aria-label="4.7 out of 5 stars rating on Yelp">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-[#D99A24]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#16191D] text-sm font-bold">
              {businessConfig.rating.display}
            </span>
          </div>
        </div>

        {/* Featured Review Card */}
        <div className="bg-[#F6F6F3] border border-[#DDE0E3] rounded-2xl p-8 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <span className="px-2.5 py-1 bg-white border border-[#DDE0E3] text-[#16191D] font-mono font-bold text-[10px] uppercase tracking-wider rounded">
              {featured.platformLabel}
            </span>
            {featured.date && (
              <span className="text-xs font-mono font-bold text-[#818891]">{featured.date}</span>
            )}
          </div>

          <blockquote 
            className="text-[#16191D] text-xl sm:text-2xl lg:text-3xl font-bold leading-[1.3] mb-8 italic tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;{featured.text}&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-[#DDE0E3] gap-4">
            <div>
              <div className="font-bold text-[#16191D] text-base">{featured.name}</div>
              {featured.location && (
                <div className="text-xs text-[#606770] font-medium mt-0.5">{featured.location}</div>
              )}
            </div>
            <a
              href={featured.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleYelpClick}
              className="inline-flex items-center text-xs font-bold text-[#C8202F] hover:underline"
            >
              {featured.isDirectPermalink ? "View Review on Yelp ↗" : "Read Reviews on Yelp ↗"}
            </a>
          </div>
        </div>

        {/* Supporting Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supporting.map((review, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#DDE0E3] p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:border-[#C9CDD2] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono font-bold text-[#16191D] uppercase tracking-wider bg-[#F6F6F3] px-2 py-0.5 rounded border border-[#DDE0E3]">
                    {review.platform}
                  </span>
                  {review.rating && (
                    <div className="flex items-center space-x-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-[#D99A24]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-[#606770] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1F2F2]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#16191D] text-sm">{review.name}</div>
                    {review.location && (
                      <div className="text-xs text-[#818891] font-semibold mt-0.5">{review.location}</div>
                    )}
                  </div>
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleYelpClick}
                    className="text-xs font-bold text-[#C8202F] hover:underline"
                    aria-label={`Read reviews on Yelp by ${review.name}`}
                  >
                    {review.isDirectPermalink ? "View Review ↗" : "Read Reviews ↗"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read All Reviews CTA */}
        <div className="text-center">
          <a
            href={businessConfig.urls.yelp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleYelpClick}
            className="inline-flex items-center px-6 py-3.5 bg-[#F6F6F3] border border-[#DDE0E3] text-[#16191D] font-bold text-sm rounded-xl hover:bg-[#F1F2F2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#16191D]"
          >
            Read All 590+ Reviews on Yelp ↗
          </a>
        </div>
      </div>
    </section>
  );
}
