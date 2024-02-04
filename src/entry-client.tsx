import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";

// const container = document.getElementById("root");
// if (container) {
//   hydrateRoot(container, <App />);
// }

ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
