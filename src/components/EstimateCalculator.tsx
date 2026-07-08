import { useState } from "react";
import { useEstimate } from "../context/EstimateContext";
import { ScrollReveal } from "./ScrollReveal";

interface Question {
  id: string;
  text: string;
  options: string[];
}

const quizConfig: Record<string, Question[]> = {
  "Panel Upgrades": [
    {
      id: "panelSize",
      text: "What's your current panel size?",
      options: ["100A", "150A", "200A+", "Not sure"],
    },
    {
      id: "relocation",
      text: "Does the panel need to be relocated?",
      options: ["Yes", "No"],
    },
  ],
  "EV Charger Installation": [
    {
      id: "chargerLevel",
      text: "Charger level?",
      options: ["Level 1 (120V)", "Level 2 (240V)"],
    },
    {
      id: "distance",
      text: "Distance from panel to install location?",
      options: ["Under 25 ft", "25–50 ft", "50+ ft"],
    },
  ],
  "Residential Wiring": [
    {
      id: "workType",
      text: "What type of work?",
      options: ["New circuit/outlet", "Remodel wiring (1 room)", "Full home rewire"],
    },
    {
      id: "rooms",
      text: "How many rooms affected?",
      options: ["1–2", "3–5", "6+"],
    },
  ],
};

const serviceOptions = [
  "Panel Upgrades",
  "EV Charger Installation",
  "Residential Wiring",
  "Commercial Electrical",
  "Lighting Installation",
  "Outlet & Switch Repair",
  "Emergency Repairs",
  "Ceiling Fan Installation",
  "Solar Electrical",
  "Security Lighting",
  "Low Voltage",
  "Troubleshooting",
  "Generator Installations",
  "Temporary Power Connections",
];

const instantResultServices = [
  "Commercial Electrical",
  "Solar Electrical",
  "Lighting Installation",
  "Outlet & Switch Repair",
  "Emergency Repairs",
  "Ceiling Fan Installation",
  "Security Lighting",
  "Low Voltage",
  "Troubleshooting",
  "Generator Installations",
  "Temporary Power Connections",
];

