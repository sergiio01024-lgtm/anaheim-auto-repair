import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSection } from "../components/ContactSection";
import { businessConfig } from "../config/business";

describe("ContactSection Auto-Repair Intake Form", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.clearAllMocks();
  });

  it("renders all required form controls and optional fields", () => {
    render(<ContactSection />);

    // Required fields
    expect(screen.getByLabelText(/Name \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Make \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Service Category \*/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Describe the Issue or Symptoms \*/)).toBeInTheDocument();

    // Optional fields
    expect(screen.getByLabelText(/Email Address \(Optional\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Approximate Mileage \(Optional\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/VIN \(Optional\)/)).toBeInTheDocument();

    // Explicit SMS Consent is unchecked by default
    const smsConsent = screen.getByLabelText(
      /Consent to Automated Text Updates \(Optional\)/
    ) as HTMLInputElement;
    expect(smsConsent).toBeInTheDocument();
    expect(smsConsent.checked).toBe(false);
  });

  it("shows accessible error summary and inline errors on empty submit", async () => {
    render(<ContactSection />);

    const submitBtn = screen.getByRole("button", { name: /Submit Estimate Request/ });
    fireEvent.click(submitBtn);

    // Expect error summary list to appear
    await waitFor(() => {
      expect(screen.getByText(/Please correct the following \d+ errors/)).toBeInTheDocument();
    });

    // Check specific error messages (use getAllByText since messages appear in summary and inline)
    expect(screen.getAllByText("Name is required.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Phone number is required.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Vehicle year is required.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Vehicle make is required.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Vehicle model is required.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Please select a service category.")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Please describe the symptoms or problems.")[0]).toBeInTheDocument();
  });

  it("submits successfully with valid data and disables the submit button to prevent double-submission", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true, request_id: "test-req-123" }),
    });

    render(<ContactSection />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/Name \*/), { target: { value: "Dylan" } });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/), { target: { value: "7148264444" } });
    fireEvent.change(screen.getByLabelText(/Year \*/), { target: { value: "2018" } });
    fireEvent.change(screen.getByLabelText(/Make \*/), { target: { value: "Subaru" } });
    fireEvent.change(screen.getByLabelText(/Model \*/), { target: { value: "Outback" } });
    fireEvent.change(screen.getByLabelText(/Primary Service Category \*/), {
      target: { value: "muffler-exhaust" },
    });
    fireEvent.change(screen.getByLabelText(/Describe the Issue or Symptoms \*/), {
      target: { value: "Rattling noise from the exhaust shield" },
    });

    const submitBtn = screen.getByRole("button", { name: /Submit Estimate Request/ });
    fireEvent.click(submitBtn);

    // Button should be disabled during submit (loading state)
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/Processing Estimate Request\.\.\./)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Estimate Requested Successfully!")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("displays fallback error banner with phone link when submission fails", async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error("Network failure"));

    render(<ContactSection />);

    // Fill required
    fireEvent.change(screen.getByLabelText(/Name \*/), { target: { value: "Dylan" } });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/), { target: { value: "7148264444" } });
    fireEvent.change(screen.getByLabelText(/Year \*/), { target: { value: "2018" } });
    fireEvent.change(screen.getByLabelText(/Make \*/), { target: { value: "Subaru" } });
    fireEvent.change(screen.getByLabelText(/Model \*/), { target: { value: "Outback" } });
    fireEvent.change(screen.getByLabelText(/Primary Service Category \*/), {
      target: { value: "muffler-exhaust" },
    });
    fireEvent.change(screen.getByLabelText(/Describe the Issue or Symptoms \*/), {
      target: { value: "Broken muffler hanger" },
    });

    const submitBtn = screen.getByRole("button", { name: /Submit Estimate Request/ });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/Could not connect to the server/)).toBeInTheDocument();
      const callLink = screen.getByRole("link", { name: /Call Shop Directly/ });
      expect(callLink).toBeInTheDocument();
      expect(callLink).toHaveAttribute("href", businessConfig.phone.link);
    });
  });
});
