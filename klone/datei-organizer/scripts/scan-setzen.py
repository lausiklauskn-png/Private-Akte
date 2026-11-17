"""Setzt die Textstücke eines Prüfstapels als gescannte Seiten (alles erfunden).
Je .txt entstehen <ziel>/<pfad>.pdf (Seitenbilder als PDF) und <ziel>/.seiten/<pfad>/<n>.jpg (dieselben Bilder für die Texterkennung).
Machart je Datei fest aus dem Dateinamen: Schrift, Schräglage, Rauschen; jedes fünfte Stück als Handyfoto (Tisch, Schatten, unscharf).
Kontoauszüge (Ordner bank/) in Festbreitenschrift. Aufruf: python3 scripts/scan-setzen.py <stapel> <ziel>"""
import hashlib, os, random, sys, textwrap
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

F = "/usr/share/fonts/truetype/"
SCHRIFTEN = [F + "liberation/LiberationSans-Regular.ttf", F + "liberation/LiberationSerif-Regular.ttf", F + "dejavu/DejaVuSans.ttf",
             F + "dejavu/DejaVuSerif.ttf", F + "liberation/LiberationMono-Regular.ttf"]
MONO = F + "dejavu/DejaVuSansMono.ttf"
B, H, RAND = 1654, 2339, 150  # A4 bei 200 dpi

def seiten(text, pfad, r):
    mono = pfad.startswith("bank/")
    datei = MONO if mono else r.choice(SCHRIFTEN)
    gr = 24 if mono else r.choice([26, 28, 30])
    f = ImageFont.truetype(datei, gr)
    breite = B - 2 * RAND
    zeichen = max(40, int(breite / f.getlength("n")))
    zeilen = []
    for z in text.replace("\t", "    ").split("\n"):
        if mono or f.getlength(z) <= breite: zeilen.append(z)
        else: zeilen.extend(textwrap.wrap(z, zeichen, break_long_words=False) or [""])
    zh = int(gr * 1.38); je = (H - 2 * RAND) // zh
    for i in range(0, max(1, len(zeilen)), je):
        img = Image.new("RGB", (B, H), (252, 251, 247)); d = ImageDraw.Draw(img)
        for j, z in enumerate(zeilen[i:i + je]):
            if mono and f.getlength(z) > breite: z = z[: int(breite / f.getlength("n"))]
            d.text((RAND, RAND + j * zh), z, fill=(25, 25, 30), font=f)
        yield img

def altern(img, r, foto):
    img = img.rotate(r.uniform(-4, 4) if foto else r.uniform(-1.2, 1.2), resample=Image.BICUBIC, expand=foto, fillcolor=(250, 249, 245))
    if foto:
        tisch = Image.new("RGB", (img.width + 260, img.height + 260), (r.randint(70, 140), r.randint(60, 110), r.randint(50, 90)))
        tisch.paste(img, (130, 130)); img = tisch
        schatten = Image.linear_gradient("L").resize(img.size).rotate(r.choice([0, 90, 180, 270]))
        img = Image.composite(img, ImageEnhance.Brightness(img).enhance(0.72), schatten)
        img = img.filter(ImageFilter.GaussianBlur(r.uniform(0.8, 1.4))).resize((int(img.width * 0.8), int(img.height * 0.8)))
    else:
        img = img.filter(ImageFilter.GaussianBlur(r.uniform(0.3, 0.7)))
        img = ImageEnhance.Contrast(img).enhance(r.uniform(0.82, 1.0))
    rausch = Image.effect_noise(img.size, r.uniform(6, 14)).convert("RGB")
    return Image.blend(img, rausch, 0.10 if foto else 0.06)

stapel, ziel = sys.argv[1].rstrip("/"), sys.argv[2].rstrip("/")
n = fotos = blatt = 0
for wurzel, _, namen in os.walk(stapel):
    for name in sorted(namen):
        if not name.endswith(".txt"): continue
        voll = os.path.join(wurzel, name); pfad = os.path.relpath(voll, stapel)
        r = random.Random(int(hashlib.sha256(pfad.encode()).hexdigest()[:12], 16))
        foto = r.random() < 0.2 and not pfad.startswith("bank/")
        bilder = [altern(s, r, foto) for s in seiten(open(voll, encoding="utf-8").read(), pfad, r)]
        sd = os.path.join(ziel, ".seiten", pfad); os.makedirs(sd, exist_ok=True); os.makedirs(os.path.dirname(os.path.join(ziel, pfad)), exist_ok=True)
        for i, b in enumerate(bilder): b.save(os.path.join(sd, f"{i + 1}.jpg"), quality=60 if foto else 78)
        bilder[0].save(os.path.join(ziel, pfad[:-4] + ".pdf"), save_all=True, append_images=bilder[1:], resolution=200, quality=78)
        n += 1; fotos += foto; blatt += len(bilder)
print(f"{n} Stücke, {blatt} Seiten, davon {fotos} als Handyfoto → {ziel}")
