import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter basename="/">
    <App />
  </HashRouter>
);
