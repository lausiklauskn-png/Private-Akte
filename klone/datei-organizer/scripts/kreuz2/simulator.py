#!/usr/bin/env python3
"""Eigener Scan- und Foto-Simulator: Text -> Seitenbild -> verschlechtert wie echte Geraete.

Aufruf:  python3 simulator.py <stapel-ordner> <ausgabe-ordner>
Alles ist fest ueber den Dateinamen ausgewuerfelt (md5), Laeufe sind wiederholbar.
"""
import sys, os, re, json, math, hashlib, random, io, glob
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps, ImageEnhance, ImageChops

DPI = 200
A4 = (int(8.27 * DPI), int(11.69 * DPI))  # 1654 x 2338
MM = DPI / 25.4

# ---------------------------------------------------------------- Schriften
FD = "/usr/share/fonts"
def _f(*names):
    for n in names:
        hits = glob.glob(os.path.join(FD, "**", n), recursive=True)
        if hits:
            return hits[0]
    raise FileNotFoundError(names)

FAMILIES = {
    "liberation-sans": dict(r=_f("LiberationSans-Regular.ttf"), b=_f("LiberationSans-Bold.ttf"), i=_f("LiberationSans-Italic.ttf"), bi=_f("LiberationSans-BoldItalic.ttf")),
    "liberation-serif": dict(r=_f("LiberationSerif-Regular.ttf"), b=_f("LiberationSerif-Bold.ttf"), i=_f("LiberationSerif-Italic.ttf"), bi=_f("LiberationSerif-BoldItalic.ttf")),
    "dejavu-sans": dict(r=_f("DejaVuSans.ttf"), b=_f("DejaVuSans-Bold.ttf"), i=_f("DejaVuSans.ttf"), bi=_f("DejaVuSans-Bold.ttf")),
    "dejavu-serif": dict(r=_f("DejaVuSerif.ttf"), b=_f("DejaVuSerif-Bold.ttf"), i=_f("DejaVuSerif.ttf"), bi=_f("DejaVuSerif-Bold.ttf")),
    "free-sans": dict(r=_f("FreeSans.ttf"), b=_f("FreeSansBold.ttf"), i=_f("FreeSansOblique.ttf"), bi=_f("FreeSansBoldOblique.ttf")),
    "free-serif": dict(r=_f("FreeSerif.ttf"), b=_f("FreeSerifBold.ttf"), i=_f("FreeSerifItalic.ttf"), bi=_f("FreeSerifBoldItalic.ttf")),
    "caladea": dict(r=_f("Caladea-Regular.ttf"), b=_f("Caladea-Bold.ttf"), i=_f("Caladea-Italic.ttf"), bi=_f("Caladea-BoldItalic.ttf")),
    "carlito": dict(r=_f("Carlito-Regular.ttf"), b=_f("Carlito-Bold.ttf"), i=_f("Carlito-Italic.ttf"), bi=_f("Carlito-BoldItalic.ttf")),
    "inter": dict(r=_f("Inter-Regular.otf"), b=_f("Inter-SemiBold.otf"), i=_f("Inter-Italic.otf"), bi=_f("Inter-BoldItalic.otf")),
    "loma": dict(r=_f("Loma.otf"), b=_f("Loma-Bold.otf"), i=_f("Loma-Oblique.otf"), bi=_f("Loma-BoldOblique.otf")),
}
BODY_FAMILIES = ["liberation-sans", "liberation-serif", "dejavu-sans", "free-sans", "free-serif", "caladea", "carlito", "inter", "dejavu-serif"]
MARK_FONTS = [_f("InterDisplay-Black.otf"), _f("InterDisplay-ExtraBold.otf"), _f("InterDisplay-Light.otf"), _f("LiberationSerif-BoldItalic.ttf"),
              _f("FreeSerifBold.ttf"), _f("Caladea-BoldItalic.ttf"), _f("Loma-Bold.otf"), _f("FreeSansBoldOblique.ttf"), _f("Carlito-Bold.ttf")]
MONO = [_f("DejaVuSansMono.ttf"), _f("LiberationMono-Regular.ttf"), _f("FreeMono.ttf"), _f("JetBrainsMono-Regular.ttf")]
MONO_B = {MONO[0]: _f("DejaVuSansMono-Bold.ttf"), MONO[1]: _f("LiberationMono-Bold.ttf"), MONO[2]: _f("FreeMonoBold.ttf"), MONO[3]: _f("JetBrainsMono-Bold.ttf")}
HAND = [_f("FreeSerifItalic.ttf"), _f("LiberationSerif-Italic.ttf"), _f("Caladea-Italic.ttf"), _f("FreeSansOblique.ttf")]

_fc = {}
def font(path, size):
    k = (path, int(size))
    if k not in _fc:
        _fc[k] = ImageFont.truetype(path, int(size))
    return _fc[k]

def tw(fnt, s):
    return fnt.getlength(s)

# ---------------------------------------------------------------- Text zerlegen
PLZ = re.compile(r"(^|\s)\d{5}\s+\S")
SEP = re.compile(r"^\s*[-=_]{8,}\s*$")
KV = re.compile(r"^(Datum|Unser Zeichen|Ihr Zeichen|Ihre Nachricht|Kundennummer|Kunden-Nr\.?|Rechnungsnummer|Rechnungs-Nr\.?|Aktenzeichen|Vertragsnummer|Versicherungsnummer|Steuernummer|Mitgliedsnummer|Zeichen|Az\.?|Bearbeiter|Telefon|Durchwahl|Vorgang|Belegnummer|Datum der Rechnung|Leistungszeitraum|Kontoinhaber|Erstellt am)\s*:?\s+\S", re.I)

def is_table_row(line):
    s = line.strip()
    parts = re.split(r"\s{2,}", s)
    return len(parts) >= 2 and len(s) < 110 and not s.endswith(".")

def blocks_of(lines):
    out, cur = [], []
    for ln in lines:
        if ln.strip() == "":
            if cur:
                out.append(cur); cur = []
        else:
            cur.append(ln.rstrip())
    if cur:
        out.append(cur)
    return out

def is_receipt(lines):
    t = "\n".join(lines)
    return bool(re.search(r"^\s*-{20,44}\s*$", t, re.M)) and bool(re.search(r"SUMME|Kasse\s*\d|Bon\s*\d", t))

def looks_address(block):
    return 2 <= len(block) <= 5 and PLZ.search(block[-1]) is not None and len(block[-1]) < 60

def looks_footer(block):
    t = " ".join(block)
    hits = sum(k in t for k in ["IBAN", "USt", "Telefon", "Bankverbindung", "BIC", "Amtsgericht", "HRB", "Steuer-Nr", "Geschäftsführ", " | ", "www.", "Sitz"])
    return hits >= 1 and len(block) <= 4 and all(len(l) < 140 for l in block)

