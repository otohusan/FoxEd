import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

const container = document.getElementById("root");
if (container) {
  hydrateRoot(
    container,
    <HelmetProvider>
      <BrowserRouter>
        <App />
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
