"""Setzt erfundene Schriftstücke wie echte Post: Briefkopf mit Logo und Absenderzeile, Anschriftfeld, Infoblock rechts,
zwei- und dreispaltige Seiten, Tabellen (Rechnungsposten, Kontoauszug, Gehalt), fett und dünn, verschiedene Schriftgrößen,
Fußzeilen mit Bankverbindung, Stempel und Unterschrift, mehrseitig mit „Seite n von m“ (Block 0 der Trainings-Sitzung 14.11.2026).

Ausgabeformen:  pdf-text  = PDF mit Textebene (Satz wie aus einem Programm, Spalten und Tabellen wie gedruckt)
                pdf-scan  = PDF nur mit Seitenbildern (keine Textebene → vor dem Einordnen muss die Texterkennung laufen)
                foto      = JPEG, Blatt mit dem Handy auf dem Tisch fotografiert
                bildschirm= PNG, Bildschirmfoto (Mail- oder Portalansicht auf dem Handy)
Scanqualität:   gut | mittel | schlecht (Schräglage, Rauschen, Unschärfe, Flecken, Knick, Schatten, abgeschnittener Rand,
                niedrige Auflösung) – nur für pdf-scan und foto.

Leichte Auszeichnung im Text (alles optional; ohne sie greift die Erkennung von Briefkopf, Anschrift, Infoblock, Tabelle, Fuß):
  # Zeile        groß und fett            ## Zeile   fett
  |a|b|c|        Tabellenzeile (erste Zeile fett)    Zeilen mit zwei und mehr Leerzeichen zwischen Spalten → Tabelle
  @spalten 2|3 … @ende   Fließtext in Spalten       @seite   Seitenumbruch
  @fuss Text · Text · Text   Fußzeile in Spalten    @stempel TEXT   schräger Stempel    @unterschrift   Unterschrift

Aufrufe:
  python3 scripts/setzen-komplex.py auftrag.json
      auftrag.json = [{"ziel": pfad, "zeilen": [...] | "text": "...", "form": ..., "qualitaet": ..., "saat": "…"}]
  python3 scripts/setzen-komplex.py --stapel <stapel mit .txt> <ziel> [--formen pdf-scan:0.6,foto:0.25,pdf-text:0.15]
                                    [--guete gut:0.35,mittel:0.4,schlecht:0.25]
      → <ziel>/<pfad>.pdf|.jpg|.png, <ziel>/SETZEN.json (Form, Güte, Seiten je Stück)
Alles erfunden; die Saat kommt aus dem Pfad, gleicher Pfad = gleiche Machart."""
import hashlib, io, json, math, os, random, re, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance, ImageChops
import numpy as np
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

F = "/usr/share/fonts/truetype/"
O = "/usr/share/fonts/opentype/inter/"
DUENN = O + "Inter-Light.otf" if os.path.exists(O + "Inter-Light.otf") else F + "freefont/FreeSans.ttf"
SCHRIFT = {  # Familie → (normal, fett, dünn); dünn im Bild = Inter Light, im PDF mit Textebene FreeSans (reportlab liest nur TrueType)
    "sans": (F + "liberation/LiberationSans-Regular.ttf", F + "liberation/LiberationSans-Bold.ttf", DUENN),
    "serif": (F + "liberation/LiberationSerif-Regular.ttf", F + "liberation/LiberationSerif-Bold.ttf", F + "liberation/LiberationSerif-Italic.ttf"),
    "dejavu": (F + "dejavu/DejaVuSans.ttf", F + "dejavu/DejaVuSans-Bold.ttf", DUENN),
    "schmal": (F + "crosextra/Carlito-Regular.ttf", F + "crosextra/Carlito-Bold.ttf", DUENN),
    "mono": (F + "dejavu/DejaVuSansMono.ttf", F + "dejavu/DejaVuSansMono-Bold.ttf", F + "liberation/LiberationMono-Regular.ttf"),
}
for fam, pf in SCHRIFT.items():
    for i, p in enumerate(pf):
        pdfmetrics.registerFont(TTFont(f"{fam}{i}", p if p.endswith(".ttf") else F + "freefont/FreeSans.ttf"))
B, H = 595.0, 842.0  # A4 in Punkt
_pil = {}
def pilfont(key, size):
    k = (key, round(size * 4) / 4)
    if k not in _pil: _pil[k] = ImageFont.truetype(SCHRIFT[key[:-1]][int(key[-1])], max(4, int(round(k[1]))))
    return _pil[k]
def breite(t, key, size): return pdfmetrics.stringWidth(t, key, size)

