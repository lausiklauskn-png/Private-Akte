#!/usr/bin/env python3
"""Eigener Dokument-Setzer + Scan-/Foto-Simulator (sim3).
Liest nur stapel/*.txt, setzt jedes Stück als heutiges Dokument und verschlechtert es."""
import os, sys, re, json, hashlib, math, random, glob
from multiprocessing import Pool
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps, ImageChops
from reportlab.graphics.barcode import createBarcodeDrawing
from reportlab.graphics.shapes import Group, Rect

STAPEL = '/tmp/claude-0/stadt-pruef/stapel'
AUS = '/tmp/claude-0/stadt-pruef/sim3/aus'
DPI = 150
MM = DPI / 25.4
W, H = int(210 * MM), int(297 * MM)

FD = '/usr/share/fonts/'
F = {
 'sans': [('truetype/liberation/LiberationSans-Regular.ttf', 'truetype/liberation/LiberationSans-Bold.ttf'),
          ('truetype/crosextra/Carlito-Regular.ttf', 'truetype/crosextra/Carlito-Bold.ttf'),
          ('truetype/dejavu/DejaVuSans.ttf', 'truetype/dejavu/DejaVuSans-Bold.ttf'),
          ('opentype/inter/Inter-Regular.otf', 'opentype/inter/Inter-Bold.otf'),
          ('truetype/freefont/FreeSans.ttf', 'truetype/freefont/FreeSansBold.ttf')],
 'serif': [('truetype/liberation/LiberationSerif-Regular.ttf', 'truetype/liberation/LiberationSerif-Bold.ttf'),
           ('truetype/crosextra/Caladea-Regular.ttf', 'truetype/crosextra/Caladea-Bold.ttf'),
           ('truetype/dejavu/DejaVuSerif.ttf', 'truetype/dejavu/DejaVuSerif-Bold.ttf')],
 'mono': [('truetype/liberation/LiberationMono-Regular.ttf', 'truetype/liberation/LiberationMono-Bold.ttf'),
          ('truetype/dejavu/DejaVuSansMono.ttf', 'truetype/dejavu/DejaVuSansMono-Bold.ttf'),
          ('truetype/jetbrains-mono/JetBrainsMono-Regular.ttf', 'truetype/jetbrains-mono/JetBrainsMono-Bold.ttf'),
          ('truetype/freefont/FreeMono.ttf', 'truetype/freefont/FreeMonoBold.ttf')],
 'hand': ['truetype/freefont/FreeSerifItalic.ttf', 'truetype/liberation/LiberationSerif-Italic.ttf',
          'truetype/crosextra/Caladea-Italic.ttf', 'truetype/freefont/FreeSansOblique.ttf',
          'truetype/crosextra/Carlito-Italic.ttf'],
}
_fc = {}
def font(path, size):
    k = (path, int(size))
    if k not in _fc:
        _fc[k] = ImageFont.truetype(FD + path, int(size))
    return _fc[k]

def clean(s):
    return ''.join(ch for ch in s if ord(ch) < 0x2600 or ch in '€✓')

def tw(fnt, s):
    return fnt.getlength(s) if s else 0

# ------------------------------------------------------------ Codes
def _walk(node, m, out):
    from reportlab.graphics.shapes import Group
    for c in getattr(node, 'contents', []):
        if isinstance(c, Group):
            t = c.transform
            a, b, cc, d, e, f = m
            A, B, C, D, E, Fv = t
            nm = (a*A + cc*B, b*A + d*B, a*C + cc*D, b*C + d*D, a*E + cc*Fv + e, b*E + d*Fv + f)
            _walk(c, nm, out)
        elif hasattr(c, 'width') and hasattr(c, 'x') and hasattr(c, 'height'):
            fc = getattr(c, 'fillColor', None)
            if fc is None: continue
            try:
                if fc.red > 0.5 and fc.green > 0.5: continue
            except Exception:
                pass
            x0, y0 = c.x, c.y; x1, y1 = c.x + c.width, c.y + c.height
            a, b, cc, d, e, f = m
            pts = [(a*x + cc*y + e, b*x + d*y + f) for x, y in ((x0, y0), (x1, y1))]
            out.append(pts)

def code_img(kind, value, scale=3.0, **kw):
    d = createBarcodeDrawing(kind, value=value, **kw)
    ex = d.expandUserNodes()
    rects = []
    _walk(ex, (1, 0, 0, 1, 0, 0), rects)
    w, h = int(math.ceil(d.width * scale)) + 2, int(math.ceil(d.height * scale)) + 2
    im = Image.new('L', (w, h), 255)
    dr = ImageDraw.Draw(im)
    for (xa, ya), (xb, yb) in rects:
        X0, X1 = sorted((xa * scale, xb * scale)); Y0, Y1 = sorted((h - ya * scale, h - yb * scale))
        dr.rectangle([round(X0), round(Y0), round(X1) - 1, round(Y1) - 1], fill=0)
    return im

