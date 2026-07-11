import { useState, useEffect, useRef } from "react";
import { Wrench } from "lucide-react";
import { businessConfig } from "../config/business";

export function Navbar({ bannerOpen = false }: { bannerOpen?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close mobile menu and restore focus
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Focus the first element in the mobile menu on open
  useEffect(() => {
    if (mobileOpen && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        // Delay slightly to ensure render and prevent immediate triggers
        setTimeout(() => focusable[0].focus(), 50);
      }
    }
  }, [mobileOpen]);

  const handleTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };

  const links = [
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "About", href: "#about" },
    { label: "Location", href: "#location" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${
        bannerOpen ? "top-0 md:top-10" : "top-0"
      }`}
    >
      {/* 1. Utility Bar */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-2 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600 font-medium">
          <div className="flex items-center gap-4">
            <span>📍 {businessConfig.address.full}</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">
              🕒 {businessConfig.hours.summary}: {businessConfig.hours.weekdays} (Sat:{" "}
              {businessConfig.hours.saturday})
            </span>
          </div>
          <div>
            <a
              href={businessConfig.phone.link}
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              📞 Call Shop: {businessConfig.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 px-6 py-4 lg:px-8 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-zinc-200 shadow-sm"
            : "bg-white border-zinc-200"
        }`}
        aria-label="Global"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex lg:flex-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3"
            >
              <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Wrench className="size-5" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm md:text-base font-extrabold tracking-tight leading-none text-zinc-900 uppercase">
                  {businessConfig.name.short}
                </span>
                <span className="hidden sm:inline-block text-[9px] md:text-[10px] font-bold tracking-widest leading-none mt-1 text-primary uppercase">
                  {businessConfig.name.tagline}
                </span>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-600 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-semibold text-zinc-700 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded px-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
            <a
              href={businessConfig.phone.link}
              className="text-sm font-semibold text-zinc-700 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded px-1"
            >
              {businessConfig.phone.display}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-md bg-primary hover:bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Request Estimate
            </a>
          </div>
        </div>
      </nav>

      {/* Accessible Mobile Menu Dialog */}
      {mobileOpen && (
        <div
          ref={dialogRef}
          onKeyDown={handleTabKey}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-white px-6 py-6 flex flex-col justify-between shadow-2xl animate-fade-in"
        >
          <div>
            <div className="flex items-center justify-between">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-3"
              >
                <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Wrench className="size-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-extrabold tracking-tight leading-none text-zinc-900 uppercase">
                    {businessConfig.name.short}
                  </span>
                  <span className="text-[9px] font-bold tracking-widest leading-none mt-1 text-primary uppercase">
                    {businessConfig.name.tagline}
                  </span>
                </div>
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  triggerRef.current?.focus();
                }}
                className="-m-2.5 rounded-md p-2.5 text-zinc-600 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close menu"
              >
                <svg
                  className="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="space-y-4 py-6">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-800 hover:bg-zinc-50 hover:text-primary transition-all focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-6 pb-4 flex flex-col gap-3">
            <a
              href={businessConfig.phone.link}
              className="block rounded-md border border-zinc-300 px-4 py-3 text-center text-base font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              Call {businessConfig.phone.display}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block rounded-md bg-primary hover:bg-red-700 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              Request Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
