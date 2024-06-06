import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./components/auth/AuthContext.tsx";
import { QuizProvider } from "./components/quiz/QuizContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter
    // basename={import.meta.env.VITE_GITHUB_PAGES === "true" ? "/FoxEd/" : "/"}
    >
      <QuizProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QuizProvider>
    </BrowserRouter>
  </HelmetProvider>
);
