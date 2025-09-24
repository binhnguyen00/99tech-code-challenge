import "./index.css"
import { createRoot } from "react-dom/client"
import type { Root } from "react-dom/client"

import { App } from "./Application";

const container: HTMLElement | null = document.getElementById("root");
if (container) {
  const root: Root = createRoot(container);
  root.render(
    <App />
  );
} else {
  throw Error("Root element not found");
}