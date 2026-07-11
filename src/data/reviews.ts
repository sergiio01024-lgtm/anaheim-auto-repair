/**
 * Customer review records for Anaheim Auto Repair & Muffler Care.
 *
 * Last Verified: 2026-07-11
 */

export interface Review {
  name: string;
  location: string;
  date: string;
  text: string;
  rating: number;
}

export const reviewsData: Review[] = [
  {
    name: "Vanessa F.",
    location: "Garden Grove, CA",
    date: "Jul 2026",
    text: "I used to have a mechanic for years at another shop, but they got bought out and hiked prices. I had my catalytic converters replaced here — so quick and great service. Carson, the manager, is awesome and explained everything in detail about what actually needs fixing. Very honest and helpful! Definitely coming back.",
    rating: 5,
  },
  {
    name: "Pauline V.",
    location: "Garden Grove, CA",
    date: "Apr 2026",
    text: "Super honest, reliable, and affordable. Gave me the best quote and great service replacing 6 of my spark plugs and coils. Carson gave me a quote over the phone and upheld the price when I came in a few days later. He remembered exactly what I told him and made the process easy.",
    rating: 5,
  },
  {
    name: "Brandon P.",
    location: "Garden Grove, CA",
    date: "May 2026",
    text: "Everytime I have something wrong with my car it's my go-to spot. I've been coming for years and feel like family. Carson at the front desk is very helpful. The master mechanic Skip is highly intelligent and will get your car up and running fast. They always try to give a better price — never tried to overcharge me.",
    rating: 5,
  },
  {
    name: "Joseph N.",
    location: "Anaheim, CA",
    date: "Nov 2025",
    text: "Really cool and trustworthy people working here. My car needed a new turn signal switch. Turns out it's more expensive than I thought — they told me where to go to buy the part cheaper. I brought it in and they installed it. Service is fast and top notch. My forever car shop from now on. 10/10.",
    rating: 5,
  },
  {
    name: "John T.",
    location: "Anaheim, CA",
    date: "Feb 2026",
    text: "Honest place. Good work every time. Mr. Langston is a stand up guy and his nephew who runs the front is ready to help.",
    rating: 5,
  },
  {
    name: "Linh P.",
    location: "La Puente, CA",
    date: "Mar 2026",
    text: "Super grateful for this shop. I got a new catalytic converter installed, a shield, and some much needed water pump repairs, and now my car could go for another 100,000 miles. The mechanics know how to fix cars for super reasonable prices, and they do it with kindness and honesty.",
    rating: 5,
  },
  {
    name: "Nathan C.",
    location: "Wilmington, CA",
    date: "Apr 2026",
    text: "They replaced my wheel hub and gearbox on my Nissan Leaf. The price was the lowest I could find. Everything they recommended was spot on with affordable prices. The reviews are right — need a good mechanic, give them a try.",
    rating: 5,
  },
  {
    name: "John B.",
    location: "Anaheim, CA",
    date: "Mar 2026",
    text: "This place has always fixed our cars, they're affordable and always make sure we're good to go. Thanks again.",
    rating: 5,
  },
  {
    name: "Grace T.",
    location: "Anaheim, CA",
    date: "Mar 2023",
    text: "They treat you like family here. I went in for an oil change after the dealership wouldn't do it, and they did it for me with a much shorter wait. They gave me a free code read when my check engine light came on and advised next steps without trying to sell me anything extra. One of the few auto shops I feel confident going to.",
    rating: 5,
  },
];
