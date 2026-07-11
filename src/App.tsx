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

import pagesContent from "./data/pagesContent.json";

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
      case "/catalytic-converter-anaheim":
      case "/brake-repair-anaheim":
      case "/engine-repair-anaheim":
      case "/transmission-repair-anaheim":
      case "/auto-maintenance-anaheim": {
        const key = route.substring(1) as keyof typeof pagesContent;
        const page = pagesContent[key];
        return (
          <ServicePage
            path={route}
            title={page.heading}
            description={page.description}
            longDescription={page.longDescription}
            symptoms={page.symptoms}
            process={page.process}
            related={page.related}
            faq={page.faq}
          />
        );
      }
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
        <main id="main-content">
          {renderRoute()}
        </main>
        <Footer />
        <ScrollToTop />
        <MobileCallBar />
      </div>
    </>
  );
}
