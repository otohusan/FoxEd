import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./components/auth/AuthContext.tsx";
import { QuizProvider } from "./components/quiz/QuizContext.tsx";
import { ColorModeProvider } from "./components/colorMode/ColorModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <BrowserRouter
    // basename={import.meta.env.VITE_GITHUB_PAGES === "true" ? "/FoxEd/" : "/"}
    >
      <QuizProvider>
        <AuthProvider>
          <ColorModeProvider>
            <App />
          </ColorModeProvider>
        </AuthProvider>
      </QuizProvider>
    </BrowserRouter>
  </HelmetProvider>
);
