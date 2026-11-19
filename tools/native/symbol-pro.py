#!/usr/bin/env python3
"""App-Symbol der Pro-Akte ohne weißen Rand (Klaus 19.11.2026, Vorschau docs/vorschau-symbol-2026-11-19.png).
Aus bilder/logo-pro-rund.png: Vordergrund = das Zeichen, etwas größer als die sichtbare Fläche (Rand weich abgeschnitten);
Hintergrund = die Farben des äußeren Rings je Winkel nach außen fortgesetzt. So bleibt bei runder wie bei abgerundet-eckiger
Maske (Samsung) kein weißer Rand. Schreibt alle mipmap-Größen.   python3 tools/native/symbol-pro.py"""
import math, os
from PIL import Image, ImageDraw, ImageFilter, ImageChops

WURZEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
LOGO = Image.open(os.path.join(WURZEL, 'bilder', 'logo-pro-rund.png')).convert('RGBA')
RES = os.path.join(WURZEL, 'android', 'app', 'src', 'main', 'res')
GROESSEN = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}

def ebenen(n, anteil=304 / 432):
    d = round(n * anteil)
    zeichen = LOGO.resize((d, d), Image.LANCZOS)
    m = Image.new('L', (d, d), 0); ImageDraw.Draw(m).ellipse([d * 0.02, d * 0.02, d * 0.98, d * 0.98], fill=255)
    zeichen.putalpha(ImageChops.multiply(zeichen.getchannel('A'), m.filter(ImageFilter.GaussianBlur(d * 0.004))))
    vorder = Image.new('RGBA', (n, n), (0, 0, 0, 0)); vorder.alpha_composite(zeichen, ((n - d) // 2, (n - d) // 2))
    quelle = LOGO.resize((512, 512), Image.LANCZOS).convert('RGB'); r = 0.487 * 512
    hinter = Image.new('RGB', (n, n)); px = hinter.load()
    for y in range(n):
        for x in range(n):
            a = math.atan2(y - n / 2, x - n / 2)
            px[x, y] = quelle.getpixel((int(256 + r * math.cos(a)), int(256 + r * math.sin(a))))
    return hinter.filter(ImageFilter.GaussianBlur(n / 150)), vorder

def alt(hinter, vorder, groesse, rund):
    """Symbol für Android vor 8 (ohne adaptive Symbole): sichtbare Fläche 72 von 108 dp, rund bzw. abgerundet."""
    n = hinter.size[0]; v = n // 6
    bild = hinter.convert('RGBA'); bild.alpha_composite(vorder); bild = bild.crop((v, v, n - v, n - v)).resize((groesse, groesse), Image.LANCZOS)
    m = Image.new('L', (groesse * 4, groesse * 4), 0); dr = ImageDraw.Draw(m)
    if rund: dr.ellipse([0, 0, groesse * 4 - 1, groesse * 4 - 1], fill=255)
    else: dr.rounded_rectangle([0, 0, groesse * 4 - 1, groesse * 4 - 1], radius=groesse * 4 * 0.22, fill=255)
    aus = Image.new('RGBA', (groesse, groesse), (0, 0, 0, 0)); aus.paste(bild, (0, 0), m.resize((groesse, groesse), Image.LANCZOS)); return aus

for name, f in GROESSEN.items():
    hinter, vorder = ebenen(round(108 * f))
    ordner = os.path.join(RES, 'mipmap-' + name)
    hinter.save(os.path.join(ordner, 'ic_launcher_background.png'), optimize=True)
    vorder.save(os.path.join(ordner, 'ic_launcher_foreground.png'), optimize=True)
    alt(hinter, vorder, round(48 * f), False).save(os.path.join(ordner, 'ic_launcher.png'), optimize=True)
    alt(hinter, vorder, round(48 * f), True).save(os.path.join(ordner, 'ic_launcher_round.png'), optimize=True)
    print('mipmap-' + name, round(108 * f))
