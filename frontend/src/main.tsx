import * as ReactDOMClient from "react-dom/client";
import Login from "./components/login-form";
import "./index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);