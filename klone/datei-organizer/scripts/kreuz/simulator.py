#!/usr/bin/env python3
"""Eigener Scan- und Foto-Simulator fuer den Kreuztest.

Aufruf:
  python3 simulator.py <eingangsordner> <ausgabeordner> [--nur NAME ...] [--jobs N]

Aus jeder .txt (oberste Ebene) entsteht ein Seitenbild mit eigenem Seitenaufbau
(Briefkopf, Anschriftfeld, Tabellen, Kassenbon, Mail-Ausdruck, Portal-Ausdruck),
das anschliessend mit Geraete-Fehlerbildern verschlechtert wird. Alles ist ueber
den Dateinamen fest (deterministisch).
"""
import sys, os, re, json, math, hashlib, io, random, argparse
from functools import lru_cache
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# --------------------------------------------------------------------------------------------
# Schriften
# --------------------------------------------------------------------------------------------
FD = '/usr/share/fonts/'
FAM = {
    'LiberationSerif': ('truetype/liberation/LiberationSerif-Regular.ttf', 'truetype/liberation/LiberationSerif-Bold.ttf', 'truetype/liberation/LiberationSerif-Italic.ttf'),
    'FreeSerif': ('truetype/freefont/FreeSerif.ttf', 'truetype/freefont/FreeSerifBold.ttf', 'truetype/freefont/FreeSerifItalic.ttf'),
    'DejaVuSerif': ('truetype/dejavu/DejaVuSerif.ttf', 'truetype/dejavu/DejaVuSerif-Bold.ttf', 'truetype/dejavu/DejaVuSerif.ttf'),
    'Caladea': ('truetype/crosextra/Caladea-Regular.ttf', 'truetype/crosextra/Caladea-Bold.ttf', 'truetype/crosextra/Caladea-Italic.ttf'),
    'LiberationSans': ('truetype/liberation/LiberationSans-Regular.ttf', 'truetype/liberation/LiberationSans-Bold.ttf', 'truetype/liberation/LiberationSans-Italic.ttf'),
    'FreeSans': ('truetype/freefont/FreeSans.ttf', 'truetype/freefont/FreeSansBold.ttf', 'truetype/freefont/FreeSansOblique.ttf'),
    'DejaVuSans': ('truetype/dejavu/DejaVuSans.ttf', 'truetype/dejavu/DejaVuSans-Bold.ttf', 'truetype/dejavu/DejaVuSans.ttf'),
    'Carlito': ('truetype/crosextra/Carlito-Regular.ttf', 'truetype/crosextra/Carlito-Bold.ttf', 'truetype/crosextra/Carlito-Italic.ttf'),
    'Inter': ('opentype/inter/Inter-Regular.otf', 'opentype/inter/Inter-Bold.otf', 'opentype/inter/Inter-Italic.otf'),
    'FreeMono': ('truetype/freefont/FreeMono.ttf', 'truetype/freefont/FreeMonoBold.ttf', 'truetype/freefont/FreeMonoOblique.ttf'),
    'LiberationMono': ('truetype/liberation/LiberationMono-Regular.ttf', 'truetype/liberation/LiberationMono-Bold.ttf', 'truetype/liberation/LiberationMono-Italic.ttf'),
    'DejaVuSansMono': ('truetype/dejavu/DejaVuSansMono.ttf', 'truetype/dejavu/DejaVuSansMono-Bold.ttf', 'truetype/dejavu/DejaVuSansMono-Oblique.ttf'),
    'JetBrainsMono': ('truetype/jetbrains-mono/JetBrainsMono-Regular.ttf', 'truetype/jetbrains-mono/JetBrainsMono-Bold.ttf', 'truetype/jetbrains-mono/JetBrainsMono-Italic.ttf'),
}
SERIF = ['LiberationSerif', 'FreeSerif', 'DejaVuSerif', 'Caladea']
SANS = ['LiberationSans', 'FreeSans', 'DejaVuSans', 'Carlito', 'Inter']
MONO = ['FreeMono', 'LiberationMono', 'DejaVuSansMono', 'JetBrainsMono']
WORDMARK = ['opentype/inter/Inter-Black.otf', 'opentype/inter/InterDisplay-ExtraBold.otf', 'truetype/crosextra/Caladea-BoldItalic.ttf',
            'truetype/liberation/LiberationSerif-Bold.ttf', 'truetype/freefont/FreeSansBold.ttf', 'opentype/inter/InterDisplay-Light.otf',
            'truetype/crosextra/Carlito-BoldItalic.ttf', 'truetype/freefont/FreeSerifBoldItalic.ttf', 'truetype/dejavu/DejaVuSans-Bold.ttf']
HAND = ['truetype/freefont/FreeSansOblique.ttf', 'truetype/liberation/LiberationSerif-Italic.ttf', 'truetype/crosextra/Caladea-Italic.ttf']


@lru_cache(maxsize=512)
def font(path, px):
    return ImageFont.truetype(FD + path if not path.startswith('/') else path, max(6, int(round(px))))


# --------------------------------------------------------------------------------------------
# Text lesen und einordnen
# --------------------------------------------------------------------------------------------
RE_TAB = re.compile(r'\t|\s{3,}')
RE_PREIS = re.compile(r'-?\d+,\d\d(\s*[A-D])?\s*$')
RE_PLZ = re.compile(r'\b\d{5}\b')
RE_KV = re.compile(r'^[^:]{2,34}:\s*\S')
RE_NUM = re.compile(r'^[-+–]?\s*[\d.,]+\s*(EUR|€|%|DM|l|kg|kWh|m³|Stk\.?)?$')


def lese(path):
    t = open(path, encoding='utf-8').read().replace('\r', '').replace('\f', '\n')
    lines = [l.rstrip() for l in t.split('\n')]
    while lines and not lines[-1].strip():
        lines.pop()
    while lines and not lines[0].strip():
        lines.pop(0)
    return lines


def paragraphs(lines):
    out, cur = [], []
    for l in lines:
        if l.strip():
            cur.append(l)
        elif cur:
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    return out


def dokart(name, lines):
    first = lines[0] if lines else ''
    if first.startswith('Von:') or first.startswith('From:'):
        return 'mail'
    preis = sum(1 for l in lines if RE_PREIS.search(l))
    lang = max(len(l) for l in lines) if lines else 0
    brief = any(re.search(r'Sehr geehrt|Liebe |Hallo ', l) for l in lines)
    n = max(1, sum(1 for l in lines if l.strip()))
    kv = sum(1 for l in lines if RE_KV.match(l))
    if not brief and preis >= 3 and lang <= 48 and preis / n >= 0.3 and kv < 3:
        return 'bon'
    if re.search(r'bon\b|ebon', name.lower()) and not brief and lang <= 52:
        return 'bon'
    if re.search(r'\b(APP|PORTAL|ONLINE|POSTFACH|KUNDENBEREICH|DIGITAL|ONLINEDIENSTE|SERVICEPORTAL|ONLINE-SERVICE|MIETERPORTAL)\b', first.upper()) \
            and (first == first.upper() or re.search(r'App|Portal|Postfach', first)):
        return 'portal'
    return 'brief'


# --------------------------------------------------------------------------------------------
# Seiten-Zeichner
# --------------------------------------------------------------------------------------------
PAPIER = {
    'weiss': (252, 252, 250), 'creme': (250, 246, 234), 'vergilbt': (238, 226, 192), 'recycling': (228, 226, 218),
    'blau': (226, 236, 246), 'gruen': (230, 243, 228), 'rosa': (248, 230, 234), 'gelb': (250, 244, 205),
}
FARBEN = [(0, 70, 140), (170, 20, 30), (0, 110, 70), (40, 40, 40), (200, 90, 0), (90, 30, 120), (0, 120, 150), (120, 80, 20), (20, 60, 90)]


class Seiten:
    """Sammelt Seiten (RGBA) und Zeilenkaesten fuer spaetere Anmerkungen."""

    def __init__(self, w_mm, h_mm, dpi, papier, rng):
        self.dpi, self.w_mm, self.h_mm = dpi, w_mm, h_mm
        self.W, self.H = int(round(w_mm * dpi / 25.4)), int(round(h_mm * dpi / 25.4))
        self.papier, self.rng = papier, rng
        self.pages, self.boxes = [], []
        self.neu()

    def mm(self, v):
        return v * self.dpi / 25.4

    def pt(self, v):
        return v * self.dpi / 72.0

    def neu(self):
        im = Image.new('RGBA', (self.W, self.H), self.papier + (255,))
        self.pages.append(im); self.boxes.append([])
        self.d = ImageDraw.Draw(im)
        self.im = im

    def text(self, xy, s, f, fill=(20, 20, 20), merke=True):
        self.d.text(xy, s, font=f, fill=fill)
        if merke and s.strip():
            b = self.d.textbbox(xy, s, font=f)
            self.boxes[-1].append(b)


def wrap(s, f, width):
    if f.getlength(s) <= width:
        return [s]
    words, out, cur = s.split(' '), [], ''
    for w in words:
        t = (cur + ' ' + w) if cur else w
        if f.getlength(t) <= width or not cur:
            cur = t
        else:
            out.append(cur); cur = w
    if cur:
        out.append(cur)
    return out


