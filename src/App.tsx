import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrustBar } from "./components/TrustBar";
import { WhyChooseUs } from "./components/WhyChooseUs";


import { PhotoGallery } from "./components/PhotoGallery";
import { AboutSection } from "./components/AboutSection";
import { ServiceAreaMap } from "./components/ServiceAreaMap";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { MobileCallBar } from "./components/MobileCallBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { EmergencyBanner } from "./components/EmergencyBanner";
import { ScrollReveal } from "./components/ScrollReveal";
import { ServicePanels } from "./components/ServicePanels";
import "./styles/images.css";
import "./styles/panels.css";

export default function App() {
  const [bannerOpen, setBannerOpen] = useState(() => {
    return sessionStorage.getItem("emergency-banner-closed") !== "true";
  });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <EmergencyBanner isOpen={bannerOpen} setIsOpen={setBannerOpen} />
      <div className={`min-h-screen ${bannerOpen ? "pb-28" : "pb-16"} md:pb-0 transition-all duration-300 ${bannerOpen ? "md:pt-10" : ""}`}>
        <Navbar bannerOpen={bannerOpen} />
        <HeroSection />
        <TrustBar />
        
        <WhyChooseUs />
        

        <ServicePanels />
        
        <PhotoGallery />
        <AboutSection />
        <ServiceAreaMap />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        
        <Footer />
        <ScrollToTop />
        <MobileCallBar />
      </div>
    </>
  );
}
