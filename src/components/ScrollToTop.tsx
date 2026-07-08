import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollBottomTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility(); // Run check immediately in case the page is already scrolled

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTopClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (scrollTopTimeoutRef.current) {
      // Double click registered: scroll all the way to the top
      clearTimeout(scrollTopTimeoutRef.current);
      scrollTopTimeoutRef.current = null;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Single click: wait to see if it's a double click
      scrollTopTimeoutRef.current = setTimeout(() => {
        scrollTopTimeoutRef.current = null;
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      }, 250);
    }
  };

  const handleScrollBottomClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (scrollBottomTimeoutRef.current) {
      // Double click registered: scroll to the bottom
      clearTimeout(scrollBottomTimeoutRef.current);
      scrollBottomTimeoutRef.current = null;
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      // Single click: wait to see if it's a double click
      scrollBottomTimeoutRef.current = setTimeout(() => {
        scrollBottomTimeoutRef.current = null;
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }, 250);
    }
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTopTimeoutRef.current) {
        clearTimeout(scrollTopTimeoutRef.current);
      }
      if (scrollBottomTimeoutRef.current) {
        clearTimeout(scrollBottomTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Scroll to Bottom Button */}
      <button
        onClick={handleScrollBottomClick}
        className={`fixed z-40 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 size-10 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bottom-24 right-6 md:bottom-8 md:right-8`}
        aria-label="Scroll to bottom"
      >
        <ChevronDown className="size-6" />
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollTopClick}
        className={`fixed z-40 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-400 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 size-10 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bottom-36 right-6 md:bottom-20 md:right-8`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="size-6" />
      </button>
    </>
  );
}
