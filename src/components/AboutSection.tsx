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
              <h2 className="text-base font-semibold text-orange-400">About LTE Electric</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Meet Luke, Founder of LTE Electric
              </p>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                With <strong className="text-white">16 years of experience</strong> in the electrical field, Luke brings a high level of technical mastery to every project. His commitment to safety and precision is the foundation of everything LTE Electric does.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Before establishing LTE Electric in <strong className="text-white">2018</strong>, Luke built his expertise working on large-scale <strong className="text-white">Union commercial projects</strong>. That background ensures every residential repair or commercial upgrade meets the highest quality benchmarks.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                When Luke shows up to your job, you're getting the owner — not a subcontractor. Every project gets his direct attention from start to finish.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Years Experience</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">16+</dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Founded</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">2018</dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Yelp Rating</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">5.0 ★</dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">BuildZoom</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Top 3%</dd>
                </div>
              </dl>
            </div>
            <div className="mt-12 lg:mt-0 flex flex-col gap-4">
              <div className="img-frame ratio-3-2 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl">
                <div onClick={() => setSelectedPhoto("/photos/luke-van-thumbsup.webp")} className="cursor-pointer size-full">
                  <img
                    src="/photos/luke-van-thumbsup.webp"
                    alt="LTE Electric owner Luke in front of the company van"
                    loading="lazy"
                    decoding="async"
                    className="img-cover"
                  />
                </div>
              </div>
              <div className="img-frame ratio-1-1 ring-1 ring-gray-200 dark:ring-white/10 rounded-2xl">
                <div onClick={() => setSelectedPhoto("/photos/luke-panel-framing-jobsite.jpg")} className="cursor-pointer size-full">
                  <img
                    src="/photos/luke-panel-framing-jobsite.jpg"
                    alt="LTE Electric owner Luke working at a commercial framing job site"
                    loading="lazy"
                    decoding="async"
                    className="img-cover"
                  />
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
          <img
            src={selectedPhoto}
            loading="lazy"
            decoding="async"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-orange-400 leading-none transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}