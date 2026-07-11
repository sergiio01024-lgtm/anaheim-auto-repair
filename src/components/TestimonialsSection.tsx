import { reviewsData } from "../data/reviews";
import { businessConfig } from "../config/business";
import { ScrollReveal } from "./ScrollReveal";

export function TestimonialsSection() {
  // Feature exactly the first three strong verified Yelp reviews
  const featuredReviews = reviewsData.slice(0, 3);

  return (
    <section id="reviews" className="bg-zinc-50 py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center mb-16 px-6">
          <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-base text-zinc-600 font-medium">
            Read verified feedback from local Orange County drivers who trust our shop.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredReviews.map((review, idx) => (
            <figure
              key={`${review.name}-${idx}`}
              className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Yelp Source & 5 Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, starIdx) => (
                      <svg
                        key={starIdx}
                        className="size-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">
                    Yelp Review
                  </span>
                </div>

                <blockquote className="text-zinc-700 text-sm leading-relaxed font-semibold italic">
                  <p>"{review.text}"</p>
                </blockquote>
              </div>

              <figcaption className="mt-8 border-t border-zinc-100 pt-4 flex items-center gap-x-3">
                <div className="size-8 rounded-full bg-red-100 text-primary flex items-center justify-center font-bold text-xs">
                  {review.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900">{review.name}</div>
                  <div className="text-zinc-500 text-xs font-semibold">
                    {review.location ? `${review.location} · ` : ""}
                    {review.date}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Yelp Outbound Link */}
        <div className="mt-12 text-center">
          <a
            href={businessConfig.urls.yelp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded px-1 py-0.5"
          >
            Read all {businessConfig.rating.reviewsCount} reviews on Yelp ↗
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