def bildmarke(d, x, y, s, farbe, farbe2, rng):
    """Bildmarke ohne Buchstaben in einem Quadrat der Kante s."""
    k = rng.randrange(7)
    if k == 0:  # Kreis mit Ring
        d.ellipse([x, y, x + s, y + s], fill=farbe)
        d.ellipse([x + s * .25, y + s * .25, x + s * .75, y + s * .75], fill=farbe2)
    elif k == 1:  # Streifen schraeg
        for i in range(4):
            o = i * s / 4
            d.polygon([(x + o, y + s), (x + o + s / 8, y + s), (x + o + s / 2.2, y), (x + o + s / 2.2 - s / 8, y)], fill=farbe if i % 2 == 0 else farbe2)
    elif k == 2:  # drei Balken
        for i, h in enumerate([.45, .75, 1.0]):
            d.rectangle([x + i * s / 3 + 2, y + s * (1 - h), x + (i + 1) * s / 3 - 2, y + s], fill=farbe if i != 1 else farbe2)
    elif k == 3:  # Dreieck und Kreis
        d.polygon([(x, y + s), (x + s / 2, y), (x + s, y + s)], fill=farbe)
        d.ellipse([x + s * .55, y + s * .05, x + s * .95, y + s * .45], fill=farbe2)
    elif k == 4:  # Quadrate versetzt
        d.rectangle([x, y, x + s * .62, y + s * .62], fill=farbe)
        d.rectangle([x + s * .38, y + s * .38, x + s, y + s], fill=farbe2)
    elif k == 5:  # Welle aus Boegen
        for i in range(3):
            d.arc([x, y + i * s / 4, x + s, y + s / 2 + i * s / 4], 180, 360, fill=farbe if i % 2 == 0 else farbe2, width=max(2, int(s / 12)))
    else:  # Raute mit Punkt
        d.polygon([(x + s / 2, y), (x + s, y + s / 2), (x + s / 2, y + s), (x, y + s / 2)], fill=farbe)
        d.ellipse([x + s * .4, y + s * .4, x + s * .6, y + s * .6], fill=farbe2)


def hell(c, f=0.55):
    return tuple(int(v + (255 - v) * f) for v in c)


class Stil:
    def __init__(self, rng, name, lines):
        alt = bool(re.search(r'\b(19[89]\d|200[0-6])\b', name + ' ' + ' '.join(lines[:15])))
        r = rng.random()
        if alt and r < 0.45:
            self.fam = rng.choice(['FreeMono', 'LiberationMono'])  # Schreibmaschine
        elif r < 0.5:
            self.fam = rng.choice(SERIF)
        else:
            self.fam = rng.choice(SANS)
        self.reg, self.bold, self.ital = FAM[self.fam]
        self.size = rng.uniform(9.5, 11.0) if 'Mono' not in self.fam else rng.uniform(9.0, 10.0)
        self.farbe = rng.choice(FARBEN)
        self.farbe2 = rng.choice([c for c in FARBEN if c != self.farbe])
        self.wm = rng.choice(WORDMARK)
        self.kopf = rng.choice(['links', 'rechts', 'band', 'balken-links', 'mitte'])
        self.tabelle = rng.choice(['gitter', 'grau-kopf', 'zebra', 'linien', 'kasten'])
        self.zeilen = rng.uniform(1.22, 1.42)
        self.gross = rng.random() < 0.5


def zeichne_tabelle(S, st, rows, x0, width, y):
    """rows: Liste (zellen, eingerueckt). Gibt neues y zurueck."""
    ncol = max(len(c) for c, _ in rows)
    size = S.pt(st.size * 0.95)
    for _ in range(12):
        f = font(st.reg, size); fb = font(st.bold, size)
        maxw = [0] * ncol
        for cells, ein in rows:
            off = ncol - len(cells) if ein else 0
            for i, c in enumerate(cells):
                if len(cells) == ncol or ein:
                    maxw[i + off] = max(maxw[i + off], f.getlength(c))
        pad = S.mm(2.2)
        need = sum(maxw) + pad * 2 * ncol
        if need <= width or size <= S.pt(6.5):
            break
        size *= 0.93
    f = font(st.reg, size); fb = font(st.bold, size)
    extra = max(0, (width - need)) / max(1, ncol)
    colw = [m + 2 * pad + extra for m in maxw]
    if sum(colw) > width:  # zu breit: nicht aufblaehen
        colw = [m + 2 * pad for m in maxw]
    lh = size * 1.55
    xs = [x0]
    for w in colw:
        xs.append(xs[-1] + w)
    tw = xs[-1] - x0
    for ri, (cells, ein) in enumerate(rows):
        if y + lh > S.H - S.mm(28):
            S.neu(); y = S.mm(25)
        kopf = ri == 0 and not any(re.search(r'\d', c) for c in cells) and len(cells) == ncol
        d = S.d
        if st.tabelle == 'grau-kopf' and kopf:
            d.rectangle([x0, y, x0 + tw, y + lh], fill=hell(st.farbe, 0.8))
        if st.tabelle == 'zebra' and ri % 2 == 1:
            d.rectangle([x0, y, x0 + tw, y + lh], fill=(232, 232, 232))
        if st.tabelle == 'gitter':
            for i in range(ncol):
                d.rectangle([xs[i], y, xs[i + 1], y + lh], outline=(90, 90, 90), width=max(1, int(S.pt(0.5))))
        if st.tabelle == 'linien' or (st.tabelle == 'grau-kopf' and kopf):
            d.line([x0, y + lh, x0 + tw, y + lh], fill=(110, 110, 110), width=max(1, int(S.pt(0.6))))
        off = ncol - len(cells) if ein else 0
        for i, c in enumerate(cells):
            ci = i + off
            ff = fb if kopf or (ein and re.search(r'(?i)gesamt|summe|betrag|total', ' '.join(cells))) else f
            tlen = ff.getlength(c)
            if RE_NUM.match(c.strip()) or (ein and i == len(cells) - 1):
                tx = xs[ci + 1] - pad - tlen
            else:
                tx = xs[ci] + pad
            S.text((tx, y + lh * 0.18), c, ff)
        y += lh
    if st.tabelle == 'kasten':
        top = y - lh * len(rows)
        if top > 0:
            S.d.rectangle([x0, top, x0 + tw, y], outline=(70, 70, 70), width=max(1, int(S.pt(0.7))))
    return y + S.pt(st.size * 0.6)


def ist_tabzeile(l):
    cells = [c for c in RE_TAB.split(l.strip()) if c.strip()]
    return len(cells) >= 2, cells


def body_rendern(S, st, paras, x0, width, y, bottom, betreff_frei=True):
    f = font(st.reg, S.pt(st.size)); fb = font(st.bold, S.pt(st.size)); fi = font(st.ital, S.pt(st.size))
    lh = S.pt(st.size) * st.zeilen
    for p in paras:
        i = 0
        while i < len(p):
            l = p[i]
            istab, cells = ist_tabzeile(l)
            if istab:
                rows = []
                while i < len(p):
                    t, c = ist_tabzeile(p[i])
                    if not t:
                        break
                    rows.append((c, p[i].startswith(' ') or p[i].startswith('\t')))
                    i += 1
                y = zeichne_tabelle(S, st, rows, x0, width, y)
                continue
            if re.fullmatch(r'\s*[-=_*]{5,}\s*', l):
                if y + lh > bottom:
                    S.neu(); y = S.mm(25)
                S.d.line([x0, y + lh / 2, x0 + width, y + lh / 2], fill=(60, 60, 60), width=max(1, int(S.pt(0.6))))
                y += lh; i += 1
                continue
            kopfz = len(p) == 1 and len(l) <= 75 and not re.search(r'[.,;:]$', l) and not RE_KV.match(l) and not l.startswith('>')
            ff, col, ind = f, (20, 20, 20), 0
            if l.startswith('>'):
                ff, col, ind = fi, (95, 95, 95), S.mm(4)
            if kopfz:
                if betreff_frei:
                    ff = font(st.bold, S.pt(st.size + 1.5)); betreff_frei = False
                    col = st.farbe if st.gross else (10, 10, 10)
                else:
                    ff = fb
            parts = wrap(l.strip() if not l.startswith('>') else l, ff, width - ind)
            for part in parts:
                if y + lh > bottom:
                    S.neu(); y = S.mm(25)
                S.text((x0 + ind, y), part, ff, fill=col)
                y += lh
            i += 1
        y += lh * 0.6
    return y


def kopf_brief(S, st, wm, zusatz, rng):
    """Briefkopf mit Wortmarke und Bildmarke. Gibt y des Kopfendes zurueck."""
    d = S.d
    W = S.W
    wmtext = wm.upper() if st.gross and len(wm) < 34 else wm
    ws = S.pt(rng.uniform(15, 22))
    fw = font(st.wm, ws)
    while fw.getlength(wmtext) > S.W - S.mm(70) and ws > S.pt(10):
        ws *= 0.92; fw = font(st.wm, ws)
    logo = S.mm(rng.uniform(13, 20))
    fz = font(st.reg, S.pt(st.size - 1.5))
    if st.kopf == 'band':
        d.rectangle([0, 0, W, S.mm(30)], fill=st.farbe)
        bildmarke(d, S.mm(20), S.mm(7), S.mm(16), hell(st.farbe, 0.7), (255, 255, 255), rng)
        S.text((S.mm(42), S.mm(9)), wmtext, fw, fill=(255, 255, 255))
        y = S.mm(34)
        for z in zusatz:
            S.text((S.mm(42), y), z, fz, fill=(70, 70, 70)); y += S.pt(st.size + 1)
        return max(y, S.mm(40))
    if st.kopf == 'balken-links':
        d.rectangle([0, 0, S.mm(9), S.H], fill=hell(st.farbe, 0.15))
        d.rectangle([S.mm(9), 0, S.mm(11), S.H], fill=hell(st.farbe2, 0.4))
        bildmarke(d, S.W - S.mm(20) - logo, S.mm(12), logo, st.farbe, st.farbe2, rng)
        S.text((S.mm(25), S.mm(14)), wmtext, fw, fill=st.farbe)
    elif st.kopf == 'rechts':
        tw = fw.getlength(wmtext)
        bildmarke(d, S.W - S.mm(20) - logo, S.mm(10), logo, st.farbe, st.farbe2, rng)
        S.text((S.W - S.mm(24) - logo - tw, S.mm(12)), wmtext, fw, fill=st.farbe)
        d.rectangle([S.mm(25), S.mm(10) + logo + S.mm(3), S.W - S.mm(20), S.mm(10) + logo + S.mm(3.8)], fill=st.farbe2)
    elif st.kopf == 'mitte':
        tw = fw.getlength(wmtext)
        bildmarke(d, (S.W - logo) / 2, S.mm(8), logo, st.farbe, st.farbe2, rng)
        S.text(((S.W - tw) / 2, S.mm(10) + logo), wmtext, fw, fill=st.farbe)
    else:  # links
        bildmarke(d, S.mm(25), S.mm(10), logo, st.farbe, st.farbe2, rng)
        S.text((S.mm(29) + logo, S.mm(10) + logo / 2 - ws / 2), wmtext, fw, fill=st.farbe)
        d.rectangle([S.mm(25), S.mm(13) + logo, S.mm(110), S.mm(13.6) + logo], fill=st.farbe)
    y = S.mm(14) + logo + (ws if st.kopf == 'mitte' else 0)
    for z in zusatz:
        tw = fz.getlength(z)
        x = S.mm(25) if st.kopf in ('links', 'balken-links') else (S.W - S.mm(20) - tw if st.kopf == 'rechts' else (S.W - tw) / 2)
        S.text((x, y), z, fz, fill=(70, 70, 70)); y += S.pt(st.size + 1)
    return max(y, S.mm(38))


