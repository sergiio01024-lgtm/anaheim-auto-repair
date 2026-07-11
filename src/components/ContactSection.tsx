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
    try {
      const res = await fetch("https://n8n.kratosintelligence.com/webhook/anaheim-auto-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service_type: serviceMap[formData.service] || "general",
          job_description: formData.message,
          property_address: formData.property_address,
          preferred_date: "",
          preferred_time: "",
          request_type: "quote",
          message: formData.message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok)
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
          property_address: "",
        });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      id="contact"
      className="isolate bg-white dark:bg-gray-950 px-6 py-24 sm:py-32 lg:px-8 border-t border-gray-200 dark:border-white/10"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-primary dark:text-red-400">Get in Touch</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Request an Estimate
          </p>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Tell us what your car needs and we'll get back to you with a free ballpark quote.
          </p>
        </div>
        {status === "success" ? (
          <div className="mx-auto mt-16 max-w-xl text-center bg-red-500/10 border border-red-500/25 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-red-500">Thank You!</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your request has been received. {businessConfig.staff.manager} or someone from our
              team will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-white"
                >
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
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 dark:text-white"
                >
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
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-white"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="service"
                  className="block text-sm font-semibold text-gray-700 dark:text-white"
                >
                  Service Needed *
                </label>
                <div className="mt-2.5">
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      Select a service...
                    </option>
                    {contactServices.map((service) => (
                      <option
                        key={service}
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="property_address"
                  className="block text-sm font-semibold text-gray-700 dark:text-white"
                >
                  Address
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    id="property_address"
                    value={formData.property_address}
                    placeholder="123 Main St, Anaheim, CA 92804"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 dark:text-white"
                >
                  Tell us about the job
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what you need help with..."
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 resize-none"
                  />
                </div>
              </div>
            </div>
            {status === "error" && (
              <p className="mt-4 text-primary dark:text-red-400 text-sm">
                Something went wrong. Please try again or call us.
              </p>
            )}
            <div className="mt-10">
              <button
                type="submit"
                disabled={status === "loading"}
                className="block w-full rounded-md bg-red-600 hover:bg-red-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Request a Free Quote"}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
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
