import { X } from "lucide-react";

interface EmergencyBannerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function EmergencyBanner({ isOpen, setIsOpen }: EmergencyBannerProps) {
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    sessionStorage.setItem("emergency-banner-closed", "true");
  };

  return (
    <a
      href="tel:7148264444"
      className="fixed bottom-16 left-0 right-0 z-50 bg-red-600 hover:bg-red-700 text-white font-bold text-center py-3 text-sm md:fixed md:top-0 md:bottom-auto md:py-2.5 block transition-colors duration-300"
    >
      <span className="flex items-center justify-center gap-1.5 px-8">
        🛠️ Need Auto Repair or Muffler Care? Call Now: (714) 826-4444
      </span>
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        aria-label="Dismiss banner"
      >
        <X className="size-4" />
      </button>
    </a>
  );
}
