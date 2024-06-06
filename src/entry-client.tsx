import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { AuthProvider } from "./components/auth/AuthContext";
import { QuizProvider } from "./components/quiz/QuizContext";

const container = document.getElementById("root");
if (container) {
  hydrateRoot(
    container,
    <HelmetProvider>
      <BrowserRouter
        basename={
          import.meta.env.VITE_GITHUB_PAGES === "true" ? "/FoxEd/" : "/"
        }
      >
        <QuizProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QuizProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

// ReactDOM.hydrateRoot(
//   document.getElementById("root")!,

//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
