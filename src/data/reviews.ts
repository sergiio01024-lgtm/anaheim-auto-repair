import { businessConfig } from "../config/business";

/**
 * Customer review records for Anaheim Auto Repair & Muffler Care.
 * All review quotes and customer names are authentic excerpts from customer feedback on Yelp.
 * 
 * Provenance Audit Note:
 * Individual dates, locations, service category tags, and individual star values have been 
 * omitted from public display because they are not backed by direct individual review permalinks.
 * The overall shop rating of 4.7 ★ (590+ reviews) remains published via Yelp.
 */

export interface Review {
  name: string;
  text: string;
  platform: "Yelp";
  platformLabel: string;
  sourceUrl: string;
  isDirectPermalink: boolean;
  date?: string;
  location?: string;
  serviceCategory?: string;
  rating?: number;
}

export const reviewsData: Review[] = [
  {
    name: "Vanessa F.",
    text: "I used to have a mechanic for years at another shop, but they got bought out and hiked prices. I had my catalytic converters replaced here — so quick and great service. Carson, the manager, is awesome and explained everything in detail about what actually needs fixing. Very honest and helpful! Definitely coming back.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
  {
    name: "Pauline V.",
    text: "Super honest, reliable, and affordable. Gave me the best quote and great service replacing 6 of my spark plugs and coils. Carson gave me a quote over the phone and upheld the price when I came in a few days later. He remembered exactly what I told him and made the process easy.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
  {
    name: "Brandon P.",
    text: "Everytime I have something wrong with my car it's my go-to spot. I've been coming for years and feel like family. Carson at the front desk is very helpful. The master mechanic Skip is highly intelligent and will get your car up and running fast. They always try to give a better price — never tried to overcharge me.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
  {
    name: "Joseph N.",
    text: "Really cool and trustworthy people working here. My car needed a new turn signal switch. Turns out it's more expensive than I thought — they told me where to go to buy the part cheaper. I brought it in and they installed it. Service is fast and top notch. My forever car shop from now on. 10/10.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
  {
    name: "John T.",
    text: "Honest place. Good work every time. Mr. Langston is a stand up guy and his nephew who runs the front is ready to help.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
  {
    name: "Linh P.",
    text: "Super grateful for this shop. I got a new catalytic converter installed, a shield, and some much needed water pump repairs, and now my car could go for another 100,000 miles. The mechanics know how to fix cars for super reasonable prices, and they do it with kindness and honesty.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
  {
    name: "Nathan C.",
    text: "They replaced my wheel hub and gearbox on my Nissan Leaf. The price was the lowest I could find. Everything they recommended was spot on with affordable prices. The reviews are right — need a good mechanic, give them a try.",
    platform: "Yelp",
    platformLabel: "Customer review published on Yelp",
    sourceUrl: businessConfig.urls.yelp,
    isDirectPermalink: false,
  },
];
