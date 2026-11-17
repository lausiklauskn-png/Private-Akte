// Gemeinsame Rechnung für die Blindtests: Wilson-Spanne und exakter McNemar-Test.
/** 95-%-Spanne nach Wilson */
export function wilson(ok, n, z = 1.96) {
  if (!n) return null;
  const p = ok / n, d = 1 + (z * z) / n, m = (p + (z * z) / (2 * n)) / d, h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
  return [Math.max(0, m - h), Math.min(1, m + h)];
}
/** McNemar exakt (zweiseitig, Binomial): b = nur A richtig, c = nur B richtig */
export function mcnemar(b, c) {
  const n = b + c; if (!n) return 1;
  const k = Math.min(b, c); let p = 0;
  for (let i = 0; i <= k; i++) { let x = 1; for (let j = 0; j < i; j++) x = (x * (n - j)) / (j + 1); p += x / 2 ** n; }
  return Math.min(1, 2 * p);
}
