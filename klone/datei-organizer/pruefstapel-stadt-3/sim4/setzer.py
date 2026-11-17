#!/usr/bin/env python3
"""Eigener Setzer + Scan-/Foto-Simulator (sim4).

Liest stapel/*.txt, setzt jedes Stück als heutiges Dokument (Brief, Bon, Mail-Ausdruck,
Portal-Ausdruck, App-Screenshot, Handzettel, Aushang, Karte, Werbung) und erzeugt daraus
einen Scan (PDF nur aus Seitenbildern) oder ein Handyfoto (JPEG).
Aufruf: python3 setzer.py <stapel-ordner> <ausgabe-ordner> [name-filter ...]
"""
import os, re, sys, json, hashlib, math, random, io
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
from reportlab.graphics.barcode import createBarcodeDrawing
from reportlab.graphics.shapes import Group

DPI = 200
K = DPI / 25.4  # px je mm


def mm(v):
    return int(round(v * K))


def pt(v):  # Punktgröße -> px
    return max(6, int(round(v * DPI / 72.0)))


F = '/usr/share/fonts/truetype/'
FONTS = {
    'sans': F + 'liberation/LiberationSans-Regular.ttf',
    'sansb': F + 'liberation/LiberationSans-Bold.ttf',
    'sansi': F + 'liberation/LiberationSans-Italic.ttf',
    'serif': F + 'liberation/LiberationSerif-Regular.ttf',
    'serifb': F + 'liberation/LiberationSerif-Bold.ttf',
    'serifi': F + 'liberation/LiberationSerif-Italic.ttf',
    'carlito': F + 'crosextra/Carlito-Regular.ttf',
    'carlitob': F + 'crosextra/Carlito-Bold.ttf',
    'caladea': F + 'crosextra/Caladea-Regular.ttf',
    'caladeab': F + 'crosextra/Caladea-Bold.ttf',
    'caladeai': F + 'crosextra/Caladea-Italic.ttf',
    'inter': '/usr/share/fonts/opentype/inter/Inter-Regular.otf',
    'interb': '/usr/share/fonts/opentype/inter/Inter-Bold.otf',
    'interm': '/usr/share/fonts/opentype/inter/Inter-Medium.otf',
    'interx': '/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf',
    'mono': F + 'liberation/LiberationMono-Regular.ttf',
    'monob': F + 'liberation/LiberationMono-Bold.ttf',
    'jbm': F + 'jetbrains-mono/JetBrainsMono-Regular.ttf',
    'jbmb': F + 'jetbrains-mono/JetBrainsMono-Bold.ttf',
    'dejavu': F + 'dejavu/DejaVuSans.ttf',
    'dejavub': F + 'dejavu/DejaVuSans-Bold.ttf',
    'freesans': F + 'freefont/FreeSans.ttf',
    'freesansb': F + 'freefont/FreeSansBold.ttf',
    'freesanso': F + 'freefont/FreeSansOblique.ttf',
    'freeserif': F + 'freefont/FreeSerif.ttf',
    'freeserifi': F + 'freefont/FreeSerifItalic.ttf',
    'carlitoi': F + 'crosextra/Carlito-Italic.ttf',
    'unifontup': '/usr/share/fonts/opentype/unifont/unifont_upper.otf',
    'unifont': '/usr/share/fonts/opentype/unifont/unifont.otf',
}
_fc = {}


def font(name, px):
    key = (name, px)
    if key not in _fc:
        _fc[key] = ImageFont.truetype(FONTS[name], px)
    return _fc[key]


_gc = {}


def has_glyph(f, ch):
    if ch in ' \t':
        return True
    key = (f.path, f.size, ch)
    if key not in _gc:
        try:
            m = f.getmask(ch)
            r = f.getmask('\U0010FFFD')
            same = (m.size == r.size and bytes(m) == bytes(r))
            _gc[key] = not same
        except Exception:
            _gc[key] = False
    return _gc[key]


FALLBACK = ['dejavu', 'freeserif', 'freesans', 'unifontup', 'unifont']


def runs(text, f):
    out = []
    for ch in text:
        use = f
        if not has_glyph(f, ch):
            use = None
            for fb in FALLBACK:
                g = font(fb, f.size)
                if has_glyph(g, ch):
                    use = g
                    break
            if use is None:
                use = f
        if out and out[-1][1] is use:
            out[-1][0] += ch
        else:
            out.append([ch, use])
    return out


def tw(text, f):
    return sum(r[1].getlength(r[0]) for r in runs(text, f))


def dtext(draw, x, y, text, f, fill=(0, 0, 0)):
    """y = Grundlinie. Gibt Breite zurück."""
    x0 = x
    for t, g in runs(text, f):
        draw.text((x, y), t, font=g, fill=fill, anchor='ls')
        x += g.getlength(t)
    return x - x0


def wrap(text, f, width):
    words = text.split(' ')
    lines, cur = [], ''
    for w in words:
        cand = (cur + ' ' + w) if cur else w
        if tw(cand, f) <= width or not cur:
            cur = cand
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    # sehr lange Einzelwörter hart trennen
    out = []
    for l in lines:
        while tw(l, f) > width and len(l) > 4:
            n = len(l)
            while n > 1 and tw(l[:n], f) > width:
                n -= 1
            out.append(l[:n])
            l = l[n:]
        out.append(l)
    return out


# ---------------------------------------------------------------- Codes
def _mul(a, b):
    return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
            a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
            a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]]


def code_image(kind, value, height_px=None, module_px=None, **kw):
    """Barcode als L-Bild (0 = Balken). reportlab-Zeichnung selbst gerastert."""
    if kind == 'QR':
        kw.setdefault('barBorder', 0)
        kw.setdefault('barLevel', 'M')
    if kind in ('Code128', 'I2of5'):
        kw.setdefault('humanReadable', 0)
        kw.setdefault('quiet', 0)
    d = createBarcodeDrawing(kind, value=value, **kw).expandUserNodes()
    rects = []

    def walk(n, T):
        for c in n.getContents():
            t = getattr(c, 'transform', None)
            T2 = _mul(T, list(t)) if t is not None else T
            if isinstance(c, Group):
                walk(c, T2)
            elif hasattr(c, 'width') and hasattr(c, 'x') and hasattr(c, 'height'):
                col = getattr(c, 'fillColor', None)
                dark = True
                if col is not None:
                    try:
                        dark = (col.red + col.green + col.blue) < 1.5
                    except Exception:
                        dark = True
                else:
                    dark = False
                rects.append((T2, c.x, c.y, c.width, c.height, dark))
    walk(d, [1, 0, 0, 1, 0, 0])
    w, h = d.width, d.height
    if not rects:
        return None
    # Maßstab
    if kind == 'Code128' or kind == 'I2of5':
        s = (module_px or 3) / float(kw.get('barWidth', 0.54 * 72 / 72) if 'barWidth' in kw else 0.54)
    else:
        s = 1.0
    if module_px:
        s = module_px
    W, H = int(math.ceil(w * s)) + 2, int(math.ceil(h * s)) + 2
    img = Image.new('L', (W, H), 255)
    dr = ImageDraw.Draw(img)
    for T, x, y, rw, rh, dark in rects:
        pts = [(x, y), (x + rw, y), (x + rw, y + rh), (x, y + rh)]
        P = []
        for px_, py_ in pts:
            X = T[0] * px_ + T[2] * py_ + T[4]
            Y = T[1] * px_ + T[3] * py_ + T[5]
            P.append((X * s, H - 1 - Y * s))
        xs = [p[0] for p in P]
        ys = [p[1] for p in P]
        dr.rectangle([round(min(xs)), round(min(ys)), round(max(xs)) - 1, round(max(ys)) - 1],
                     fill=0 if dark else 255)
    if height_px and kind in ('Code128', 'I2of5'):
        img = img.resize((img.width, height_px), Image.NEAREST)
    return img


def qr_img(value, size_px):
    im = code_image('QR', value, module_px=4)
    im = im.crop(ImageOps.invert(im).getbbox())
    return im.resize((size_px, size_px), Image.NEAREST)


def dm_img(value, size_px):
    im = code_image('ECC200DataMatrix', value, module_px=4)
    bb = ImageOps.invert(im).getbbox()
    im = im.crop(bb)
    return im.resize((size_px, size_px), Image.NEAREST)


def c128_img(value, width_px, height_px):
    im = code_image('Code128', value, module_px=3, barWidth=1.0, barHeight=30)
    bb = ImageOps.invert(im).getbbox()
    im = im.crop(bb)
    return im.resize((width_px, height_px), Image.NEAREST)


def i2of5_img(value, width_px, height_px):
    im = code_image('I2of5', value, module_px=3, barWidth=1.0, barHeight=30)
    bb = ImageOps.invert(im).getbbox()
    im = im.crop(bb)
    return im.resize((width_px, height_px), Image.NEAREST)


def paste_code(page, im, x, y, color=(0, 0, 0)):
    mask = ImageOps.invert(im.convert('L'))
    page.paste(Image.new('RGB', im.size, color), (x, y), mask)


# ---------------------------------------------------------------- Analyse
RE_PLZ = re.compile(r'\b\d{5}\b')
RE_AMT = re.compile(r'(-?\d{1,3}(?:\.\d{3})*,\d{2})')
AUTH = re.compile(r'(Finanzamt|Bezirksamt|amt\b|Amt |Gericht|Jobcenter|Agentur für Arbeit|Familienkasse|Behörde|behörde|'
                  r'Rentenversicherung|Beitragsservice|Zoll|Elterngeldstelle|Notariat|Zulassungsstelle|Sozialamt|'
                  r'Jugendamt|Bürgeramt|Stadt |Landes|Bundes|BUNDESREPUBLIK|Nachlass|Bußgeld|Wahlamt|Wahlbehörde)', re.I)
SCHOOL = re.compile(r'(Schule|Kita|KITA|Gymnasium|Volkshochschule|Kindergarten|Grundschule|Gesamtschule)')
WERB = re.compile(r'(Werbung|Jetzt (wechseln|sichern|abschließen|scannen)|Aktion|nur für kurze Zeit|Angebote der Woche|Coupon)', re.I)


def first_nonblank(lines):
    for l in lines:
        if l.strip():
            return l.strip()
    return ''


def classify(name, text):
    lines = text.split('\n')
    first = first_nonblank(lines)
    low = text.lower()
    lname = name.lower()
    maxlen = max(len(l.rstrip()) for l in lines) if lines else 0
    head = '\n'.join(lines[:8])
    is_mail = bool(re.match(r'^(From|Von):', first)) and bool(re.search(r'^(Subject|Betreff):', head, re.M))
    if is_mail:
        sender = first
        if (' App ' in sender or ' App<' in sender or lname.startswith('img_') or 'whatsapp' in lname):
            return 'screen-mail'
        return 'mail'
    fl = first.lower()
    if fl.startswith('[ausdruck') or 'kundenportal' in fl or fl.startswith('ausdruck aus') or fl.startswith('ausdruck der'):
        return 'portal'
    if fl.startswith('notiz') and 'handy' in fl:
        return 'screen-notiz'
    if 'handschriftlich' in fl or fl.startswith('(zettel') or ('zettel' in lname and not re.search(r'[A-ZÄÖÜ]{5,}', first)
                                                                and 'aushang' not in fl):
        return 'zettel'
    if fl.startswith('(karte') or 'karte, abgetippt' in fl:
        return 'karte'
    if 'handzettel' in fl or 'angebote der woche' in low:
        return 'flyer'
    bonish = re.search(r'\b(SUMME|Summe|BAR|RÜCKGELD|EC-Karte|Kartenzahlung|MwSt)\b', text)
    if (maxlen <= 56 or ('bon' in lname and maxlen <= 70)) and bonish and len([l for l in lines if l.strip()]) >= 6 and (
            'bon' in lname or 'quittung' in lname or re.search(r'Kasse|Bon\b|Beleg', text)):
        return 'bon'
    if 'aushang' in lname or 'aushang' in fl or first.startswith('***') or 'aushang' in low[:200]:
        return 'aushang'
    if 'werbung' in lname:
        return 'werbung'
    if WERB.search(text) and ('werbung' in lname or 'aktion' in lname or 'angebot' in lname and 'Werbung' in text
                              or re.search(r'Dies ist eine Werbung|Werbung', text)):
        return 'werbung'
    return 'brief'


