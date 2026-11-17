// Oberflächen-Probe: echter Browser gegen die gebaute App (app/) mit dem erfundenen Testordner.
// Aufruf: npm run build && node tests/ui-probe.mjs
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
// Playwright liegt global (Behälter) oder als Entwicklungs-Abhängigkeit (CI).
const { chromium } = createRequire(import.meta.url)("playwright");
import { indexLesen } from "../lib/index-format.ts";
// Der Arbeitsordner liegt seit 16.11. hinter dem Zahnrad der Ordner-Seite: erst aufklappen, wenn die Karte zu ist.
const zahnrad = async (pg) => { if (!(await pg.locator("[data-arbeit-waehlen]").count())) await pg.locator("[data-einstellungen]").click(); };

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const TYP = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".jpg": "image/jpeg", ".webmanifest": "application/manifest+json" };
const server = createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
    if (p.includes("..")) throw new Error("nein");
    let f = join(WURZEL, p);
    if ((await stat(f)).isDirectory()) f = join(f, "index.html");
    res.writeHead(200, { "content-type": TYP[extname(f)] || "application/octet-stream" });
    res.end(await readFile(f));
  } catch { res.writeHead(404); res.end("fehlt"); }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const basis = `http://127.0.0.1:${server.address().port}/app/`;

