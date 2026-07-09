import { useState, useEffect } from "react";

const heroSlides = [
  {
    src: "/photos/auto-shop-1.webp",
    alt: "Auto repair shop in Anaheim",
  },
  {
    src: "/photos/auto-shop-2.webp",
    alt: "Muffler and exhaust work",
  },
  {
    src: "/photos/auto-shop-3.webp",
    alt: "Engine diagnostics",
  },
  {
    src: "/photos/auto-shop-4.jpg",
    alt: "Brake service",
  },
  {
    src: "/photos/lte-crew-generator-panel.jpg",
    alt: "Transmission repair",
  },
  {
    src: "/photos/auto-shop-5.jpg",
    alt: "Oil change service",
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-gray-950 py-20 sm:py-24">
      {/* Decorative blurred background blob */}
      <div aria-hidden="true" className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}} className="aspect-video w-96 bg-gradient-to-tr from-red-600 to-red-500 opacity-20" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT Column: Text & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-650 dark:text-red-400 ring-1 ring-inset ring-red-500/20">
                Serving Anaheim & Orange County Since 1978
              </span>
            </div>
            
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Anaheim's Trusted Auto & Muffler Shop
            </h1>
            
            <p className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-300 sm:text-xl leading-relaxed">
              Muffler & exhaust, brakes, transmission, engine repair, oil changes, and more — honest work at a fair price. Family-owned and trusted in Anaheim for over 45 years.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="tel:7148264444" className="rounded-md bg-red-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-red-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 text-center">
                Call (714) 826-4444
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-md bg-white dark:bg-white/10 px-6 py-3.5 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 text-center border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-inset dark:ring-white/10"
              >
                Get a Free Quote →
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 border-t border-gray-200 dark:border-white/5 pt-8">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base text-gray-500 dark:text-gray-400">Yelp Rating</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">4.7 ★</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base text-gray-500 dark:text-gray-400">Years in Business</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">45+</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base text-gray-500 dark:text-gray-400">Yelp Reviews</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">590+</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-base text-gray-500 dark:text-gray-400">Mon–Sat · Open</dt>
                <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">6 Days</dd>
              </div>
            </dl>
          </div>

          {/* RIGHT Column: contained crossfade slideshow */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="img-frame ratio-portrait rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 max-h-[50vh] lg:max-h-[75vh] w-full max-w-md lg:max-w-none overflow-hidden">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-[1200ms] ease-in-out ${
                    idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  } ${
                    idx % 2 === 0 
                      ? "bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-transparent" 
                      : "bg-red-50/50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30"
                  }`}
                >
                  <span className="text-gray-700 dark:text-gray-400 text-sm font-semibold tracking-wider uppercase mb-2">Photo coming soon</span>
                  <span className="text-gray-500 dark:text-gray-500 text-xs max-w-[200px]">{slide.alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