def brand_name(lines):
    first = first_nonblank(lines)
    first = first.strip('[]() ')
    for sep in [' · ', ' – ', ' | ', ' - ', ', ']:
        if sep in first:
            parts = first.split(sep)
            if any(RE_PLZ.search(p) for p in parts[1:]) or sep in (' · ', ' | '):
                return parts[0].strip()
    m = re.split(r'\s{3,}', first)
    return m[0][:70]


def initials(name):
    words = [w for w in re.split(r'[\s\-–&,.]+', name) if w and w[0].isalpha()]
    skip = {'und', 'der', 'die', 'das', 'für', 'am', 'im', 'e', 'V', 'mbH', 'GmbH', 'AG', 'eG', 'gGmbH', 'KG'}
    words = [w for w in words if w not in skip]
    if not words:
        return 'B'
    s = ''.join(w[0].upper() for w in words[:2])
    return s


def find_ref(text):
    pats = [r'(?:Kundennummer|Kunden-Nr\.?|Kundennr\.?|Mieter-Nr\.?|Vers\.-Nr\.?|Versichertennummer|Vertragsnummer|Vertrags-Nr\.?|'
            r'Rechnungsnummer|Rechnungs-Nr\.?|Rechnung Nr\.?|Bestell-Nr\.?|Akten-Nr\.?|Aktenzeichen|Az\.|Vorgang|Steuernummer|'
            r'Mitglieds-Nr\.?|Sendungsnummer|Anschluss-ID|Beitragsnummer|Kassenzeichen|Policen?-?[Nn]r\.?|Versicherungsschein-Nr\.?|'
            r'Kd\.-Nr\.?|BG-Nummer|Nummer)\s*:?\s*([A-Z0-9][A-Z0-9/\-\.]{3,24}[A-Z0-9])']
    for p in pats:
        m = re.search(p, text)
        if m:
            return m.group(1)
    return None


def find_amount(text):
    keys = r'(NACHZAHLUNG|Nachzahlung|Gesamtbetrag|Gesamt|Rechnungsbetrag|zu zahlen|offener Betrag|offen|Summe|Betrag|Forderung|Mahnbetrag|Eigenanteil|Endbetrag)'
    best = None
    for l in text.split('\n'):
        if re.search(keys, l):
            am = RE_AMT.findall(l)
            if am:
                best = am[-1]
                if re.search(r'(NACHZAHLUNG|Gesamt|zu zahlen|offen|Endbetrag|Forderung)', l):
                    return best.lstrip('-')
    if best:
        return best.lstrip('-')
    return None


def find_iban(text):
    m = re.search(r'IBAN:?\s*(DE[\d ]{18,30}\d)', text)
    return re.sub(r'\s', '', m.group(1)) if m else None


def pay_doc(text, name):
    low = (text + ' ' + name).lower()
    return bool(find_iban(text)) and bool(re.search(r'(rechnung|mahnung|zahlungserinnerung|nachzahlung|überweisen|zahlbar|forderung|bitte zahlen|bitte überweisen|kostenrechnung|beitrag|gebühr)', low)) and bool(find_amount(text))


# ---------------------------------------------------------------- Zeichnen Bausteine
PALETTE = [(0, 84, 147), (180, 24, 40), (0, 120, 80), (230, 120, 0), (90, 40, 130), (0, 130, 150),
           (40, 40, 40), (150, 0, 70), (20, 100, 180), (200, 60, 20)]


