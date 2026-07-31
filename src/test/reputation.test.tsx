import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { reputationConfig } from "../config/reputation";
import { reviewsData } from "../data/reviews";
import { ReputationHub } from "../components/ReputationHub";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TransparencySection } from "../components/TransparencySection";
import { AboutSection } from "../components/AboutSection";

describe("Review Data Field Provenance Audit", () => {
  it("should confirm review items use general profile URLs and set isDirectPermalink to false", () => {
    reviewsData.forEach((review) => {
      expect(review.isDirectPermalink).toBe(false);
      expect(review.sourceUrl).toBe(reputationConfig.externalLinks.yelpProfile);
      // Confirm unsupported fields are omitted
      expect(review.date).toBeUndefined();
      expect(review.location).toBeUndefined();
      expect(review.serviceCategory).toBeUndefined();
    });
  });
});

describe("Reputation Architecture & Config Audit", () => {
  it("should maintain conservative, verified reputation facts", () => {
    expect(reputationConfig.primaryPlatform.rating).toBe(4.7);
    expect(reputationConfig.primaryPlatform.reviewsCountDisplay).toBe("590+");
    expect(reputationConfig.primaryPlatform.profileUrl).toContain("yelp.com");
    expect(reputationConfig.externalLinks.googleProfileUrl).toBeNull();
  });

  it("should contain conservative transparency commitments without absolute promises", () => {
    expect(reputationConfig.transparencyCommitments).toHaveLength(4);
    expect(reputationConfig.transparencyCommitments[0].title).toBe("Clear Explanation");
    expect(reputationConfig.transparencyCommitments[1].title).toBe("Estimate & Authorization");
    
    // Confirm no prohibited absolute promises exist in transparency copy
    const fullText = JSON.stringify(reputationConfig.transparencyCommitments).toLowerCase();
    expect(fullText).not.toContain("every repair is road-tested");
    expect(fullText).not.toContain("guaranteed");
    expect(fullText).not.toContain("never");
    expect(fullText).not.toContain("no work begins under any circumstances");
  });
});

describe("ReputationHub Component Provenance Audit", () => {
  it("should render verified Yelp metrics and avoid unconfirmed claims", () => {
    render(<ReputationHub />);

    expect(screen.getByText(/Trusted by Anaheim Drivers Since 1978/i)).toBeInTheDocument();
    expect(screen.getByText("4.7")).toBeInTheDocument();
    expect(screen.getByText(/590\+ Yelp Reviews/i)).toBeInTheDocument();
    
    const yelpLink = screen.getByRole("link", { name: /Read Reviews on Yelp/i });
    expect(yelpLink).toHaveAttribute("href", reputationConfig.externalLinks.yelpProfile);
    expect(yelpLink).toHaveAttribute("target", "_blank");
    expect(yelpLink).toHaveAttribute("rel", "noopener noreferrer");

    // Confirm unconfirmed same-location claims do not render
    expect(screen.queryByText(/same shop location history/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/48\+ years in the same location/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/yelp verified/i)).not.toBeInTheDocument();
  });
});

describe("TestimonialsSection Component Provenance & Link Label Audit", () => {
  it("should use 'Read Reviews on Yelp' for general Yelp profile URLs and avoid 'View Review on Yelp'", () => {
    render(<TestimonialsSection />);

    expect(screen.getByText(/What Drivers Say About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Vanessa F\./i)).toBeInTheDocument();
    expect(screen.getByText(/Customer review published on Yelp/i)).toBeInTheDocument();

    // Confirm "View Review on Yelp" does NOT render for general profile URL
    expect(screen.queryByRole("link", { name: /View Review on Yelp/i })).not.toBeInTheDocument();

    // Confirm "Read Reviews on Yelp" is used
    const readReviewsLinks = screen.getAllByRole("link", { name: /Read Reviews/i });
    expect(readReviewsLinks.length).toBeGreaterThan(0);

    // Confirm unsupported metadata is not rendered
    expect(screen.queryByText(/Jul 2026/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Garden Grove, CA/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Yelp Verified/i)).not.toBeInTheDocument();
  });
});

describe("TransparencySection Component Audit", () => {
  it("should render conservative operational commitments", () => {
    render(<TransparencySection />);

    expect(screen.getByText(/What You Can Expect/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear Explanation/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimate & Authorization/i)).toBeInTheDocument();
    expect(screen.getByText(/Need-Based Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Repair-Appropriate Verification/i)).toBeInTheDocument();
  });
});

describe("AboutSection Team & Location Audit", () => {
  it("should render supported history without unconfirmed team role cards or same-location claims", () => {
    render(<AboutSection />);

    expect(screen.getByText(/Serving Anaheim Drivers Since 1978/i)).toBeInTheDocument();
    
    // Confirm unconfirmed team representative cards do not render until owner confirmed
    expect(screen.queryByText(/Key Shop Representatives/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Same Corner\. Same Family\./i)).not.toBeInTheDocument();
  });
});
