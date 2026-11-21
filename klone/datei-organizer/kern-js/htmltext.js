// Erzeugt aus Datei-Organizer lib/htmltext.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const NAMEN = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  shy: "",
  euro: "\u20AC",
  sect: "\xA7",
  copy: "\xA9",
  reg: "\xAE",
  auml: "\xE4",
  ouml: "\xF6",
  uuml: "\xFC",
  Auml: "\xC4",
  Ouml: "\xD6",
  Uuml: "\xDC",
  szlig: "\xDF",
  eacute: "\xE9",
  egrave: "\xE8",
  agrave: "\xE0",
  ndash: "\u2013",
  mdash: "\u2014",
  hellip: "\u2026",
  bdquo: "\u201E",
  ldquo: "\u201C",
  rdquo: "\u201D",
  lsquo: "\u2018",
  rsquo: "\u2019",
  laquo: "\xAB",
  raquo: "\xBB",
  middot: "\xB7",
  bull: "\u2022"
};
const zeichen = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (ganz, k) => {
  if (k[0] === "#") {
    const n = k[1] === "x" || k[1] === "X" ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10);
    return Number.isFinite(n) && n > 0 && n < 1114112 ? String.fromCodePoint(n) : ganz;
  }
  return NAMEN[k] ?? ganz;
});
function istHtml(name, text) {
  return /\.(html?|xhtml)$/i.test(name) || /^\s*(<!doctype html|<html[\s>])/i.test(text.slice(0, 500));
}
function htmlText(roh) {
  const titel = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(roh)?.[1]?.replace(/<[^>]+>/g, " ").trim() || "";
  const koerper = roh.replace(/<!--[\s\S]*?-->/g, " ").replace(/<(script|style|head|noscript|template|svg)\b[\s\S]*?<\/\1\s*>/gi, " ").replace(/<!doctype[^>]*>/gi, " ").replace(/<(br|hr)\b[^>]*>/gi, "\n").replace(/<\/(p|div|h[1-6]|li|tr|table|section|article|header|footer|blockquote|pre|ul|ol|dl|dt|dd|address)\s*>/gi, "\n").replace(/<\/(td|th)\s*>/gi, "	").replace(/<[^>]*>/g, " ");
  const text = zeichen(koerper).replace(/[ \t\u00a0]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  const t = zeichen(titel).replace(/\s+/g, " ");
  return t && !text.startsWith(t) ? `${t}

${text}` : text;
}
export {
  htmlText,
  istHtml
};
