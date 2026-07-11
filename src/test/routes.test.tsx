import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Client-Side Routing in App.tsx", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Reset window.location mock
    delete (window as any).location;
    (window as any).location = {
      ...originalLocation,
      pathname: "/",
    };
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    (window as any).location = originalLocation;
  });

  it("should render the homepage by default when path is '/'", () => {
    render(<App />);
    expect(screen.getByText("Anaheim's Trusted Auto & Muffler Repair Shop")).toBeInTheDocument();
    expect(screen.getByText("The Standard Every Job Is Held To")).toBeInTheDocument();
  });

  it("should render the Muffler & Exhaust specialty page when path is '/muffler-repair-anaheim'", () => {
    (window as any).location.pathname = "/muffler-repair-anaheim";
    render(<App />);
    expect(screen.getByRole("heading", { name: "Muffler & Exhaust Repair in Anaheim, CA" })).toBeInTheDocument();
    expect(screen.getByText(/For over 45 years, we have provided dedicated muffler/)).toBeInTheDocument();
  });

  it("should render the Catalytic Converter specialty page when path is '/catalytic-converter-anaheim'", () => {
    (window as any).location.pathname = "/catalytic-converter-anaheim";
    render(<App />);
    expect(screen.getByRole("heading", { name: "Catalytic Converter Replacement in Anaheim, CA" })).toBeInTheDocument();
    expect(screen.getByText(/We specialize in emissions diagnostic assessments/)).toBeInTheDocument();
  });

  it("should render the Privacy Policy page when path is '/privacy'", () => {
    (window as any).location.pathname = "/privacy";
    render(<App />);
    expect(screen.getByRole("heading", { name: "Privacy Policy" })).toBeInTheDocument();
  });

  it("should render the Contact Us page when path is '/contact'", () => {
    (window as any).location.pathname = "/contact";
    render(<App />);
    expect(screen.getByRole("heading", { name: "Contact Our Shop" })).toBeInTheDocument();
  });
});
