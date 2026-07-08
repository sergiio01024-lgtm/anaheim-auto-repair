import { createContext, useContext, useState } from "react";

interface EstimateContextType {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
}

const EstimateContext = createContext<EstimateContextType | undefined>(undefined);

export function EstimateProvider({ children }: { children: React.ReactNode }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <EstimateContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </EstimateContext.Provider>
  );
}

export function useEstimate() {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error("useEstimate must be used within an EstimateProvider");
  }
  return context;
}