# ---------------------------------------------------------------- Zerlegen
FUSS_RE = re.compile(r"(IBAN|BIC|HRB|HRA|Bankverbindung|Geschäftsführ|Sitz der Gesellschaft|Registergericht|USt-?Id|Steuernummer:.*·|Amtsgericht .*HR|Vorstand|Aufsichtsrat)", re.I)
INFO_RE = re.compile(r"^(?!Betreff)([A-ZÄÖÜa-zäöü][\wäöüÄÖÜß .\-/]{1,32}):\s*\S.{0,60}$")
ANSCHRIFT_RE = re.compile(r"^(Herrn|Herr|Frau|Familie|An die|An den|An Frau|An Herrn|Eheleute|Firma)\b")
DATUM_RE = re.compile(r"^(\w[\w\- ]{0,30}, (den )?\d{1,2}\.|Datum:)")
GRUSS_RE = re.compile(r"^(Mit freundlichen Grüßen|Freundliche Grüße|Mit freundlichem Gruß|Viele Grüße|Herzliche Grüße|Beste Grüße|Hochachtungsvoll|Im Auftrag|i\. ?A\.)", re.I)

def tabelle_zeile(z):
    if z.strip().startswith("|") and z.count("|") >= 3: return [c.strip() for c in z.strip().strip("|").split("|")]
    teile = [t for t in re.split(r"\s{2,}", z.strip()) if t]
    return teile if len(teile) >= 3 or (len(teile) == 2 and re.search(r"\d[\d.,]*\s*(€|EUR)?$", teile[-1])) else None

def zerlegen(zeilen):
    """Text → Blöcke: kopf, anschrift, info, betreff, absatz, tabelle, spalten, fuss, gruss, stempel, unterschrift, seite."""
    zeilen = [z.rstrip() for z in zeilen]
    bl, i, n = [], 0, len(zeilen)
    # Briefkopf: Zeilen vor der ersten Leerzeile, wenn sie nicht schon die Anschrift sind
    kopf = []
    while i < n and zeilen[i].strip() and len(kopf) < 4 and not ANSCHRIFT_RE.match(zeilen[i].lstrip("# ")) and not zeilen[i].startswith("@"):
        kopf.append(zeilen[i]); i += 1
    if kopf: bl.append(("kopf", kopf))
    fuss = []
    while n > i and (not zeilen[n - 1].strip() or FUSS_RE.search(zeilen[n - 1]) or zeilen[n - 1].startswith("@fuss")):
        if zeilen[n - 1].strip(): fuss.insert(0, zeilen[n - 1].replace("@fuss", "").strip())
        n -= 1
    absatz, spalten, tab = [], None, []
    def flush():
        nonlocal absatz, tab
        if tab:
            if len(tab) >= 2: bl.append(("tabelle", tab))
            else: absatz.append("  ".join(tab[0]))
            tab = []
        if absatz:
            (spalten if spalten is not None else bl).append(("absatz", absatz)); absatz = []
    while i < n:
        z = zeilen[i]; s = z.strip(); i += 1
        if s.startswith("@spalten"):
            flush(); spalten = []; anz = int((s.split() + ["2"])[1]) if len(s.split()) > 1 else 2; continue
        if s == "@ende" and spalten is not None:
            flush(); bl.append(("spalten", (anz, spalten))); spalten = None; continue
        if s == "@seite": flush(); bl.append(("seite", None)); continue
        if s.startswith("@stempel"): flush(); bl.append(("stempel", s[8:].strip() or "EINGEGANGEN")); continue
        if s == "@unterschrift": flush(); bl.append(("unterschrift", None)); continue
        if s.startswith("@fuss"): fuss.append(s[5:].strip()); continue
        if not s: flush(); continue
        if ANSCHRIFT_RE.match(s.lstrip("# ")) and not any(b[0] == "anschrift" for b in bl):
            flush(); a = [s]
            while i < n and zeilen[i].strip() and len(a) < 5: a.append(zeilen[i].strip()); i += 1
            bl.append(("anschrift", a)); continue
        t = tabelle_zeile(z)
        if t and not s.startswith("#"):
            if absatz: (spalten if spalten is not None else bl).append(("absatz", absatz)); absatz = []
            tab.append(t); continue
        elif tab: flush()
        if (INFO_RE.match(s) or DATUM_RE.match(s)) and not any(b[0] in ("betreff",) for b in bl) and len(s) < 70:
            flush()
            if bl and bl[-1][0] == "info": bl[-1][1].append(s)
            else: bl.append(("info", [s]))
            continue
        if (s.startswith("# ") or s.lower().startswith("betreff")) and not any(b[0] == "betreff" for b in bl):
            flush(); bl.append(("betreff", s.lstrip("# ").strip())); continue
        if GRUSS_RE.match(s): flush(); bl.append(("gruss", s)); continue
        absatz.append(z)
    flush()
    if spalten: bl.append(("spalten", (anz, spalten)))
    if fuss: bl.append(("fuss", fuss))
    return bl

