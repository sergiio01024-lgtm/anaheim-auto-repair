import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Wrench } from "lucide-react";



export function Navbar({ bannerOpen = false }: { bannerOpen?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed inset-x-0 z-50 transition-all duration-300 border-b ${
      bannerOpen ? "top-0 md:top-10" : "top-0"
    } ${
      scrolled 
        ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-gray-200 dark:border-white/10" 
        : "bg-transparent border-transparent"
    }`}>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="-m-1.5 p-1.5 flex items-center gap-3"
          >
            <div className="size-9 bg-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <Wrench className="size-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm md:text-base font-extrabold tracking-tight leading-none text-[#1A1A1A] dark:text-white uppercase">
                Anaheim Auto Repair
              </span>
              <span className="hidden sm:inline-block text-[9px] md:text-[10px] font-bold tracking-widest leading-none mt-1 text-[#CC0000] dark:text-red-400 uppercase">
                & Muffler Care
              </span>
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 text-gray-600 dark:text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-semibold hover:text-red-600 dark:hover:text-red-400 transition-colors text-gray-900 dark:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <ThemeToggle />
          <a href="tel:7148264444" className="text-sm font-semibold transition-colors duration-300 text-gray-700 dark:text-white/70 hover:text-red-600 dark:hover:text-red-400">
            (714) 826-4444
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-md bg-red-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            Free Quote
          </a>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 px-6 py-6">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="-m-1.5 p-1.5 flex items-center gap-3"
            >
              <div className="size-9 bg-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Wrench className="size-5" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-extrabold tracking-tight leading-none text-gray-900 dark:text-white uppercase">
                  Anaheim Auto Repair
                </span>
                <span className="text-[9px] font-bold tracking-widest leading-none mt-1 text-[#CC0000] dark:text-red-400 uppercase">
                  & Muffler Care
                </span>
              </div>
            </a>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button onClick={() => setMobileOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-600 dark:text-gray-400 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                <span className="sr-only">Close menu</span>
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200 dark:divide-white/10">
              <div className="space-y-2 py-6">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-100 hover:text-red-600 dark:hover:bg-white/5 dark:hover:text-red-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-3">
                <a href="tel:7148264444" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 dark:text-white hover:bg-gray-100 hover:text-red-600 dark:hover:bg-white/5 dark:hover:text-red-400">
                  Call (714) 826-4444
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    document.querySelector("#contact")?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
