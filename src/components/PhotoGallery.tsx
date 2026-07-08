import { useState, useRef, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";

const photos = [
  // --- Bucket 1: HAS PEOPLE ---
  {
    src: "/photos/commercial-switchgear-panel.webp",
    alt: "Large commercial metering switchgear installation with electricians on site",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-switchgear-wiring.webp",
    alt: "Electricians pulling cable into commercial switchgear unit",
    category: "Commercial",
  },
  {
    src: "/photos/luke-generator-rooftop.webp",
    alt: "LTE Electric owner Luke with Generac industrial generator on rooftop",
    category: "Commercial",
  },
  { src: "/photos/lte-commercial-framing-install.jpg", alt: "LTE Electric worker on a commercial electrical framing installation", category: "Commercial" },
  { src: "/photos/commercial-conduit-purple-wall.jpg", alt: "Exterior commercial conduit installation on building wall", category: "Commercial" },
  { src: "/photos/luke-panel-framing-jobsite.jpg", alt: "LTE Electric owner Luke working at a commercial framing job site", category: "Commercial" },
  { src: "/photos/lte-crew-generator-panel.jpg", alt: "LTE Electric crew working on a generator panel installation", category: "Commercial" },
  { src: "/photos/luke-commercial-panel-work.jpg", alt: "Luke servicing a large commercial electrical panel", category: "Commercial" },

  // --- Bucket 2: NO PEOPLE ---
  {
    src: "/photos/residential-panel-upgrade.webp",
    alt: "Residential electrical panel upgrade with new circuit breakers installed",
    category: "Panel Upgrades",
  },
  {
    src: "/photos/residential-panel-upgrade-exterior.webp",
    alt: "Exterior electrical panel and utility meter installation on residential home",
    category: "Panel Upgrades",
  },
  {
    src: "/photos/commercial-ats-wiring-closeup.webp",
    alt: "Automatic transfer switch wiring closeup showing conduit and cable runs",
    category: "Panel Upgrades",
  },
  {
    src: "/photos/commercial-dry-transformer-interior.webp",
    alt: "Three-phase dry transformer interior showing coils and bus connections",
    category: "Panel Upgrades",
  },
  {
    src: "/photos/residential-kitchen-recessed-lighting.webp",
    alt: "Kitchen remodel with new recessed lighting and pendant lights installed",
    category: "Residential",
  },
  {
    src: "/photos/residential-patio-recessed-lighting.webp",
    alt: "Modern patio cover with recessed can lights and outdoor privacy screen",
    category: "Residential",
  },
  {
    src: "/photos/residential-patio-recessed-cedar.webp",
    alt: "Cedar patio ceiling with recessed lighting and exterior wall sconce",
    category: "Residential",
  },
  {
    src: "/photos/residential-fence-landscape-lights.webp",
    alt: "Exterior landscape lighting installation on residential fence and garden",
    category: "Residential",
  },
  {
    src: "/photos/outdoor-water-feature-lighting.webp",
    alt: "Outdoor water feature and landscape lighting installation",
    category: "Residential",
  },
  {
    src: "/photos/commercial-generac-generator-install.webp",
    alt: "Generac industrial generator installation with transfer switch at commercial building",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-led-shop-lighting.webp",
    alt: "LED shop lighting installation in commercial warehouse space",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-underground-conduit-install.webp",
    alt: "Underground electrical conduit installation at commercial construction site",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-transformer-delivery.webp",
    alt: "Commercial electrical transformer being delivered by forklift to job site",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-transformer-cart-shop.webp",
    alt: "Electrical transformer on mobile cart in supply shop",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-transformer-frame-yard.webp",
    alt: "Custom transformer frame in electrical supply yard",
    category: "Commercial",
  },
  {
    src: "/photos/commercial-transformer-yard.webp",
    alt: "Large commercial transformer staged at electrical supply yard",
    category: "Commercial",
  },
  { src: "/photos/commercial-ats-transfer-switch.jpg", alt: "Commercial automatic transfer switch wiring installation", category: "Commercial" },
  { src: "/photos/commercial-generator-flatbed-delivery.jpg", alt: "Commercial Generac generator delivery and installation", category: "Commercial" },
  { src: "/photos/commercial-generac-transfer-switches.jpg", alt: "Generac transfer switches installed on commercial building exterior", category: "Commercial" },
  { src: "/photos/commercial-bjj-gym-lighting.jpg", alt: "Commercial lighting installation in a San Diego gym space", category: "Commercial" },
  { src: "/photos/commercial-office-recessed-lighting.jpg", alt: "Commercial office recessed lighting installation", category: "Commercial" },
  { src: "/photos/residential-kitchen-range-hood.jpg", alt: "Residential kitchen remodel with recessed lighting and range hood installation", category: "Residential" },
  { src: "/photos/residential-outlet-conduit-stucco.jpg", alt: "Exterior electrical outlet and conduit installation on residential stucco", category: "Residential" },
];

const categories = ["All", "Panel Upgrades", "Residential", "Commercial"];

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
            <h2 className="text-base font-semibold text-orange-400">Our Work</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Photo Gallery
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Every job done clean, to code, and built to last.
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
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Row (Full-bleed, black borders) */}
        <div className="w-full bg-gray-900 border-y border-black">
          {len > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
              {/* Image 1 (Desktop Only - Left preview) - Tinted and Blurred */}
              <div
                onClick={() => setSelectedPhoto(filteredPhotos[index0].src)}
                className="hidden sm:block relative w-full aspect-[4/3] bg-gray-950 cursor-pointer group overflow-hidden"
              >
                <img
                  src={filteredPhotos[index0].src}
                  alt={filteredPhotos[index0].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-75 blur-[2px] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:blur-0"
                />
                <div className="absolute inset-0 bg-orange-500/35 mix-blend-multiply pointer-events-none transition-all duration-500 group-hover:bg-orange-500/5" />
              </div>

              {/* Image 2 (Mobile & Desktop - Center active photo) - Full Color, Sharp, No Tint */}
              <div
                className="relative w-full aspect-[4/3] bg-gray-950 group/image overflow-hidden"
              >
                {/* Click target to open lightbox */}
                <div
                  onClick={() => setSelectedPhoto(filteredPhotos[index1].src)}
                  className="w-full h-full cursor-pointer"
                >
                  <img
                    src={filteredPhotos[index1].src}
                    alt={filteredPhotos[index1].alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                  />
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
                className="hidden sm:block relative w-full aspect-[4/3] bg-gray-950 cursor-pointer group overflow-hidden"
              >
                <img
                  src={filteredPhotos[index2].src}
                  alt={filteredPhotos[index2].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-75 blur-[2px] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:blur-0"
                />
                <div className="absolute inset-0 bg-orange-500/35 mix-blend-multiply pointer-events-none transition-all duration-500 group-hover:bg-orange-500/5" />
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
                        ? "ring-4 ring-orange-500 scale-105 z-10 shadow-md"
                        : isSecondary
                        ? "ring-2 ring-orange-500/40 opacity-90"
                        : "ring-1 ring-gray-200 dark:ring-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
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
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setSelectedPhoto(null)}
            >
              <img
                src={selectedPhoto}
                loading="lazy"
                decoding="async"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-orange-400 leading-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
            </div>
          )}

          {/* Call to Action */}
          <p className="mt-12 text-center text-sm text-gray-500">
            Ready to add your project to this list?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              Get a free quote →
            </a>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}