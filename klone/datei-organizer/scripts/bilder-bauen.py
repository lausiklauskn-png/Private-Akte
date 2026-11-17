"""Erfundene Fotos für die Testdaten (einmal erzeugt und mitgeliefert; EXIF setzt scripts/testdaten-bauen.mjs).
Aufruf: python3 scripts/bilder-bauen.py"""
from PIL import Image, ImageDraw, ImageFont
import os, random
random.seed(7)
ziel = os.path.join(os.path.dirname(__file__), "bilder")
def schrift(g):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]:
        if os.path.exists(p): return ImageFont.truetype(p, g)
    return ImageFont.load_default()
def speichern(img, name): img.save(os.path.join(ziel, name), "JPEG", quality=72)
# Auto mit Kennzeichen
def auto(name, farbe, schild):
    i = Image.new("RGB", (800, 600), (150, 170, 190)); d = ImageDraw.Draw(i)
    d.rectangle([0, 420, 800, 600], fill=(90, 90, 95))
    d.rounded_rectangle([120, 200, 680, 450], 40, fill=farbe); d.rectangle([200, 140, 600, 260], fill=farbe)
    d.ellipse([170, 400, 290, 520], fill=(20, 20, 20)); d.ellipse([510, 400, 630, 520], fill=(20, 20, 20))
    d.rectangle([290, 360, 510, 410], fill=(255, 255, 255), outline=(0, 0, 0), width=3); d.rectangle([290, 360, 312, 410], fill=(0, 51, 153))
    d.text((322, 366), schild, fill=(0, 0, 0), font=schrift(32)); speichern(i, name)
auto("auto-vorne.jpg", (180, 40, 40), "BSP-FA 12"); auto("auto-parkplatz.jpg", (40, 90, 160), "BSP-FA 12")
# Zähler
for n, wert in [("zaehler-strom.jpg", "04712,3"), ("zaehler-wasser.jpg", "00381,07")]:
    i = Image.new("RGB", (600, 600), (230, 230, 225)); d = ImageDraw.Draw(i)
    d.rectangle([80, 120, 520, 480], fill=(245, 245, 245), outline=(60, 60, 60), width=4); d.rectangle([140, 220, 460, 300], fill=(20, 20, 20))
    d.text((160, 235), wert, fill=(255, 255, 255), font=schrift(44)); d.text((150, 330), "Zählernummer Z-1 2345 678", fill=(0, 0, 0), font=schrift(20)); speichern(i, n)
# Kassenbon
i = Image.new("RGB", (420, 900), (250, 250, 247)); d = ImageDraw.Draw(i)
zeilen = ["ELEKTROMARKT BEISPIEL", "Beispielweg 1, 00000 Beispielstadt", "", "Wasserkocher WK-200   29,99", "Garantie 2 Jahre", "", "SUMME EUR             29,99", "Kartenzahlung", "30.10.2026 14:12", "Bon-Nr 4711"]
for k, z in enumerate(zeilen): d.text((30, 40 + k * 34), z, fill=(30, 30, 30), font=schrift(20))
speichern(i, "kassenbon.jpg")
# abfotografierter Brief
i = Image.new("RGB", (700, 900), (120, 110, 100)); d = ImageDraw.Draw(i)
d.polygon([(70, 60), (640, 80), (620, 860), (60, 840)], fill=(250, 250, 248))
for k, z in enumerate(["Bürgeramt Beispielstadt", "", "Aufforderung zur Vorlage von Unterlagen", "Aktenzeichen AZ 12-3456/26", "Bitte reichen Sie bis 20.11.2026 ein:", "– Meldebescheinigung"]):
    d.text((110, 120 + k * 46), z, fill=(20, 20, 20), font=schrift(24 if k else 28))
speichern(i, "brief-foto.jpg")
# Urlaub / Garten / Familie (ohne Text)
for n, farbe in [("urlaub-strand.jpg", (90, 170, 220)), ("garten-beet.jpg", (70, 140, 60)), ("geburtstag.jpg", (220, 160, 80)), ("wasserschaden-kueche.jpg", (160, 150, 140)), ("typenschild-waschmaschine.jpg", (200, 200, 205))]:
    i = Image.new("RGB", (640, 480), farbe); d = ImageDraw.Draw(i)
    for _ in range(25):
        x, y, r = random.randint(0, 640), random.randint(0, 480), random.randint(10, 60)
        d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(max(0, min(255, c + random.randint(-50, 50))) for c in farbe))
    if n.startswith("typenschild"): d.rectangle([150, 160, 490, 320], fill=(240, 240, 240), outline=(0, 0, 0), width=3); d.text((170, 180), "Seriennummer SN 77-0815-42", fill=(0, 0, 0), font=schrift(22)); d.text((170, 230), "Modell WM 7 (Beispiel)", fill=(0, 0, 0), font=schrift(22))
    speichern(i, n)
print("fertig", sorted(os.listdir(ziel)))
