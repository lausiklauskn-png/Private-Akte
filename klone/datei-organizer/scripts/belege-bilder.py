"""Gescannte/fotografierte Belege und Fotos für die Haushalt-Testdaten (alles erfunden).
Liest eine JSON-Liste [{datei, art, zeilen, drehung, rauschen, hell}] und schreibt JPEGs.
Kassenbon: schmaler Thermopapier-Streifen; Schild/Plakat: Foto mit Hintergrund; Landschaft: ohne Text.
Aufruf (vom Node-Generator): python3 scripts/belege-bilder.py auftrag.json"""
import json, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def schrift(groesse, fett=False):
    for p in (["/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"] if fett else []) + ["/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"]:
        try:
            return ImageFont.truetype(p, groesse)
        except OSError:
            pass
    return ImageFont.load_default()

def kassenbon(a, r):
    zeilen = a["zeilen"]
    klein = a.get("klein")  # langer Bon vom Großeinkauf: kleine Schrift, schmal
    b, zh = (440, 19) if klein else (520, 30)
    papier = Image.new("RGB", (b, 60 + zh * len(zeilen)), (248, 246, 240))
    d = ImageDraw.Draw(papier)
    for i, z in enumerate(zeilen):
        fett = z.startswith("# ")
        t = z[2:] if fett else z
        f = schrift((18 if fett else 14) if klein else (26 if fett else 22), fett)
        x = (b - d.textlength(t, font=f)) / 2 if fett else (14 if klein else 24)
        d.text((x, 30 + i * zh), t, fill=(30, 30, 30), font=f)
    hg = Image.new("RGB", (papier.width + 220, papier.height + 220), tuple(int(c) for c in a.get("tisch", (120, 110, 100))))
    hg.paste(papier, (110, 110))
    return hg

def schild(a, r):
    img = Image.new("RGB", (1200, 900), (90 + r.randint(0, 60), 100, 110))
    d = ImageDraw.Draw(img)
    for _ in range(25):  # Hintergrund (Ausstellungsraum)
        x, y = r.randint(0, 1200), r.randint(0, 900)
        d.rectangle([x, y, x + r.randint(40, 200), y + r.randint(20, 120)], fill=(r.randint(60, 200),) * 3)
    d.rectangle([200, 150, 1000, 750], fill=(250, 250, 250), outline=(20, 60, 120), width=8)
    for i, z in enumerate(a["zeilen"]):
        fett = z.startswith("# ")
        t = z[2:] if fett else z
        f = schrift(44 if fett else 34, fett)
        d.text((240, 190 + i * 62), t, fill=(20, 20, 20), font=f)
    return img

def blatt(a, r):
    b, zh = 1240, 38
    papier = Image.new("RGB", (b, max(1754, 140 + zh * len(a["zeilen"]))), (252, 252, 250))
    d = ImageDraw.Draw(papier)
    for i, z in enumerate(a["zeilen"]):
        fett = z.startswith("# ")
        t = z[2:] if fett else z
        d.text((90, 90 + i * zh), t, fill=(25, 25, 25), font=schrift(30 if fett else 24, fett))
    hg = Image.new("RGB", (papier.width + 120, papier.height + 120), tuple(int(c) for c in a.get("tisch", (120, 110, 100))))
    hg.paste(papier, (60, 60))
    return hg

def landschaft(a, r):
    img = Image.new("RGB", (1200, 900))
    d = ImageDraw.Draw(img)
    for y in range(900):
        d.line([(0, y), (1200, y)], fill=(100 + y // 12, 150 + y // 20, 220 - y // 8) if y < 520 else (60, 120 + (y % 40), 60))
    for _ in range(12):
        x = r.randint(0, 1200)
        d.ellipse([x, 420, x + r.randint(80, 220), 560], fill=(30, 90 + r.randint(0, 60), 40))
    return img

def main():
    auftrag = json.load(open(sys.argv[1], encoding="utf-8"))
    for a in auftrag:
        r = random.Random(a["datei"])
        img = {"kassenbon": kassenbon, "schild": schild, "landschaft": landschaft, "blatt": blatt}[a["art"]](a, r)
        if a.get("drehung"):
            img = img.rotate(a["drehung"], expand=True, fillcolor=(80, 80, 80))
        if a.get("rauschen"):
            img = img.filter(ImageFilter.GaussianBlur(a["rauschen"]))
        if a.get("hell"):
            img = img.point(lambda v: min(255, int(v * a["hell"])))
        img.save(a["ziel"], "JPEG", quality=80)

main()
