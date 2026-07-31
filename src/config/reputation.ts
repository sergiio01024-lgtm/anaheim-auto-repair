import { businessConfig } from "./business";

/**
 * Centralized Reputation & Trust Data Architecture for Anaheim Auto Repair & Muffler Care.
 * 
 * Verified Source Evidence:
 * - Yelp Rating: 4.7 ★ (590+ reviews published on Yelp)
 * - Established: 1978 (Serving Anaheim since 1978)
 * - Official Yelp Profile: https://www.yelp.com/biz/anaheim-auto-repair-and-muffler-care-anaheim
 */

export interface ReputationMetric {
  label: string;
  value: string;
  detail: string;
  source: string;
  sourceUrl?: string;
}

export interface TransparencyCommitment {
  id: string;
  title: string;
  description: string;
}

export const reputationConfig = {
  primaryPlatform: {
    name: "Yelp",
    rating: businessConfig.rating.value,
    reviewsCount: businessConfig.rating.reviewsCount,
    reviewsCountDisplay: "590+",
    displayString: businessConfig.rating.display,
    profileUrl: businessConfig.urls.yelp,
  },
  established: businessConfig.established,
  yearsInBusiness: businessConfig.yearsInBusiness,
  externalLinks: {
    yelpProfile: businessConfig.urls.yelp,
    googleDirections: businessConfig.urls.directions,
    googleProfileUrl: null as string | null, // Currently unsupported in repository
    googleReviewUrl: null as string | null, // Currently unsupported in repository
  },
  metrics: [
    {
      label: "Customer Rating",
      value: "4.7 ★",
      detail: "Overall rating from 590+ reviews on Yelp",
      source: "Yelp",
      sourceUrl: businessConfig.urls.yelp,
    },
    {
      label: "Years in Business",
      value: `${businessConfig.yearsInBusiness}+`,
      detail: "Serving Anaheim since 1978",
      source: "Business History",
    },
    {
      label: "Service Area",
      value: "Anaheim & OC",
      detail: "Serving Orange County drivers for over 4 decades",
      source: "Business Records",
    },
    {
      label: "Specialist Care",
      value: "Mufflers & Exhaust",
      detail: "Custom pipes, catalytic converters, & diagnostics",
      source: "Core Services",
    },
  ] as ReputationMetric[],
  transparencyCommitments: [
    {
      id: "01",
      title: "Clear Explanation",
      description: "We inspect the relevant system and explain the findings before proceeding.",
    },
    {
      id: "02",
      title: "Estimate & Authorization",
      description: "Repair recommendations and estimated costs are communicated for customer authorization.",
    },
    {
      id: "03",
      title: "Need-Based Recommendations",
      description: "Recommendations focus on the vehicle's condition, safety, and requested service.",
    },
    {
      id: "04",
      title: "Repair-Appropriate Verification",
      description: "Completed work is checked using the inspection or test appropriate for the repair.",
    },
  ] as TransparencyCommitment[],
};
