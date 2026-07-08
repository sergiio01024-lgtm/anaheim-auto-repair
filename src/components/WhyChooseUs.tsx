import { ScrollReveal } from "./ScrollReveal";

const reasons = [
  {
    title: "Always Licensed & Permitted",
    description: "We pull permits on every job that requires one — protecting you legally and ensuring all work passes inspection. CA C-10 License #1072569.",
    icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  },
  {
    title: "Union-Trained Craftsmanship",
    description: "Luke spent years on large-scale Union commercial projects before founding LTE Electric. That level of precision comes standard on every residential or commercial job.",
    icon: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
  },
  {
    title: "Direct Communication",
    description: "You'll talk to Luke, not a call center. We get back to every quote request and work with you to schedule. For emergencies, just give us a call.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Transparent, Upfront Pricing",
    description: "No surprise charges. We give you a clear written quote before any work begins. What we quote is what you pay — no hidden fees, no upsells.",
    icon: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z",
  },
  {
    title: "$2M Fully Insured & Bonded",
    description: "LTE Electric carries $2,000,000 in general liability insurance and $25,000 in bonding. You're fully protected on every job, no exceptions.",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
  },
  {
    title: "5-Star Rated on Yelp",
    description: "13 verified 5-star reviews from real San Diego homeowners and businesses. We don't just do good work — our customers consistently tell others about it.",
    icon: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.499Z",
  },
];

export function WhyChooseUs() {
  return (
    <div className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-red-400">Why LTE Electric</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-balance">
              The Standard Every Job Is Held To
            </p>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              There's no shortage of electricians in San Diego. Here's why homeowners and businesses keep calling Luke.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {reasons.map((reason) => (
                <div key={reason.title} className="relative pl-16">
                  <dt className="text-base font-semibold text-gray-900 dark:text-white">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-red-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6 text-white">
                        <path d={reason.icon} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {reason.title}
                  </dt>
                  <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">{reason.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
