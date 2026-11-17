import type { BildMeta } from "./typen.ts";

/**
 * Metadaten eines JPEG-Fotos (EXIF): Aufnahmezeit, Gerät, Größe, Ort. Nur lesen, mit Obergrenzen.
 * PNG/WebP/HEIC: nicht in dieser Fassung (benannte Grenze).
 */
export function leseExif(b: Uint8Array): BildMeta | null {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  const meta: BildMeta = {};
  let gefunden = false;
  while (i + 4 < b.length) {
    if (b[i] !== 0xff) break;
    const marke = b[i + 1];
    const laenge = (b[i + 2] << 8) | b[i + 3];
    if (marke === 0xda || marke === 0xd9) break; // Bilddaten beginnen
    if (marke >= 0xc0 && marke <= 0xc3 && i + 9 < b.length) {
      meta.hoehe = (b[i + 5] << 8) | b[i + 6];
      meta.breite = (b[i + 7] << 8) | b[i + 8];
      gefunden = true;
    }
    if (marke === 0xe1 && String.fromCharCode(...b.slice(i + 4, i + 10)) === "Exif\0\0") {
      const tiff = i + 10;
      if (tiffLesen(b, tiff, Math.min(b.length, i + 2 + laenge), meta)) gefunden = true;
    }
    i += 2 + laenge;
  }
  return gefunden ? meta : null;
}

