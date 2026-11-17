/**
 * Vorverarbeitung vor der Texterkennung (Training Teil 2, 14.11.2026): Graustufen, kleine Bilder vergrößern, den Hintergrund (Schatten,
 * Verlauf, vergilbtes Papier, Flecken) schätzen und herausteilen, dann den Kontrast strecken. Versuch an 537 selbst gesetzten Scans und Fotos
 * (scripts/vorverarbeitung-versuch.mjs): gefundene Wörter 79 → 91 %, schlechte Scans 41 → 83 % – ABER an Schäden des eigenen Setzers, deren
 * Umkehrung diese Rechnung ist (Kreisschluss). KREUZTEST 14.11.2026 an unabhängig erzeugten Bildern (scripts/kreuz/): Bereich 78,5 → 70,0 %,
 * p = 0,0002, gesichert SCHLECHTER – darum NICHT in der App. Bleibt nur für die Messskripte (scripts/leser-node.mjs, vorverarbeitung-versuch.mjs).
 * Rein, ohne Browser: bekommt und liefert Graustufen-Pixel. Die App zeichnet das Bild dafür auf eine Leinwand (src/vendor.ts).
 */
export type Grau = { daten: Uint8ClampedArray<ArrayBuffer>; b: number; h: number };

/** Mindestbreite; schmalere Bilder (Fotos, niedrige Auflösung) werden verdoppelt. */
export const MIN_BREITE = 1400;

export function grauAusRgba(rgba: Uint8ClampedArray, b: number, h: number): Grau {
  const g = new Uint8ClampedArray(b * h);
  for (let i = 0, j = 0; i < g.length; i++, j += 4) g[i] = (rgba[j] * 299 + rgba[j + 1] * 587 + rgba[j + 2] * 114) / 1000;
  return { daten: g, b, h };
}
export function rgbaAusGrau(g: Grau): Uint8ClampedArray<ArrayBuffer> {
  const o = new Uint8ClampedArray(g.b * g.h * 4);
  for (let i = 0, j = 0; i < g.daten.length; i++, j += 4) { o[j] = o[j + 1] = o[j + 2] = g.daten[i]; o[j + 3] = 255; }
  return o;
}

/** Bilinear auf neue Größe. */
function skaliere(g: Grau, nb: number, nh: number): Grau {
  const o = new Uint8ClampedArray(nb * nh), sx = (g.b - 1) / Math.max(1, nb - 1), sy = (g.h - 1) / Math.max(1, nh - 1);
  for (let y = 0; y < nh; y++) {
    const fy = y * sy, y0 = Math.floor(fy), y1 = Math.min(g.h - 1, y0 + 1), dy = fy - y0;
    for (let x = 0; x < nb; x++) {
      const fx = x * sx, x0 = Math.floor(fx), x1 = Math.min(g.b - 1, x0 + 1), dx = fx - x0;
      const a = g.daten[y0 * g.b + x0], c = g.daten[y0 * g.b + x1], d = g.daten[y1 * g.b + x0], e = g.daten[y1 * g.b + x1];
      o[y * nb + x] = (a * (1 - dx) + c * dx) * (1 - dy) + (d * (1 - dx) + e * dx) * dy;
    }
  }
  return { daten: o, b: nb, h: nh };
}

/** Kastenweichzeichner mit Radius r, waagerecht und senkrecht (gleitende Summe). */
function kasten(f: Float32Array<ArrayBuffer>, b: number, h: number, r: number): Float32Array<ArrayBuffer> {
  const t = new Float32Array(f.length), o = new Float32Array(f.length), n = 2 * r + 1;
  for (let y = 0; y < h; y++) {
    let s = 0; const z = y * b;
    for (let x = -r; x <= r; x++) s += f[z + Math.min(b - 1, Math.max(0, x))];
    for (let x = 0; x < b; x++) { t[z + x] = s / n; s += f[z + Math.min(b - 1, x + r + 1)] - f[z + Math.max(0, x - r)]; }
  }
  for (let x = 0; x < b; x++) {
    let s = 0;
    for (let y = -r; y <= r; y++) s += t[Math.min(h - 1, Math.max(0, y)) * b + x];
    for (let y = 0; y < h; y++) { o[y * b + x] = s / n; s += t[Math.min(h - 1, y + r + 1) * b + x] - t[Math.max(0, y - r) * b + x]; }
  }
  return o;
}

export function vorverarbeiten(eingang: Grau): Grau {
  let g = eingang.b < MIN_BREITE ? skaliere(eingang, eingang.b * 2, eingang.h * 2) : eingang;
  // Hintergrund auf einem Viertel der Größe schätzen (drei Kastenläufe ≈ Gauß mit σ ≈ 25 Pixel der vollen Größe), dann zurück auf voll
  const kb = Math.max(1, Math.round(g.b / 4)), kh = Math.max(1, Math.round(g.h / 4));
  const klein = skaliere(g, kb, kh);
  let f: Float32Array<ArrayBuffer> = Float32Array.from(klein.daten);
  for (let i = 0; i < 3; i++) f = kasten(f, kb, kh, 6);
  const hg = skaliere({ daten: Uint8ClampedArray.from(f), b: kb, h: kh }, g.b, g.h).daten;
  const o = new Uint8ClampedArray(g.daten.length);
  for (let i = 0; i < o.length; i++) o[i] = (g.daten[i] / (hg[i] + 1)) * 235;
  // Kontrast strecken: 1 % dunkelste → 0, 1 % hellste → 255
  const hist = new Uint32Array(256); for (const v of o) hist[v]++;
  const grenze = o.length * 0.01; let lo = 0, hi = 255, s = 0;
  while (lo < 255 && (s += hist[lo]) < grenze) lo++;
  s = 0; while (hi > 0 && (s += hist[hi]) < grenze) hi--;
  if (hi > lo) { const k = 255 / (hi - lo); for (let i = 0; i < o.length; i++) o[i] = (o[i] - lo) * k; }
  g = { daten: o, b: g.b, h: g.h };
  return g;
}
