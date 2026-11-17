import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App, VARIANTE } from "./app.tsx";
import "../styles.css";
import "./pseudo.css";

createRoot(document.getElementById("root")!).render(<StrictMode><App/></StrictMode>);
document.title = `Pseudonymisierer ${VARIANTE}`;

// Installierbar und offline (gleicher Offline-Vorrat wie der Datei-Organizer, sw.js im selben Ordner). Nicht in der Pro-App.
const nativ = !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
if (!nativ && "serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  addEventListener("load", () => { navigator.serviceWorker.register("./sw.js").catch(() => { /* ohne Vorrat weiter */ }); });
}
