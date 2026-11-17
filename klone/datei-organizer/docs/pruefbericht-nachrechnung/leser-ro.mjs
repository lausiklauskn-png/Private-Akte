// read-only Leser: nur aus .ocr-cache.json, keine Erkennung, nichts schreiben
import { readFileSync, writeFileSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path"; import { tmpdir } from "node:os"; import { execFileSync } from "node:child_process"; import { createHash } from "node:crypto";
const R = "/home/user/Datei-Organizer";
const { pdfTextLesen } = await import(R + "/lib/pdf-text.ts");
const cache = JSON.parse(readFileSync(R + "/.ocr-cache.json", "utf8"));
export const st = { miss: 0 };
let pdfjs; async function pj() { if (!pdfjs) { pdfjs = await import(R + "/node_modules/pdfjs-dist/legacy/build/pdf.mjs"); pdfjs.GlobalWorkerOptions.workerSrc = R + "/node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"; } return pdfjs; }
export async function ocr(bytes) { const k = createHash("sha256").update(bytes).digest("hex"); if (k in cache) return cache[k]; st.miss++; return ""; }
export function pdfLeser() { return async (bytes) => { const t = await pdfTextLesen(await pj(), bytes); if (t.voll.trim()) return t;
  const k = "scanpdf:" + createHash("sha256").update(bytes).digest("hex"); let text = cache[k]; if (text === undefined) { st.miss++; text = ""; }
  return (text.match(/[A-Za-zÄÖÜäöüß]{3,}/g) || []).length >= 4 ? { kopf: text.slice(0, 1500), voll: text } : t; }; }
