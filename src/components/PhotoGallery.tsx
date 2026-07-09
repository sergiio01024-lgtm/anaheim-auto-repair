import { useState, useRef, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

const photos = [
  // --- Bucket 1: HAS PEOPLE ---
  {
    src: "/photos/commercial-switchgear-panel.webp",
    alt: "Engine diagnostics and tune-up service",
    category: "Engine",
  },
  {
    src: "/photos/commercial-switchgear-wiring.webp",
    alt: "Muffler replacement on passenger car",
    category: "Exhaust",
  },
  {
    src: "/photos/auto-shop-1.webp",
    alt: "Brake rotor and pad replacement",
    category: "Brakes",
  },
  { src: "/photos/lte-commercial-framing-install.jpg", alt: "Exhaust manifold repair work", category: "Exhaust" },
  { src: "/photos/commercial-conduit-purple-wall.jpg", alt: "Under-car exhaust pipe installation", category: "Exhaust" },
  { src: "/photos/auto-shop-4.jpg", alt: "Engine oil change and filter replacement", category: "Engine" },
  { src: "/photos/lte-crew-generator-panel.jpg", alt: "Shocks and struts suspension service", category: "Brakes" },
  { src: "/photos/auto-shop-5.jpg", alt: "Transmission diagnostic service", category: "Engine" },

  // --- Bucket 2: NO PEOPLE ---
  {
    src: "/photos/residential-panel-upgrade.webp",
    alt: "High-performance muffler installation",
    category: "Exhaust",
  },
  {
    src: "/photos/residential-panel-upgrade-exterior.webp",
    alt: "Catalytic converter replacement",
    category: "Exhaust",
  },
  {
    src: "/photos/commercial-ats-wiring-closeup.webp",
    alt: "Front brake pad installation",
    category: "Brakes",
  },
  {
    src: "/photos/commercial-dry-transformer-interior.webp",
    alt: "Spark plug and ignition coil replacement",
    category: "Engine",
  },
  {
    src: "/photos/residential-kitchen-recessed-lighting.webp",
    alt: "Rear brake shoe and drum service",
    category: "Brakes",
  },
  {
    src: "/photos/residential-patio-recessed-lighting.webp",
    alt: "Dual exhaust system custom upgrade",
    category: "Exhaust",
  },
  {
    src: "/photos/residential-patio-recessed-cedar.webp",
    alt: "Engine timing belt replacement",
    category: "Engine",
  },
  {
    src: "/photos/residential-fence-landscape-lights.webp",
    alt: "Suspension alignment and steering check",
    category: "Brakes",
  },
  {
    src: "/photos/outdoor-water-feature-lighting.webp",
    alt: "Custom exhaust tip fitting",
    category: "Exhaust",
  },
  {
    src: "/photos/commercial-generac-generator-install.webp",
    alt: "Complete engine rebuild in progress",
    category: "Engine",
  },
  {
    src: "/photos/commercial-led-shop-lighting.webp",
    alt: "Brake caliper service and fluid flush",
    category: "Brakes",
  },
  {
    src: "/photos/commercial-underground-conduit-install.webp",
    alt: "Exhaust system pipe bending",
    category: "Exhaust",
  },
  {
    src: "/photos/commercial-transformer-delivery.webp",
    alt: "Engine radiator replacement",
    category: "Engine",
  },
  {
    src: "/photos/commercial-transformer-cart-shop.webp",
    alt: "New battery installation and electrical test",
    category: "Engine",
  },
  {
    src: "/photos/commercial-transformer-frame-yard.webp",
    alt: "Strut assembly replacement",
    category: "Brakes",
  },
  {
    src: "/photos/commercial-transformer-yard.webp",
    alt: "Custom catalytic converter shield install",
    category: "Exhaust",
  },
  { src: "/photos/commercial-ats-transfer-switch.jpg", alt: "Engine cylinder head repair", category: "Engine" },
  { src: "/photos/commercial-generator-flatbed-delivery.jpg", alt: "Transmission fluid flush and service", category: "Engine" },
  { src: "/photos/commercial-generac-transfer-switches.jpg", alt: "Brake master cylinder replacement", category: "Brakes" },
  { src: "/photos/commercial-bjj-gym-lighting.jpg", alt: "Performance exhaust upgrade", category: "Exhaust" },
  { src: "/photos/commercial-office-recessed-lighting.jpg", alt: "Engine valve cover gasket replacement", category: "Engine" },
  { src: "/photos/residential-kitchen-range-hood.jpg", alt: "Brake rotor resurfacing", category: "Brakes" },
  { src: "/photos/residential-outlet-conduit-stucco.jpg", alt: "Muffler hanger repair", category: "Exhaust" },
];

const categories = ["All", "Exhaust", "Brakes", "Engine"];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const filteredPhotos = activeCategory === "All"
    ? photos
    : photos.filter((photo) => photo.category === activeCategory);

  const len = filteredPhotos.length;
  const index0 = len > 0 ? (activeIndex - 1 + len) % len : 0; // Left column (desktop only)
  const index1 = len > 0 ? activeIndex % len : 0;             // Center column (active/primary)
  const index2 = len > 0 ? (activeIndex + 1) % len : 0;       // Right column (desktop only)

  // Auto-scroll the thumbnail strip to center the active thumbnail
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const targetElement = thumbnailContainerRef.current?.children[activeIndex] as HTMLElement;
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex, activeCategory]);

  const handleNext = (e: React.MouseEvent) => {
    if (len > 0) {
      const isAtEnd = activeIndex === len - 1;
      if (isAtEnd) {
        if (e.detail >= 2) {
          setActiveIndex(0);
        }
      } else {
        setActiveIndex((prev) => (prev + 1) % len);
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    if (len > 0) {
      const isAtStart = activeIndex === 0;
      if (isAtStart) {
        if (e.detail >= 2) {
          setActiveIndex(len - 1);
        }
      } else {
        setActiveIndex((prev) => (prev - 1 + len) % len);
      }
    }
  };

  const scrollLeft = (e: React.MouseEvent) => {
    const container = thumbnailContainerRef.current;
    if (container) {
      // Check if we are at or near the left boundary (0)
      if (container.scrollLeft <= 5) {
        if (e.detail >= 2) {
          // Wrap-around to the end of the scroll track on double-click
          container.scrollTo({
            left: container.scrollWidth - container.clientWidth,
            behavior: "smooth",
          });
        }
      } else {
        container.scrollBy({ left: -240, behavior: "smooth" });
      }
    }
  };

  const scrollRight = (e: React.MouseEvent) => {
    const container = thumbnailContainerRef.current;
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      // Check if we are at or near the right boundary (maxScroll)
      if (container.scrollLeft >= maxScroll - 5) {
        if (e.detail >= 2) {
          // Wrap-around to the beginning of the scroll track on double-click
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        container.scrollBy({ left: 240, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 py-12 sm:py-32">
      <ScrollReveal>
        {/* Header & Categories */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
          <div className="mx-auto max-w-2xl lg:text-center mb-12">
            <h2 className="text-base font-semibold text-red-650 dark:text-red-400">Our Work</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Photo Gallery
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Professional auto repairs and exhaust work you can trust.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveIndex(0);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Row (Full-bleed, black borders) */}
        <div className="w-full bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-black">
          {len > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
              {/* Image 1 (Desktop Only - Left preview) - Tinted and Blurred */}
              <div
                onClick={() => setSelectedPhoto(filteredPhotos[index0].src)}
                className="hidden sm:block relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-950 cursor-pointer group overflow-hidden"
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gray-100/90 dark:bg-zinc-950/90 text-gray-700 dark:text-gray-500 transition-all duration-500 group-hover:bg-gray-200 dark:group-hover:bg-zinc-900 group-hover:text-gray-900 dark:group-hover:text-gray-400"
                >
                  <span className="text-[10px] font-semibold tracking-wider uppercase mb-1">Photo coming soon</span>
                  <span className="text-[8px] max-w-[150px] line-clamp-2">{filteredPhotos[index0].alt}</span>
                </div>
              </div>

              {/* Image 2 (Mobile & Desktop - Center active photo) - Full Color, Sharp, No Tint */}
              <div
                className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-950 group/image overflow-hidden"
              >
                {/* Click target to open lightbox */}
                <div
                  onClick={() => setSelectedPhoto(filteredPhotos[index1].src)}
                  className="w-full h-full cursor-pointer"
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-red-50/50 dark:bg-red-950/45 border border-red-200 dark:border-red-900/25 text-red-950 dark:text-gray-300 transition-transform duration-500 group-hover/image:scale-105"
                  >
                    <span className="text-sm font-semibold tracking-wider uppercase mb-2">Photo coming soon</span>
                    <span className="text-xs text-red-900 dark:text-gray-400 max-w-[200px] line-clamp-3">{filteredPhotos[index1].alt}</span>
                  </div>
                </div>

                {/* Hero Prev Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev(e);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Hero Next Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext(e);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-12 rounded-full bg-black/50 hover:bg-black/75 text-white transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next photo"
                >
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Image 3 (Desktop Only - Right preview) - Tinted and Blurred */}
              <div
                onClick={() => setSelectedPhoto(filteredPhotos[index2].src)}
                className="hidden sm:block relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-950 cursor-pointer group overflow-hidden"
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gray-100/90 dark:bg-zinc-950/90 text-gray-700 dark:text-gray-500 transition-all duration-500 group-hover:bg-gray-200 dark:group-hover:bg-zinc-900 group-hover:text-gray-900 dark:group-hover:text-gray-400"
                >
                  <span className="text-[10px] font-semibold tracking-wider uppercase mb-1">Photo coming soon</span>
                  <span className="text-[8px] max-w-[150px] line-clamp-2">{filteredPhotos[index2].alt}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Navigation Track */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
          <div className="relative flex items-center gap-2 select-none">
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white transition-all duration-200 ease-in-out shrink-0 focus:outline-none hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Thumbnail scroll track */}
            <div
              ref={thumbnailContainerRef}
              className="flex-1 flex gap-3 overflow-x-auto py-2 px-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredPhotos.map((photo, i) => {
                const isPrimary = i === index1;
                const isSecondary = (i === index0 || i === index2) && !isPrimary;

                return (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-200 ${
                      isPrimary
                        ? "ring-4 ring-red-500 scale-105 z-10 shadow-md"
                        : isSecondary
                        ? "ring-2 ring-red-500/40 opacity-90"
                        : "ring-1 ring-gray-200 dark:ring-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`size-full flex flex-col items-center justify-center p-1 text-center border transition-colors ${
                        i % 2 === 0 
                          ? "bg-gray-100 border-gray-200 text-gray-800 dark:bg-zinc-900 dark:border-transparent dark:text-gray-400" 
                          : "bg-red-50/50 border-red-200 text-red-950 dark:bg-red-950/60 dark:border-transparent dark:text-gray-400"
                      }`}
                    >
                      <span className="text-[8px] text-gray-400 font-semibold uppercase leading-none mb-1">Photo</span>
                      <span className="text-[6px] text-gray-500 line-clamp-3 leading-none">{photo.alt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white transition-all duration-200 ease-in-out shrink-0 focus:outline-none hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Fullscreen Lightbox Overlay */}
          {selectedPhoto && (() => {
            const currentPhoto = photos.find(p => p.src === selectedPhoto);
            return (
              <div
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                onClick={() => setSelectedPhoto(null)}
              >
                <div
                  className="w-full max-w-2xl aspect-[4/3] bg-zinc-900 border border-white/10 rounded-lg flex flex-col items-center justify-center p-8 text-center shadow-2xl animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-gray-400 text-lg font-semibold tracking-wider uppercase mb-2">Photo coming soon</span>
                  <span className="text-gray-500 text-sm">{currentPhoto ? currentPhoto.alt : ""}</span>
                </div>
                <button
                  className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-500 leading-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
                  onClick={() => setSelectedPhoto(null)}
                >
                  ✕
                </button>
              </div>
            );
          })()}

          {/* Call to Action */}
          <p className="mt-12 text-center text-sm text-gray-500">
            Ready to schedule your repair?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-red-400 hover:text-red-300 font-semibold"
            >
              Get a free quote →
            </a>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
