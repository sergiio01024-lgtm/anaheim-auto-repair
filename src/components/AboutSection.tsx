import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function AboutSection() {
  return (
    <div
      id="about"
      className="relative isolate overflow-hidden bg-white dark:bg-gray-950 py-24 sm:py-32"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <div>
              <h2 className="text-base font-semibold text-primary dark:text-red-400">
                About Our Shop
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Family-Owned & Trusted in Anaheim Since {businessConfig.established}
              </p>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                For over {businessConfig.yearsInBusiness} years, {businessConfig.name.full} has been
                the shop Anaheim drivers trust for honest work at a fair price. We work on all makes
                and models — from Honda, Toyota, and Ford to BMW, Mercedes, and Audi.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Muffler and exhaust work is our specialty, but our team handles everything from
                brakes and transmissions to engine diagnostics and routine maintenance. Our
                customers consistently tell us the same thing: we're{" "}
                <strong className="font-semibold text-gray-950 dark:text-white">
                  honest, fast, and we don't upsell you
                </strong>{" "}
                on work you don't need.
              </p>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                When you call, you get a real person — like our manager{" "}
                {businessConfig.staff.manager} — who will give you a straight quote over the phone
                and stand behind it when you come in. That's how we've kept customers coming back
                for three generations.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Years in Business</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {businessConfig.yearsInBusiness}+
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Established</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {businessConfig.established}
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Yelp Rating</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {businessConfig.rating.value} ★
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-gray-600 dark:text-gray-300">Yelp Reviews</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {businessConfig.rating.reviewsCount}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
