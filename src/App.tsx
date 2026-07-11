import { useEffect } from "react";
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
import "./styles/images.css";
import "./styles/panels.css";

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

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
        <main id="main-content">
          <HeroSection />
          <TrustBar />
          <WhyChooseUs />
          <ServicePanels />
          <AboutSection />
          <ServiceAreaMap />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
        <MobileCallBar />
      </div>
    </>
  );
}
