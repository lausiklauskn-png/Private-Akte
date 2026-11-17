// Erzeugt aus Datei-Organizer lib/pdf-text.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const MAX_SEITEN = 30;
function zeilenAus(items) {
  const zeilen = /* @__PURE__ */ new Map();
  for (const it of items) {
    if (!it.str) continue;
    const y = Math.round(it.transform[5] / 3) * 3;
    const liste = zeilen.get(y) || [];
    liste.push({ x: it.transform[4], s: it.str });
    zeilen.set(y, liste);
  }
  return [...zeilen.entries()].sort((a, b) => b[0] - a[0]).map(([y, teile]) => ({ y, text: teile.sort((a, b) => a.x - b.x).map((t) => t.s).join(" ").replace(/\s+/g, " ").trim() })).filter((z) => z.text);
}
async function pdfTextLesen(pdfjs, bytes) {
  const doc = await pdfjs.getDocument({ data: bytes.slice(), isEvalSupported: false, verbosity: 0, disableFontFace: true, useSystemFonts: false }).promise;
  try {
    const seiten = [];
    let kopf = "";
    for (let n = 1; n <= Math.min(doc.numPages, MAX_SEITEN); n++) {
      const seite = await doc.getPage(n);
      const hoehe = seite.getViewport({ scale: 1 }).height;
      const inhalt = await seite.getTextContent();
      const zeilen = zeilenAus(inhalt.items);
      if (n === 1) kopf = zeilen.filter((z) => z.y >= hoehe * 0.5).map((z) => z.text).join("\n") || zeilen.slice(0, 25).map((z) => z.text).join("\n");
      seiten.push(zeilen.map((z) => z.text).join("\n"));
    }
    return { kopf, voll: seiten.join("\n\n") };
  } finally {
    await doc.destroy();
  }
}
export {
  pdfTextLesen,
  zeilenAus
};
