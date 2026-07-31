import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { trackEvent } from "../utils/analytics";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  label: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/images/exhaust-pipes.webp",
    alt: "Custom exhaust piping and bending work",
    title: "Custom Exhaust Piping",
    label: "EXHAUST SYSTEM",
  },
  {
    src: "/images/brake-work.webp",
    alt: "Mechanic replacing brake rotor and caliper",
    title: "Professional Brake Service",
    label: "BRAKE REPAIR",
  },
  {
    src: "/images/engine-work.webp",
    alt: "Mechanic performing engine tune-up diagnostics",
    title: "Engine Diagnostics & Tune-up",
    label: "ENGINE WORK",
  },
  {
    src: "/images/tire-alignment.webp",
    alt: "Computerized wheel alignment system in use",
    title: "Wheel Alignment System",
    label: "ALIGNMENT",
  },
  {
    src: "/images/brake-suspension.webp",
    alt: "Suspension and brake assembly under vehicle",
    title: "Brake & Suspension Work",
    label: "SUSPENSION",
  },
  {
    src: "/images/service-bays.webp",
    alt: "Multiple auto repair service bays with vehicles on lifts",
    title: "Service Bays & Facilities",
    label: "SHOP FLOOR",
  },
  {
    src: "/images/sign-mufflers.webp",
    alt: "Muffler and tailpipe replacement sign at shop",
    title: "Muffler & Exhaust Specialist",
    label: "SIGNAGE",
  },
  {
    src: "/images/storefront-angle.webp",
    alt: "Anaheim Auto Repair bays and entrance angle view",
    title: "Shop Entrance & Bays",
    label: "EXTERIOR",
  },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const handleOpenLightbox = (index: number) => {
    trackEvent({ type: "estimate_cta_click", label: `Open Gallery: ${galleryItems[index].title}` });
    setLightboxIndex(index);
  };

  return (
    <section id="gallery" className="bg-[#F1F2F2] py-20 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-12 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">Our Work</span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#16191D] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built, Repaired, and Tested Here
            </h2>
          </div>

          {/* Asymmetric Rebalanced Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left Column: Dominant Feature (spans 7 cols on desktop) */}
            <button
              onClick={() => handleOpenLightbox(0)}
              className="lg:col-span-7 group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red min-h-[44px]"
              aria-label={`View ${galleryItems[0].title}`}
            >
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img
                  src={galleryItems[0].src}
                  alt={galleryItems[0].alt}
                  className="img-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 text-left">
                <span className="label-mono text-steel-300 text-xs mb-1.5">{galleryItems[0].label}</span>
                <h3
                  className="text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {galleryItems[0].title}
                </h3>
              </div>
              {/* Number badge */}
              <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                <span className="label-mono text-xs text-steel-300">01</span>
              </div>
            </button>

            {/* Right Column: 2x2 Subgrid of Supporting Tiles (spans 5 cols on desktop) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {galleryItems.slice(1, 5).map((item, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handleOpenLightbox(idx + 1)}
                  className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red min-h-[44px]"
                  aria-label={`View ${item.title}`}
                >
                  <div className="aspect-[4/3] h-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="img-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4 text-left">
                    <span className="label-mono text-steel-300 text-[11px] mb-1">{item.label}</span>
                    <h3
                      className="text-xs sm:text-sm font-bold text-white truncate"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                    <span className="label-mono text-[11px] text-steel-300">
                      {String(idx + 2).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Row: 2 Modular Wide Tiles (spans full 12 cols) */}
            <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {galleryItems.slice(5, 7).map((item, idx) => (
                <button
                  key={idx + 5}
                  onClick={() => handleOpenLightbox(idx + 5)}
                  className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red min-h-[44px]"
                  aria-label={`View ${item.title}`}
                >
                  <div className="aspect-[16/9]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="img-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-left">
                    <span className="label-mono text-steel-300 text-xs mb-1">{item.label}</span>
                    <h3
                      className="text-sm sm:text-base font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
                    <span className="label-mono text-xs text-steel-300">
                      {String(idx + 6).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          style={{ backgroundColor: "rgba(11, 13, 16, 0.97)" }}
        >
          <button
            className="absolute inset-0 w-full h-full cursor-default focus:outline-none"
            onClick={() => setLightboxIndex(null)}
            tabIndex={-1}
            aria-hidden="true"
          />

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center">
            <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: "var(--garage-950)" }}>
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            <div className="text-center text-white mt-5 space-y-1.5 z-10">
              <span className="label-mono text-steel-400 block">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
              </span>
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {galleryItems[lightboxIndex].title}
              </h3>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 sm:right-[-2rem] text-steel-400 hover:text-white text-2xl p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red rounded transition-colors"
              aria-label="Close image viewer"
            >
              ✕
            </button>

            <button
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
                )
              }
              className="absolute left-0 sm:left-[-3rem] top-1/2 -translate-y-1/2 text-steel-400 hover:text-white text-3xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red rounded transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % galleryItems.length)
              }
              className="absolute right-0 sm:right-[-3rem] top-1/2 -translate-y-1/2 text-steel-400 hover:text-white text-3xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red rounded transition-colors"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
