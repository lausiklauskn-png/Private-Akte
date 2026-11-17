// Erzeugt aus Datei-Organizer lib/stichprobe.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
function stichprobe(verlauf) {
  var _a;
  const erste = /* @__PURE__ */ new Map();
  for (const k of verlauf) {
    const s = `${k.pfad}\0${k.feld}`;
    if (!erste.has(s)) erste.set(s, k);
  }
  const felder = {};
  for (const k of erste.values()) {
    const f = felder[_a = k.feld] || (felder[_a] = { bestaetigt: 0, berichtigt: 0 });
    if (k.bestaetigt || k.von === k.zu) f.bestaetigt++;
    else f.berichtigt++;
  }
  return { werkzeug: "Datei-Organizer Stichprobe", fassung: 1, dateien: new Set([...erste.values()].map((k) => k.pfad)).size, felder };
}
function anteilText(f) {
  const n = f.bestaetigt + f.berichtigt;
  if (!n) return "\u2013";
  const p = f.bestaetigt / n, z = 1.96, d = 1 + z * z / n, m = (p + z * z / (2 * n)) / d, h = z * Math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d;
  return `${f.bestaetigt}/${n} = ${Math.round(100 * p)} % (${Math.round(100 * Math.max(0, m - h))}\u2013${Math.round(100 * Math.min(1, m + h))} %)`;
}
export {
  anteilText,
  stichprobe
};
