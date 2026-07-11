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
  website_url: string;
  fax_number: string;
  zipcode_check: string;
}

export function ContactSection() {
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
    website_url: "",
    fax_number: "",
    zipcode_check: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formStarted = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Track estimate_form_start on first interaction
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
    const id = e.target.id;
    const value =
      e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear field error when user starts typing
    if (errors[id]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
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

  // Focus error summary if validation fails
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
    } else if (formData.phone.replace(/[^\d]/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number (at least 7 digits).";
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

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
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
          website_url: "",
          fax_number: "",
          zipcode_check: "",
        });
        formStarted.current = false;
      } else {
        const errText = data.error || "Submission failed.";
        setStatus("error");
        setErrorMessage(errText);
        trackEvent({ type: "estimate_submit_error", error: errText });
      }
    } catch (err: any) {
      setStatus("error");
      const errText = String(err.message || err);
      setErrorMessage("Could not connect to the server. Please call us directly.");
      trackEvent({ type: "estimate_submit_error", error: errText });
    }
  };

  return (
    <section
      id="contact"
      className="bg-white py-24 border-t border-zinc-200"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
            Service Intake
          </span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900"
          >
            Request an Estimate
          </h2>
          <p className="mt-4 text-base text-zinc-600 font-medium">
            Describe your car's symptoms or maintenance needs. We'll reply with a ballpark estimate.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          {/* 1. Success Message */}
          {status === "success" && (
            <div
              className="bg-red-50 border border-red-200 rounded-xl p-8 text-center shadow-sm"
              role="alert"
            >
              <h3 className="text-xl font-bold text-primary">Estimate Requested Successfully!</h3>
              <p className="mt-3 text-sm text-zinc-650 font-semibold leading-relaxed">
                Your request has been securely processed. Carson or a shop technician will contact
                you shortly during business hours.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setStatus("idle")}
                  className="rounded-md bg-white border border-zinc-300 hover:bg-zinc-50 px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          )}

          {/* 2. Failure Recovery Banners */}
          {status === "error" && (
            <div
              className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 shadow-sm flex flex-col items-center text-center"
              role="alert"
            >
              <span className="text-primary font-bold text-base">⚠️ Submission Error</span>
              <p className="text-sm text-zinc-700 font-semibold mt-2">{errorMessage}</p>
              <a
                href={businessConfig.phone.link}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary"
              >
                📞 Call Shop Directly: {businessConfig.phone.display}
              </a>
            </div>
          )}

          {status !== "success" && (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Accessible Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  className="bg-red-50 border-l-4 border-primary p-4 rounded-md focus:outline-none mb-6"
                  role="alert"
                  aria-labelledby="error-summary-title"
                >
                  <h3 id="error-summary-title" className="text-sm font-bold text-primary">
                    Please correct the following {Object.keys(errors).length} errors:
                  </h3>
                  <ul className="mt-2 list-disc list-inside text-xs text-primary font-semibold space-y-1">
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

              {/* Hidden Honeypot Fields for Bot Rejection */}
              <div className="sr-only" aria-hidden="true">
                <input
                  type="text"
                  id="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input
                  type="text"
                  id="fax_number"
                  value={formData.fax_number}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input
                  type="text"
                  id="zipcode_check"
                  value={formData.zipcode_check}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Section 1: Customer Details */}
              <div className="border-b border-zinc-150 pb-6">
                <h3 className="text-base font-bold text-zinc-900 mb-4">1. Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-zinc-800">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`mt-1.5 block w-full rounded-md bg-white px-3.5 py-2 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.name ? "outline-primary ring-1 ring-primary" : ""}`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-primary font-bold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-zinc-800">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(714) 826-4444"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`mt-1.5 block w-full rounded-md bg-white px-3.5 py-2 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.phone ? "outline-primary ring-1 ring-primary" : ""}`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-primary font-bold">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-bold text-zinc-800">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="driver@anaheim.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`mt-1.5 block w-full rounded-md bg-white px-3.5 py-2 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.email ? "outline-primary ring-1 ring-primary" : ""}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-primary font-bold">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Vehicle Specs */}
              <div className="border-b border-zinc-150 pb-6">
                <h3 className="text-base font-bold text-zinc-900 mb-4">
                  2. Vehicle Specifications
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="year" className="block text-xs font-bold text-zinc-700">
                      Year *
                    </label>
                    <input
                      type="number"
                      id="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      placeholder="YYYY"
                      min="1900"
                      max={new Date().getFullYear() + 2}
                      aria-invalid={!!errors.year}
                      aria-describedby={errors.year ? "year-error" : undefined}
                      className={`mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.year ? "outline-primary ring-1 ring-primary" : ""}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="make" className="block text-xs font-bold text-zinc-700">
                      Make *
                    </label>
                    <input
                      type="text"
                      id="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Toyota"
                      aria-invalid={!!errors.make}
                      className={`mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.make ? "outline-primary ring-1 ring-primary" : ""}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="block text-xs font-bold text-zinc-700">
                      Model *
                    </label>
                    <input
                      type="text"
                      id="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Camry"
                      aria-invalid={!!errors.model}
                      className={`mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.model ? "outline-primary ring-1 ring-primary" : ""}`}
                    />
                  </div>

                  <div className="col-span-3">
                    {errors.year && (
                      <p id="year-error" className="text-xs text-primary font-bold">
                        {errors.year}
                      </p>
                    )}
                    {errors.make && !errors.year && (
                      <p className="text-xs text-primary font-bold">{errors.make}</p>
                    )}
                    {errors.model && !errors.year && !errors.make && (
                      <p className="text-xs text-primary font-bold">{errors.model}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="mileage" className="block text-xs font-bold text-zinc-700">
                      Approximate Mileage (Optional)
                    </label>
                    <input
                      type="number"
                      id="mileage"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      placeholder="e.g. 105000"
                      className="mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="vin" className="block text-xs font-bold text-zinc-700">
                      VIN (Optional)
                    </label>
                    <input
                      type="text"
                      id="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      placeholder="17-character VIN"
                      maxLength={17}
                      className="mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="block text-xs font-bold text-zinc-700 mb-2">
                    Is the vehicle currently drivable?
                  </span>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center text-sm font-semibold text-zinc-700">
                      <input
                        type="radio"
                        id="drivable"
                        name="drivable"
                        value="true"
                        checked={formData.drivable === "true"}
                        onChange={handleInputChange}
                        className="size-4 text-primary focus:ring-primary"
                      />
                      <span className="ml-2">Yes, it drives</span>
                    </label>
                    <label className="inline-flex items-center text-sm font-semibold text-zinc-700">
                      <input
                        type="radio"
                        id="drivable"
                        name="drivable"
                        value="false"
                        checked={formData.drivable === "false"}
                        onChange={handleInputChange}
                        className="size-4 text-primary focus:ring-primary"
                      />
                      <span className="ml-2">No (needs tow/safety issues)</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="block text-xs font-bold text-zinc-700 mb-2">
                    Active Warning Lights (Select all that apply)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Check Engine",
                      "ABS / Braking",
                      "Battery / Charging",
                      "Traction / Stability",
                      "Airbag / SRS",
                    ].map((light) => (
                      <label
                        key={light}
                        className="inline-flex items-center text-xs font-semibold text-zinc-700"
                      >
                        <input
                          type="checkbox"
                          value={light}
                          checked={formData.warning_lights.includes(light)}
                          onChange={handleWarningLightChange}
                          className="rounded text-primary focus:ring-primary size-4"
                        />
                        <span className="ml-2">{light}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Service Requested */}
              <div className="border-b border-zinc-150 pb-6">
                <h3 className="text-base font-bold text-zinc-900 mb-4">3. Service Requested</h3>

                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-zinc-800">
                    Primary Service Category *
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className={`mt-1.5 block w-full rounded-md bg-white px-3 py-2 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary ${errors.service ? "outline-primary ring-1 ring-primary" : ""}`}
                  >
                    <option value="" disabled>
                      Select a category...
                    </option>
                    <option value="muffler-exhaust">Muffler & Exhaust Repair</option>
                    <option value="catalytic-converters">Catalytic Converter Replacement</option>
                    <option value="brakes-suspension">Brakes & Suspension Service</option>
                    <option value="engine-diagnostics">Engine Diagnostics & Repair</option>
                    <option value="transmission-service">Transmission Service & Repair</option>
                    <option value="routine-maintenance">Routine Maintenance & Oil Changes</option>
                    <option value="other">Other Auto Repair Service</option>
                  </select>
                  {errors.service && (
                    <p id="service-error" className="mt-1 text-xs text-primary font-bold">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="block text-sm font-bold text-zinc-800">
                    Describe the Issue or Symptoms *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    placeholder="Describe noises, dashboard lights, scheduling details, or the specific service you need..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`mt-1.5 block w-full rounded-md bg-white px-3.5 py-2 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary resize-none ${errors.message ? "outline-primary ring-1 ring-primary" : ""}`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-primary font-bold">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Section 4: Preferences & Consent */}
              <div>
                <h3 className="text-base font-bold text-zinc-900 mb-4">4. Preferences & Consent</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="preferred_contact"
                      className="block text-xs font-bold text-zinc-700"
                    >
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferred_contact"
                      value={formData.preferred_contact}
                      onChange={handleInputChange}
                      className="mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="sms">Text Message (SMS)</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="preferred_date"
                      className="block text-xs font-bold text-zinc-700"
                    >
                      Preferred Appointment Day
                    </label>
                    <select
                      id="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleInputChange}
                      className="mt-1.5 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
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

                <div className="mt-6 space-y-4">
                  <label className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        id="sms_consent"
                        checked={formData.sms_consent}
                        onChange={handleInputChange}
                        className="rounded text-primary focus:ring-primary size-4"
                      />
                    </div>
                    <div className="ml-3 text-xs leading-5">
                      <span className="font-bold text-zinc-800">
                        Consent to Automated Text Updates (Optional)
                      </span>
                      <p className="text-zinc-500 mt-1">
                        Check this box to receive SMS updates about your estimate and appointments
                        from our team. We do not sell your data. Message frequency varies. Reply
                        STOP to cancel at any time.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Action */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="block w-full rounded-md bg-primary hover:bg-red-700 px-3.5 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                >
                  {status === "loading"
                    ? "Processing Estimate Request..."
                    : "Submit Estimate Request"}
                </button>
                <p className="text-[10px] text-zinc-500 mt-3 text-center leading-normal">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="underline hover:text-zinc-800">
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