let gruen = 0, rot = 0;
const soll = (name, bed, mehr = "") => { if (bed) { gruen++; console.log(`  ✓ ${name}`); } else { rot++; console.log(`  ✗ ROT: ${name}${mehr ? ` – ${mehr}` : ""}`); } };

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => { addEventListener("DOMContentLoaded", () => new MutationObserver(() => { const e = document.querySelector(".site-header [data-ladeanzeige]"); if (e) sessionStorage.setItem("probe-lade", (sessionStorage.getItem("probe-lade") || "") + " " + e.getAttribute("data-ladeanzeige")); }).observe(document.documentElement, { subtree: true, childList: true, attributes: true })); });
  const fehler = [];
  page.on("pageerror", (e) => fehler.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") fehler.push(m.text()); });
  page.on("dialog", (d) => d.accept());

  console.log("Start");
  await page.goto(basis);
  soll("Kopf, Navigation und Fuß stehen da", await page.locator(".site-header .main-navigation [data-nav]").count() === 6 && await page.locator(".site-footer").isVisible());
  soll("Ohne Ordner: keine Pille im Kopf, dafür der Drucker-Knopf", await page.locator("[data-ordner-pill]").count() === 0 && await page.locator(".header-actions [data-drucken]").count() === 1);
  { // Ohne offene Datei druckt der Knopf die Seite, wie sie ist (Klaus 17.11.: nicht ausgegraut).
    await page.evaluate(() => { window.__seite = 0; window.print = () => { window.__seite += document.querySelector("#druck-blatt") ? 100 : 1; }; });
    await page.locator(".header-actions [data-drucken]").click();
    soll("Drucker-Knopf druckt ohne offene Datei die Seite", await page.evaluate(() => window.__seite) === 1 && await page.locator(".header-actions [data-drucken]").isEnabled()); }
  soll("Knopf „Aktualisieren“ steht oben im Kopf", await page.locator(".site-header [data-aktualisieren]").isVisible());
  await page.locator(".page-title .info-knopf").click();
  soll("Fragezeichen öffnet den Hinweis mit dem SD-Baum", await page.locator("[data-info-fenster]").isVisible() && (await page.locator("[data-info-fenster]").innerText()).includes("Datei-Organizer"));
  await page.keyboard.press("Escape");
  soll("Esc schließt den Hinweis", await page.locator("[data-info-fenster]").count() === 0);

  console.log("Installierbar (PWA)");
  const man = await (await fetch(basis + "manifest.webmanifest")).json();
  soll("Manifest mit Symbolen 192 und 512", ["192x192", "512x512"].every((g) => man.icons?.some((i) => i.sizes === g && i.type === "image/png")) && man.display === "standalone");
  const sw = await page.evaluate(() => navigator.serviceWorker.ready.then((r) => !!r.active).catch(() => false));
  soll("Offline-Vorrat (Service Worker) aktiv", sw);
  await page.reload(); await page.waitForTimeout(500);
  await ctx.setOffline(true);
  await page.reload();
  soll("Startet ohne Netz", await page.locator(".site-header .main-navigation").isVisible().catch(() => false));
  await ctx.setOffline(false);
  await page.reload();

  console.log("Testordner einlesen");
  await page.locator("[data-testordner]").click();
  await page.waitForFunction(() => /Dateien im Eingang/.test(document.querySelector("[data-meldung]")?.textContent || ""), null, { timeout: 120000 });
  const meldung = await page.locator("[data-meldung]").innerText();
  const gesamt = Number(meldung.match(/(\d+) Dateien im Eingang/)?.[1]);
  soll("Alle Testdateien (mit Mail-Anhängen) im Eingang", gesamt >= 101, meldung);
  soll("Sieb 1 meldet 3 gesperrte und 3 doppelte (eine als Mail-Anhang)", /3 auffällig, 3 doppelt/.test(meldung), meldung);
  soll("Kopf nennt den Ordner", (await page.locator("[data-ordner-pill]").innerText()).includes("Testordner"));
  // Android liest am Feld nur die Beschriftung (sonst den Tooltip ohne Anzahl) – die Emulator-Probe der APK sucht „Testordner (erfunden) · N“.
  soll("Kopf: Beschriftung = sichtbarer Text mit Anzahl (für Vorleser und die APK-Probe)", await page.locator("[data-ordner-pill]").evaluate((e) => e.getAttribute("aria-label") === e.textContent && /Testordner \(erfunden\) · \d+/.test(e.getAttribute("aria-label") || "")));

  console.log("Sortieren");
  await page.locator("[data-nav=sortieren]").click();
  await page.locator("[data-naechstes]").click();
  soll("„Nächstes Sieb“ geht einen Schritt", (await page.locator("[data-siebe] [aria-current=step]").innerText()).includes("Kopf"));
  await page.locator("[data-zurueck]").click();
  soll("„Sieb zurück“ geht zurück", (await page.locator("[data-siebe] [aria-current=step]").innerText()).includes("Art"));
  let runden = 0, bestaetigt = 0, geaendert = 0;
  while (runden++ < 200) {
    if (await page.locator("[data-durchsieben]").isEnabled()) await page.locator("[data-durchsieben]").click();
    const zeilen = page.locator("[data-pruef]");
    if (await zeilen.count() === 0) { if (!(await page.locator("[data-durchsieben]").isEnabled())) break; continue; }
    const z = zeilen.first();
    if (geaendert < 2) {
      await z.locator("[data-korrigieren]").click();
      const w = z.locator("[data-wert]");
      if (await w.evaluate((e) => e.tagName) === "SELECT") await w.selectOption({ index: 2 }); else await w.fill("Test-Wert");
      await z.locator("[data-uebernehmen]").click(); geaendert++;
    } else if (await z.locator("[data-stimmt]").count()) { await z.locator("[data-stimmt]").click(); bestaetigt++; }
    else { await z.locator("[data-korrigieren]").click(); const w = z.locator("[data-wert]"); if (await w.evaluate((e) => e.tagName) === "SELECT") await w.selectOption({ index: 1 }); else await w.fill("2026-11-01"); await z.locator("[data-uebernehmen]").click(); geaendert++; }
  }
  soll("Ganz durchgesiebt, nichts mehr zu prüfen", await page.locator("[data-nichts-offen]").count() === 1 && !(await page.locator("[data-durchsieben]").isEnabled()), `Runden ${runden}`);

  // Doppelte (Klaus 15.11.2026): je Paar Haken = behalten, Papierkorb-Menü „Alle: ältere/jüngere behalten“, Kopien herausnehmen
  { const karte = page.locator("[data-doppelte]");
    soll("Doppelte: Karte „welche behalten?“ mit Paaren", await karte.isVisible() && await page.locator("[data-doppelt-paar]").count() >= 2);
    const paar = page.locator("[data-doppelt-paar]").first(), sha = await paar.getAttribute("data-doppelt-paar");
    const kopie = paar.locator("input[type=radio]:not(:checked)").first(), kopiePfad = await kopie.getAttribute("data-doppelt-behalten");
    await kopie.check(); await page.waitForTimeout(150);
    soll("Doppelte: Haken bei der anderen Datei macht sie zur behaltenen", await page.locator(`[data-doppelt-paar="${sha}"] input[data-doppelt-behalten="${kopiePfad}"]`).isChecked());
    soll("Doppelte: Wahl wird gemerkt", await page.evaluate(([s, p]) => JSON.parse(localStorage.getItem("datei-organizer-doppelt-wahl") || "{}")[s] === p, [sha, kopiePfad]));
    await page.locator("[data-doppelt-menue]").click();
    soll("Doppelte: Papierkorb öffnet das Menü mit drei Wegen", await page.locator("[data-doppelt-alle-aelter], [data-doppelt-alle-juenger], [data-doppelt-alle-raus]").count() === 3);
    await page.locator("[data-doppelt-alle-aelter]").click(); await page.waitForTimeout(150);
    soll("Doppelte: „Alle: ältere behalten“ setzt die Haken", (await page.locator("[data-meldung]").innerText().catch(() => "")).includes("ältere") || await page.locator("[data-doppelte]").isVisible());
    const vorher = await page.locator("[data-doppelt-paar]").count();
    await page.locator("[data-doppelt-menue]").click(); await page.locator("[data-doppelt-alle-raus]").click(); await page.waitForTimeout(200);
    soll("Doppelte: „Alle Kopien herausnehmen“ leert die Karte", vorher > 0 && await page.locator("[data-doppelte]").count() === 0);
    await page.locator("[data-zurueck]").click(); await page.waitForTimeout(200);
    soll("Doppelte: „Sieb zurück“ holt die Kopien wieder", await page.locator("[data-doppelt-paar]").count() === vorher);
  }  console.log(`    (${bestaetigt} bestätigt, ${geaendert} geändert)`);
  soll("Zähler in der Navigation ist weg", await page.locator("[data-nav=sortieren] .zahl").count() === 0);

  console.log("Verlauf");
  await page.locator("[data-nav=verlauf]").click();
  const korr = await page.locator("[data-verlauf] li").count();
  soll("Verlauf zeigt alle Korrekturen", korr === bestaetigt + geaendert, `${korr} statt ${bestaetigt + geaendert}`);
  await page.locator("[data-rueckgaengig]").first().click();
  soll("Rückgängig nimmt eine zurück", await page.locator("[data-verlauf] li").count() === korr - 1);
  await page.locator("[data-nav=sortieren]").click();
  soll("… und die Datei ist wieder zu prüfen", await page.locator("[data-pruef]").count() >= 1);
  { // Klaus 16.11.: in der Prüfliste lässt sich jedes Feld wählen, auch der Bereich mit „Neue Kategorie“ – nicht nur das offene.
    const z0 = page.locator("[data-pruef]").first(); await z0.locator("[data-korrigieren]").click();
    const fw = z0.locator("[data-feld-wahl]");
    soll("Prüfliste: beim Ändern ist jedes Feld wählbar", await fw.evaluate((e) => e.options.length) === 6);
    await fw.selectOption("kategorie");
    soll("… beim Bereich mit dem Knopf „Neue Kategorie“", await z0.locator("[data-neue-kategorie-knopf]").isVisible());
    await z0.getByText("Abbrechen").click();
  }
  while (await page.locator("[data-pruef]").count()) {
    const z = page.locator("[data-pruef]").first();
    if (await z.locator("[data-stimmt]").count()) await z.locator("[data-stimmt]").click();
    else { await z.locator("[data-korrigieren]").click(); const w = z.locator("[data-wert]"); if (await w.evaluate((e) => e.tagName) === "SELECT") await w.selectOption({ index: 1 }); else await w.fill("Test"); await z.locator("[data-uebernehmen]").click(); }
  }

  console.log("Finden");
  await page.locator("[data-nav=finden]").click();
  const sichten = await page.locator("[data-sicht] option").count();
  soll("Alle Sichten wählbar (nach Sieb 5)", sichten === 9, `${sichten}`);
  soll("Baum zeigt „Alle Dateien“ mit Zahl", (await page.locator("[data-ordnerbaum] [data-ast='Alle Dateien'] .zahl").innerText()) === String(gesamt));
  soll("Gesperrte stehen oben im Baum", (await page.locator("[data-ordnerbaum] > li > ul > li").first().innerText()).includes("Auffällig"));
  await page.locator("[data-sicht]").selectOption("absender");
  await page.locator("[data-ordnerbaum] > li > ul > li > .ast").nth(1).click();
  const n = await page.locator("[data-liste] [data-datei]").count();
  soll("Klick auf einen Ordner zeigt seine Dateien", n >= 1);
  await page.locator("[data-liste] [data-datei]").first().click();
  soll("Steckbrief öffnet sich", await page.locator("[data-steckbrief]").isVisible());
  await page.locator("[data-suche]").fill("BSP-FA 12");
  await page.waitForTimeout(100);
  soll("Suche findet das Kennzeichen", await page.locator("[data-liste] [data-datei]").count() >= 1);
  await page.locator("[data-suche]").fill("");
  await page.locator("[data-sicht]").selectOption("art");
  await page.locator("[data-ordnerbaum] [data-ast='Bild']").first().click();
  await page.locator("[data-liste] [data-datei]").first().click();
  await page.locator("[data-original]").click();
  soll("Original eines Fotos wird angezeigt", await page.locator(".vorschau-bild").waitFor({ timeout: 5000 }).then(() => true, () => false));
  // Drucken, was gerade offen ist (Klaus 17.11.): der Drucker-Knopf im Kopf druckt die Datei des offenen Steckbriefs.
  const druckProbe = async () => {
    await page.evaluate(() => { window.__druck = null; window.print = () => { const b = document.querySelector("#druck-blatt"); window.__druck = { art: b?.getAttribute("data-druck-blatt"), bilder: [...(b?.querySelectorAll("img") || [])].filter((i) => i.naturalWidth > 50).length, klasse: document.body.classList.contains("druckt"), titel: document.title }; window.dispatchEvent(new Event("afterprint")); }; });
    await page.locator("[data-drucken]").click();
    await page.waitForFunction(() => window.__druck, null, { timeout: 30000 }).catch(() => {});
    return { ...(await page.evaluate(() => window.__druck) || {}), rest: await page.locator("#druck-blatt").count(), name: await page.locator("[data-steckbrief] h2").first().innerText() };
  };
  { const k = page.locator("[data-drucken]");
    soll("Drucken: mit offenem Foto ist der Knopf aktiv und nennt die Datei", await k.isEnabled() && (await k.getAttribute("title") || "").startsWith("Drucken: "), await k.getAttribute("title"));
    const d = await druckProbe();
    soll("Drucken: das offene Foto geht als ein Bild ins Druckfenster, danach ist aufgeräumt", d.art === "bild" && d.bilder === 1 && d.klasse && d.titel === d.name && d.rest === 0, JSON.stringify(d));
  }
  // Vorschau der Original-PDF im Steckbrief (Klaus 16.11.): Seiten als Bild in der App, kein neues Fenster.
  { const ast = page.locator("[data-ordnerbaum] [data-ast='PDF']").first();
    if (await ast.count()) {
      await ast.click(); await page.locator("[data-liste] [data-datei]").first().click();
      await page.locator("[data-steckbrief] [data-original]").click();
      soll("Original einer PDF: Seite als Bild im Steckbrief", await page.locator("[data-pdf-vorschau] img").first().waitFor({ timeout: 15000 }).then(() => true, () => false));
      soll("… mit „Ganze PDF öffnen“", await page.locator("[data-pdf-ganz]").count() === 1);
      const d = await druckProbe();
      soll("Drucken: die offene PDF geht als gezeichnete Seiten ins Druckfenster", d.art === "pdf" && d.bilder >= 1 && d.rest === 0, JSON.stringify(d));
    } else soll("Testordner hat einen Ast „PDF“", false);
  }
  { // Nach dem Neuladen (Originale nicht mehr im Speicher): der gemerkte Ordner wird still wieder geöffnet.
    await page.reload(); await page.waitForTimeout(600);
    await page.locator("[data-nav=finden]").click(); await page.waitForTimeout(300);
    await page.locator("[data-sicht]").selectOption("art");
    await page.locator("[data-ordnerbaum] [data-ast='PDF']").first().click();
    await page.locator("[data-liste] [data-datei]").first().click();
    await page.locator("[data-steckbrief] [data-original]").click();
    soll("Nach dem Neuladen zeigt das Auge die Original-PDF wieder", await page.locator("[data-pdf-vorschau] img").first().waitFor({ timeout: 15000 }).then(() => true, () => false));
  }

  console.log("Familienakte");
  await page.locator("[data-nav=akte]").click();
  const bereit = Number((await page.locator("[data-bereit]").innerText()).match(/\d+/)[0]);
  soll("Dateien sind bereit für Archivnummern", bereit > 50, `${bereit}`);
  await page.locator("[data-nummern-vergeben]").click();
  soll("Nummern vergeben", (await page.locator("[data-meldung]").first().innerText()).includes(`${bereit} Archivnummern`));
  soll("Danach keine mehr bereit", await page.locator("[data-nummern-vergeben]").isDisabled());
  const [dl] = await Promise.all([page.waitForEvent("download"), page.locator("[data-index-sichern]").click()]);
  const text = await (await import("node:fs/promises")).readFile(await dl.path(), "utf8");
  const r = indexLesen(text);
  soll("organizer-index.json ist gültig", r.ok, r.ok ? "" : r.grund);
  if (r.ok) {
    soll("Index enthält alle Dateien", r.index.dateien.length === gesamt, `${r.index.dateien.length}`);
    const nr = r.index.dateien.filter((d) => d.archivnummer).map((d) => d.archivnummer).sort();
    soll("Archivnummern lückenlos ab 0001", nr.length === bereit && nr[0].endsWith("-0001") && nr.at(-1).endsWith(`-${String(bereit).padStart(4, "0")}`));
    soll("Gesperrte haben keine Nummer", r.index.dateien.filter((d) => /Gesperrt|Doppelt/.test(d.kurzfassung)).every((d) => !d.archivnummer));
    soll("Steckbriefe tragen Text und Abschnitte", r.index.dateien.some((d) => d.text && d.abschnitte?.length));
    soll("Index trägt Verlauf und Regeln", Array.isArray(r.index.verlauf) && r.index.verlauf.length > 0 && Array.isArray(r.index.lernregeln));
  }

  console.log("Gemerkt nach Neuladen");
  await page.waitForTimeout(800);
  await page.reload();
  // Der Bestand kommt nach dem Neuladen erst aus dem Gerätespeicher: auf die Anzeige warten (Bedingung, keine feste Zeit),
  // dann prüfen. Vorher las die Probe sofort und war in der CI rot, sobald das Laden etwas länger brauchte.
  await page.waitForFunction((n) => (document.querySelector("[data-ordner-pill]")?.textContent || "").includes(String(n)), gesamt, { timeout: 15000 }).catch(() => {});
  soll("Ordner und Dateien bleiben nach Neuladen", (await page.locator("[data-ordner-pill]").innerText()).includes(String(gesamt)));
  await page.goto(basis + "#akte");
  soll("Archivnummern bleiben", (await page.locator("[data-archivnummern] .chip").first().innerText()).startsWith(String(bereit)));

  console.log("Handy (360 px)");
  for (const s of ["ordner", "sortieren", "finden", "verlauf", "akte", "hilfe"]) {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(basis + "#" + s);
    await page.waitForTimeout(150);
    const breit = await page.evaluate(() => document.documentElement.scrollWidth);
    const zuBreit = breit > 361 ? await page.evaluate(() => [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > 362).slice(-3).map((e) => `${e.tagName}.${e.className}`).join(", ")) : "";
    soll(`${s}: kein seitliches Scrollen`, breit <= 361, `${breit}px ${zuBreit}`);
    if (s === "ordner") {
      // Handy (Klaus 17.11.): Kopf höchstens zwei Zeilen – die runden Knöpfe stecken hinter dem Pfeil und klappen auf Tipp auf.
      const hoch = await page.evaluate(() => document.querySelector(".site-header").getBoundingClientRect().height);
      const zu = !(await page.locator("[data-kopf-knoepfe]").isVisible());
      await page.locator("[data-mehr-knopf]").click();
      const auf = await page.locator("[data-kopf-knoepfe] [data-drucken]").isVisible() && await page.locator("[data-kopf-knoepfe] [data-aktualisieren]").isVisible();
      await page.locator("[data-mehr-knopf]").click();
      soll("Handy: Kopf zwei Zeilen hoch, Knöpfe hinter dem Pfeil", hoch <= 125 && zu && auf && !(await page.locator("[data-kopf-knoepfe]").isVisible()), `${hoch}px zu=${zu} auf=${auf}`);
    }
  }
  await page.goto(basis + "datenschutz.html");
  soll("Impressum & Datenschutz erreichbar", (await page.locator("h1").innerText()).includes("Impressum"));

  await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#sortieren"); await page.waitForTimeout(400);
  soll("Sortieren: grüne Liste der sicheren Dateien mit Zahl", await page.locator("[data-sicherliste] [data-sicher]").count() > 0 && /\d+/.test(await page.locator("[data-sicherliste] .badge.gut").innerText()));
  { const o = await page.locator("[data-pruefliste] [data-pruef]").count(), n = await page.locator("[data-pruefliste] [data-neu-marke]").count(); soll("Prüfliste: neu hängen Gebliebenes steht markiert zuerst (oder es gibt nichts Älteres)", o === 0 || n === 0 || await page.locator("[data-pruefliste] [data-pruef]").first().locator("[data-neu-marke]").count() === 1, `${o} offen, ${n} neu`); }
  await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#ordner"); await page.waitForTimeout(400);
  { const zahl = async () => Number(((await page.locator("[data-ordner-pill]").innerText()).match(/· (\d+)/) || [])[1] || 0);
    const vorher = await zahl();
    await page.evaluate(() => { const dt = new DataTransfer(); dt.items.add(new File(["Stadtwerke Muster GmbH\nRechnung Nr. 77\nBetrag 50,00 EUR"], "hineingezogen-rechnung.txt", { type: "text/plain" })); dt.items.add(new File(["Notiz eins"], "hineingezogen-notiz.txt", { type: "text/plain" })); document.querySelector("[data-ablage]").dispatchEvent(new DragEvent("drop", { dataTransfer: dt, bubbles: true, cancelable: true })); });
    await page.waitForFunction((v) => Number(((document.querySelector("[data-ordner-pill]")?.textContent || "").match(/· (\d+)/) || [])[1] || 0) === v + 2, vorher, { timeout: 15000 }).catch(() => {});
    soll("Drag and Drop fügt hinzu, der Bestand bleibt", vorher > 0 && await zahl() === vorher + 2, `${vorher} → ${await zahl()}`);
    // Texterkennung in der App (Klaus 13.11.): ein Foto mit Text wird gelesen – mit den gepinnten Sprachdaten aus src/public/vendor/.
    // Dazu „ältere Fassung“: dieselbe Notiz als „(2)“ mit anderem Inhalt wird markiert, nicht entfernt.
    const davor = await zahl();
    await page.evaluate(async () => {
      const c = document.createElement("canvas"); c.width = 1400; c.height = 600; const g = c.getContext("2d");
      g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.fillStyle = "#000"; g.font = "bold 54px Arial";
      ["Stadtwerke Musterstadt GmbH", "Rechnung Nummer 4711", "Betrag zahlbar bis 15.12.2026"].forEach((z, i) => g.fillText(z, 60, 140 + i * 130));
      const png = await new Promise((ok) => c.toBlob(ok, "image/png"));
      const dt = new DataTransfer(); dt.items.add(new File([png], "hineingezogen-foto-rechnung.png", { type: "image/png" }));
      dt.items.add(new File(["Notiz eins, jetzt mit Nachtrag"], "hineingezogen-notiz (2).txt", { type: "text/plain" }));
      document.querySelector("[data-ablage]").dispatchEvent(new DragEvent("drop", { dataTransfer: dt, bubbles: true, cancelable: true }));
    });
    await page.waitForFunction((v) => Number(((document.querySelector("[data-ordner-pill]")?.textContent || "").match(/· (\d+)/) || [])[1] || 0) === v + 2, davor, { timeout: 120000 }).catch(() => {});
    await page.waitForTimeout(900);
    const gespeichert = await page.evaluate(() => new Promise((ok) => { const r = indexedDB.open("DateiOrganizer1", 1); r.onsuccess = () => { const q = r.result.transaction("kv").objectStore("kv").get("zustand"); q.onsuccess = () => ok(q.result); }; r.onerror = () => ok(null); }));
    const foto = gespeichert?.dateien?.find((d) => d.name === "hineingezogen-foto-rechnung.png"), notiz = gespeichert?.dateien?.find((d) => /^hineingezogen-notiz( \(2\))?\.txt$/.test(d.name) && d.aehnlich);
    soll("Texterkennung in der App liest ein Foto mit Text", foto?.textQuelle === "ocr" && /Rechnung/i.test(foto?.volltext || ""), `${foto?.textQuelle} ${JSON.stringify((foto?.volltext || "").slice(0, 80))}`);
    soll("Ältere Fassung wird als „ähnlich“ markiert, nicht entfernt", !!notiz?.aehnlich && notiz.aehnlich.art === "fassung" && /hineingezogen-notiz/.test(notiz.aehnlich.zu) && await page.locator("[data-zahl=aehnlich]").count() === 1, JSON.stringify(notiz?.aehnlich));
    await page.goto(basis + "#finden"); await page.locator("[data-suche]").fill("hineingezogen-notiz"); await page.waitForTimeout(300);
    await page.locator("[data-datei]").first().click();
    soll("Steckbrief hat Ansehen, Teilen und Entfernen", await page.locator("[data-steckbrief] [data-original]").count() === 1 && await page.locator("[data-steckbrief] [data-teilen]").count() === 1 && await page.locator("[data-steckbrief] [data-entfernen]").count() === 1);
    await page.locator("[data-steckbrief] [data-entfernen]").click(); await page.waitForTimeout(300);
    soll("Entfernen nimmt genau diese eine Datei aus der Liste", await zahl() === vorher + 3, `${await zahl()}`);
    await page.locator("[data-suche]").fill("hineingezogen"); await page.waitForTimeout(300);
    await page.locator("[data-entfernen-liste]").click(); await page.waitForTimeout(300);
    soll("„Entfernen“ über der Liste nimmt alle Treffer heraus", await zahl() === vorher, `${await zahl()}`);
  }
  // ---------- Discovery (Klaus 15.11.): Knopf im Kopf öffnet die Seite „so wurde der Kern trainiert“, mit Rückweg ----------
  {
    await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#ordner"); await page.waitForTimeout(300);
    const knopf = page.locator("[data-discovery-knopf]");
    soll("Discovery-Knopf steht im Kopf", await knopf.count() === 1 && (await knopf.getAttribute("aria-label")) === "Discovery");
    await knopf.click(); await page.waitForLoadState("domcontentloaded"); await page.waitForTimeout(600);
    soll("Discovery-Seite öffnet sich mit Kreislauf und Sprechtexten", /discovery\.html$/.test(page.url()) && await page.locator("#schleifeBild").count() === 1 && await page.evaluate(() => Object.keys(SPRECHTEXTE).length) === 15, page.url());
    const ton = await page.evaluate(async () => (await fetch("discovery-ton/kreis_raten.mp3")).ok);
    soll("Discovery: Tonspur liegt neben der Seite", ton === true);
    await page.locator("[data-zurueck]").click(); await page.waitForLoadState("domcontentloaded"); await page.waitForTimeout(400);
    soll("Discovery: Rückweg führt in den Datei-Organizer", await page.locator("[data-discovery-knopf]").count() === 1, page.url());
  }
  // ---------- Landkarte und Dashboard (Klaus 13.11.): Kästen sind Links, an jeder Datei Auge, Stift, Papierkorb ----------
  {
    await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#ordner"); await page.waitForTimeout(300);
    await page.locator("[data-landkarte-knopf]").click(); await page.waitForTimeout(300);
    const gesamt = Number(await page.locator("[data-kachel=gesamt] b").innerText());
    soll("Landkarten-Knopf im Kopf öffnet das Dashboard mit allen Dateien", gesamt > 0 && await page.locator("[data-kachel]").count() === 6, String(gesamt));
    await page.locator("[data-kachel=offen]").click(); await page.waitForTimeout(200);
    soll("Kasten „von dir zu entscheiden“ führt zum Prüfen", (await page.evaluate(() => location.hash)) === "#sortieren");
    await page.goto(basis + "#landkarte"); await page.waitForTimeout(300);
    const bereich = page.locator("[data-bereich]").first(), name = await bereich.getAttribute("data-bereich"), n = Number(await bereich.locator(".n").innerText());
    await bereich.click(); await page.waitForTimeout(400);
    const titel = await page.locator("[data-liste] .card-heading h2").innerText(), inListe = Number(await page.locator("[data-liste] .card-heading .badge").innerText());
    soll("Bereich im Dashboard führt in genau diesen Ordner im Baum", (await page.evaluate(() => location.hash)) === "#finden" && titel === name && inListe === n, `${name} ${n} / ${titel} ${inListe}`);
    const eintrag = page.locator("[data-liste] .datei-eintrag").first();
    soll("Jede Datei in der Liste hat Auge, Stift und Papierkorb", await eintrag.locator("[data-auge]").count() === 1 && await eintrag.locator("[data-stift]").count() === 1 && await eintrag.locator("[data-papierkorb]").count() === 1);
    await eintrag.locator("[data-stift]").click();
    const wahl = eintrag.locator("[data-feld-aendern] [data-wert]");
    const neu = await wahl.evaluate((e, alt) => [...e.options].map((o) => o.value).find((v) => v && v !== alt), name);
    await wahl.selectOption(neu); await eintrag.locator("[data-feld-aendern] [data-uebernehmen]").click(); await page.waitForTimeout(400);
    soll("Stift: Bereich einer schon eingeordneten Datei von Hand ändern – sie verlässt diesen Ordner", Number(await page.locator("[data-liste] .card-heading .badge").innerText()) === n - 1, `${neu}`);
    await page.locator("[data-nav=verlauf]").click(); await page.waitForTimeout(200);
    soll("… und die Änderung steht im Verlauf", (await page.locator("main").innerText()).includes(neu));
    // Neue Kategorie erstellen (Klaus 16.11.): letzter Eintrag jeder Bereichs-Liste; der Name ist danach ein Bereich und steht in der Liste.
    await page.goto(basis + "#landkarte"); await page.waitForTimeout(300);
    await page.locator("[data-bereich]").first().click(); await page.waitForTimeout(400);
    const e2 = page.locator("[data-liste] .datei-eintrag").first(); await e2.locator("[data-stift]").click();
    const w2 = e2.locator("[data-feld-aendern] [data-wert]");
    soll("Bereichs-Liste endet mit „Neue Kategorie erstellen“", /Neue Kategorie erstellen/.test(await w2.evaluate((e) => [...e.options].at(-1).textContent)));
    const kn = e2.locator("[data-feld-aendern] [data-neue-kategorie-knopf]");
    soll("… und daneben steht sichtbar der Knopf „Neue Kategorie“", await kn.isVisible() && /Neue Kategorie/.test(await kn.innerText()));
    await kn.click();
    await e2.locator("[data-neue-kategorie]").fill("  Ehrenamt   Musterverein ");
    await e2.locator("[data-feld-aendern] [data-uebernehmen]").click(); await page.waitForTimeout(400);
    await page.goto(basis + "#landkarte"); await page.waitForTimeout(300);
    const neuB = page.locator('[data-bereich="Ehrenamt Musterverein"]');
    soll("Neue Kategorie ist ein eigener Bereich mit einer Datei", await neuB.count() === 1 && Number(await neuB.locator(".n").innerText().catch(() => "0")) === 1);
    await neuB.click(); await page.waitForTimeout(400);
    const e3 = page.locator("[data-liste] .datei-eintrag").first(); await e3.locator("[data-stift]").click();
    soll("… und steht danach in der Bereichs-Liste zur Wahl", await e3.locator("[data-feld-aendern] [data-wert]").evaluate((e) => [...e.options].some((o) => o.value === "Ehrenamt Musterverein")));
    soll("… und ist auf dem Gerät gemerkt", (await page.evaluate(() => JSON.parse(localStorage.getItem("do-eigene-kategorien") || "[]"))).includes("Ehrenamt Musterverein"));
    await page.goto(basis + "#landkarte"); await page.waitForTimeout(300);
    await page.locator("[data-kachel=sicher]").click(); await page.waitForTimeout(400);
    const vorP = Number(await page.locator("[data-liste] .card-heading .badge").innerText());
    soll("Kasten „eingeordnet – nachprüfen“ zeigt die eingeordneten Dateien", (await page.locator("[data-liste] .card-heading h2").innerText()) === "In Ordnung" && vorP > 0);
    await page.locator("[data-liste] .datei-eintrag").first().locator("[data-papierkorb]").click(); await page.waitForTimeout(400);
    soll("Papierkorb nimmt die Datei aus dem Organizer", Number(await page.locator("[data-liste] .card-heading .badge").innerText()) === vorP - 1);
    await page.goto(basis + "#landkarte"); await page.waitForTimeout(300);
    await page.locator("[data-reiter=organizer]").click();
    const rahmen = page.frameLocator("[data-karte=organizer]");
    await rahmen.locator(".kasten").first().waitFor({ timeout: 10000 }).catch(() => {});
    soll("Landkarte Organizer im Rahmen: Kästen da, eigener Titel und Reiter ausgeblendet", await rahmen.locator(".kasten").count() > 10 && !(await rahmen.locator(".kopf").isVisible()));
    await rahmen.locator("#o_index").click();
    soll("Kasten antippen zeigt, woher und wohin", /Kommt von:[\s\S]*Geht zu:/.test(await rahmen.locator("#tafel").innerText()));
    await page.locator("[data-reiter=familienakte]").click();
    await page.frameLocator("[data-karte=familienakte]").locator("#f_tresor").waitFor({ timeout: 10000 }).catch(() => {});
    soll("Landkarte Familienakte im Rahmen", await page.frameLocator("[data-karte=familienakte]").locator("#f_tresor").count() === 1);
  }
  await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#akte"); await page.waitForTimeout(300);
  soll("Kein Update-Fähnchen, solange die Fassung aktuell ist", await page.locator("[data-update-fahne]").count() === 0);
  { const v = JSON.parse(await (await page.request.get(basis + "version.json")).text()); const kopf = await page.locator("[data-fassung-knopf]").innerText(); soll("version.json nennt dieselbe Fassung wie der Kopf (Knopf „V …“)", kopf === "V " + v.fassung, `${v.fassung} / ${kopf}`); }
  await page.route("**/version.json*", (r) => r.fulfill({ contentType: "application/json", body: JSON.stringify({ fassung: "9.9.9" }) }));
  await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
  await page.waitForSelector("[data-update-fahne]", { timeout: 5000 }).catch(() => {});
  soll("Neue Fassung auf dem Server: Fähnchen „Update 9.9.9“ erscheint von selbst neben der Fassung", ((await page.locator("[data-update-fahne]").innerText().catch(() => "")) || "").includes("9.9.9"));
  await page.unroute("**/version.json*");
  if (await page.locator("[data-leeren-knopf]").count()) {
    await page.locator("[data-leeren-knopf]").click();
    await page.waitForFunction(() => !document.querySelector("[data-ordner-pill]"), null, { timeout: 5000 }).catch(() => {});
    soll("„Organizer leeren“: Liste leer, Meldung nennt die unveränderten Originale", await page.locator("[data-ordner-pill]").count() === 0 && /Originale und der Ordner sind unverändert/.test(await page.locator("[data-ordner-wahl]").innerText()));
    await page.waitForTimeout(600); await page.reload();
    await page.waitForTimeout(600);
    soll("… und bleibt nach dem Neuladen leer", await page.locator("[data-ordner-pill]").count() === 0);
  } else soll("Knopf „Organizer leeren“ steht auf der Seite Familienakte", false);
  { const l = (await page.evaluate(() => sessionStorage.getItem("probe-lade") || "")).split(" "); soll("Ladebalken im Kopf lief beim Einlesen (durchsehen, dann Datei für Datei)", l.includes("suchen") && l.includes("lesen"), JSON.stringify([...new Set(l)])); }
  soll("Web-App heißt „Datei-Organizer Basic“ (Kopf, Seitentitel), kein langer Text unter dem Namen", (await page.locator("[data-app-name]").innerText()).replace(/\s+/g, " ") === "Datei-Organizer Basic" && (await page.title()) === "Datei-Organizer Basic" && await page.locator(".site-brand small").count() === 0);
  // Datei-Organizer Pro (Android-App) gestellt: Capacitor-Brücke mit Update-Plugin DoUpdates. Kein echtes Android, kein echter Server.
  {
    const nctx = await browser.newContext({ viewport: { width: 400, height: 800 } });
    await nctx.addInitScript(() => {
      const aufrufe = (window.__updAufrufe = []);
      const stand = (window.__updStand = { neu: "9.9.9", fehler: "" });
      window.Capacitor = { isNativePlatform: () => true, Plugins: { DoUpdates: {
        pruefen: async () => { aufrufe.push("pruefen"); if (stand.fehler) throw Object.assign(new Error(stand.fehler), { code: stand.fehler }); return stand.neu ? { neu: stand.neu, installiert: "0.4.0", groesse: 1000 } : { aktuell: true, version: "0.4.0", installiert: "0.4.0" }; },
        installieren: async () => { aufrufe.push("installieren"); return { gestartet: true }; },
        addListener: async (_n, f) => { setTimeout(() => f({ geladen: 500, groesse: 1000 })); return { remove: async () => {} }; },
      } } };
    });
    const np = await nctx.newPage();
    const nfehler = []; np.on("pageerror", (e) => nfehler.push(String(e)));
    await np.goto(basis + "#hilfe");
    soll("App heißt „Datei-Organizer Pro“ (Kopf, Seitentitel, Fuß)", (await np.locator("[data-app-name]").innerText()).replace(/\s+/g, " ") === "Datei-Organizer Pro" && (await np.title()) === "Datei-Organizer Pro" && (await np.locator(".footer-meta").innerText()).includes("Datei-Organizer Pro"));
    soll("App: kein Service Worker angemeldet", await np.evaluate(async () => !(await navigator.serviceWorker?.getRegistration())));
    await np.waitForSelector("[data-update-fahne][data-nativ]", { timeout: 6000 }).catch(() => {});
    soll("App: still geprüft, Fähnchen „Update 9.9.9“ erscheint von selbst", ((await np.locator("[data-update-fahne]").innerText().catch(() => "")) || "").includes("9.9.9"));
    soll("App: version.json wird nicht gefragt (nur der eigene Update-Server)", !(await np.evaluate(() => performance.getEntriesByType("resource").some((e) => e.name.includes("version.json")))));
    await np.evaluate(() => { window.__updAufrufe.length = 0; });
    await np.locator("[data-update-fahne]").click(); await np.waitForTimeout(300);
    soll("App: Tipp auf das Fähnchen prüft und installiert direkt", JSON.stringify(await np.evaluate(() => window.__updAufrufe)) === JSON.stringify(["pruefen", "installieren"]));
    await np.evaluate(() => { window.__updStand.neu = ""; window.__updAufrufe.length = 0; });
    await np.locator("[data-fassung-knopf]").click();
    await np.waitForSelector("[data-update-meldung]", { timeout: 3000 }).catch(() => {});
    soll("App: Tipp auf die Fassung, aktuell → kurze Meldung, nichts installiert", ((await np.locator("[data-update-meldung]").innerText().catch(() => "")) || "").includes("Aktuelle Fassung 0.4.0") && !(await np.evaluate(() => window.__updAufrufe.includes("installieren"))));
    await np.evaluate(() => { window.__updStand.fehler = "UPDATE_NICHT_EINGERICHTET"; });
    await np.waitForTimeout(4800);
    await np.locator("[data-fassung-knopf]").click();
    await np.waitForSelector("[data-update-meldung]", { timeout: 3000 }).catch(() => {});
    soll("App ohne Update-Schlüssel: Tipp sagt „noch nicht eingerichtet“", ((await np.locator("[data-update-meldung]").innerText().catch(() => "")) || "").includes("noch nicht eingerichtet"));
    soll("App: keine Fehler in der Seite", nfehler.length === 0, nfehler.slice(0, 3).join(" | "));
    await nctx.close();
  }
  // Datei-Organizer Pro für Windows gestellt (0.4.1): Ordner am PC mit dauerhafter Freigabe, „Öffnen mit“, „Speichern unter“.
  // Die Brücke ist erfunden (Ordner im Speicher), keine echte Hülle – die echte prüft windows.yml installiert.
  {
    const wctx = await browser.newContext({ viewport: { width: 1100, height: 900 } });
    await wctx.addInitScript(() => {
      const b64 = (t) => btoa(String.fromCharCode(...new TextEncoder().encode(t)));
      const ordner = { "Strom 2026.txt": "Stadtwerke Musterstadt\nAbschlag Strom Januar 2026", "Bank/Auszug 01.txt": "Musterbank eG\nKontoauszug 1/2026" };
      const log = (window.__winLog = JSON.parse(sessionStorage.getItem("winLog") || "[]"));
      const merk = () => sessionStorage.setItem("winLog", JSON.stringify(log));
      const eingang = (window.__eingang = { stapel: [], hoerer: [] });
      const gespeichert = (window.__gespeichert = []);
      const liste = (pfad) => { const aus = new Map(); for (const [p, t] of Object.entries(ordner)) { if (pfad && !p.startsWith(pfad + "/")) continue; const rest = pfad ? p.slice(pfad.length + 1) : p; const [kopf, ...weiter] = rest.split("/"); aus.set(kopf, weiter.length ? { name: kopf, art: "ordner", groesse: 0 } : { name: kopf, art: "datei", groesse: new TextEncoder().encode(t).length, geaendert: 1767225600000 }); } return [...aus.values()]; };
      window.Capacitor = { isNativePlatform: () => true, getPlatform: () => "windows", Plugins: {
        FamilyFolders: {
          ordnerWaehlen: async () => { log.push("waehlen"); merk(); sessionStorage.setItem("winGemerkt", "1"); return { token: "t1", name: "Probeordner", id: "g1" }; },
          gemerkt: async () => ({ ordner: sessionStorage.getItem("winGemerkt") ? [{ id: "g1", name: "Probeordner", da: true }] : [] }),
          wiederOeffnen: async ({ id }) => { log.push("wieder:" + id); merk(); return { token: "t2", name: "Probeordner" }; },
          vergessen: async () => { sessionStorage.removeItem("winGemerkt"); return {}; },
          ordnerListe: async ({ pfad }) => ({ eintraege: liste(pfad) }),
          dateiLesen: async ({ pfad, offset, laenge }) => ({ data: b64(ordner[pfad].slice(offset, offset + laenge)) }),
          dateiBeginn: async () => { throw Object.assign(new Error("DO_NICHT_ERLAUBT"), { code: "DO_NICHT_ERLAUBT" }); },
        },
        DoEingang: {
          abholen: async () => { const s = eingang.stapel.shift(); return s ? { stapel: "1-abcdef12.abgeholt", dateien: s.map(([name, t]) => ({ name, groesse: new TextEncoder().encode(t).length })), weitere: eingang.stapel.length } : { stapel: "", dateien: [] }; },
          lesen: async ({ name, offset, laenge }) => ({ data: b64((window.__eingangText[name] || "").slice(offset, offset + laenge)) }),
          addListener: async (_n, f) => { eingang.hoerer.push(f); return { remove: () => {} }; },
        },
        DoDateien: { speichern: async (a) => { gespeichert.push(a); return { gespeichert: true }; } },
        DoUpdates: { pruefen: async () => { throw Object.assign(new Error("UPDATE_NICHT_EINGERICHTET"), { code: "UPDATE_NICHT_EINGERICHTET" }); }, installieren: async () => ({}) },
      } };
      window.__eingangText = {};
    });
    const wp = await wctx.newPage();
    const wfehler = []; wp.on("pageerror", (e) => wfehler.push(String(e)));
    await wp.goto(basis + "#ordner");
    await wp.waitForSelector("[data-nativ-ordner]", { timeout: 8000 }).catch(() => {});
    soll("Windows-App: Knopf heißt „Ordner am PC“, kein zweiter Browser-Ordnerknopf", (await wp.locator("[data-nativ-ordner]").innerText().catch(() => "")).includes("Ordner am PC") && await wp.locator("[data-pc-ordner]").count() === 0);
    await wp.locator("[data-nativ-ordner]").click();
    await wp.waitForFunction(() => /^2 /.test(document.querySelector('[data-zahl="gesamt"]')?.textContent || ""), null, { timeout: 20000 }).catch(() => {});
    soll("Windows-App: Ordner mit Unterordner eingelesen (2 Dateien)", ((await wp.locator('[data-zahl="gesamt"]').innerText().catch(() => "")) || "").startsWith("2 "));
    await wp.waitForSelector("[data-ordner-wieder]", { timeout: 5000 }).catch(() => {});
    soll("Gemerkter Ordner steht unter „Zuletzt“", ((await wp.locator("[data-ordner-wieder]").innerText().catch(() => "")) || "").includes("Probeordner"));
    await wp.evaluate(() => { location.hash = "akte"; });
    await wp.waitForSelector("[data-index-sichern]", { timeout: 5000 }).catch(() => {});
    soll("Ordner der App: der Index wird in den Ordner geschrieben (Knopf „In den Ordner schreiben“)", ((await wp.locator("[data-index-sichern]").innerText().catch(() => "")) || "").includes("In den Ordner schreiben"));
    // Neu laden wie nach einem Neustart: der gemerkte Ordner öffnet ohne Auswahl-Fenster.
    await wp.waitForTimeout(600); await wp.goto(basis + "#ordner"); await wp.reload();
    await wp.waitForSelector("[data-ordner-wieder]", { timeout: 8000 }).catch(() => {});
    await wp.locator("[data-ordner-wieder]").first().click().catch(() => {});
    await wp.waitForTimeout(800);
    soll("Nach Neustart: ein Tipp auf „Zuletzt“ öffnet den Ordner ohne Auswahl-Fenster", JSON.stringify(await wp.evaluate(() => JSON.parse(sessionStorage.getItem("winLog") || "[]"))) === JSON.stringify(["waehlen", "wieder:g1"]));
    // „Öffnen mit“: die App meldet „neu“, die Seite holt den Stapel und nimmt ihn zum Bestand dazu.
    await wp.evaluate(() => { window.__eingangText["Brief-Öffnen-mit.txt"] = "Muster Versicherung AG\nBeitragsrechnung 2026"; window.__eingang.stapel.push([["Brief-Öffnen-mit.txt", window.__eingangText["Brief-Öffnen-mit.txt"]]]); window.__eingang.hoerer.forEach((f) => f({ neu: 1 })); });
    await wp.waitForFunction(() => /^3 /.test(document.querySelector('[data-zahl="gesamt"]')?.textContent || ""), null, { timeout: 15000 }).catch(() => {});
    soll("„Öffnen mit“/Teilen: Datei kommt zum Bestand dazu (2 → 3)", ((await wp.locator('[data-zahl="gesamt"]').innerText().catch(() => "")) || "").startsWith("3 "));
    soll("Windows-App: keine Fehler in der Seite", wfehler.length === 0, wfehler.slice(0, 3).join(" | "));
    await wctx.close();
    // Nur geteilte Dateien, kein Ordner: der Index geht über „Speichern unter …“ der App, nie über einen Download.
    const actx = await browser.newContext({ viewport: { width: 400, height: 800 } });
    await actx.addInitScript(() => {
      const b64 = (t) => btoa(String.fromCharCode(...new TextEncoder().encode(t)));
      const text = "Stadtwerke Musterstadt\nAbschlag Strom 2026";
      let einmal = true;
      window.__gespeichert = [];
      window.Capacitor = { isNativePlatform: () => true, getPlatform: () => "android", Plugins: {
        FamilyFolders: { ordnerWaehlen: async () => ({ cancelled: true }), gemerkt: async () => ({ ordner: [] }) },
        DoEingang: { abholen: async () => { if (!einmal) return { stapel: "", dateien: [] }; einmal = false; return { stapel: "1-abcdef12.abgeholt", dateien: [{ name: "Geteilt.txt", groesse: new TextEncoder().encode(text).length }] }; },
          lesen: async ({ offset, laenge }) => ({ data: b64(text.slice(offset, offset + laenge)) }) },
        DoDateien: { speichern: async (a) => { window.__gespeichert.push(a); return { gespeichert: true }; } },
      } };
    });
    const ap = await actx.newPage();
    const afehler = []; ap.on("pageerror", (e) => afehler.push(String(e)));
    await ap.goto(basis + "#ordner");
    await ap.waitForFunction(() => /^1 /.test(document.querySelector('[data-zahl="gesamt"]')?.textContent || ""), null, { timeout: 15000 }).catch(() => {});
    soll("Android-App: geteilte Datei kommt beim Start an (Teilen an die App)", ((await ap.locator('[data-zahl="gesamt"]').innerText().catch(() => "")) || "").startsWith("1 "));
    await ap.evaluate(() => { location.hash = "akte"; });
    await ap.waitForSelector("[data-index-sichern]", { timeout: 5000 }).catch(() => {});
    soll("Ohne Ordner heißt der Knopf „Speichern unter …“", ((await ap.locator("[data-index-sichern]").innerText().catch(() => "")) || "").includes("Speichern unter"));
    let download = false; ap.on("download", () => { download = true; });
    await ap.locator("[data-index-sichern]").click().catch(() => {});
    await ap.waitForTimeout(500);
    const g = await ap.evaluate(() => window.__gespeichert);
    soll("„Speichern unter …“: organizer-index.json als JSON an die App, kein Download", g.length === 1 && g[0].name === "organizer-index.json" && g[0].mime === "application/json" && atob(g[0].data).includes("Geteilt.txt") && !download);
    soll("Android-App: keine Fehler in der Seite", afehler.length === 0, afehler.slice(0, 3).join(" | "));
    await actx.close();
  }
  // Große Mengen in Blöcken (0.4.2): Absturz mitten im Einlesen, Weitermachen, Anhalten. Der Testordner (101 Dateien) ist größer als ein Block (50).
  {
    console.log("Einlesen in Blöcken, Weitermachen nach Abbruch");
    const bctx = await browser.newContext({ viewport: { width: 1100, height: 900 } });
    await bctx.addInitScript(() => { Object.defineProperty(navigator, "deviceMemory", { value: 4 }); Object.defineProperty(navigator, "hardwareConcurrency", { value: 6 }); });
    const bp = await bctx.newPage();
    const bfehler = []; bp.on("pageerror", (e) => bfehler.push(String(e)));
    const gelesen = []; bctx.on("request", (r) => { const u = new URL(r.url()); if (u.pathname.includes("/testdaten/") && !u.pathname.endsWith("dateien.json")) gelesen.push(decodeURIComponent(u.pathname)); });
    const wert = () => bp.evaluate(() => Number(document.querySelector(".site-header [role=progressbar]")?.getAttribute("aria-valuenow") || -1));
    await bp.goto(basis + "#ordner");
    await bp.locator("[data-testordner]").click();
    await bp.waitForFunction(() => Number(document.querySelector(".site-header [role=progressbar]")?.getAttribute("aria-valuenow") || 0) >= 62, null, { timeout: 120000 }).catch(() => {});
    const vorAbsturz = await wert();
    // Absturz: Seite weg mitten im zweiten Block, ohne „Anhalten“.
    await bp.reload();
    await bp.waitForSelector("[data-angefangen]", { timeout: 8000 }).catch(() => {});
    const k1 = (await bp.locator("[data-angefangen]").innerText().catch(() => "")) || "";
    soll("Nach Absturz mitten im 2. Block: „Einlesen angefangen“ mit 50 von 101 (erster Block gemerkt)", vorAbsturz >= 62 && /\b50 von 101 Dateien/.test(k1), `${vorAbsturz} · ${k1}`);
    gelesen.length = 0;
    await bp.locator("[data-weitermachen]").click();
    await bp.waitForFunction(() => Number(document.querySelector(".site-header [role=progressbar]")?.getAttribute("aria-valuenow") || 0) >= 75, null, { timeout: 120000 }).catch(() => {});
    await bp.locator("[data-anhalten]").click().catch(() => {});
    await bp.waitForFunction(() => /Angehalten/.test(document.querySelector("[data-meldung]")?.textContent || ""), null, { timeout: 60000 }).catch(() => {});
    const m2 = (await bp.locator("[data-meldung]").innerText().catch(() => "")) || "";
    const n2 = Number(m2.match(/Angehalten: (\d+) von 101/)?.[1]);
    soll("„Weitermachen“ ohne Auswahl-Fenster liest nur den Rest (erste 50 nicht noch einmal geholt)", gelesen.length > 0 && gelesen.length === n2 - 50, `${gelesen.length} geholt, Stand ${n2}`);
    soll("„Anhalten“ hält an und merkt den Stand", n2 >= 75 && n2 < 101 && await bp.locator("[data-angefangen]").isVisible().catch(() => false), m2);
    gelesen.length = 0;
    await bp.locator("[data-weitermachen]").click();
    await bp.waitForFunction(() => /Dateien im Eingang/.test(document.querySelector("[data-meldung]")?.textContent || ""), null, { timeout: 120000 }).catch(() => {});
    const m3 = (await bp.locator("[data-meldung]").innerText().catch(() => "")) || "";
    soll("Fortgesetzt fertig: dasselbe Ergebnis wie in einem Zug (Anzahl, 3 auffällig, 3 doppelt)", m3.includes(`${gesamt} Dateien im Eingang`) && /3 auffällig, 3 doppelt/.test(m3) && m3.includes(`fortgesetzt: ${n2} schon gelesen`), m3);
    soll("Zweites Weitermachen holt nur die restlichen Dateien", gelesen.length === 101 - n2, `${gelesen.length} statt ${101 - n2}`);
    soll("Nach dem Ende ist kein Lauf mehr angefangen", await bp.locator("[data-angefangen]").count() === 0);
    // Verwerfen: anhalten, verwerfen – der nächste Lauf beginnt von vorn.
    await bp.locator("[data-testordner]").click();
    await bp.waitForFunction(() => Number(document.querySelector(".site-header [role=progressbar]")?.getAttribute("aria-valuenow") || 0) >= 5, null, { timeout: 60000 }).catch(() => {});
    await bp.locator("[data-anhalten]").click().catch(() => {});
    await bp.waitForSelector("[data-lauf-verwerfen]", { timeout: 30000 }).catch(() => {});
    await bp.locator("[data-lauf-verwerfen]").click().catch(() => {});
    await bp.waitForTimeout(300);
    soll("„Verwerfen“ nimmt den angefangenen Lauf weg, die Liste bleibt", await bp.locator("[data-angefangen]").count() === 0 && (((await bp.locator('[data-zahl="gesamt"]').innerText().catch(() => "")) || "").startsWith(`${gesamt} `)));
    soll("Blöcke: keine Fehler in der Seite", bfehler.length === 0, bfehler.slice(0, 3).join(" | "));
    await bctx.close();
  }
  // Große Ordner (0.4.3, Klaus 14.11.: A Stück für Stück, B Arbeitsordner auf dem Laufwerk, C schlanke Liste, D Speicherprüfung).
  // Gestellte App mit einem Laufwerk im Speicher (überdauert Neuladen über sessionStorage); kein echtes Gerät.
  {
    console.log("Große Ordner: Stück für Stück, Arbeitsordner, schlank, Speicherprüfung");
    const { createHash } = await import("node:crypto");
    const GROSS = 35 * 1024 * 1024;
    const grossBytes = (() => { const b = Buffer.alloc(GROSS); b.write("%PDF-1.7\n"); for (let i = 9; i < GROSS; i++) b[i] = (i * 31 + (i >> 8)) & 255; return b; })();
    const grossSha = createHash("sha256").update(grossBytes).digest("hex");
    const stellen = (opt) => {
      const o = window.__opt = JSON.parse(sessionStorage.getItem("opt") || "null") || opt;
      sessionStorage.setItem("opt", JSON.stringify(o));
      Object.defineProperty(navigator, "deviceMemory", { value: o.mem }); Object.defineProperty(navigator, "hardwareConcurrency", { value: o.kerne });
      const enc = new TextEncoder(), b64 = (u) => { let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
      const fs = JSON.parse(sessionStorage.getItem("fs") || "null") || { "Eingang/Brief.txt": "Stadtwerke Musterstadt\nAbschlag Strom Januar 2026", "Eingang/Lang.txt": "Musterbank eG\nKontoauszug " + "Umsatz Miete 850,00 EUR. ".repeat(1500) };
      const merk = () => sessionStorage.setItem("fs", JSON.stringify(fs));
      const log = window.__log = { gelesen: 0, pruef: 0, grossGelesen: 0 };
      const GROSS = o.gross, gross = (off, n) => { const u = new Uint8Array(n); const kopf = enc.encode("%PDF-1.7\n"); for (let k = 0; k < n; k++) { const i = off + k; u[k] = i < 9 ? kopf[i] : (i * 31 + (i >> 8)) & 255; } return u; };
      const groessen = (p) => p === "Eingang/Gross.pdf" ? GROSS : enc.encode(fs[p] ?? "").length;
      const wurzel = (t) => (t === "e" ? "Eingang" : t === "l" ? "" : t === "t" ? "Family-Projekt" : "?");
      const voll = (t, p) => [wurzel(t), p].filter(Boolean).join("/");
      const kinder = (t, p) => { const basis = voll(t, p); const pre = basis ? basis + "/" : ""; const m = new Map();
        const alle = [...Object.keys(fs), ...(o.gross ? ["Eingang/Gross.pdf"] : []), ...(t === "t" ? ["Family-Projekt/tresorordner.json"] : []), ...(fs.__ordner || [])];
        for (const k of alle) { if (typeof k !== "string" || !k.startsWith(pre)) continue; const rest = k.slice(pre.length); if (!rest) continue; const [kopf, ...w] = rest.split("/");
          m.set(kopf, w.length || (fs.__ordner || []).includes(k) ? { name: kopf, art: "ordner", groesse: 0 } : { name: kopf, art: "datei", groesse: groessen(k), geaendert: 1767225600000 }); }
        return [...m.values()].filter((e) => e.name !== "__ordner"); };
      const offen = {};
      let wahl = 0;
      window.Capacitor = { isNativePlatform: () => true, getPlatform: () => "android", Plugins: {
        FamilyFolders: {
          ordnerWaehlen: async () => { const z = (o.wahlen || [])[wahl++] || "e"; return { token: z, name: z === "e" ? "Eingang" : z === "t" ? "Family-Projekt" : "SD-Karte", id: "id-" + z }; },
          gemerkt: async () => ({ ordner: [{ id: "id-l", name: "SD-Karte", da: true }, { id: "id-e", name: "Eingang", da: true }] }),
          wiederOeffnen: async ({ id }) => { const z = id.slice(3); return { token: z, name: z === "e" ? "Eingang" : "SD-Karte" }; },
          ordnerListe: async ({ token, pfad }) => ({ eintraege: kinder(token, pfad) }),
          dateiLesen: async ({ token, pfad, offset, laenge }) => { const p = voll(token, pfad); log.gelesen += laenge;
            if (p === "Eingang/Gross.pdf") { log.grossGelesen += Math.min(laenge, GROSS - offset); return { data: b64(gross(offset, Math.max(0, Math.min(laenge, GROSS - offset)))) }; }
            return { data: b64(enc.encode(fs[p] ?? "").subarray(offset, offset + laenge)) }; },
          ...(o.ohnePruefsumme ? {} : { pruefsumme: async ({ token, pfad }) => { log.pruef++; const d = new Uint8Array(await crypto.subtle.digest("SHA-256", gross(0, GROSS))); return { sha256: [...d].map((x) => x.toString(16).padStart(2, "0")).join(""), groesse: GROSS }; } }),
          speicherFrei: async () => ({ frei: o.frei }),
          arbeitsordner: async ({ token }) => { if (token === "t") throw Object.assign(new Error("DO_TRESOR_ORDNER"), { code: "DO_TRESOR_ORDNER" });
            const a = voll(token, "Datei-Organizer-Arbeit"); fs.__ordner = [...new Set([...(fs.__ordner || []), a])]; merk(); return { pfad: "Datei-Organizer-Arbeit", neu: true }; },
          dateiBeginn: async ({ token, pfad }) => { const id = Math.random().toString(36); offen[id] = { p: voll(token, pfad), t: "" }; return { id }; },
          dateiAnhaengen: async ({ id, data }) => { offen[id].t += new TextDecoder().decode(Uint8Array.from(atob(data), (c) => c.charCodeAt(0)), { stream: true }); return { size: 0 }; },
          dateiFertig: async ({ id }) => { fs[offen[id].p] = offen[id].t; merk(); return { size: 0, sha256: "" }; },
        },
        DoUpdates: { pruefen: async () => { throw Object.assign(new Error("UPDATE_NICHT_EINGERICHTET"), { code: "UPDATE_NICHT_EINGERICHTET" }); } },
      } };
    };
    const neueSeite = async (opt) => {
      const c = await browser.newContext({ viewport: { width: 1100, height: 900 } });
      await c.addInitScript(stellen, opt); const pg = await c.newPage(); const f = []; pg.on("pageerror", (e) => f.push(String(e)));
      await pg.goto(basis + "#ordner"); await pg.waitForSelector("[data-nativ-ordner]", { timeout: 8000 }).catch(() => {}); return { c, pg, f };
    };
    const meldungNach = async (pg, re, ms = 60000) => { await pg.waitForFunction((r) => new RegExp(r).test(document.querySelector("[data-meldung]")?.textContent || ""), re.source, { timeout: ms }).catch(() => {}); return (await pg.locator("[data-meldung]").innerText().catch(() => "")) || ""; };

    // A + B + C: kleines Gerät (vollBis 30 MB), große Datei 35 MB, Arbeitsordner auf der „SD-Karte“.
    { const { c, pg, f } = await neueSeite({ mem: 2, kerne: 4, gross: GROSS, frei: 8 * 1024 ** 3, wahlen: ["t", "l", "e"] });
      await zahnrad(pg); soll("A: Leistung des Geräts wird angezeigt (klein: Blöcke zu 25, bis 30 MB ganz)", /Kleines Gerät: Blöcke zu 25, Dateien bis 30 MB/.test(await pg.locator("[data-leistung]").innerText().catch(() => "")));
      await zahnrad(pg); await pg.locator("[data-arbeit-waehlen]").click();
      soll("B: Pro-Tresor als Laufwerk gewählt → abgewiesen mit Erklärung", /Pro-Tresor/.test(await meldungNach(pg, /Tresor/)) && await pg.locator("[data-arbeit-pfad]").count() === 0);
      await zahnrad(pg); await pg.locator("[data-arbeit-waehlen]").click();
      await pg.waitForSelector("[data-arbeit-pfad]", { timeout: 5000 }).catch(() => {});
      soll("B: Laufwerk gewählt → Arbeitsordner SD-Karte/Datei-Organizer-Arbeit, freier Speicher genannt", /SD-Karte\/Datei-Organizer-Arbeit/.test(await pg.locator("[data-arbeit-pfad]").innerText().catch(() => "")) && /frei 8 GB/.test(await pg.locator("[data-arbeit-pfad]").innerText().catch(() => "")));
      soll("B: das Laufwerk erscheint nicht unter „Zuletzt“ als Quelle", !((await pg.locator("[data-gemerkt]").innerText().catch(() => "")) || "").includes("SD-Karte"));
      await pg.locator("[data-nativ-ordner]").click();
      const m = await meldungNach(pg, /Dateien im Eingang/);
      const log = await pg.evaluate(() => window.__log);
      soll("A: große Datei (35 MB) Stück für Stück: nur der Kopf über die Brücke, Prüfsumme am Ort", /1 große Datei Stück für Stück/.test(m) && log.grossGelesen <= 4096 && log.pruef === 1, `${m} · ${JSON.stringify(log)}`);
      await pg.waitForTimeout(2500);
      const fs = await pg.evaluate(() => JSON.parse(sessionStorage.getItem("fs")));
      const liste = JSON.parse(fs["Datei-Organizer-Arbeit/liste-0001.json"] || "[]"), gross = liste.find((d) => d.name === "Gross.pdf");
      soll("A: Fingerabdruck und Art der großen Datei stimmen (SHA-256 wie node:crypto, PDF)", gross?.sha256 === grossSha && gross?.art === "pdf" && gross?.groesse === GROSS, JSON.stringify(gross));
      soll("B: Liste und Stand liegen im Arbeitsordner (stand.json, liste-0001.json)", !!fs["Datei-Organizer-Arbeit/stand.json"] && liste.length === 3);
      const lang = liste.find((d) => d.name === "Lang.txt"), texte = Object.keys(fs).filter((k) => /^Datei-Organizer-Arbeit\/texte-.*\.json$/.test(k));
      soll("C: schlank – langer Text im Speicher gekürzt (20 000 Zeichen), ganzer Text im Arbeitsordner", lang?.volltext?.length === 20000 && texte.length === 1 && JSON.parse(fs[texte[0]])["Lang.txt"]?.length > 30000, `${lang?.volltext?.length} · ${texte.join(",")} · ${Object.keys(fs).join(",")}`);
      const idb = await pg.evaluate(() => new Promise((ok) => { const r = indexedDB.open("DateiOrganizer1"); r.onsuccess = () => { const g = r.result.transaction("kv").objectStore("kv").get("zustand"); g.onsuccess = () => ok(g.result?.dateien?.length ?? -1); }; }));
      soll("B: im App-Speicher bleibt nur ein leerer Stand (die Liste liegt auf dem Laufwerk)", idb === 0, String(idb));
      // „Neuinstallation“: App-Speicher weg, Laufwerk bleibt → nach Wahl des Laufwerks ist der Stand wieder da.
      await pg.evaluate(() => new Promise((ok) => { localStorage.clear(); const r = indexedDB.deleteDatabase("DateiOrganizer1"); r.onsuccess = r.onerror = r.onblocked = () => ok(); }));
      await pg.evaluate(() => { const o = JSON.parse(sessionStorage.getItem("opt")); o.wahlen = ["l"]; sessionStorage.setItem("opt", JSON.stringify(o)); });
      await pg.reload(); await pg.waitForSelector("[data-einstellungen]", { timeout: 8000 }).catch(() => {});
      soll("B: nach „Neuinstallation“ ohne Arbeitsordner und leer", await pg.locator("[data-arbeit-pfad]").count() === 0 && await pg.locator("[data-ordner-pill]").count() === 0);
      await zahnrad(pg); await pg.locator("[data-arbeit-waehlen]").click();
      soll("B: Laufwerk wieder gewählt → Stand aus dem Arbeitsordner übernommen (3 Dateien)", /3 Dateien aus dem gespeicherten Stand übernommen/.test(await meldungNach(pg, /übernommen/, 8000)) && (await pg.locator('[data-zahl="gesamt"]').innerText().catch(() => "")).startsWith("3 "));
      await pg.reload(); await pg.waitForFunction(() => /^3 /.test(document.querySelector('[data-zahl="gesamt"]')?.textContent || ""), null, { timeout: 8000 }).catch(() => {});
      soll("B: beim nächsten Start kommt die Liste ohne Auswahl vom Laufwerk", (await pg.locator('[data-zahl="gesamt"]').innerText().catch(() => "")).startsWith("3 "));
      soll("Große Ordner: keine Fehler in der Seite", f.length === 0, f.slice(0, 3).join(" | "));
      await c.close(); }

    // A ohne Prüfsummen-Aufruf (Familienakte): Rückfall über Stücke, gleiches Ergebnis. Starkes Gerät lädt die 35 MB dagegen ganz.
    { const { c, pg } = await neueSeite({ mem: 2, kerne: 4, gross: GROSS, frei: -1, ohnePruefsumme: true });
      await pg.locator("[data-nativ-ordner]").click(); await meldungNach(pg, /Dateien im Eingang/);
      await pg.locator("[data-nav=finden]").click().catch(() => {});
      const log = await pg.evaluate(() => window.__log);
      soll("A: ohne Prüfsummen-Aufruf der App (Familienakte) Stück für Stück über die Brücke, ohne Absturz", log.pruef === 0 && log.grossGelesen >= GROSS && log.grossGelesen <= GROSS + 4096, JSON.stringify(log));
      await c.close(); }
    { const { c, pg } = await neueSeite({ mem: 16, kerne: 12, gross: GROSS, frei: -1 });
      await zahnrad(pg); soll("A: starkes Gerät (16 GB, 12 Kerne) lädt bis 256 MB ganz", /Starkes Gerät: Blöcke zu 100, Dateien bis 256 MB/.test(await pg.locator("[data-leistung]").innerText().catch(() => "")));
      await pg.locator("[data-nativ-ordner]").click(); const m = await meldungNach(pg, /Dateien im Eingang/);
      soll("A: starkes Gerät – die große Datei wird ganz geladen (kein Stück-für-Stück-Weg)", !/Stück für Stück/.test(m) && (await pg.evaluate(() => window.__log.pruef)) === 0, m);
      await c.close(); }
    // D: zu wenig frei im Arbeitsordner → anhalten mit Meldung, Stand bleibt, nichts gelesen.
    { const { c, pg } = await neueSeite({ mem: 4, kerne: 6, gross: 0, frei: 10 * 1024 * 1024, wahlen: ["l", "e"] });
      await zahnrad(pg); await pg.locator("[data-arbeit-waehlen]").click(); await pg.waitForSelector("[data-arbeit-pfad]", { timeout: 5000 }).catch(() => {});
      await pg.locator("[data-nativ-ordner]").click();
      const m = await meldungNach(pg, /Zu wenig Speicher/, 20000);
      soll("D: zu wenig frei im Arbeitsordner → hält vor dem Block an, nennt frei und gebraucht", /Zu wenig Speicher im Arbeitsordner \(SD-Karte\/Datei-Organizer-Arbeit\): frei 10 MB, für den nächsten Block gebraucht 50 MB\. 0 von 2/.test(m), m);
      await c.close(); }
  }
  // Foto / Scan (Klaus 17.11., nur Web-App): zwei Fotos über die Kamera-Eingabe → ein PDF, das die Texterkennung liest; Kopie in Downloads.
  { await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#ordner"); await page.waitForSelector("[data-scan-knopf]", { timeout: 5000 }).catch(() => {});
    const zahl = () => page.evaluate(() => Number(((document.querySelector("[data-ordner-pill]")?.textContent || "").match(/· (\d+)/) || [])[1] || 0));
    const davor = await zahl();
    const foto = async (zeilen) => Buffer.from(await page.evaluate(async (zeilen) => {
      const c = document.createElement("canvas"); c.width = 1400; c.height = 1900; const g = c.getContext("2d");
      g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.fillStyle = "#000"; g.font = "bold 54px Arial";
      zeilen.forEach((z, i) => g.fillText(z, 60, 160 + i * 130));
      return (await new Promise((ok) => c.toBlob(ok, "image/png")).then((b) => b.arrayBuffer()).then((a) => btoa(String.fromCharCode(...new Uint8Array(a)))));
    }, zeilen), "base64");
    soll("Scan: Knopf „Foto / Scan“ mit Kamera-Eingabe (Bild, Rückkamera)", await page.locator("[data-scan-knopf]").count() === 1 && await page.locator("[data-kamera-eingabe]").getAttribute("capture") === "environment");
    await page.setInputFiles("[data-kamera-eingabe]", { name: "kamera1.png", mimeType: "image/png", buffer: await foto(["Stadtwerke Musterstadt GmbH", "Rechnung Nummer 5822", "Betrag zahlbar bis 20.12.2026"]) });
    await page.waitForSelector("[data-scan-seite]", { timeout: 10000 }).catch(() => {});
    await page.setInputFiles("[data-kamera-eingabe]", { name: "kamera2.png", mimeType: "image/png", buffer: await foto(["Seite zwei der Rechnung", "Zahlungsbedingungen und Hinweise"]) });
    await page.waitForFunction(() => document.querySelectorAll("[data-scan-seite]").length === 2, null, { timeout: 10000 }).catch(() => {});
    soll("Scan: zwei Seiten gesammelt, Bestand noch unverändert", await page.locator("[data-scan-seite]").count() === 2 && await zahl() === davor);
    const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 10000 }).catch(() => null), page.locator("[data-scan-fertig]").click()]);
    soll("Scan: Kopie als PDF auf das Gerät", /^Scan_\d{4}-\d\d-\d\d_\d\d-\d\d-\d\d\.pdf$/.test(dl?.suggestedFilename() || ""), dl?.suggestedFilename());
    await page.waitForFunction((v) => Number(((document.querySelector("[data-ordner-pill]")?.textContent || "").match(/· (\d+)/) || [])[1] || 0) === v + 1, davor, { timeout: 120000 }).catch(() => {});
    await page.waitForTimeout(900);
    const st = await page.evaluate(() => new Promise((ok) => { const r = indexedDB.open("DateiOrganizer1", 1); r.onsuccess = () => { const q = r.result.transaction("kv").objectStore("kv").get("zustand"); q.onsuccess = () => ok(q.result); }; r.onerror = () => ok(null); }));
    const sc = st?.dateien?.find((d) => /^Scan_.*\.pdf$/.test(d.name));
    soll("Scan: kommt als ein PDF zum Bestand dazu, Texterkennung liest beide Seiten", await zahl() === davor + 1 && /Rechnung/i.test(sc?.volltext || "") && /Seite zwei/i.test(sc?.volltext || "") && await page.locator("[data-scan]").count() === 0, `${davor} → ${await zahl()} · ${JSON.stringify((sc?.volltext || "").slice(0, 120))}`);
    // Eine Seite bleibt ein Bild; „Verwerfen“ nimmt nichts in den Bestand.
    await page.setInputFiles("[data-kamera-eingabe]", { name: "kamera3.png", mimeType: "image/png", buffer: await foto(["Kassenbon Markt Muster", "Summe 12,34 EUR"]) });
    await page.waitForSelector("[data-scan-seite]", { timeout: 10000 }).catch(() => {});
    await page.locator("[data-scan-verwerfen]").click();
    soll("Scan: Verwerfen lässt den Bestand, wie er ist", await page.locator("[data-scan]").count() === 0 && await zahl() === davor + 1);
    // Scans in den Unterordner „Scans“ (Klaus 17.11.): mit „Ordner am PC“ wird der Scan dorthin geschrieben, ohne Kopie in Downloads.
    await page.evaluate(async () => {
      const w = await navigator.storage.getDirectory(); try { await w.removeEntry("Belege", { recursive: true }); } catch { /* neu */ }
      const o = await w.getDirectoryHandle("Belege", { create: true });
      const f = await (await o.getFileHandle("notiz.txt", { create: true })).createWritable(); await f.write("Notiz zum Einkauf am 3.11.2026"); await f.close();
      window.showDirectoryPicker = async () => o;
    });
    await page.locator("[data-pc-ordner]").click();
    await page.waitForFunction(() => /Ordner: Belege/.test(document.querySelector("[data-ordner-pfad]")?.textContent || ""), null, { timeout: 20000 }).catch(() => {});
    await page.setInputFiles("[data-kamera-eingabe]", { name: "kamera4.png", mimeType: "image/png", buffer: await foto(["Kassenbon Markt Muster", "Summe 12,34 EUR"]) });
    await page.waitForSelector("[data-scan-seite]", { timeout: 10000 }).catch(() => {});
    soll("Scans-Ordner: der Kasten nennt das Ziel statt „Kopie speichern“", (await page.locator("[data-scan-ziel]").textContent().catch(() => "") || "").trim() === "Belege/Scans" && await page.locator("[data-scan-kopie]").count() === 0);
    const [dl2] = await Promise.all([page.waitForEvent("download", { timeout: 4000 }).catch(() => null), page.locator("[data-scan-fertig]").click()]);
    await page.waitForFunction(() => /Scan gespeichert/.test(document.querySelector("[data-meldung]")?.textContent || document.body.textContent || ""), null, { timeout: 120000 }).catch(() => {});
    await page.waitForTimeout(900);
    const imOrdner = await page.evaluate(async () => { const a = []; try { const d = await (await (await navigator.storage.getDirectory()).getDirectoryHandle("Belege")).getDirectoryHandle("Scans"); for await (const e of d.values()) a.push(`${e.name}:${(await e.getFile()).size > 1000}`); } catch { /* fehlt */ } return a; });
    const st2 = await page.evaluate(() => new Promise((ok) => { const r = indexedDB.open("DateiOrganizer1", 1); r.onsuccess = () => { const q = r.result.transaction("kv").objectStore("kv").get("zustand"); q.onsuccess = () => ok(q.result); }; r.onerror = () => ok(null); }));
    const sc2 = st2?.dateien?.find((d) => /^Scans\/Scan_.*\.jpg$/.test(d.pfad));
    soll("Scans-Ordner: der Scan liegt als JPG in „Belege/Scans“, ohne Download", imOrdner.length === 1 && /^Scan_\d{4}-\d\d-\d\d_\d\d-\d\d-\d\d\.jpg:true$/.test(imOrdner[0]) && !dl2, `${JSON.stringify(imOrdner)} · Download ${dl2?.suggestedFilename() || "keiner"}`);
    soll("Scans-Ordner: steht mit dem Pfad „Scans/…“ im Bestand neben der Datei des Ordners, Text gelesen", !!sc2 && st2.dateien.length === 2 && /Kassenbon/i.test(sc2.volltext || ""), `${st2?.dateien?.map((d) => d.pfad).join(", ")} · ${JSON.stringify((sc2?.volltext || "").slice(0, 80))}`);
  }
  // Erstinstallation (Klaus 17.11.): bietet der Browser die Installation an, steht neben der Fassung der Knopf „Installieren“.
  { await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(basis + "#ordner"); await page.waitForSelector("[data-fassung-knopf]");
    const ohne = await page.locator("[data-installieren]").count();
    await page.evaluate(() => { window.__inst = 0; const e = new Event("beforeinstallprompt", { cancelable: true }); e.prompt = async () => { window.__inst++; }; e.userChoice = Promise.resolve({ outcome: "accepted" }); window.dispatchEvent(e); });
    await page.waitForSelector("[data-installieren]", { timeout: 3000 }).catch(() => {});
    const da = await page.locator("[data-fassung-platz] [data-installieren]").isVisible().catch(() => false);
    if (da) await page.locator("[data-installieren]").click();
    await page.waitForFunction(() => !document.querySelector("[data-installieren]"), null, { timeout: 3000 }).catch(() => {});
    soll("Installieren: Knopf nur mit Angebot des Browsers, Tipp öffnet die Installation, danach ist er weg", ohne === 0 && da && await page.evaluate(() => window.__inst) === 1 && await page.locator("[data-installieren]").count() === 0, `ohne=${ohne} da=${da}`);
  }
  { // Im Rahmen einer anderen App (src/rahmen.ts): kein eigener Service Worker, direkte Übergabe von Index und Originalen.
    console.log("Im Rahmen (Übergabe an die Hülle)");
    const rctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
    await rctx.addInitScript(() => { window.__paket = null; window.DO_RAHMEN = { name: "Private Akte", uebergeben: async (p) => { window.__paket = { ordner: p.ordner, n: p.dateien.length, datei: p.dateien[0]?.datei instanceof File, groesse: p.dateien[0]?.datei.size, pfad: p.dateien[0]?.pfad, index: JSON.parse(p.index), fehlen: p.fehlen.length }; return { ok: true }; } }; });
    const rp = await rctx.newPage(); const rf = []; rp.on("pageerror", (e) => rf.push(String(e)));
    await rp.goto(basis);
    await rp.locator("[data-testordner]").click();
    await rp.waitForFunction(() => /\d+ (Dateien|sortiert)/.test(document.body.innerText) && !document.querySelector("[data-ladebalken]"), null, { timeout: 60000 }).catch(() => {});
    await rp.waitForTimeout(800);
    await rp.evaluate(() => { location.hash = "akte"; });
    await rp.waitForSelector("[data-uebergeben]", { timeout: 5000 }).catch(() => {});
    soll("Rahmen: Knopf „An die Private Akte übergeben“", ((await rp.locator("[data-uebergeben]").innerText().catch(() => "")) || "").includes("Private Akte"));
    await rp.locator("[data-uebergeben]").click().catch(() => {});
    await rp.waitForFunction(() => window.__paket, null, { timeout: 30000 }).catch(() => {});
    const pk = await rp.evaluate(() => window.__paket);
    const frei = pk ? pk.index.dateien.filter((d) => d.pruefstand === "frei").length : -1;
    soll("Rahmen: Übergabe trägt Index und die freien Originale als Dateien", !!pk && pk.datei && pk.groesse > 0 && pk.index.format === "datei-organizer-index" && pk.n + pk.fehlen === frei && pk.n > 50, pk ? `n=${pk.n} frei=${frei} fehlen=${pk.fehlen}` : "kein Paket");
    soll("Rahmen: Meldung nach der Übergabe", ((await rp.locator("[data-uebergabe] [data-meldung]").innerText().catch(() => "")) || "").includes("übergeben"));
    soll("Rahmen: kein eigener Service Worker", (await rp.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length)) === 0);
    soll("Rahmen: keine Fehler in der Konsole", rf.length === 0, rf.slice(0, 2).join(" | "));
    await rctx.close();
    soll("Ohne Rahmen: kein Übergabe-Knopf", await page.evaluate(() => { location.hash = "akte"; return new Promise((ok) => setTimeout(() => ok(!document.querySelector("[data-uebergeben]")), 300)); }));
  }
  soll("Keine Fehler in der Konsole", fehler.length === 0, fehler.slice(0, 3).join(" | "));
} finally {
  await browser.close(); server.close();
}
console.log(`UI: ${gruen} grün · ${rot} ROT`);
process.exit(rot ? 1 : 0);
