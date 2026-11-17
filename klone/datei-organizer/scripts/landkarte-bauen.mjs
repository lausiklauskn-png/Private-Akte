// Baut die Landkarte für die App aus der einen Quelle docs/landkarte/Landkarte-Organizer-Familienakte.html
// (dieselbe Seite wie das Artefakt). Die Quelle hat keinen eigenen HTML-Rahmen – hier kommt er dazu.
// Aufruf: node scripts/landkarte-bauen.mjs [--pruefen]   (--pruefen: Ausgang 1, wenn src/public/landkarte.html veraltet ist)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const W = fileURLToPath(new URL("..", import.meta.url));
const quelle = readFileSync(W + "docs/landkarte/Landkarte-Organizer-Familienakte.html", "utf8");
const seite = `<!doctype html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<!-- erzeugt von scripts/landkarte-bauen.mjs – nie von Hand ändern -->\n</head>\n<body>\n${quelle}\n</body>\n</html>\n`;
const ziel = W + "src/public/landkarte.html";
if (process.argv.includes("--pruefen")) {
  if (!existsSync(ziel) || readFileSync(ziel, "utf8") !== seite) { console.error("landkarte.html veraltet: node scripts/landkarte-bauen.mjs"); process.exit(1); }
  console.log("Landkarte aktuell");
} else { writeFileSync(ziel, seite); console.log("src/public/landkarte.html geschrieben"); }
