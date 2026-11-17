// Erzeugt aus Datei-Organizer lib/aehnlich.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
function namensStamm(name) {
  let s = name.toLowerCase().replace(/\.[a-z0-9]{1,5}$/, "");
  s = s.replace(/^(kopie( \(\d+\))? von|copy of)\s+/, "");
  for (let i = 0; i < 3; i++) s = s.replace(/[\s_-]*(-\s*)?(kopie|copy)(\s*\(\d+\))?$/, "").replace(/[\s_-]*\(\d+\)$/, "").replace(/[\s_-]+(v|ver|version|fassung|stand)[\s_.-]?\d+([.]\d+)*$/, "").replace(/[\s_-]+(final|endg(ü|ue)ltig|neu|new|alt|old|entwurf|draft|korr(ektur)?|geändert|aktuell)$/, "").replace(/[\s_-]+\d{4}-?\d{2}-?\d{2}$/, "");
  return s.replace(/[\s_.-]+/g, " ").trim();
}
function textFingerabdruck(text) {
  const t = (text || "").toLowerCase().replace(/[^a-z0-9äöüß]+/g, "");
  if (t.length < 200) return void 0;
  let h1 = 3735928559, h2 = 1103547991;
  for (let i = 0; i < t.length; i++) {
    const c = t.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
const endung = (n) => (/\.([a-z0-9]{1,5})$/i.exec(n)?.[1] || "").toLowerCase();
const ordner = (p) => p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
const BELEGNUMMER = /^(Rechnungsnummer|Vertragsnummer|Auftragsnummer|Kundennummer)$/;
function aehnlicheFinden(dateien) {
  const kandidaten = dateien.filter((d) => !d.doppeltVon && !d.auffaellig && d.groesse > 0);
  const marke = /* @__PURE__ */ new Map();
  const neueste = (g) => [...g].sort((a, b) => b.geaendert - a.geaendert || a.pfad.localeCompare(b.pfad, "de"))[0];
  const gruppen = (schluessel) => {
    const m = /* @__PURE__ */ new Map();
    for (const d of kandidaten) {
      const k = schluessel(d);
      if (!k) continue;
      const g = m.get(k);
      g ? g.push(d) : m.set(k, [d]);
    }
    return [...m.values()].filter((g) => g.length > 1 && new Set(g.map((d) => d.sha256 || d.pfad)).size > 1);
  };
  const markiere = (g, art, grund) => {
    const zu = neueste(g);
    for (const d of g) if (d !== zu && !marke.has(d.pfad)) marke.set(d.pfad, { art, zu: zu.pfad, grund: grund(zu) });
  };
  for (const g of gruppen((d) => textFingerabdruck(d.volltext))) markiere(g, "inhalt", (z) => `gleicher Text wie \u201E${z.name}\u201C, aber andere Datei (neu gespeichert, gescannt oder anderes Format)`);
  for (const g of gruppen((d) => d.innen?.pdfKennung?.herkunft)) {
    if (g.length <= 20) markiere(g, "fassung", (z) => `gleiche PDF-Kennung wie \u201E${z.name}\u201C \u2013 aus derselben Datei entstanden (andere Fassung oder neu gespeichert)`);
  }
  for (const g of gruppen((d) => {
    const a = d.felder.absender?.wert, art = d.felder.schriftstueck?.wert, n = d.felder.nummern?.find((x) => BELEGNUMMER.test(x.art));
    return a && n ? `${a.toLowerCase()}|${art || ""}|${n.art}|${n.wert.replace(/\s/g, "")}` : void 0;
  })) markiere(g, "beleg", (z) => `gleicher Absender und gleiche Nummer wie \u201E${z.name}\u201C \u2013 derselbe Beleg in anderer Fassung?`);
  for (const g of gruppen((d) => {
    const s = namensStamm(d.name);
    return s.length >= 3 ? `${s}.${endung(d.name)}` : void 0;
  })) {
    const namen = new Set(g.map((d) => d.name.toLowerCase()));
    if (namen.size > 1) markiere(g, "fassung", (z) => `\xE4ltere Fassung von \u201E${z.name}\u201C (Name bis auf Kopie-/Versionszusatz gleich)`);
  }
  for (const g of gruppen((d) => d.bild?.aufnahme ? `${d.bild.aufnahme}|${d.bild.modell || ""}` : void 0)) markiere(g, "foto", (z) => `gleiche Aufnahme wie \u201E${z.name}\u201C, andere Gr\xF6\xDFe oder Bearbeitung`);
  for (const g of gruppen((d) => d.name.toLowerCase())) {
    if (new Set(g.map((d) => ordner(d.pfad))).size > 1) markiere(g, "name", (z) => `gleicher Name wie \u201E${z.pfad}\u201C, aber anderer Inhalt \u2013 Namenskonflikt`);
  }
  return dateien.map((d) => {
    const a = marke.get(d.pfad);
    return a ? { ...d, aehnlich: a } : d.aehnlich ? { ...d, aehnlich: void 0 } : d;
  });
}
function gleicheGroesse(liste) {
  const m = /* @__PURE__ */ new Map();
  for (const d of liste) if (d.groesse > 0) {
    const g = m.get(d.groesse);
    g ? g.push(d) : m.set(d.groesse, [d]);
  }
  return [...m.values()].filter((g) => g.length > 1);
}
export {
  aehnlicheFinden,
  gleicheGroesse,
  namensStamm,
  textFingerabdruck
};