# ---------------------------------------------------------------- Bausteine fuer den Seitenkopf
def bildmarke(rng, size, color):
    """Bildmarke ohne Buchstaben: geometrische Formen."""
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    kind = rng.choice(["ringe", "quadrate", "welle", "blatt", "dreieck", "punkte"])
    c2 = tuple(min(255, int(c * 0.6 + 100)) for c in color[:3])
    if kind == "ringe":
        for k in range(3):
            r = size * (0.48 - k * 0.14)
            d.ellipse([size / 2 - r, size / 2 - r, size / 2 + r, size / 2 + r], outline=color if k % 2 == 0 else c2, width=max(3, size // 14))
    elif kind == "quadrate":
        s = size * 0.42
        d.rectangle([0, 0, s, s], fill=color); d.rectangle([size - s, 0, size, s], fill=c2)
        d.rectangle([0, size - s, s, size], fill=c2); d.rectangle([size - s, size - s, size, size], fill=color)
    elif kind == "welle":
        for k in range(3):
            pts = [(x, size * (0.3 + 0.2 * k) + math.sin(x / size * 2 * math.pi) * size * 0.08) for x in range(0, size, 4)]
            d.line(pts, fill=color if k != 1 else c2, width=max(4, size // 10))
    elif kind == "blatt":
        d.ellipse([size * 0.1, size * 0.25, size * 0.9, size * 0.75], fill=color)
        d.line([(size * 0.1, size * 0.5), (size * 0.9, size * 0.5)], fill=(255, 255, 255, 255), width=max(2, size // 25))
    elif kind == "dreieck":
        d.polygon([(size / 2, size * 0.05), (size * 0.95, size * 0.92), (size * 0.05, size * 0.92)], fill=color)
        d.polygon([(size / 2, size * 0.4), (size * 0.72, size * 0.82), (size * 0.28, size * 0.82)], fill=c2)
    else:
        for i in range(3):
            for j in range(3):
                if (i + j) % 2 == 0 or rng.random() < 0.4:
                    r = size * 0.12
                    cx, cy = size * (0.2 + 0.3 * i), size * (0.2 + 0.3 * j)
                    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color if (i * j) % 2 == 0 else c2)
    return im

PALETTE = [(18, 62, 120), (150, 20, 30), (20, 110, 60), (60, 60, 60), (200, 90, 0), (90, 40, 120), (0, 120, 140), (30, 30, 30)]

# ---------------------------------------------------------------- Seite setzen
class Page:
    def __init__(self, size, paper):
        self.im = Image.new("RGB", size, paper)
        self.d = ImageDraw.Draw(self.im)

class Setzer:
    def __init__(self, rng, lines):
        self.rng = rng
        self.lines = lines
        fam = FAMILIES[rng.choice(BODY_FAMILIES)]
        self.fam = fam
        self.size = rng.choice([27, 28, 29, 30, 31, 33])          # ~10-12 pt bei 200 dpi
        self.f = font(fam["r"], self.size)
        self.fb = font(fam["b"], self.size)
        self.fsmall = font(fam["r"], int(self.size * 0.72))
        self.fsmallb = font(fam["b"], int(self.size * 0.72))
        self.lead = int(self.size * rng.uniform(1.28, 1.5))
        self.ml = int(rng.uniform(20, 25) * MM)
        self.mr = int(rng.uniform(15, 22) * MM)
        self.color = rng.choice(PALETTE)
        self.ink = rng.choice([(0, 0, 0), (25, 25, 25), (35, 35, 45)])
        self.paper = rng.choice([(255, 255, 255), (252, 252, 248), (250, 249, 244)])
        self.style = rng.choice(["balken-oben", "balken-links", "linie", "schlicht", "kopf-rechts"])
        self.pages = []
        self.notes = []
        self.new_page(first=True)

    # --- Seitenverwaltung
    def new_page(self, first=False):
        p = Page(A4, self.paper)
        self.pages.append(p)
        self.p = p
        self.y = int(rng_u(self.rng, 15, 22) * MM)
        self.bottom = A4[1] - int(30 * MM)
        if self.style == "balken-oben":
            h = int(self.rng.uniform(4, 9) * MM)
            p.d.rectangle([0, 0, A4[0], h], fill=self.color)
            self.y = max(self.y, h + int(8 * MM))
        elif self.style == "balken-links":
            p.d.rectangle([0, 0, int(7 * MM), A4[1]], fill=self.color)
            if self.ml < int(26 * MM):
                self.ml = int(26 * MM)
        if not first:
            self.y = int(20 * MM)

    def need(self, h):
        if self.y + h > self.bottom:
            self.new_page()

    @property
    def W(self):
        return A4[0] - self.ml - self.mr

    def text(self, x, y, s, fnt, fill=None):
        self.p.d.text((x, y), s, font=fnt, fill=fill or self.ink)

    def wrap(self, s, fnt, width):
        words, out, cur = s.split(" "), [], ""
        for w in words:
            t = (cur + " " + w).strip() if cur else w
            if tw(fnt, t) <= width or not cur:
                cur = t
            else:
                out.append(cur); cur = w
        if cur:
            out.append(cur)
        return out

    def para(self, s, fnt=None, x=None, width=None, align="left"):
        fnt = fnt or self.f
        x = self.ml if x is None else x
        width = width or self.W
        lead = int(fnt.size * self.lead / self.size)
        for ln in self.wrap(s.strip(), fnt, width):
            self.need(lead)
            xx = x
            if align == "right":
                xx = x + width - tw(fnt, ln)
            elif align == "center":
                xx = x + (width - tw(fnt, ln)) / 2
            self.text(xx, self.y, ln, fnt)
            self.y += lead

    # --- Bausteine
    def briefkopf(self, block):
        """Absenderblock oben: erste Zeile als Wortmarke, Rest klein."""
        rng = self.rng
        name, rest = block[0].strip(), [b.strip() for b in block[1:]]
        mf = rng.choice(MARK_FONTS)
        ms = int(self.size * rng.uniform(1.5, 2.3))
        mfont = font(mf, ms)
        while tw(mfont, name) > self.W * 0.75 and ms > self.size:
            ms -= 2; mfont = font(mf, ms)
        mark = rng.random() < 0.75
        msz = int(ms * rng.uniform(1.4, 2.2))
        layout = "rechts" if self.style == "kopf-rechts" else rng.choice(["links", "links", "zentriert", "rechts"])
        upper = rng.random() < 0.3
        shown = name.upper() if upper and len(name) < 40 else name
        wlen = tw(mfont, shown) + (msz + 20 if mark else 0)
        if layout == "links":
            x0 = self.ml
        elif layout == "zentriert":
            x0 = (A4[0] - wlen) / 2
        else:
            x0 = A4[0] - self.mr - wlen
        y0 = self.y
        if mark:
            bm = bildmarke(rng, msz, self.color + (255,))
            self.p.im.paste(bm, (int(x0), int(y0 - (msz - ms) / 2)), bm)
            x0 += msz + 20
        col = self.color if rng.random() < 0.7 else self.ink
        self.text(x0, y0, shown, mfont, fill=col)
        self.y = y0 + max(ms, msz) + 10
        if rng.random() < 0.5:
            self.p.d.line([(self.ml, self.y), (A4[0] - self.mr, self.y)], fill=self.color, width=rng.choice([2, 3, 5]))
            self.y += 12
        for r in rest:
            if layout == "links":
                self.text(self.ml, self.y, r, self.fsmall)
            elif layout == "zentriert":
                self.text((A4[0] - tw(self.fsmall, r)) / 2, self.y, r, self.fsmall)
            else:
                self.text(A4[0] - self.mr - tw(self.fsmall, r), self.y, r, self.fsmall)
            self.y += int(self.fsmall.size * 1.3)
        self.y += int(8 * MM)

    def absenderzeile(self, line):
        f = font(self.fam["r"], int(self.size * 0.6))
        self.need(f.size * 2)
        self.text(self.ml, self.y, line.strip(), f)
        self.p.d.line([(self.ml, self.y + f.size + 4), (self.ml + tw(f, line.strip()), self.y + f.size + 4)], fill=self.ink, width=1)
        self.y += int(f.size * 1.8)

    def anschrift(self, block):
        if self.rng.random() < 0.25:
            # Fensterkuvert-Markierung (Ecken), wie bei Druckvorlagen
            x0, y0 = self.ml - 10, self.y - 10
            w, h = int(85 * MM), int((len(block) + 1) * self.lead)
            for (cx, cy, dx, dy) in [(x0, y0, 1, 1), (x0 + w, y0, -1, 1), (x0, y0 + h, 1, -1), (x0 + w, y0 + h, -1, -1)]:
                self.p.d.line([(cx, cy), (cx + dx * 25, cy)], fill=(120, 120, 120), width=2)
                self.p.d.line([(cx, cy), (cx, cy + dy * 25)], fill=(120, 120, 120), width=2)
        for ln in block:
            self.need(self.lead)
            self.text(self.ml, self.y, ln.strip(), self.f)
            self.y += self.lead
        self.y += int(self.rng.uniform(8, 16) * MM)

    def bezugszeile(self, kvs):
        """Bezugszeichenzeile: kleine Ueberschrift, Wert darunter, nebeneinander."""
        rng = self.rng
        items = []
        for ln in kvs:
            m = re.match(r"^\s*([^:]+?)\s*:\s*(.+)$", ln)
            if m:
                items.append((m.group(1), m.group(2)))
            else:
                parts = ln.strip().split(None, 1) if not re.match(r"^(Erstellt am)", ln.strip()) else ["Erstellt am", ln.strip()[11:].strip()]
                items.append((parts[0], parts[1] if len(parts) > 1 else ""))
        fl = font(self.fam["r"], int(self.size * 0.62))
        colw = self.W / max(1, len(items))
        if len(items) > 4 or any(tw(self.f, v) > colw - 10 for _, v in items) or rng.random() < 0.3:
            # untereinander, Spalten ausgerichtet
            lw = max(tw(self.f, k + ":") for k, _ in items) + 30
            for k, v in items:
                self.need(self.lead)
                self.text(self.ml, self.y, k + ":", self.f)
                self.text(self.ml + lw, self.y, v, self.f)
                self.y += self.lead
        else:
            self.need(fl.size + self.lead + 10)
            for i, (k, v) in enumerate(items):
                x = self.ml + i * colw
                self.text(x, self.y, k, fl, fill=(90, 90, 90))
                self.text(x, self.y + fl.size + 6, v, self.f)
            self.y += fl.size + 6 + self.lead
            if rng.random() < 0.5:
                self.p.d.line([(self.ml, self.y), (A4[0] - self.mr, self.y)], fill=(160, 160, 160), width=1)
        self.y += int(6 * MM)

    def betreff(self, line):
        f = self.fb if self.rng.random() < 0.85 else font(self.fam["b"], int(self.size * 1.15))
        self.para(line, f)
        self.y += int(self.lead * 0.6)

    def tabelle(self, rows):
        rng = self.rng
        cells = [re.split(r"\s{2,}", r.strip()) for r in rows]
        n = max(len(c) for c in cells)
        f = self.f if rng.random() < 0.5 else font(self.fam["r"], int(self.size * 0.9))
        lead = int(f.size * 1.55)
        widths = [0] * n
        for c in cells:
            c2 = c + [""] * (n - len(c)) if len(c) < n else c
            # kuerzere Zeilen: letzte Zelle in die letzte Spalte
            for i, s in enumerate(c2):
                widths[i] = max(widths[i], tw(f, s))
        total = sum(widths) + 40 * (n - 1)
        scale_ok = total <= self.W
        grid = rng.choice(["linien", "zebra", "rahmen", "ohne"])
        x0 = self.ml
        xs = [x0]
        if scale_ok:
            extra = (self.W - total) / max(1, n - 1) if n > 1 and rng.random() < 0.6 else 0
            for w in widths[:-1]:
                xs.append(xs[-1] + w + 40 + extra)
        else:
            for i in range(1, n):
                xs.append(x0 + self.W * i / n)
        right_edge = (xs[-1] + widths[-1]) if scale_ok else A4[0] - self.mr
        for ri, c in enumerate(cells):
            self.need(lead)
            if len(c) < n:
                c = c[:-1] + [""] * (n - len(c)) + c[-1:]
            if grid == "zebra" and ri % 2 == 1:
                self.p.d.rectangle([x0 - 8, self.y - 4, right_edge + 8, self.y + lead - 6], fill=tuple(int(240 + (v - 240) * 0.08) for v in self.color))
            for i, s in enumerate(c):
                num = re.fullmatch(r"[-+]?[\d.\s]*\d,\d{2}(\s?(EUR|€|%))?|[-+]?\d+(,\d+)?\s?(EUR|€|%|l|kg|kWh|m³)?", s.strip()) is not None
                if i == n - 1 and i > 0 and num:
                    xx = (xs[i] + widths[i] - tw(f, s)) if scale_ok else right_edge - tw(f, s)
                else:
                    xx = xs[i]
                self.text(xx, self.y, s, f)
            if grid == "linien":
                self.p.d.line([(x0 - 8, self.y + lead - 6), (right_edge + 8, self.y + lead - 6)], fill=(170, 170, 170), width=1)
            self.y += lead
        if grid == "rahmen":
            self.p.d.rectangle([x0 - 10, self.y - lead * len(rows) - 8, right_edge + 10, self.y - 2], outline=(110, 110, 110), width=2)
        self.y += int(lead * 0.5)

    def trenner(self):
        self.need(20)
        self.p.d.line([(self.ml, self.y + 8), (A4[0] - self.mr, self.y + 8)], fill=(100, 100, 100), width=2)
        self.y += 24

    def unterschrift_krakel(self):
        """Unterschrift als Kritzel ohne lesbare Buchstaben."""
        rng = self.rng
        self.need(int(16 * MM))
        x, y = self.ml + rng.randint(0, 40), self.y + int(8 * MM)
        pts = []
        for t in range(60):
            pts.append((x + t * rng.uniform(3, 6), y + math.sin(t * rng.uniform(0.5, 1.2)) * rng.uniform(10, 30) - t * 0.3))
        self.p.d.line(pts, fill=rng.choice([(20, 30, 120), (10, 10, 10)]), width=3, joint="curve")
        self.y += int(15 * MM)

    def fusszeile(self, block):
        """Fusszeile unten auf der letzten Seite, klein, evtl. in Spalten."""
        rng = self.rng
        f = font(self.fam["r"], int(self.size * rng.uniform(0.55, 0.68)))
        lead = int(f.size * 1.35)
        segs_mode = rng.random() < 0.5 and all((" | " in b or " · " in b) for b in block)
        if segs_mode:
            segs = []
            for b in block:
                segs += [s.strip() for s in re.split(r"\s[|·]\s", b)]
            ncol = min(4, max(2, math.ceil(len(segs) / 2)))
            per = math.ceil(len(segs) / ncol)
            h = per * lead + 30
        else:
            h = len(block) * lead + 30
            lines = []
            for b in block:
                lines += self.wrap(b.strip(), f, self.W)
            h = len(lines) * lead + 30
        y0 = A4[1] - int(12 * MM) - h
        if self.y > y0 - 10:
            self.new_page(); y0 = A4[1] - int(12 * MM) - h
        self.p.d.line([(self.ml, y0), (A4[0] - self.mr, y0)], fill=self.color if rng.random() < 0.6 else (150, 150, 150), width=2)
        y = y0 + 14
        if segs_mode:
            cw = self.W / ncol
            for i, s in enumerate(segs):
                c, r = divmod(i, per)
                self.text(self.ml + c * cw, y + r * lead, s, f, fill=(70, 70, 70))
        else:
            for ln in lines:
                xx = self.ml if rng.random() < 0.5 else self.ml + (self.W - tw(f, ln)) / 2
                self.text(xx, y, ln, f, fill=(70, 70, 70))
                y += lead

    # --- Hauptlauf
    def setze(self):
        rng = self.rng
        bl = blocks_of(self.lines)
        if not bl:
            return self.pages
        footer = None
        # Fusszeile: letzter Block nach Trenner oder mit Firmenangaben
        if len(bl) >= 2:
            last = bl[-1]
            if SEP.match(last[0]) and len(last) > 1:
                footer = last[1:]; bl = bl[:-1]
            elif looks_footer(last) and not looks_address(last):
                footer = last; bl = bl[:-1]
        i = 0
        # Kopf
        addr_idx = [k for k, b in enumerate(bl[:4]) if looks_address(b)]
        if len(bl) > 1 and len(addr_idx) >= 2 and addr_idx[0] == 0:
            self.briefkopf(bl[0]); i = 1
        elif len(bl) > 1 and len(bl[0]) in (2, 3) and looks_address(bl[0]) is False and len(addr_idx) >= 1 and addr_idx[0] == 1:
            self.briefkopf(bl[0]); i = 1
        elif len(bl) > 1 and len(bl[0]) == 1 and len(addr_idx) >= 1 and addr_idx[0] == 1 and PLZ.search(bl[0][0]):
            if rng.random() < 0.5:
                self.absenderzeile(bl[0][0])
            else:
                self.briefkopf([re.split(r"\s[·,|]\s", bl[0][0])[0]] + [" · ".join(re.split(r"\s[·,|]\s", bl[0][0])[1:])])
            i = 1
        elif len(bl) > 1 and len(bl[0]) >= 2 and not looks_address(bl[0]) and not any(SEP.match(x) for x in bl[0]) and len(bl[0][0]) < 60 and not KV.match(bl[0][0]):
            self.briefkopf(bl[0]); i = 1
        else:
            # Empfaenger steht zuerst: Bildmarke ohne Text oder nur Farbbalken
            if rng.random() < 0.5:
                msz = int(rng.uniform(14, 24) * MM)
                bm = bildmarke(rng, msz, self.color + (255,))
                self.p.im.paste(bm, (A4[0] - self.mr - msz, int(self.y)), bm)
        first_text_seen = False
        while i < len(bl):
            b = bl[i]
            if looks_address(b) and not first_text_seen:
                self.anschrift(b); i += 1; continue
            # Block zeilenweise
            j = 0
            while j < len(b):
                ln = b[j]
                s = ln.strip()
                if SEP.match(ln):
                    self.trenner(); j += 1; continue
                if KV.match(s) and not first_text_seen:
                    kvs = [s]
                    j += 1
                    while j < len(b) and KV.match(b[j].strip()):
                        kvs.append(b[j].strip()); j += 1
                    self.bezugszeile(kvs); continue
                if is_table_row(ln):
                    rows = [ln]; j += 1
                    while j < len(b) and is_table_row(b[j]) and not SEP.match(b[j]):
                        rows.append(b[j]); j += 1
                    if len(rows) >= 2 or len(re.split(r"\s{2,}", s)) >= 3:
                        self.tabelle(rows)
                    else:
                        # Einzelzeile mit Luecke: z.B. eingerueckte Datumszeile
                        lead_sp = len(ln) - len(ln.lstrip())
                        self.para(re.sub(r"\s{2,}", "   ", s), align="right" if lead_sp > 15 else "left")
                    continue
                lead_sp = len(ln) - len(ln.lstrip())
                if lead_sp >= 15 and len(s) < 50:
                    self.para(s, align="right"); j += 1; continue
                if not first_text_seen and len(b) == 1 and len(s) < 90 and not s.startswith("Sehr geehrt") and not s.startswith("Hallo") and not s.startswith("Liebe") and not re.match(r"^\d", s) and i + 1 < len(bl):
                    self.betreff(s); j += 1; continue
                if s.startswith("Sehr geehrt") or s.startswith("Hallo") or s.startswith("Liebe"):
                    first_text_seen = True
                # Unterschrift vor kurzem Namen nach Grussformel
                if i > 0 and len(b) == 1 and len(s) < 35 and re.match(r"^([A-ZÄÖÜ]\.|Dr\.|[A-ZÄÖÜ][a-zäöüß]+\s[A-ZÄÖÜ])", s) and re.search(r"Gr(ü|u)(ß|ss)|Gruß", " ".join(bl[i - 1])) and rng.random() < 0.7:
                    self.unterschrift_krakel()
                if len(s) < 60 and j + 1 < len(b) and len(b) <= 6:
                    self.para(s)
                else:
                    self.para(s)
                j += 1
            self.y += int(self.lead * 0.55)
            i += 1
        if footer:
            self.fusszeile(footer)
        return self.pages

def rng_u(rng, a, b):
    return rng.uniform(a, b)

# ---------------------------------------------------------------- Kassenbon (Thermopapier)
def setze_bon(rng, lines):
    mono = rng.choice(MONO)
    size = rng.choice([24, 26, 28])
    f = font(mono, size)
    fb = font(MONO_B[mono], size)
    cw = tw(f, "M")
    width_chars = 40
    out = []
    for ln in lines:
        if len(ln) <= width_chars:
            out.append(ln.rstrip())
        else:
            words, cur = ln.split(" "), ""
            for w in words:
                if len(cur) + len(w) + 1 > width_chars and cur:
                    out.append(cur); cur = w
                else:
                    cur = (cur + " " + w) if cur else w
            out.append(cur)
    W = int(cw * width_chars + 2 * 8 * MM)
    lead = int(size * 1.3)
    H = int(len(out) * lead + 60 * MM)
    paper = (248, 246, 240)
    im = Image.new("RGB", (W, H), paper)
    d = ImageDraw.Draw(im)
    y = int(18 * MM)
    if rng.random() < 0.6:
        msz = int(18 * MM)
        bm = bildmarke(rng, msz, (30, 30, 30, 255))
        im.paste(bm, ((W - msz) // 2, int(5 * MM)), bm)
        y = int(5 * MM) + msz + 20
    x0 = int(8 * MM)
    first = True
    for ln in out:
        fnt = fb if (first and ln.strip()) or "SUMME" in ln else f
        if ln.strip() and first and rng.random() < 0.5:
            # Kopfzeilen zentrieren
            d.text(((W - tw(fnt, ln.strip())) / 2, y), ln.strip(), font=fnt, fill=(20, 20, 20))
        else:
            d.text((x0, y), ln, font=fnt, fill=(20, 20, 20))
        if re.match(r"^\s*-{10,}", ln):
            first = False
        y += lead
    # Barcode-artiges Muster unten (ohne Zeichen)
    y += 20
    xb = x0
    while xb < W - x0:
        w = rng.choice([2, 3, 4, 6])
        if rng.random() < 0.55:
            d.rectangle([xb, y, xb + w, y + int(10 * MM)], fill=(20, 20, 20))
        xb += w + rng.choice([2, 3])
    return [im]

# ---------------------------------------------------------------- Fehlerbilder (Geraete)
def to_np(im):
    return np.asarray(im).astype(np.float32)

def from_np(a, mode="RGB"):
    a = np.clip(a, 0, 255).astype(np.uint8)
    return Image.fromarray(a, mode)

def noise(a, rng, sigma):
    g = np.random.default_rng(rng.randint(0, 2**31)).normal(0, sigma, a.shape[:2])
    if a.ndim == 3:
        g = g[..., None]
    return a + g

def paper_texture(im, rng, strength):
    w, h = im.size
    gen = np.random.default_rng(rng.randint(0, 2**31))
    small = gen.normal(0, 1, (h // 40 + 2, w // 40 + 2)).astype(np.float32)
    s = Image.fromarray(((small - small.min()) / (np.ptp(small) + 1e-6) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    t = (np.asarray(s).astype(np.float32) / 255 - 0.5) * strength
    a = to_np(im)
    return from_np(a + t[..., None] * (a / 255.0 + 0.2))

def knicke(im, rng, n):
    """Faltkanten: Schatten-/Lichtkante, leichte Verschiebung, Faserabrieb."""
    w, h = im.size
    a = to_np(im)
    ys = []
    for k in range(n):
        if n >= 2 and k < 2:
            y = int(h * (k + 1) / 3 + rng.uniform(-30, 30))
        else:
            y = int(h * rng.uniform(0.2, 0.8))
        ys.append(y)
        slope = rng.uniform(-0.015, 0.015)
        yy = np.arange(h)[:, None] - (y + slope * np.arange(w)[None, :])
        shade = -28 * np.exp(-(yy / 6) ** 2) + 14 * np.exp(-((yy - 9) / 9) ** 2)
        a = a + shade[..., None]
        # Abrieb: helle Punkte entlang der Kante
        gen = np.random.default_rng(rng.randint(0, 2**31))
        mask = (np.abs(yy) < 2.5) & (gen.random((h, w)) < 0.25)
        a[mask] = a[mask] * 0.5 + 255 * 0.5
    if rng.random() < 0.3:
        x = int(w * rng.uniform(0.45, 0.55))
        xx = np.arange(w)[None, :] - x
        a = a + (-22 * np.exp(-(xx / 5) ** 2) + 10 * np.exp(-((xx - 7) / 8) ** 2))[..., None]
    return from_np(a)

def stempel(im, rng, quality):
    """Eingangsstempel: Farbe, schraeg, ungleichmaessige Farbabgabe."""
    w, h = im.size
    col = rng.choice([(200, 30, 40), (30, 50, 170), (110, 30, 140), (20, 110, 60)])
    S = int(rng.uniform(45, 65) * MM)
    st = Image.new("L", (S, int(S * 0.55)), 0)
    d = ImageDraw.Draw(st)
    f1 = font(_f("DejaVuSans-Bold.ttf"), int(S * 0.11))
    f2 = font(_f("DejaVuSansMono-Bold.ttf"), int(S * 0.13))
    monate = ["JAN", "FEB", "MRZ", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"]
    txt1 = rng.choice(["EINGEGANGEN", "EINGANG", "ERHALTEN", "BEARBEITET", "GEPRÜFT"])
    txt2 = "%02d. %s 2026" % (rng.randint(1, 28), rng.choice(monate))
    if rng.random() < 0.5:
        d.rectangle([4, 4, S - 5, st.size[1] - 5], outline=255, width=6)
    else:
        d.rounded_rectangle([4, 4, S - 5, st.size[1] - 5], radius=25, outline=255, width=5)
    d.text(((S - tw(f1, txt1)) / 2, st.size[1] * 0.15), txt1, font=f1, fill=255)
    d.text(((S - tw(f2, txt2)) / 2, st.size[1] * 0.5), txt2, font=f2, fill=255)
    st = st.rotate(rng.uniform(-18, 18), expand=True, resample=Image.BICUBIC)
    gen = np.random.default_rng(rng.randint(0, 2**31))
    m = np.asarray(st).astype(np.float32) / 255
    # Farbabgabe: grob fleckig + Kornrauschen
    blot = gen.random((m.shape[0] // 25 + 2, m.shape[1] // 25 + 2))
    blot = np.asarray(Image.fromarray((blot * 255).astype(np.uint8)).resize((m.shape[1], m.shape[0]), Image.BICUBIC)).astype(np.float32) / 255
    m = m * (0.45 + 0.55 * blot) * (gen.random(m.shape) > 0.12) * rng.uniform(0.6, 0.85)
    x = int(rng.uniform(0.45, 0.85) * w - m.shape[1] / 2)
    y = int(rng.uniform(0.05, 0.55) * h)
    x, y = max(0, min(w - m.shape[1], x)), max(0, min(h - m.shape[0], y))
    a = to_np(im)
    reg = a[y:y + m.shape[0], x:x + m.shape[1]]
    mm = m[: reg.shape[0], : reg.shape[1], None]
    tint = np.array(col, np.float32)[None, None, :]
    a[y:y + reg.shape[0], x:x + reg.shape[1]] = reg * (1 - mm) + (reg * tint / 255) * mm
    return from_np(a)

NOTIZEN = ["erl.", "bezahlt", "Ablage", "wichtig!", "Kopie Steuer", "nachfragen", "überwiesen", "ok", "Ordner 3", "zurückrufen", "abgeheftet", "prüfen", "?"]

def handschrift(im, rng, n):
    """Handschriftliche Notizen: Kugelschreiber, zittrige Grundlinie, Haken, Kringel."""
    w, h = im.size
    layer = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(layer)
    col = rng.choice([(20, 40, 160), (15, 15, 15), (30, 30, 110), (160, 20, 20)])
    for _ in range(n):
        kind = rng.choice(["wort", "wort", "haken", "kringel", "strich"])
        x, y = int(rng.uniform(0.05, 0.75) * w), int(rng.uniform(0.05, 0.9) * h)
        if kind == "wort":
            s = rng.choice(NOTIZEN)
            fp = rng.choice(HAND)
            sz = int(rng.uniform(34, 52))
            cx = x
            for ch in s:
                g = Image.new("L", (sz * 2, sz * 2), 0)
                ImageDraw.Draw(g).text((sz // 2, sz // 3), ch, font=font(fp, sz), fill=255)
                g = g.rotate(rng.uniform(-12, 8), resample=Image.BICUBIC)
                g = g.filter(ImageFilter.MaxFilter(3)) if rng.random() < 0.6 else g
                yy = y + int(math.sin(cx / 40.0) * 4 + rng.uniform(-3, 3))
                layer.paste(255, (cx - sz // 2, yy - sz // 3), g)
                cx += int(tw(font(fp, sz), ch) * rng.uniform(0.85, 1.05))
            if rng.random() < 0.4:
                d.line([(x, y + sz), (cx, y + sz + rng.randint(-6, 6))], fill=255, width=3)
        elif kind == "haken":
            s = rng.uniform(30, 60)
            d.line([(x, y), (x + s * 0.35, y + s * 0.4), (x + s, y - s * 0.5)], fill=255, width=4, joint="curve")
        elif kind == "kringel":
            rx, ry = rng.uniform(80, 260), rng.uniform(30, 60)
            pts = [(x + rx * math.cos(t) + rng.uniform(-3, 3), y + ry * math.sin(t) + rng.uniform(-3, 3)) for t in np.linspace(0, 2 * math.pi * 1.08, 80)]
            d.line(pts, fill=255, width=3, joint="curve")
        else:
            L = rng.uniform(150, 450)
            d.line([(x, y), (x + L, y + rng.uniform(-10, 10))], fill=255, width=3)
    m = np.asarray(layer.filter(ImageFilter.GaussianBlur(0.7))).astype(np.float32)[..., None] / 255 * rng.uniform(0.75, 0.95)
    a = to_np(im)
    tint = np.array(col, np.float32)[None, None, :]
    a = a * (1 - m) + np.minimum(a, tint) * m
    return from_np(a)

def lochung(im, rng):
    w, h = im.size
    d = ImageDraw.Draw(im)
    x = int(rng.uniform(8, 12) * MM)
    for yy in (h / 2 - 40 * MM, h / 2 + 40 * MM):
        r = 3 * MM
        d.ellipse([x - r, yy - r, x + r, yy + r], fill=(60, 60, 60))
    return im

def kaffeefleck(im, rng):
    w, h = im.size
    a = to_np(im)
    cx, cy, r = rng.uniform(0.2, 0.8) * w, rng.uniform(0.2, 0.9) * h, rng.uniform(60, 140)
    Y, X = np.ogrid[:h, :w]
    dist = np.sqrt((X - cx) ** 2 + (Y - cy) ** 2)
    ring = np.exp(-((dist - r) / 6) ** 2) * 0.35 + (dist < r) * 0.08
    a = a * (1 - ring[..., None] * np.array([0.25, 0.45, 0.7])[None, None, :])
    return from_np(a)

def durchscheinen(im, rng, back):
    """Rueckseite scheint gespiegelt durch (duennes Papier)."""
    b = ImageOps.mirror(back.resize(im.size)).convert("L").filter(ImageFilter.GaussianBlur(2.5))
    m = (255 - np.asarray(b).astype(np.float32)) / 255 * rng.uniform(0.06, 0.12)
    a = to_np(im)
    return from_np(a * (1 - m[..., None] * 0.6))

def flachbett(im, rng, q):
    w, h = im.size
    canvas = Image.new("RGB", (w + 60, h + 60), (rng.randint(30, 70),) * 3 if rng.random() < 0.5 else (235, 235, 235))
    ang = rng.uniform(-0.6, 0.6) * (1 + q)
    pg = im.rotate(ang, resample=Image.BICUBIC, expand=False, fillcolor=(245, 245, 245))
    canvas.paste(pg, (30 + rng.randint(-15, 15), 30 + rng.randint(-15, 15)))
    a = to_np(canvas)
    # Deckelschatten an einer Kante, ungleichmaessige Lampe
    X = np.linspace(0, 1, a.shape[1])[None, :]
    a = a * (1 - 0.06 * q * X)[..., None]
    a = a.astype(np.float32)
    out = from_np(a).crop((30, 30, 30 + w, 30 + h))
    out = out.filter(ImageFilter.GaussianBlur(0.4 + 0.5 * q))
    return out

def einzug(im, rng, q):
    """Dokumenteneinzug: Schraeglage, Streifen durch Schmutz auf dem Glas, Walzenschlupf."""
    w, h = im.size
    ang = rng.uniform(-1.2, 1.2) * (1 + q)
    im = im.rotate(ang, resample=Image.BICUBIC, fillcolor=(20, 20, 20) if rng.random() < 0.5 else (255, 255, 255))
    a = to_np(im)
    gen = np.random.default_rng(rng.randint(0, 2**31))
    for _ in range(rng.randint(1, 3 + int(3 * q))):
        x = gen.integers(0, w)
        wd = gen.integers(1, 4)
        dark = gen.random() < 0.7
        a[:, x:x + wd] = a[:, x:x + wd] * (0.55 if dark else 1.0) + (0 if dark else 60)
    # Walzenschlupf: einzelne Zeilenbaender gedehnt
    rows = np.arange(h).astype(np.float32)
    for _ in range(rng.randint(0, 2 + int(2 * q))):
        y0 = gen.integers(0, h - 200); L = gen.integers(40, 160)
        rows[y0:y0 + L] = y0 + (rows[y0:y0 + L] - y0) * (1 - 0.06 * q)
        rows[y0 + L:] -= 0.06 * q * L
    rows = np.clip(rows, 0, h - 1).astype(int)
    a = a[rows]
    return from_np(a).filter(ImageFilter.GaussianBlur(0.5 + 0.4 * q))

def fax(im, rng, q):
    """Fax: Standardaufloesung (halbe Hoehe), Schwellwert/Rauschen, Kopfzeile, verlorene Zeilen."""
    w, h = im.size
    g = im.convert("L")
    if q > 0.3:
        g = g.resize((w, h // 2), Image.BILINEAR).resize((w, h), Image.NEAREST)
    g = g.resize((int(w * 0.85), int(h * 0.85)), Image.BILINEAR).resize((w, h), Image.NEAREST)
    a = to_np(g)
    a = noise(a, rng, 18 + 25 * q)
    thr = rng.uniform(150, 175) - 20 * q
    b = np.where(a < thr, 0, 255).astype(np.float32)
    gen = np.random.default_rng(rng.randint(0, 2**31))
    b[gen.random(b.shape) < 0.002 * (1 + 2 * q)] = 0
    # verlorene Zeilen
    for _ in range(int(3 * q)):
        y = gen.integers(0, h); b[y:y + gen.integers(1, 3)] = 255
    img = Image.fromarray(b.astype(np.uint8), "L")
    d = ImageDraw.Draw(img)
    ff = font(_f("DejaVuSansMono.ttf"), 22)
    d.text((40, 12), "%02d.%02d.2026 %02d:%02d   FAX   S. 01" % (rng.randint(1, 28), rng.randint(1, 12), rng.randint(7, 18), rng.randint(0, 59)), font=ff, fill=0)
    return img.convert("RGB")

def kopie_der_kopie(im, rng, q):
    """Mehrfach kopiert: hoher Kontrast, graue Raender, Tonerpunkte, verwaschen."""
    w, h = im.size
    out = im.convert("L")
    gens = 2 + int(2 * q)
    gen = np.random.default_rng(rng.randint(0, 2**31))
    for k in range(gens):
        out = out.rotate(rng.uniform(-0.6, 0.6), resample=Image.BICUBIC, fillcolor=40)
        out = out.filter(ImageFilter.GaussianBlur(0.45))
        a = to_np(out)
        a = (a - 128) * 1.25 + 135
        a[gen.random(a.shape) < 0.0015] = 30
        out = from_np(a, "L")
    a = to_np(out)
    # dunkle Kopierraender
    m = int(rng.uniform(4, 14) * MM * q + 5)
    a[:, :m] *= 0.35; a[:, w - m:] *= 0.45
    a[:int(m * 0.6)] *= 0.4
    return from_np(a, "L").convert("RGB")

def thermo(im, rng, q):
    """Thermopapier: verblasst ungleichmaessig, gelblich, Kontrast weg."""
    w, h = im.size
    a = to_np(im)
    Y = np.linspace(0, 1, h)[:, None]
    X = np.linspace(0, 1, w)[None, :]
    fade = 0.25 + 0.45 * q * (0.6 * Y + 0.4 * np.sin(X * 3 + rng.uniform(0, 6)) ** 2)
    a = 255 - (255 - a) * (1 - np.clip(fade, 0, 0.8))[..., None]
    a = a * np.array([1.0, 0.985, 0.93])[None, None, :]
    return from_np(a).filter(ImageFilter.GaussianBlur(0.4 + 0.4 * q))

def handyfoto(im, rng, q, recto_bon=False):
    """Handyfoto: Unterlage, Perspektive, Woelbung, Licht, Schatten, Unschaerfe, Farbstich, JPEG."""
    pw, ph = im.size
    # Wellung des Papiers (Spalten verschoben)
    a = to_np(im)
    amp = rng.uniform(2, 6) + 10 * q
    xs = np.arange(pw)
    off = (np.sin(xs / pw * math.pi * rng.uniform(0.8, 1.6) + rng.uniform(0, 3)) * amp).astype(int)
    rows = np.clip(np.arange(ph)[:, None] + off[None, :], 0, ph - 1)
    a = a[rows, xs[None, :]]
    im = from_np(a)
    W, H = (2000, 2700) if not recto_bon else (1600, 2600)
    bgc = rng.choice([(120, 85, 55), (180, 170, 150), (70, 70, 75), (200, 195, 185), (95, 110, 90), (150, 120, 90)])
    gen = np.random.default_rng(rng.randint(0, 2**31))
    bg = np.ones((H, W, 3), np.float32) * np.array(bgc, np.float32)
    grain = gen.normal(0, 1, (H // 8 + 1, W // 2 + 1)).astype(np.float32)
    grain = np.asarray(Image.fromarray(((grain - grain.min()) / np.ptp(grain) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)).astype(np.float32)
    bg += (grain[..., None] - 128) * 0.25
    bgim = from_np(bg)
    # Zielviereck
    scale = min(W / pw, H / ph) * rng.uniform(0.78, 0.92)
    tw_, th_ = pw * scale, ph * scale
    cx, cy = W / 2 + rng.uniform(-60, 60), H / 2 + rng.uniform(-60, 60)
    j = 40 + 160 * q
    quad = [(cx - tw_ / 2 + rng.uniform(-j, j), cy - th_ / 2 + rng.uniform(-j, j)),
            (cx + tw_ / 2 + rng.uniform(-j, j), cy - th_ / 2 + rng.uniform(-j, j)),
            (cx + tw_ / 2 + rng.uniform(-j, j), cy + th_ / 2 + rng.uniform(-j, j)),
            (cx - tw_ / 2 + rng.uniform(-j, j), cy + th_ / 2 + rng.uniform(-j, j))]
    # Perspektive: Quelle (Papier) -> Ziel (Viereck). PIL braucht Abbildung Ziel->Quelle.
    src = [(0, 0), (pw, 0), (pw, ph), (0, ph)]
    coeffs = _persp(quad, src)
    warped = im.transform((W, H), Image.PERSPECTIVE, coeffs, Image.BICUBIC, fillcolor=(0, 0, 0))
    mask = Image.new("L", im.size, 255).transform((W, H), Image.PERSPECTIVE, coeffs, Image.BILINEAR, fillcolor=0)
    # Schlagschatten des Papiers
    sh = mask.filter(ImageFilter.GaussianBlur(18))
    sha = np.asarray(sh).astype(np.float32)[..., None] / 255
    sha = np.roll(sha, (12, 10), (0, 1))
    b = to_np(bgim) * (1 - 0.35 * sha)
    m = np.asarray(mask).astype(np.float32)[..., None] / 255
    a = b * (1 - m) + to_np(warped) * m
    # Licht: Verlauf, Vignette, Schatten von Hand/Handy, Glanzpunkt
    Y, X = np.mgrid[0:H, 0:W].astype(np.float32)
    ang = rng.uniform(0, 2 * math.pi)
    grad = 1 - (0.12 + 0.25 * q) * (0.5 + 0.5 * ((X / W - 0.5) * math.cos(ang) + (Y / H - 0.5) * math.sin(ang)) * 2)
    vig = 1 - (0.15 + 0.15 * q) * (((X / W - 0.5) ** 2 + (Y / H - 0.5) ** 2) * 2)
    a = a * (grad * vig)[..., None]
    fe = []
    if rng.random() < 0.35 + 0.5 * q:
        sx, sy = rng.uniform(0.1, 0.9) * W, rng.choice([rng.uniform(0.7, 1.1) * H, rng.uniform(-0.1, 0.3) * H])
        r = rng.uniform(400, 800)
        s = np.exp(-(((X - sx) ** 2 + (Y - sy) ** 2) / (2 * r * r)))
        a = a * (1 - (0.25 + 0.2 * q) * s)[..., None]
        fe.append("schatten")
    if rng.random() < 0.3 + 0.3 * q:
        gx, gy, r = rng.uniform(0.25, 0.75) * W, rng.uniform(0.2, 0.8) * H, rng.uniform(80, 220)
        g = np.exp(-(((X - gx) ** 2 + (Y - gy) ** 2) / (2 * r * r)))
        a = a + (60 + 70 * q) * g[..., None]
        fe.append("glanzlicht")
    # Farbstich (Weissabgleich)
    wb = rng.choice([np.array([1.06, 1.0, 0.88]), np.array([0.92, 0.98, 1.06]), np.array([1.0, 1.0, 1.0]), np.array([1.04, 1.02, 0.94])])
    a = a * wb[None, None, :]
    out = from_np(a)
    # Unschaerfe: Fokus + Verwacklung
    blur = 0.5 + 0.7 * q * rng.uniform(0.7, 1.0)
    out = out.filter(ImageFilter.GaussianBlur(blur))
    if rng.random() < 0.3 + 0.4 * q:
        k = int(2 + 2 * q)
        ang = rng.uniform(0, 180)
        ker = np.zeros((k * 2 + 1, k * 2 + 1), np.float32)
        for t in np.linspace(-k, k, 4 * k + 1):
            ker[int(round(k + t * math.sin(math.radians(ang)))), int(round(k + t * math.cos(math.radians(ang))))] = 1
        ker /= ker.sum()
        if ker.shape[0] <= 5:
            out = out.filter(ImageFilter.Kernel(ker.shape, ker.flatten().tolist(), 1))
        else:
            out = _conv(out, ker)
        fe.append("verwackelt")
    a = noise(to_np(out), rng, 3 + 6 * q)
    out = from_np(a)
    # Handy-Nachschaerfen (Halos)
    out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=int(60 + 60 * rng.random()), threshold=2))
    return out, fe

def _conv(im, ker):
    a = to_np(im)
    k = ker.shape[0] // 2
    out = np.zeros_like(a)
    pad = np.pad(a, ((k, k), (k, k), (0, 0)), mode="edge")
    for dy in range(ker.shape[0]):
        for dx in range(ker.shape[1]):
            wgt = ker[dy, dx]
            if wgt:
                out += wgt * pad[dy:dy + a.shape[0], dx:dx + a.shape[1]]
    return from_np(out)

def _persp(dst, src):
    """Koeffizienten fuer PIL: bildet Zielpunkte (dst) auf Quellpunkte (src) ab."""
    A, B = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()

def jpeg_roundtrip(im, q):
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=int(q))
    buf.seek(0)
    return Image.open(buf).convert("RGB")

# ---------------------------------------------------------------- Ablauf je Datei
QSTUFE = {"gut": 0.0, "mittel": 0.5, "schlecht": 1.0}

def verschlechtere_scan(pages, rng, qual, bon):
    q = QSTUFE[qual]
    fe = []
    if bon:
        geraet = "thermopapier+" + rng.choice(["flachbett", "einzug"])
    else:
        opts = ["flachbett", "einzug", "fax", "kopie-der-kopie"] if qual != "gut" else ["flachbett", "einzug", "flachbett"]
        geraet = rng.choice(opts)
    fe.append(geraet)
    knick_n = 0
    if not bon and rng.random() < 0.3 + 0.4 * q:
        knick_n = rng.choice([1, 2, 2])
        fe.append("knicke")
    st = (not bon) and rng.random() < 0.15 + 0.35 * q
    hw = rng.random() < 0.15 + 0.35 * q
    lo = (not bon) and rng.random() < 0.2
    kf = rng.random() < 0.1 * q
    ds = (not bon) and rng.random() < 0.25 * q and len(pages) >= 1
    if st: fe.append("stempel")
    if hw: fe.append("handschrift")
    if lo: fe.append("lochung")
    if kf: fe.append("kaffeefleck")
    if ds: fe.append("durchscheinen")
    out = []
    for k, p in enumerate(pages):
        im = p.copy()
        im = paper_texture(im, rng, 10 + 20 * q)
        if bon:
            im = thermo(im, rng, q)
            # Bon liegt auf dem Scannerglas (A4-Hintergrund)
            bg = Image.new("RGB", A4, (250, 250, 250) if rng.random() < 0.5 else (40, 40, 40))
            imr = im.rotate(rng.uniform(-4, 4), expand=True, resample=Image.BICUBIC, fillcolor=bg.getpixel((0, 0)))
            if imr.size[1] > A4[1] - 40:
                s = (A4[1] - 40) / imr.size[1]
                imr = imr.resize((int(imr.size[0] * s), int(imr.size[1] * s)), Image.LANCZOS)
            bg.paste(imr, (rng.randint(40, max(41, A4[0] - imr.size[0] - 40)), 20))
            im = bg
        if ds and k == 0:
            im = durchscheinen(im, rng, pages[-1] if len(pages) > 1 else pages[0].rotate(180))
        if knick_n:
            im = knicke(im, rng, knick_n)
        if kf and k == 0:
            im = kaffeefleck(im, rng)
        if st and k == 0:
            im = stempel(im, rng, q)
        if hw and k == 0:
            im = handschrift(im, rng, rng.randint(1, 3))
        if lo:
            im = lochung(im, rng)
        g = geraet.split("+")[-1]
        if g == "flachbett":
            im = flachbett(im, rng, q)
        elif g == "einzug":
            im = einzug(im, rng, q)
        elif g == "fax":
            im = fax(im, rng, q)
        elif g == "kopie-der-kopie":
            im = kopie_der_kopie(im, rng, q)
        a = noise(to_np(im), rng, 2 + 5 * q)
        if q >= 1.0 and g in ("flachbett", "einzug"):
            # schwache Lampe / falsche Helligkeit: Kontrast weg, grauer Grund
            a = 255 - (255 - a) * rng.uniform(0.55, 0.7) - rng.uniform(15, 35)
            if "kontrastarm" not in fe: fe.append("kontrastarm")
        im = from_np(a)
        if q >= 1.0 and g in ("flachbett", "einzug"):
            im = im.filter(ImageFilter.GaussianBlur(0.6))
        # Scanner-Aufloesung je Guete; schlecht = 150 dpi
        if q >= 1.0 or (q >= 0.5 and rng.random() < 0.5):
            s = 0.75 if q >= 1.0 else 0.85
            im = im.resize((int(A4[0] * s), int(A4[1] * s)), Image.LANCZOS)
        grau = g in ("fax", "kopie-der-kopie") or rng.random() < 0.4
        if grau:
            im = im.convert("L")
            if "graustufen" not in fe: fe.append("graustufen")
        im = jpeg_roundtrip(im, 88 - 30 * q)
        out.append(im.convert("L") if grau else im)
    return out, fe

def verschlechtere_foto(page, rng, qual, bon):
    q = QSTUFE[qual]
    fe = ["handyfoto", "perspektive", "papierwoelbung"]
    im = paper_texture(page.copy(), rng, 8 + 15 * q)
    if bon:
        im = thermo(im, rng, q); fe.append("thermopapier")
    else:
        if rng.random() < 0.3 + 0.4 * q:
            im = knicke(im, rng, rng.choice([1, 2])); fe.append("knicke")
        if rng.random() < 0.15 + 0.3 * q:
            im = stempel(im, rng, q); fe.append("stempel")
        if rng.random() < 0.1 * q:
            im = kaffeefleck(im, rng); fe.append("kaffeefleck")
    if rng.random() < 0.15 + 0.35 * q:
        im = handschrift(im, rng, rng.randint(1, 3)); fe.append("handschrift")
    out, fe2 = handyfoto(im, rng, q, recto_bon=bon)
    fe += fe2 + ["licht-verlauf", "farbstich", "unschaerfe"]
    out = jpeg_roundtrip(out, 90 - 25 * q)
    if q >= 1.0:
        out = out.resize((int(out.size[0] * 0.9), int(out.size[1] * 0.9)), Image.LANCZOS)
    return out, fe

def zuteilung(names):
    """Fest ueber den Dateinamen: Rang nach md5 -> 60 % PDF, 40 % Foto; Guete je Drittel."""
    h = lambda s, salt: hashlib.md5((salt + s).encode("utf-8")).hexdigest()
    order = sorted(names, key=lambda n: h(n, "form:"))
    n_pdf = round(len(names) * 0.6)
    form = {n: ("pdf-scan" if i < n_pdf else "foto") for i, n in enumerate(order)}
    qual = {}
    for fm in ("pdf-scan", "foto"):
        grp = sorted([n for n in names if form[n] == fm], key=lambda n: h(n, "guete:"))
        for i, n in enumerate(grp):
            qual[n] = ["gut", "mittel", "schlecht"][i * 3 // len(grp)]
    return form, qual

def verarbeite(path, outdir, form, qual):
    name = os.path.basename(path)
    rng = random.Random(hashlib.md5(name.encode("utf-8")).hexdigest())
    np.random.seed(int(hashlib.md5(name.encode("utf-8")).hexdigest()[:8], 16))
    with open(path, encoding="utf-8") as fh:
        lines = fh.read().replace("\t", "    ").split("\n")
    while lines and not lines[-1].strip():
        lines.pop()
    bon = is_receipt(lines)
    if bon:
        pages = setze_bon(rng, lines)
    else:
        pages = [p.im for p in Setzer(rng, lines).setze()]
    stem = os.path.splitext(name)[0]
    if form == "pdf-scan":
        imgs, fe = verschlechtere_scan(pages, rng, qual, bon)
        datei = stem + ".pdf"
        dpi = DPI * (imgs[0].size[0] / A4[0])
        imgs[0].save(os.path.join(outdir, datei), "PDF", save_all=True, append_images=imgs[1:], resolution=dpi)
    else:
        img, fe = verschlechtere_foto(pages[0], rng, qual, bon)
        datei = stem + ".jpg"
        img.save(os.path.join(outdir, datei), "JPEG", quality=int(88 - 20 * QSTUFE[qual]))
    if bon and "kassenbon" not in fe:
        fe.insert(0, "kassenbon")
    if len(pages) > 1:
        fe.append("mehrseitig-%d" % len(pages) + ("" if form == "pdf-scan" else "-nur-seite-1"))
    return name, {"datei": datei, "form": form, "qualitaet": qual, "fehlerbilder": fe}

def main():
    src, outdir = sys.argv[1], sys.argv[2]
    only = sys.argv[3:]  # optional: einzelne Dateinamen
    os.makedirs(outdir, exist_ok=True)
    names = sorted(f for f in os.listdir(src) if f.endswith(".txt") and os.path.isfile(os.path.join(src, f)))
    form, qual = zuteilung(names)
    todo = [n for n in names if not only or n in only]
    from multiprocessing import Pool
    with Pool(4) as pool:
        res = pool.starmap(verarbeite, [(os.path.join(src, n), outdir, form[n], qual[n]) for n in todo])
    meta_path = os.path.join(outdir, "SETZEN.json")
    meta = {}
    if only and os.path.exists(meta_path):
        meta = json.load(open(meta_path, encoding="utf-8"))
    meta.update(dict(res))
    meta = dict(sorted(meta.items()))
    with open(meta_path, "w", encoding="utf-8") as fh:
        json.dump(meta, fh, ensure_ascii=False, indent=1)

if __name__ == "__main__":
    main()
