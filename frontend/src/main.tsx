import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
