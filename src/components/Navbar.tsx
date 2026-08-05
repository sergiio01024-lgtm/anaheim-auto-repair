import { useState, useEffect, useRef } from "react";
import { Wrench } from "lucide-react";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const isCTA = href === "#contact";
    trackEvent({
      type: "estimate_cta_click",
      label: isCTA ? "Request Estimate" : href.replace("#", ""),
    });

    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));

      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);

    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const links = [
    { label: "Services", href: "#services" },
    { label: "Reviews", href: "#reviews" },
    { label: "Our Shop", href: "#about" },
    { label: "Location", href: "#location" },
  ];

  const isOwnerPreview =
    (import.meta as any).env?.VITE_OWNER_PREVIEW === "true" ||
    (typeof window !== "undefined" && window.location.hostname.includes("preview"));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {isOwnerPreview && (
        <div className="bg-[#C8202F] text-white text-xs font-semibold py-2 px-4 text-center border-b border-white/20">
          🔒 Private website preview — business details pending owner confirmation.
        </div>
      )}
      <nav
        className={`transition-all duration-300 px-6 py-3.5 lg:px-8 border-b ${scrolled
            ? "bg-[#101214] shadow-lg shadow-black/20 border-white/10"
            : "bg-[#101214]/98 backdrop-blur-md shadow-md border-white/5"
          }`}
        aria-label="Global"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-3 group">
              <div className="size-9 bg-signal-red rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <Wrench className="size-5" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm md:text-[15px] font-bold tracking-tight leading-none text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  {businessConfig.name.short}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-medium tracking-[0.15em] leading-none mt-1 text-slate-400 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-red transition-colors"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:gap-x-7 lg:items-center">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[13px] font-medium text-slate-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-red rounded px-1 tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-5 lg:items-center">
            <a
              href={businessConfig.phone.link}
              onClick={() =>
                trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
              }
              className="text-[13px] font-semibold text-slate-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-red rounded px-1"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {businessConfig.phone.display}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="rounded-lg bg-signal-red hover:bg-signal-red-hover px-5 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-red"
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
          className="fixed inset-0 z-50 px-6 py-6 flex flex-col justify-between shadow-2xl"
          style={{ backgroundColor: 'var(--garage-900)' }}
        >
          <div>
            <div className="flex items-center justify-between">
              <a href="/" onClick={handleLogoClick} className="flex items-center gap-3">
                <div className="size-9 bg-signal-red rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Wrench className="size-5" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-bold tracking-tight leading-none text-white uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                    {businessConfig.name.short}
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.15em] leading-none mt-1 text-slate-400 uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                    {businessConfig.name.tagline}
                  </span>
                </div>
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  triggerRef.current?.focus();
                }}
                className="-m-2.5 rounded-md p-2.5 text-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-red transition-colors"
                aria-label="Close menu"
              >
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-10 flow-root">
              <div className="space-y-1 py-6">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block rounded-lg px-4 py-3.5 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-all focus-visible:outline-2 focus-visible:outline-signal-red tracking-wide"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 pb-4 flex flex-col gap-3">
            <a
              href={businessConfig.phone.link}
              onClick={() =>
                trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
              }
              className="block rounded-lg border border-steel-600 px-4 py-3.5 text-center text-base font-semibold text-white hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-signal-red"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Call {businessConfig.phone.display}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="block rounded-lg bg-signal-red hover:bg-signal-red-hover px-4 py-3.5 text-center text-base font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-red"
            >
              Request Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
