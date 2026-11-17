// Zweite Versuchsreihe der rekursiven Verbesserung (15.11.2026): Wie Regel und Wortmodell zusammenfinden, wird aus den Fehlern
// gelernt statt fest gesetzt. Reihum und verschachtelt wie scripts/rekursiv-versuch.mjs; nur Abstimmung, kein Nachweis.
//   B  = Wortmodell neu gelernt, Zusammenspiel wie heute (MODELL_VOR_REGEL 8)
//   S  = Schwelle „Modell vor sicherer Regel“ an den übrigen Stapeln gewählt
//   Z  = Zuverlässigkeit je Regelurteil gelernt: eine „sichere“ Regel, die an den übrigen Stapeln oft daneben lag, gilt als unsicher
//   ZS = Z und S zusammen
// Aufruf: node scripts/rekursiv-politik.mjs [--neu …] [--extra stadt-lern]
import { join } from "node:path";
const V = await import("./rekursiv-versuch.mjs");
const { vorhersage, merkmale } = await import(join(V.KERN_PFAD, "lib", "wortmodell.ts"));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const NEU = arg("--neu", "familie-k3,runde-c,runde-d,runde-e,runde-f,rest,absender").split(",");
const ALT = ["unabhaengig", "briefe-2", "briefe-a", "briefe-b", "briefe-h", "vermieterin", "vermieterin-2026"];
const FL = ["bereich", "schriftstueck"], MK = { bereich: "bereich", schriftstueck: "art" };
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };

// Zeile → je Feld {soll, regel, sicher, mw (Modellwert), ab (Abstand), duenn}
async function zeilen(s, ohne) {
  const m = V.wortmodell([...ALT, ...NEU.filter((x) => !ohne.includes(x))]);
  const rs = await V.lauf(s, m);
  return rs.map((r) => ({ stapel: s, datei: r.datei, ende: r.rat, soll: r.soll, f: Object.fromEntries(FL.map((f) => { const g = r.regel[f] || {};
    const v = g.text != null ? vorhersage(m[MK[f]], merkmale(g.text)) : undefined;
    return [f, { soll: r.soll[f], regel: g.wert ?? null, roh: g.roh ?? null, sicher: !!g.sicher, mw: v ? (GROB[v.wert] ?? v.wert) : null, ab: v?.abstand ?? 0, duenn: !v || v.grund.length < 2 || v.wert === "Archiv" }]; })) }));
}
// Zusammenspiel wie lib/wortmodell.ts mitModell, mit Schwelle t und Liste unzuverlässiger sicherer Regelurteile
function wahl(x, t, unsicher) {
  const sicher = x.sicher && !unsicher?.has(x.regel);
  if (x.duenn) return x.regel;
  if (sicher && x.regel === x.mw) return x.regel;
  if (x.ab >= t || !sicher) return x.mw;
  return x.regel;
}
function lerneZ(lern, f, t) {   // Regelurteile „sicher X“, die netto öfter falsch als richtig gegen das Modell stehen
  const z = new Map();
  for (const r of lern) { const x = r.f[f]; if (x.soll == null || !x.sicher || x.duenn || x.regel === x.mw || x.ab >= t) continue;
    const e = z.get(x.regel) || [0, 0]; if (x.regel === x.soll) e[0]++; else if (x.mw === x.soll) e[1]++; z.set(x.regel, e); }
  return new Set([...z].filter(([, [gut, schlecht]]) => schlecht - gut >= 3).map(([k]) => k));
}
const treffer = (rows, f, fn) => rows.filter((r) => r.f[f].soll != null && fn(r.f[f]) === r.f[f].soll).length;
const SCHW = [2, 4, 6, 8, 10, 14, 99];
const sum = { B: {}, S: {}, Z: {}, ZS: {}, n: {} }, wahlLog = [];
for (const t of NEU) {
  const test = await zeilen(t, [t]);
  const lern = []; for (const s of NEU.filter((x) => x !== t)) lern.push(...await zeilen(s, [s, t]));
  const zeile = [];
  for (const f of FL) {
    const n = test.filter((r) => r.f[f].soll != null).length;
    const tS = SCHW.map((s) => [s, treffer(lern, f, (x) => wahl(x, s))]).sort((a, b) => b[1] - a[1] || Math.abs(a[0] - 8) - Math.abs(b[0] - 8))[0][0];
    const uz = lerneZ(lern, f, 8), uzs = lerneZ(lern, f, tS);
    const e = { B: treffer(test, f, (x) => wahl(x, 8)), S: treffer(test, f, (x) => wahl(x, tS)), Z: treffer(test, f, (x) => wahl(x, 8, uz)), ZS: treffer(test, f, (x) => wahl(x, tS, uzs)) };
    for (const k of Object.keys(e)) sum[k][f] = (sum[k][f] || 0) + e[k]; sum.n[f] = (sum.n[f] || 0) + n;
    zeile.push(`${f.slice(0, 6)} n=${n} B ${(100 * e.B / n).toFixed(1)} S ${(100 * e.S / n).toFixed(1)}(t=${tS}) Z ${(100 * e.Z / n).toFixed(1)} ZS ${(100 * e.ZS / n).toFixed(1)}`);
    wahlLog.push({ t, f, tS, uz: [...uz], uzs: [...uzs] });
  }
  console.log(t.padEnd(12), zeile.join(" | "));
}
for (const f of FL) console.log(`ALLE ${f}: ` + ["B", "S", "Z", "ZS"].map((k) => `${k} ${(100 * sum[k][f] / sum.n[f]).toFixed(2)}`).join(" · "));
for (const w of wahlLog) console.log(JSON.stringify(w));
