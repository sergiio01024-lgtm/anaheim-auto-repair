import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { trackEvent } from "../utils/analytics";

interface GalleryItem {
  src: string;
  alt: string;
  category: "shop" | "work";
  title: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: "/images/storefront-daytime.webp",
    alt: "Anaheim Auto Repair Storefront",
    category: "shop",
    title: "Daytime Storefront View",
  },
  {
    src: "/images/storefront-angle.webp",
    alt: "Anaheim Auto Repair Bays & Entrance",
    category: "shop",
    title: "Service Bays & Parking",
  },
  {
    src: "/images/storefront-front.webp",
    alt: "Shop Entrance & Front Sign",
    category: "shop",
    title: "Main Shop Entrance",
  },
  {
    src: "/images/sign-brakes.webp",
    alt: "Brakes & Exhaust Service Sign",
    category: "shop",
    title: "Brakes & Mufflers Sign",
  },
  {
    src: "/images/sign-mufflers.webp",
    alt: "Muffler & Tailpipe Replacement Sign",
    category: "shop",
    title: "Exhaust Service Sign",
  },
  {
    src: "/images/sign-align.webp",
    alt: "Wheel Alignment & AC Service Sign",
    category: "shop",
    title: "Diagnostics & AC Sign",
  },
  {
    src: "/images/lobby-plants.webp",
    alt: "Clean Waiting Room Lobby with Plants",
    category: "shop",
    title: "Waiting Area Lobby",
  },
  {
    src: "/images/lobby-seating.webp",
    alt: "Lobby Seating Area & Water Station",
    category: "shop",
    title: "Lobby Waiting Seats",
  },
  {
    src: "/images/price-board.webp",
    alt: "Fluid Maintenance Pricing Board",
    category: "shop",
    title: "Fluid Service Rates",
  },
  {
    src: "/images/engine-work.webp",
    alt: "Mechanic Performing Engine Tune-up",
    category: "work",
    title: "Engine Diagnostics & Tune-up",
  },
  {
    src: "/images/tire-alignment.webp",
    alt: "Computerized Wheel Alignment System",
    category: "work",
    title: "Wheel Alignment System",
  },
  {
    src: "/images/brake-work.webp",
    alt: "Mechanic Replacing Brake Rotor & Caliper",
    category: "work",
    title: "Professional Brake Service",
  },
  {
    src: "/images/service-bays.webp",
    alt: "Multiple Auto Repair Service Bays Open",
    category: "shop",
    title: "Service Bays & Facilities",
  },
  {
    src: "/images/brake-suspension.webp",
    alt: "Suspension and Brake Assembly Under Car",
    category: "work",
    title: "Brake & Suspension Work",
  },
  {
    src: "/images/exhaust-pipes.webp",
    alt: "Custom Exhaust Piping and Bending Under Car",
    category: "work",
    title: "Custom Exhaust Piping",
  },
];

export function GallerySection() {
  const [filter, setFilter] = useState<"all" | "shop" | "work">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = galleryItems.map((item, originalIndex) => ({
    ...item,
    originalIndex,
  })).filter((item) => filter === "all" || item.category === filter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (lightboxIndex + 1) % galleryItems.length;
        setLightboxIndex(nextIndex);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
        setLightboxIndex(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleOpenLightbox = (index: number) => {
    trackEvent({ type: "estimate_cta_click", label: `Open Gallery Lightbox: ${galleryItems[index].title}` });
    setLightboxIndex(index);
  };

  const handleFilterChange = (newFilter: "all" | "shop" | "work") => {
    trackEvent({ type: "estimate_cta_click", label: `Filter Gallery: ${newFilter}` });
    setFilter(newFilter);
  };

  return (
    <section id="gallery" className="bg-zinc-50 py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
              Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
              A Look Inside Our Shop
            </h2>
            <p className="mt-4 text-base text-zinc-650 font-semibold">
              Take a visual tour of our facility, service bays, lobby, and diagnostic equipment.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {(["all", "shop", "work"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`rounded-full px-5 py-1.5 text-xs font-bold transition-colors cursor-pointer border ${
                  filter === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {cat === "all" ? "All Photos" : cat === "shop" ? "Shop & Lobby" : "Our Work"}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.originalIndex}
                onClick={() => handleOpenLightbox(item.originalIndex)}
                className="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-zinc-200"
                aria-label={`View larger version of ${item.title}`}
              >
                <div className="img-frame ratio-4-3 bg-zinc-900 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="img-cover group-hover:scale-105 transition-transform duration-350 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-white text-xs font-bold tracking-wider uppercase block mb-1">
                    {item.category === "shop" ? "Facility & Signs" : "Specialty Work"}
                  </span>
                  <h3 className="text-white text-sm font-extrabold truncate">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close Backdrop */}
          <button
            className="absolute inset-0 w-full h-full cursor-default focus:outline-none"
            onClick={() => setLightboxIndex(null)}
            tabIndex={-1}
            aria-hidden="true"
          />

          {/* Main Container */}
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center">
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg shadow-2xl bg-zinc-950 p-1 flex items-center justify-center">
              <img
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].alt}
                className="max-w-full max-h-[75vh] object-contain rounded"
              />
            </div>

            {/* Title & Caption */}
            <div className="text-center text-white mt-4 space-y-1 z-10">
              <h3 className="text-lg font-extrabold">{galleryItems[lightboxIndex].title}</h3>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                {galleryItems[lightboxIndex].category === "shop" ? "Shop & Signage" : "Active Service Work"}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 sm:right-[-2rem] text-white hover:text-zinc-300 text-3xl font-light p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label="Close image viewer"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + galleryItems.length) % galleryItems.length
                )
              }
              className="absolute left-0 sm:left-[-4rem] top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 text-4xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryItems.length)}
              className="absolute right-0 sm:right-[-4rem] top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 text-4xl p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
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
