import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function ServiceAreaMap() {
  return (
    <section id="location" className="bg-zinc-50 py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
                Our Location
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6">
                Anaheim Shop & Service Hours
              </h2>

              <div className="space-y-6 text-base text-zinc-600 font-semibold">
                <div>
                  <h3 className="text-zinc-900 font-bold text-lg mb-1">📍 Address</h3>
                  <p>{businessConfig.address.full}</p>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    Free customer parking is available directly in front of our service bays.
                  </p>
                </div>

                <div>
                  <h3 className="text-zinc-900 font-bold text-lg mb-1">🕒 Operating Hours</h3>
                  <p>Monday – Friday: {businessConfig.hours.weekdays}</p>
                  <p>Saturday: {businessConfig.hours.saturday}</p>
                  <p>Sunday: {businessConfig.hours.sunday}</p>
                </div>

                <div>
                  <h3 className="text-zinc-900 font-bold text-lg mb-1">
                    🚗 Serving Nearby Communities
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500 font-medium">
                    Our shop on W Ball Rd provides convenient, drive-in auto repair access for
                    vehicle owners in Anaheim, Garden Grove, Stanton, Orange, Cypress, and Buena
                    Park.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Anaheim+Auto+Repair+Muffler+Care,+2583+W+Ball+Rd,+Anaheim,+CA+92804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-primary hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors text-center focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Get Directions ↗
                </a>
                <a
                  href={businessConfig.phone.link}
                  className="rounded-md bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 px-5 py-3 text-sm font-bold shadow-sm transition-colors text-center focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Call Shop: {businessConfig.phone.display}
                </a>
              </div>
            </div>

            {/* Right Column: Shorter Map */}
            <div className="lg:col-span-7 w-full">
              <div className="overflow-hidden rounded-xl border border-zinc-200 h-[350px] shadow-sm">
                <iframe
                  title="Anaheim Auto Repair Shop Location"
                  src="https://maps.google.com/maps?q=Anaheim+Auto+Repair+Muffler+Care,+2583+W+Ball+Rd,+Anaheim,+CA+92804&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
