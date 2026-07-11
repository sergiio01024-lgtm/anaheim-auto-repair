import { X } from "lucide-react";
import { businessConfig } from "../config/business";

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
    <div className="fixed bottom-16 left-0 right-0 z-50 bg-red-600 text-white font-bold text-center py-3 text-sm md:fixed md:top-0 md:bottom-auto md:py-2.5 block transition-colors duration-300">
      <a
        href={businessConfig.phone.link}
        className="inline-flex items-center justify-center gap-1.5 px-8 hover:underline"
      >
        🛠️ Need Auto Repair or Muffler Care? Call Now: {businessConfig.phone.display}
      </a>
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