# ---------------------------------------------------------------- Satz (eine Liste von Zeichenbefehlen je Seite)
class Satz:
    def __init__(self, r, art):
        self.r = r
        self.fam = r.choice(["sans", "sans", "serif", "dejavu", "schmal"]) if art != "bank" else "mono"
        self.gr = r.choice([9, 9.5, 10, 10.5, 11])
        self.rand = r.choice([56, 62, 68, 72])
        self.farbe = r.choice([(20, 60, 130), (150, 30, 30), (20, 110, 70), (60, 60, 60), (200, 110, 0), (90, 40, 120)])
        self.info_rechts = r.random() < 0.75
        self.duenn_werte = r.random() < 0.4  # Beschriftung fett, Werte dünn
        self.balken = r.random() < 0.35
        self.seiten, self.y = [], 0
        self.neue_seite()
    def neue_seite(self):
        self.ops = []; self.seiten.append(self.ops); self.y = self.rand if len(self.seiten) > 1 else self.rand
    def platz(self, h):
        if self.y + h > H - 70: self.neue_seite()
    def text(self, x, y, t, st=0, gr=None, farbe=(25, 25, 30)):
        self.ops.append(("text", x, y, t, f"{self.fam}{st}", gr or self.gr, farbe))
    def umbrechen(self, t, w, st=0, gr=None):
        gr = gr or self.gr; worte, z, aus = t.split(" "), "", []
        for wo in worte:
            k = (z + " " + wo).strip()
            if breite(k, f"{self.fam}{st}", gr) <= w or not z: z = k
            else: aus.append(z); z = wo
        if z: aus.append(z)
        return aus or [""]
    def zeilen(self, liste, x, w, st=0, gr=None, abstand=1.35):
        gr = gr or self.gr
        for t in liste:
            fett = t.startswith("## ") or t.startswith("# ")
            tt = t.lstrip("# ").strip() if fett else t
            for u in self.umbrechen(tt, w, 1 if fett else st, gr):
                self.platz(gr * abstand); self.text(x, self.y, u, 1 if fett else st, gr); self.y += gr * abstand

