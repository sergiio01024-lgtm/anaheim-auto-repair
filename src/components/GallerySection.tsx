import { useState, useEffect, useRef } from "react";
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
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const prevIdx = lightboxIndex;
        setLightboxIndex(null);
        if (prevIdx !== null && triggerRefs.current[prevIdx]) {
          setTimeout(() => triggerRefs.current[prevIdx]?.focus(), 50);
        }
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex]);

  const closeModal = () => {
    const prevIdx = lightboxIndex;
    setLightboxIndex(null);
    if (prevIdx !== null && triggerRefs.current[prevIdx]) {
      setTimeout(() => triggerRefs.current[prevIdx]?.focus(), 50);
    }
  };

  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusables = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };

  const handleOpenLightbox = (index: number) => {
    trackEvent({ type: "gallery_open", title: galleryItems[index].title });
    setLightboxIndex(index);
  };

  return (
    <section id="gallery" className="bg-[#F1F2F2] py-20 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-12 sm:mb-14">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C8202F] block mb-3 uppercase">
              OUR GALLERY
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#16191D] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Inside the Anaheim Shop
            </h2>
          </div>

          {/* Asymmetric Rebalanced Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left Column: Dominant Feature (spans 7 cols on desktop) */}
            <button
              ref={(el) => { triggerRefs.current[0] = el; }}
              onClick={() => handleOpenLightbox(0)}
              className="lg:col-span-7 group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8202F] min-h-[44px]"
              aria-label={`View ${galleryItems[0].title}`}
            >
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img
                  src={galleryItems[0].src}
                  alt={galleryItems[0].alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 text-left">
                <span className="text-xs font-mono font-bold text-[#D5D9DE] uppercase tracking-wider mb-1.5">{galleryItems[0].label}</span>
                <h3
                  className="text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {galleryItems[0].title}
                </h3>
              </div>
              {/* Number badge */}
              <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-mono font-bold text-white">01</span>
              </div>
            </button>

            {/* Right Column: 2x2 Subgrid of Supporting Tiles (spans 5 cols on desktop) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {galleryItems.slice(1, 5).map((item, idx) => (
                <button
                  key={idx + 1}
                  ref={(el) => { triggerRefs.current[idx + 1] = el; }}
                  onClick={() => handleOpenLightbox(idx + 1)}
                  className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8202F] min-h-[44px]"
                  aria-label={`View ${item.title}`}
                >
                  <div className="aspect-[4/3] h-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4 text-left">
                    <span className="text-[11px] font-mono font-bold text-[#D5D9DE] uppercase tracking-wider mb-1">{item.label}</span>
                    <h3
                      className="text-xs sm:text-sm font-bold text-white truncate"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                    <span className="text-[11px] font-mono font-bold text-white">
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
                  ref={(el) => { triggerRefs.current[idx + 5] = el; }}
                  onClick={() => handleOpenLightbox(idx + 5)}
                  className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8202F] min-h-[44px]"
                  aria-label={`View ${item.title}`}
                >
                  <div className="aspect-[16/9]">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-left">
                    <span className="text-xs font-mono font-bold text-[#D5D9DE] uppercase tracking-wider mb-1">{item.label}</span>
                    <h3
                      className="text-sm sm:text-base font-bold text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-mono font-bold text-white">
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
          ref={modalRef}
          onKeyDown={handleTabKey}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            className="absolute inset-0 w-full h-full cursor-default focus:outline-none"
            onClick={closeModal}
            tabIndex={-1}
            aria-hidden="true"
          />

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center pointer-events-auto">
            <div className="relative overflow-hidden rounded-xl bg-[#101214] border border-white/14">
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            <div className="text-center text-white mt-5 space-y-1.5 z-10">
              <span className="text-xs font-mono text-[#D5D9DE] block">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
              </span>
              <h3
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {galleryItems[lightboxIndex].title}
              </h3>
            </div>

            <button
              ref={closeBtnRef}
              onClick={closeModal}
              className="absolute -top-12 right-0 sm:right-[-2rem] text-white hover:text-[#C8202F] text-2xl p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8202F] rounded transition-colors"
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
              className="absolute left-0 sm:left-[-3rem] top-1/2 -translate-y-1/2 text-white hover:text-[#C8202F] text-3xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8202F] rounded transition-colors"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % galleryItems.length)
              }
              className="absolute right-0 sm:right-[-3rem] top-1/2 -translate-y-1/2 text-white hover:text-[#C8202F] text-3xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8202F] rounded transition-colors"
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
