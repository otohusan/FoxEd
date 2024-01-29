import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter
    basename={import.meta.env.VITE_GITHUB_PAGES === "true" ? "/FoxEd/" : "/"}
  >
    <App />
  </BrowserRouter>
);
