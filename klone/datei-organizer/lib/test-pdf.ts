/**
 * Kleinste PDF mit echter Textebene (Helvetica, WinAnsi) – für Testdaten und Proben.
 * Umlaute über WinAnsiEncoding; Zeilen werden von oben nach unten gesetzt.
 */
const WINANSI: Record<string, number> = { "ä": 0xe4, "ö": 0xf6, "ü": 0xfc, "Ä": 0xc4, "Ö": 0xd6, "Ü": 0xdc, "ß": 0xdf, "€": 0x80, "–": 0x96, "„": 0x84, "“": 0x93, "·": 0xb7, "é": 0xe9, "§": 0xa7 };

function pdfText(s: string): string {
  let o = "";
  for (const c of s) {
    const code = WINANSI[c] ?? c.charCodeAt(0);
    if (c === "(" || c === ")" || c === "\\") o += "\\" + c;
    else if (code > 126) o += "\\" + code.toString(8).padStart(3, "0");
    else o += c;
  }
  return o;
}

export function textPdf(seiten: string[][]): Uint8Array {
  const objekte: string[] = [];
  const seitenIds: number[] = [];
  // 1 Katalog, 2 Seitenbaum, 3 Schrift, danach je Seite: Inhalt + Seite
  let id = 4;
  const inhalte: string[] = [];
  for (const zeilen of seiten) {
    let y = 800;
    const ops = ["BT", "/F1 11 Tf"];
    for (const z of zeilen) {
      const gross = z.startsWith("# ");
      const text = gross ? z.slice(2) : z;
      ops.push(`/F1 ${gross ? 14 : 11} Tf`, `1 0 0 1 56 ${y} Tm`, `(${pdfText(text)}) Tj`);
      y -= gross ? 22 : z === "" ? 10 : 15;
      if (y < 40) break;
    }
    ops.push("ET");
    inhalte.push(ops.join("\n"));
    seitenIds.push(id + 1);
    id += 2;
  }
  objekte[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objekte[2] = `<< /Type /Pages /Kids [${seitenIds.map((s) => `${s} 0 R`).join(" ")}] /Count ${seitenIds.length} >>`;
  objekte[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  inhalte.forEach((c, i) => {
    const inhaltId = 4 + i * 2;
    const bytes = latin1Laenge(c);
    objekte[inhaltId] = `<< /Length ${bytes} >>\nstream\n${c}\nendstream`;
    objekte[inhaltId + 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${inhaltId} 0 R >>`;
  });
  let pdf = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n";
  const offs: number[] = [];
  for (let i = 1; i < objekte.length; i++) { offs[i] = latin1Laenge(pdf); pdf += `${i} 0 obj\n${objekte[i]}\nendobj\n`; }
  const xref = latin1Laenge(pdf);
  pdf += `xref\n0 ${objekte.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objekte.length; i++) pdf += `${String(offs[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objekte.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const o = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) o[i] = pdf.charCodeAt(i) & 0xff;
  return o;
}

const latin1Laenge = (s: string) => s.length;
