import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Footer from "./components/footer/footer.tsx";

// Sätt temat innan första render så att alla sidor (även inloggningen) följer det
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#f8f9fb] text-[#16242C] dark:bg-[#111C22] dark:text-[#C7CED1]">
        <App />
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
