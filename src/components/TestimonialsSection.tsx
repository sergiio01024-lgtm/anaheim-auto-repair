import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const reviews = [
  { name: "Kimberly J.", location: "San Diego, CA", date: "Jun 2026", text: "Luke installed a new 40 amp circuit for me to accommodate an induction cooktop. I live in an older building and there was very little room to run new wire. Luke figured out the best approach and, before quoting the job, asked if I was sure I wanted to go through the expense for this cooktop. Luke came out and completed the job in just a few hours. Made sure everything was working correctly and cleaned up the job site. Very professional and easy to work with. Highly recommend." },
  { name: "Cole S.", location: "San Diego, CA", date: "Jun 2025", text: "Luke did a big electrical project at our office — changing fluorescent lights for LEDs, installing recessed lighting, and fixing other issues. He did an amazing job with excellent communication. He'll absolutely be our go-to for any electrical work." },
  { name: "Alicia F.", location: "San Diego, CA", date: "Nov 2023", text: "Luke was very responsive and coordinated with my tenant for a replacement upgraded electrical panel as requested by the HOA. I would highly recommend him and plan to use him in the future." },
  { name: "Neal P.", location: "Chula Vista, CA", date: "Apr 2022", text: "Luke of LTE electrical is very underrated on Yelp. Found him through another website for emergency electrical services on a Sunday afternoon. Luke came up with a solution and I decided to add an additional project. A great choice — Luke does professional commercial quality electrical work for residential projects. Highly recommend." },
  { name: "Ricardo R.", location: "Pacific Beach, CA", date: "Apr 2022", text: "Awesome job! A++ I absolutely recommend Luke and his team for any electrical job! Luke answered me on Yelp right away and was very communicative throughout the whole process. Came out the very next morning and completed the light installation in a timely manner. I will definitely contact LTE electrical for any future work!" },
  { name: "Sylvia M.", location: "San Diego, CA", date: "Apr 2025", text: "Awesome job, I would absolutely recommend this company! Luke came out to install 12 LED lights. His quote was very reasonable, he communicated well and efficiently, and they left everything clean." },
  { name: "Fred A.", location: "San Diego, CA", date: "Sep 2022", text: "Pricing is the best among a dozen of quotes that I received. Looks very knowledgeable and has installed many of these." },
  { name: "Joy C.", location: "Palo Alto, CA", date: "Jul 2022", text: "Luke was very responsive and flexible. Job involved wiring and installing several ceiling fans, sconces, can lights, a chandelier, and garage lighting, plus redoing an outdoor GFCI outlet. They were efficient and completed the job well within the estimated time. It was a pleasure having him do our stuff!" },
  { name: "Marcy T.", location: "San Diego, CA", date: "Jan 2023", text: "Called LTE because I smelled something burning in my home. He responded to me within 30 min and walked me through different suggestions. He quickly figured out that I had a short in one of my switches. LTE came out first thing in the morning, small charge and had me fixed within 10 minutes. Highly recommend." },
  { name: "Greg P.", location: "CA", date: "May 2022", text: "I've been using Luke now for the past four years. He's very reliable, does good work and I believe is reasonably priced. I don't think there's a job that I've given him he could not complete. I've referred him to many of my real estate clients and all have been more than satisfied." },
  { name: "Bryan Dunlap", date: "May 2021", text: "He is prompt, truthful about the timeline and cost and CLEAN!! Luke took the time to talk us through our job, step-by-step." },
  { name: "Will Mullins", date: "May 2023", text: "Luke is great - he fixed multiple electrical problems with my house over the course of 6 weeks, doesn't try to upsell you, and is very easy to work with. Highly recommend" },
  { name: "Roberta Clark", date: "Aug 2022", text: "If we could, we would give LTE/Luke 6 stars" },
];

export function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-gray-50 dark:bg-gray-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gray-50 dark:bg-gray-950 opacity-10" />
      <ScrollReveal>
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center mb-16">
          <h2 className="text-base font-semibold text-red-400">Customer Reviews</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            What Our Customers Say
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">5.0★ · 13 Reviews</p>
        </div>
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review, i) => (
            <figure key={`${review.name}-${i}`} className="rounded-2xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="size-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
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
                    {review.location ? `${review.location} · ` : ""}{review.date}
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
