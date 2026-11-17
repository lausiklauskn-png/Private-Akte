import type { Korrektur } from "./typen.ts";

/**
 * Punkt 9 der Empfehlung (13.11.2026): Stichprobe echter Unterlagen auf dem eigenen Gerät. Gezählt wird nur, wie oft der erste Vorschlag
 * je Datei und Feld bestätigt oder berichtigt wurde – nur Zahlen, keine Namen, keine Texte, keine Dateinamen. Nichts verlässt das Gerät,
 * außer der Nutzer kopiert die Zahlen selbst.
 */
export type StichprobeFeld = { bestaetigt: number; berichtigt: number };
export type Stichprobe = { werkzeug: "Datei-Organizer Stichprobe"; fassung: 1; dateien: number; felder: Record<string, StichprobeFeld> };

export function stichprobe(verlauf: Korrektur[]): Stichprobe {
  const erste = new Map<string, Korrektur>();
  for (const k of verlauf) { const s = `${k.pfad}\u0000${k.feld}`; if (!erste.has(s)) erste.set(s, k); }
  const felder: Record<string, StichprobeFeld> = {};
  for (const k of erste.values()) { const f = (felder[k.feld] ||= { bestaetigt: 0, berichtigt: 0 }); if (k.bestaetigt || k.von === k.zu) f.bestaetigt++; else f.berichtigt++; }
  return { werkzeug: "Datei-Organizer Stichprobe", fassung: 1, dateien: new Set([...erste.values()].map((k) => k.pfad)).size, felder };
}

/** Anteil richtig mit 95-%-Spanne (Wilson) als Text, z. B. „31/40 = 78 % (62–88 %)“. */
export function anteilText(f: StichprobeFeld): string {
  const n = f.bestaetigt + f.berichtigt; if (!n) return "–";
  const p = f.bestaetigt / n, z = 1.96, d = 1 + z * z / n, m = (p + z * z / (2 * n)) / d, h = (z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d;
  return `${f.bestaetigt}/${n} = ${Math.round(100 * p)} % (${Math.round(100 * Math.max(0, m - h))}–${Math.round(100 * Math.min(1, m + h))} %)`;
}
