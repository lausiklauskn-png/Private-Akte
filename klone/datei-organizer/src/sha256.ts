/**
 * SHA-256 Stück für Stück (große Ordner, Klaus 14.11.: „Stück für Stück und wieder zusammensetzen, so wie mit den Videos“).
 * WebCrypto kann nur ganze Puffer; für Dateien über der Ladegrenze rechnet dieser Zähler über Stücke, ohne die Datei ganz zu halten.
 * In der App rechnet die Hülle selbst (FamilyFolders.pruefsumme); dieser Weg gilt im Browser und als Rückfall (Familienakte ohne pruefsumme).
 * Gleiches Ergebnis wie sha256Hex in lib/dateiart.ts (UI-Probe vergleicht mit node:crypto).
 */
const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

export class Sha256 {
  private h = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
  private block = new Uint8Array(64);
  private fuell = 0;
  private laenge = 0; // Bytes gesamt (bis 2^53 genau genug)
  private w = new Uint32Array(64);

  update(daten: Uint8Array): this {
    let i = 0;
    this.laenge += daten.length;
    if (this.fuell) {
      const n = Math.min(64 - this.fuell, daten.length);
      this.block.set(daten.subarray(0, n), this.fuell); this.fuell += n; i = n;
      if (this.fuell < 64) return this;
      this.runde(this.block, 0); this.fuell = 0;
    }
    for (; i + 64 <= daten.length; i += 64) this.runde(daten, i);
    if (i < daten.length) { this.block.set(daten.subarray(i), 0); this.fuell = daten.length - i; }
    return this;
  }

  hex(): string {
    const bits = this.laenge * 8;
    const ende = new Uint8Array(((this.fuell + 9 + 63) >> 6) << 6);
    ende.set(this.block.subarray(0, this.fuell)); ende[this.fuell] = 0x80;
    const dv = new DataView(ende.buffer);
    dv.setUint32(ende.length - 8, Math.floor(bits / 0x100000000)); dv.setUint32(ende.length - 4, bits >>> 0);
    for (let i = 0; i < ende.length; i += 64) this.runde(ende, i);
    return [...this.h].map((x) => x.toString(16).padStart(8, "0")).join("");
  }

  private runde(b: Uint8Array, o: number) {
    const w = this.w;
    for (let t = 0; t < 16; t++) w[t] = (b[o + 4 * t] << 24) | (b[o + 4 * t + 1] << 16) | (b[o + 4 * t + 2] << 8) | b[o + 4 * t + 3];
    for (let t = 16; t < 64; t++) {
      const a = w[t - 15], c = w[t - 2];
      const s0 = ((a >>> 7) | (a << 25)) ^ ((a >>> 18) | (a << 14)) ^ (a >>> 3);
      const s1 = ((c >>> 17) | (c << 15)) ^ ((c >>> 19) | (c << 13)) ^ (c >>> 10);
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0;
    }
    let [A, B, C, D, E, F, G, H] = this.h;
    for (let t = 0; t < 64; t++) {
      const S1 = ((E >>> 6) | (E << 26)) ^ ((E >>> 11) | (E << 21)) ^ ((E >>> 25) | (E << 7));
      const t1 = (H + S1 + ((E & F) ^ (~E & G)) + K[t] + w[t]) | 0;
      const S0 = ((A >>> 2) | (A << 30)) ^ ((A >>> 13) | (A << 19)) ^ ((A >>> 22) | (A << 10));
      const t2 = (S0 + ((A & B) ^ (A & C) ^ (B & C))) | 0;
      H = G; G = F; F = E; E = (D + t1) | 0; D = C; C = B; B = A; A = (t1 + t2) | 0;
    }
    const h = this.h;
    h[0] += A; h[1] += B; h[2] += C; h[3] += D; h[4] += E; h[5] += F; h[6] += G; h[7] += H;
  }
}

/** Prüfsumme über Stücke: `stueck(offset, laenge)` liefert höchstens `laenge` Bytes; leeres Stück = Ende. */
export async function sha256Stueckweise(groesse: number, stueck: (offset: number, laenge: number) => Promise<Uint8Array>, schritt = 4 * 1024 * 1024): Promise<string> {
  const h = new Sha256();
  for (let off = 0; off < groesse;) {
    const t = await stueck(off, Math.min(schritt, groesse - off));
    if (!t.length) break;
    h.update(t); off += t.length;
  }
  return h.hex();
}