def wasserzeichen(S, st, rng):
    """Blasse Bildmarke oder Stempelwort in Seitenmitte (vor dem Text)."""
    lay = Image.new('RGBA', S.im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    if rng.random() < 0.6:
        s = S.mm(rng.uniform(80, 120))
        bildmarke(d, (S.W - s) / 2, (S.H - s) / 2, s, st.farbe + (26,), st.farbe2 + (20,), rng)
        art = 'wasserzeichen-bildmarke'
    else:
        wort = rng.choice(['KOPIE', 'DUPLIKAT', 'ENTWURF', 'ZWEITSCHRIFT'])
        f = font('truetype/liberation/LiberationSans-Bold.ttf', S.mm(28))
        t = Image.new('RGBA', (int(f.getlength(wort)) + 20, int(S.mm(36))), (0, 0, 0, 0))
        ImageDraw.Draw(t).text((10, 0), wort, font=f, fill=(150, 150, 150, 45))
        t = t.rotate(rng.uniform(25, 45), expand=True, resample=Image.BICUBIC)
        lay.paste(t, ((S.W - t.width) // 2, (S.H - t.height) // 2), t)
        art = 'wasserzeichen-wort-' + wort
    for p in S.pages:
        p.alpha_composite(lay)
    return art


def rendere_brief(lines, S, st, rng, deko):
    paras = paragraphs(lines)
    head = paras.pop(0) if paras else ['']
    wm = head[0]
    zusatz = head[1:]
    rueck = None
    if zusatz and '·' in zusatz[0] and rng.random() < 0.75:
        rueck = zusatz.pop(0)
    anschrift = None
    if paras and 2 <= len(paras[0]) <= 7 and max(len(l) for l in paras[0]) < 48 and \
            (any(RE_PLZ.search(l) for l in paras[0]) or re.match(r'(Herrn|Frau|An |Familie|Eheleute)', paras[0][0])) and \
            not any(RE_KV.match(l) for l in paras[0]):
        anschrift = paras.pop(0)
    info = None
    if paras and len(paras[0]) <= 9 and all(RE_KV.match(l) and len(l) < 46 for l in paras[0]):
        info = paras.pop(0)
    footer = None
    if paras and len(paras[-1]) == 1 and ('·' in paras[-1][0] or 'HRB' in paras[-1][0] or 'IBAN' in paras[-1][0]) and len(paras) > 1:
        footer = paras.pop()[0]
    if 'wasserzeichen' in deko:
        deko['wasserzeichen'] = wasserzeichen(S, st, rng)
    y = kopf_brief(S, st, wm, zusatz, rng)
    x0 = S.mm(25); width = S.W - S.mm(45)
    ya = max(y + S.mm(4), S.mm(48))
    yend = ya
    if rueck or anschrift:
        fr = font(st.reg, S.pt(6.8))
        if rueck:
            S.text((x0, ya), rueck, fr, fill=(60, 60, 60))
            b = S.d.textbbox((x0, ya), rueck, font=fr)
            S.d.line([x0, b[3] + 2, b[2], b[3] + 2], fill=(90, 90, 90), width=1)
        ya2 = ya + S.mm(6)
        fa = font(st.reg, S.pt(st.size + 0.5))
        for l in (anschrift or []):
            S.text((x0, ya2), l, fa); ya2 += S.pt(st.size + 0.5) * 1.3
        yend = max(yend, ya2)
        # Falzmarken
        S.d.line([S.mm(4), S.mm(105), S.mm(9), S.mm(105)], fill=(120, 120, 120), width=max(1, int(S.pt(.5))))
        S.d.line([S.mm(4), S.mm(148.5), S.mm(7), S.mm(148.5)], fill=(120, 120, 120), width=max(1, int(S.pt(.5))))
    if info:
        fi = font(st.reg, S.pt(st.size - 1)); fib = font(st.bold, S.pt(st.size - 1))
        xi = S.mm(125) if (anschrift or rueck) else x0
        yi = ya if (anschrift or rueck) else yend
        kw = max(fib.getlength(l.split(':', 1)[0] + ':') for l in info) + S.mm(2)
        if xi + kw + max(fi.getlength(l.split(':', 1)[1].strip()) for l in info) > S.W - S.mm(12):
            xi = S.W - S.mm(12) - kw - max(fi.getlength(l.split(':', 1)[1].strip()) for l in info)
        if rng.random() < 0.4:
            S.d.rectangle([xi - S.mm(2), yi - S.mm(1.5), S.W - S.mm(12), yi + len(info) * S.pt(st.size) * 1.35 + S.mm(1)], fill=(236, 236, 236))
        for l in info:
            k, v = l.split(':', 1)
            S.text((xi, yi), k + ':', fib, fill=(60, 60, 60))
            S.text((xi + kw, yi), v.strip(), fi)
            yi += S.pt(st.size) * 1.35
        yend = max(yend, yi)
    y = max(yend + S.mm(10), S.mm(95) if anschrift else yend + S.mm(8))
    y = body_rendern(S, st, paras, x0, width, y, S.H - S.mm(28))
    # Fusszeilen
    n = len(S.pages)
    ff = font(st.reg, S.pt(6.8))
    for i, p in enumerate(S.pages):
        S.d = ImageDraw.Draw(p)
        S.boxes_i = i
        yf = S.H - S.mm(17)
        S.d.line([x0, yf - S.mm(2), S.W - S.mm(20), yf - S.mm(2)], fill=hell(st.farbe, 0.3), width=max(1, int(S.pt(.6))))
        if footer:
            for part in wrap(footer, ff, width):
                S.d.text((x0, yf), part, font=ff, fill=(80, 80, 80)); yf += S.pt(8.5)
        if n > 1:
            s = f'Seite {i + 1} von {n}'
            S.d.text((S.W - S.mm(20) - ff.getlength(s), S.H - S.mm(10)), s, font=ff, fill=(80, 80, 80))
        if i > 0:  # kleine Wortmarke auf Folgeseiten
            fw = font(st.wm, S.pt(10))
            S.d.text((x0, S.mm(10)), wm, font=fw, fill=st.farbe)
    S.d = ImageDraw.Draw(S.pages[-1])


def rendere_mail(lines, S, st, rng, deko):
    paras = paragraphs(lines)
    kopf = paras.pop(0)
    x0 = S.mm(18); width = S.W - S.mm(36)
    f = font(FAM['LiberationSans'][0] if st.fam in MONO else st.reg, S.pt(10)); fb = font(FAM['LiberationSans'][1] if st.fam in MONO else st.bold, S.pt(10))
    y = S.mm(14)
    S.d.line([x0, y, x0 + width, y], fill=(0, 0, 0), width=max(2, int(S.pt(1.4))))
    y += S.mm(3)
    kw = max(fb.getlength(l.split(':', 1)[0] + ':') for l in kopf if ':' in l) + S.mm(3)
    for l in kopf:
        if ':' in l:
            k, v = l.split(':', 1)
            S.text((x0, y), k + ':', fb)
            for part in wrap(v.strip(), f, width - kw):
                S.text((x0 + kw, y), part, f); y += S.pt(10) * 1.35
        else:
            S.text((x0, y), l, f); y += S.pt(10) * 1.35
    y += S.mm(2)
    S.d.line([x0, y, x0 + width, y], fill=(120, 120, 120), width=max(1, int(S.pt(.6))))
    y += S.mm(6)
    st2 = Stil.__new__(Stil); st2.__dict__.update(st.__dict__)
    if st.fam in MONO:
        st2.reg, st2.bold, st2.ital = FAM['LiberationSans']
    st2.size = 10; st2.gross = False
    body_rendern(S, st2, paras, x0, width, y, S.H - S.mm(18), betreff_frei=False)
    n = len(S.pages)
    ff = font(FAM['LiberationSans'][0], S.pt(7))
    for i, p in enumerate(S.pages):
        dd = ImageDraw.Draw(p)
        s = f'{i + 1}/{n}'
        dd.text((S.W - S.mm(18) - ff.getlength(s), S.H - S.mm(9)), s, font=ff, fill=(90, 90, 90))


def rendere_portal(lines, S, st, rng, deko):
    paras = paragraphs(lines)
    titel = paras.pop(0)
    W = S.W
    d = S.d
    farbe = st.farbe
    sans = rng.choice(SANS)
    reg, bold, _ = FAM[sans]
    d.rectangle([0, 0, W, S.mm(24)], fill=farbe)
    bildmarke(d, S.mm(10), S.mm(5), S.mm(14), (255, 255, 255), hell(farbe, 0.5), rng)
    ft = font(bold, S.pt(15))
    while ft.getlength(titel[0]) > W - S.mm(40):
        ft = font(bold, ft.size * 0.92)
    S.text((S.mm(28), S.mm(8)), titel[0], ft, fill=(255, 255, 255))
    y = S.mm(32)
    fl = font(reg, S.pt(10)); fbl = font(bold, S.pt(10)); fk = font(reg, S.pt(8))
    x0, width = S.mm(14), W - S.mm(28)
    for z in titel[1:]:
        S.text((x0, y), z, fl, fill=(60, 60, 60)); y += S.pt(13)
    for p in paras:
        kv = all(RE_KV.match(l) and len(l) < 70 for l in p)
        if len(p) == 1 and len(p[0]) < 60 and not re.search(r'[.:]$', p[0]):
            fh = font(bold, S.pt(12.5))
            if y + S.pt(20) > S.H - S.mm(15):
                S.neu(); d = S.d; y = S.mm(15)
            S.text((x0, y), p[0], fh, fill=farbe if rng.random() < 0.5 else (30, 30, 30)); y += S.pt(19)
            continue
        if kv:
            h = len(p) * S.pt(15) + S.mm(6)
            if y + h > S.H - S.mm(15):
                S.neu(); d = S.d; y = S.mm(15)
            S.d.rounded_rectangle([x0, y, x0 + width, y + h], radius=S.mm(3), fill=(240, 242, 245), outline=(205, 208, 214), width=2)
            yy = y + S.mm(3)
            for l in p:
                k, v = l.split(':', 1)
                S.text((x0 + S.mm(4), yy + S.pt(1.5)), k, fk, fill=(100, 100, 100))
                vb = v.strip()
                S.text((x0 + width - S.mm(4) - fbl.getlength(vb), yy), vb, fbl)
                if l is not p[-1]:
                    S.d.line([x0 + S.mm(4), yy + S.pt(13.5), x0 + width - S.mm(4), yy + S.pt(13.5)], fill=(220, 220, 225), width=1)
                yy += S.pt(15)
            y += h + S.mm(5)
            continue
        st2 = Stil.__new__(Stil); st2.__dict__.update(st.__dict__)
        st2.reg, st2.bold, st2.ital = FAM[sans]; st2.size = 10; st2.zeilen = 1.35
        y = body_rendern(S, st2, [p], x0, width, y, S.H - S.mm(15), betreff_frei=False)


def rendere_bon(lines, dpi, rng, papier, deko):
    """Kassenbon als Streifen; lange Bons in Stuecke (je Seite eines)."""
    fam = rng.choice(MONO)
    reg, bold, _ = FAM[fam]
    breite_mm = rng.choice([80, 80, 76, 58])
    maxlen = max(len(l) for l in lines)
    probe = font(reg, 100)
    cw = probe.getlength('M') / 100
    rand = 4
    px = (breite_mm - 2 * rand) * dpi / 25.4 / (max(maxlen, 24) * cw)
    px = min(px, 11 * dpi / 72)
    f = font(reg, px); fb = font(bold, px * 1.25)
    lh = px * 1.3
    stueck = int((270 * dpi / 25.4) // lh) - 6
    chunks = [lines[i:i + stueck] for i in range(0, len(lines), stueck)]
    W = int(breite_mm * dpi / 25.4)
    papier = {'weiss': (246, 245, 240), 'vergilbt': (240, 232, 205), 'creme': (247, 244, 232)}.get(papier, (246, 245, 240))
    pages, boxes = [], []
    for ci, ch in enumerate(chunks):
        H = int((len(ch) + (8 if ci == 0 else 3) + (6 if ci == len(chunks) - 1 else 0)) * lh + 20 * dpi / 25.4)
        im = Image.new('RGBA', (W, H), papier + (255,))
        d = ImageDraw.Draw(im)
        bx = []
        y = 8 * dpi / 25.4
        x0 = rand * dpi / 25.4
        if ci == 0:
            if rng.random() < 0.6:
                s = 12 * dpi / 25.4
                bildmarke(d, (W - s) / 2, y, s, (25, 25, 25), (120, 120, 120), rng)
                y += s + 2 * dpi / 25.4
        kopf = True
        for li, l in enumerate(ch):
            if not l.strip():
                kopf = False if li > 0 else kopf
                y += lh * 0.8
                continue
            ff = fb if (ci == 0 and li == 0) else f
            if ci == 0 and kopf and not RE_PREIS.search(l):
                tx = (W - ff.getlength(l.strip())) / 2
                s = l.strip()
            else:
                kopf = False
                s = l
                tx = x0
                if ff.getlength(s) > W - 2 * x0:
                    s = l.strip()
            if re.search(r'(?i)^\s*(summe|gesamt|zu zahlen|total)', l):
                ff = font(bold, px * 1.12)
            d.text((tx, y), s, font=ff, fill=(15, 15, 15))
            bx.append(d.textbbox((tx, y), s, font=ff))
            y += lh if ff is not fb else lh * 1.3
        if ci == len(chunks) - 1 and rng.random() < 0.6:  # Strichcode ohne Ziffern
            y += lh
            xx = W * 0.15
            while xx < W * 0.85:
                w = rng.choice([1, 1, 2, 3]) * dpi / 300 * 2
                d.rectangle([xx, y, xx + w, y + 12 * dpi / 25.4], fill=(15, 15, 15))
                xx += w + rng.choice([1, 2, 3]) * dpi / 300 * 2
        pages.append(im); boxes.append(bx)
    return pages, boxes, fam


# --------------------------------------------------------------------------------------------
# Werkzeuge fuer Bildfehler (float32, 0..1)
# --------------------------------------------------------------------------------------------
def A(im):
    return np.asarray(im.convert('RGB'), dtype=np.float32) / 255.0


def I(a):
    return Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))


def lum(a):
    return a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114


def glatt_rauschen(h, w, skala, rng_np):
    """Niederfrequentes Rauschen 0..1 (Hochskalieren einer kleinen Zufallsflaeche)."""
    sh, sw = max(2, int(h / skala)), max(2, int(w / skala))
    small = rng_np.random((sh, sw)).astype(np.float32)
    im = Image.fromarray((small * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(im, dtype=np.float32) / 255.0


def remap(a, mx, my, fill):
    """Bilinear abtasten an (mx,my); ausserhalb fill."""
    h, w = a.shape[:2]
    x0 = np.floor(mx).astype(np.int32); y0 = np.floor(my).astype(np.int32)
    fx = (mx - x0)[..., None]; fy = (my - y0)[..., None]
    out = np.zeros(mx.shape + (a.shape[2],), np.float32)
    inside = (mx >= 0) & (mx <= w - 1) & (my >= 0) & (my <= h - 1)
    x0c = np.clip(x0, 0, w - 1); y0c = np.clip(y0, 0, h - 1)
    x1c = np.clip(x0 + 1, 0, w - 1); y1c = np.clip(y0 + 1, 0, h - 1)
    out = (a[y0c, x0c] * (1 - fx) * (1 - fy) + a[y0c, x1c] * fx * (1 - fy) + a[y1c, x0c] * (1 - fx) * fy + a[y1c, x1c] * fx * fy)
    out[~inside] = fill
    return out


def jpeg(im, q):
    b = io.BytesIO()
    im.convert('RGB').save(b, 'JPEG', quality=int(q), subsampling=2 if q < 80 else 0)
    b.seek(0)
    return Image.open(b).convert('RGB')


# ---- Anmerkungen auf dem Papier (vor dem Scannen) ------------------------------------------
def rotstift(page, boxes, rng, dpi):
    d = ImageDraw.Draw(page)
    rot = rng.choice([(200, 25, 30), (185, 20, 60), (30, 60, 170)])  # Rot, Rosa, Blau (Kuli)
    w = max(2, int(dpi / 90))
    taten = []
    kand = [b for b in boxes if (b[2] - b[0]) > dpi * 0.4]
    for _ in range(rng.randint(1, 3)):
        if not kand:
            break
        b = rng.choice(kand)
        k = rng.randrange(4)
        if k == 0:  # Kringel
            pad = dpi * 0.06
            pts = []
            cx, cy = (b[0] + b[2]) / 2, (b[1] + b[3]) / 2
            rx, ry = (b[2] - b[0]) / 2 + pad, (b[3] - b[1]) / 2 + pad * 1.4
            for t in np.linspace(0.2, 2 * math.pi + 0.6, 40):
                pts.append((cx + rx * math.cos(t) * rng.uniform(.97, 1.03), cy + ry * math.sin(t) * rng.uniform(.95, 1.05)))
            d.line(pts, fill=rot, width=w, joint='curve'); taten.append('kringel')
        elif k == 1:  # Wellen-Unterstreichung
            yy = b[3] + dpi * 0.02
            pts = [(x, yy + math.sin(x / (dpi * 0.03)) * dpi * 0.012) for x in np.linspace(b[0], b[2], 60)]
            d.line(pts, fill=rot, width=w); taten.append('unterstrichen')
        elif k == 2:  # Haken am Rand
            x = max(dpi * 0.12, b[0] - dpi * 0.35); yy = b[1]
            s = dpi * 0.14
            d.line([(x, yy + s * .5), (x + s * .35, yy + s), (x + s, yy)], fill=rot, width=w + 1); taten.append('haken')
        else:  # Notiz am Rand
            f = font(rng.choice(HAND), dpi * 0.16)
            t = rng.choice(['erl.', 'bez.', 'ok', 'Ablage', 'wichtig!', 'ruecks.?', 'Frist!'])
            lay = Image.new('RGBA', (int(f.getlength(t)) + 20, int(dpi * 0.3)), (0, 0, 0, 0))
            ImageDraw.Draw(lay).text((5, 0), t, font=f, fill=rot + (235,))
            lay = lay.rotate(rng.uniform(-14, 10), expand=True, resample=Image.BICUBIC)
            x = int(min(page.width - lay.width - 5, b[2] + dpi * 0.1)) if rng.random() < .5 else int(max(5, b[0] - lay.width - dpi * .05))
            page.alpha_composite(lay, (max(0, x), int(max(0, b[1] - dpi * 0.05))))
            taten.append('notiz')
    return taten


def textmarker(page, boxes, rng, dpi):
    a = np.asarray(page, dtype=np.float32) / 255.0
    farbe = np.array(rng.choice([(255, 238, 40), (120, 245, 100), (255, 150, 200), (255, 190, 80)]), np.float32) / 255
    kand = [b for b in boxes if (b[2] - b[0]) > dpi * 0.5]
    m = Image.new('L', page.size, 0)
    d = ImageDraw.Draw(m)
    for _ in range(rng.randint(1, 3)):
        if not kand:
            break
        b = rng.choice(kand)
        h = (b[3] - b[1]) * 1.25
        x0 = b[0] - rng.uniform(0, dpi * .05); x1 = b[2] + rng.uniform(-dpi * .2, dpi * .06)
        y0 = b[1] - h * 0.12 + rng.uniform(-2, 2)
        sk = rng.uniform(-dpi * .02, dpi * .02)
        d.polygon([(x0, y0), (x1, y0 + sk), (x1, y0 + h + sk), (x0, y0 + h)], fill=rng.randint(150, 200))
    m = np.asarray(m.filter(ImageFilter.GaussianBlur(dpi / 300)), np.float32)[..., None] / 255
    a[..., :3] = a[..., :3] * (1 - m * (1 - farbe))
    return Image.fromarray((a * 255 + .5).astype(np.uint8), 'RGBA')


def lochung(page, dpi):
    """Zwei Lochungen links (alpha=0, dahinter liegt Deckel/Tisch)."""
    al = page.getchannel('A')
    d = ImageDraw.Draw(al)
    r = 2.75 * dpi / 25.4
    cy = page.height / 2
    x = 12 * dpi / 25.4
    for dy in (-40, 40):
        y = cy + dy * dpi / 25.4
        d.ellipse([x - r, y - r, x + r, y + r], fill=0)
    page.putalpha(al)


def heftklammer(page, dpi, rng):
    d = ImageDraw.Draw(page)
    x, y = 9 * dpi / 25.4, 9 * dpi / 25.4
    L = 12 * dpi / 25.4
    ang = math.radians(rng.uniform(30, 55))
    dx, dy = L * math.cos(ang), -L * math.sin(ang)
    w = max(2, int(dpi / 110))
    # Schatten, Klammer, Glanz
    d.line([(x + 3, y + L * .6 + 3), (x + dx + 3, y + L * .6 + dy + 3)], fill=(140, 140, 140, 255), width=w + 2)
    d.line([(x, y + L * .6), (x + dx, y + L * .6 + dy)], fill=(95, 98, 105, 255), width=w + 1)
    d.line([(x + 1, y + L * .6 - 1), (x + dx * .7, y + L * .6 + dy * .7 - 1)], fill=(200, 205, 210, 255), width=1)
    # Abdruck/Loecher vom frueheren Heften
    for t in (0.0, 1.0):
        px_, py_ = x + dx * t + 5, y + L * .6 + dy * t + 12
        d.ellipse([px_ - 2, py_ - 2, px_ + 2, py_ + 2], fill=(170, 170, 170, 255))


def eselsohr(a, alpha, rng):
    """Umgeknickte Ecke oben rechts: Rueckseite sichtbar, darunter Hintergrund."""
    h, w = alpha.shape
    s = int(min(h, w) * rng.uniform(0.06, 0.1))
    yy, xx = np.mgrid[0:s, 0:s]
    xr = w - s + xx
    # Dreieck jenseits der Knicklinie (x' + y < s) gemessen von rechter oberer Ecke
    rest = (s - 1 - xx) + yy
    weg = rest < s * 0.999
    alpha[0:s, w - s:w][weg] = 0
    # gespiegelte Rueckseite: Dreieck ueber der Linie zur Seite hin
    zur = rest >= s
    farbe = np.median(a[h // 2:h // 2 + 20, w - 30:w - 5].reshape(-1, 3), axis=0) * 0.9
    a[0:s, w - s:w][zur] = farbe
    alpha[0:s, w - s:w][zur] = 1
    # Schattenlinie an der Knickkante
    linie = np.abs(rest - s) < 2.5
    a[0:s, w - s:w][linie] *= 0.6
    return 'eselsohr'


def knicke(a, rng, stark, dpi, geometrie=True):
    """Falzlinien mit Schattierung und Versatz der Teilflaechen (echte Geometrie)."""
    h, w = a.shape[:2]
    art = rng.choice(['drittel', 'halb', 'drittel+senk', 'kreuz'])
    lin = []
    if art.startswith('drittel'):
        lin += [('h', h / 3 + rng.uniform(-h * .02, h * .02)), ('h', 2 * h / 3 + rng.uniform(-h * .02, h * .02))]
    if art == 'halb':
        lin.append(('h', h / 2 + rng.uniform(-h * .02, h * .02)))
    if art in ('drittel+senk', 'kreuz'):
        lin.append(('v', w / 2 + rng.uniform(-w * .03, w * .03)))
    if art == 'kreuz':
        lin.append(('h', h / 2))
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    mx, my = xx.copy(), yy.copy()
    shade = np.ones((h, w), np.float32)
    for o, pos in lin:
        tilt = rng.uniform(-0.012, 0.012)
        if o == 'h':
            dist = yy - (pos + (xx - w / 2) * tilt)
        else:
            dist = xx - (pos + (yy - h / 2) * tilt)
        if geometrie:
            off = rng.uniform(0.6, 2.5 if stark else 1.2) * dpi / 150
            rot = rng.uniform(-0.15, 0.15) * (2 if stark else 1) * math.pi / 180
            side = dist > 0
            if o == 'h':
                mx = np.where(side, mx + off + (yy - pos) * math.sin(rot), mx)
                my = np.where(side, my - (xx - w / 2) * math.sin(rot) + off * 0.5, my)
            else:
                my = np.where(side, my + off, my)
                mx = np.where(side, mx + (yy - h / 2) * math.sin(rot), mx)
        breite = dpi * rng.uniform(0.04, 0.12)
        s = rng.uniform(0.04, 0.12) * (1.6 if stark else 1)
        shade *= 1 + s * np.sign(dist) * np.exp(-np.abs(dist) / breite) * rng.choice([1, -1])
        shade *= 1 - (0.25 if stark else 0.15) * np.exp(-(dist / (dpi / 200 + 0.6)) ** 2) * (0.6 + 0.4 * rng.random())
    if geometrie:
        a = remap(a, mx, my, a[5, 5])
    a = a * shade[..., None]
    return a, 'knick-' + art


# ---- Scanner-Fehler ------------------------------------------------------------------------
def auflegen(page_rgba, rng, winkel, versatz_mm, dpi, deckel=(0.93, 0.93, 0.92)):
    """Seite schraeg auf die Glasplatte legen; Raender/Loecher zeigen den Deckel mit Kantenschatten."""
    W, H = page_rgba.size
    dx, dy = [v * dpi / 25.4 for v in versatz_mm]
    p = page_rgba.rotate(winkel, resample=Image.BICUBIC, expand=False, translate=(dx, dy), fillcolor=(0, 0, 0, 0))
    a = np.asarray(p, np.float32) / 255
    al = a[..., 3:4]
    sch = np.asarray(Image.fromarray((al[..., 0] * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(dpi / 60)), np.float32)[..., None] / 255
    bg = np.ones((H, W, 3), np.float32) * np.array(deckel, np.float32)
    bg = bg * (1 - 0.5 * np.clip(sch - al, 0, 1) * 2)
    return a[..., :3] * al + bg * (1 - al)


def raster(a, rng, dpi, stark):
    """Druckraster (Rasterpunkte) in Flaechen + Moiré-Schwebung beim Scannen."""
    h, w = a.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    per = rng.uniform(3.2, 5.0) * dpi / 200
    out = a.copy()
    papier = np.median(a[::7, ::7].reshape(-1, 3), axis=0)
    flache = (lum(a) > 0.12) & (lum(a) < 0.93) & (np.abs(a - papier).max(axis=2) > 0.07)
    flache = np.asarray(Image.fromarray((flache * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(5)), np.float32) > 127
    for c, ang in zip(range(3), (15, 75, 45)):
        t = math.radians(ang + rng.uniform(-3, 3))
        u = (xx * math.cos(t) + yy * math.sin(t)) / per
        v = (-xx * math.sin(t) + yy * math.cos(t)) / per
        screen = 0.5 + 0.25 * (np.cos(2 * math.pi * u) + np.cos(2 * math.pi * v))
        ht = (a[..., c] > screen).astype(np.float32)
        out[..., c] = np.where(flache, ht, a[..., c])
    out = np.asarray(I(out).filter(ImageFilter.GaussianBlur(per * 0.45)), np.float32) / 255
    t = math.radians(rng.uniform(0, 180))
    P = rng.uniform(25, 70) * dpi / 200
    beat = 1 + (0.12 if stark else 0.06) * np.sin(2 * math.pi * (xx * math.cos(t) + yy * math.sin(t)) / P)
    out = np.where(flache[..., None], out * beat[..., None], out)
    # Moiré auf dem ganzen Bild schwach (Glasplatte/Sensor)
    out *= (1 + 0.025 * np.sin(2 * math.pi * (xx * math.cos(t + .3) + yy * math.sin(t + .3)) / (P * 1.7)))[..., None]
    return out


def helligkeit(a, art, stark):
    if art == 'zu-hell':
        k = 0.6 if stark else 0.72
        return 1 - (1 - a) * k
    g = 1.8 if stark else 1.4
    return (a ** g) * (0.82 if stark else 0.9)


def einzug_streifen(a, rng, dpi, stark):
    h, w = a.shape[:2]
    n = rng.randint(2, 5) if stark else rng.randint(1, 3)
    for _ in range(n):
        x = rng.randrange(int(w * .05), int(w * .95))
        bw = rng.randint(1, max(2, int(dpi / 80)))
        dunkel = rng.random() < 0.7
        prof = 0.85 + 0.15 * glatt_rauschen(h, 1, 40, np.random.default_rng(x))[:, :1]
        if dunkel:
            k = rng.uniform(0.35, 0.7) if stark else rng.uniform(0.6, 0.85)
            a[:, x:x + bw] *= (k + (1 - k) * (prof - 0.85) / 0.15 * 0.3)[..., None]
        else:
            a[:, x:x + bw] = a[:, x:x + bw] * 0.3 + 0.7
    # Einzugsgeschwindigkeit schwankt: Zeilen gestaucht/gedehnt
    jit = np.cumsum(1 + (glatt_rauschen(h, 1, h / 12, np.random.default_rng(h))[:, 0] - 0.5) * (0.08 if stark else 0.04))
    jit = jit / jit[-1] * (h - 1)
    a = a[np.clip(np.round(jit).astype(int), 0, h - 1)]
    return a


def rauschen(a, rng_np, sigma, staub, dpi):
    h, w = a.shape[:2]
    a = a + rng_np.normal(0, sigma, (h, w, 1)).astype(np.float32)
    if staub:
        im = I(a); d = ImageDraw.Draw(im)
        for _ in range(staub):
            x, y = rng_np.integers(0, w), rng_np.integers(0, h)
            r = rng_np.uniform(0.5, 2.2) * dpi / 200
            d.ellipse([x - r, y - r, x + r, y + r], fill=(40, 40, 40))
        if staub > 30:  # ein Haar auf der Glasplatte
            x, y = rng_np.integers(0, w), rng_np.integers(0, h)
            pts, ang = [], rng_np.uniform(0, 2 * math.pi)
            for i in range(90):
                ang += rng_np.normal(0, 0.12)
                x, y = x + math.cos(ang) * 3 * dpi / 200, y + math.sin(ang) * 3 * dpi / 200
                pts.append((x, y))
            d.line(pts, fill=(60, 60, 60), width=1)
        a = A(im)
    return a


def fax(a, rng, dpi, rng_np):
    """Faxkopie: Kopfzeile, 204x98 dpi, 1 Bit, Bitfehler, Aussetzer."""
    h, w = a.shape[:2]
    im = I(a)
    d = ImageDraw.Draw(im)
    f = font('truetype/liberation/LiberationMono-Regular.ttf', dpi * 0.11)
    seite = rng.randint(1, 3)
    d.text((dpi * .3, dpi * .08), f'14.11.2026 {rng.randint(7, 18):02d}:{rng.randint(0, 59):02d}   FAX +49 0000 000000        S. {seite:02d}', font=f, fill=(0, 0, 0))
    g = np.asarray(im.convert('L'), np.float32) / 255
    sw, sh = int(w * 204 / dpi), int(h * 98 / dpi)
    small = np.asarray(Image.fromarray((g * 255).astype(np.uint8)).resize((sw, sh), Image.BOX), np.float32) / 255
    small += rng_np.normal(0, 0.06, small.shape)
    p1, p50 = np.percentile(small, 1.0), np.median(small)
    bit = (small > p1 + (p50 - p1) * rng.uniform(0.55, 0.68)).astype(np.float32)
    flip = rng_np.random(bit.shape) < 0.0025
    bit[flip] = 1 - bit[flip]
    for _ in range(rng.randint(1, 4)):  # Uebertragungsfehler: Zeile weiss oder schwarz verschmiert
        y = rng.randrange(sh)
        bit[y:y + rng.randint(1, 2)] = 1.0 if rng.random() < .7 else bit[max(0, y - 1)]
    out = np.asarray(Image.fromarray((bit * 255).astype(np.uint8)).resize((w, h), Image.NEAREST), np.float32) / 255
    return np.repeat(out[..., None], 3, axis=2)


def kopie(a, rng, dpi, gens, rng_np):
    """Kopie einer Kopie: Graustufen, Kontrastkurve, Toner-Spritzer, Randbalken, Verschiebung."""
    g = lum(a)
    h, w = g.shape
    for i in range(gens):
        im = Image.fromarray((np.clip(g, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(dpi / 200 * 0.9))
        sc = rng.uniform(0.985, 1.0)
        im = im.resize((int(w * sc), int(h * sc)), Image.BILINEAR)
        can = Image.new('L', (w, h), 245)
        can.paste(im, (rng.randint(0, int(w * (1 - sc)) + 2), rng.randint(0, int(h * (1 - sc)) + 2)))
        g = np.asarray(can, np.float32) / 255
        p1, p50 = np.percentile(g[::4, ::4], 0.5), np.median(g[::4, ::4])
        mitte = p1 + (p50 - p1) * rng.uniform(0.6, 0.72)
        g = 1 / (1 + np.exp(-(g - mitte) / max(0.02, (p50 - p1)) * 7))
        g = (g - g.min()) / (g.max() - g.min() + 1e-6)
        g = g * 0.93 + 0.05 + 0.03 * glatt_rauschen(h, w, dpi * 0.8, rng_np)  # Grauschleier ungleich
        sp = rng_np.random((h, w)) < 0.0008
        g[sp] *= 0.3
        rb = int(dpi * rng.uniform(0.05, 0.18))
        g[:rb] *= 0.45; g[-rb:] *= 0.55
    return np.repeat(np.clip(g, 0, 1)[..., None], 3, axis=2)


def thermo(a, rng, rng_np, stark):
    """Thermopapier verblasst: Schwaerzung sinkt ungleichmaessig, Papier gelblich-grau."""
    h, w = a.shape[:2]
    tinte = 1 - lum(a)
    feld = glatt_rauschen(h, w, max(h, w) / 6, rng_np)
    verlauf = np.linspace(rng.uniform(0.5, 1), rng.uniform(0.3, 0.8), h, dtype=np.float32)[:, None]
    k = (0.3 if stark else 0.5) + (0.35 if stark else 0.4) * feld * verlauf
    tinte = tinte * np.clip(k, 0.22, 1)
    papier = np.array([0.95, 0.93, 0.86], np.float32)
    ink = np.array([0.35, 0.33, 0.38], np.float32)  # verblasst graublau
    return papier * (1 - tinte[..., None]) + ink * tinte[..., None]


# ---- Foto-Fehler ---------------------------------------------------------------------------
def hintergrund(W, H, rng, rng_np):
    art = rng.choice(['holz', 'dunkel', 'hell', 'stoff', 'stein'])
    sm = 4
    h, w = H // sm + 1, W // sm + 1
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    n = glatt_rauschen(h, w, 30, rng_np)
    if art == 'holz':
        base = np.array(rng.choice([(0.55, 0.38, 0.22), (0.68, 0.52, 0.33), (0.4, 0.27, 0.16)]), np.float32)
        t = np.sin((yy + n * 40) / rng.uniform(4, 9)) * 0.5 + 0.5
        bg = base * (0.8 + 0.25 * t[..., None])
    elif art == 'dunkel':
        bg = np.array([0.12, 0.12, 0.13], np.float32) * (0.8 + 0.4 * n[..., None])
    elif art == 'hell':
        bg = np.array([0.84, 0.82, 0.78], np.float32) * (0.92 + 0.1 * n[..., None])
    elif art == 'stoff':
        c1 = np.array(rng.choice([(0.6, 0.15, 0.15), (0.2, 0.3, 0.55), (0.25, 0.45, 0.3)]), np.float32)
        k = ((np.floor(xx / 12) + np.floor(yy / 12)) % 2)[..., None]
        bg = c1 * (0.7 + 0.3 * k) * (0.9 + 0.15 * n[..., None])
    else:
        bg = np.array([0.5, 0.5, 0.48], np.float32) * (0.75 + 0.4 * glatt_rauschen(h, w, 3, rng_np)[..., None])
    bg = np.asarray(I(bg).resize((W, H), Image.BILINEAR), np.float32) / 255
    return bg, art


def perspektive_koeff(src, dst):
    """Koeffizienten fuer PIL PERSPECTIVE: Ausgabepunkt dst -> Eingabepunkt src."""
    M, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        M.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        M.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(M, np.float64), np.array(b, np.float64)).tolist()


def woelben(a, alpha, rng, stark):
    """Gewoelbtes Papier: Zeilen biegen sich, Rand gestaucht, Schattierung nach Neigung."""
    h, w = alpha.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    amp = min(h, w * 1.41) * (rng.uniform(0.004, 0.009) if stark else rng.uniform(0.002, 0.005))
    u = xx / w * 2 - 1
    form = rng.choice(['bogen', 'welle'])
    if form == 'bogen':
        dy = amp * (u ** 2 - 0.33) * rng.choice([1, -1])
        neig = 2 * u
    else:
        dy = amp * np.sin(u * math.pi * 1.0 + rng.uniform(0, 1))
        neig = np.cos(u * math.pi)
    vy = yy / h * 2 - 1
    dy = dy * (0.6 + 0.4 * np.abs(vy))
    mx = xx + amp * 0.4 * u * np.abs(u)
    my = yy + dy
    a2 = remap(np.concatenate([a, alpha[..., None]], axis=2), mx, my, 0)
    shade = 1 - (0.1 if stark else 0.05) * neig * rng.choice([1, -1])
    a2[..., :3] *= shade[..., None]
    return a2[..., :3], a2[..., 3], 'woelbung-' + form


def foto(page_rgba, rng, rng_np, guete, outW, outH, bon=False):
    fb = []
    a = np.asarray(page_rgba, np.float32) / 255
    rgb, al = a[..., :3].copy(), a[..., 3].copy()
    stark = guete == 'schlecht'
    if guete != 'gut' or rng.random() < .4:
        rgb, al, n = woelben(rgb, al, rng, stark); fb.append(n)
    bg, bgart = hintergrund(outW, outH, rng, rng_np)
    fb.append('hintergrund-' + bgart)
    ph, pw = al.shape
    # Ziel-Viereck: Seite fuellt 70-90 % der Hoehe
    fill = {'gut': rng.uniform(.84, .92), 'mittel': rng.uniform(.78, .88), 'schlecht': rng.uniform(.72, .84)}[guete]
    sc = min(outH * fill / ph, outW * 0.92 / pw)
    tw, th = pw * sc, ph * sc
    cx, cy = outW / 2 + rng.uniform(-.04, .04) * outW, outH / 2 + rng.uniform(-.03, .03) * outH
    q = {'gut': 0.025, 'mittel': 0.06, 'schlecht': 0.11}[guete]
    ecken = [(-tw / 2, -th / 2), (tw / 2, -th / 2), (tw / 2, th / 2), (-tw / 2, th / 2)]
    rot = math.radians(rng.uniform(-3, 3) * (2 if stark else 1))
    # Trapez: oben schmaler (Handy geneigt) + Zufall je Ecke
    trap = rng.uniform(0.3, 1) * q * tw * rng.choice([1, 1, -1])
    dst = []
    for i, (x, y) in enumerate(ecken):
        if i < 2:
            x = x - math.copysign(trap, x)
        x += rng.uniform(-q, q) * tw * .5; y += rng.uniform(-q, q) * th * .5
        xr = x * math.cos(rot) - y * math.sin(rot); yr = x * math.sin(rot) + y * math.cos(rot)
        dst.append((cx + xr, cy + yr))
    fb.append('perspektive-trapez')
    src = [(0, 0), (pw, 0), (pw, ph), (0, ph)]
    koeff = perspektive_koeff(src, dst)
    pim = I(rgb).transform((outW, outH), Image.PERSPECTIVE, koeff, Image.BICUBIC)
    aim = Image.fromarray((al * 255).astype(np.uint8)).transform((outW, outH), Image.PERSPECTIVE, koeff, Image.BILINEAR)
    pa = np.asarray(pim, np.float32) / 255
    m = np.asarray(aim, np.float32)[..., None] / 255
    sh = np.asarray(aim.filter(ImageFilter.GaussianBlur(outW / 120)), np.float32)[..., None] / 255
    sh = np.roll(np.roll(sh, int(outW / 150), 1), int(outW / 120), 0)
    bg = bg * (1 - 0.45 * sh)
    out = pa * m + bg * (1 - m)
    H, W = outH, outW
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    # ungleiches Licht: Verlauf + Vignette
    t = rng.uniform(0, 2 * math.pi)
    g = ((xx / W - .5) * math.cos(t) + (yy / H - .5) * math.sin(t))
    st_ = {'gut': 0.15, 'mittel': 0.3, 'schlecht': 0.45}[guete]
    licht = 1 - st_ * (g + .5) * rng.uniform(.6, 1)
    vig = 1 - (0.12 if guete == 'gut' else 0.25) * (((xx / W - .5) ** 2 + (yy / H - .5) ** 2) * 2.2)
    out *= (licht * vig)[..., None]
    fb.append('licht-ungleich')
    if guete != 'gut' and rng.random() < 0.6:  # Schatten von Hand/Handy
        lay = Image.new('L', (W, H), 0)
        d = ImageDraw.Draw(lay)
        ex = rng.choice([0, W]); ey = rng.uniform(0.4, 1) * H
        d.ellipse([ex - W * .45, ey - H * .25, ex + W * .25, ey + H * .5], fill=255)
        s = np.asarray(lay.filter(ImageFilter.GaussianBlur(W / 25)), np.float32)[..., None] / 255
        out *= 1 - (0.45 if stark else 0.3) * s
        fb.append('schatten-hand')
    if guete != 'gut' or rng.random() < .3:  # Glanzstelle
        gx, gy = rng.uniform(.25, .75) * W, rng.uniform(.2, .8) * H
        rx, ry = rng.uniform(.06, .16) * W, rng.uniform(.04, .12) * H
        gl = np.exp(-(((xx - gx) / rx) ** 2 + ((yy - gy) / ry) ** 2))
        k = {'gut': 0.35, 'mittel': 0.55, 'schlecht': 0.6}[guete]
        out = out + (1 - out) * (k * gl)[..., None]
        fb.append('glanzstelle')
    # Farbstich (Kunstlicht, Leuchtstoff, Schatten blaeulich) und unvollstaendiger Weissabgleich
    cast = rng.choice([(1.0, .9, .72), (.86, .95, 1.08), (.93, 1.0, .88), (1.05, .95, .9)])
    kc = {'gut': .35, 'mittel': .7, 'schlecht': 1}[guete]
    out *= np.array([1 + (c - 1) * kc for c in cast], np.float32)
    fb.append('farbstich')
    if stark or (guete == 'mittel' and rng.random() < .5):
        L = rng.randint(3, 6) if stark else rng.randint(2, 3)
        ang = rng.uniform(0, math.pi)
        acc = np.zeros_like(out)
        for i in range(L):
            acc += np.roll(np.roll(out, int(round((i - L / 2) * math.cos(ang))), 1), int(round((i - L / 2) * math.sin(ang))), 0)
        out = acc / L
        fb.append('bewegungsunschaerfe')
    else:
        r = 0.6 if guete == 'gut' else 1.0
        out = np.asarray(I(out).filter(ImageFilter.GaussianBlur(r)), np.float32) / 255
        fb.append('leichte-unschaerfe' if guete != 'gut' else 'optik-weich')
    # Sensorrauschen (staerker in dunklen Bereichen) + Farbrauschen
    s = {'gut': .012, 'mittel': .025, 'schlecht': .045}[guete]
    out = out + rng_np.normal(0, 1, (H, W, 1)).astype(np.float32) * s * (1.3 - lum(out))[..., None]
    ch = np.asarray(Image.fromarray((rng_np.random((H // 6, W // 6, 3)) * 255).astype(np.uint8)).resize((W, H), Image.BILINEAR), np.float32) / 255 - .5
    out += ch * s * 1.2
    fb.append('sensorrauschen')
    im = I(out)
    im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=rng.randint(60, 140), threshold=2))  # Handy schaerft nach
    if stark and rng.random() < 0.25:
        im = im.rotate(rng.choice([90, -90]), expand=True)
        fb.append('quer-aufgenommen')
    return im, fb


# --------------------------------------------------------------------------------------------
# Ablauf je Stueck
# --------------------------------------------------------------------------------------------
def h(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def zuteilung(namen):
    namen = sorted(namen)
    nach_form = sorted(namen, key=lambda n: h('form|' + n))
    npdf = round(len(namen) * 0.6)
    form = {n: ('pdf-scan' if i < npdf else 'foto') for i, n in enumerate(nach_form)}
    guete = {}
    for fm in ('pdf-scan', 'foto'):
        grp = sorted([n for n in namen if form[n] == fm], key=lambda n: h('guete|' + n))
        for i, n in enumerate(grp):
            guete[n] = ['gut', 'mittel', 'schlecht'][i % 3]
    return form, guete


def seiten_bauen(name, lines, dpi, rng):
    art = dokart(name, lines)
    deko = {}
    r = rng.random()
    papier = 'weiss' if r < .5 else ('creme' if r < .6 else ('vergilbt' if r < .72 else ('recycling' if r < .8 else rng.choice(['blau', 'gruen', 'rosa', 'gelb']))))
    if art == 'bon':
        papier = rng.choice(['weiss', 'weiss', 'vergilbt', 'creme'])
        pages, boxes, fam = rendere_bon(lines, dpi, rng, papier, deko)
        return art, pages, boxes, {'papier': papier, 'schrift': fam}
    st = Stil(rng, name, lines)
    if art == 'mail' or art == 'portal':
        papier = 'weiss' if rng.random() < .8 else 'recycling'
    S = Seiten(210, 297, dpi, PAPIER[papier], rng)
    info = {'papier': papier, 'schrift': st.fam}
    if art == 'brief':
        if rng.random() < 0.18:
            deko['wasserzeichen'] = True
        rendere_brief(lines, S, st, rng, deko)
        info['kopf'] = st.kopf
    elif art == 'mail':
        rendere_mail(lines, S, st, rng, deko)
    else:
        rendere_portal(lines, S, st, rng, deko)
    if 'wasserzeichen' in deko:
        info['wasserzeichen'] = deko['wasserzeichen']
    return art, S.pages, S.boxes, info


def verarbeite(args):
    name, ein, aus, form, guete = args
    seed = int(h('seed|' + name)[:16], 16)
    rng = random.Random(seed)
    rng_np = np.random.default_rng(seed)
    lines = lese(os.path.join(ein, name))
    stamm = name[:-4]
    fb = []
    if form == 'pdf-scan':
        dpi = {'gut': 300, 'mittel': 200, 'schlecht': 150}[guete]
    else:
        dpi = {'gut': 260, 'mittel': 220, 'schlecht': 190}[guete]
    art, pages, boxes, info = seiten_bauen(name, lines, dpi, rng)
    if info.get('papier') not in (None, 'weiss'):
        fb.append('papier-' + info['papier'])
    if 'wasserzeichen' in info:
        fb.append(info['wasserzeichen'])
    if 'Mono' in info.get('schrift', '') and art != 'bon':
        fb.append('schreibmaschinenschrift')
    if form == 'foto':
        pages, boxes = pages[:1], boxes[:1]
    # Papier-Eigenschaften und Anmerkungen (gleich fuer alle Seiten eines Stuecks)
    loch = art != 'bon' and rng.random() < 0.3
    klammer = art != 'bon' and len(pages) > 1 and rng.random() < 0.5 or (art != 'bon' and rng.random() < 0.1)
    p_rot = {'gut': .15, 'mittel': .35, 'schlecht': .45}[guete]
    p_mark = {'gut': .2, 'mittel': .3, 'schlecht': .3}[guete]
    neu = []
    for i, (p, bx) in enumerate(zip(pages, boxes)):
        if i == 0 and rng.random() < p_mark:
            p = textmarker(p, bx, rng, dpi); fb.append('textmarker')
        if i == 0 and rng.random() < p_rot:
            t = rotstift(p, bx, rng, dpi); fb.append('rotstift-' + '+'.join(t))
        if loch:
            lochung(p, dpi)
        if klammer and i == 0:
            heftklammer(p, dpi, rng)
        neu.append(p)
    pages = neu
    if loch:
        fb.append('lochung')
    if klammer:
        fb.append('heftklammer')
    stark = guete == 'schlecht'
    if form == 'foto':
        p = pages[0]
        a = np.asarray(p, np.float32) / 255
        rgb, al = a[..., :3].copy(), a[..., 3].copy()
        if art == 'bon' and (guete != 'gut' or rng.random() < .3):
            rgb = thermo(rgb, rng, rng_np, stark); fb.append('thermopapier-verblasst')
        if (guete == 'schlecht' and rng.random() < .7) or (guete == 'mittel' and rng.random() < .35):
            rgb, n = knicke(rgb, rng, stark, dpi, geometrie=True); fb.append(n)
        if guete != 'gut' and art != 'bon' and rng.random() < .25:
            fb.append(eselsohr(rgb, al, rng))
        p = Image.fromarray((np.clip(np.concatenate([rgb, al[..., None]], 2), 0, 1) * 255).astype(np.uint8), 'RGBA')
        outW, outH = {'gut': (3024, 4032), 'mittel': (2268, 3024), 'schlecht': (1800, 2400)}[guete]
        im, ff = foto(p, rng, rng_np, guete, outW, outH, bon=(art == 'bon'))
        fb += ff
        q = {'gut': 90, 'mittel': 78, 'schlecht': 62}[guete]
        fb.append(f'jpeg-q{q}')
        datei = stamm + '.jpg'
        im.save(os.path.join(aus, datei), 'JPEG', quality=q, subsampling=2)
    else:
        if art == 'bon':
            # Streifen auf Glasplatte legen
            W, H = int(210 * dpi / 25.4), int(297 * dpi / 25.4)
            neu = []
            for p in pages:
                c = Image.new('RGBA', (W, H), (0, 0, 0, 0))
                c.paste(p, (int(rng.uniform(.1, .5) * (W - p.width)), int(20 * dpi / 25.4)))
                neu.append(c)
            pages = neu
            fb.append('bon-auf-glasplatte')
        geraet = {'gut': 'flachbett',
                  'mittel': rng.choice(['flachbett', 'einzug', 'kopierer']),
                  'schlecht': rng.choice(['fax', 'kopie-der-kopie', 'einzug', 'flachbett'] + (['thermo'] * 2 if art == 'bon' else []))}[guete]
        if art == 'bon' and geraet == 'fax':
            geraet = 'kopie-der-kopie'
        fb.append('geraet-' + geraet)
        winkel = {'gut': rng.uniform(.15, .7), 'mittel': rng.uniform(.5, 1.6), 'schlecht': rng.uniform(1.0, 3.0)}[guete] * rng.choice([1, -1])
        if geraet == 'einzug':
            winkel *= 0.6
        fb.append(f'schraeg-{abs(winkel):.1f}grad')
        extra = []
        pool = ['zu-hell', 'zu-dunkel', 'moire-raster', 'knick', 'staub', 'eselsohr']
        if art == 'bon':
            pool.remove('eselsohr')
        n_extra = {'gut': rng.choice([0, 0, 1]), 'mittel': rng.randint(2, 3), 'schlecht': rng.randint(2, 4)}[guete]
        if geraet in ('fax', 'kopie-der-kopie', 'thermo'):
            pool = [p_ for p_ in pool if p_ not in ('zu-dunkel', 'zu-hell', 'moire-raster')]
        n_extra = min(n_extra, len(pool) - (1 if guete == 'gut' else 0))
        while len(extra) < n_extra:
            e = rng.choice(pool)
            if e in extra or ('zu-hell' in extra and e == 'zu-dunkel') or ('zu-dunkel' in extra and e == 'zu-hell'):
                continue
            if guete == 'gut' and e in ('zu-dunkel', 'eselsohr'):
                continue
            extra.append(e)
        fb += extra
        if geraet == 'einzug':
            fb.append('einzug-streifen')
        q = {'gut': rng.randint(85, 92), 'mittel': rng.randint(62, 76), 'schlecht': rng.randint(40, 55)}[guete]
        bilder = []
        for pi, p in enumerate(pages):
            a = np.asarray(p, np.float32) / 255
            rgb, al = a[..., :3].copy(), a[..., 3].copy()
            if geraet == 'thermo':
                rgb = thermo(rgb, rng, rng_np, True)
            if 'eselsohr' in extra and pi == 0 and art != 'bon':
                eselsohr(rgb, al, rng)
            if 'knick' in extra:
                rgb, n = knicke(rgb, rng, stark, dpi, geometrie=True)
                if pi == 0:
                    fb[fb.index('knick')] = n
            if 'moire-raster' in extra:
                rgb = raster(rgb, rng, dpi, stark)
            p2 = Image.fromarray((np.clip(np.concatenate([rgb, al[..., None]], 2), 0, 1) * 255).astype(np.uint8), 'RGBA')
            a = auflegen(p2, rng, winkel + rng.uniform(-.3, .3), (rng.uniform(-2, 2), rng.uniform(-2, 2)), dpi)
            # Optik/Sensor des Scanners: leichte Unschaerfe
            a = np.asarray(I(a).filter(ImageFilter.GaussianBlur(dpi / 300 * (0.5 if guete == 'gut' else .8))), np.float32) / 255
            if 'zu-hell' in extra:
                a = helligkeit(a, 'zu-hell', stark)
            if 'zu-dunkel' in extra:
                a = helligkeit(a, 'zu-dunkel', stark)
            if geraet == 'einzug':
                a = einzug_streifen(a, rng, dpi, stark)
            if geraet == 'kopierer':
                a = kopie(a, rng, dpi, 1, rng_np)
            if geraet == 'kopie-der-kopie':
                a = kopie(a, rng, dpi, rng.choice([2, 3]), rng_np)
            sigma = {'gut': .01, 'mittel': .025, 'schlecht': .04}[guete]
            staub = (rng.randint(20, 60) if 'staub' in extra else rng.randint(0, 5))
            a = rauschen(a, rng_np, sigma, staub, dpi)
            if geraet == 'fax':
                bilder.append(I(fax(a, rng, dpi, rng_np)).convert('1'))
            else:
                bilder.append(jpeg(I(a), q))
        if geraet == 'fax':
            fb.append('fax-1bit-204x98dpi')
        else:
            fb.append(f'jpeg-q{q}')
        fb.append(f'{dpi}dpi')
        if 'staub' in extra and 'staub-haar' not in fb:
            fb[fb.index('staub')] = 'staub-und-flecken'
        datei = stamm + '.pdf'
        schreibe_pdf(bilder, os.path.join(aus, datei), dpi, q)
    fb.append(f'seiten-{len(pages)}')
    return name, {'datei': datei, 'form': form, 'qualitaet': guete, 'fehlerbilder': fb}


def schreibe_pdf(bilder, pfad, dpi, q):
    """PDF nur aus Seitenbildern (keine Textebene, keine Schriften): JPEG als DCT, Fax als 1 Bit (CCITT G4)."""
    bilder = [im if im.mode == '1' else im.convert('RGB') for im in bilder]
    extra = {} if bilder[0].mode == '1' else {'quality': int(q)}
    bilder[0].save(pfad, 'PDF', save_all=True, append_images=bilder[1:], resolution=float(dpi),
                   title='', author='', creator='Scan', producer='Scan', **extra)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('ein'); ap.add_argument('aus')
    ap.add_argument('--nur', nargs='*'); ap.add_argument('--jobs', type=int, default=4)
    a = ap.parse_args()
    os.makedirs(a.aus, exist_ok=True)
    namen = sorted(f for f in os.listdir(a.ein) if f.endswith('.txt') and os.path.isfile(os.path.join(a.ein, f)))
    form, guete = zuteilung(namen)
    auswahl = [n for n in namen if not a.nur or n in a.nur]
    jobs = [(n, a.ein, a.aus, form[n], guete[n]) for n in auswahl]
    erg = {}
    if a.jobs > 1:
        from multiprocessing import Pool
        with Pool(a.jobs) as pool:
            for n, r in pool.imap_unordered(verarbeite, jobs):
                erg[n] = r; print(len(erg), n, r['datei'], r['qualitaet'], flush=True)
    else:
        for j in jobs:
            n, r = verarbeite(j); erg[n] = r; print(n, r, flush=True)
    pfad = os.path.join(a.aus, 'SETZEN.json')
    alt = {}
    if a.nur and os.path.exists(pfad):
        alt = json.load(open(pfad, encoding='utf-8'))
    alt.update(erg)
    json.dump(dict(sorted(alt.items())), open(pfad, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
