
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { EstimateProvider } from "./context/EstimateContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <EstimateProvider>
      <App />
    </EstimateProvider>
  </ThemeProvider>
);
