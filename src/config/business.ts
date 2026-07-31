/**
 * Centralized business data and metadata for Anaheim Auto Repair & Muffler Care.
 *
 * Last Verified: 2026-07-11 (Verified review counts, ratings, hours, and staff names)
 */

export const businessConfig = {
  name: {
    full: "Anaheim Auto Repair & Muffler Care",
    short: "Anaheim Auto Repair",
    tagline: "& Muffler Care",
  },
  phone: {
    display: "(714) 826-4444",
    link: "tel:7148264444",
    linkWithCountry: "tel:+17148264444",
  },
  address: {
    full: "2583 W Ball Rd, Anaheim, CA 92804",
    street: "2583 W Ball Rd",
    city: "Anaheim",
    state: "CA",
    zip: "92804",
    country: "US",
  },
  hours: {
    weekdays: "8:30 AM – 5:30 PM",
    saturday: "8:30 AM – 4:30 PM",
    sunday: "Closed",
    summary: "Mon–Sat · Open 6 Days",
    list: [
      { days: "Mon–Fri", hours: "8:30 AM – 5:30 PM" },
      { days: "Saturday", hours: "8:30 AM – 4:30 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
  },
  established: 1978,
  yearsInBusiness: new Date().getFullYear() - 1978,
  rating: {
    value: 4.7,
    reviewsCount: 590,
    display: "4.7 ★ · 590+ Yelp Reviews",
  },
  urls: {
    yelp: "https://www.yelp.com/biz/anaheim-auto-repair-and-muffler-care-anaheim",
    canonical: "https://anaheim-auto-repair.vercel.app",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Anaheim+Auto+Repair+Muffler+Care,+2583+W+Ball+Rd,+Anaheim,+CA+92804",
  },
  staff: {
    manager: "Carson",
    founder: "Mr. Langston",
    owner: "Mr. Langston",
    mechanic: "Skip",
  },
  cities: [
    "Anaheim",
    "Santa Ana",
    "Garden Grove",
    "Orange",
    "Fullerton",
    "Buena Park",
    "Stanton",
    "Cypress",
    "Placentia",
    "Yorba Linda",
    "Tustin",
    "Costa Mesa",
    "Westminster",
    "La Palma",
    "Brea",
    "Villa Park",
    "Fountain Valley",
    "Anaheim Hills",
    "La Habra",
    "Midway City",
  ],
};
