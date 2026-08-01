import reputationData from "../data/reputation-data.json";
import { businessConfig } from "./business";

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
    name: reputationData.primaryPlatform.name,
    rating: businessConfig.rating.value,
    reviewsCount: businessConfig.rating.reviewsCount,
    reviewsCountDisplay: reputationData.primaryPlatform.reviewsCountDisplay,
    displayString: businessConfig.rating.display,
    profileUrl: businessConfig.urls.yelp,
  },
  established: businessConfig.established,
  yearsInBusiness: businessConfig.yearsInBusiness,
  externalLinks: {
    yelpProfile: businessConfig.urls.yelp,
    googleDirections: businessConfig.urls.directions,
    googleProfileUrl: null as string | null,
    googleReviewUrl: null as string | null,
  },
  metrics: reputationData.metrics as ReputationMetric[],
  transparencyCommitments: reputationData.transparencyCommitments as TransparencyCommitment[],
};
