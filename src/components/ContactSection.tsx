import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

const contactServices = [
  "Muffler & Exhaust Repair",
  "Brakes & Suspension",
  "Engine & Transmission",
  "Oil Changes & Maintenance",
  "AC & Heating Repair",
  "Diagnostics",
  "Other",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    property_address: "",
    year: "",
    make: "",
    model: "",
    vin: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const serviceMap: Record<string, string> = {
      "Muffler & Exhaust Repair": "muffler_exhaust",
      "Brakes & Suspension": "brakes_suspension",
      "Engine & Transmission": "engine_transmission",
      "Oil Changes & Maintenance": "maintenance",
      "AC & Heating Repair": "ac_heating",
      Diagnostics: "diagnostics",
      Other: "general",
    };

    // Combine vehicle information into job_description to keep payload structure unchanged
    const vehicleInfo = `[Vehicle Info: ${formData.year || "N/A"} ${formData.make || "N/A"} ${formData.model || "N/A"} ${formData.vin ? `(VIN: ${formData.vin})` : ""}]`;
    const fullJobDescription = `${vehicleInfo}\n\n${formData.message}`;

    try {
      const res = await fetch("https://n8n.kratosintelligence.com/webhook/anaheim-auto-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service_type: serviceMap[formData.service] || "general",
          job_description: fullJobDescription,
          property_address: formData.property_address,
          preferred_date: "",
          preferred_time: "",
          request_type: "quote",
          message: fullJobDescription,
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
          property_address: "",
          year: "",
          make: "",
          model: "",
          vin: "",
        });
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      id="contact"
      className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 border-t border-zinc-200"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-primary">Get in Touch</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Request an Estimate
          </p>
          <p className="mt-6 text-base text-zinc-600 font-medium">
            Describe what your car needs, and we'll get back to you with a free ballpark quote.
          </p>
        </div>

        {status === "success" ? (
          <div className="mx-auto mt-16 max-w-xl text-center bg-red-50 border border-red-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-primary">Thank You!</h3>
            <p className="mt-2 text-sm text-zinc-650 font-semibold">
              Your request has been received. {businessConfig.staff.manager} or someone from our
              team will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {/* Contact Info */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-zinc-800">
                  Name *
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-zinc-800">
                  Phone *
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(714) 000-0000"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label htmlFor="email" className="block text-sm font-semibold text-zinc-800">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="sm:col-span-2">
                <label htmlFor="service" className="block text-sm font-semibold text-zinc-800">
                  Service Needed *
                </label>
                <div className="mt-2.5">
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3.5 py-2.5 text-base text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  >
                    <option value="" disabled>
                      Select a service...
                    </option>
                    {contactServices.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Sub-grid for Visual Automotive Focus */}
              <div className="sm:col-span-2 border-t border-zinc-100 pt-6 mt-2">
                <span className="block text-sm font-bold text-zinc-900 mb-4">
                  Vehicle Details (Optional)
                </span>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="year" className="block text-xs font-semibold text-zinc-700">
                      Year
                    </label>
                    <input
                      type="number"
                      id="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="YYYY"
                      min="1900"
                      max="2030"
                      className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="make" className="block text-xs font-semibold text-zinc-700">
                      Make
                    </label>
                    <input
                      type="text"
                      id="make"
                      value={formData.make}
                      onChange={handleChange}
                      placeholder="e.g. Toyota"
                      className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="block text-xs font-semibold text-zinc-700">
                      Model
                    </label>
                    <input
                      type="text"
                      id="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g. Camry"
                      className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="vin" className="block text-xs font-semibold text-zinc-700">
                    VIN (17 characters)
                  </label>
                  <input
                    type="text"
                    id="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    placeholder="Optional VIN"
                    maxLength={17}
                    className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-sm text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="property_address"
                  className="block text-sm font-semibold text-zinc-800"
                >
                  Address
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    id="property_address"
                    value={formData.property_address}
                    placeholder="123 Main St, Anaheim, CA"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-zinc-800">
                  Describe What is Happening *
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Tell us about the issue, noises, or required service..."
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-zinc-900 outline outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-zinc-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary resize-none"
                  />
                </div>
              </div>
            </div>

            {status === "error" && (
              <p className="mt-4 text-primary text-sm font-semibold">
                Something went wrong. Please try again or call us.
              </p>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={status === "loading"}
                className="block w-full rounded-md bg-primary hover:bg-red-700 px-3.5 py-2.5 text-center text-sm font-bold text-white shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
              >
                {status === "loading" ? "Submitting Estimate..." : "Submit Estimate Request"}
              </button>
              <p className="text-[11px] text-zinc-500 mt-3 text-center leading-normal">
                By submitting this form, you agree to receive SMS text messages from Anaheim Auto
                Repair and Muffler Care about your service request and appointment updates. Message
                and data rates may apply. Message frequency varies. Reply STOP to opt out or HELP
                for help.
              </p>
            </div>
          </form>
        )}
      </ScrollReveal>
    </div>
  );
}
