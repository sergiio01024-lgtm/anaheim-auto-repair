import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function AboutSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div id="about" className="relative isolate overflow-hidden bg-white dark:bg-gray-950 py-24 sm:py-32">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-base font-semibold text-red-650 dark:text-red-400">About Our Shop</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Family-Owned & Trusted in Anaheim Since 1978
              </p>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                For over 45 years, Anaheim Auto Repair and Muffler Care has been the shop Anaheim drivers trust for honest work at a fair price. We work on all makes and models — from Honda, Toyota, and Ford to BMW, Mercedes, and Audi.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Muffler and exhaust work is our specialty, but our team handles everything from brakes and transmissions to engine diagnostics and routine maintenance. Our customers consistently tell us the same thing: we're <strong className="font-semibold text-gray-950 dark:text-white">honest, fast, and we don't upsell you</strong> on work you don't need.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                When you call, you get a real person — like our manager Carson — who will give you a straight quote over the phone and stand behind it when you come in. That's how we've kept customers coming back for three generations.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Years in Business</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">45+</dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Established</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">1978</dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Yelp Rating</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">4.7 ★</dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Yelp Reviews</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">595</dd>
                </div>
              </dl>
            </div>
            <div className="mt-12 lg:mt-0 flex flex-col gap-4">
              <div className="img-frame ratio-3-2 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl overflow-hidden">
                <div onClick={() => setSelectedPhoto("shop-front")} className="cursor-pointer size-full flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-950 p-6 text-center border border-gray-200 dark:border-transparent">
                  <span className="text-gray-700 dark:text-gray-400 text-sm font-semibold tracking-wider uppercase mb-2">Photo coming soon</span>
                  <span className="text-gray-500 text-xs max-w-[200px]">Our shop on W Ball Rd</span>
                </div>
              </div>
              <div className="img-frame ratio-1-1 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl overflow-hidden">
                <div onClick={() => setSelectedPhoto("shop-team")} className="cursor-pointer size-full flex flex-col items-center justify-center bg-red-50/50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30 p-6 text-center">
                  <span className="text-red-900/80 dark:text-gray-400 text-sm font-semibold tracking-wider uppercase mb-2">Photo coming soon</span>
                  <span className="text-red-950/70 dark:text-gray-500 text-xs max-w-[200px]">Our team at work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="w-full max-w-2xl aspect-video bg-zinc-900 border border-white/10 rounded-lg flex flex-col items-center justify-center p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-gray-400 text-lg font-semibold tracking-wider uppercase mb-2">Photo coming soon</span>
            <span className="text-gray-500 text-sm">
              {selectedPhoto === "shop-front" ? "Our shop on W Ball Rd" : "Our team at work"}
            </span>
          </div>
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-500 leading-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
