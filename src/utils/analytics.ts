export type AnalyticsEvent =
  | { type: "phone_click"; displayPhone: string }
  | { type: "estimate_cta_click"; label: string }
  | { type: "estimate_form_start" }
  | { type: "estimate_submit_success"; requestId: string }
  | { type: "estimate_submit_error"; error: string }
  | { type: "directions_click" }
  | { type: "reviews_click"; source: string }
  | { type: "service_page_view"; path: string };

export function trackEvent(event: AnalyticsEvent) {
  // Safe logging in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics Event]", event);
  }

  try {
    // 1. Google Analytics (gtag) dispatch
    if (typeof window !== "undefined" && (window as any).gtag) {
      const gtag = (window as any).gtag;

      switch (event.type) {
        case "phone_click":
          gtag("event", "phone_click", { phone: event.displayPhone });
          break;
        case "estimate_cta_click":
          gtag("event", "cta_click", { label: event.label });
          break;
        case "estimate_form_start":
          gtag("event", "form_start");
          break;
        case "estimate_submit_success":
          gtag("event", "lead_success", { request_id: event.requestId });
          break;
        case "estimate_submit_error":
          gtag("event", "lead_error", { error_message: event.error });
          break;
        case "directions_click":
          gtag("event", "directions_click");
          break;
        case "reviews_click":
          gtag("event", "reviews_click", { source: event.source });
          break;
        case "service_page_view":
          gtag("event", "page_view", { page_path: event.path });
          break;
      }
    }

    // 2. Custom Window Event dispatch for browser/e2e testing
    if (typeof window !== "undefined") {
      const customEvent = new CustomEvent("anaheim-analytics", { detail: event });
      window.dispatchEvent(customEvent);
    }
  } catch (err) {
    // Fail silently if analytics block fails
    console.error("Analytics failure", err);
  }
}
