import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { reviewsData } from "../data/reviews";
import { businessConfig } from "../config/business";

export function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviewsData : reviewsData.slice(0, 6);

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-950 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-gray-50 dark:bg-gray-950 opacity-10" />
      <ScrollReveal>
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center mb-16">
          <h2 className="text-base font-semibold text-red-400">Customer Reviews</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            What Our Customers Say
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {businessConfig.rating.value} ★ · {businessConfig.rating.reviewsCount} Reviews
          </p>
        </div>
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review, i) => (
            <figure
              key={`${review.name}-${i}`}
              className="rounded-2xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="size-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  <p>"{review.text}"</p>
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="size-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{review.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {review.location ? `${review.location} · ` : ""}
                    {review.date}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-md bg-gray-100 dark:bg-white/10 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ring-1 ring-inset ring-gray-200 dark:ring-white/10"
          >
            {showAll ? "Show Less" : "See All Reviews →"}
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
