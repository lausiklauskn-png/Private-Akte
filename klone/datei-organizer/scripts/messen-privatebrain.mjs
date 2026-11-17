// Lauf „Vermieterin“: Kategorie-Vorschlag von Private Brain Pro (suggestCategory in index.html, unverändert herausgelesen) an den
// Schriftstücken. Private Brain kennt Dokumentarten (Rechnung, Vertrag, Angebot …), keine Ablagefächer; verglichen wird darum nur
// mit der Art des Solls, und nur für die drei Arten, die es in beiden Listen gibt. Aufruf: node scripts/messen-privatebrain.mjs <stapel> <textordner> [pb-repo]
import { readFileSync, existsSync } from "node:fs"; import { join, resolve } from "node:path"; import vm from "node:vm";
const S = resolve(process.argv[2]), T = resolve(process.argv[3]), PB = resolve(process.argv[4] || "../lausiklauskn-png/privat-brain-pro");
const html = readFileSync(join(PB, "index.html"), "utf8");
const stueck = (anfang, ende) => { const a = html.indexOf(anfang), b = html.indexOf(ende, a); if (a < 0 || b < 0) throw new Error("Stelle nicht gefunden: " + anfang); return html.slice(a, b); };
const ctx = {}; vm.createContext(ctx);
vm.runInContext([stueck("function extOf(name){", "\n"), stueck("function fold(s){", "\n}\n") + "\n}", stueck("const CATS = [", "function catIcon"), "this.suggestCategory = suggestCategory;"].join("\n"), ctx);
const lese = (p) => JSON.parse(readFileSync(p, "utf8"));
const q = [lese(join(S, "ERWARTUNG.json")), ...["ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(S, f))).map((f) => lese(join(S, f)))].map((d) => new Map(d.dateien.map((x) => [x.datei, x.schriftstueck])));
// --mitKern: Private Brain mit Vorschlag des Sortier-Kerns (kern-js/, nur Regeln, kein Wortmodell) wie in PB 1.0.49 eingebaut
const KERN = process.argv.includes("--mitKern") ? await import("../kern-js/erkennen.js") : null;
const PB_AUS_KERN = { Rechnung: "Rechnung", Vertrag: "Vertrag", "Kündigung": "Vertrag", "Angebot/Werbung": "Angebot" };
const vorschlag = (name, text) => { if (KERN && String(text || "").trim().length >= 200) { const a = KERN.erkenneSchriftstueck(String(text).slice(0, 1500)); if (a?.sicher) return PB_AUS_KERN[a.wert] || ctx.suggestCategory(name, "") ; } return ctx.suggestCategory(name, text); };
const GLEICH = { Rechnung: "Rechnung", Vertrag: "Vertrag", "Angebot/Werbung": "Angebot" }, z = { n: 0, ok: 0, andere: 0, falsch: 0, strittig: 0 }, verteilung = {};
for (const [datei] of q[0]) {
  const st = q.map((m) => m.get(datei)); if (q.length > 1 && st.filter((x) => x === st[0]).length < 2 && st.filter((x) => x === st[1]).length < 2) { z.strittig++; continue; }
  const soll = st.sort((a, b) => st.filter((x) => x === b).length - st.filter((x) => x === a).length)[0];
  const ist = vorschlag(datei.replace(/\.txt$/, ".pdf"), readFileSync(join(T, datei), "utf8")); verteilung[ist] = (verteilung[ist] || 0) + 1;
  if (GLEICH[soll]) { z.n++; if (ist === GLEICH[soll]) z.ok++; } else { z.andere++; if (Object.values(GLEICH).includes(ist)) z.falsch++; }
}
console.log(JSON.stringify({ text: T, rechnungVertragAngebotRichtig: `${z.ok}/${z.n}`, andereArtFaelschlichAlsEineDerDrei: `${z.falsch}/${z.andere}`, strittig: z.strittig, verteilung }, null, 1));
