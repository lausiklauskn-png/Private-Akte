// Erzeugt aus Datei-Organizer lib/abgleich.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
function aehnlich(a, b) {
  const x = norm(a), y = norm(b);
  if (!x || !y) return 0;
  if (x === y) return 1;
  const m = x.length, n = y.length;
  if (Math.abs(m - n) > Math.max(m, n) * 0.4) return 0;
  let vor = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const jetzt = [i];
    for (let j = 1; j <= n; j++) jetzt[j] = Math.min(vor[j] + 1, jetzt[j - 1] + 1, vor[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    vor = jetzt;
  }
  return 1 - vor[n] / Math.max(m, n);
}
const GEWICHT = (d) => d.textQuelle === "ocr" ? 1 : 3;
function absenderVereinheitlichen(dateien, bekannt = [], schwelle = 0.8) {
  const zaehl = /* @__PURE__ */ new Map();
  for (const b of bekannt) zaehl.set(b, (zaehl.get(b) || 0) + 100);
  for (const d of dateien) {
    const a = d.felder.absender?.wert;
    if (!a || a === "unbekannt" || /^eigenes foto/i.test(a)) continue;
    zaehl.set(a, (zaehl.get(a) || 0) + GEWICHT(d));
  }
  const formen = [...zaehl.entries()].sort((a, b) => b[1] - a[1]);
  const kanon = /* @__PURE__ */ new Map();
  for (const [form] of formen) {
    if (kanon.has(form)) continue;
    kanon.set(form, form);
    for (const [andere] of formen) if (!kanon.has(andere) && aehnlich(form, andere) >= schwelle) kanon.set(andere, form);
  }
  return dateien.map((d) => {
    const w = d.felder.absender;
    if (!w || d.bestaetigt?.absender || !kanon.has(w.wert)) return d;
    const k = kanon.get(w.wert);
    const gestuetzt = (zaehl.get(k) || 0) > GEWICHT(d) || bekannt.includes(k);
    if (k === w.wert) {
      if (d.textQuelle === "ocr" && w.sicher && !gestuetzt) return { ...d, felder: { ...d.felder, absender: { ...w, sicher: false, grund: `${w.grund}; nur per Texterkennung gelesen` } } };
      return d;
    }
    return { ...d, felder: { ...d.felder, absender: { wert: k, sicher: true, grund: `vereinheitlicht: \u201E${w.wert}\u201C \u2248 \u201E${k}\u201C`, quelle: w.quelle } } };
  });
}
export {
  absenderVereinheitlichen,
  aehnlich
};
