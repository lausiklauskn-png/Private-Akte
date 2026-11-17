// Erzeugt aus Datei-Organizer lib/exif.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
function leseExif(b) {
  if (b.length < 4 || b[0] !== 255 || b[1] !== 216) return null;
  let i = 2;
  const meta = {};
  let gefunden = false;
  while (i + 4 < b.length) {
    if (b[i] !== 255) break;
    const marke = b[i + 1];
    const laenge = b[i + 2] << 8 | b[i + 3];
    if (marke === 218 || marke === 217) break;
    if (marke >= 192 && marke <= 195 && i + 9 < b.length) {
      meta.hoehe = b[i + 5] << 8 | b[i + 6];
      meta.breite = b[i + 7] << 8 | b[i + 8];
      gefunden = true;
    }
    if (marke === 225 && String.fromCharCode(...b.slice(i + 4, i + 10)) === "Exif\0\0") {
      const tiff = i + 10;
      if (tiffLesen(b, tiff, Math.min(b.length, i + 2 + laenge), meta)) gefunden = true;
    }
    i += 2 + laenge;
  }
  return gefunden ? meta : null;
}
function tiffLesen(b, t, ende, meta) {
  if (t + 8 > ende) return false;
  const le = b[t] === 73;
  const u16 = (o) => o + 2 > ende ? 0 : le ? b[o] | b[o + 1] << 8 : b[o] << 8 | b[o + 1];
  const u32 = (o) => o + 4 > ende ? 0 : le ? (b[o] | b[o + 1] << 8 | b[o + 2] << 16 | b[o + 3] << 24) >>> 0 : (b[o] << 24 | b[o + 1] << 16 | b[o + 2] << 8 | b[o + 3]) >>> 0;
  const text = (o, n) => {
    let s = "";
    for (let k = 0; k < n && o + k < ende; k++) {
      const c = b[o + k];
      if (!c) break;
      s += String.fromCharCode(c);
    }
    return s.trim();
  };
  const rational = (o) => {
    const z = u32(o), n = u32(o + 4);
    return n ? z / n : 0;
  };
  let gefunden = false;
  const ifd = (start, je) => {
    const o = t + start;
    if (o + 2 > ende) return;
    const n = Math.min(u16(o), 200);
    for (let k = 0; k < n; k++) {
      const e = o + 2 + k * 12;
      if (e + 12 > ende) return;
      const tag = u16(e), typ = u16(e + 2), anz = u32(e + 4);
      const groesse = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 }[typ] || 1;
      const wertOff = groesse * anz <= 4 ? e + 8 : t + u32(e + 8);
      je(tag, typ, anz, wertOff);
    }
  };
  let exifIfd = 0, gpsIfd = 0;
  ifd(u32(t + 4), (tag, _typ, anz, w) => {
    if (tag === 271) {
      meta.hersteller = text(w, Math.min(anz, 64));
      gefunden = true;
    }
    if (tag === 272) {
      meta.modell = text(w, Math.min(anz, 64));
      gefunden = true;
    }
    if (tag === 306 && !meta.aufnahme) {
      meta.aufnahme = exifDatum(text(w, anz));
      gefunden = true;
    }
    if (tag === 34665) exifIfd = u32(w);
    if (tag === 34853) gpsIfd = u32(w);
  });
  if (exifIfd) ifd(exifIfd, (tag, _typ, anz, w) => {
    if (tag === 36867) {
      meta.aufnahme = exifDatum(text(w, anz)) || meta.aufnahme;
      gefunden = true;
    }
  });
  if (gpsIfd) {
    let latRef = "N", lonRef = "E", lat = null, lon = null;
    ifd(gpsIfd, (tag, _typ, anz, w) => {
      if (tag === 1) latRef = text(w, anz) || "N";
      if (tag === 2) lat = [rational(w), rational(w + 8), rational(w + 16)];
      if (tag === 3) lonRef = text(w, anz) || "E";
      if (tag === 4) lon = [rational(w), rational(w + 8), rational(w + 16)];
    });
    const grad = (g) => g ? g[0] + g[1] / 60 + g[2] / 3600 : NaN;
    const la = grad(lat) * (latRef === "S" ? -1 : 1), lo = grad(lon) * (lonRef === "W" ? -1 : 1);
    if (Number.isFinite(la) && Number.isFinite(lo)) {
      meta.gps = { lat: Math.round(la * 1e5) / 1e5, lon: Math.round(lo * 1e5) / 1e5 };
      gefunden = true;
    }
  }
  return gefunden;
}
function exifDatum(s) {
  const m = s.match(/^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}` : void 0;
}
function exifStueck(a) {
  const eintraege = [];
  const asciiZ = (s) => new Uint8Array([...new TextEncoder().encode(s), 0]);
  if (a.hersteller) eintraege.push({ tag: 271, typ: 2, daten: asciiZ(a.hersteller) });
  if (a.modell) eintraege.push({ tag: 272, typ: 2, daten: asciiZ(a.modell) });
  const datum = a.aufnahme.replace(/-/g, ":").replace("T", " ").slice(0, 19);
  const le = (n, bytes) => {
    const o = new Uint8Array(bytes);
    for (let k = 0; k < bytes; k++) o[k] = n >>> 8 * k & 255;
    return o;
  };
  const teile = [];
  const ifdBau = (liste, start) => {
    const kopf = 2 + liste.length * 12 + 4;
    let datenOff = start + kopf;
    const kopfB = [le(liste.length, 2)];
    const datenB = [];
    for (const e of liste) {
      kopfB.push(le(e.tag, 2), le(e.typ, 2), le(e.anz, 4));
      if (e.daten && e.daten.length > 4) {
        kopfB.push(le(datenOff, 4));
        datenB.push(e.daten);
        datenOff += e.daten.length;
      } else if (e.daten) {
        const p = new Uint8Array(4);
        p.set(e.daten);
        kopfB.push(p);
      } else kopfB.push(le(e.wert || 0, 4));
    }
    kopfB.push(le(0, 4));
    return { bytes: verbinde([...kopfB, ...datenB]), laenge: datenOff - start };
  };
  const ifd0Liste = (exifOff2, gpsOff2) => [
    ...eintraege.map((e) => ({ tag: e.tag, typ: e.typ, anz: e.daten.length, daten: e.daten })),
    { tag: 34665, typ: 4, anz: 1, wert: exifOff2 },
    ...a.gps ? [{ tag: 34853, typ: 4, anz: 1, wert: gpsOff2 }] : []
  ];
  const probe0 = ifdBau(ifd0Liste(0, 0), 8);
  const exifOff = 8 + probe0.laenge;
  const exifIfd = ifdBau([{ tag: 36867, typ: 2, anz: 20, daten: asciiZ(datum) }], exifOff);
  const gpsOff = exifOff + exifIfd.laenge;
  const ifd0 = ifdBau(ifd0Liste(exifOff, gpsOff), 8);
  teile.push(new Uint8Array([73, 73, 42, 0]), le(8, 4), ifd0.bytes, exifIfd.bytes);
  if (a.gps) {
    const rat = (x) => {
      const g = Math.floor(x), mf = (x - g) * 60, m = Math.floor(mf), s = Math.round((mf - m) * 60 * 100);
      return verbinde([le(g, 4), le(1, 4), le(m, 4), le(1, 4), le(s, 4), le(100, 4)]);
    };
    const gps = ifdBau([
      { tag: 1, typ: 2, anz: 2, daten: asciiZ(a.gps.lat >= 0 ? "N" : "S") },
      { tag: 2, typ: 5, anz: 3, daten: rat(Math.abs(a.gps.lat)) },
      { tag: 3, typ: 2, anz: 2, daten: asciiZ(a.gps.lon >= 0 ? "E" : "W") },
      { tag: 4, typ: 5, anz: 3, daten: rat(Math.abs(a.gps.lon)) }
    ], gpsOff);
    teile.push(gps.bytes);
  }
  const tiff = verbinde(teile);
  const inhalt = verbinde([new TextEncoder().encode("Exif\0\0"), tiff]);
  const laenge = inhalt.length + 2;
  return verbinde([new Uint8Array([255, 225, laenge >> 8, laenge & 255]), inhalt]);
}
function verbinde(teile) {
  const n = teile.reduce((s, t) => s + t.length, 0);
  const o = new Uint8Array(n);
  let p = 0;
  for (const t of teile) {
    o.set(t, p);
    p += t.length;
  }
  return o;
}
export {
  exifStueck,
  leseExif,
  verbinde
};
