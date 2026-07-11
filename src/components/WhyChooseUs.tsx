import { ScrollReveal } from "./ScrollReveal";
import { businessConfig } from "../config/business";

export function WhyChooseUs() {
  const differentiators = [
    {
      title: `${businessConfig.yearsInBusiness}+ Years of Local Trust`,
      description: `Family-owned and serving Anaheim from the same W Ball Rd location since ${businessConfig.established}. We stand behind every repair.`,
      icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    },
    {
      title: "Honest Diagnostics & No Upsells",
      description:
        "We explain what needs immediate fixing and what can wait. We never push unnecessary parts or upsell services.",
      icon: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
    },
    {
      title: "Reliable Quotes Over the Phone",
      description: `Speak directly with our manager ${businessConfig.staff.manager} for a transparent ballpark quote. The price we quote is the price you pay.`,
      icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
  ];

  return (
    <section className="bg-white py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
              The Standard Every Job Is Held To
            </h2>
            <p className="mt-4 text-base text-zinc-600 font-medium">
              We know you have choices in Orange County. Here is how we build long-term
              relationships with our clients.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentiators.map((diff, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shrink-0 shadow-sm">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                        className="size-5"
                      >
                        <path d={diff.icon} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900">{diff.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed font-semibold">
                    {diff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
