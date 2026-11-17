import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Reine Browser-App wie die Familienakte: keine Serverfunktionen, relative Pfade.
// Quelle in src/, gebaut nach app/ (wird mitgeliefert, damit GitHub Pages sie ohne eigenen Bauschritt zeigt).
// Zwei Seiten: der Datei-Organizer (index.html) und der Pseudonymisierer (pseudonymisierer.html, Klaus 14.11.2026).
export default defineConfig({
  root: fileURLToPath(new URL("./src", import.meta.url)),
  base: "./",
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("./app", import.meta.url)), emptyOutDir: true, chunkSizeWarningLimit: 1500,
    rollupOptions: { input: { index: fileURLToPath(new URL("./src/index.html", import.meta.url)), pseudonymisierer: fileURLToPath(new URL("./src/pseudonymisierer.html", import.meta.url)) } },
  },
  server: { port: 5174 },
});