def setzen(bloecke, r, art="brief"):
    s = Satz(r, art); L = s.rand; W = B - 2 * L
    info_x = B - L - 170
    kopf_unten = 0
    for typ, inh in bloecke:
        if typ == "kopf":
            name = inh[0].lstrip("# ").strip(); rest = [x.lstrip("# ") for x in inh[1:]]
            if s.balken: s.ops.append(("rect", 0, 0, B, 18, None, s.farbe, 0))
            lx = L if r.random() < 0.6 else B - L - 46
            form = r.choice(["kreis", "quadrat", "raute", "welle"])
            s.ops.append(("logo", lx, 34, 44, form, s.farbe, "".join(w[0] for w in re.findall(r"[A-ZÄÖÜ]\w+", name)[:2]) or "X"))
            nx = lx + 54 if lx == L else L
            gr = r.choice([13, 15, 17])
            for j, u in enumerate(s.umbrechen(name, W - 120, 1, gr)[:2]): s.text(nx, 36 + j * gr * 1.15, u, 1, gr, s.farbe)
            y = 36 + gr * 1.3 * min(2, len(s.umbrechen(name, W - 120, 1, gr)))
            for x in rest:
                if "·" in x or len(x) > 60:  # Absenderzeile fürs Fenster
                    s.text(L, 132, x, 2 if r.random() < 0.5 else 0, 6.5); s.ops.append(("line", L, 140, L + min(250, breite(x, f"{s.fam}0", 6.5)), 140, (90, 90, 90), 0.4))
                else:
                    s.text(nx, y, x, 2, s.gr - 1, (70, 70, 70)); y += s.gr * 1.2
            kopf_unten = 150; s.y = max(s.y, 150)
        elif typ == "anschrift":
            y = max(s.y, 145)
            for j, a in enumerate(inh): s.text(L, y + 2 + j * s.gr * 1.3, a.lstrip("# "), 0)
            s.anschrift_y = y; s.y = y + len(inh) * s.gr * 1.3 + 14
        elif typ == "info":
            if s.info_rechts and hasattr(s, "anschrift_y") and not getattr(s, "info_gesetzt", False):
                y = s.anschrift_y - 6
                lw = 6 + max([breite(t.split(":", 1)[0] + ": ", f"{s.fam}1", s.gr - 1.5) for t in inh if ":" in t] + [40])
                info_x = min(info_x, B - L - lw - max([breite(t.split(":", 1)[-1].strip(), f"{s.fam}0", s.gr - 1) for t in inh] + [60]) - 4)
                for t in inh:
                    if ":" in t and not DATUM_RE.match(t):
                        k, v = t.split(":", 1)
                        s.text(info_x, y, k + ":", 1 if not s.duenn_werte else 0, s.gr - 1.5, (80, 80, 80))
                        s.text(info_x + lw, y, v.strip(), 2 if s.duenn_werte else 0, s.gr - 1)
                    else: s.text(info_x, y, t, 0, s.gr - 1)
                    y += s.gr * 1.35
                s.info_gesetzt = True; s.y = max(s.y, y + 10)
            else:
                for t in inh:
                    s.platz(s.gr * 1.4)
                    if ":" in t and s.duenn_werte and not DATUM_RE.match(t):
                        k, v = t.split(":", 1); s.text(L, s.y, k + ":", 1); s.text(L + breite(k + ": ", f"{s.fam}1", s.gr), s.y, v.strip(), 2)
                    else: s.text(B - L - breite(t, f"{s.fam}0", s.gr) if DATUM_RE.match(t) and s.info_rechts else L, s.y, t)
                    s.y += s.gr * 1.4
                s.y += 6
        elif typ == "betreff":
            s.y += 10; gr = s.gr + r.choice([0, 1, 2]); st = r.choice([1, 1, 1, 2])
            s.zeilen([inh], L, W, st, gr); s.y += 8
        elif typ == "absatz":
            s.zeilen(inh, L, W); s.y += s.gr * 0.7
        elif typ == "spalten":
            anz, teile = inh; lk = 14; sw = (W - (anz - 1) * lk) / anz
            text_zeilen = []
            for t2, z in teile:
                if t2 == "absatz":
                    for x in z:
                        fett = x.startswith("#")
                        text_zeilen += [(u, 1 if fett else 0) for u in s.umbrechen(x.lstrip("# ").strip(), sw, 1 if fett else 0)]
                    text_zeilen.append(("", 0))
                elif t2 == "tabelle":
                    text_zeilen += [("  ".join(c), 0) for c in z] + [("", 0)]
            zh = s.gr * 1.3
            while text_zeilen:
                platz = max(1, int((H - 70 - s.y) // zh))
                if platz < 4: s.neue_seite(); continue
                je = min(platz, math.ceil(len(text_zeilen) / anz))
                y0 = s.y
                for sp in range(anz):
                    teil, text_zeilen = text_zeilen[:je], text_zeilen[je:]
                    for j, (u, st) in enumerate(teil): s.text(L + sp * (sw + lk), y0 + j * zh, u, st)
                    if sp < anz - 1 and r.random() < 0.5: s.ops.append(("line", L + sp * (sw + lk) + sw + lk / 2, y0, L + sp * (sw + lk) + sw + lk / 2, y0 + je * zh, (170, 170, 170), 0.5))
                s.y = y0 + je * zh + 8
                if text_zeilen: s.neue_seite()
        elif typ == "tabelle":
            spalten = max(len(z) for z in inh)
            zeilen = [z + [""] * (spalten - len(z)) for z in inh]
            gr = s.gr - r.choice([0, 0.5, 1])
            ws = [max(breite(z[k], f"{s.fam}1", gr) for z in zeilen) + 16 for k in range(spalten)]
            faktor = min(1.0, W / sum(ws)); ws = [w * faktor for w in ws]
            if faktor < 1: gr = gr * max(0.72, faktor)
            gitter = r.choice(["voll", "linien", "keins", "streifen"])
            zh = gr * 1.55
            for j, z in enumerate(zeilen):
                s.platz(zh)
                if gitter == "streifen" and j % 2 == 1: s.ops.append(("rect", L, s.y - gr * 0.25, L + sum(ws), s.y + zh - gr * 0.25, None, (236, 238, 242), 0))
                if j == 0 and gitter != "keins": s.ops.append(("rect", L, s.y - gr * 0.25, L + sum(ws), s.y + zh - gr * 0.25, None, (225, 228, 235), 0))
                x = L
                for k, c in enumerate(z):
                    rechts = bool(re.search(r"\d[\d.,]*\s*(€|EUR|%)?$", c)) and k > 0
                    st = 1 if j == 0 else (2 if s.duenn_werte and rechts else 0)
                    tx = x + ws[k] - 5 - breite(c, f"{s.fam}{st}", gr) if rechts else x + 4
                    s.text(tx, s.y, c, st, gr)
                    if gitter == "voll": s.ops.append(("rect", x, s.y - gr * 0.25, x + ws[k], s.y + zh - gr * 0.25, (120, 120, 120), None, 0.4))
                    x += ws[k]
                if gitter == "linien": s.ops.append(("line", L, s.y + zh - gr * 0.25, L + sum(ws), s.y + zh - gr * 0.25, (150, 150, 150), 0.4))
                s.y += zh
            s.y += 10
        elif typ == "gruss":
            s.y += 4; s.zeilen([inh], L, W)
            if r.random() < 0.55: bloecke_unterschrift(s, L, r)
        elif typ == "unterschrift": bloecke_unterschrift(s, L, r)
        elif typ == "stempel": stempel(s, r, inh)
        elif typ == "seite": s.neue_seite()
        elif typ == "fuss":
            for ops in s.seiten:
                teile = [t for f in inh for t in re.split(r"\s+·\s+", f)]
                anz = min(4, max(1, len(teile))); je = math.ceil(len(teile) / anz); sw = W / anz
                ops.append(("line", L, H - 62, B - L, H - 62, (160, 160, 160), 0.4))
                for sp in range(anz):
                    j = 0
                    for t in teile[sp * je:(sp + 1) * je]:
                        for u in s.umbrechen(t, sw - 8, 0, 6.5):
                            if j < 6: ops.append(("text", L + sp * sw, H - 56 + j * 8, u, f"{s.fam}0", 6.5, (90, 90, 90)))
                            j += 1
    if r.random() < 0.25 and not any(t == "stempel" for t, _ in bloecke): stempel(s, r, None)
    m = len(s.seiten)
    if m > 1:
        for k, ops in enumerate(s.seiten): ops.append(("text", B - L - 60, H - 30, f"Seite {k + 1} von {m}", f"{s.fam}0", 7.5, (90, 90, 90)))
    return s.seiten

def bloecke_unterschrift(s, L, r):
    s.platz(36); s.ops.append(("sign", L + 4, s.y + 2, r.randint(0, 10 ** 6))); s.y += 32

MON = ["JAN", "FEB", "MRZ", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DEZ"]
def stempel(s, r, text):
    t = text or f"EINGEGANGEN {r.randint(1, 28)}. {r.choice(MON)} {r.choice([2025, 2026])}"
    seite = s.seiten[0]
    seite.append(("stamp", r.uniform(300, 430), r.uniform(150, 260), t, r.uniform(-14, 14), r.choice([(30, 60, 170), (170, 30, 40)])))

# ---------------------------------------------------------------- Zeichnen: Bild und PDF
def logo_pil(d, x, y, g, form, farbe, kz, k):
    X, Y, G = x * k, y * k, g * k
    if form == "kreis": d.ellipse([X, Y, X + G, Y + G], fill=farbe)
    elif form == "quadrat": d.rectangle([X, Y, X + G, Y + G], fill=farbe)
    elif form == "raute": d.polygon([(X + G / 2, Y), (X + G, Y + G / 2), (X + G / 2, Y + G), (X, Y + G / 2)], fill=farbe)
    else:
        for j in range(4): d.arc([X, Y + j * G / 5, X + G, Y + G / 2 + j * G / 5], 200, 340, fill=farbe, width=max(2, int(3 * k)))
    if form != "welle":
        f = pilfont("sans1", g * 0.42 * k / k); fk = ImageFont.truetype(SCHRIFT["sans"][1], max(6, int(g * 0.42 * k)))
        tw = d.textlength(kz, font=fk); d.text((X + (G - tw) / 2, Y + G * 0.27), kz, fill=(255, 255, 255), font=fk)

def bild(ops, dpi):
    k = dpi / 72.0
    img = Image.new("RGB", (int(B * k), int(H * k)), (253, 252, 249)); d = ImageDraw.Draw(img)
    for o in ops:
        if o[0] == "rect":
            _, x0, y0, x1, y1, rand, fuell, w = o
            d.rectangle([x0 * k, y0 * k, x1 * k, y1 * k], outline=rand, fill=fuell, width=max(1, int(w * k)) if rand else 0)
        elif o[0] == "line":
            _, x0, y0, x1, y1, f, w = o; d.line([x0 * k, y0 * k, x1 * k, y1 * k], fill=f, width=max(1, int(w * k)))
    for o in ops:
        if o[0] == "text":
            _, x, y, t, key, gr, farbe = o
            f = ImageFont.truetype(SCHRIFT[key[:-1]][int(key[-1])], max(5, int(round(gr * k))))
            d.text((x * k, y * k), t, fill=farbe, font=f)
        elif o[0] == "logo": logo_pil(d, *o[1:], k)
        elif o[0] == "sign":
            _, x, y, saat = o; rr = random.Random(saat); pts = []
            for j in range(40):
                pts.append(((x + j * 3.2 + rr.uniform(-2, 2)) * k, (y + 14 + 9 * math.sin(j * rr.uniform(0.5, 1.1)) + rr.uniform(-3, 3)) * k))
            d.line(pts, fill=(20, 30, 120), width=max(1, int(1.2 * k)))
        elif o[0] == "stamp":
            _, x, y, t, winkel, farbe = o
            f = ImageFont.truetype(SCHRIFT["sans"][1], int(13 * k)); tw = int(d.textlength(t, font=f)) + int(20 * k)
            st = Image.new("RGBA", (tw, int(30 * k)), (0, 0, 0, 0)); sd = ImageDraw.Draw(st)
            sd.rectangle([2, 2, tw - 3, int(30 * k) - 3], outline=farbe + (190,), width=max(2, int(1.6 * k)))
            sd.text((int(10 * k), int(7 * k)), t, fill=farbe + (170,), font=f)
            st = st.rotate(winkel, expand=True, resample=Image.BICUBIC); img.paste(st, (int(x * k), int(y * k)), st)
    return img

def pdf_text(seiten, ziel):
    c = rl_canvas.Canvas(ziel, pagesize=(B, H)); c.setTitle(""); c.setAuthor(""); c.setCreator("")
    for ops in seiten:
        for o in ops:
            if o[0] == "rect":
                _, x0, y0, x1, y1, rand, fuell, w = o
                if fuell: c.setFillColorRGB(*[v / 255 for v in fuell])
                if rand: c.setStrokeColorRGB(*[v / 255 for v in rand]); c.setLineWidth(w)
                c.rect(x0, H - y1, x1 - x0, y1 - y0, stroke=1 if rand else 0, fill=1 if fuell else 0)
            elif o[0] == "line":
                _, x0, y0, x1, y1, f, w = o; c.setStrokeColorRGB(*[v / 255 for v in f]); c.setLineWidth(w); c.line(x0, H - y0, x1, H - y1)
        for o in ops:
            if o[0] == "text":
                _, x, y, t, key, gr, farbe = o
                c.setFillColorRGB(*[v / 255 for v in farbe]); c.setFont(key, gr); c.drawString(x, H - y - gr * 0.85, t)
            elif o[0] == "logo":
                _, x, y, g, form, farbe, kz = o; c.setFillColorRGB(*[v / 255 for v in farbe])
                if form == "kreis": c.circle(x + g / 2, H - y - g / 2, g / 2, stroke=0, fill=1)
                else: c.rect(x, H - y - g, g, g, stroke=0, fill=1)
                c.setFillColorRGB(1, 1, 1); c.setFont("sans1", g * 0.42); c.drawCentredString(x + g / 2, H - y - g * 0.62, kz)
            elif o[0] == "sign":
                _, x, y, saat = o; rr = random.Random(saat); c.setStrokeColorRGB(0.08, 0.12, 0.47); c.setLineWidth(1.1)
                p = c.beginPath(); p.moveTo(x, H - y - 14)
                for j in range(40): p.lineTo(x + j * 3.2 + rr.uniform(-2, 2), H - (y + 14 + 9 * math.sin(j * rr.uniform(0.5, 1.1)) + rr.uniform(-3, 3)))
                c.drawPath(p)
            elif o[0] == "stamp":
                _, x, y, t, winkel, farbe = o
                c.saveState(); c.translate(x, H - y - 20); c.rotate(winkel); c.setStrokeColorRGB(*[v / 255 for v in farbe]); c.setFillColorRGB(*[v / 255 for v in farbe])
                w = pdfmetrics.stringWidth(t, "sans1", 13) + 20; c.rect(0, 0, w, 28, stroke=1, fill=0); c.setFont("sans1", 13); c.drawString(10, 9, t); c.restoreState()
        c.showPage()
    c.save()

# ---------------------------------------------------------------- Altern: Scan und Foto in drei Güten
GUETE = {"gut": dict(dpi=200, schief=0.6, blur=(0.2, 0.5), rausch=(4, 8), flecken=0, knick=0.0, schatten=0.0, rand=0.0, jpeg=82, kontrast=(0.92, 1.0)),
         "mittel": dict(dpi=150, schief=2.0, blur=(0.6, 1.0), rausch=(9, 16), flecken=3, knick=0.35, schatten=0.3, rand=0.25, jpeg=62, kontrast=(0.78, 0.92)),
         "schlecht": dict(dpi=120, schief=3.5, blur=(0.7, 1.2), rausch=(14, 24), flecken=8, knick=0.8, schatten=0.8, rand=0.7, jpeg=42, kontrast=(0.6, 0.8))}

def altern(img, r, guete, foto):
    g = GUETE[guete]; w, h = img.size; a = np.asarray(img).astype(np.float32)
    if r.random() < g["knick"]:  # Knick: dunkle Linie und Helligkeitssprung quer über das Blatt
        y = int(h * r.uniform(0.3, 0.7)); a[y - 2:y + 2] *= 0.72; a[y:] *= r.uniform(0.9, 0.97)
    for _ in range(r.randint(0, g["flecken"])):  # Flecken, Kaffeeränder
        cx, cy, rad = r.randint(0, w), r.randint(0, h), r.randint(int(w * 0.01), int(w * 0.06))
        yy, xx = np.ogrid[:h, :w]; m = ((xx - cx) ** 2 + (yy - cy) ** 2) < rad * rad
        a[m] = a[m] * np.array([0.86, 0.8, 0.68]) if r.random() < 0.7 else a[m] * 0.8
    if r.random() < g["schatten"]:  # Schatten von einer Seite
        rampe = np.linspace(r.uniform(0.72, 0.85) if guete == "mittel" else r.uniform(0.55, 0.75), 1.0, w if r.random() < 0.5 else h)
        a *= rampe[None, :, None] if len(rampe) == w else rampe[:, None, None]
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    img = ImageEnhance.Contrast(img).enhance(r.uniform(*g["kontrast"]))
    img = img.rotate(r.uniform(-g["schief"], g["schief"]) * (1.6 if foto else 1), resample=Image.BICUBIC, expand=foto, fillcolor=(245, 244, 238) if not foto else (0, 0, 0))
    if r.random() < g["rand"]:  # abgeschnittener Rand
        s = r.choice(["l", "r", "o", "u"]); p = r.uniform(0.03, 0.09)
        box = {"l": (int(w * p), 0, w, h), "r": (0, 0, int(w * (1 - p)), h), "o": (0, int(h * p), w, h), "u": (0, 0, w, int(h * (1 - p)))}[s]
        img = img.crop(box)
    if foto:
        tisch = Image.new("RGB", (img.width + 300, img.height + 300), (r.randint(70, 150), r.randint(60, 120), r.randint(50, 100)))
        maske = img.convert("L").point(lambda v: 255 if v > 8 else 0); tisch.paste(img, (150, 150), maske); img = tisch
        schatten = Image.linear_gradient("L").resize(img.size).rotate(r.choice([0, 90, 180, 270]))
        img = Image.composite(img, ImageEnhance.Brightness(img).enhance(r.uniform(0.6, 0.8)), schatten)
    img = img.filter(ImageFilter.GaussianBlur(r.uniform(*g["blur"])))
    rausch = Image.effect_noise(img.size, r.uniform(*g["rausch"])).convert("RGB")
    img = Image.blend(img, rausch, {"gut": 0.05, "mittel": 0.08, "schlecht": 0.11}[guete])
    return img

def bildschirm(text_zeilen, r):
    """Bildschirmfoto einer Mail-/Portalansicht auf dem Handy (scharf, aber klein, mit Bedienleisten)."""
    w, h = 1080, 2340; img = Image.new("RGB", (w, h), (255, 255, 255)); d = ImageDraw.Draw(img)
    farbe = r.choice([(25, 118, 210), (56, 142, 60), (94, 53, 177), (40, 40, 40)])
    d.rectangle([0, 0, w, 90], fill=(30, 30, 30)); d.text((40, 25), f"{r.randint(7, 22)}:{r.randint(10, 59)}", fill=(255, 255, 255), font=ImageFont.truetype(SCHRIFT["sans"][0], 40))
    d.rectangle([0, 90, w, 250], fill=farbe); d.text((40, 140), r.choice(["Posteingang", "Postfach", "Dokumente", "Mitteilungen"]), fill=(255, 255, 255), font=ImageFont.truetype(SCHRIFT["sans"][1], 52))
    y = 300; fn, fb = ImageFont.truetype(SCHRIFT["dejavu"][0], 36), ImageFont.truetype(SCHRIFT["dejavu"][1], 40)
    for z in text_zeilen:
        fett = z.startswith("#"); t = z.lstrip("# ").strip()
        f = fb if fett else fn; zeile = ""
        for wo in t.split(" "):
            if d.textlength((zeile + " " + wo).strip(), font=f) > w - 100: d.text((50, y), zeile, fill=(20, 20, 20), font=f); y += 52; zeile = wo
            else: zeile = (zeile + " " + wo).strip()
        d.text((50, y), zeile, fill=(20, 20, 20), font=f); y += 52 if t else 30
        if y > h - 200: break
    d.rectangle([0, h - 140, w, h], fill=(245, 245, 245))
    return img

def bonstreifen(zeilen, r):
    """Kassenbon als Thermopapier-Streifen: schmal, kleine Schrift, bei langen Bons sehr lang (Klaus 14.11.: „einen halben Kilometer lang“)."""
    lang = len(zeilen) > 35
    fn = ImageFont.truetype(SCHRIFT["mono"][0], 15 if lang else 21); fb = ImageFont.truetype(SCHRIFT["mono"][1], 18 if lang else 25)
    zh = 20 if lang else 29; b = 430 if lang else 520
    papier = Image.new("RGB", (b, 70 + zh * len(zeilen)), (247, 245, 238)); d = ImageDraw.Draw(papier)
    for i, z in enumerate(zeilen):
        fett = z.startswith("#"); t = z.lstrip("# ").rstrip()
        f = fb if fett else fn
        x = (b - d.textlength(t, font=f)) / 2 if fett else 14
        d.text((x, 35 + i * zh), t, fill=(35, 35, 35), font=f)
    # Thermopapier verblasst ungleichmäßig
    a = np.asarray(papier).astype(np.float32); a = 255 - (255 - a) * np.linspace(r.uniform(0.55, 0.95), 1.0, a.shape[0])[:, None, None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def quelltext(zeilen):
    aus = []
    for z in zeilen:
        s = z.strip()
        if s in ("@ende", "@seite", "@unterschrift") or s.startswith("@spalten"): continue
        s = re.sub(r"^@(fuss|stempel)\s*", "", s).lstrip("# ").strip()
        if s.startswith("|"): s = " ".join(c.strip() for c in s.strip("|").split("|"))
        aus.append(s)
    return "\n".join(aus)

def setze_eins(a):
    zeilen = a.get("zeilen") or a["text"].replace("\t", "    ").split("\n")
    r = random.Random(int(hashlib.sha256(str(a.get("saat", a["ziel"])).encode()).hexdigest()[:12], 16))
    form, guete = a.get("form", "pdf-scan"), a.get("qualitaet", "gut")
    art = a.get("art", "brief")
    os.makedirs(os.path.dirname(a["ziel"]) or ".", exist_ok=True)
    if zeilen and zeilen[0].strip() in ("@bon", "@appbon"):
        app = zeilen[0].strip() == "@appbon"; zeilen = zeilen[1:]
        if app and form in ("pdf-scan", "foto"): form = "bildschirm"
        if not app and form in ("pdf-text", "bildschirm", "pdf-scan"): form = "foto"
        if not app:
            img = altern(bonstreifen(zeilen, r), r, guete, True); img.save(a["ziel"], "JPEG", quality=GUETE[guete]["jpeg"]); return {"seiten": 1, "form": "foto"}
    if form == "bildschirm":
        bildschirm(quelltext(zeilen).split("\n"), r).save(a["ziel"], "PNG", optimize=True); return {"seiten": 1, "form": "bildschirm"}
    seiten = setzen(zerlegen(zeilen), r, art)
    if form == "pdf-text":
        pdf_text(seiten, a["ziel"]); return {"seiten": len(seiten), "form": "pdf-text"}
    dpi = GUETE[guete]["dpi"] if form == "pdf-scan" else 130
    bilder = [altern(bild(ops, dpi), r, guete, form == "foto") for ops in seiten]
    if form == "foto":
        bilder[0].save(a["ziel"], "JPEG", quality=GUETE[guete]["jpeg"]); return {"seiten": 1, "seitenGesetzt": len(bilder), "form": "foto"}
    bilder = [b.convert("L") if r.random() < 0.5 else b for b in bilder]  # Graustufen-Scan oder Farbe
    bilder[0].save(a["ziel"], "PDF", save_all=True, append_images=bilder[1:], resolution=dpi, quality=GUETE[guete]["jpeg"])
    return {"seiten": len(bilder), "form": "pdf-scan"}

def verteilung(s, std):
    if not s: return std
    return [(k, float(v)) for k, v in (x.split(":") for x in s.split(","))]
def ziehe(r, vert):
    x, acc = r.random() * sum(v for _, v in vert), 0
    for k, v in vert:
        acc += v
        if x <= acc: return k
    return vert[-1][0]

if __name__ == "__main__":
    if sys.argv[1] == "--stapel":
        stapel, ziel = sys.argv[2].rstrip("/"), sys.argv[3].rstrip("/")
        arg = lambda n: sys.argv[sys.argv.index(n) + 1] if n in sys.argv else None
        formen = verteilung(arg("--formen"), [("pdf-scan", 0.6), ("foto", 0.25), ("pdf-text", 0.15)])
        guete = verteilung(arg("--guete"), [("gut", 0.35), ("mittel", 0.4), ("schlecht", 0.25)])
        protokoll = {}
        # --paare datei.json: {"A.txt": "B.txt"} – zwei Stücke in einem Scan (Runde E): B wird hinter A gesetzt, als PDF-Scan
        paare = json.load(open(arg("--paare"), encoding="utf-8")) if arg("--paare") else {}
        hinten = {b: a for a, b in paare.items()}
        for wurzel, _, namen in os.walk(stapel):
            for name in sorted(namen):
                if not name.endswith(".txt"): continue
                pfad = os.path.relpath(os.path.join(wurzel, name), stapel)
                r = random.Random(int(hashlib.sha256(("form" + pfad).encode()).hexdigest()[:12], 16))
                form, q = ziehe(r, formen), ziehe(r, guete)
                if pfad in hinten: continue
                text = open(os.path.join(wurzel, name), encoding="utf-8").read()
                if pfad in paare:
                    form = "pdf-scan"; text = text.rstrip() + "\n@seite\n" + open(os.path.join(stapel, paare[pfad]), encoding="utf-8").read()
                tmp = os.path.join(ziel, pfad[:-4] + ".tmp")
                info = setze_eins({"ziel": tmp, "text": text, "form": form, "qualitaet": q, "saat": pfad, "art": "bank" if pfad.startswith("bank/") else "brief"})
                form = info.pop("form", form)
                ausgabe = pfad[:-4] + {"pdf-scan": ".pdf", "pdf-text": ".pdf", "foto": ".jpg", "bildschirm": ".png"}[form]
                os.replace(tmp, os.path.join(ziel, ausgabe))
                protokoll[pfad] = {"datei": ausgabe, "form": form, "qualitaet": q if form in ("pdf-scan", "foto") else None, **info, **({"zweitesStueck": paare[pfad]} if pfad in paare else {})}
        for b, a in hinten.items():
            if a in protokoll: protokoll[b] = {**protokoll[a], "inScanVon": a}
        os.makedirs(ziel, exist_ok=True)
        json.dump(protokoll, open(os.path.join(ziel, "SETZEN.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"{len(protokoll)} Stücke gesetzt → {ziel}")
    else:
        auftrag = json.load(open(sys.argv[1], encoding="utf-8")); aus = []
        for a in auftrag: aus.append({"ziel": a["ziel"], **setze_eins(a)})
        if len(sys.argv) > 2: json.dump(aus, open(sys.argv[2], "w"), ensure_ascii=False)
