import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter
      basename={import.meta.env.VITE_GITHUB_PAGES === "true" ? "/FoxEd/" : "/"}
    >
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