function tiffLesen(b: Uint8Array, t: number, ende: number, meta: BildMeta): boolean {
  if (t + 8 > ende) return false;
  const le = b[t] === 0x49;
  const u16 = (o: number) => (o + 2 > ende ? 0 : le ? b[o] | (b[o + 1] << 8) : (b[o] << 8) | b[o + 1]);
  const u32 = (o: number) => (o + 4 > ende ? 0 : le ? (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0 : ((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0);
  const text = (o: number, n: number) => { let s = ""; for (let k = 0; k < n && o + k < ende; k++) { const c = b[o + k]; if (!c) break; s += String.fromCharCode(c); } return s.trim(); };
  const rational = (o: number) => { const z = u32(o), n = u32(o + 4); return n ? z / n : 0; };
  let gefunden = false;
  const ifd = (start: number, je: (tag: number, typ: number, anz: number, wertOff: number) => void) => {
    const o = t + start;
    if (o + 2 > ende) return;
    const n = Math.min(u16(o), 200);
    for (let k = 0; k < n; k++) {
      const e = o + 2 + k * 12;
      if (e + 12 > ende) return;
      const tag = u16(e), typ = u16(e + 2), anz = u32(e + 4);
      const groesse = ({ 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 } as Record<number, number>)[typ] || 1;
      const wertOff = groesse * anz <= 4 ? e + 8 : t + u32(e + 8);
      je(tag, typ, anz, wertOff);
    }
  };
  let exifIfd = 0, gpsIfd = 0;
  ifd(u32(t + 4), (tag, _typ, anz, w) => {
    if (tag === 0x010f) { meta.hersteller = text(w, Math.min(anz, 64)); gefunden = true; }
    if (tag === 0x0110) { meta.modell = text(w, Math.min(anz, 64)); gefunden = true; }
    if (tag === 0x0132 && !meta.aufnahme) { meta.aufnahme = exifDatum(text(w, anz)); gefunden = true; }
    if (tag === 0x8769) exifIfd = u32(w);
    if (tag === 0x8825) gpsIfd = u32(w);
  });
  if (exifIfd) ifd(exifIfd, (tag, _typ, anz, w) => {
    if (tag === 0x9003) { meta.aufnahme = exifDatum(text(w, anz)) || meta.aufnahme; gefunden = true; }
  });
  if (gpsIfd) {
    let latRef = "N", lonRef = "E", lat: number[] | null = null, lon: number[] | null = null;
    ifd(gpsIfd, (tag, _typ, anz, w) => {
      if (tag === 1) latRef = text(w, anz) || "N";
      if (tag === 2) lat = [rational(w), rational(w + 8), rational(w + 16)];
      if (tag === 3) lonRef = text(w, anz) || "E";
      if (tag === 4) lon = [rational(w), rational(w + 8), rational(w + 16)];
    });
    const grad = (g: number[] | null) => (g ? g[0] + g[1] / 60 + g[2] / 3600 : NaN);
    const la = grad(lat) * (latRef === "S" ? -1 : 1), lo = grad(lon) * (lonRef === "W" ? -1 : 1);
    if (Number.isFinite(la) && Number.isFinite(lo)) { meta.gps = { lat: Math.round(la * 1e5) / 1e5, lon: Math.round(lo * 1e5) / 1e5 }; gefunden = true; }
  }
  return gefunden;
}

/** „2026:10:14 08:12:33“ → „2026-10-14T08:12:33“ */
function exifDatum(s: string): string | undefined {
  const m = s.match(/^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}` : undefined;
}

/** Baut ein kleines EXIF-Stück (APP1) – für Testdaten und Proben. */
export function exifStueck(a: { aufnahme: string; hersteller?: string; modell?: string; gps?: { lat: number; lon: number } }): Uint8Array {
  const eintraege: Array<{ tag: number; typ: number; daten: Uint8Array }> = [];
  const asciiZ = (s: string) => new Uint8Array([...new TextEncoder().encode(s), 0]);
  if (a.hersteller) eintraege.push({ tag: 0x010f, typ: 2, daten: asciiZ(a.hersteller) });
  if (a.modell) eintraege.push({ tag: 0x0110, typ: 2, daten: asciiZ(a.modell) });
  const datum = a.aufnahme.replace(/-/g, ":").replace("T", " ").slice(0, 19);
  // Aufbau: Kopf 8 · IFD0 · IFD-Exif · IFD-GPS · Daten
  const le = (n: number, bytes: number) => { const o = new Uint8Array(bytes); for (let k = 0; k < bytes; k++) o[k] = (n >>> (8 * k)) & 0xff; return o; };
  const teile: Uint8Array[] = [];
  const ifdBau = (liste: Array<{ tag: number; typ: number; anz: number; daten?: Uint8Array; wert?: number }>, start: number) => {
    const kopf = 2 + liste.length * 12 + 4;
    let datenOff = start + kopf;
    const kopfB: Uint8Array[] = [le(liste.length, 2)];
    const datenB: Uint8Array[] = [];
    for (const e of liste) {
      kopfB.push(le(e.tag, 2), le(e.typ, 2), le(e.anz, 4));
      if (e.daten && e.daten.length > 4) { kopfB.push(le(datenOff, 4)); datenB.push(e.daten); datenOff += e.daten.length; }
      else if (e.daten) { const p = new Uint8Array(4); p.set(e.daten); kopfB.push(p); }
      else kopfB.push(le(e.wert || 0, 4));
    }
    kopfB.push(le(0, 4));
    return { bytes: verbinde([...kopfB, ...datenB]), laenge: datenOff - start };
  };
  // Größen erst schätzen, dann bauen (zwei Durchgänge)
  const ifd0Liste = (exifOff: number, gpsOff: number) => [
    ...eintraege.map((e) => ({ tag: e.tag, typ: e.typ, anz: e.daten.length, daten: e.daten })),
    { tag: 0x8769, typ: 4, anz: 1, wert: exifOff },
    ...(a.gps ? [{ tag: 0x8825, typ: 4, anz: 1, wert: gpsOff }] : []),
  ];
  const probe0 = ifdBau(ifd0Liste(0, 0), 8);
  const exifOff = 8 + probe0.laenge;
  const exifIfd = ifdBau([{ tag: 0x9003, typ: 2, anz: 20, daten: asciiZ(datum) }], exifOff);
  const gpsOff = exifOff + exifIfd.laenge;
  const ifd0 = ifdBau(ifd0Liste(exifOff, gpsOff), 8);
  teile.push(new Uint8Array([0x49, 0x49, 0x2a, 0x00]), le(8, 4), ifd0.bytes, exifIfd.bytes);
  if (a.gps) {
    const rat = (x: number) => { const g = Math.floor(x), mf = (x - g) * 60, m = Math.floor(mf), s = Math.round((mf - m) * 60 * 100); return verbinde([le(g, 4), le(1, 4), le(m, 4), le(1, 4), le(s, 4), le(100, 4)]); };
    const gps = ifdBau([
      { tag: 1, typ: 2, anz: 2, daten: asciiZ(a.gps.lat >= 0 ? "N" : "S") },
      { tag: 2, typ: 5, anz: 3, daten: rat(Math.abs(a.gps.lat)) },
      { tag: 3, typ: 2, anz: 2, daten: asciiZ(a.gps.lon >= 0 ? "E" : "W") },
      { tag: 4, typ: 5, anz: 3, daten: rat(Math.abs(a.gps.lon)) },
    ], gpsOff);
    teile.push(gps.bytes);
  }
  const tiff = verbinde(teile);
  const inhalt = verbinde([new TextEncoder().encode("Exif\0\0"), tiff]);
  const laenge = inhalt.length + 2;
  return verbinde([new Uint8Array([0xff, 0xe1, laenge >> 8, laenge & 0xff]), inhalt]);
}

export function verbinde(teile: Uint8Array[]): Uint8Array {
  const n = teile.reduce((s, t) => s + t.length, 0);
  const o = new Uint8Array(n);
  let p = 0;
  for (const t of teile) { o.set(t, p); p += t.length; }
  return o;
}