def asc(s):
    t = {'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'Ä': 'Ae', 'Ö': 'Oe', 'Ü': 'Ue', 'ß': 'ss', '–': '-', '·': '-', '€': 'EUR'}
    return ''.join(t.get(c, c) for c in s).encode('ascii', 'ignore').decode()

def qr(value, px):
    im = code_img('QR', asc(value), scale=1, barWidth=px, barHeight=px, barBorder=2, barLevel='M')
    return im.resize((px, px), Image.NEAREST)

# ------------------------------------------------------------ Analyse
MONEY = re.compile(r'(\d{1,3}(?:\.\d{3})*,\d{2})\s*(?:€|EUR)?')
DATE = re.compile(r'\b(\d{1,2})\.(\d{1,2})\.(20\d\d|\d\d)\b')
IBAN = re.compile(r'\b(DE\d{2}(?: ?\d{4}){4} ?\d{2})\b')
NUMRE = re.compile(r'(Kunden-?(?:nr|nummer)|Kundennr|Vertragskonto|Vertrags-?nr|Rechnungs-?nr|Rechnungsnummer|Sendungs-?nummer|Bestell(?:ung|nr|nummer)|Mitglieds-?nr|Versicherungs-?(?:schein|nr|nummer)|Aktenzeichen|Az\.|Kassenzeichen|Steuernummer|Mieter-Nr|Objekt-Nr|BG-Nummer|Personenkennzeichen|Vorgangs-?nr|Auftrags-?nr|Anschluss-ID|Kinder-?geld-?nr|Zeichen)\.?:?\s*([A-Z0-9][A-Za-z0-9\-/ ]{3,24}?[A-Za-z0-9])(?=\s{2}|\s*[·,;)]|\s*$)', re.I | re.M)
BEHOERDE = re.compile(r'(Finanzamt|Stadt |Stadtverwaltung|Gemeinde|Landratsamt|Landkreis|Amtsgericht|Gericht|Familienkasse|Jobcenter|Rentenversicherung|Standesamt|Bundesagentur|Elterngeldstelle|Zulassungsstelle|Bauamt|Kreisverwaltung|Beitragsservice|Rundfunk|Amt |Behörde|Landesamt|Kreiskasse|Stadtkasse|Gemeindekasse|Unterhaltsvorschuss|Bürgeramt|Schulamt|Nachlassgericht|Pflegekasse|Krankenkasse|Kasse\b|DRV|AOK|Wohngeld|Kreis)', re.I)
ZAHL = re.compile(r'(Rechnung|Mahnung|Nachzahlung|Zahlbetrag|Abschlag|zahlbar|überweisen|Mahngebühr|Forderung|offener Betrag|Gesamtbetrag|Rückstand|fällig)', re.I)
SAL = re.compile(r'^\s*(Sehr geehrte|Hallo|Liebe|Lieber|Guten Tag|Hi |Moin|Servus)')
GRUSS = re.compile(r'(Mit freundlichen Grüßen|Freundliche Grüße|Viele Grüße|Hochachtungsvoll|Mit besten Grüßen|Beste Grüße|Herzliche Grüße|Liebe Grüße|Mit freundlichem Gruß)', re.I)
FOOT = re.compile(r'(HRB|HRA|Amtsgericht|Geschäftsführ|IBAN|BIC|USt-?Id|Steuer-?Nr|Registergericht|Vorstand|Aufsichtsrat|Sitz der Gesellschaft|Genossenschaftsregister|VR \d)')
INFOKEY = re.compile(r'^\s*(Verbrauchsstelle|Zähler-?Nr|Anschluss-ID|Police|Vertrags?-?Nr|Kunden|Vertrags|Rechnungs|Mieter|Objekt|Aktenzeichen|Az|Unser Zeichen|Ihr Zeichen|Ihre Zeichen|Datum|Steuernummer|Mitglieds|Versicherungs|Kassenzeichen|Personenkennz|BG-Nummer|Telefon|Durchwahl|Sachbearbeit|Ansprechpartner|Auskunft|Zimmer|E-Mail|Bearbeiter|Vorgang|Auftrags)', re.I)
POSTAL = re.compile(r'\b\d{5}\s+\S')

ORG = re.compile(r'(GmbH|\beG\b|\bAG\b|Praxis|Apotheke|Bank|Kasse|Amt|Schule|Verein|Verwaltung|Versicherung|Stadtwerke|Gericht|Institut|Klinik|Kita|Gymnasium|Musikschule|Labor|Notar|Steuerberat|Lohnbüro|Pflege|Feuerwehr|Kanzlei|Werkstatt|Zentrum|Markt|Glasfaser|Firma|Landrats|BEISPIEL-[A-ZÄÖÜ]|Beispiel-[A-ZÄÖÜ][a-zäöü]+(?:straße|kasse|bank|bau)|Elektro|Energie|Hausarzt|Zahnarzt|Krankenhaus|Kirche|Gemeinde|Stadt|Kindergarten)')
PROMO = re.compile(r'(statt \d|Coupon|Prospekt|\bWerbung\b|Rabatt|nur vom|\bAktion\b|% auf|Gutschein|gratis|kostenlos|Jetzt (sichern|bestellen|zugreifen)|Black-Week|Sale|Angebot gültig|nur noch bis|Nur für Sie|QR-Code scannen|Startguthaben|Jahresgebühr|Newsletter)', re.I)

def classify(txt, lines):
    first = '\n'.join(lines[:3])
    if re.match(r'\s*(Von|From|Absender):\s*\S+.*<?\S+@', lines[0] if lines else ''):
        return 'mail'
    if re.search(r'^\[\d\d\.\d\d\.\d\d, \d\d:\d\d\]', txt, re.M) or 'SMS' in first:
        return 'chat'
    bonhits = len(re.findall(r'(SUMME|Summe|Bon-Nr|Bon \d|TSE|Rückgeld|Zurück|Kasse \d|MwSt|\bBAR\b|\bBar\b|EC-Karte|Kartenzahlung|Beleg-Nr|Einzahlungsbeleg|Geldautomat|QUITTUNG)', txt))
    maxlen = max((len(l) for l in lines if not l.startswith('[')), default=0)
    if bonhits >= 2 and maxlen <= 62 and len(txt) < 1400:
        return 'bon'
    if re.search(r'(Portal|Online-Banking|Ausdruck vom)', lines[0]):
        return 'portal'
    if re.search(r'Kontoauszug|Auszug \d', first) or len(re.findall(r'^\s*\d\d\.\d\d\.\s+.*[+-][\d.]+,\d\d', txt, re.M)) >= 3:
        return 'konto'
    if '[Terminkarte' in first:
        return 'karte'
    if re.search(r'(handschriftlich|Kuli-Notiz|\[Notiz|Zettel)', first, re.I) or (len(txt) < 330 and not ORG.search(lines[0]) and 'IBAN' not in txt and re.search(r'(\bhab\b|nicht vergessen|!!|\bdir\b|\bdu\b|\bmir\b|\bich\b|\bwir\b|Danke|Gruß)', txt, re.I)):
        return 'zettel'
    if '[Aushang' in first:
        return 'aushang'
    if len(PROMO.findall(txt)) >= 2 and not re.search(r'\bIBAN\b|Bescheid', txt):
        return 'werbung'
    return 'brief'

# ------------------------------------------------------------ Hand & Stempel
def hand(dr_img, x, y, text, size, color, rng, path=None, slant=None):
    """Handschrift-Ersatz: kursive Schrift, je Wort leicht gedreht, Grundlinie wandert, Strichstärke schwankt."""
    path = path or rng.choice(F['hand'])
    ang0 = rng.uniform(-2.5, 2.5) if slant is None else slant
    cx = x; base = y
    for wd in text.split(' '):
        if not wd:
            cx += size * 0.35; continue
        s = int(size * rng.uniform(0.95, 1.06))
        f2 = font(path, s)
        gw = int(tw(f2, wd)) + 2 * s
        tile = Image.new('L', (gw, s * 2), 0)
        ImageDraw.Draw(tile).text((s, s * 0.35), wd, font=f2, fill=255, stroke_width=0, stroke_fill=255)
        a = np.asarray(tile).astype(np.float32)
        # leichte Wellenverformung
        sh = (np.sin(np.arange(gw) / rng.uniform(18, 35) + rng.uniform(0, 6)) * s * 0.04).astype(int)
        for c in range(gw):
            if sh[c]: a[:, c] = np.roll(a[:, c], sh[c])
        tile = Image.fromarray(a.astype(np.uint8)).rotate(rng.uniform(-2.5, 2.5) + ang0, resample=Image.BICUBIC)
        base += rng.uniform(-1.5, 1.5) * s / 30
        col = Image.new('RGB', tile.size, color)
        dr_img.paste(col, (int(cx - s), int(base - s * 0.35)), tile.point(lambda v: int(v * 0.9)))
        cx += tw(f2, wd) + size * rng.uniform(0.3, 0.45)
    return cx

def signatur(img, x, y, w, rng, color=(20, 30, 110)):
    dr = ImageDraw.Draw(img)
    pts = []
    n = rng.randint(4, 7)
    for i in range(160):
        t = i / 159
        px = x + t * w + 18 * math.sin(t * n * 2 * math.pi) * rng.uniform(0.6, 1)
        py = y + 22 * math.cos(t * n * 2 * math.pi + 0.5) * (1 - 0.5 * t) + rng.uniform(-1, 1) - t * 12
        pts.append((px, py))
    dr.line(pts, fill=color, width=rng.choice([2, 3]), joint='curve')
    dr.line([(x + w * 0.1, y + 30), (x + w * 1.05, y + 22)], fill=color, width=2)

def stempel(img, x, y, datum, rng):
    col = rng.choice([(190, 30, 40), (30, 50, 170), (60, 110, 60)])
    layer = Image.new('L', (420, 170), 0)
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([4, 4, 412, 160], radius=14, outline=255, width=5)
    f1 = font('truetype/liberation/LiberationSans-Bold.ttf', 40)
    f2 = font('truetype/liberation/LiberationMono-Bold.ttf', 40)
    d.text((40, 22), 'EINGEGANGEN', font=f1, fill=255)
    d.text((95, 92), datum, font=f2, fill=255)
    arr = np.array(layer).astype(np.float32)
    arr *= np.clip(np.random.default_rng(rng.randint(0, 10**9)).normal(0.8, 0.25, arr.shape), 0, 1)
    layer = Image.fromarray(arr.astype(np.uint8)).rotate(rng.uniform(-12, 12), expand=True, resample=Image.BICUBIC)
    layer = layer.resize((int(layer.width * 0.6), int(layer.height * 0.6)))
    img.paste(Image.new('RGB', layer.size, col), (x, y), layer.point(lambda v: int(v * 0.85)))

def logo(img, x, y, s, color, kind, rng):
    d = ImageDraw.Draw(img)
    if kind == 'wappen':
        d.polygon([(x, y), (x + s, y), (x + s, y + s * 0.65), (x + s / 2, y + s * 1.1), (x, y + s * 0.65)], fill=color)
        for i in range(3):
            d.rectangle([x + s * 0.18 + i * s * 0.24, y + s * 0.12, x + s * 0.3 + i * s * 0.24, y + s * 0.62], fill=(255, 255, 255))
    elif kind == 'kreis':
        d.ellipse([x, y, x + s, y + s], fill=color)
        d.ellipse([x + s * .25, y + s * .25, x + s * .75, y + s * .75], fill=(255, 255, 255))
        d.pieslice([x + s * .35, y + s * .35, x + s * .65, y + s * .65], 0, 270, fill=color)
    elif kind == 'haus':
        d.polygon([(x, y + s * .45), (x + s / 2, y), (x + s, y + s * .45)], fill=color)
        d.rectangle([x + s * .12, y + s * .45, x + s * .88, y + s], fill=color)
        d.rectangle([x + s * .4, y + s * .62, x + s * .6, y + s], fill=(255, 255, 255))
    elif kind == 'blatt':
        d.ellipse([x, y + s * .2, x + s * .7, y + s], fill=color)
        d.ellipse([x + s * .3, y, x + s, y + s * .8], fill=tuple(min(255, c + 60) for c in color))
    elif kind == 'raute':
        d.polygon([(x + s / 2, y), (x + s, y + s / 2), (x + s / 2, y + s), (x, y + s / 2)], fill=color)
        d.polygon([(x + s / 2, y + s * .25), (x + s * .75, y + s / 2), (x + s / 2, y + s * .75), (x + s * .25, y + s / 2)], fill=(255, 255, 255))
    else:
        for i in range(3):
            d.rectangle([x + i * s * .36, y + s * (0.6 - i * 0.25), x + i * s * .36 + s * .26, y + s], fill=color)

PAL = [(0, 84, 147), (163, 22, 33), (0, 120, 80), (230, 120, 0), (90, 40, 130), (20, 20, 20), (0, 140, 170), (120, 80, 20), (200, 0, 110)]

# ------------------------------------------------------------ Seitenaufbau
class Doc:
    def __init__(self, rng, fam, size=W, height=H):
        self.rng = rng; self.pages = []; self.fam = fam
        self.w, self.h = size, height
        self.reg = font(fam[0], 20); self.bold = font(fam[1], 20)
        self.left, self.right = int(25 * MM), int(size - 20 * MM)
        self.bottom = int(height - 30 * MM)
        self.cont_header = None
        self.newpage()
    def newpage(self):
        im = Image.new('RGB', (self.w, self.h), (255, 255, 255))
        self.pages.append(im); self.img = im; self.d = ImageDraw.Draw(im)
        self.y = int(20 * MM)
        if len(self.pages) > 1 and self.cont_header:
            self.cont_header(self)
    def need(self, h):
        if self.y + h > self.bottom:
            self.newpage()

def body(doc, lines, fsize=20, color=(25, 25, 25), table_style=False, accent=(0, 0, 0)):
    """Setzt Textzeilen: Tabellenzeilen spaltentreu, Fließtext umgebrochen."""
    reg = font(doc.fam[0], fsize); bold = font(doc.fam[1], fsize)
    lh = int(fsize * 1.38)
    usable = doc.right - doc.left
    tlines = [l for l in lines if re.search(r'\S {2,}\S', l.rstrip()) and len(l) <= 120]
    maxcol = max([len(l.rstrip()) for l in tlines] + [78])
    cw = usable / maxcol
    row = 0
    handmode = False
    for raw in lines:
        l = clean(raw.rstrip())
        if not l.strip():
            doc.y += int(lh * 0.6); row = 0; handmode = False; continue
        if handmode:
            for part in wrap(l.strip(), font(F['hand'][0], fsize + 10), usable):
                doc.need(lh + 14)
                hand(doc.img, doc.left + 10, doc.y, part, fsize + 10, (25, 35, 130), doc.rng)
                doc.y += lh + 14
            continue
        if re.search(r'(handschriftlich|Kuli-Notiz|Notiz drauf|Randnotiz)', l, re.I) and re.search(r':\s*(-+|\])?\s*$', l):
            handmode = True
        if re.fullmatch(r'\s*[-=_]{5,}\s*', l):
            doc.need(lh // 2)
            x0 = doc.left + (len(l) - len(l.lstrip())) * cw
            doc.d.line([(x0, doc.y + lh // 4), (doc.left + len(l) * cw, doc.y + lh // 4)], fill=color, width=2 if '=' in l else 1)
            doc.y += lh // 2; continue
        isbold = (l.strip().isupper() and len(re.sub(r'[^A-ZÄÖÜ]', '', l)) >= 5) or re.match(r'\s*(Summe|Gesamt|Zahlbetrag|NACHZAHLUNG|Nachzahlung|Rechnungsbetrag|Endbetrag|Offener Betrag|Gesamtbetrag)', l)
        f = bold if isbold else reg
        if re.search(r'\S {2,}\S', l) and len(l) <= 120:
            segs = [(m.start(), m.group()) for m in re.finditer(r'\S+(?: \S+)*', l)]
            doc.need(lh)
            if table_style and row % 2 == 1:
                doc.d.rectangle([doc.left - 6, doc.y - 2, doc.right + 4, doc.y + lh - 4], fill=(240, 242, 245))
            prev_end = 0
            sc = 1.0
            for i, (c, s) in enumerate(segs):
                x = doc.left + c * cw
                wd = tw(f, s)
                numeric = re.fullmatch(r'[-+]?\s?[\d.,]+\s*(€|EUR|%|H|S|kWh|m³|St\.?|[AB])?|[-+]?\d[\d.,]*,[\d–-]+ ?€?|\d+,– ?€?', s)
                if numeric and i > 0:
                    x = doc.left + (c + len(s)) * cw - wd
                if x < prev_end + cw * 0.7 and i > 0:
                    x = prev_end + cw * 0.7
                if x + wd > doc.right + 30:
                    x = max(prev_end + 4, doc.right + 30 - wd)
                doc.d.text((x, doc.y), s, font=f, fill=color)
                prev_end = x + wd
            doc.y += lh; row += 1
            continue
        row = 0
        ind = (len(l) - len(l.lstrip())) * cw * 0.9
        words = l.strip().split(' ')
        cur = ''
        out = []
        for wds in words:
            t = (cur + ' ' + wds) if cur else wds
            if tw(f, t) > usable - ind and cur:
                out.append(cur); cur = wds
            else:
                cur = t
        out.append(cur)
        for k, o in enumerate(out):
            doc.need(lh)
            doc.d.text((doc.left + ind + (0 if k == 0 else 0), doc.y), o, font=f, fill=color)
            doc.y += lh

def split_blocks(lines):
    blocks, cur = [], []
    for l in lines:
        if l.strip():
            cur.append(l)
        else:
            if cur: blocks.append(cur); cur = []
    if cur: blocks.append(cur)
    return blocks

def brief(txt, lines, rng, info):
    kindlogo = 'wappen' if info['behoerde'] else rng.choice(['kreis', 'haus', 'blatt', 'raute', 'balken'])
    fam = rng.choice(F['serif'] if info['behoerde'] and rng.random() < 0.6 else F['sans'] + F['serif'][:1])
    doc = Doc(rng, fam)
    color = PAL[rng.randrange(len(PAL))]
    # Kopf: erste Zeilen bis Leerzeile (max 6, keine Langzeilen)
    i = 0; head = []
    while i < len(lines) and lines[i].strip():
        i += 1
    if 1 <= i <= 6 and i < len(lines) and all(len(l) <= 110 for l in lines[:i]):
        head = lines[:i]; rest = lines[i:]
    else:
        head = lines[:1]; rest = lines[1:]
    if head and len(head[0].strip()) > 48:
        parts = re.split(r'\s+[–|·-]\s+', head[0].strip(), maxsplit=1)
        if len(parts) == 2:
            head = [parts[0]] + ['– ' + parts[1]] + head[1:]
    foot = [h for h in head[1:] if FOOT.search(h)]
    sub = [h for h in head[1:] if not FOOT.search(h)]
    name = clean(head[0].strip()) if head else ''
    # Wortmarke
    x = doc.left; y0 = int(12 * MM)
    if name:
        fsz = 42 if len(name) < 28 else (34 if len(name) < 40 else 28)
        wf = font(fam[1], fsz)
        while tw(wf, name) > doc.right - doc.left - 230 and fsz > 16:
            fsz -= 2; wf = font(fam[1], fsz)
        if rng.random() < 0.5:
            logo(doc.img, doc.right - 110, y0, 100, color, kindlogo, rng)
            doc.d.text((x, y0 + 8), name, font=wf, fill=color)
        else:
            logo(doc.img, x, y0, 90, color, kindlogo, rng)
            doc.d.text((x + 110, y0 + 18), name, font=wf, fill=color)
        yy = y0 + 112
        sf = font(fam[0], 17)
        for s in sub:
            for part in wrap(clean(s.strip()), sf, doc.right - doc.left):
                doc.d.text((x, yy), part, font=sf, fill=(80, 80, 80)); yy += 23
        doc.d.line([(x, yy + 4), (doc.right, yy + 4)], fill=color, width=3)
        doc.y = yy + 20
    # Falz- und Lochmarken
    for ymm in (105, 210):
        doc.d.line([(int(5 * MM), int(ymm * MM)), (int(10 * MM), int(ymm * MM))], fill=(120, 120, 120), width=2)
    doc.d.line([(int(4 * MM), int(148.5 * MM)), (int(11 * MM), int(148.5 * MM))], fill=(120, 120, 120), width=2)
    # Anschrift
    k = 0
    while k < len(rest) and not rest[k].strip(): k += 1
    j = k
    while j < len(rest) and rest[j].strip(): j += 1
    addr = rest[k:j]
    if len(addr) == 1 and POSTAL.search(addr[0]) and addr[0].count(',') >= 1 and len(addr[0].strip()) <= 90 and not re.search(r'\d,\d\d', addr[0]):
        ps = [p.strip() for p in addr[0].strip().split(', ')]
        addr = [p + ',' for p in ps[:-1]] + [ps[-1]]
    is_addr = 1 <= len(addr) <= 7 and any(POSTAL.search(a) and len(a.strip()) <= 50 for a in addr[-2:]) and all(len(a.strip()) <= 55 for a in addr)
    right_col = []
    codes = []
    winy = int(45 * MM)
    if is_addr:
        body_lines = rest[j:]
        # Rücksendezeile aus Kopfdaten
        post = ''
        for s in sub + foot:
            for part in re.split(r'\s*[·|]\s*', s):
                if POSTAL.search(part) or re.search(r'(straße|str\.|weg|platz|ring|gasse|allee|Postfach)\s*\d', part, re.I):
                    post += ' · ' + part.strip()
        rz = clean((name + post)[:90])
        rf = font(fam[0], 13)
        doc.d.text((doc.left, winy + 8), rz, font=rf, fill=(60, 60, 60))
        doc.d.line([(doc.left, winy + 26), (doc.left + tw(rf, rz), winy + 26)], fill=(90, 90, 90), width=1)
        ay = winy + 40
        if info.get('franking'):
            dm = code_img('ECC200DataMatrix', info['franking'], scale=1).resize((88, 88), Image.NEAREST)
            fx = int(105 * MM) - 92
            doc.img.paste(dm.convert('RGB'), (fx, winy + 30))
            tf = font('truetype/liberation/LiberationSans-Regular.ttf', 12)
            doc.d.text((fx - 108, winy + 40), 'Entgelt bezahlt', font=tf, fill=(30, 30, 30))
            doc.d.text((fx - 108, winy + 58), asc(info['franking'])[:12], font=tf, fill=(30, 30, 30))
            codes.append('datamatrix-frankierung')
        if info.get('code128'):
            bc = code_img('Code128', asc(info['code128']), scale=1.6, barHeight=18, barWidth=0.8, quiet=0)
            doc.img.paste(bc.convert('RGB'), (doc.left, ay))
            ay += bc.height + 8
            codes.append('code128')
        af = font(fam[0], 21)
        ay = max(ay, int(54 * MM))
        for a in addr:
            doc.d.text((doc.left, ay), clean(a.strip()), font=af, fill=(10, 10, 10)); ay += 29
        addr_bottom = max(ay, int(90 * MM))
    else:
        body_lines = rest
        addr_bottom = doc.y
        if info.get('code128'):
            bc = code_img('Code128', asc(info['code128']), scale=1.6, barHeight=18, barWidth=0.8, quiet=0)
            doc.img.paste(bc.convert('RGB'), (doc.right - bc.width, max(doc.y - 10, int(30 * MM))))
            addr_bottom = max(addr_bottom, int(30 * MM) + bc.height + 10)
            codes.append('code128')
    # Infoblock: rechte Teile und Schlüsselzeilen vor der Anrede
    nb = []
    sal_seen = False
    for idx, l in enumerate(body_lines):
        if SAL.match(l): sal_seen = True
        if not sal_seen and idx < 18 and is_addr:
            m = re.search(r'^(.*?\S)?\s{3,}(\S.*)$', l.rstrip())
            lead = len(l) - len(l.lstrip())
            if lead >= 28 and len(l.strip()) <= 45 and re.search(r'\d|:', l):
                right_col.append(l.strip()); continue
            if m and m.group(1) and m.start(2) >= 38 and len(m.group(2)) <= 40 and not re.search(r'\d,\d\d', m.group(2)) and re.search(r'\d|:', m.group(2)):
                right_col.append(m.group(2).strip())
                left = m.group(1)
                if INFOKEY.match(left) and len(left.strip()) <= 45:
                    right_col.append(left.strip())
                else:
                    nb.append(left)
                continue
            if INFOKEY.match(l) and len(l.strip()) <= 48 and not re.search(r'\S {3,}\S', l.strip()):
                right_col.append(l.strip()); continue
        nb.append(l)
    body_lines = nb
    ry = int(50 * MM) if is_addr else doc.y
    rx = int(125 * MM)
    if right_col:
        inf = font(fam[0], 17)
        for r in right_col:
            r = clean(r)
            while tw(inf, r) > doc.right - rx + 25 and len(r) > 10:
                cut = r.rfind(' ', 0, len(r) - 3)
                if cut < 5: break
                doc.d.text((rx, ry), r[:cut], font=inf, fill=(30, 30, 30)); ry += 23; r = '  ' + r[cut + 1:]
            doc.d.text((rx, ry), r, font=inf, fill=(30, 30, 30)); ry += 23
    if info.get('girocode'):
        g = qr(info['girocode'], 150)
        ry += 8
        doc.img.paste(g.convert('RGB'), (rx, ry))
        gf = font('truetype/liberation/LiberationSans-Bold.ttf', 13)
        doc.d.text((rx + 158, ry + 20), 'GiroCode', font=gf, fill=(0, 70, 140))
        doc.d.text((rx + 158, ry + 38), 'Zahlen mit Code', font=font('truetype/liberation/LiberationSans-Regular.ttf', 12), fill=(60, 60, 60))
        ry += 158; codes.append('girocode')
    doc.y = max(addr_bottom, ry) + 26
    if info.get('bescheid_code'):
        bc = code_img('I2of5', info['bescheid_code'], scale=1.5, barHeight=14, barWidth=0.9, checksum=0, bearers=0)
        bc = bc.rotate(90, expand=True)
        doc.img.paste(bc.convert('RGB'), (int(12 * MM), int(160 * MM)))
        codes.append('strichcode-bescheid')
    # Betreff fett
    k = 0
    while k < len(body_lines) and not body_lines[k].strip(): k += 1
    bsz = 21
    BKW = re.compile(r'(rechnung|abrechnung|bescheid|mahnung|kündigung|bestätigung|information|erinnerung|angebot|vertrag|antrag|mitteilung|einladung|bescheinigung|anpassung|auftrag|aufforderung|nachweis|zuteilung|termin|betreff)', re.I)
    cand = [n for n in range(k, min(len(body_lines), k + 6)) if body_lines[n].strip()]
    pre = []
    for n in cand:
        if SAL.match(body_lines[n]): break
        if BKW.search(body_lines[n]) and n != k and len(body_lines[n].strip()) < 110 and not re.search(r'\S {3,}\S', body_lines[n].strip()):
            pre = body_lines[k:n]; k = n; break
    if pre:
        body(doc, pre, bsz)
    if k < len(body_lines) and not SAL.match(body_lines[k]) and len(body_lines[k].strip()) < 110:
        bf = font(fam[1], 22)
        nxt = k
        while nxt < len(body_lines) and body_lines[nxt].strip() and nxt - k < 2 and not re.search(r'\S {3,}\S', body_lines[nxt].strip()):
            t = clean(body_lines[nxt].strip())
            for part in wrap(t, bf, doc.right - doc.left):
                doc.need(30); doc.d.text((doc.left, doc.y), part, font=bf, fill=(0, 0, 0)); doc.y += 30
            nxt += 1
        body_lines = body_lines[nxt:]
        doc.y += 8
    # Folgeseiten-Kopf
    def ch(dd):
        logo(dd.img, dd.left, int(10 * MM), 40, color, kindlogo, rng)
        dd.d.text((dd.left + 52, int(10 * MM) + 8), name, font=font(fam[1], 20), fill=color)
        dd.y = int(28 * MM)
    doc.cont_header = ch
    # Fußzeile reservieren
    if foot:
        doc.bottom = int(H - 34 * MM)
    # Unterschrift-Platz
    out = []
    gi = None
    for idx, l in enumerate(body_lines):
        out.append(l)
    tstyle = info['rechnung']
    gruss_idx = [n for n, l in enumerate(out) if GRUSS.search(l)]
    if gruss_idx and rng.random() < 0.55:
        n0 = gruss_idx[-1]
        body(doc, out[:n0 + 1], bsz, table_style=tstyle)
        doc.need(80)
        signatur(doc.img, doc.left + 10, doc.y + 30, rng.randint(160, 260), rng)
        doc.y += 66
        body(doc, out[n0 + 1:], bsz, table_style=tstyle)
        info['extras'].append('unterschrift')
    else:
        body(doc, out, bsz, table_style=tstyle)
    # Fußzeile auf jeder Seite
    if foot:
        ff = font(fam[0], 14)
        items = []
        for fl in foot:
            items += [p.strip() for p in re.split(r'\s+[·|]\s+', clean(fl)) if p.strip()]
        cols = 3 if len(items) >= 3 else len(items)
        for p in doc.pages:
            dd = ImageDraw.Draw(p)
            fy = int(H - 28 * MM)
            dd.line([(doc.left, fy - 8), (doc.right, fy - 8)], fill=(150, 150, 150), width=1)
            cwid = (doc.right - doc.left) / max(cols, 1)
            for n, it in enumerate(items):
                c = n % cols; r = n // cols
                t = it
                while tw(ff, t) > cwid - 10 and len(t) > 8:
                    t = t[:-1]
                if t != it:  # passt nicht: eigene Zeile über volle Breite
                    dd.text((doc.left, fy + 20 * r), it, font=ff, fill=(90, 90, 90))
                else:
                    dd.text((doc.left + c * cwid, fy + 20 * r), it, font=ff, fill=(90, 90, 90))
    return doc.pages, codes

def wrap(t, f, maxw):
    out, cur = [], ''
    for w_ in t.split(' '):
        n = (cur + ' ' + w_) if cur else w_
        if tw(f, n) > maxw and cur:
            out.append(cur); cur = w_
        else:
            cur = n
    out.append(cur)
    return out

def mail(txt, lines, rng, info):
    fam = rng.choice(F['sans'])
    doc = Doc(rng, fam)
    hdr = []
    i = 0
    while i < len(lines) and re.match(r'\s*(Von|An|Cc|Datum|Betreff|Gesendet|Antwort an|From|To|Subject|Date|Anhang|Anhänge):', lines[i]):
        hdr.append(lines[i]); i += 1
    rest = lines[i:]
    subj = next((h.split(':', 1)[1].strip() for h in hdr if h.lower().startswith('betreff')), '')
    sf = font(fam[0], 14)
    stamp = '%02d.%02d.26, %02d:%02d' % (rng.randint(1, 28), rng.randint(1, 12), rng.randint(7, 22), rng.randint(0, 59))
    prov = rng.choice(['Webmail', 'Posteingang – Mail', 'Mail – Nachricht', 'Postfach'])
    def ch(dd):
        dd.d.text((dd.left - 60, int(8 * MM)), stamp, font=sf, fill=(60, 60, 60))
        dd.d.text((dd.w / 2 - 80, int(8 * MM)), prov, font=sf, fill=(60, 60, 60))
        dd.y = int(18 * MM)
    doc.cont_header = ch
    ch(doc)
    doc.d.rectangle([doc.left - 20, doc.y, doc.right + 20, doc.y + 46], fill=rng.choice([(0, 90, 160), (40, 40, 48), (0, 120, 110), (180, 40, 40)]))
    doc.d.text((doc.left, doc.y + 10), clean(prov), font=font(fam[1], 22), fill=(255, 255, 255))
    doc.y += 70
    if subj:
        for p in wrap(clean(subj), font(fam[1], 27), doc.right - doc.left):
            doc.d.text((doc.left, doc.y), p, font=font(fam[1], 27), fill=(0, 0, 0)); doc.y += 36
        doc.y += 10
    hf = font(fam[0], 18); hb = font(fam[1], 18)
    for h in hdr:
        k, v = h.split(':', 1)
        doc.d.text((doc.left, doc.y), k.strip() + ':', font=hb, fill=(70, 70, 70))
        for p in wrap(clean(v.strip()), hf, doc.right - doc.left - 120):
            doc.d.text((doc.left + 120, doc.y), p, font=hf, fill=(20, 20, 20)); doc.y += 26
    doc.y += 8
    doc.d.line([(doc.left, doc.y), (doc.right, doc.y)], fill=(180, 180, 180), width=2)
    doc.y += 22
    doc.bottom = int(H - 20 * MM)
    body(doc, rest, 20)
    url = 'https://mail.example/msg/%d' % rng.randint(10**6, 10**7)
    for n, p in enumerate(doc.pages):
        dd = ImageDraw.Draw(p)
        dd.text((doc.left - 60, H - int(10 * MM)), url, font=sf, fill=(60, 60, 60))
        dd.text((doc.right - 30, H - int(10 * MM)), '%d/%d' % (n + 1, len(doc.pages)), font=sf, fill=(60, 60, 60))
    return doc.pages, []

def bon(txt, lines, rng, info):
    path = rng.choice(F['mono'])
    fs = 22
    f = font(path[0], fs); fb = font(path[1], fs + 4)
    maxc = max(len(l) for l in lines)
    cwp = tw(f, 'M')
    wpx = int(max(80 * MM, maxc * cwp + 60))
    lh = int(fs * 1.3)
    extra = 330
    hpx = int(len(lines) * lh + 200 + extra)
    im = Image.new('RGB', (wpx, hpx), (250, 249, 244))
    d = ImageDraw.Draw(im)
    logo(im, wpx // 2 - 35, 25, 70, (30, 30, 30), rng.choice(['kreis', 'raute', 'balken', 'haus']), rng)
    y = 115
    handmode = False
    for n, l in enumerate(lines):
        l = clean(l.rstrip())
        if handmode and l.strip():
            hand(im, 30, y + 4, l.strip(), 28, (30, 40, 140), rng); y += lh + 12; continue
        if n == 0 and l.strip():
            d.text((30 + (len(l) - len(l.lstrip())) * cwp * 0.6, y), l.strip(), font=fb, fill=(15, 15, 15)); y += lh + 6; continue
        if l.startswith('[') and l.endswith(']'):
            hand(im, 30, y + 4, l, 26, (30, 40, 140), rng); y += lh + 10
            if re.search(r'Notiz|Kuli|handschr', l) and l.rstrip().endswith(':]'): handmode = True
            continue
        d.text((30, y), l, font=f, fill=(15, 15, 15)); y += lh
    codes = []
    y += 20
    q = qr(info['qrlink'], 170)
    im.paste(q.convert('RGB'), (wpx // 2 - 85, y)); y += 178
    codes.append('qr-link')
    if info.get('code128'):
        bc = code_img('Code128', asc(info['code128']), scale=1.8, barHeight=16, barWidth=0.8, quiet=0)
        if bc.width < wpx - 20:
            im.paste(bc.convert('RGB'), ((wpx - bc.width) // 2, y)); y += bc.height + 10
            codes.append('code128')
    im = im.crop((0, 0, wpx, min(hpx, y + 40)))
    return [im], codes

def chat(txt, lines, rng, info):
    sw, sh = 1080, max(1400, 300 + 140 * len(lines) + len(txt) // 2 * 3)
    im = Image.new('RGB', (sw, sh), (236, 229, 221))
    d = ImageDraw.Draw(im)
    fam = rng.choice(F['sans'][:3])
    f = font(fam[0], 34); fb = font(fam[1], 36); fs = font(fam[0], 26)
    d.rectangle([0, 0, sw, 60], fill=(7, 94, 84) if 'SMS' not in txt[:60] else (30, 30, 30))
    d.text((30, 14), '%02d:%02d' % (rng.randint(7, 22), rng.randint(0, 59)), font=fs, fill=(255, 255, 255))
    d.text((sw - 150, 14), '87 %', font=fs, fill=(255, 255, 255))
    d.rectangle([0, 60, sw, 190], fill=(7, 94, 84) if 'SMS' not in txt[:60] else (45, 45, 50))
    meta = [l for l in lines if l.startswith('[') and not re.match(r'\[\d\d\.', l)]
    msgs = [l for l in lines if l.strip() and l not in meta]
    title = 'Gruppe' if re.search(r'^\[\d\d', txt, re.M) else ''
    hdrs = [m for m in msgs if re.match(r'(Absender|Von):', m) or re.match(r'^\d\d\.\d\d\.\d{4} \d\d:\d\d$', m.strip())]
    for h_ in hdrs: msgs.remove(h_)
    d.text((40, 90), clean(' · '.join(hdrs) if hdrs else ', '.join(dict.fromkeys(re.findall(r'\] ([^:]+):', txt))) or 'Chat'), font=fb, fill=(255, 255, 255))
    y = 230
    pages_img = []
    if re.search(r'^\[\d\d\.\d\d\.\d\d, ', txt, re.M):
        items = []
        for m in msgs:
            mm = re.match(r'(\[[^\]]+\])\s*([^:]+):\s*(.*)', m)
            if mm: items.append((mm.group(1) + ' ' + mm.group(2) + ':', mm.group(3)))
            elif items: items[-1] = (items[-1][0], items[-1][1] + ' ' + m)
            else: items.append(('', m))
    else:
        items = [('', ' '.join(x.strip() for x in msgs))]
    who = {}
    for head, t in items:
        sender = head.split(']')[-1]
        side = who.setdefault(sender, len(who) % 2)
        bl = wrap(clean(t), f, 700)
        bh = 30 + 44 * len(bl) + (40 if head else 0)
        x0 = 40 if side == 0 else sw - 40 - 760
        d.rounded_rectangle([x0, y, x0 + 760, y + bh], radius=22, fill=(255, 255, 255) if side == 0 else (220, 248, 198))
        yy = y + 15
        if head:
            d.text((x0 + 25, yy), clean(head), font=fs, fill=(30, 120, 160)); yy += 40
        for b in bl:
            d.text((x0 + 25, yy), b, font=f, fill=(20, 20, 20)); yy += 44
        y += bh + 30
    im = im.crop((0, 0, sw, max(y + 120, 1400)))
    # Ausdruck auf A4
    page = Image.new('RGB', (W, H), (255, 255, 255))
    sc = min((W - 300) / im.width, (H - 400) / im.height)
    sm = im.resize((int(im.width * sc), int(im.height * sc)), Image.LANCZOS)
    page.paste(sm, ((W - sm.width) // 2, 260))
    dd = ImageDraw.Draw(page)
    dd.rectangle([(W - sm.width) // 2 - 2, 258, (W + sm.width) // 2 + 2, 262 + sm.height], outline=(120, 120, 120))
    yy = 120
    for m in meta:
        hand(page, 160, yy, m, 30, (40, 40, 40), rng); yy += 50
    return [page], []

def zettel(txt, lines, rng, info, karte=False):
    zw, zh = int(148 * MM), int(max(105, 30 + 9.5 * (len(lines) + sum(len(l) // 42 for l in lines))) * MM)
    if karte: zw = int(160 * MM)
    paper = rng.choice([(255, 253, 230), (255, 255, 255), (250, 248, 240), (255, 240, 200)])
    im = Image.new('RGB', (zw, zh), paper)
    d = ImageDraw.Draw(im)
    if rng.random() < 0.6 and not karte:
        step = int(8 * MM)
        if rng.random() < 0.5:
            for yy in range(step * 2, zh, step): d.line([(0, yy), (zw, yy)], fill=(180, 200, 230), width=1)
        else:
            s2 = int(5 * MM)
            for yy in range(0, zh, s2): d.line([(0, yy), (zw, yy)], fill=(190, 205, 225), width=1)
            for xx in range(0, zw, s2): d.line([(xx, 0), (xx, zh)], fill=(190, 205, 225), width=1)
    ink = rng.choice([(20, 30, 120), (25, 25, 25), (10, 60, 150)])
    hp = rng.choice(F['hand'])
    y = int(12 * MM)
    pf = font(rng.choice(F['sans'])[1], 22); pr = font('truetype/liberation/LiberationSans-Regular.ttf', 20)
    for l in lines:
        s = clean(l.rstrip())
        if not s.strip():
            y += 18; continue
        printed = karte and (re.match(r'^[A-ZÄÖÜ\-\. ]{6,}', s.strip()) or 'Bei Verhinderung' in s or 'Tel.' in s)
        if printed:
            d.text((int(10 * MM), y), s.strip(), font=pf if s.strip()[:6].isupper() else pr, fill=(10, 10, 10)); y += 36; continue
        sz = rng.randint(30, 36) if not s.startswith('[') else 24
        col = ink if not s.startswith('[') else (90, 90, 90)
        for part in wrap(s.strip(), font(hp, sz), zw - int(22 * MM)):
            hand(im, int(10 * MM) + (len(s) - len(s.lstrip())) * 6, y, part, sz, col, rng, path=hp)
            y += int(sz * 1.45)
    im = im.crop((0, 0, zw, min(zh, max(y + int(15 * MM), int(80 * MM)))))
    return [im], []

def konto(txt, lines, rng, info):
    fam = rng.choice(F['sans'])
    doc = Doc(rng, fam)
    bank = clean(lines[0].strip())
    color = PAL[rng.randrange(len(PAL))]
    if rng.random() < 0.5:
        # Portalausdruck mit Navigationsleiste
        sf = font(fam[0], 14)
        doc.d.text((doc.left - 60, int(8 * MM)), 'Online-Banking – %s' % bank, font=sf, fill=(60, 60, 60))
        doc.d.rectangle([0, int(16 * MM), W, int(16 * MM) + 70], fill=color)
        logo(doc.img, doc.left - 60, int(16 * MM) + 12, 46, (255, 255, 255), 'raute', rng)
        doc.d.text((doc.left, int(16 * MM) + 20), bank, font=font(fam[1], 24), fill=(255, 255, 255))
        nav = ['Übersicht', 'Konten & Karten', 'Umsätze', 'Postfach', 'Service', 'Abmelden']
        nx = doc.left - 60; ny = int(16 * MM) + 80
        doc.d.rectangle([0, ny, W, ny + 44], fill=(235, 237, 240))
        for n in nav:
            doc.d.text((nx, ny + 11), n, font=font(fam[0], 17), fill=(40, 40, 40)); nx += tw(font(fam[0], 17), n) + 38
        doc.y = ny + 80
        body(doc, lines[1:], 19, table_style=True)
        doc.d.text((doc.left - 60, H - int(10 * MM)), 'https://banking.example/umsaetze  1/1', font=sf, fill=(60, 60, 60))
        info['extras'].append('portalausdruck')
    else:
        # Auszugsdrucker
        doc.fam = rng.choice(F['mono'])
        logo(doc.img, doc.left, int(12 * MM), 60, color, 'raute', rng)
        doc.d.text((doc.left + 75, int(12 * MM) + 12), bank, font=font(fam[1], 28), fill=color)
        doc.y = int(35 * MM)
        doc.d.rectangle([doc.left - 10, doc.y - 10, doc.right + 10, doc.y + 4], fill=color)
        doc.y += 20
        body(doc, lines[1:], 19, table_style=True)
    return doc.pages, []

def portal(txt, lines, rng, info):
    fam = rng.choice(F['sans'])
    doc = Doc(rng, fam)
    color = PAL[rng.randrange(len(PAL))]
    sf = font(fam[0], 14)
    doc.d.text((doc.left - 60, int(8 * MM)), clean(lines[0].strip()), font=sf, fill=(60, 60, 60))
    doc.d.rectangle([0, int(14 * MM), W, int(14 * MM) + 64], fill=color)
    logo(doc.img, doc.left - 60, int(14 * MM) + 10, 44, (255, 255, 255), rng.choice(['kreis', 'raute', 'haus']), rng)
    ny = int(14 * MM) + 64
    doc.d.rectangle([0, ny, W, ny + 42], fill=(236, 238, 241))
    nx = doc.left - 60
    for n in ['Start', 'Formulare', 'Meine Dokumente', 'Postfach', 'Hilfe', 'Abmelden']:
        doc.d.text((nx, ny + 10), n, font=font(fam[0], 17), fill=(40, 40, 40)); nx += tw(font(fam[0], 17), n) + 40
    doc.y = ny + 70
    body(doc, lines[1:], 19, table_style=True)
    for n, p in enumerate(doc.pages):
        ImageDraw.Draw(p).text((doc.left - 60, H - int(10 * MM)), 'https://portal.example/protokoll  %d/%d' % (n + 1, len(doc.pages)), font=sf, fill=(60, 60, 60))
    info['extras'].append('portalausdruck')
    return doc.pages, []

def werbung(txt, lines, rng, info):
    fam = rng.choice(F['sans'])
    doc = Doc(rng, fam)
    color = PAL[rng.randrange(len(PAL))]
    doc.d.rectangle([0, 0, W, int(48 * MM)], fill=color)
    t = clean(lines[0].strip())
    bf = font(fam[1], 46)
    yy = int(10 * MM)
    for p in wrap(t, bf, W - 2 * doc.left - 200):
        doc.d.text((doc.left - 40, yy), p, font=bf, fill=(255, 255, 255)); yy += 56
    doc.d.ellipse([W - 260, int(5 * MM), W - 50, int(5 * MM) + 210], fill=(255, 215, 0))
    doc.d.text((W - 232, int(5 * MM) + 82), 'AKTION', font=font(fam[1], 40), fill=(200, 0, 0))
    doc.y = max(yy + 20, int(55 * MM))
    isitem = lambda l: re.match(r'\s*(>>>|[*•-])\s+\S', l) and re.search(r'\d', l)
    tf = font(fam[1], 21); pf = font(fam[1], 30)
    i = 0
    rest = lines[1:]
    while i < len(rest):
        if not isitem(rest[i]):
            body(doc, [rest[i]], 21); i += 1; continue
        grp = []
        while i < len(rest) and isitem(rest[i]):
            grp.append(rest[i]); i += 1
        cw_ = (doc.right - doc.left + 60) / 2 - 15
        for n in range(0, len(grp), 2):
            rowh = 0
            for c, l in enumerate(grp[n:n + 2]):
                s = clean(re.sub(r'^\s*(>>>|[*•-])\s*', '', l.strip()))
                m = re.search(r'(statt.*|ab\s+\d.*|\d[\d.]*,[\d–-]+\s*€?.*)$', s)
                name, price = (s[:m.start()].strip(), m.group(1).strip()) if m else (s, '')
                nl = wrap(name, tf, cw_ - 30)
                pfn = pf if tw(pf, price) < cw_ - 30 else tf
                bh = 30 + 30 * len(nl) + 50
                doc.need(bh + 20)
                x0 = doc.left - 40 + c * (cw_ + 30)
                doc.d.rounded_rectangle([x0, doc.y, x0 + cw_, doc.y + bh], radius=12, outline=color, width=3, fill=(250, 250, 250))
                yy = doc.y + 15
                for nn in nl:
                    doc.d.text((x0 + 15, yy), nn, font=tf, fill=(20, 20, 20)); yy += 30
                doc.d.text((x0 + 15, yy + 5), price, font=pfn, fill=(200, 0, 0))
                rowh = max(rowh, bh)
            doc.y += rowh + 20
    q = qr(info['qrlink'], 190)
    if doc.y + 220 > doc.bottom + 60: doc.newpage()
    qy = max(doc.y + 20, int(200 * MM)) if doc.y + 240 < H - 200 else doc.y + 20
    qy = min(qy, H - int(15 * MM) - 200)
    doc.img.paste(q.convert('RGB'), (doc.right - 190, qy))
    doc.d.rectangle([doc.right - 194, qy - 4, doc.right + 4, qy + 194], outline=color, width=3)
    return doc.pages, ['qr-link']

def blatt(txt, lines, rng, info, gross=False):
    fam = rng.choice(F['sans'] + F['serif'])
    doc = Doc(rng, fam)
    doc.y = int(25 * MM)
    meta = [l for l in lines if l.startswith('[') and l.rstrip().endswith(']') and not l.startswith('[ ]')]
    if meta:
        for m in meta:
            hand(doc.img, doc.left, doc.y, m, 30, (90, 90, 90), rng); doc.y += 52
        lines = [l for l in lines if l not in meta]
    body(doc, lines, 30 if gross else 21)
    return doc.pages, []

# ------------------------------------------------------------ Verschlechtern
def to_np(im): return np.asarray(im).astype(np.float32)
def from_np(a): return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def coeffs(pa, pb):
    A = []
    for p1, p2 in zip(pa, pb):
        A.append([p1[0], p1[1], 1, 0, 0, 0, -p2[0] * p1[0], -p2[0] * p1[1]])
        A.append([0, 0, 0, p1[0], p1[1], 1, -p2[1] * p1[0], -p2[1] * p1[1]])
    A = np.array(A, dtype=np.float64); B = np.array(pb, dtype=np.float64).reshape(8)
    return np.linalg.solve(A, B).tolist()

def falten(a, rng, s, horiz=True):
    h, w = a.shape[:2]
    out = []
    for pos in ([h / 3, 2 * h / 3] if horiz else [w / 2]):
        pos += rng.uniform(-20, 20)
        yy = np.arange(h)[:, None] if horiz else np.arange(w)[None, :]
        dist = (yy - pos)
        shade = 1 - 0.10 * s * np.exp(-(dist / 25) ** 2) * (np.sign(dist) * 0.5 + 0.7) - 0.25 * s * np.exp(-(dist / 1.6) ** 2)
        a = a * (shade[..., None] if a.ndim == 3 else shade)
    return a

def locher(img, rng, dark=True):
    d = ImageDraw.Draw(img)
    r = int(2.8 * MM)
    cy = img.height / 2 + rng.uniform(-15, 15)
    x = int(12 * MM) + rng.uniform(-5, 5)
    for yy in (cy - 40 * MM, cy + 40 * MM):
        col = (35, 35, 38) if dark else (205, 205, 205)
        d.ellipse([x - r, yy - r, x + r, yy + r], fill=col)
    return img

def thermo_fade(img, rng, s):
    a = to_np(img)
    h, w = a.shape[:2]
    g = np.linspace(0, 1, h)[:, None] * rng.uniform(0.3, 1) + np.linspace(0, 1, w)[None, :] * rng.uniform(0, 0.5)
    fade = 0.25 + 0.5 * s * (g / g.max())
    a = 255 - (255 - a) * (1 - fade[..., None])
    a[..., 2] -= 12 * s; a[..., 1] -= 4 * s
    return from_np(a)

def scan(page, rng, q, prof, extras, first=True):
    s = {'gut': 0.3, 'mittel': 0.65, 'schlecht': 1.0}[q]
    fb = []
    im = page.convert('RGB')
    small = im.width < W * 0.8
    if small:
        bed = Image.new('RGB', (W, H), (252, 252, 250) if prof != 'einzug' else (255, 255, 255))
        ang = rng.uniform(-6, 6) * s
        sm = im.rotate(ang, expand=True, fillcolor=(252, 252, 250), resample=Image.BICUBIC)
        sh = Image.new('L', sm.size, 0); ImageDraw.Draw(sh).rectangle([4, 4, sm.width - 4, sm.height - 4], fill=70)
        bed.paste((150, 150, 150), (int(25 * MM) + 6, int(20 * MM) + 6), sh.filter(ImageFilter.GaussianBlur(6)))
        bed.paste(sm, (int(25 * MM), int(20 * MM)), sm.convert('L').point(lambda v: 255))
        im = bed; fb.append('kleines-blatt-auf-glasplatte')
    if 'locher' in extras and first:
        im = locher(im, rng, dark=prof != 'einzug'); fb.append('locherloecher')
    a = to_np(im)
    if 'knick' in extras:
        a = falten(a, rng, s); fb.append('knicke')
    if prof == 'flachbett':
        ang = rng.uniform(-0.8, 0.8) * s
        fb.append('flachbett')
        h, w = a.shape[:2]
        side = rng.choice([0, 1])
        g = np.linspace(0, 1, w)[None, :] if side else np.linspace(1, 0, w)[None, :]
        a = a * (1 - 0.22 * s * np.clip((g - 0.85) / 0.15, 0, 1) ** 2)[..., None]
        fb.append('deckelschatten')
    elif prof == 'einzug':
        ang = rng.choice([-1, 1]) * rng.uniform(0.8, 3.2) * (0.5 + s)
        fb.append('einzug-schief')
        h, w = a.shape[:2]
        for _ in range(rng.randint(1, 4)):
            x = rng.randrange(w); a[:, x:x + rng.randint(1, 3)] *= rng.uniform(0.55, 0.85)
        fb.append('sensorstreifen')
    else:  # kopie der kopie
        ang = rng.uniform(-1.5, 1.5) * s
        g = a.mean(axis=2)
        g = (g - 150) * (1.25 + 0.35 * s) + 160 - 15 * s
        nrng = np.random.default_rng(rng.randint(0, 10**9))
        g += nrng.normal(0, 18 * s, g.shape)
        sp = nrng.random(g.shape) < 0.0015 * s
        g[sp] = 30
        a = np.stack([g] * 3, axis=2)
        fb.append('kopie-der-kopie')
        im2 = from_np(a).filter(ImageFilter.GaussianBlur(0.8 + 0.6 * s))
        if s > 0.6 and rng.random() < 0.3: im2 = im2.filter(ImageFilter.MinFilter(3)); fb.append('tonerverlauf')
        a = to_np(im2)
        a = (a - 140) * 1.25 + 150
    im = from_np(a)
    im = im.rotate(ang, resample=Image.BICUBIC, expand=False, fillcolor=(30, 30, 30) if prof == 'einzug' else (235, 235, 233))
    if prof == 'einzug':
        # versetzter Einzug: dunkler Rand oben
        off = int(rng.uniform(0, 25) * s)
        canvas = Image.new('RGB', im.size, (25, 25, 25)); canvas.paste(im, (0, off)); im = canvas
    nrng = np.random.default_rng(rng.randint(0, 10**9))
    a = to_np(im)
    a += nrng.normal(0, 4 + 8 * s, a.shape[:2])[..., None]
    a = a * rng.uniform(0.93, 1.0) + rng.uniform(0, 10) * s
    im = from_np(a).filter(ImageFilter.GaussianBlur(0.3 + 0.9 * s))
    if s >= 1.0:
        im = im.resize((int(im.width * 0.8), int(im.height * 0.8)), Image.BILINEAR).resize((im.width, im.height), Image.BILINEAR)
        fb.append('niedrige-aufloesung')
    if prof == 'kopie':
        im = im.convert('L')
    return im, fb

def photo(page, rng, q, extras):
    s = {'gut': 0.3, 'mittel': 0.65, 'schlecht': 1.0}[q]
    fb = ['handyfoto']
    im = page.convert('RGB')
    if 'knick' in extras:
        im = from_np(falten(to_np(im), rng, s)); fb.append('knicke')
    if 'locher' in extras:
        im = locher(im, rng, dark=False); fb.append('locherloecher')
    cw_, chh = 1800, 2400
    nrng = np.random.default_rng(rng.randint(0, 10**9))
    bgk = rng.choice(['holz', 'dunkel', 'stoff', 'hell'])
    if bgk == 'holz':
        base = np.array([150, 105, 65], np.float32)
        grain = nrng.normal(0, 1, (chh, 60)).repeat(30, axis=1)[:, :cw_]
        grain = np.array(Image.fromarray(((grain + 3) * 40).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))).astype(np.float32) / 255
        bg = base[None, None] * (0.75 + 0.5 * grain[..., None])
    elif bgk == 'dunkel':
        bg = np.full((chh, cw_, 3), 55, np.float32) + nrng.normal(0, 6, (chh, cw_, 1))
    elif bgk == 'stoff':
        c = np.array(rng.choice([(90, 110, 140), (140, 60, 60), (100, 120, 90)]), np.float32)
        yy, xx = np.mgrid[0:chh, 0:cw_]
        bg = c[None, None] * (0.85 + 0.15 * (np.sin(xx * 0.9) * np.sin(yy * 0.9))[..., None])
    else:
        bg = np.full((chh, cw_, 3), 215, np.float32) + nrng.normal(0, 5, (chh, cw_, 1))
    bg = Image.fromarray(bg.clip(0, 255).astype(np.uint8))
    fb.append('hintergrund-' + bgk)
    pw, ph = im.size
    fill = rng.uniform(0.78, 0.92) if not (im.width < W * 0.8) else rng.uniform(0.55, 0.75)
    sc = min(cw_ * fill / pw, chh * fill / ph)
    tw_, th_ = pw * sc, ph * sc
    cx, cy = cw_ / 2 + rng.uniform(-60, 60), chh / 2 + rng.uniform(-60, 60)
    j = 40 + 160 * s
    dst = [(cx - tw_ / 2 + rng.uniform(-j, j * .3), cy - th_ / 2 + rng.uniform(-j, j * .3)),
           (cx + tw_ / 2 + rng.uniform(-j * .3, j), cy - th_ / 2 + rng.uniform(-j, j * .3)),
           (cx + tw_ / 2 + rng.uniform(-j * .3, j * .6), cy + th_ / 2 + rng.uniform(-j * .3, j * .5)),
           (cx - tw_ / 2 + rng.uniform(-j * .6, j * .3), cy + th_ / 2 + rng.uniform(-j * .3, j * .5))]
    src = [(0, 0), (pw, 0), (pw, ph), (0, ph)]
    c = coeffs(dst, src)
    warped = im.transform((cw_, chh), Image.PERSPECTIVE, c, Image.BICUBIC)
    mask = Image.new('L', (pw, ph), 255).transform((cw_, chh), Image.PERSPECTIVE, c, Image.BILINEAR)
    sh = mask.filter(ImageFilter.GaussianBlur(14)).point(lambda v: int(v * 0.55))
    bg.paste((10, 10, 10), (8, 12), sh)
    bg.paste(warped, (0, 0), mask)
    fb.append('perspektive')
    a = to_np(bg)
    yy, xx = np.mgrid[0:chh, 0:cw_].astype(np.float32)
    ang = rng.uniform(0, 2 * math.pi)
    grad = (np.cos(ang) * (xx / cw_ - .5) + np.sin(ang) * (yy / chh - .5))
    light = 1 - 0.35 * s * (grad + 0.5)
    vig = 1 - 0.35 * s * (((xx / cw_ - .5) ** 2 + (yy / chh - .5) ** 2) * 2)
    a *= (light * vig)[..., None]
    fb.append('ungleiches-licht')
    if rng.random() < 0.4 + 0.4 * s:
        shl = Image.new('L', (cw_, chh), 0)
        x0 = rng.uniform(0, cw_)
        ImageDraw.Draw(shl).polygon([(x0, chh), (x0 + rng.uniform(300, 700), chh), (x0 + rng.uniform(-200, 500), chh * rng.uniform(0.35, 0.7)), (x0 - rng.uniform(100, 400), chh * rng.uniform(0.5, 0.8))], fill=255)
        shl = np.asarray(shl.filter(ImageFilter.GaussianBlur(60))).astype(np.float32) / 255
        a *= (1 - 0.45 * s * shl)[..., None]
        fb.append('schatten-hand-handy')
    if rng.random() < 0.3 * s:
        gx, gy = rng.uniform(300, 1500), rng.uniform(300, 2100)
        glare = np.exp(-(((xx - gx) / 220) ** 2 + ((yy - gy) / 160) ** 2))
        a += (90 * s * glare)[..., None]; fb.append('lichtreflex')
    tint = np.array(rng.choice([(1.05, 1.0, 0.88), (0.95, 1.0, 1.06), (1.02, 1.0, 0.95)]), np.float32)
    a *= tint[None, None]; fb.append('farbstich')
    a += nrng.normal(0, 3 + 7 * s, a.shape)
    img = from_np(a)
    blur = 0.4 + 1.3 * s
    img = img.filter(ImageFilter.GaussianBlur(blur)); fb.append('unschaerfe')
    if s >= 0.65 and rng.random() < 0.5:
        k = 7
        img = img.filter(ImageFilter.BoxBlur(1)); fb.append('verwackelt')
    return img, fb, int(92 - 30 * s)

# ------------------------------------------------------------ Steuerung
def analyse(name, txt, lines, rng):
    info = {'extras': []}
    kind = classify(txt, lines)
    head = '\n'.join(lines[:6])
    info['behoerde'] = bool(BEHOERDE.search(head)) and kind == 'brief'
    info['rechnung'] = bool(ZAHL.search(txt)) and kind == 'brief'
    nums = NUMRE.findall(txt)
    num = nums[0][1].strip() if nums else None
    hval = int(hashlib.sha256(name.encode()).hexdigest(), 16)
    iban = IBAN.search(txt)
    if kind == 'brief':
        if info['rechnung'] and iban:
            amounts = []
            for l in lines:
                if re.search(r'(Zahlbetrag|Nachzahlung|NACHZAHLUNG|Gesamt|Summe|offen|Betrag|Rückstand|Mahn|zu zahlen|Forderung|Endbetrag|brutto)', l, re.I):
                    amounts += MONEY.findall(l)
            if not amounts: amounts = MONEY.findall(txt)
            amt = amounts[-1].replace('.', '').replace(',', '.') if amounts else ''
            nm = asc(clean(lines[0].strip()))[:70]
            ref = asc(num or '')[:35]
            info['girocode'] = 'BCD\n002\n1\nSCT\n\n%s\n%s\n%s\n\n\n%s\n' % (nm, iban.group(1).replace(' ', ''), ('EUR' + amt) if amt else '', ref)
        if num and rng.random() < 0.8:
            info['code128'] = num
        if info['behoerde'] or rng.random() < 0.55:
            info['franking'] = 'DE%s%05d%s' % (rng.choice(['A0', 'B1', 'C7']), hval % 99999, asc(num or '')[:10].replace(' ', ''))
        if info['behoerde'] and re.search(r'Bescheid', txt):
            info['bescheid_code'] = str(hval % 10**12).zfill(12)
    if kind in ('bon', 'werbung'):
        slug = re.sub(r'[^a-z]', '', asc(lines[0].lower()))[:18] or 'markt'
        info['qrlink'] = 'https://www.%s.example/%s' % (slug, ('bon/' if kind == 'bon' else 'aktion/') + str(hval % 10**8))
        bn = re.search(r'(Bon-Nr\.?|Beleg-Nr\.?|Belegnr\.?)\s*(\d+)', txt)
        if kind == 'bon' and bn: info['code128'] = bn.group(2)
    return kind, info

def process(path):
    name = os.path.basename(path)
    hval = int(hashlib.sha256(name.encode()).hexdigest(), 16)
    rng = random.Random(hval)
    form = 'pdf-scan' if hval % 100 < 60 else 'foto'
    q = ['gut', 'mittel', 'schlecht'][((hval >> 64) // 100) % 3]
    txt = open(path, encoding='utf-8').read().replace('\t', '    ')
    txt = txt.replace('\r', '')
    lines = txt.rstrip('\n').split('\n')
    kind, info = analyse(name, txt, lines, rng)
    if kind == 'mail': pages, codes = mail(txt, lines, rng, info)
    elif kind == 'bon': pages, codes = bon(txt, lines, rng, info)
    elif kind == 'chat': pages, codes = chat(txt, lines, rng, info)
    elif kind in ('zettel', 'karte'): pages, codes = zettel(txt, lines, rng, info, karte=(kind == 'karte'))
    elif kind == 'konto': pages, codes = konto(txt, lines, rng, info)
    elif kind == 'portal': pages, codes = portal(txt, lines, rng, info)
    elif kind == 'werbung': pages, codes = werbung(txt, lines, rng, info)
    elif kind == 'aushang': pages, codes = blatt(txt, lines, rng, info, gross=True)
    else:
        pages, codes = brief(txt, lines, rng, info)
    extras = []
    # Randnotiz und Stempel bei Briefen
    if kind == 'brief':
        p0 = pages[0]
        if rng.random() < 0.3:
            dm = DATE.search(txt)
            if dm:
                dd, mo, yy = int(dm.group(1)), int(dm.group(2)), dm.group(3)
                dd = min(28, dd + rng.randint(1, 3))
                stempel(p0, int(W - rng.uniform(70, 110) * MM), int(rng.uniform(1, 4) * MM), '%02d.%02d.%s' % (dd, mo, yy[-2:]), rng)
                extras.append('eingangsstempel')
        if rng.random() < 0.3:
            note = rng.choice(['erledigt ✓', 'bez. ' + '%d.%d.' % (rng.randint(1, 28), rng.randint(1, 12)), 'Kopie an StB', 'wichtig!', 'Ablage', 'nachfragen', 'Frist notiert'])
            hand(p0, int(W - 60 * MM), int(rng.uniform(220, 260) * MM), note, 34, rng.choice([(20, 30, 130), (160, 20, 20), (70, 70, 70)]), rng, slant=rng.uniform(-10, 4))
            extras.append('randnotiz-handschrift')
    if kind == 'bon':
        pages = [thermo_fade(p, rng, {'gut': 0.3, 'mittel': 0.6, 'schlecht': 0.85}[q]) for p in pages]
        extras.append('thermopapier-verblasst')
    fb_extra = []
    if kind in ('brief', 'konto', 'werbung', 'aushang', 'mail') and rng.random() < 0.35: fb_extra.append('knick')
    if kind in ('brief', 'konto', 'portal') and rng.random() < 0.25: fb_extra.append('locher')
    stem = re.sub(r'[^A-Za-z0-9_.-]+', '_', asc(name[:-4])).strip('_')
    fehler = list(info['extras']) + extras
    if form == 'pdf-scan':
        prof = rng.choice(['flachbett', 'flachbett', 'einzug', 'kopie'])
        if pages[0].width < W * 0.8 and prof == 'einzug': prof = 'flachbett'
        outs = []
        for n, p in enumerate(pages):
            im, fb = scan(p, rng, q, prof, fb_extra, first=(n == 0))
            outs.append(im)
            if n == 0: fehler += fb
        fn = stem + '.pdf'
        outs[0].save(os.path.join(AUS, fn), 'PDF', resolution=DPI, save_all=True, append_images=outs[1:], quality=int(90 - 25 * {'gut': 0, 'mittel': 0.5, 'schlecht': 1}[q]))
    else:
        im, fb, jq = photo(pages[0], rng, q, fb_extra)
        fehler += fb
        fehler.append('jpeg-kompression')
        fn = stem + '.jpg'
        im.save(os.path.join(AUS, fn), 'JPEG', quality=jq)
    return name, {'datei': fn, 'form': form, 'qualitaet': q, 'codes': codes, 'fehlerbilder': fehler, 'art': kind, 'seiten': len(pages)}

if __name__ == '__main__':
    files = sorted(glob.glob(os.path.join(STAPEL, '*.txt')))
    if len(sys.argv) > 1:
        files = [f for f in files if any(a in os.path.basename(f) for a in sys.argv[1:])]
    os.makedirs(AUS, exist_ok=True)
    with Pool(4) as p:
        res = p.map(process, files)
    if len(sys.argv) == 1:
        json.dump(dict(res), open(os.path.join(AUS, 'SETZEN.json'), 'w'), ensure_ascii=False, indent=1)
    for n, r in res:
        print(r['art'], r['form'], r['qualitaet'], r['codes'], n, '->', r['datei'])
