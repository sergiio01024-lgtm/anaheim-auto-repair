import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrustBar } from "./components/TrustBar";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { AboutSection } from "./components/AboutSection";
import { ServiceAreaMap } from "./components/ServiceAreaMap";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { MobileCallBar } from "./components/MobileCallBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { ServicePanels } from "./components/ServicePanels";
import { ServicePage } from "./components/ServicePage";
import { PrivacyPage } from "./components/PrivacyPage";
import { ContactPage } from "./components/ContactPage";

import "./styles/images.css";
import "./styles/panels.css";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simple route parser that normalizes trailing slashes and .html extensions
  const getNormalizedPath = (path: string) => {
    const clean = path.replace(/\.html$/, "").replace(/\/$/, "");
    return clean || "/";
  };

  const route = getNormalizedPath(currentPath);

  // Render the appropriate route view
  const renderRoute = () => {
    switch (route) {
      case "/muffler-repair-anaheim":
        return (
          <ServicePage
            path="/muffler-repair-anaheim"
            title="Muffler & Exhaust Repair"
            description="Muffler replacements, exhaust manifold leaks, custom pipe bending, and tailpipe repair."
            longDescription="For over 45 years, we have been the premier muffler shop in Anaheim. A well-maintained exhaust system is crucial for safety, engine efficiency, and sound control. We carry top brands and custom bend exhaust pipes on-site to ensure a perfect fit."
            symptoms={[
              "Loud rumbling engine noises",
              "Rattling under the floorboards",
              "Decreased gas mileage",
              "Smell of raw exhaust fumes",
            ]}
            process={[
              "Visual check of the entire exhaust line for holes, rust, and breaks",
              "Upfront estimate provided directly by Carson",
              "Replacement of damaged hangers, mufflers, or pipe segments using CARB-compliant components",
              "Post-repair check for leaks and sound test",
            ]}
            related={[
              "Catalytic Converter Replacement",
              "O2 Sensor Replacement",
              "Exhaust Manifold Gaskets",
              "Custom Tailpipes",
            ]}
            faq={[
              {
                q: "How long does a muffler replacement take?",
                a: "Most standard muffler replacements can be completed in 1 to 2 hours.",
              },
              {
                q: "Do you offer custom exhaust work?",
                a: "Yes. We custom-bend pipes in our shop to fit classic cars, custom trucks, and standard passenger vehicles.",
              },
            ]}
          />
        );
      case "/catalytic-converter-anaheim":
        return (
          <ServicePage
            path="/catalytic-converter-anaheim"
            title="Catalytic Converter Replacement"
            description="CARB-compliant catalytic converter replacements, anti-theft security shields, and smog diagnostics."
            longDescription="We are Yelp-verified specialists for catalytic converter work in Orange County. We ensure every catalytic converter installed meets California's strict CARB emissions standards and can successfully pass smog inspections."
            symptoms={[
              "Failing a California smog check",
              "Check engine light codes P0420 or P0430",
              "Sulphur or 'rotten egg' smell from exhaust",
              "Loss of engine power or acceleration hesitations",
            ]}
            process={[
              "Emissions trouble code analysis and visual catalyst inspection",
              "Engine group identification to match certified CARB part numbers",
              "Clean weld-in installation of the certified catalytic converter",
              "Resetting engine monitors and verification drive cycle",
            ]}
            related={[
              "Anti-Theft Shield Installation",
              "O2 Sensor Replacement",
              "Exhaust Pipe Rebuilding",
              "Smog Failure Diagnostics",
            ]}
            faq={[
              {
                q: "Can I use an aftermarket catalytic converter in California?",
                a: "Only CARB-approved aftermarket catalytic converters are legal. We only install compliant CARB-certified units.",
              },
              {
                q: "How do you protect catalytic converters from theft?",
                a: "We fit heavy-duty steel or aluminum security plates (shields) over the converter to block access for thieves.",
              },
            ]}
          />
        );
      case "/brake-repair-anaheim":
        return (
          <ServicePage
            path="/brake-repair-anaheim"
            title="Brakes & Suspension Service"
            description="Disc and drum brake repair, shock absorbers, struts, steering links, and handling diagnostics."
            longDescription="Our brake and suspension services keep your vehicle stopping quickly and riding smoothly. We inspect brake linings, calipers, master cylinders, and replace worn suspension components to restore responsive handling."
            symptoms={[
              "Squealing or grinding noises when braking",
              "Brake pedal feels soft, spongy, or goes to the floor",
              "Steering wheel shakes or pulls when braking",
              "Vehicle bounces excessively over bumps or sways in turns",
            ]}
            process={[
              "Multi-point inspection of brake pads, rotors, hoses, and fluid levels",
              "Visual and push check of shock absorbers and steering linkage",
              "Component replacement with premium ceramic pads or heavy-duty struts",
              "Final road test to ensure stopping power and handling alignment",
            ]}
            related={[
              "Rotor Resurfacing & Replacement",
              "Shock & Strut Replacement",
              "CV Axle & Boot Repair",
              "Tie Rods & Ball Joints",
            ]}
            faq={[
              {
                q: "How often should I change my brake pads?",
                a: "Typically every 30,000 to 70,000 miles, depending on driving habits and brake material.",
              },
              {
                q: "What causes a spongy brake pedal?",
                a: "Usually air in the brake lines, a fluid leak, or a failing master cylinder. This requires immediate diagnostic inspection.",
              },
            ]}
          />
        );
      case "/engine-repair-anaheim":
        return (
          <ServicePage
            path="/engine-repair-anaheim"
            title="Engine Diagnostics & Repair"
            description="Computer OBD-II diagnostics, spark plugs, timing belts, cooling systems, and mechanical engine repairs."
            longDescription="Our mechanics use advanced diagnostics to decode engine warning lights and troubleshoot mechanical engine faults. We pinpoint issues accurately so we only replace what is necessary."
            symptoms={[
              "Check Engine or Service Soon light is on",
              "Engine running rough, misfiring, or shaking",
              "Overheating or steam coming from the hood",
              "Leaks of oil or green/orange coolant under the engine",
            ]}
            process={[
              "Electronic diagnostic scan to retrieve error codes",
              "Manual verification of sensors, wiring, and vacuum lines",
              "Clear explanation of immediate vs. deferrable repairs",
              "Component repair and resetting of the onboard system monitors",
            ]}
            related={[
              "Spark Plug & Ignition Coil Kits",
              "Timing Belts & Water Pumps",
              "Valve Cover Gasket Leak Repair",
              "Radiators & Thermostats",
            ]}
            faq={[
              {
                q: "Is it safe to drive with the Check Engine light on?",
                a: "If the light is steady, you should schedule a diagnostic scan soon. If the light is flashing, pull over immediately to prevent severe engine damage.",
              },
              {
                q: "How often should timing belts be replaced?",
                a: "Usually between 60,000 and 100,000 miles to prevent timing belt breaks that cause severe engine damage.",
              },
            ]}
          />
        );
      case "/transmission-repair-anaheim":
        return (
          <ServicePage
            path="/transmission-repair-anaheim"
            title="Transmission Service & Repair"
            description="Manual and automatic transmission fluid changes, clutch replacement, and shifting diagnostics."
            longDescription="Avoid costly transmission rebuilds with routine fluid maintenance and expert diagnostics. We flush fluid, replace filters, check solenoids, and repair manual clutches."
            symptoms={[
              "Delayed or slipping gear shifting",
              "Grinding or shuddering when shifting",
              "Transmission fluid leaking (reddish fluid)",
              "Transmission temperature warning light is on",
            ]}
            process={[
              "Transmission fluid level and quality check",
              "Scanning TCM for gear ratio and solenoid faults",
              "Transmission fluid drain and fill, or filter exchange",
              "Linkage and clutch adjustment or replacement",
            ]}
            related={[
              "Transmission Fluid Flush",
              "Clutch Replacement Kits",
              "Differential Fluid Check",
              "Transmission Solenoids",
            ]}
            faq={[
              {
                q: "How often does transmission fluid need servicing?",
                a: "Typically every 30,000 to 60,000 miles for automatic transmissions to prevent fluid breakdown and slipping.",
              },
              {
                q: "What does transmission slipping feel like?",
                a: "The engine revs up high when you accelerate, but the car hesitates or is slow to shift and gain speed.",
              },
            ]}
          />
        );
      case "/auto-maintenance-anaheim":
        return (
          <ServicePage
            path="/auto-maintenance-anaheim"
            title="Routine Maintenance & Oil Changes"
            description="Full synthetic and conventional oil changes, fluid flushes, filters, and scheduled mileage checkups."
            longDescription="Preventative maintenance keeps your vehicle reliable and prolongs engine life. We perform rapid oil changes, fluid flushes, filter changes, and complete log-book inspections."
            symptoms={[
              "'Oil Change Due' or service light is on",
              "Dark, dirty oil on the engine dipstick",
              "Squeaking belts or cracked radiator hoses",
              "Weak starts due to aging battery",
            ]}
            process={[
              "Engine oil and filter change with premium brand products",
              "Multi-point visual inspection of fluids, belts, hoses, and tire pressures",
              "Air and cabin filter inspection",
              "Resetting of the dashboard service interval light",
            ]}
            related={[
              "Conventional & Synthetic Oil Changes",
              "Battery Diagnostics & Replacement",
              "Cooling System Fluid Flush",
              "Belt & Hose Replacements",
            ]}
            faq={[
              {
                q: "Do I need synthetic oil for my car?",
                a: "Many modern cars require synthetic oil. Check your owner's manual, or Carson can check it for you.",
              },
              {
                q: "How often should I change my air filters?",
                a: "Every 12,000 to 15,000 miles, more frequently if you drive on dusty or high-traffic Orange County roads.",
              },
            ]}
          />
        );
      case "/privacy":
        return <PrivacyPage />;
      case "/contact":
        return <ContactPage />;
      case "/":
      default:
        return (
          <>
            <HeroSection />
            <TrustBar />
            <WhyChooseUs />
            <ServicePanels />
            <AboutSection />
            <ServiceAreaMap />
            <TestimonialsSection />
            <FAQSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:border focus:border-gray-200 focus:shadow-md"
      >
        Skip to main content
      </a>
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        {renderRoute()}
        <Footer />
        <ScrollToTop />
        <MobileCallBar />
      </div>
    </>
  );
}
