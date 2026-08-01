import businessData from "../data/business-data.json";

export interface BusinessConfig {
  name: {
    full: string;
    short: string;
    tagline: string;
  };
  address: {
    full: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: {
    display: string;
    link: string;
    linkWithCountry: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    list: { days: string; hours: string }[];
    verificationStatus: string;
    ownerConfirmationRequired: boolean;
  };
  established: number;
  yearsInBusiness: number;
  rating: {
    value: number;
    reviewsCount: number;
    display: string;
  };
  urls: {
    yelp: string;
    canonical: string;
    directions: string;
  };
  pendingOwnerConfirmation: {
    staff: {
      manager: string;
      founder: string;
      owner: string;
      mechanic: string;
    };
  };
  cities: string[];
}

export const businessConfig: BusinessConfig = {
  name: businessData.name,
  address: businessData.address,
  phone: businessData.phone,
  hours: {
    ...businessData.hours,
    verificationStatus: "Pending Owner Confirmation",
    ownerConfirmationRequired: true,
  },
  established: businessData.established,
  yearsInBusiness: new Date().getFullYear() - businessData.established,
  rating: businessData.rating,
  urls: businessData.urls,
  pendingOwnerConfirmation: {
    staff: {
      manager: "Carson",
      founder: "Mr. Langston",
      owner: "Mr. Langston",
      mechanic: "Skip",
    },
  },
  cities: businessData.cities,
};
