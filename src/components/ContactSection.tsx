import { useState, useEffect } from "react";
import { useEstimate } from "../context/EstimateContext";
import { ScrollReveal } from "./ScrollReveal";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "", property_address: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { selectedService } = useEstimate();

  useEffect(() => {
    if (selectedService) {
      const serviceMap: Record<string, string> = {
        "Panel Upgrades": "Panel Upgrade",
        "Panel Upgrade": "Panel Upgrade",
        "EV Charger Installation": "EV Charger Installation",
        "Residential Wiring": "Residential Wiring",
        "Commercial Electrical": "Commercial Electrical",
        "Lighting Installation": "Lighting Installation",
        "Outlet & Switch Repair": "Outlet & Switch Repair",
        "Emergency Repairs": "Emergency Repair",
        "Ceiling Fan Installation": "Other",
        "Solar Electrical": "Other",
        "Security Lighting": "Lighting Installation",
        "Low Voltage": "Other",
        "Troubleshooting": "Emergency Repair",
        "Generator Installations": "Other",
        "Temporary Power Connections": "Other",
      };
      const mapped = serviceMap[selectedService];
      if (mapped) {
        setFormData((prev) => ({ ...prev, service: mapped }));
      }
    }
  }, [selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const serviceMap: Record<string, string> = {
      "Panel Upgrade": "panel_upgrade", "EV Charger Installation": "ev_charger",
      "Residential Wiring": "rewiring", "Commercial Electrical": "general",
      "Lighting Installation": "lighting", "Outlet & Switch Repair": "outlets",
      "Emergency Repair": "troubleshooting", "Other": "general",
    };
    try {
      const res = await fetch("https://n8n.kratosintelligence.com/webhook/lte-electric-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, phone: formData.phone, email: formData.email,
          service_type: serviceMap[formData.service] || "general",
          job_description: formData.message, property_address: formData.property_address,
          preferred_date: "", preferred_time: "", request_type: "quote", message: formData.message,
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setFormData({ name: "", phone: "", email: "", service: "", message: "", property_address: "" });
    } catch { setStatus("error"); }
  };

  return (
    <div id="contact" className="isolate bg-gray-50 dark:bg-gray-950 px-6 py-12 md:py-32 lg:px-8">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Get a Free Quote</h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Fill out the form and we'll get back to you to schedule. For emergencies, call (858) 997-9251.</p>
          <p className="mt-2 text-sm text-gray-500">Mon–Sat: Open 24 Hours · Sun: Closed</p>
        </div>

        {status === "success" ? (
          <div className="mx-auto mt-16 max-w-xl text-center">
            <div className="rounded-2xl bg-white dark:bg-white/5 p-12 ring-1 ring-gray-200 dark:ring-white/10">
              <div className="text-4xl mb-4 text-orange-500">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Request Received!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">We'll be in touch shortly to schedule your service.</p>
              <button onClick={() => setStatus("idle")} className="text-orange-400 text-sm hover:underline">Submit another request</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-white">Name *</label>
                <div className="mt-2.5">
                  <input type="text" id="name" value={formData.name} onChange={handleChange} required placeholder="Your full name"
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-orange-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-white">Phone *</label>
                <div className="mt-2.5">
                  <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required placeholder="(619) 000-0000"
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-orange-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-white">Email</label>
                <div className="mt-2.5">
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="your@email.com"
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-orange-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="service" className="block text-sm font-semibold text-gray-700 dark:text-white">Service Needed *</label>
                <div className="mt-2.5">
                  <select id="service" value={formData.service} onChange={handleChange} required
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-orange-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500">
                    <option value="" disabled className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select a service...</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Panel Upgrade</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">EV Charger Installation</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Residential Wiring</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Commercial Electrical</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Lighting Installation</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Outlet & Switch Repair</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Emergency Repair</option>
                    <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Other</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="property_address" className="block text-sm font-semibold text-gray-700 dark:text-white">Property Address</label>
                <div className="mt-2.5">
                  <input type="text" id="property_address" value={formData.property_address} onChange={handleChange} placeholder="123 Main St, San Diego, CA 92111"
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-orange-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-white">Tell us about the job</label>
                <div className="mt-2.5">
                  <textarea id="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Describe what you need help with..."
                    className="block w-full rounded-md bg-white dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-orange-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 resize-none" />
                </div>
              </div>
            </div>
            {status === "error" && <p className="mt-4 text-red-400 text-sm">Something went wrong. Please call us at (858) 997-9251.</p>}
            <div className="mt-10">
              <button type="submit" disabled={status === "loading"}
                className="block w-full rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-400 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-50">
                {status === "loading" ? "Sending..." : "Request a Free Quote"}
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                By submitting this form, you agree to receive SMS text messages from LTE Electric about your service request and appointment updates. Message and data rates may apply. Message frequency varies. Reply STOP to opt out or HELP for help.
              </p>
            </div>
          </form>
        )}
      </ScrollReveal>
    </div>
  );
}