def draw_logo(page, x, y, s, style, color, ini, rng):
    d = ImageDraw.Draw(page)
    if style == 'crest':
        pts = [(x, y), (x + s, y), (x + s, y + s * 0.62), (x + s / 2, y + s), (x, y + s * 0.62)]
        d.polygon(pts, fill=(255, 255, 255), outline=(30, 30, 30), width=max(2, s // 25))
        for i in range(4):
            yy = y + s * (0.15 + i * 0.13)
            d.line([(x + s * 0.12, yy), (x + s * 0.88, yy)], fill=(60, 60, 60), width=max(2, s // 18))
        d.ellipse([x + s * 0.35, y + s * 0.6, x + s * 0.65, y + s * 0.85], fill=(40, 40, 40))
        return
    if style == 0:
        d.ellipse([x, y, x + s, y + s], fill=color)
        f = font('sansb', int(s * 0.42))
        w = tw(ini, f)
        dtext(d, x + (s - w) / 2, y + s * 0.65, ini, f, (255, 255, 255))
    elif style == 1:
        for i in range(3):
            o = i * s * 0.3
            d.polygon([(x + o, y + s), (x + o + s * 0.2, y + s), (x + o + s * 0.45, y), (x + o + s * 0.25, y)],
                      fill=tuple(min(255, c + i * 45) for c in color))
    elif style == 2:
        d.rounded_rectangle([x, y, x + s, y + s], radius=int(s * 0.22), fill=color)
        f = font('interx', int(s * 0.62))
        w = tw(ini[0], f)
        dtext(d, x + (s - w) / 2, y + s * 0.78, ini[0], f, (255, 255, 255))
    elif style == 3:  # Haus / Dach
        d.polygon([(x, y + s * 0.5), (x + s / 2, y), (x + s, y + s * 0.5)], fill=color)
        d.rectangle([x + s * 0.15, y + s * 0.5, x + s * 0.85, y + s], fill=color)
        d.rectangle([x + s * 0.42, y + s * 0.68, x + s * 0.58, y + s], fill=(255, 255, 255))
    elif style == 4:  # Welle / Ringe
        for i in range(3):
            r = s * (0.5 - i * 0.14)
            d.ellipse([x + s / 2 - r, y + s / 2 - r, x + s / 2 + r, y + s / 2 + r], outline=color, width=max(3, s // 12))
    else:  # Blatt / Kreuz
        d.rectangle([x + s * 0.38, y, x + s * 0.62, y + s], fill=color)
        d.rectangle([x, y + s * 0.38, x + s, y + s * 0.62], fill=color)


def hand_text(img, x, ybase, text, size, ink, rng, fname='freesanso', angle=None, jitter=1.0):
    """Handschrift-Imitation: Zeichen einzeln mit Versatz, ganze Zeile leicht gedreht."""
    f = font(fname, size)
    W = int(tw(text, f) * 1.15 + size * 2)
    H = int(size * 2.2)
    layer = Image.new('RGBA', (max(4, W), H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = size * 0.3
    base = size * 1.4
    drift = rng.uniform(-0.6, 0.6)
    for i, ch in enumerate(text):
        fs = max(6, int(size * rng.uniform(0.93, 1.07)))
        g = font(fname, fs)
        if not has_glyph(g, ch):
            g = font('dejavu', fs)
        a = int(255 * rng.uniform(0.75, 1.0))
        yy = base + rng.uniform(-1.5, 1.5) * jitter * size / 30 + drift * i * 0.15
        d.text((cx, yy), ch, font=g, fill=ink + (a,), anchor='ls')
        cx += g.getlength(ch) * rng.uniform(0.95, 1.08) + (rng.uniform(0, 1.2) if ch == ' ' else 0)
    if angle is None:
        angle = rng.uniform(-1.6, 1.6)
    layer = layer.crop((0, 0, int(cx + size * 0.5), H))
    lw = layer.width
    layer = layer.rotate(angle, resample=Image.BICUBIC, expand=True)
    img.paste(layer, (int(x - size * 0.3), int(ybase - base - (layer.height - H) / 2)), layer)
    return lw


def scribble(img, x, y, w, h, ink, rng, width=3):
    d = ImageDraw.Draw(img)
    n = 220
    pts = []
    loops = rng.randint(3, 6)
    for i in range(n):
        t = i / (n - 1)
        px = x + w * t + math.sin(t * math.pi * 2 * loops + rng.random() * 0.2) * w * 0.05
        py = y + h * 0.5 + math.sin(t * math.pi * loops * 1.7) * h * 0.38 * (1 - 0.5 * t) + math.cos(t * 23) * h * 0.08
        pts.append((px, py))
    d.line(pts, fill=ink, width=width, joint='curve')
    # Abschluss-Schwung
    d.line([(x + w * 0.1, y + h * 0.9), (x + w * 0.9, y + h * 0.75)], fill=ink, width=max(1, width - 1))


def stamp(img, cx, cy, kind, lines, color, rng, size=1.0):
    """Stempel auf eigener Ebene mit Fehlstellen, gedreht."""
    W, H = int(mm(62) * size), int(mm(30) * size)
    if kind == 'rund':
        W = H = int(mm(32) * size)
    lay = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(lay)
    if kind == 'rund':
        d.ellipse([3, 3, W - 4, H - 4], outline=255, width=mm(0.9))
        d.ellipse([mm(4), mm(4), W - mm(4), H - mm(4)], outline=255, width=mm(0.5))
        f = font('sansb', pt(6.5 * size))
        yy = H / 2 - (len(lines) - 1) * pt(7 * size) / 2 + pt(2.5)
        for l in lines:
            w = tw(l, f)
            dtext(d, (W - w) / 2, yy, l, f, 255)
            yy += pt(7.5 * size)
        d.regular_polygon((W / 2, mm(7.5), mm(1.6)), 5, fill=255)
    else:
        d.rectangle([3, 3, W - 4, H - 4], outline=255, width=mm(0.8))
        big = lines[0]
        f = font('sansb', pt(15 * size) if len(big) < 12 else pt(9 * size))
        while tw(big, f) > W - mm(6) and f.size > 10:
            f = font('sansb', f.size - 2)
        w = tw(big, f)
        dtext(d, (W - w) / 2, mm(11) * size, big, f, 255)
        f2 = font('sans', pt(7 * size))
        yy = mm(18) * size
        for l in lines[1:]:
            while tw(l, f2) > W - mm(6) and f2.size > 8:
                f2 = font('sans', f2.size - 1)
            w = tw(l, f2)
            dtext(d, (W - w) / 2, yy, l, f2, 255)
            yy += pt(8 * size)
    # Fehlstellen und ungleichmäßige Farbe
    a = np.asarray(lay).astype(np.float32) / 255
    noise = np.random.default_rng(rng.randint(0, 10 ** 9)).random(a.shape)
    blob = np.asarray(Image.fromarray((noise * 255).astype(np.uint8)).resize((max(2, W // 18), max(2, H // 18))).resize((W, H), Image.BILINEAR)).astype(np.float32) / 255
    a = a * np.clip(0.35 + blob * 0.9, 0, 1) * (noise > 0.12)
    lay = Image.fromarray((a * 255 * rng.uniform(0.75, 0.95)).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
    ang = rng.uniform(-14, 14)
    lay = lay.rotate(ang, resample=Image.BICUBIC, expand=True)
    col = Image.new('RGB', lay.size, color)
    # multiplizieren statt überdecken
    region = img.crop((int(cx - lay.width / 2), int(cy - lay.height / 2), int(cx - lay.width / 2) + lay.width, int(cy - lay.height / 2) + lay.height))
    ra = np.asarray(region).astype(np.float32)
    la = np.asarray(lay).astype(np.float32)[..., None] / 255
    ca = np.asarray(col).astype(np.float32)
    out = ra * (1 - la) + (ra * ca / 255) * la
    img.paste(Image.fromarray(out.astype(np.uint8)), (int(cx - lay.width / 2), int(cy - lay.height / 2)))


# ---------------------------------------------------------------- Seitenmodell (Briefe usw.)
class Doc:
    def __init__(self, name, text, kind, rng):
        self.name, self.text, self.kind, self.rng = name, text, kind, rng
        self.lines = [l.rstrip().replace('\t', '    ') for l in text.split('\n')]
        while self.lines and not self.lines[-1].strip():
            self.lines.pop()
        while self.lines and not self.lines[0].strip():
            self.lines.pop(0)
        self.brand = brand_name(self.lines)
        self.auth = bool(AUTH.search(self.brand))
        self.school = bool(SCHOOL.search(self.brand))
        self.color = PALETTE[rng.randrange(len(PALETTE))]
        if self.auth:
            self.color = (35, 35, 35) if rng.random() < 0.6 else (0, 60, 110)
        self.logo = 'crest' if self.auth else rng.randrange(6)
        self.ini = initials(self.brand)
        self.codes = []
        self.marks = []  # Fehlerbilder/Zusätze beim Setzen
        self.linepos = []  # (seite, x0, y, x1, text)


def is_table_line(l):
    s = l.strip()
    if not s:
        return False
    core = l[len(l) - len(l.lstrip()):]
    return bool(re.search(r'\S {2,}\S', core)) and not re.match(r'^[-*•]\s', s)


def is_rule(l):
    s = l.strip()
    return len(s) >= 5 and re.fullmatch(r'[-=_*·.]+', s) is not None and len(set(s)) <= 2


def split_cells(line):
    cells = []
    for m in re.finditer(r'\S+(?: \S+)*', line):
        cells.append((m.start(), m.group(0)))
    return cells


def parse_letter(doc):
    """Zerlegt in Kopf, Rücksendezeile, Anschrift, Info, Rumpf."""
    L = doc.lines
    blocks = []
    cur = []
    for l in L:
        if l.strip():
            cur.append(l)
        else:
            if cur:
                blocks.append(cur)
            cur = []
            blocks.append(None)
    if cur:
        blocks.append(cur)
    real = [b for b in blocks if b]
    head, ruck, addr, info = [], None, None, None
    rest_start = 0
    idx = [i for i, b in enumerate(blocks) if b]
    if not idx:
        return [], None, None, None, []
    b0 = blocks[idx[0]]
    # Kopf: erster Block, wenn kurz
    if len(b0) <= 5 and all(len(x.strip()) <= 110 for x in b0):
        head = b0
        rest_start = idx[0] + 1
        if len(b0) == 1 and (' · ' in b0[0] or ' – ' in b0[0] or ' | ' in b0[0] or ', ' in b0[0]) and RE_PLZ.search(b0[0]):
            ruck = b0[0].strip()
    # Anschrift: nächster Block mit PLZ in letzter Zeile, 2-7 Zeilen
    nxt = [i for i in idx if i >= rest_start]
    if nxt:
        b1 = blocks[nxt[0]]
        if 2 <= len(b1) <= 7 and RE_PLZ.search(b1[-1]) and not any(is_table_line(x) for x in b1) and all(len(x) <= 70 for x in b1):
            addr = b1
            rest_start = nxt[0] + 1
            nxt = nxt[1:]
            # Info-Block
            if nxt:
                b2 = blocks[nxt[0]]
                if len(b2) <= 8 and all(len(x.strip()) <= 110 for x in b2) and not re.match(r'(Sehr|Liebe|Hallo|Guten)', b2[0].strip()) \
                        and any(re.search(r'(Datum|Nr|Nummer|:|Az|Zeichen|\d{2}\.\d{2}\.\d{4}|Tel)', x) for x in b2) \
                        and not any(len(x.strip()) > 75 and not is_table_line(x) for x in b2):
                    info = b2
                    rest_start = nxt[0] + 1
    body = []
    for b in blocks[rest_start:]:
        if b is None:
            body.append('')
        else:
            body.extend(b)
    while body and not body[0].strip():
        body.pop(0)
    return head, ruck, addr, info, body


def footer_lines(doc):
    rng = doc.rng
    b = doc.brand
    if doc.auth:
        return [[b, 'Öffnungszeiten: Mo, Di, Do 8–12 Uhr', 'und nach Terminvereinbarung'],
                ['Bankverbindung', 'Landesbank Beispielland', 'IBAN DE00 0000 0000 0000 0000 00'],
                ['Barrierefreier Zugang', 'Haltestelle Rathausplatz', 'Linien 3, 7, 12']]
    if doc.school:
        return [[b, 'Sekretariat Mo–Fr 7:30–13:00 Uhr', ''],
                ['Förderverein', 'Beispielbank Nord', 'IBAN DE00 0000 0000 0000 0000 00'], ['', '', '']]
    hr = 'HRB ' + str(rng.randint(1000, 99999))
    return [[b, 'Sitz: Beispielstadt-Nord', 'Registergericht: Amtsgericht Beispielstadt ' + hr],
            ['Geschäftsführung: ' + rng.choice(['A. Beispiel', 'M. Muster', 'K. Exempel', 'S. Probe']),
             'USt-IdNr.: DE000' + str(rng.randint(100000, 999999)), ''],
            ['Bankverbindung: Beispielbank Nord', 'IBAN DE00 0000 0000 0000 0000 00', 'BIC BEISDEXXXX']]


class Pager:
    def __init__(self, doc, size=(210, 297), base_pt=10, paint=True, margins=(25, 20, 20, 28)):
        self.doc = doc
        self.Wmm, self.Hmm = size
        self.W, self.H = mm(size[0]), mm(size[1])
        self.base = base_pt
        self.paint = paint
        self.ml, self.mr, self.mt, self.mb = [mm(v) for v in margins]
        self.pages = []
        self.y = 0
        self.new_page()

    def new_page(self):
        img = Image.new('RGB', (self.W, self.H), (255, 255, 255)) if self.paint else None
        self.pages.append(img)
        self.d = ImageDraw.Draw(img) if self.paint else None
        self.y = self.mt

    @property
    def img(self):
        return self.pages[-1]

    def need(self, h):
        if self.y + h > self.H - self.mb:
            self.cont_page()

    def cont_page(self):
        self.new_page()
        if self.paint:
            f = font('sans', pt(8))
            dtext(self.d, self.ml, mm(14), self.doc.brand + ' – Seite %d' % len(self.pages), f, (90, 90, 90))
        self.y = mm(22)

    def text_line(self, x, txt, f, color=(0, 0, 0), lh=None):
        lh = lh or int(f.size * 1.32)
        self.need(lh)
        self.y += lh
        if self.paint:
            w = dtext(self.d, x, self.y - int(lh * 0.25), txt, f, color)
            self.doc.linepos.append((len(self.pages) - 1, x, self.y - int(lh * 0.25), x + w, txt, f.size))
        return lh


def render_body(P, body, x0, width, f, fb, fmono, opts):
    """Fließtext/Tabellen/Linien. opts: twocol(bool)."""
    doc = P.doc
    i = 0
    n = len(body)
    cw0 = f.getlength('0')
    while i < n:
        l = body[i]
        s = l.strip()
        if not s:
            P.y += int(f.size * 0.6)
            i += 1
            continue
        if is_rule(l):
            P.need(int(f.size * 0.6))
            P.y += int(f.size * 0.5)
            if P.paint:
                dbl = '=' in s
                P.d.line([(x0, P.y), (x0 + width, P.y)], fill=(70, 70, 70), width=2)
                if dbl:
                    P.d.line([(x0, P.y + 5), (x0 + width, P.y + 5)], fill=(70, 70, 70), width=2)
            P.y += int(f.size * 0.3)
            i += 1
            continue
        if '[handschriftlich' in s or s.startswith('(Notiz') or s.startswith('->') or s.startswith('-> '):
            # gedruckter Teil + Handschrift
            lh = int(f.size * 1.9)
            P.need(lh)
            P.y += lh
            if P.paint:
                hand_text(P.img, x0, P.y - int(lh * 0.3), s, int(f.size * 1.25), (25, 45, 140), doc.rng)
                doc.marks.append('handschrift')
            i += 1
            continue
        if is_table_line(l):
            # Tabellengruppe
            grp = []
            j = i
            while j < n and body[j].strip() and (is_table_line(body[j]) or (grp and len(body[j]) <= 90 and not is_rule(body[j]) and j + 1 < n and is_table_line(body[j + 1]))):
                grp.append(body[j])
                j += 1
            if not grp:
                grp = [l]
                j = i + 1
            maxlen = max(len(g) for g in grp)
            cw = min(cw0 * 1.02, width / max(1, maxlen))
            fs = f
            if cw < cw0 * 0.95:
                fs = font(opts.get('fname', 'sans'), max(10, int(f.size * cw / cw0 * 1.02)))
            lh = int(fs.size * 1.3)
            for gi, g in enumerate(grp):
                P.need(lh)
                P.y += lh
                if P.paint:
                    cells = split_cells(g)
                    head_row = gi == 0 and not RE_AMT.search(g) and len(cells) >= 3
                    xprev = x0
                    for (c, t) in cells:
                        ff = font(opts.get('fname', 'sans') + 'b', fs.size) if head_row and opts.get('fname', 'sans') + 'b' in FONTS else fs
                        num = bool(re.fullmatch(r'[-+]?\s*[\d.,]+\s*(€|EUR|%|[HS])?\s*[A-Z]?', t)) and len(t) <= 16
                        if num:
                            xr = x0 + (c + len(t)) * cw
                            xx = max(xprev + cw, xr - tw(t, ff))
                        else:
                            xx = max(xprev + (cw if c else 0), x0 + c * cw)
                        w = dtext(P.d, xx, P.y - int(lh * 0.25), t, ff)
                        doc.linepos.append((len(P.pages) - 1, xx, P.y - int(lh * 0.25), xx + w, t, ff.size))
                        xprev = xx + w
            i = j
            continue
        # normaler Absatz (Zeile)
        indent = len(l) - len(l.lstrip())
        bold = (s.isupper() and len(s) >= 4 and sum(ch.isalpha() for ch in s) >= 4) or s.startswith('Betr') or opts.get('bold_next')
        opts['bold_next'] = False
        ff = fb if bold else f
        xx = x0 + indent * cw0 * 0.6
        for wl in wrap(s, ff, width - (xx - x0)):
            P.text_line(xx, wl, ff)
        i += 1


def draw_header(P, head, ruck, has_addr=True):
    """Briefkopf mit Wort-/Bildmarke. Gibt y nach dem Kopf zurück."""
    doc = P.doc
    d = P.d
    rng = doc.rng
    s = mm(16)
    lx = P.W - P.mr - s if rng.random() < 0.55 else P.ml
    top = mm(12)
    # Wortmarke
    if P.paint:
        draw_logo(P.img, lx, top, s, doc.logo, doc.color, doc.ini, rng)
    name_lines = []
    small = []
    if ruck:
        name_lines = [doc.brand]
        if not has_addr:
            small = [ruck]
    elif head:
        cells = [t for _, t in split_cells(head[0].strip())] if is_table_line(head[0]) else [head[0].strip()]
        name_lines = [cells[0]]
        small = cells[1:] + [h.strip() for h in head[1:]]
    fam = 'serifb' if doc.auth else rng.choice(['sansb', 'interb', 'carlitob', 'caladeab'])
    tx = P.ml if lx != P.ml else P.ml + s + mm(4)
    maxw = mm(115)
    y = top
    if P.paint:
        for nl in name_lines:
            fs = pt(17 if len(nl) < 30 else 13)
            f = font(fam, fs)
            while tw(nl, f) > maxw and fs > pt(8):
                fs -= 2
                f = font(fam, fs)
            parts = wrap(nl, f, maxw)
            for p in parts:
                y += int(f.size * 1.15)
                dtext(d, tx, y, p, f, doc.color if not doc.auth else (20, 20, 20))
                doc.linepos.append((0, tx, y, tx + tw(p, f), p, f.size))
        fsm = font('sans', pt(8.5))
        for sl in small:
            for p in wrap(sl, fsm, maxw):
                y += int(fsm.size * 1.3)
                dtext(d, tx, y, p, fsm, (60, 60, 60))
                doc.linepos.append((0, tx, y, tx + tw(p, fsm), p, fsm.size))
        # Farbbalken
        if not doc.auth and rng.random() < 0.5:
            d.rectangle([0, 0, P.W, mm(4)], fill=doc.color)
        # Falz- und Lochmarken
        d.line([(mm(3), mm(105)), (mm(8), mm(105))], fill=(120, 120, 120), width=2)
        d.line([(mm(3), mm(148.5)), (mm(10), mm(148.5))], fill=(120, 120, 120), width=2)
        d.line([(mm(3), mm(210)), (mm(8), mm(210))], fill=(120, 120, 120), width=2)
    else:
        y += int(pt(17) * 1.15) + len(small) * int(pt(8.5) * 1.3)
    return max(y, top + s) + mm(4)


def render_letter(doc, base_pt, paint=True, size=(210, 297)):
    rng = random.Random(doc.rng.random())  # Layout-Zufall gleich für Probe und Malen
    sub = Doc.__new__(Doc)
    sub.__dict__.update(doc.__dict__)
    sub.rng = rng
    sub.codes = []
    sub.marks = []
    sub.linepos = []
    head, ruck, addr, info, body = parse_letter(sub)
    P = Pager(sub, size=size, base_pt=base_pt, paint=paint)
    fname = 'serif' if (doc.auth and rng.random() < 0.35) else rng.choice(['sans', 'sans', 'carlito', 'inter', 'sans'])
    f = font(fname, pt(base_pt))
    fb = font(fname + 'b' if fname + 'b' in FONTS else 'sansb', pt(base_pt))
    yh = draw_header(P, head, ruck, bool(addr))
    two = doc.kind in ('werbung',) and len(doc.text) > 700
    werb = doc.kind == 'werbung'
    width = P.W - P.ml - P.mr
    if addr:
        wy = mm(45)
        if paint and ruck:
            fr = font('sans', pt(6.5))
            rl = wrap(ruck, fr, mm(62))
            yy = wy + mm(2.5)
            for r in rl:
                w = dtext(P.d, P.ml, yy, r, fr, (40, 40, 40))
                P.d.line([(P.ml, yy + 3), (P.ml + w, yy + 3)], fill=(90, 90, 90), width=1)
                sub.linepos.append((0, P.ml, yy, P.ml + w, r, fr.size))
                yy += int(fr.size * 1.25)
        elif paint and not ruck and rng.random() < 0.6:
            # eigene Rücksendezeile aus Kopf
            pass
        fa = font(fname, pt(10))
        yy = wy + mm(15)
        for a in addr:
            if paint:
                w = dtext(P.d, P.ml, yy, a.strip(), fa)
                sub.linepos.append((0, P.ml, yy, P.ml + w, a.strip(), fa.size))
            yy += int(fa.size * 1.25)
        # Frankierung mit Datamatrix
        if ruck or rng.random() < 0.5:
            if paint:
                dm = dm_img('BSPPOST' + hashlib.md5(doc.name.encode()).hexdigest()[:22].upper(), mm(13))
                paste_code(P.img, dm, P.ml + mm(66), wy + mm(1))
                ft = font('sans', pt(5.5))
                dtext(P.d, P.ml + mm(66), wy + mm(16.3), 'Beispielpost', ft, (60, 60, 60))
            sub.codes.append('datamatrix-frankierung')
        infoy = mm(50)
        if info:
            fi = font(fname, pt(8.5))
            yy = infoy
            for il in info:
                cells = [t for _, t in split_cells(il)] if is_table_line(il) else [il.strip()]
                for c in cells:
                    for p in wrap(c, fi, mm(70)):
                        yy += int(fi.size * 1.35)
                        if paint:
                            w = dtext(P.d, mm(125), yy, p, fi, (30, 30, 30))
                            sub.linepos.append((0, mm(125), yy, mm(125) + w, p, fi.size))
            infoy = yy
        ref = find_ref(doc.text)
        if ref and (rng.random() < 0.75 or doc.auth):
            if paint:
                bh = mm(8)
                bc = c128_img(ref, min(mm(62), mm(3) + len(ref) * mm(3.2)), bh)
                paste_code(P.img, bc, mm(125), infoy + mm(4))
            sub.codes.append('code128')
            infoy += mm(14)
        P.y = max(mm(98), yy + mm(6), infoy + mm(6))
        if yh > mm(44):
            P.y = max(P.y, yh + mm(55))
    else:
        P.y = yh + mm(6)
    # Bescheid-Strichcode am linken Rand
    if doc.auth and re.search(r'(Bescheid|Festsetzung|Messbescheid|Bewilligung)', doc.text):
        if paint:
            digits = re.sub(r'\D', '', find_ref(doc.text) or doc.name) or '0'
            digits = (digits + hashlib.md5(doc.name.encode()).hexdigest().translate(str.maketrans('abcdef', '123456')))[:14]
            bc = i2of5_img(digits, mm(48), mm(6)).rotate(90, expand=True)
            paste_code(P.img, bc, mm(9), mm(118))
        sub.codes.append('strichcode-bescheid')
    fm = font('mono', pt(base_pt * 0.9))
    if two and paint is not None:
        colw = (width - mm(8)) // 2
        # zwei Spalten: Fließtext gleichmäßig verteilen
        lines_all = body
        half = len(lines_all) // 2
        # suche Leerzeile nahe der Hälfte
        cut = half
        for k in range(len(lines_all)):
            for c in (half + k, half - k):
                if 0 < c < len(lines_all) and not lines_all[c].strip():
                    cut = c
                    break
            else:
                continue
            break
        y0 = P.y
        if paint:
            P.d.rectangle([P.ml, y0, P.W - P.mr, y0 + mm(2)], fill=doc.color)
        P.y = y0 + mm(4)
        render_body(P, lines_all[:cut], P.ml, colw, f, fb, fm, {'fname': fname})
        y1 = P.y
        npages = len(P.pages)
        P.y = y0 + mm(4)
        render_body(P, lines_all[cut:], P.ml + colw + mm(8), colw, f, fb, fm, {'fname': fname})
        P.y = max(P.y, y1) if len(P.pages) == npages else P.y
    else:
        if werb and body:
            fh = font('interx', pt(base_pt * 1.7))
            k0 = 0
            while k0 < len(body) and not body[k0].strip():
                k0 += 1
            if k0 < len(body):
                P.y += mm(4)
                for wl in wrap(body[k0].strip(), fh, width):
                    P.text_line(P.ml, wl, fh, doc.color)
                P.y += mm(3)
                body = body[k0 + 1:]
        render_body(P, body, P.ml, width, f, fb, fm, {'fname': fname})
    end_y = P.y
    # Unterschrift
    gruss = any(re.search(r'(freundlichen Grüßen|Freundliche Grüße|Viele Grüße|Mit besten Grüßen|Hochachtungsvoll|Im Auftrag)', l) for l in body)
    maschinell = re.search(r'(maschinell|ohne Unterschrift|automatisch erstellt)', doc.text)
    if gruss and not maschinell:
        if paint and sub.linepos:
            # über die letzte Zeile(n) hinter dem Gruß
            gl = [lp for lp in sub.linepos if lp[0] == len(P.pages) - 1 and re.search(r'(Grüß|Grüße|Hochachtungsvoll|Im Auftrag)', lp[4])]
            if gl:
                lp = gl[-1]
                scribble(P.img, lp[1] + mm(2), lp[2] + mm(1), mm(38), mm(11), (20, 30, 110) if rng.random() < 0.6 else (25, 25, 25), rng, width=3)
                sub.marks.append('unterschrift')
    # Girocode
    if pay_doc(doc.text, doc.name) and rng.random() < 0.8:
        amt = find_amount(doc.text)
        iban = find_iban(doc.text)
        m = re.search(r'Verwendungszweck:?\s*([^\n·]{3,60})', doc.text)
        vz = (m.group(1).strip() if m else (find_ref(doc.text) or ''))[:60]
        val = 'BCD\n002\n1\nSCT\n\n%s\n%s\nEUR%s\n\n\n%s' % (doc.brand[:70], iban, amt.replace('.', '').replace(',', '.'), vz)
        qs = mm(24)
        if paint:
            yq = P.y + mm(5)
            if yq + qs > P.H - P.mb:
                yq = P.H - P.mb - qs - mm(1)
            xq = P.W - P.mr - qs
            P.d.rectangle([xq - mm(2), yq - mm(2), xq + qs + mm(2), yq + qs + mm(2)], fill=(255, 255, 255))
            paste_code(P.img, qr_img(val, qs), xq, yq)
            fl = font('sansb', pt(6.5))
            dtext(P.d, xq - mm(1), yq + qs + mm(4.5), 'GiroCode', fl, (40, 40, 40))
            end_y = max(end_y, yq + qs + mm(6))
        sub.codes.append('qr-ueberweisung')
    if werb:
        if paint:
            qs = mm(22)
            yq = min(P.y + mm(4), P.H - P.mb - qs)
            paste_code(P.img, qr_img('https://www.' + re.sub(r'[^a-z]', '', doc.brand.lower())[:20] + '.example/aktion', qs), P.ml, yq)
            end_y = max(end_y, yq + qs)
        sub.codes.append('qr-link')
    # Fußzeile
    if paint:
        fl = footer_lines(sub)
        ff = font('sans', pt(6.2))
        for pi, img in enumerate(P.pages):
            d = ImageDraw.Draw(img)
            yb = P.H - mm(20)
            d.line([(P.ml, yb - mm(3)), (P.W - P.mr, yb - mm(3))], fill=doc.color if not doc.auth else (120, 120, 120), width=2)
            colw = (P.W - P.ml - P.mr) // 3
            for ci, col in enumerate(fl):
                yy = yb
                for t in col:
                    if t:
                        dtext(d, P.ml + ci * colw, yy, t, ff, (70, 70, 70))
                    yy += int(ff.size * 1.3)
            if len(P.pages) > 1:
                dtext(d, P.W - P.mr - mm(18), P.H - mm(8), 'Seite %d von %d' % (pi + 1, len(P.pages)), ff, (70, 70, 70))
    sub.end_y = end_y
    sub.page_size = (P.W, P.H)
    return P.pages, sub


def fit_letter(doc, want_single):
    for b in [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6]:
        pages, _ = render_letter(doc, b, paint=False)
        if len(pages) == 1 or (not want_single and b <= 9):
            return render_letter(doc, b, paint=True)
    return render_letter(doc, 6, paint=True)


# ---------------------------------------------------------------- andere Gestalten
def render_mail(doc, want_single, portal=False):
    rng = random.Random(doc.rng.random())
    lines = doc.lines
    hdr, body = [], []
    in_hdr = not portal
    for l in lines:
        if in_hdr and re.match(r'^[A-Za-zÄÖÜäöü\-]+:\s', l):
            hdr.append(l)
        elif in_hdr and not l.strip() and hdr:
            in_hdr = False
        else:
            in_hdr = False
            body.append(l)
    sizes = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6]
    for b in sizes:
        for paint in (False, True):
            sub = Doc.__new__(Doc)
            sub.__dict__.update(doc.__dict__)
            sub.rng = random.Random(rng.random() if paint else 0)
            sub.codes, sub.marks, sub.linepos = [], [], []
            P = Pager(sub, base_pt=b, paint=paint, margins=(18, 18, 14, 20))
            f = font('sans', pt(b))
            fb = font('sansb', pt(b))
            width = P.W - P.ml - P.mr
            if portal:
                bn = brand_name([l for l in lines if not l.startswith('[')] or lines)
                dom = re.sub(r'[^a-z]', '', bn.lower())[:18] or 'portal'
                if paint:
                    fs = font('sans', pt(7))
                    dtext(P.d, P.ml, mm(8), 'Kundenportal – ' + bn, fs, (80, 80, 80))
                    P.d.rectangle([P.ml, mm(12), P.W - P.mr, mm(26)], fill=doc.color)
                    P.d.rounded_rectangle([P.ml + mm(3), mm(14), P.ml + mm(13), mm(24)], radius=mm(2), fill=(255, 255, 255))
                    fi_ = font('interx', mm(6))
                    ii = initials(bn)[:1]
                    dtext(P.d, P.ml + mm(8) - tw(ii, fi_) / 2, mm(21.5), ii, fi_, doc.color)
                    nf = font('interb', pt(9))
                    x = P.ml + mm(18)
                    for item in ['Übersicht', 'Meine Verträge', 'Rechnungen', 'Persönliche Daten', 'Hilfe']:
                        x += dtext(P.d, x, mm(21), item, nf, (255, 255, 255)) + mm(7)
                    fu = font('sans', pt(7))
                    dtext(P.d, P.ml, P.H - mm(8), 'https://kundenportal.%s.example/vertraege/details' % dom, fu, (80, 80, 80))
                    dtext(P.d, P.W - P.mr - mm(10), P.H - mm(8), '1/1', fu, (80, 80, 80))
                P.y = mm(32)
            else:
                to = next((h for h in hdr if re.match(r'^(To|An):', h)), '')
                acct = re.sub(r'^(To|An):\s*', '', to)
                if paint:
                    fs = font('sansb', pt(11))
                    dtext(P.d, P.ml, mm(14), acct, fs)
                    P.d.line([(P.ml, mm(17)), (P.W - P.mr, mm(17))], fill=(0, 0, 0), width=4)
                P.y = mm(20)
                fh = font('sans', pt(b))
                fhb = font('sansb', pt(b))
                for h in hdr:
                    k, v = h.split(':', 1)
                    P.need(int(fh.size * 1.35))
                    P.y += int(fh.size * 1.35)
                    if paint:
                        dtext(P.d, P.ml, P.y, k + ':', fhb)
                        for wi, wl in enumerate(wrap(v.strip(), fh, width - mm(28))):
                            if wi:
                                P.y += int(fh.size * 1.3)
                            w = dtext(P.d, P.ml + mm(28), P.y, wl, fh)
                            sub.linepos.append((0, P.ml, P.y, P.ml + mm(28) + w, k + ': ' + wl, fh.size))
                P.y += mm(3)
                if paint:
                    P.d.line([(P.ml, P.y), (P.W - P.mr, P.y)], fill=(160, 160, 160), width=2)
                P.y += mm(2)
            render_body(P, body, P.ml, width, f, fb, font('mono', pt(b * 0.9)), {'fname': 'sans'})
            if paint and not portal:
                fu = font('sans', pt(7))
                for pi, img in enumerate(P.pages):
                    dtext(ImageDraw.Draw(img), P.W // 2 - mm(8), P.H - mm(8), '%d' % (pi + 1), fu, (80, 80, 80))
            if not paint and not (len(P.pages) == 1 or (not want_single and b <= 9)) and b != sizes[-1]:
                break
            if paint:
                sub.end_y = P.y
                sub.page_size = (P.W, P.H)
                return P.pages, sub
    return P.pages, sub


def render_bon(doc):
    rng = random.Random(doc.rng.random())
    sub = Doc.__new__(Doc)
    sub.__dict__.update(doc.__dict__)
    sub.rng = rng
    sub.codes, sub.marks, sub.linepos = [], [], []
    lines = doc.lines
    ind = min((len(l) - len(l.lstrip()) for l in lines if l.strip()), default=0)
    lines = [l[ind:] for l in lines]
    lens = sorted(len(l) for l in lines if l.strip())
    ncol = lens[-1] if lens[-1] <= 54 else max(42, lens[int(0.9 * (len(lens) - 1))])
    import textwrap
    wl = []
    for l in lines:
        if len(l) > ncol:
            pre = len(l) - len(l.lstrip())
            wl.extend((' ' * pre + t) for t in textwrap.wrap(l.strip(), ncol - pre))
        else:
            wl.append(l)
    lines = wl
    maxlen = ncol
    W = mm(80)
    m = mm(4)
    cw = (W - 2 * m) / max(maxlen, 32)
    fname = rng.choice(['jbm', 'mono', 'mono'])
    fs = int(cw / 0.6)
    f = font(fname, fs)
    fb = font(fname + 'b' if fname + 'b' in FONTS else 'monob', fs)
    lh = int(fs * 1.28)
    H = mm(30) + lh * (len(lines) + 2) + mm(45)
    img = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    y = mm(6)
    # Logo oben
    if rng.random() < 0.7:
        s = mm(14)
        draw_logo(img, (W - s) // 2, y, s, rng.randrange(6), (0, 0, 0), initials(doc.brand), rng)
        y += s + mm(3)
    for i, l in enumerate(lines):
        y += lh
        s = l.strip()
        if not s:
            continue
        ff = fb if (i < 2 or re.match(r'\s*(SUMME|Summe|GESAMT)', l)) else f
        x = m + (len(l) - len(l.lstrip())) * cw
        if ff is fb and i < 2:
            fbn = fname + 'b' if fname + 'b' in FONTS else 'monob'
            ff = font(fbn, int(fs * 1.15))
            while tw(s, ff) > W - 2 * m and ff.size > 8:
                ff = font(fbn, ff.size - 1)
            w = tw(s, ff)
            x = max(m, (W - w) / 2)
        dtext(d, x, y, s if ff is not f else l.lstrip(), ff)
        sub.linepos.append((0, x, y, x + tw(s, ff), s, ff.size))
    y += mm(6)
    if rng.random() < 0.8:
        qs = mm(24)
        val = 'V0;KASSE-%04d;Kassenbeleg-V1;Beleg^%s;%s;ecdsa-plain-SHA256' % (rng.randint(1, 9999), hashlib.sha1(doc.name.encode()).hexdigest()[:16], hashlib.md5(doc.text.encode()).hexdigest())
        if rng.random() < 0.4:
            val = 'https://www.' + re.sub(r'[^a-z]', '', doc.brand.lower())[:18] + '.example/bon'
        paste_code(img, qr_img(val, qs), (W - qs) // 2, y)
        y += qs + mm(3)
        sub.codes.append('qr-bon')
    m2 = re.search(r'(?:Bon|Beleg|Transaktion)[ -]?(?:Nr\.?)?\s*(\d{3,8})', doc.text)
    if m2 and rng.random() < 0.7:
        bc = c128_img(m2.group(1), mm(50), mm(9))
        paste_code(img, bc, (W - bc.width) // 2, y)
        y += mm(12)
        sub.codes.append('code128')
    img = img.crop((0, 0, W, int(y + mm(8))))
    sub.end_y = y
    sub.page_size = img.size
    return [img], sub


def render_zettel(doc):
    rng = random.Random(doc.rng.random())
    sub = Doc.__new__(Doc)
    sub.__dict__.update(doc.__dict__)
    sub.rng = rng
    sub.codes, sub.marks, sub.linepos = [], [], []
    lines = doc.lines
    printed = []
    if lines and (lines[0].startswith('[') or lines[0].startswith('(')):
        printed = [lines[0]]
        lines = lines[1:]
    size = rng.choice([(148, 210), (105, 148), (148, 210)])
    W, H = mm(size[0]), mm(size[1])
    hand_px = pt(rng.uniform(12.5, 14.5))
    fname = rng.choice(['freesanso', 'sansi', 'carlitoi', 'caladeai', 'freeserifi'])
    ink = rng.choice([(20, 40, 150), (25, 25, 60), (40, 40, 40)])
    # Zeilen umbrechen (nach Breite)
    f = font(fname, hand_px)
    usable = W - mm(14)
    wl = []
    for l in lines:
        if not l.strip():
            wl.append('')
            continue
        for p in wrap(l.strip(), f, usable / 1.12):
            wl.append(p)
    lh = int(hand_px * 1.75)
    need = mm(24) + lh * (len(wl) + 1)
    if need > H:
        scale = need / H
        if scale > 1.0:
            # größeres Blatt / kleinere Schrift
            hand_px = int(hand_px / math.sqrt(scale))
            lh = int(hand_px * 1.75)
            f = font(fname, hand_px)
            wl = []
            usable = W - mm(14)
            for l in lines:
                if not l.strip():
                    wl.append('')
                    continue
                wl.extend(wrap(l.strip(), f, usable / 1.12))
            H = max(H, mm(24) + lh * (len(wl) + 1))
    paper = rng.choice(['kariert', 'liniert', 'blanko'])
    img = Image.new('RGB', (W, H), (252, 251, 245) if paper != 'blanko' else (255, 255, 250))
    d = ImageDraw.Draw(img)
    top = mm(18)
    if paper == 'kariert':
        g = mm(5)
        for x in range(0, W, g):
            d.line([(x, 0), (x, H)], fill=(190, 205, 225), width=1)
        for yv in range(0, H, g):
            d.line([(0, yv), (W, yv)], fill=(190, 205, 225), width=1)
    elif paper == 'liniert':
        for yv in range(top + lh - int(lh * 0.1), H, lh):
            d.line([(0, yv), (W, yv)], fill=(170, 190, 220), width=2)
        d.line([(mm(10), 0), (mm(10), H)], fill=(230, 150, 150), width=2)
    if printed:
        fp = font('sans', pt(7.5))
        yy = mm(8)
        for p in wrap(printed[0], fp, W - mm(12)):
            w = dtext(d, mm(6), yy, p, fp, (60, 60, 60))
            sub.linepos.append((0, mm(6), yy, mm(6) + w, p, fp.size))
            yy += int(fp.size * 1.3)
        top = max(top, yy + mm(2))
    y = top
    for l in wl:
        y += lh
        if not l:
            continue
        x = mm(7) + rng.uniform(-mm(1), mm(1))
        lw = hand_text(img, x, y - int(lh * 0.2), l, hand_px, ink, rng, fname=fname)
        sub.linepos.append((0, x, y, x + lw, l, hand_px))
    sub.marks.append('handschrift')
    sub.marks.append('papier-' + paper)
    img = img.crop((0, 0, W, max(min(H, y + mm(14)), mm(80))))
    sub.end_y = y
    sub.page_size = img.size
    return [img], sub


def join_paras(lines):
    out = []
    for l in lines:
        if out and out[-1].strip() and l.strip() and not is_table_line(l) and not is_table_line(out[-1]) \
                and len(out[-1]) > 45 and not re.match(r'\s*([-*•]|\[|\(|\d+\.)\s', l) and not out[-1].rstrip().endswith(':'):
            out[-1] = out[-1].rstrip() + ' ' + l.strip()
        else:
            out.append(l)
    return out


def render_aushang(doc, flyer=False, karte=False):
    rng = random.Random(doc.rng.random())
    lines = join_paras(doc.lines)
    size = (210, 297) if not karte else (148, 105 * 1.4)
    sizes = [16, 14, 13, 12, 11, 10, 9, 8, 7]
    for b in sizes:
        last = b == sizes[-1]
        if karte:
            b = b * 0.8
        for paint in (False, True):
            sub = Doc.__new__(Doc)
            sub.__dict__.update(doc.__dict__)
            sub.rng = random.Random(rng.random() if paint else 0)
            sub.codes, sub.marks, sub.linepos = [], [], []
            P = Pager(sub, size=size, base_pt=b, paint=paint, margins=(18, 18, 16, 16))
            fam = 'serif' if karte else rng.choice(['sans', 'inter', 'carlito'])
            f = font(fam, pt(b))
            fb = font(fam + 'b' if fam + 'b' in FONTS else 'sansb', pt(b * 1.25))
            width = P.W - P.ml - P.mr
            if paint:
                if karte:
                    P.d.rectangle([mm(6), mm(6), P.W - mm(6), P.H - mm(6)], outline=(0, 0, 0), width=mm(0.8))
                elif flyer:
                    P.d.rectangle([0, 0, P.W, mm(40)], fill=doc.color)
                    P.d.rectangle([0, P.H - mm(14), P.W, P.H], fill=doc.color)
                else:
                    P.d.rectangle([mm(8), mm(8), P.W - mm(8), P.H - mm(8)], outline=(200, 30, 30) if rng.random() < 0.5 else (0, 0, 0), width=mm(1.2))
            P.y = P.mt + (mm(4) if flyer else 0)
            first = True
            for l in lines:
                s = l.strip()
                if not s:
                    P.y += int(f.size * 0.7)
                    continue
                ff = f
                col = (0, 0, 0)
                big = first or (s.isupper() and len(s) > 3) or s.startswith('***') or s.startswith('★')
                if big:
                    ff = fb
                if flyer and first:
                    col = (255, 255, 255)
                if '[handschriftlich' in s:
                    P.y += int(f.size * 1.9)
                    if paint:
                        hand_text(P.img, P.ml, P.y, s, int(f.size * 1.2), (25, 45, 140), sub.rng)
                        sub.marks.append('handschrift')
                    continue
                if is_table_line(l) and not karte:
                    render_body(P, [l], P.ml, width, f, fb, f, {'fname': fam})
                    first = False
                    continue
                for wl in wrap(s, ff, width):
                    if karte or (big and not flyer):
                        lh = int(ff.size * 1.35)
                        P.need(lh)
                        P.y += lh
                        if paint:
                            w = tw(wl, ff)
                            xx = (P.W - w) / 2
                            dtext(P.d, xx, P.y - int(lh * 0.25), wl, ff, col)
                            sub.linepos.append((len(P.pages) - 1, xx, P.y, xx + w, wl, ff.size))
                    else:
                        P.text_line(P.ml, wl, ff, col)
                first = False
            if flyer or WERB.search(doc.text):
                if paint:
                    qs = mm(30)
                    yq = min(P.y + mm(6), P.H - qs - mm(18))
                    paste_code(P.img, qr_img('https://app.' + re.sub(r'[^a-z]', '', doc.brand.lower())[:18] + '.example/coupon', qs), P.W - P.mr - qs, yq)
                sub.codes.append('qr-link')
            if not paint and len(P.pages) > 1 and not last:
                break
            if paint:
                sub.end_y = P.y
                sub.page_size = (P.W, P.H)
                return P.pages, sub
    return P.pages, sub


def render_screen(doc, notiz=False):
    """Handy-Screenshot (Mail-App oder Notizen-App), ggf. lang gescrollt."""
    rng = random.Random(doc.rng.random())
    sub = Doc.__new__(Doc)
    sub.__dict__.update(doc.__dict__)
    sub.rng = rng
    sub.codes, sub.marks, sub.linepos = [], [], []
    W = 1080
    dark = rng.random() < 0.2
    bg = (18, 18, 20) if dark else (255, 255, 255)
    fg = (235, 235, 235) if dark else (20, 20, 20)
    acc = PALETTE[rng.randrange(len(PALETTE))]
    f = font('inter', 40)
    fb = font('interb', 44)
    fs = font('inter', 32)
    lines = doc.lines
    hdr, body = [], []
    if not notiz:
        in_hdr = True
        for l in lines:
            if in_hdr and re.match(r'^[A-Za-zÄÖÜäöü\-]+:\s', l):
                hdr.append(l)
            elif in_hdr and not l.strip() and hdr:
                in_hdr = False
            else:
                in_hdr = False
                body.append(l)
    else:
        body = lines
    body = join_paras(body)
    width = W - 96
    # Inhalt erst auf großer Fläche malen
    H = 260 + 60 * len(hdr) + 70 * sum(max(1, len(wrap(l.strip(), f, width)) if l.strip() else 1) for l in body) + 600
    H = max(H, 2340)
    img = Image.new('RGB', (W, H), bg)
    d = ImageDraw.Draw(img)
    # Statusleiste
    d.rectangle([0, 0, W, 90], fill=bg)
    dtext(d, 48, 62, '%02d:%02d' % (rng.randint(7, 22), rng.randint(0, 59)), font('interm', 34), fg)
    for i in range(4):
        d.rectangle([W - 200 + i * 16, 62 - 8 - i * 7, W - 190 + i * 16, 62], fill=fg)
    d.rounded_rectangle([W - 120, 36, W - 56, 64], radius=6, outline=fg, width=3)
    d.rectangle([W - 116, 40, W - 80, 60], fill=fg)
    # App-Leiste
    title = 'Notizen' if notiz else 'Posteingang'
    d.line([(48, 160), (78, 130), (48, 160), (78, 190)], fill=acc, width=6)
    dtext(d, 110, 175, title, font('interm', 40), acc)
    y = 250
    if not notiz:
        frm = next((h for h in hdr if re.match(r'^(From|Von):', h)), 'Von: ?')
        subj = next((h for h in hdr if re.match(r'^(Subject|Betreff):', h)), '')
        # Betreff groß
        for wl in wrap(subj, fb, width):
            y += 60
            dtext(d, 48, y, wl, fb, fg)
        y += 40
        d.ellipse([48, y, 148, y + 100], fill=acc)
        nm = re.sub(r'^(From|Von):\s*', '', frm)
        ini = initials(nm)[:1] or 'A'
        dtext(d, 98 - tw(ini, font('interb', 50)) / 2, y + 68, ini, font('interb', 50), (255, 255, 255))
        yy = y + 20
        for h in hdr:
            if h is subj:
                continue
            for wl in wrap(h, fs, width - 130):
                yy += 42
                dtext(d, 170, yy, wl, fs, (130, 130, 130) if not dark else (170, 170, 170))
        y = max(y + 110, yy + 20)
        d.line([(48, y + 20), (W - 48, y + 20)], fill=(200, 200, 200) if not dark else (70, 70, 70), width=2)
        y += 40
    else:
        y += 20
    for l in body:
        s = l.strip()
        if not s:
            y += 34
            continue
        ff = fb if (notiz and y < 330) else f
        for wl in wrap(s, ff, width - (len(l) - len(l.lstrip())) * 10):
            y += 62
            dtext(d, 48 + (len(l) - len(l.lstrip())) * 10, y, wl, ff, fg)
    y += 120
    # Navigationsleiste unten
    H2 = max(2340, y + 160)
    img = img.crop((0, 0, W, H2)) if H2 <= H else ImageOps.pad(img, (W, H2), color=bg, centering=(0, 0))
    d = ImageDraw.Draw(img)
    d.rectangle([0, H2 - 140, W, H2], fill=bg)
    d.line([(0, H2 - 140), (W, H2 - 140)], fill=(210, 210, 210) if not dark else (60, 60, 60), width=2)
    d.rounded_rectangle([W // 2 - 140, H2 - 40, W // 2 + 140, H2 - 30], radius=5, fill=fg)
    sub.marks.append('screenshot' + ('-dunkel' if dark else ''))
    if H2 > 2340:
        sub.marks.append('langer-screenshot')
    sub.end_y = y
    sub.page_size = img.size
    return [img], sub


# ---------------------------------------------------------------- Zusätze: Handnotiz, Stempel, Markierung
NOTES = {
    'zahl': ['bezahlt', 'überwiesen!', 'Dauerauftrag?', 'erl.', 'bez. ✓'],
    'frist': ['Frist!!', 'anrufen!', 'bis wann?', 'nachfragen', 'Widerspruch?'],
    'ablage': ['Ordner Steuer', 'abheften', 'Ordner Wohnung', 'Kopie machen', 'wichtig!', 'aufheben'],
}


def add_extras(pages, sub, doc_kind, q, rng):
    if doc_kind in ('screen-mail', 'screen-notiz'):
        return
    img = pages[0]
    W, H = img.size
    text = sub.text
    # Stempel
    if doc_kind in ('brief', 'aushang') and rng.random() < 0.38:
        if sub.auth and re.search(r'(Bestätigung|bestätigung|Bescheinigung|Quittung|Siegel|Gebühr|Meldebest|ausgestellt|Ausgestellt|Erbschein|Vollmacht|beglaubigt)', text):
            stamp(img, W * rng.uniform(0.55, 0.75), min(H - mm(45), sub.end_y + mm(10)), 'rund',
                  [sub.brand.split()[0][:14].upper(), sub.brand.split()[-1][:14].upper()], (40, 60, 150), rng)
            sub.marks.append('stempel-siegel')
        elif re.search(r'(Kopie für|KOPIE|Kopie)', text) and rng.random() < 0.5:
            stamp(img, W * 0.75, mm(30), 'eckig', ['KOPIE'], (190, 30, 40), rng)
            sub.marks.append('stempel-kopie')
        elif not sub.auth and re.search(r'(Angebot|Abnahme|Übergabe|Vertrag|Quittung|Rechnung|Bescheinigung|Attest|Praxis|Dr\.)', text):
            parts = [sub.brand[:30]]
            m = re.search(r'([A-ZÄÖÜ][\wäöüß\-]+(?:straße|weg|platz|ring|allee|gasse|markt)\s*\d+\w?)', text)
            if m:
                parts.append(m.group(1))
            parts.append('Beispielstadt-Nord')
            stamp(img, W * rng.uniform(0.3, 0.7), min(H - mm(40), sub.end_y + mm(14)), 'eckig', ['', *parts] if False else [parts[0]] + parts[1:], (30, 50, 160), rng, size=0.85)
            sub.marks.append('stempel-firma')
    # Handnotiz
    if doc_kind in ('brief', 'mail', 'portal', 'bon') and rng.random() < 0.45:
        if re.search(r'(zahl|Betrag|Rechnung|EUR|€)', text):
            cat = 'zahl'
        elif re.search(r'(Frist|bis zum|innerhalb|spätestens|Widerspruch|Einspruch)', text):
            cat = 'frist'
        else:
            cat = 'ablage'
        note = rng.choice(NOTES[cat])
        ink = rng.choice([(20, 40, 150), (30, 30, 30), (150, 20, 30), (90, 90, 90)])
        size = int(pt(13) * (0.7 if doc_kind == 'bon' else 1.0))
        space = H - sub.end_y
        if space > mm(30) and doc_kind != 'bon':
            hand_text(img, rng.uniform(W * 0.45, W * 0.6), sub.end_y + rng.uniform(mm(12), min(space - mm(10), mm(28))), note, size, ink, rng, angle=rng.uniform(-8, 8))
        else:
            hand_text(img, W * rng.uniform(0.5, 0.65), rng.uniform(mm(8), mm(14)) if doc_kind != 'bon' else mm(10), note, size, ink, rng, angle=rng.uniform(-10, 10))
        sub.marks.append('handnotiz')
        # Markierung (Kreis/Unterstreichung) um eine Betragszeile
        cand = [lp for lp in sub.linepos if lp[0] == 0 and RE_AMT.search(lp[4]) and re.search(r'(Summe|Gesamt|NACHZAHLUNG|Betrag|zahlen|offen|Erstattung|SUMME)', lp[4])]
        if cand:
            lp = cand[-1]
            d = ImageDraw.Draw(img)
            x0, yb, x1, fs = lp[1], lp[2], lp[3], lp[5]
            if rng.random() < 0.5:
                d.ellipse([x0 - mm(3), yb - fs * 1.1, x1 + mm(3), yb + fs * 0.45], outline=ink, width=3)
                sub.marks.append('kreis')
            else:
                pts = [(x, yb + 6 + math.sin(x / 37.0) * 2) for x in np.linspace(x0, x1, 30)]
                d.line(pts, fill=ink, width=4)
                sub.marks.append('unterstrichen')
    # Textmarker
    if doc_kind in ('brief', 'mail') and rng.random() < 0.15:
        cand = [lp for lp in sub.linepos if lp[0] == 0 and re.search(r'(\d{2}\.\d{2}\.\d{4}|bis zum|Frist)', lp[4])]
        if cand:
            lp = rng.choice(cand)
            arr = np.asarray(img).astype(np.float32)
            y0, y1 = int(lp[2] - lp[5] * 0.9), int(lp[2] + lp[5] * 0.25)
            x0, x1 = int(lp[1]), int(lp[3])
            col = np.array(rng.choice([(255, 245, 90), (150, 240, 120), (255, 170, 200)]), np.float32)
            arr[y0:y1, x0:x1] = arr[y0:y1, x0:x1] * col / 255
            pages[0] = img = Image.fromarray(arr.astype(np.uint8))
            sub.marks.append('textmarker')


# ---------------------------------------------------------------- Bildfehler
def NP(rng):
    return rng if isinstance(rng, np.random.Generator) else np.random.default_rng(rng.randint(0, 2 ** 32 - 1))


def gauss_noise(a, sigma, rng):
    rng = NP(rng)
    return a + rng.normal(0, sigma, a.shape)


def lowfreq(shape, cells, rng):
    h, w = shape[:2]
    rng = NP(rng)
    small = rng.random((max(2, cells), max(2, int(cells * w / h))))
    im = Image.fromarray((small * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(im).astype(np.float32) / 255


def paper_tex(img, rng, amount=0.03):
    a = np.asarray(img).astype(np.float32)
    lf = lowfreq(a.shape, 8, rng)
    hf = NP(rng).normal(0, 1, a.shape[:2])
    m = 1 - amount * lf - 0.012 * hf
    return Image.fromarray(np.clip(a * m[..., None], 0, 255).astype(np.uint8))


def fold(a, y, strength, horizontal=True):
    """Falz/Knick: dunkle Mittellinie mit hellem Rand."""
    h, w = a.shape[:2]
    if horizontal:
        yy = np.arange(h, dtype=np.float32)[:, None]
        dist = yy - y
    else:
        xx = np.arange(w, dtype=np.float32)[None, :]
        dist = xx - y
    shade = 1 - strength * np.exp(-(dist / 3.0) ** 2) - strength * 0.35 * np.exp(-((dist - 9) / 10.0) ** 2) + strength * 0.25 * np.exp(-((dist + 10) / 12.0) ** 2)
    return a * shade[..., None]


def crease(a, rng, strength):
    """schräger Knick quer übers Blatt."""
    h, w = a.shape[:2]
    x0, y0 = rng.uniform(0, w), rng.uniform(0, h)
    ang = rng.uniform(0, math.pi)
    nx, ny = -math.sin(ang), math.cos(ang)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dist = (xx - x0) * nx + (yy - y0) * ny
    shade = 1 - strength * np.exp(-(dist / 2.5) ** 2) + strength * 0.3 * np.exp(-((dist + 7) / 8.0) ** 2)
    jag = np.exp(-(dist / 1.2) ** 2) * (rng.random((h, w)) < 0.4) * strength * 0.8
    return a * (shade - jag)[..., None]


def holes(a, dpi_k):
    h, w = a.shape[:2]
    r = 2.75 * dpi_k
    for cy in (h / 2 - 40 * dpi_k, h / 2 + 40 * dpi_k):
        yy, xx = np.ogrid[0:h, 0:w]
        m = (xx - 12 * dpi_k) ** 2 + (yy - cy) ** 2 <= r * r
        a[m] = a[m] * 0.35 + 70
    return a


def motion_blur(img, length, angle):
    if length < 2:
        return img
    k = int(length)
    a = np.asarray(img).astype(np.float32)
    acc = np.zeros_like(a)
    dx, dy = math.cos(math.radians(angle)), math.sin(math.radians(angle))
    for i in range(k):
        t = i - k / 2
        sx, sy = int(round(t * dx)), int(round(t * dy))
        acc += np.roll(np.roll(a, sx, axis=1), sy, axis=0)
    return Image.fromarray(np.clip(acc / k, 0, 255).astype(np.uint8))


def thermal_fade(img, rng, strength):
    a = np.asarray(img.convert('L')).astype(np.float32)
    h, w = a.shape
    g = np.linspace(0, 1, h)[:, None] * rng.uniform(0.3, 1.0) + lowfreq((h, w), 6, rng) * 0.6
    g = (g - g.min()) / (g.max() - g.min() + 1e-6)
    fade = strength * (0.55 + 0.45 * g)
    ink = 255 - a
    a2 = 255 - ink * (1 - fade)
    rgb = np.stack([a2 * 1.0, a2 * 0.985, a2 * 0.93], -1)
    return Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))


def warp_mesh(img, rng, amp):
    """leichte Wölbung/Welligkeit über ein Gitter."""
    w, h = img.size
    nx, ny = 6, 8
    ph1, ph2 = rng.uniform(0, 6.28), rng.uniform(0, 6.28)
    mesh = []

    def disp(x, y):
        return (x + amp * math.sin(y / h * math.pi * 1.3 + ph1) * (0.5 + x / w),
                y + amp * 0.6 * math.sin(x / w * math.pi * 1.1 + ph2))
    for i in range(nx):
        for j in range(ny):
            x0, x1 = w * i / nx, w * (i + 1) / nx
            y0, y1 = h * j / ny, h * (j + 1) / ny
            box = (int(x0), int(y0), int(x1), int(y1))
            q = disp(x0, y0) + disp(x0, y1) + disp(x1, y1) + disp(x1, y0)
            mesh.append((box, q))
    return img.transform((w, h), Image.MESH, mesh, Image.BICUBIC, fillcolor=(255, 255, 255))


def persp_coeffs(dst, src):
    A, B = [], []
    for (x, y), (X, Y) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -X * x, -X * y])
        A.append([0, 0, 0, x, y, 1, -Y * x, -Y * y])
        B += [X, Y]
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()


def background(W, H, rng):
    kind = rng.choice(['holz', 'holz', 'grau', 'dunkel', 'decke', 'teppich'])
    if kind == 'holz':
        base = np.array(rng.choice([(150, 105, 65), (185, 140, 95), (110, 75, 45), (200, 170, 130)]), np.float32)
        yy = np.arange(H, dtype=np.float32)[:, None]
        xx = np.arange(W, dtype=np.float32)[None, :]
        grain = np.sin(xx / rng.uniform(14, 40) + np.sin(yy / 230.0) * 3 + lowfreq((H, W), 5, rng) * 9) * 0.06
        a = base[None, None, :] * (1 + grain[..., None] + (lowfreq((H, W), 4, rng)[..., None] - 0.5) * 0.15)
    elif kind == 'decke':
        base = np.array(rng.choice([(70, 90, 120), (140, 60, 60), (200, 200, 190)]), np.float32)
        tex = NP(rng).normal(0, 1, (H // 4 + 1, W // 4 + 1))
        tex = np.kron(tex, np.ones((4, 4)))[:H, :W]
        a = base[None, None, :] * (1 + 0.05 * tex[..., None] + (lowfreq((H, W), 6, rng)[..., None] - 0.5) * 0.2)
    elif kind == 'teppich':
        base = np.array((120, 110, 100), np.float32)
        a = base[None, None, :] * (1 + 0.12 * NP(rng).normal(0, 1, (H, W, 1)))
    else:
        v = 190 if kind == 'grau' else 45
        base = np.array((v, v, v + 5), np.float32)
        a = base[None, None, :] * (1 + (lowfreq((H, W), 5, rng)[..., None] - 0.5) * 0.2)
    return np.clip(a, 0, 255), kind


def to_photo(page, q, rng, doc_kind):
    """Handyfoto eines Blatts (oder Foto vom Bildschirm)."""
    fb = []
    pw, ph = page.size
    portrait = ph >= pw * 0.9
    CW, CH = (3024, 4032) if portrait else (4032, 3024)
    if q == 'schlecht':
        CW, CH = int(CW * 0.75), int(CH * 0.75)
    a_bg, bgk = background(CW, CH, rng)
    fb.append('untergrund-' + bgk)
    # Blatt bereiten
    if doc_kind not in ('screen-mail', 'screen-notiz'):
        page = paper_tex(page, rng, 0.04)
        if rng.random() < (0.3 if q == 'gut' else 0.6):
            page = warp_mesh(page, rng, mm(1.2) * (1 if q == 'gut' else 2.2))
            fb.append('woelbung')
        if doc_kind == 'brief' and rng.random() < 0.6:
            a = np.asarray(page).astype(np.float32)
            for yf in (1 / 3, 2 / 3):
                a = fold(a, ph * yf + rng.uniform(-mm(3), mm(3)), 0.10 if q == 'gut' else 0.18)
            page = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
            fb.append('falz')
        if doc_kind == 'bon':
            if rng.random() < 0.7:
                page = thermal_fade(page, rng, {'gut': 0.25, 'mittel': 0.45, 'schlecht': 0.62}[q])
                fb.append('thermo-verblasst')
            if rng.random() < 0.6:
                page = warp_mesh(page, rng, mm(2.5))
                fb.append('bon-gerollt')
    else:
        fb.append('foto-vom-bildschirm')
    # Größe im Bild
    fill = {'gut': rng.uniform(0.82, 0.9), 'mittel': rng.uniform(0.72, 0.86), 'schlecht': rng.uniform(0.62, 0.82)}[q]
    if doc_kind == 'bon':
        fill *= 1.0
    sc = min(CW * fill / pw, CH * fill / ph)
    w2, h2 = pw * sc, ph * sc
    cx, cy = CW / 2 + rng.uniform(-0.05, 0.05) * CW, CH / 2 + rng.uniform(-0.04, 0.04) * CH
    rot = math.radians(rng.uniform(-3, 3) if q == 'gut' else rng.uniform(-8, 8))
    k = {'gut': 0.03, 'mittel': 0.08, 'schlecht': 0.14}[q]
    corners = []
    for sx, sy in [(-1, -1), (1, -1), (1, 1), (-1, 1)]:
        x, y = sx * w2 / 2, sy * h2 / 2
        xr = x * math.cos(rot) - y * math.sin(rot)
        yr = x * math.sin(rot) + y * math.cos(rot)
        corners.append([cx + xr, cy + yr])
    # Perspektive: obere Kante schmaler (Handy schräg gehalten), plus Zufall
    tilt = rng.uniform(0.3, 1.0) * k
    corners[0][0] += w2 * tilt / 2
    corners[1][0] -= w2 * tilt / 2
    corners[0][1] += h2 * tilt * 0.3
    corners[1][1] += h2 * tilt * 0.3
    for c in corners:
        c[0] += rng.uniform(-1, 1) * k * w2 * 0.15
        c[1] += rng.uniform(-1, 1) * k * h2 * 0.1
    fb.append('perspektive')
    src = [(0, 0), (pw, 0), (pw, ph), (0, ph)]
    co = persp_coeffs([tuple(c) for c in corners], src)
    warped = page.transform((CW, CH), Image.PERSPECTIVE, co, Image.BICUBIC, fillcolor=(0, 0, 0))
    mask = Image.new('L', page.size, 255).transform((CW, CH), Image.PERSPECTIVE, co, Image.BILINEAR, fillcolor=0)
    # Schlagschatten des Blatts
    sh = mask.filter(ImageFilter.GaussianBlur(25))
    sha = np.asarray(sh).astype(np.float32) / 255
    sha = np.roll(np.roll(sha, 18, 0), 12, 1)
    a_bg = a_bg * (1 - 0.45 * sha[..., None])
    m = np.asarray(mask).astype(np.float32)[..., None] / 255
    a = a_bg * (1 - m) + np.asarray(warped).astype(np.float32) * m
    # Licht
    yy, xx = np.mgrid[0:CH, 0:CW].astype(np.float32)
    ang = rng.uniform(0, 6.28)
    grad = ((xx / CW - 0.5) * math.cos(ang) + (yy / CH - 0.5) * math.sin(ang))
    lg = {'gut': 0.12, 'mittel': 0.28, 'schlecht': 0.42}[q]
    light = 1 - lg * (grad + 0.5)
    vig = 1 - 0.35 * (((xx / CW - 0.5) ** 2 + (yy / CH - 0.5) ** 2) * 2) * (0.5 if q == 'gut' else 1)
    a = a * (light * vig)[..., None]
    fb.append('licht-verlauf')
    if q != 'gut' or rng.random() < 0.3:
        # Schatten von Hand/Handy
        sh = Image.new('L', (CW, CH), 0)
        sd = ImageDraw.Draw(sh)
        side = rng.choice(['unten', 'rechts', 'oben-links'])
        if side == 'unten':
            sd.ellipse([CW * rng.uniform(0.1, 0.4), CH * rng.uniform(0.72, 0.85), CW * rng.uniform(0.7, 1.1), CH * 1.3], fill=255)
        elif side == 'rechts':
            sd.ellipse([CW * rng.uniform(0.7, 0.85), CH * 0.2, CW * 1.4, CH * 0.9], fill=255)
        else:
            sd.polygon([(0, 0), (CW * 0.55, 0), (CW * 0.25, CH * 0.45), (0, CH * 0.35)], fill=255)
        sh = sh.filter(ImageFilter.GaussianBlur(rng.uniform(60, 140)))
        s = np.asarray(sh).astype(np.float32)[..., None] / 255
        a = a * (1 - s * rng.uniform(0.25, 0.5))
        fb.append('schatten')
    if doc_kind in ('screen-mail', 'screen-notiz') or rng.random() < 0.2:
        # Spiegelung/Glanz
        gx, gy = rng.uniform(0.2, 0.8) * CW, rng.uniform(0.2, 0.7) * CH
        r = rng.uniform(0.15, 0.3) * CW
        gl = np.exp(-(((xx - gx) / r) ** 2 + ((yy - gy) / (r * 0.6)) ** 2))
        a = a + gl[..., None] * rng.uniform(40, 90)
        fb.append('spiegelung')
    if doc_kind in ('screen-mail', 'screen-notiz'):
        mo = np.sin(xx * 0.9 + yy * 0.35) * np.sin(yy * 0.85) * 6
        a = a + (mo * m[..., 0])[..., None]
        fb.append('moire')
    # Farbstich
    wb = np.array(rng.choice([(1.06, 1.0, 0.88), (1.0, 1.0, 1.0), (0.95, 1.0, 1.06), (1.04, 1.02, 0.94)]), np.float32)
    a = a * wb
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    # Unschärfe
    if q == 'gut':
        img = img.filter(ImageFilter.GaussianBlur(rng.uniform(0.3, 0.8)))
        img = img.filter(ImageFilter.UnsharpMask(2, 60, 2))
    elif q == 'mittel':
        img = img.filter(ImageFilter.GaussianBlur(rng.uniform(1.0, 1.8)))
        fb.append('unschaerfe')
    else:
        img = img.filter(ImageFilter.GaussianBlur(rng.uniform(1.4, 2.4)))
        fb.append('unschaerfe')
        if rng.random() < 0.6:
            img = motion_blur(img, rng.uniform(4, 9), rng.uniform(0, 180))
            fb.append('verwackelt')
    a = np.asarray(img).astype(np.float32)
    sig = {'gut': 2.0, 'mittel': 4.5, 'schlecht': 8.0}[q]
    a = gauss_noise(a, sig, np.random.default_rng(rng.randint(0, 10 ** 9)))
    if q == 'schlecht':
        fb.append('rauschen')
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    jq = {'gut': 90, 'mittel': 78, 'schlecht': 55}[q]
    if q == 'schlecht':
        fb.append('jpeg-artefakte')
    return img, jq, fb


def to_scan(pages, q, rng, doc_kind, small_paper):
    """Seiten -> gescannte Seitenbilder. Rückgabe (Liste Bilder, dpi, Fehlerbilder)."""
    fb = []
    out = []
    mode = rng.random()
    scanner = 'flachbett' if (small_paper or rng.random() < 0.45) else 'einzug'
    copy = (q == 'schlecht' and rng.random() < 0.5) or (q == 'mittel' and rng.random() < 0.2)
    color = rng.random() < (0.5 if q == 'gut' else 0.3) and not copy
    dpi = {'gut': rng.choice([200, 300]), 'mittel': 150, 'schlecht': rng.choice([100, 120, 150])}[q]
    fb.append(scanner)
    if copy:
        fb.append('kopie-der-kopie')
    bilevel = q == 'schlecht' and not copy and rng.random() < 0.35
    did_holes = rng.random() < 0.25 and not small_paper
    for pi, page in enumerate(pages):
        if small_paper:
            # Kleines Papier auf Scanner-Glas (A4)
            bed = Image.new('RGB', (mm(210), mm(297)), (250, 250, 248))
            pw, ph = page.size
            if ph > bed.height - mm(10):
                s = (bed.height - mm(10)) / ph
                page = page.resize((int(pw * s), int(ph * s)), Image.LANCZOS)
                pw, ph = page.size
            if doc_kind == 'bon' and rng.random() < 0.75:
                page = thermal_fade(page, rng, {'gut': 0.2, 'mittel': 0.42, 'schlecht': 0.6}[q])
                fb.append('thermo-verblasst')
            ang = rng.uniform(-6, 6)
            page = page.convert('RGBA').rotate(ang, resample=Image.BICUBIC, expand=True)
            x = int(rng.uniform(mm(5), max(mm(6), bed.width - page.width - mm(5))))
            y = int(rng.uniform(mm(5), max(mm(6), bed.height - page.height - mm(5))))
            # Schatten des Papierrandes
            shadow = Image.new('L', bed.size, 0)
            shadow.paste(page.split()[3], (x + 5, y + 5))
            shadow = shadow.filter(ImageFilter.GaussianBlur(6))
            ba = np.asarray(bed).astype(np.float32) * (1 - 0.25 * np.asarray(shadow).astype(np.float32)[..., None] / 255)
            bed = Image.fromarray(ba.astype(np.uint8))
            bed.paste(page, (x, y), page)
            page = bed
            fb.append('klein-auf-glas')
        page = paper_tex(page, rng, 0.02)
        a = np.asarray(page).astype(np.float32)
        h, w = a.shape[:2]
        if doc_kind in ('brief', 'mail', 'portal') and rng.random() < (0.35 if q == 'gut' else 0.7):
            for yf in (1 / 3, 2 / 3):
                a = fold(a, h * yf + rng.uniform(-mm(2), mm(2)), {'gut': 0.06, 'mittel': 0.14, 'schlecht': 0.22}[q])
            fb.append('falz')
        if q != 'gut' and rng.random() < 0.4:
            a = crease(a, np.random.default_rng(rng.randint(0, 10 ** 9)), 0.12 if q == 'mittel' else 0.25)
            fb.append('knick')
        if did_holes:
            a = holes(a, K)
            fb.append('lochung')
        page = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
        # Lage
        if scanner == 'einzug':
            ang = rng.uniform(-0.8, 0.8) if q == 'gut' else rng.uniform(-3.2, 3.2)
            bgc = (25, 25, 25) if rng.random() < 0.5 else (235, 235, 235)
            dx, dy = rng.uniform(-mm(3), mm(3)), rng.uniform(-mm(2), mm(6))
            page = page.rotate(ang, resample=Image.BICUBIC, translate=(dx, dy), fillcolor=bgc)
            if abs(ang) > 1:
                fb.append('schiefer-einzug')
        else:
            ang = rng.uniform(-0.5, 0.5) if q == 'gut' else rng.uniform(-2, 2)
            page = page.rotate(ang, resample=Image.BICUBIC, fillcolor=(245, 245, 245))
            # Deckelschatten am Rand
            a = np.asarray(page).astype(np.float32)
            edge = rng.choice(['links', 'oben'])
            n = mm(4)
            prof = np.linspace(0.55, 1, n)
            if edge == 'links':
                a[:, :n] *= prof[None, :, None]
            else:
                a[:n] *= prof[:, None, None]
            page = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
            fb.append('flachbett-schatten')
        if copy:
            g = page.convert('L')
            for _ in range(2):
                g = g.filter(ImageFilter.GaussianBlur(0.9))
                a = np.asarray(g).astype(np.float32)
                a = np.clip((a - 60) * 1.45, 0, 255)
                g = Image.fromarray(a.astype(np.uint8))
            a = np.asarray(g).astype(np.float32)
            gen = np.random.default_rng(rng.randint(0, 10 ** 9))
            spk = gen.random(a.shape) < 0.0025
            a[spk] = gen.uniform(0, 90, spk.sum())
            # Tonerstreifen
            for _ in range(rng.randint(1, 3)):
                x = rng.randint(0, a.shape[1] - 5)
                a[:, x:x + rng.randint(2, 6)] *= rng.uniform(0.55, 0.85)
            # schwarzer Kopierrand
            b = mm(rng.uniform(1, 5))
            a[:, :int(b)] *= 0.15
            a[:int(b * 0.6)] *= 0.25
            a = a * (1 - 0.15 * lowfreq(a.shape, 4, gen))
            page = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert('RGB')
            fb.append('tonerstreifen')
        # Auflösung
        s = dpi / DPI
        page = page.resize((max(1, int(page.width * s)), max(1, int(page.height * s))), Image.LANCZOS if s < 1 else Image.BICUBIC)
        a = np.asarray(page).astype(np.float32)
        a = gauss_noise(a, {'gut': 1.5, 'mittel': 3.5, 'schlecht': 6.0}[q], np.random.default_rng(rng.randint(0, 10 ** 9)))
        page = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
        if q != 'gut':
            page = page.filter(ImageFilter.GaussianBlur(0.5 if q == 'mittel' else 0.8))
        if bilevel:
            page = page.convert('L').point(lambda v: 255 if v > 150 else 0).convert('1')
        elif not color:
            page = page.convert('L')
        out.append(page)
    if q == 'schlecht' and not copy:
        fb.append('niedrige-aufloesung' if dpi <= 120 else 'unschaerfe')
    if bilevel:
        fb.append('schwarzweiss-schwelle')
    fb.append('%d-dpi' % dpi)
    return out, dpi, sorted(set(fb), key=fb.index), color


# ---------------------------------------------------------------- Ablauf
def hsh(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def assign(names):
    order = sorted(names, key=lambda n: hsh(n + '|form'))
    npdf = round(len(names) * 0.55)
    form = {n: ('pdf-scan' if i < npdf else 'foto') for i, n in enumerate(order)}
    qual = {}
    for fm in ('pdf-scan', 'foto'):
        grp = sorted([n for n in names if form[n] == fm], key=lambda n: hsh(n + '|q'))
        for i, n in enumerate(grp):
            qual[n] = ['gut', 'mittel', 'schlecht'][i * 3 // len(grp)]
    return form, qual


def process(args):
    path, outdir, form, q = args
    name = os.path.basename(path)
    text = open(path, encoding='utf-8').read()
    seed = int(hsh(name + '|seed')[:12], 16)
    rng = random.Random(seed)
    kind = classify(name, text)
    doc = Doc(name, text, kind, rng)
    single = form == 'foto'
    if kind == 'mail':
        pages, sub = render_mail(doc, single)
    elif kind == 'portal':
        pages, sub = render_mail(doc, single, portal=True)
    elif kind == 'screen-mail':
        pages, sub = render_screen(doc)
    elif kind == 'screen-notiz':
        pages, sub = render_screen(doc, notiz=True)
    elif kind == 'bon':
        pages, sub = render_bon(doc)
    elif kind == 'zettel':
        pages, sub = render_zettel(doc)
    elif kind == 'aushang':
        pages, sub = render_aushang(doc)
    elif kind == 'flyer':
        pages, sub = render_aushang(doc, flyer=True)
    elif kind == 'karte':
        pages, sub = render_aushang(doc, karte=True)
    else:
        pages, sub = fit_letter(doc, single)
    add_extras(pages, sub, kind, q, rng)
    stem = os.path.splitext(name)[0]
    fehler = list(dict.fromkeys(sub.marks))
    if form == 'foto':
        page = pages[0]
        if len(pages) > 1:  # Seiten nebeneinander auf dem Tisch
            W = sum(p.width for p in pages) + mm(10) * (len(pages) - 1)
            big = Image.new('RGB', (W, max(p.height for p in pages)), (255, 255, 255))
            x = 0
            for p in pages:
                big.paste(p, (x, 0))
                x += p.width + mm(10)
            page = big
            fehler.append('mehrere-seiten-nebeneinander')
        if kind in ('screen-mail', 'screen-notiz') and q == 'gut':
            img = page.convert('RGB')
            jq, fb = 88, ['screenshot-jpeg']
        else:
            img, jq, fb = to_photo(page, q, rng, kind)
        out = os.path.join(outdir, stem + '.jpg')
        img.save(out, 'JPEG', quality=jq, subsampling=2 if jq < 85 else 0)
        fehler += fb
    else:
        small = kind in ('bon', 'zettel', 'karte') or (pages[0].width < mm(180))
        if kind in ('screen-mail', 'screen-notiz'):
            # Screenshot ausgedruckt auf A4
            shot = pages[0]
            a4 = Image.new('RGB', (mm(210), mm(297)), (255, 255, 255))
            s = min((mm(210) - mm(30)) / shot.width, (mm(297) - mm(30)) / shot.height)
            sh2 = shot.resize((int(shot.width * s), int(shot.height * s)), Image.LANCZOS)
            a4.paste(sh2, ((a4.width - sh2.width) // 2, mm(15)))
            pages = [a4]
            small = False
            fehler.append('screenshot-ausgedruckt')
        imgs, dpi, fb, color = to_scan(pages, q, rng, kind, small)
        out = os.path.join(outdir, stem + '.pdf')
        conv = []
        for im in imgs:
            if im.mode == '1':
                conv.append(im)
            else:
                buf = io.BytesIO()
                im.save(buf, 'JPEG', quality={'gut': 88, 'mittel': 72, 'schlecht': 50}[q])
                buf.seek(0)
                conv.append(Image.open(buf))
        conv[0].save(out, 'PDF', save_all=True, append_images=conv[1:], resolution=float(dpi))
        fehler += fb
        if len(imgs) > 1:
            fehler.append('%d-seiten' % len(imgs))
    rec = {'datei': os.path.basename(out), 'form': form, 'qualitaet': q,
           'codes': list(dict.fromkeys(sub.codes)), 'fehlerbilder': list(dict.fromkeys(fehler)), 'gestalt': kind}
    return name, rec


def main():
    src, outdir = sys.argv[1], sys.argv[2]
    filt = sys.argv[3:]
    os.makedirs(outdir, exist_ok=True)
    names = sorted(n for n in os.listdir(src) if n.endswith('.txt') and os.path.isfile(os.path.join(src, n)))
    form, qual = assign(names)
    todo = [n for n in names if not filt or any(f in n for f in filt)]
    jobs = [(os.path.join(src, n), outdir, form[n], qual[n]) for n in todo]
    from multiprocessing import Pool
    res = {}
    with Pool(4) as p:
        for name, rec in p.imap_unordered(process, jobs):
            res[name] = rec
            print(name, '->', rec['datei'], rec['form'], rec['qualitaet'], rec['gestalt'], rec['codes'], flush=True)
    if not filt:
        with open(os.path.join(outdir, 'SETZEN.json'), 'w', encoding='utf-8') as fh:
            json.dump({k: res[k] for k in sorted(res)}, fh, ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