export function EstimateCalculator() {
  const [activeChoice, setActiveChoice] = useState<string>("Panel Upgrades");
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { setSelectedService } = useEstimate();

  const handleServiceSelect = (serviceName: string) => {
    setActiveChoice(serviceName);
    setStep(0);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId: string, option: string) => {
    const nextAnswers = { ...answers, [questionId]: option };
    setAnswers(nextAnswers);

    if (activeChoice === "Residential Wiring" && questionId === "workType" && option !== "Remodel wiring (1 room)") {
      // Skip Question 2 for New circuit/outlet or Full home rewire and go straight to Results (step 2)
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (activeChoice === "Residential Wiring" && step === 2 && answers["workType"] !== "Remodel wiring (1 room)") {
      // Go back to step 0 (Question 1) if Question 2 was skipped
      setStep(0);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateRange = (): { low: number; high: number } | string => {
    if (activeChoice === "Commercial Electrical" || activeChoice === "Solar Electrical") {
      return "Custom Quote";
    }

    if (activeChoice === "Lighting Installation") {
      return { low: 150, high: 600 };
    }
    if (activeChoice === "Outlet & Switch Repair") {
      return { low: 100, high: 350 };
    }
    if (activeChoice === "Emergency Repairs") {
      return { low: 200, high: 600 };
    }
    if (activeChoice === "Ceiling Fan Installation") {
      return { low: 150, high: 400 };
    }
    if (activeChoice === "Security Lighting") {
      return { low: 200, high: 600 };
    }
    if (activeChoice === "Low Voltage") {
      return { low: 200, high: 800 };
    }
    if (activeChoice === "Troubleshooting") {
      return { low: 150, high: 450 };
    }
    if (activeChoice === "Generator Installations") {
      return { low: 3000, high: 8000 };
    }
    if (activeChoice === "Temporary Power Connections") {
      return { low: 500, high: 1500 };
    }

    if (activeChoice === "Panel Upgrades") {
      let low = 1500;
      let high = 3500;
      if (answers["panelSize"] === "200A+") {
        low += 300;
        high += 300;
      }
      if (answers["relocation"] === "Yes") {
        low += 500;
        high += 800;
      }
      return { low, high };
    }

    if (activeChoice === "EV Charger Installation") {
      let low = 800;
      let high = 1800;
      if (answers["chargerLevel"] === "Level 1 (120V)") {
        low = 500;
        high = 1000;
      }
      if (answers["distance"] === "25–50 ft") {
        low += 100;
        high += 200;
      } else if (answers["distance"] === "50+ ft") {
        low += 300;
        high += 500;
      }
      return { low, high };
    }

    if (activeChoice === "Residential Wiring") {
      const workType = answers["workType"];
      if (workType === "New circuit/outlet") {
        return { low: 500, high: 1000 };
      }
      if (workType === "Full home rewire") {
        return { low: 3000, high: 8000 };
      }
      if (workType === "Remodel wiring (1 room)") {
        let low = 1000;
        let high = 2000;
        const rooms = answers["rooms"];
        if (rooms === "3–5") {
          low += 500;
          high += 500;
        } else if (rooms === "6+") {
          low += 1000;
          high += 1000;
        }
        return { low, high };
      }
    }

    return { low: 0, high: 0 };
  };

  const handleCTA = () => {
    setSelectedService(activeChoice);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const questions = quizConfig[activeChoice] || [];
  const currentQuestion = questions[step];
  const isResult = instantResultServices.includes(activeChoice) || step >= 2;

  const range = calculateRange();
  const formattedPrice = typeof range === "string"
    ? range
    : `$${range.low.toLocaleString()}–$${range.high.toLocaleString()}`;

  return (
    <section id="estimate-calculator" className="bg-gray-50 dark:bg-gray-950 py-24 sm:py-32 border-b border-gray-200 dark:border-white/5">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold text-orange-400">Estimate</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Get an Instant Estimate
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Pick your project type to see a typical price range.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            {/* Service Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {serviceOptions.map((serviceName) => {
                const isSelected = activeChoice === serviceName;
                return (
                  <button
                    key={serviceName}
                    type="button"
                    onClick={() => handleServiceSelect(serviceName)}
                    className={`rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 ring-1 ${
                      isSelected
                        ? "bg-orange-500 text-white ring-orange-500 shadow-md"
                        : "bg-white dark:bg-white/5 ring-gray-200 dark:ring-white/10 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                    }`}
                  >
                    <span className="font-semibold text-sm block leading-tight">{serviceName}</span>
                  </button>
                );
              })}
            </div>

            {/* Question / Result Container */}
            {!isResult && currentQuestion ? (
              <div className="mt-12 rounded-3xl bg-white dark:bg-white/5 p-8 ring-1 ring-gray-200 dark:ring-white/10 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-sm font-semibold text-orange-400 hover:text-orange-500 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    Question {step + 1} of {activeChoice === "Residential Wiring" && answers["workType"] && answers["workType"] !== "Remodel wiring (1 room)" ? 1 : 2}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {currentQuestion.text}
                </h3>
                
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                      className="rounded-xl bg-gray-50 dark:bg-white/5 p-4 text-center cursor-pointer font-medium text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 ease-in-out hover:scale-102 active:scale-98"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-12 rounded-3xl bg-white dark:bg-white/5 p-8 text-center ring-1 ring-gray-200 dark:ring-white/10 max-w-2xl mx-auto">
                {!instantResultServices.includes(activeChoice) && (
                  <div className="text-left mb-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-sm font-semibold text-orange-400 hover:text-orange-500 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                <span className="text-sm font-semibold uppercase tracking-wider text-orange-400 block mb-2">Estimated Range</span>
                <p className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
                  {formattedPrice}
                </p>
                
                {activeChoice === "Commercial Electrical" && (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Commercial projects vary too much for instant pricing. Schedule a free walkthrough for an accurate quote.
                  </p>
                )}
                {activeChoice === "Solar Electrical" && (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Solar electrical work is priced based on system size and panel coordination — schedule a free consultation for exact pricing.
                  </p>
                )}
                {activeChoice !== "Commercial Electrical" && activeChoice !== "Solar Electrical" && (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    This is a typical range — final price depends on scope. Get a free in-person quote for exact pricing.
                  </p>
                )}
                
                <div className="mt-8">
                  <button
                    onClick={handleCTA}
                    className="inline-flex rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Get My Free Quote →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
