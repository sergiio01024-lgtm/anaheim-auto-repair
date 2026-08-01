import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FAQSection } from "../components/FAQSection";

describe("FAQSection Component", () => {
  it("renders correctly with questions", () => {
    render(<FAQSection />);
    expect(screen.getByText("Common Questions")).toBeInTheDocument();
    expect(screen.getByText("How do I request an estimate?")).toBeInTheDocument();
  });

  it("can toggle answers when questions are clicked", () => {
    render(<FAQSection />);

    const button1 = screen.getByText("How do I request an estimate?").closest("button")!;
    expect(button1).toHaveAttribute("aria-expanded", "false");

    // Click first question button
    fireEvent.click(button1);
    expect(button1).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/submit your vehicle details through our online intake form/)).toBeInTheDocument();

    // Click second question button
    const button2 = screen.getByText("What kind of cars do you work on?").closest("button")!;
    expect(button2).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button2);
    expect(button2).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/All makes and models, foreign and domestic/)).toBeInTheDocument();
  });
});
