import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import { APP_NAME, istNativ } from "./nativ.ts";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<StrictMode><App/></StrictMode>);

document.title = APP_NAME;

// Installierbar und offline nutzbar (nur über https bzw. localhost). Nicht in der App (Datei-Organizer Pro): dort lädt alles aus
// dem App-Paket (https://localhost), sw.js liegt gar nicht im Paket (tools/native/prepare-web.mjs).
if (!istNativ() && "serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => { navigator.serviceWorker.register("./sw.js").catch(() => { /* ohne Vorrat weiter */ }); });
}
