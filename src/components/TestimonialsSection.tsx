import { ScrollReveal } from "./ScrollReveal";
import { reviewsData } from "../data/reviews";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function TestimonialsSection() {
  const featured = reviewsData[0];
  const supporting = reviewsData.slice(1, 4);

  return (
    <section id="reviews" className="bg-white py-20 sm:py-24 border-y border-[#DDE0E3]">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-14">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">Reviews</span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#16191D] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What Customers Say
              </h2>
            </div>

            {/* Rating Block */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex flex-col items-start lg:items-end">
                <div className="flex items-center gap-2">
                  <span
                    className="text-4xl font-bold text-[#16191D]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.rating.value}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`size-5 ${i < Math.floor(businessConfig.rating.value) ? 'text-[#D99A24]' : 'text-[#DDE0E3]'} fill-current`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <a
                  href={businessConfig.urls.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "reviews_click", source: "yelp" })}
                  className="text-xs font-semibold text-[#606770] hover:text-[#16191D] transition-colors mt-1 focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {businessConfig.rating.reviewsCount}+ Yelp Reviews ↗
                </a>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Review */}
            <div
              className="lg:col-span-2 rounded-2xl p-8 sm:p-10 bg-white border border-[#DDE0E3] shadow-[0_8px_24px_rgba(22,25,29,0.07)] flex flex-col justify-between"
            >
              <div>
                <svg className="size-10 text-[#C8202F]/20 mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote>
                  <p
                    className="text-xl sm:text-2xl leading-relaxed font-medium text-[#16191D]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    "{featured.text}"
                  </p>
                </blockquote>
              </div>
              <div className="mt-8 pt-6 border-t border-[#DDE0E3] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base text-[#16191D]">
                    {featured.name}
                  </p>
                  <p className="text-xs text-[#818891] font-mono mt-0.5">
                    {featured.location} · {featured.date}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(featured.rating)].map((_, i) => (
                    <svg key={i} className="size-4 text-[#D99A24] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Supporting Reviews */}
            <div className="flex flex-col gap-6">
              {supporting.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-6 bg-white border border-[#DDE0E3] shadow-sm flex-1"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="size-3.5 text-[#D99A24] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#606770] leading-relaxed line-clamp-4">
                    "{review.text}"
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#DDE0E3]">
                    <p className="font-semibold text-xs text-[#16191D]">
                      {review.name}
                    </p>
                    <p className="text-[11px] text-[#818891] font-mono mt-0.5">
                      {review.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yelp CTA */}
          <div className="mt-12 text-center">
            <a
              href={businessConfig.urls.yelp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ type: "reviews_click", source: "yelp" })}
              className="inline-flex items-center gap-2 rounded-lg border border-[#DDE0E3] bg-white hover:bg-[#F6F6F3] px-6 py-3 text-sm font-semibold text-[#16191D] transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
            >
              Read All Reviews on Yelp
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
