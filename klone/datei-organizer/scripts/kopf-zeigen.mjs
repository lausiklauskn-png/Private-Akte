// Zeigt den Text, den der Kern aus einer gesetzten Datei bekommt (Texterkennung wie in der App, aus dem Zwischenspeicher), die ersten N Zeilen.
// Nur zum Abstimmen an LERN-Mengen. Aufruf: node scripts/kopf-zeigen.mjs <datei.pdf|jpg> [N]
import { readFileSync } from "node:fs";
const leser = await import("./leser-node.mjs");
const [datei, n = "12"] = process.argv.slice(2);
const b = new Uint8Array(readFileSync(datei));
const t = /\.pdf$/i.test(datei) ? await leser.pdfLeser(true)(b) : await leser.ocr(b);
console.log((typeof t === "string" ? t : t.voll || t.kopf || "").split("\n").filter((z) => z.trim()).slice(0, Number(n)).map((z) => "  | " + z).join("\n"));
await leser.beenden();
