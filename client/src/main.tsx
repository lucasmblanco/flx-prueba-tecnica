import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import "@ant-design/v5-patch-for-react-19";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
