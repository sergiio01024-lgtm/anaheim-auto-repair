import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const reviews = [
  { name: "Vanessa F.", location: "Garden Grove, CA", date: "Jul 2026", text: "I used to have a mechanic for years at another shop, but they got bought out and hiked prices. I had my catalytic converters replaced here — so quick and great service. Carson, the manager, is awesome and explained everything in detail about what actually needs fixing. Very honest and helpful! Definitely coming back." },
  { name: "Pauline V.", location: "Garden Grove, CA", date: "Apr 2026", text: "Super honest, reliable, and affordable. Gave me the best quote and great service replacing 6 of my spark plugs and coils. Carson gave me a quote over the phone and upheld the price when I came in a few days later. He remembered exactly what I told him and made the process easy." },
  { name: "Brandon P.", location: "Garden Grove, CA", date: "May 2026", text: "Everytime I have something wrong with my car it's my go-to spot. I've been coming for years and feel like family. Carson at the front desk is very helpful. The master mechanic Skip is highly intelligent and will get your car up and running fast. They always try to give a better price — never tried to overcharge me." },
  { name: "Joseph N.", location: "Anaheim, CA", date: "Nov 2025", text: "Really cool and trustworthy people working here. My car needed a new turn signal switch. Turns out it's more expensive than I thought — they told me where to go to buy the part cheaper. I brought it in and they installed it. Service is fast and top notch. My forever car shop from now on. 10/10." },
  { name: "John T.", location: "Anaheim, CA", date: "Feb 2026", text: "Honest place. Good work every time. Mr. Langston is a stand up guy and his nephew who runs the front is ready to help." },
  { name: "Linh P.", location: "La Puente, CA", date: "Mar 2026", text: "Super grateful for this shop. I got a new catalytic converter installed, a shield, and some much needed water pump repairs, and now my car could go for another 100,000 miles. The mechanics know how to fix cars for super reasonable prices, and they do it with kindness and honesty." },
  { name: "Nathan C.", location: "Wilmington, CA", date: "Apr 2026", text: "They replaced my wheel hub and gearbox on my Nissan Leaf. The price was the lowest I could find. Everything they recommended was spot on with affordable prices. The reviews are right — need a good mechanic, give them a try." },
  { name: "John B.", location: "Anaheim, CA", date: "Mar 2026", text: "This place has always fixed our cars, they're affordable and always make sure we're good to go. Thanks again." },
  { name: "Grace T.", location: "Anaheim, CA", date: "Mar 2023", text: "They treat you like family here. I went in for an oil change after the dealership wouldn't do it, and they did it for me with a much shorter wait. They gave me a free code read when my check engine light came on and advised next steps without trying to sell me anything extra. One of the few auto shops I feel confident going to." },
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
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">4.7 ★ · 595 Reviews</p>
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
