# Varianten der Vorverarbeitung vor der Texterkennung (Versuch Teil 2): liest PNG, schreibt Varianten
import sys, numpy as np
from PIL import Image, ImageOps, ImageFilter
def otsu(a):
    h = np.bincount(a.ravel(), minlength=256).astype(float); p = h / h.sum(); w = np.cumsum(p); m = np.cumsum(p * np.arange(256)); mt = m[-1]
    s = (mt * w - m) ** 2 / (w * (1 - w) + 1e-9); return int(np.argmax(s))
def schatten_weg(g):
    # Hintergrund schätzen (großer Weichzeichner) und herausteilen: gleicht Schatten und Verlauf aus
    bg = g.filter(ImageFilter.GaussianBlur(25)); a = np.asarray(g).astype(float); b = np.asarray(bg).astype(float) + 1
    return Image.fromarray(np.clip(a / b * 235, 0, 255).astype(np.uint8))
def schraeg(g):
    # Schräglage über die Varianz der Zeilenprojektion schätzen (−5°…5°)
    k = g.resize((g.width // 4, g.height // 4)); a = 255 - np.asarray(k).astype(float); best, bw = 0, -1
    for w in np.arange(-5, 5.01, 0.5):
        r = np.asarray(Image.fromarray(a.astype(np.uint8)).rotate(w, fillcolor=0)).sum(1); v = r.var()
        if v > bw: best, bw = w, v
    return g.rotate(best, resample=Image.BICUBIC, fillcolor=255, expand=False), best
if sys.argv[1] == "--pgm":  # Bild → Graustufen-PGM (für die JS-Fassung in src/vorverarbeitung.ts)
    ImageOps.grayscale(Image.open(sys.argv[2])).save(sys.argv[3]); sys.exit(0)
if sys.argv[1] == "--png":
    Image.open(sys.argv[2]).save(sys.argv[3]); sys.exit(0)
src, ziel = sys.argv[1], sys.argv[2]
g = ImageOps.grayscale(Image.open(src))
if g.width < 1400: g = g.resize((g.width * 2, g.height * 2), Image.LANCZOS)
v = {}
v["a_grau"] = ImageOps.autocontrast(g, cutoff=1)
v["b_schatten"] = ImageOps.autocontrast(schatten_weg(g), cutoff=1)
s, w = schraeg(v["b_schatten"]); v["c_schatten_gerade"] = s
a = np.asarray(s); t = otsu(a); v["d_binaer"] = Image.fromarray(((a > t) * 255).astype(np.uint8))
for k, im in v.items(): im.save(f"{ziel}_{k}.png")
print(w)
