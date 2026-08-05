import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";
import { getAnaheimBusinessStatus } from "../utils/businessHours";

export function ServiceAreaMap() {
  const status = getAnaheimBusinessStatus();

  return (
    <section id="location" className="bg-[#101214] py-20 sm:py-24 border-y border-white/5">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mb-12 sm:mb-14">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C8202F] block mb-3 uppercase">
              LOCATION & HOURS
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Visit the Anaheim Shop
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Business Info Panel */}
            <div className="lg:col-span-2 bg-[#17191C] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Open/Closed Status */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: status.isOpen ? '#3E9B68' : '#C8202F' }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: status.isOpen ? '#3E9B68' : '#C8202F' }}
                  >
                    {status.isOpen ? "Open Now" : status.message}
                  </span>
                </div>

                {/* Address */}
                <address className="not-italic mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#818891] block mb-1.5 uppercase">Address</span>
                  <p
                    className="text-xl font-bold text-white leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.address.street}
                    <br />
                    {businessConfig.address.city}, {businessConfig.address.state} {businessConfig.address.zip}
                  </p>
                </address>

                {/* Phone */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#818891] block mb-1.5 uppercase">Phone</span>
                  <a
                    href={businessConfig.phone.link}
                    onClick={() =>
                      trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                    }
                    className="text-xl font-bold text-[#C8202F] hover:text-[#AE1D2A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {businessConfig.phone.display}
                  </a>
                </div>

                {/* Hours */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#818891] block mb-2.5 uppercase">Hours</span>
                  <div className="space-y-1.5">
                    {businessConfig.hours.list.map((h, i) => (
                      <div key={i} className="flex justify-between items-baseline max-w-xs">
                        <span className="text-xs text-slate-400" style={{ fontFamily: "var(--font-mono)" }}>
                          {h.days}
                        </span>
                        <span className={`text-xs font-semibold ${h.hours === 'Closed' ? 'text-[#818891]' : 'text-white'}`} style={{ fontFamily: "var(--font-mono)" }}>
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={businessConfig.urls.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "directions_click" })}
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-[#C8202F] hover:bg-[#AE1D2A] px-5 py-3.5 text-sm font-semibold text-white transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
                >
                  Get Directions ↗
                </a>
                <a
                  href={businessConfig.phone.link}
                  onClick={() =>
                    trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                  }
                  className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl border border-white/20 hover:bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-white"
                >
                  Call Shop
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-3 min-h-[360px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#E5E3DF]">
              <iframe
                title="Anaheim Auto Repair location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.0234123456!2d-117.9625!3d33.8175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcd67890abcdef%3A0x1234567890abcdef!2s2583%20W%20Ball%20Rd%2C%20Anaheim%2C%20CA%2092804!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
