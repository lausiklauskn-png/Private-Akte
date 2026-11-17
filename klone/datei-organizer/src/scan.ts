/**
 * Foto / Scan mit der Handykamera (Klaus 17.11.: Dokumente, Rechnungen, Kassenbons direkt fotografieren; zuerst nur in der
 * Web-App „Basic“). Die Kamera-App des Geräts macht das Bild (<input capture>), hier wird es verkleinert und gerade gedreht;
 * mehrere Seiten werden ein PDF (je Seite ein JPEG, ohne Textebene – die Texterkennung der App liest es wie jeden Scan).
 */
export type ScanSeite = { jpeg: Uint8Array; breite: number; hoehe: number; url: string };

/** Längste Kante in Bildpunkten: reicht der Texterkennung, hält ein Handyfoto (oft 12 MP und mehr) unter rund 1 MB. */
const LANG = 2400;

export async function fotoAufbereiten(f: Blob): Promise<ScanSeite> {
  let bild: ImageBitmap;
  try { bild = await createImageBitmap(f, { imageOrientation: "from-image" }); }
  catch { throw new Error("Das Foto ließ sich nicht lesen. Bitte noch einmal aufnehmen."); }
  const k = Math.min(1, LANG / Math.max(bild.width, bild.height));
  const breite = Math.max(1, Math.round(bild.width * k)), hoehe = Math.max(1, Math.round(bild.height * k));
  const c = document.createElement("canvas"); c.width = breite; c.height = hoehe;
  const g = c.getContext("2d");
  if (!g) { bild.close(); throw new Error("Das Foto ließ sich nicht verarbeiten."); }
  g.fillStyle = "#fff"; g.fillRect(0, 0, breite, hoehe); g.drawImage(bild, 0, 0, breite, hoehe); bild.close();
  const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/jpeg", 0.85));
  if (!blob) throw new Error("Das Foto ließ sich nicht verarbeiten.");
  return { jpeg: new Uint8Array(await blob.arrayBuffer()), breite, hoehe, url: URL.createObjectURL(blob) };
}

/** Mehrere Seiten als ein PDF: je Seite das JPEG unverändert eingebettet, Seitenbreite A4, Höhe nach dem Bild (lange Bons bleiben lang). */
export function pdfAusSeiten(seiten: ScanSeite[]): Uint8Array {
  const enc = new TextEncoder(), teile: Uint8Array[] = [], orte: number[] = [];
  let lage = 0;
  const raus = (x: string | Uint8Array) => { const b = typeof x === "string" ? enc.encode(x) : x; teile.push(b); lage += b.length; };
  const obj = (nr: number, kopf: string, strom?: Uint8Array) => {
    orte[nr] = lage; raus(`${nr} 0 obj\n${kopf}\n`);
    if (strom) { raus("stream\n"); raus(strom); raus("\nendstream\n"); }
    raus("endobj\n");
  };
  raus("%PDF-1.4\n"); raus(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]));
  obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  obj(2, `<< /Type /Pages /Count ${seiten.length} /Kids [${seiten.map((_, i) => `${3 + 3 * i} 0 R`).join(" ")}] >>`);
  seiten.forEach((s, i) => {
    const p = 3 + 3 * i, b = 595, h = Math.round((595 * s.hoehe / s.breite) * 100) / 100;
    obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${b} ${h}] /Resources << /XObject << /Im0 ${p + 2} 0 R >> >> /Contents ${p + 1} 0 R >>`);
    const inhalt = enc.encode(`q ${b} 0 0 ${h} 0 0 cm /Im0 Do Q`);
    obj(p + 1, `<< /Length ${inhalt.length} >>`, inhalt);
    obj(p + 2, `<< /Type /XObject /Subtype /Image /Width ${s.breite} /Height ${s.hoehe} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${s.jpeg.length} >>`, s.jpeg);
  });
  const xref = lage, n = 3 + 3 * seiten.length;
  raus(`xref\n0 ${n}\n0000000000 65535 f \n`);
  for (let i = 1; i < n; i++) raus(`${String(orte[i]).padStart(10, "0")} 00000 n \n`);
  raus(`trailer\n<< /Size ${n} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  const aus = new Uint8Array(lage); let k = 0;
  for (const t of teile) { aus.set(t, k); k += t.length; }
  return aus;
}

/** Der fertige Scan als Datei: eine Seite bleibt ein Bild, mehrere werden ein PDF. Name mit Datum und Uhrzeit (Ortszeit). */
export function scanDatei(seiten: ScanSeite[], zeit = new Date()): File {
  const z = (n: number) => String(n).padStart(2, "0");
  const name = `Scan_${zeit.getFullYear()}-${z(zeit.getMonth() + 1)}-${z(zeit.getDate())}_${z(zeit.getHours())}-${z(zeit.getMinutes())}-${z(zeit.getSeconds())}`;
  return seiten.length === 1
    ? new File([seiten[0].jpeg as BlobPart], `${name}.jpg`, { type: "image/jpeg", lastModified: zeit.getTime() })
    : new File([pdfAusSeiten(seiten) as BlobPart], `${name}.pdf`, { type: "application/pdf", lastModified: zeit.getTime() });
}

export const scanFreigeben = (seiten: ScanSeite[]) => { for (const s of seiten) URL.revokeObjectURL(s.url); };

/** Kopie auf das Gerät (Downloads): das Foto liegt sonst nur im Speicher der Seite und wäre nach dem Schließen weg. */
export function scanSpeichern(f: File) {
  const url = URL.createObjectURL(f);
  const a = document.createElement("a"); a.href = url; a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
