// Erzeugt aus Datei-Organizer lib/test-pdf.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const WINANSI = { "\xE4": 228, "\xF6": 246, "\xFC": 252, "\xC4": 196, "\xD6": 214, "\xDC": 220, "\xDF": 223, "\u20AC": 128, "\u2013": 150, "\u201E": 132, "\u201C": 147, "\xB7": 183, "\xE9": 233, "\xA7": 167 };
function pdfText(s) {
  let o = "";
  for (const c of s) {
    const code = WINANSI[c] ?? c.charCodeAt(0);
    if (c === "(" || c === ")" || c === "\\") o += "\\" + c;
    else if (code > 126) o += "\\" + code.toString(8).padStart(3, "0");
    else o += c;
  }
  return o;
}
function textPdf(seiten) {
  const objekte = [];
  const seitenIds = [];
  let id = 4;
  const inhalte = [];
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
    objekte[inhaltId] = `<< /Length ${bytes} >>
stream
${c}
endstream`;
    objekte[inhaltId + 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${inhaltId} 0 R >>`;
  });
  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offs = [];
  for (let i = 1; i < objekte.length; i++) {
    offs[i] = latin1Laenge(pdf);
    pdf += `${i} 0 obj
${objekte[i]}
endobj
`;
  }
  const xref = latin1Laenge(pdf);
  pdf += `xref
0 ${objekte.length}
0000000000 65535 f 
`;
  for (let i = 1; i < objekte.length; i++) pdf += `${String(offs[i]).padStart(10, "0")} 00000 n 
`;
  pdf += `trailer
<< /Size ${objekte.length} /Root 1 0 R >>
startxref
${xref}
%%EOF
`;
  const o = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) o[i] = pdf.charCodeAt(i) & 255;
  return o;
}
const latin1Laenge = (s) => s.length;
export {
  textPdf
};
