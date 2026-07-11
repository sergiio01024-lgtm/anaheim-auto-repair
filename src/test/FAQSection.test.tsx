import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQSection } from "../components/FAQSection";

describe("FAQSection Component", () => {
  it("renders correctly with questions", () => {
    render(<FAQSection />);
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
    expect(screen.getByText("Do you do free estimates?")).toBeInTheDocument();
  });

  it("can toggle answers when questions are clicked", () => {
    render(<FAQSection />);
    // By default, the first question is open:
    expect(screen.getByText(/We give free, upfront quotes/)).toBeInTheDocument();

    // Find and click another question
    const button = screen.getByText("What kind of cars do you work on?");
    fireEvent.click(button);

    // The second answer should be visible
    expect(screen.getByText(/All makes and models, foreign and domestic/)).toBeInTheDocument();
  });
});
