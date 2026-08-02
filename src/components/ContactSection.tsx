import { useState, useRef, useEffect } from "react";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

interface FormFields {
  name: string;
  phone: string;
  email: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  service: string;
  message: string;
  mileage: string;
  drivable: string;
  warning_lights: string[];
  preferred_contact: string;
  preferred_date: string;
  preferred_time: string;
  sms_consent: boolean;

  // Honeypot fields to trap bots
  hp_a: string;
  hp_b: string;
  hp_c: string;
}

const inputBase =
  "mt-1.5 block w-full rounded-lg px-4 py-3 text-base outline outline-1 -outline-offset-1 outline-[#DDE0E3] placeholder:text-[#818891] focus:outline-2 focus:-outline-offset-2 focus:outline-[#C8202F] transition-colors bg-white text-[#16191D]";
const inputError = "outline-[#C8202F] ring-1 ring-[#C8202F]";
const labelBase = "block text-sm font-semibold mb-1 text-[#16191D]";

export function ContactSection() {
  const getSiteKey = (): string | undefined => {
    try {
      return (import.meta as any).env.VITE_TURNSTILE_SITE_KEY || (typeof process !== "undefined" ? process.env.VITE_TURNSTILE_SITE_KEY : undefined);
    } catch (e) {
      return typeof process !== "undefined" ? process.env.VITE_TURNSTILE_SITE_KEY : undefined;
    }
  };

  const [formData, setFormData] = useState<FormFields>({
    name: "",
    phone: "",
    email: "",
    year: "",
    make: "",
    model: "",
    vin: "",
    service: "",
    message: "",
    mileage: "",
    drivable: "",
    warning_lights: [],
    preferred_contact: "phone",
    preferred_date: "",
    preferred_time: "",
    sms_consent: false,
    hp_a: "",
    hp_b: "",
    hp_c: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formStarted = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formLoadedAt = useRef<number>(Date.now());

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const [showHoneypot, setShowHoneypot] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHoneypot(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Load Turnstile script dynamically
  useEffect(() => {
    const siteKey = getSiteKey();
    if (!siteKey) return;

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    let isMounted = true;

    const initTurnstile = () => {
      if (typeof window !== "undefined" && (window as any).turnstile) {
        if (isMounted && !turnstileWidgetId.current) {
          try {
            turnstileWidgetId.current = (window as any).turnstile.render("#turnstile-container", {
              sitekey: siteKey,
              callback: (token: string) => {
                setTurnstileToken(token);
                setErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.turnstile;
                  return copy;
                });
              },
              "expired-callback": () => {
                setTurnstileToken(null);
              },
              "error-callback": () => {
                setTurnstileToken(null);
              },
            });
          } catch (e) {
            console.error("Turnstile render error:", e);
          }
        }
      } else {
        setTimeout(initTurnstile, 100);
      }
    };

    initTurnstile();

    return () => {
      isMounted = false;
      if (turnstileWidgetId.current && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(turnstileWidgetId.current);
          turnstileWidgetId.current = null;
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleInteraction = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent({ type: "estimate_form_start" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    handleInteraction();
    const nameOrId = e.target.name || e.target.id;
    const value =
      e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [nameOrId]: value,
    }));

    if (errors[nameOrId]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[nameOrId];
        return copy;
      });
    }
  };

  const handleWarningLightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInteraction();
    const value = e.target.value;
    const checked = e.target.checked;

    setFormData((prev) => {
      let lights = [...prev.warning_lights];
      if (checked) {
        lights.push(value);
      } else {
        lights = lights.filter((light) => light !== value);
      }
      return { ...prev, warning_lights: lights };
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0 && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [errors]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      const digitCount = formData.phone.replace(/\D/g, "").length;
      if (digitCount < 7 || digitCount > 15) {
        newErrors.phone = "Please enter a valid phone number (7-15 digits).";
      }
    }

    if (!formData.year.trim()) {
      newErrors.year = "Vehicle year is required.";
    } else {
      const yearNum = parseInt(formData.year, 10);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 2) {
        newErrors.year = "Please enter a valid year.";
      }
    }

    if (!formData.make.trim()) newErrors.make = "Vehicle make is required.";
    if (!formData.model.trim()) newErrors.model = "Vehicle model is required.";
    if (!formData.service) newErrors.service = "Please select a service category.";
    if (!formData.message.trim()) newErrors.message = "Please describe the symptoms or problems.";

    if (formData.preferred_contact === "email" && !formData.email.trim()) {
      newErrors.email = "Email is required when preferred contact is email.";
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (getSiteKey() && !turnstileToken) {
      newErrors.turnstile = "Please complete the bot verification.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          "cf-turnstile-response": turnstileToken,
          form_elapsed_ms: Date.now() - formLoadedAt.current,
          page_url: window.location.href,
          referrer: document.referrer || "",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        trackEvent({ type: "estimate_submit_success", requestId: data.request_id || "unknown" });
        setFormData({
          name: "",
          phone: "",
          email: "",
          year: "",
          make: "",
          model: "",
          vin: "",
          service: "",
          message: "",
          mileage: "",
          drivable: "",
          warning_lights: [],
          preferred_contact: "phone",
          preferred_date: "",
          preferred_time: "",
          sms_consent: false,
          hp_a: "",
          hp_b: "",
          hp_c: "",
        });
        formLoadedAt.current = Date.now();
        setTurnstileToken(null);
        if (turnstileWidgetId.current && typeof window !== "undefined" && (window as any).turnstile) {
          try {
            (window as any).turnstile.reset(turnstileWidgetId.current);
          } catch (e) {
            console.error("Turnstile reset error:", e);
          }
        }
        formStarted.current = false;
      } else {
        const errText = data.error || "Submission failed.";
        setStatus("error");
        setErrorMessage(errText);
        trackEvent({ type: "estimate_submit_error", error: errText });
        if (turnstileWidgetId.current && typeof window !== "undefined" && (window as any).turnstile) {
          try {
            (window as any).turnstile.reset(turnstileWidgetId.current);
          } catch (e) {
            console.error("Turnstile reset error:", e);
          }
        }
        setTurnstileToken(null);
      }
    } catch (err: any) {
      setStatus("error");
      const errText = String(err.message || err);
      setErrorMessage("Could not connect to the server. Please call us directly.");
      trackEvent({ type: "estimate_submit_error", error: errText });
      if (turnstileWidgetId.current && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          (window as any).turnstile.reset(turnstileWidgetId.current);
        } catch (e) {
          console.error("Turnstile reset error:", e);
        }
      }
      setTurnstileToken(null);
    }
  };

  return (
    <section
      id="contact"
      className="surface-garage py-24 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <span className="label-mono text-steel-500 block mb-4">Service Intake</span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#16191D] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Request an Estimate
          </h2>
          <p className="mt-5 text-lg text-[#606770] leading-relaxed">
            Describe your vehicle&apos;s issue and we&apos;ll follow up about your service request — or call{" "}
            <a
              href={businessConfig.phone.link}
              className="text-signal-red hover:text-white transition-colors font-semibold"
            >
              {businessConfig.phone.display}
            </a>{" "}
            to speak with the shop.
          </p>
        </div>

        {/* Form Panel */}
        <div
          className="mx-auto max-w-[1100px] rounded-2xl p-6 sm:p-10 lg:p-12"
          style={{ backgroundColor: "var(--paper-bright)" }}
        >
          {/* Success State */}
          {status === "success" && (
            <div
              className="rounded-xl p-8 text-center border border-success-green/20"
              style={{ backgroundColor: "rgba(77, 170, 114, 0.06)" }}
              role="alert"
            >
              <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: 'var(--success-green)' }}>
                <svg className="size-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-display)", color: "var(--garage-950)" }}
              >
                Estimate Requested Successfully!
              </h3>
              <p className="text-base text-steel-600 leading-relaxed max-w-md mx-auto">
                A shop representative will contact you during business hours regarding your requested service.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-lg border border-steel-300 hover:border-garage-950 px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ color: "var(--garage-950)" }}
              >
                Submit Another Request
              </button>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div
              className="rounded-xl p-6 mb-8 border border-signal-red/20 text-center"
              style={{ backgroundColor: "rgba(209, 38, 54, 0.04)" }}
              role="alert"
            >
              <span className="text-signal-red font-bold text-base">⚠ Submission Error</span>
              <p className="text-sm font-medium mt-2" style={{ color: "var(--garage-950)" }}>
                {errorMessage}
              </p>
              <a
                href={businessConfig.phone.link}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-signal-red hover:bg-signal-red-hover px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                Call Shop Directly: {businessConfig.phone.display}
              </a>
            </div>
          )}

          {status !== "success" && (
            <form onSubmit={handleSubmit} noValidate>
              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  className="rounded-lg border-l-4 border-signal-red p-4 mb-8 focus:outline-none"
                  style={{ backgroundColor: "rgba(209, 38, 54, 0.04)" }}
                  role="alert"
                  aria-labelledby="error-summary-title"
                >
                  <h3 id="error-summary-title" className="text-sm font-bold text-signal-red">
                    Please correct the following {Object.keys(errors).length} errors:
                  </h3>
                  <ul className="mt-2 list-disc list-inside text-xs text-signal-red font-semibold space-y-1">
                    {Object.entries(errors).map(([field, msg]) => (
                      <li key={field}>
                        <a
                          href={`#${field}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(field)?.focus();
                          }}
                          className="hover:underline"
                        >
                          {msg}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Honeypot */}
              {showHoneypot && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <input type="text" id="hp_a" name="hp_a" value={formData.hp_a} onChange={handleInputChange} tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-form-type="other" />
                  <input type="text" id="hp_b" name="hp_b" value={formData.hp_b} onChange={handleInputChange} tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-form-type="other" />
                  <input type="text" id="hp_c" name="hp_c" value={formData.hp_c} onChange={handleInputChange} tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-form-type="other" />
                </div>
              )}

              {/* ── 01 Contact ─────────────────────── */}
              <div className="pb-8 mb-8 border-b border-[#DDE0E3]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono font-bold text-[#C8202F]">01</span>
                  <h3 className="text-base font-bold text-[#16191D]" style={{ fontFamily: "var(--font-display)" }}>
                    Contact Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelBase}>Name *</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${inputBase} ${errors.name ? inputError : ""}`}
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelBase}>Phone Number *</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`${inputBase} ${errors.phone ? inputError : ""}`}
                    />
                    {errors.phone && <p id="phone-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className={labelBase}>Email Address (Optional)</label>
                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                      className={`${inputBase} ${errors.email ? inputError : ""}`}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* ── 02 Vehicle ─────────────────────── */}
              <div className="pb-8 mb-8 border-b border-[#DDE0E3]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono font-bold text-[#C8202F]">02</span>
                  <h3 className="text-base font-bold text-[#16191D]" style={{ fontFamily: "var(--font-display)" }}>
                    Vehicle Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="year" className={labelBase}>Year *</label>
                    <input type="text" id="year" inputMode="numeric" maxLength={4} value={formData.year} onChange={handleInputChange} required aria-invalid={!!errors.year} aria-describedby={errors.year ? "year-error" : undefined} placeholder="e.g. 2019"
                      className={`${inputBase} ${errors.year ? inputError : ""}`}
                    />
                    {errors.year && <p id="year-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.year}</p>}
                  </div>
                  <div>
                    <label htmlFor="make" className={labelBase}>Make *</label>
                    <input type="text" id="make" value={formData.make} onChange={handleInputChange} required aria-invalid={!!errors.make} aria-describedby={errors.make ? "make-error" : undefined} placeholder="e.g. Honda"
                      className={`${inputBase} ${errors.make ? inputError : ""}`}
                    />
                    {errors.make && <p id="make-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.make}</p>}
                  </div>
                  <div>
                    <label htmlFor="model" className={labelBase}>Model *</label>
                    <input type="text" id="model" value={formData.model} onChange={handleInputChange} required aria-invalid={!!errors.model} aria-describedby={errors.model ? "model-error" : undefined} placeholder="e.g. Civic"
                      className={`${inputBase} ${errors.model ? inputError : ""}`}
                    />
                    {errors.model && <p id="model-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.model}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                  <div>
                    <label htmlFor="mileage" className={labelBase}>Approximate Mileage (Optional)</label>
                    <input type="text" id="mileage" inputMode="numeric" value={formData.mileage} onChange={handleInputChange} placeholder="e.g. 85000"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="vin" className={labelBase}>VIN (Optional)</label>
                    <input type="text" id="vin" maxLength={17} value={formData.vin} onChange={handleInputChange} placeholder="17 characters"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="drivable" className={labelBase}>Is the Vehicle Drivable?</label>
                    <select id="drivable" value={formData.drivable} onChange={handleInputChange}
                      className={inputBase}
                    >
                      <option value="">Not sure</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                {/* Warning Lights */}
                <div className="mt-5">
                  <span className={`${labelBase} mb-2 block`}>Active Warning Lights</span>
                  <div className="flex flex-wrap gap-3">
                    {["Check Engine", "ABS / Braking", "Battery / Charging", "Traction / Stability", "Airbag / SRS"].map((light) => (
                      <label key={light} className="flex items-center gap-2 text-sm cursor-pointer text-[#606770]">
                        <input
                          type="checkbox"
                          value={light}
                          checked={formData.warning_lights.includes(light)}
                          onChange={handleWarningLightChange}
                          className="rounded text-[#C8202F] focus:ring-[#C8202F] size-4"
                        />
                        {light}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 03 Service ─────────────────────── */}
              <div className="pb-8 mb-8 border-b border-[#DDE0E3]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono font-bold text-[#C8202F]">03</span>
                  <h3 className="text-base font-bold text-[#16191D]" style={{ fontFamily: "var(--font-display)" }}>
                    Service Details
                  </h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="service" className={labelBase}>Primary Service Category *</label>
                    <select id="service" value={formData.service} onChange={handleInputChange} required aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}
                      className={`${inputBase} ${errors.service ? inputError : ""}`}
                    >
                      <option value="">Select a category</option>
                      <option value="muffler-exhaust">Muffler & Exhaust Repair</option>
                      <option value="catalytic-converters">Catalytic Converters</option>
                      <option value="brakes-suspension">Brakes & Suspension</option>
                      <option value="engine-diagnostics">Engine Diagnostics & Repair</option>
                      <option value="transmission-service">Transmission Service & Repair</option>
                      <option value="routine-maintenance">Routine Maintenance & Oil Changes</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                    {errors.service && <p id="service-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.service}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className={labelBase}>Describe the Issue or Symptoms *</label>
                    <textarea id="message" rows={4} value={formData.message} onChange={handleInputChange} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}
                      placeholder="What symptoms are you experiencing? Noises, warning lights, performance issues?"
                      className={`${inputBase} resize-y ${errors.message ? inputError : ""}`}
                    />
                    {errors.message && <p id="message-error" className="mt-1 text-xs text-[#C8202F] font-semibold">{errors.message}</p>}
                  </div>
                </div>
              </div>

              {/* ── 04 Preferences ─────────────────── */}
              <div className="pb-8 mb-8 border-b border-[#DDE0E3]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono font-bold text-[#C8202F]">04</span>
                  <h3 className="text-base font-bold text-[#16191D]" style={{ fontFamily: "var(--font-display)" }}>
                    Preferences
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="preferred_contact" className={labelBase}>Preferred Contact</label>
                    <select id="preferred_contact" value={formData.preferred_contact} onChange={handleInputChange}
                      className={inputBase}
                    >
                      <option value="phone">Phone Call</option>
                      <option value="sms">Text / SMS</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="preferred_time" className={labelBase}>Best Time</label>
                    <input type="text" id="preferred_time" value={formData.preferred_time} onChange={handleInputChange} placeholder="e.g. Morning"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="preferred_date" className={labelBase}>Preferred Day</label>
                    <select id="preferred_date" value={formData.preferred_date} onChange={handleInputChange}
                      className={inputBase}
                    >
                      <option value="">No preference</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="relative flex items-start cursor-pointer">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        id="sms_consent"
                        checked={formData.sms_consent}
                        onChange={handleInputChange}
                        className="rounded text-[#C8202F] focus:ring-[#C8202F] size-4"
                      />
                    </div>
                    <div className="ml-3 text-xs leading-5">
                      <span className="font-bold text-[#16191D]">
                        Consent to Automated Text Updates (Optional)
                      </span>
                      <p className="mt-1 text-[#818891]">
                        Check this box if you agree to receive automated SMS messages related to your service request. Message frequency varies. Reply STOP to opt out.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Turnstile Verification */}
              {getSiteKey() && (
                <div className="pb-8 mb-8 border-b border-[#DDE0E3]">
                  <span className={`${labelBase} mb-3 block`}>
                    Security Verification
                  </span>
                  <div
                    id="turnstile-container"
                    className="min-h-[65px]"
                    aria-live="polite"
                  ></div>
                  {errors.turnstile && (
                    <p id="turnstile-error" className="mt-2 text-xs text-[#C8202F] font-semibold">
                      {errors.turnstile}
                    </p>
                  )}
                </div>
              )}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="block w-full rounded-lg bg-[#C8202F] hover:bg-[#AE1D2A] px-4 py-4 text-center text-base font-semibold text-white transition-colors shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8202F] disabled:opacity-50"
                >
                  {status === "loading"
                    ? "Processing Estimate Request..."
                    : "Submit Estimate Request"}
                </button>
                <p className="text-[11px] mt-3 text-center text-[#818891]">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-[#16191D]">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
