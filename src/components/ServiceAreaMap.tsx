import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function ServiceAreaMap() {
  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = hour * 60 + minute;

    if (day === 0) return false; // Sunday closed
    if (day === 6) return time >= 510 && time < 990; // Sat 8:30-16:30
    return time >= 510 && time < 1050; // Mon-Fri 8:30-17:30
  };

  const open = isOpen();

  return (
    <section id="location" className="bg-[#F1F2F2] py-20 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mb-12 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">Location</span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#16191D] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Visit the Anaheim Shop
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Business Info Panel */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#DDE0E3] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                {/* Open/Closed Status */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${open ? 'status-dot' : ''}`}
                    style={{ backgroundColor: open ? '#3E9B68' : '#C8202F' }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: open ? '#3E9B68' : '#C8202F' }}
                  >
                    {open ? "Open Now" : "Currently Closed"}
                  </span>
                </div>

                {/* Address */}
                <address className="not-italic mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#818891] block mb-1">Address</span>
                  <p
                    className="text-xl font-bold text-[#16191D] leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {businessConfig.address.street}
                  </p>
                  <p className="text-sm text-[#606770] mt-1">
                    {businessConfig.address.city}, {businessConfig.address.state} {businessConfig.address.zip}
                  </p>
                </address>

                {/* Phone */}
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#818891] block mb-1">Phone</span>
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#818891] block mb-2.5">Hours</span>
                  <div className="space-y-1.5">
                    {businessConfig.hours.list.map((h, i) => (
                      <div key={i} className="flex justify-between items-baseline max-w-xs">
                        <span className="text-xs text-[#606770]" style={{ fontFamily: "var(--font-mono)" }}>
                          {h.days}
                        </span>
                        <span className={`text-xs font-semibold ${h.hours === 'Closed' ? 'text-[#818891]' : 'text-[#16191D]'}`} style={{ fontFamily: "var(--font-mono)" }}>
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#DDE0E3]">
                <a
                  href={businessConfig.urls.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ type: "directions_click" })}
                  className="rounded-lg bg-[#C8202F] hover:bg-[#AE1D2A] px-6 py-3 text-sm font-semibold text-white transition-colors text-center shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
                >
                  Get Directions
                </a>
                <a
                  href={businessConfig.phone.link}
                  onClick={() =>
                    trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                  }
                  className="rounded-lg border border-[#DDE0E3] bg-[#F6F6F3] hover:bg-[#E8EBED] text-[#16191D] px-6 py-3 text-sm font-semibold transition-all text-center focus-visible:outline-2 focus-visible:outline-[#C8202F]"
                >
                  Call Shop
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden border border-[#DDE0E3] shadow-sm h-[400px] sm:h-[460px] lg:h-full lg:min-h-[480px]">
                <iframe
                  title="Anaheim Auto Repair & Muffler Care Location"
                  src="https://maps.google.com/maps?q=2583+W+Ball+Rd,+Anaheim,+CA+92804&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
