// Baut ergebnisse/uebersicht.html aus ergebnisse/grosslauf/*.json (Großlauf über erfundene Haushalte).
// Aufruf: node scripts/uebersicht-bauen.mjs
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIR = "ergebnisse/grosslauf";
const dateien = readdirSync(DIR).filter((f) => f.endsWith(".json"));
const runden = dateien.filter((f) => !f.startsWith("lernen-")).map((f) => ({ name: f.replace(".json", ""), ...JSON.parse(readFileSync(join(DIR, f), "utf8")) }));
const lernen = dateien.filter((f) => f.startsWith("lernen-")).map((f) => ({ name: f, ...JSON.parse(readFileSync(join(DIR, f), "utf8")) }));
const titel = Object.fromEntries(JSON.parse(readFileSync("testdaten-haushalte/HAUSHALTE.json", "utf8")).haushalte.map((h) => [h.id, h]));

const FELDER = [["kategorie", "Bereich"], ["schriftstueck", "Dokumentart"], ["absender", "Absender"], ["person", "Person"], ["frist", "Frist"], ["betrag", "Betrag (Bon)"]];
const sum = (rs, pfad) => rs.reduce((a, r) => { const x = pfad(r); return x ? { n: a.n + (x.n || 0), ok: a.ok + (x.ok || 0), fs: a.fs + (x.falschSicher || 0) } : a; }, { n: 0, ok: 0, fs: 0 });
const pz = (x) => x.n ? Math.round((1000 * x.ok) / x.n) / 10 : null;
const fmt = (v) => v == null ? "–" : `${v.toLocaleString("de-DE")} %`;
const zahl = (n) => n.toLocaleString("de-DE");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const ton = (v) => v == null ? "leer" : v >= 95 ? "gut" : v >= 85 ? "mittel" : "schwach";
const balken = (v, fa) => `<div class="balken" role="img" aria-label="Organizer ${fmt(v)}${fa != null ? `, Familienakte heute ${fmt(fa)}` : ""}"><span class="org" style="width:${v ?? 0}%"></span>${fa != null ? `<span class="fa" style="left:${fa}%"></span>` : ""}</div>`;

const normal = runden.filter((r) => r.name.startsWith("runde")), chaos = runden.filter((r) => r.name.startsWith("chaos"));
const alleDateien = runden.reduce((a, r) => a + r.dateien, 0);
const gesamt = Object.fromEntries(FELDER.map(([f]) => [f, sum(runden, (r) => r.organizer[f])]));
const faKat = sum(runden, (r) => r.familienakte.kat), faAbs = sum(runden, (r) => r.familienakte.abs);
const offen = runden.reduce((a, r) => a + r.offenDateien, 0), faPruef = runden.reduce((a, r) => a + r.familienakte.pruef, 0);

// je Haushalt
const hids = Object.keys(titel);
const proH = hids.map((id) => {
  const f = Object.fromEntries(FELDER.map(([k]) => [k, sum(runden, (r) => r.jeHaushaltFeld?.[id]?.[k])]));
  const n = runden.reduce((a, r) => a + (r.jeHaushaltFeld?.[id]?.dateien || 0), 0), o = runden.reduce((a, r) => a + (r.jeHaushaltFeld?.[id]?.offen || 0), 0);
  return { id, h: titel[id], f, n, offenPz: n ? Math.round((100 * o) / n) : null };
});
// je Dokumentart (Bereich)
const arten = {};
for (const r of runden) for (const [a, x] of Object.entries(r.jeArt || {})) { arten[a] ??= { n: 0, ok: 0 }; arten[a].n += x.n; arten[a].ok += x.ok; }
const GF = [["zeitraum", "Zeitraum"], ["brutto", "Brutto"], ["netto", "Netto"], ["auszahlung", "Auszahlung"], ["lohnsteuer", "Lohnsteuer"], ["steuerklasse", "Steuerklasse"], ["steuerId", "Steuer-ID"], ["svNummer", "SV-Nummer"], ["krankenkasse", "Krankenkasse"]];
const gehaltN = sum(normal, (r) => r.gehalt?.brutto).n + sum(chaos, (r) => r.gehalt?.brutto).n;
const dopp = runden.reduce((a, r) => ({ n: a.n + r.doppelt.n, ok: a.ok + r.doppelt.ok, f: a.f + r.doppelt.falsch }), { n: 0, ok: 0, f: 0 });
const leer = sum(runden, (r) => r.leer), anh = sum(runden, (r) => r.anhang);
const blpB = sum(runden, (r) => r.bookledgerpro.betrag), blpD = sum(runden, (r) => r.bookledgerpro.datum), blpK = runden.reduce((a, r) => ({ n: a.n + r.blpKonto.n, ok: a.ok + r.blpKonto.blp }), { n: 0, ok: 0 });

const zeileFeld = ([f, name]) => {
  const v = pz(gesamt[f]), vn = pz(sum(normal, (r) => r.organizer[f])), vc = pz(sum(chaos, (r) => r.organizer[f]));
  const fa = f === "kategorie" ? pz(faKat) : f === "absender" ? pz(faAbs) : null;
  return `<tr><th scope="row">${name}</th><td class="z ${ton(v)}">${fmt(v)}</td><td class="z">${fmt(vn)}</td><td class="z">${fmt(vc)}</td><td class="z leise">${zahl(gesamt[f].fs)}</td><td class="z">${fa != null ? fmt(fa) : "–"}</td><td class="bz">${balken(v, fa)}</td></tr>`;
};

const lernZeilen = lernen.map((l) => {
  const m = l.name.match(/lernen-(.+?)-(runde-\d+)-(\w+)\.json/);
  const ohne = runden.find((r) => r.name === m?.[2]);
  return `<tr><td>${m?.[3] === "chaotisch" ? "neben der Spur" : "sorgfältig"}</td><td>${esc(m?.[1] || "")}</td><td>${esc(m?.[2] || "")}</td><td class="z">${zahl(l.nutzer?.antworten || 0)}</td><td class="z">${zahl(l.nutzer?.falscheAntworten || 0)}</td><td class="z">${fmt(pz(ohne?.organizer.kategorie || { n: 0 }))}</td><td class="z ${ton(pz(l.organizer.kategorie))}">${fmt(pz(l.organizer.kategorie))}</td></tr>`;
}).join("");

let unabhaengig = "", blindKz = "";
if (existsSync("ergebnisse/unabhaengig.json")) {
  const u = JSON.parse(readFileSync("ergebnisse/unabhaengig.json", "utf8"));
  const um = existsSync("ergebnisse/unabhaengig-zusammengesetzt.json") ? JSON.parse(readFileSync("ergebnisse/unabhaengig-zusammengesetzt.json", "utf8")) : null;
  blindKz = `<section class="kennzahlen" aria-label="Kennzahlen Blindtest">
<div class="kz"><b>${fmt(pz(u.organizer.kategorie))}</b><span>Blindtest (fremde Briefe): Bereich richtig${um ? `, ${fmt(pz(um.organizer.kategorie))} mit zusammengesetzten Namen` : ""} · Familienakte heute ${fmt(pz(u.familienakte.kat))}</span></div>
<div class="kz"><b>${fmt(pz(u.organizer.absender))}</b><span>Blindtest: Absender richtig · heute ${fmt(pz(u.familienakte.abs))}</span></div>
<div class="kz"><b>${fmt(pz(u.organizer.schriftstueck))}</b><span>Blindtest: Dokumentart richtig</span></div>
<div class="kz"><b>${fmt(pz(u.organizer.person))}</b><span>Blindtest: Person richtig</span></div>
</section>`;
  unabhaengig = `<section class="karte"><h2>Unabhängiger Prüfstapel (${zahl(u.dateien)} Briefe, von einem anderen Agenten geschrieben)</h2>
<p class="leise">Ein Hilfs-Agent ohne Einblick in den Kern und in die eigenen Vorlagen hat 150 eigene erfundene Briefe aus 7 Haushalten (Ort „Brakenhude“) mit eigenen Soll-Werten geschrieben. Regeln vorab festgelegt (docs/PRUEFSTAPEL-REGELN.md), einmal gemessen, ohne Anpassung. <b>Das ist der ehrliche Wert für fremde Post – und er liegt weit unter dem des eigenen Generators.</b></p>
<div class="tab"><table><thead><tr><th>Feld</th><th>Datei-Organizer-Kern</th><th>sicher, aber falsch</th><th>Familienakte heute</th>${um ? "<th>nachträglich: Bereichsnamen zusammengesetzt</th>" : ""}</tr></thead><tbody>${FELDER.slice(0, 5).map(([f, n]) => { const v = pz(u.organizer[f]); const fa = f === "kategorie" ? pz(u.familienakte.kat) : f === "absender" ? pz(u.familienakte.abs) : null; const vm = um && f === "kategorie" ? `${fmt(pz(um.organizer.kategorie))} (Familienakte ${fmt(pz(um.familienakte.kat))})` : um ? "gleich" : ""; return `<tr><th scope="row">${n}</th><td class="z ${ton(v)}">${fmt(v)}</td><td class="z">${zahl(u.organizer[f].falschSicher)}</td><td class="z">${fa != null ? fmt(fa) : "–"}</td>${um ? `<td class="z">${vm}</td>` : ""}</tr>`; }).join("")}</tbody></table></div>
<ul class="leise">
<li>Die offizielle Zahl ist die linke. Der Wert rechts ist nachträglich: In meinem Auftrag an den Hilfs-Agenten standen die Bereiche durch Kommas getrennt; er hat dadurch 32 Soll-Werte als Bruchstücke geschrieben („Rente“, „Einkäufe“ …), die kein Programm treffen kann. Rechts sind diese Bruchstücke mechanisch auf den vollen Namen gesetzt, sonst nichts.</li>
<li>Typische echte Fehler des Kerns: Absender mit Werbezeile oder Anschrift dahinter („… GmbH – Ihr Partner für …“), „Von:“-Zeilen in Mails als Text, private Absender („Oma Hanne“), Strafzettel als Behörde statt Auto, Apothekenbon als Einkauf statt Gesundheit, Ferienhaus als Wohnen statt Reisen.</li>
<li>Nicht gemessen: Beträge auf Kassenbons und Gehaltsfelder (der Stapel enthält dafür keine Soll-Werte).</li>
</ul></section>`;
}
const html = `<title>Datei-Organizer Testlauf</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Layout: ein Bericht in Spalte, Kennzahlen oben, dann Tabellen je Frage; Farben wie die Familienakte (Marine, Petrol). */
:root{--bg:#f2f6f9;--karte:#ffffff;--fg:#15283a;--leise:#56697a;--linie:#d8e2ea;--navy:#0b3154;--akzent:#087f7a;--gut:#1f7a3f;--mittel:#9a6a00;--schwach:#b42318;--fa:#c26b00;
--schrift:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;--zahlen:ui-monospace,"Cascadia Mono","Roboto Mono",Menlo,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0e161d;--karte:#16222c;--fg:#e2eaf0;--leise:#9db0be;--linie:#2f4352;--navy:#cfe3f2;--akzent:#5cc3cc;--gut:#5bc27f;--mittel:#e0b04a;--schwach:#f08a80;--fa:#f0a35a;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0e161d;--karte:#16222c;--fg:#e2eaf0;--leise:#9db0be;--linie:#2f4352;--navy:#cfe3f2;--akzent:#5cc3cc;--gut:#5bc27f;--mittel:#e0b04a;--schwach:#f08a80;--fa:#f0a35a;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font:15px/1.55 var(--schrift)}
.seite{max-width:1080px;margin:0 auto;padding-block:20px 48px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:18px}
h1{font-size:clamp(1.5rem,3vw,2rem);color:var(--navy);margin:0;text-wrap:balance}
h2{font-size:1.15rem;color:var(--navy);margin:0 0 4px;text-wrap:balance}
p{margin:0;max-width:72ch}.leise{color:var(--leise)}
.karte{background:var(--karte);border:1px solid var(--linie);border-radius:14px;padding:18px;display:grid;gap:10px;min-width:0}
.kennzahlen{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.kz{background:var(--karte);border:1px solid var(--linie);border-radius:12px;padding:12px 14px}
.kz b{display:block;font:600 1.6rem/1.2 var(--zahlen);color:var(--navy);font-variant-numeric:tabular-nums}
.kz span{font-size:.82rem;color:var(--leise)}
.tab{overflow-x:auto}
table{border-collapse:collapse;width:100%;font-size:.9rem}
th,td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--linie);vertical-align:middle}
thead th{font-size:.74rem;text-transform:uppercase;letter-spacing:.05em;color:var(--leise);font-weight:700}
td.z{font-family:var(--zahlen);font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right}
td.gut{color:var(--gut);font-weight:700}td.mittel{color:var(--mittel);font-weight:700}td.schwach{color:var(--schwach);font-weight:700}
.bz{min-width:140px}
.balken{position:relative;height:10px;border-radius:5px;background:var(--linie);overflow:hidden}
.balken .org{position:absolute;inset:0 auto 0 0;background:var(--akzent);border-radius:5px}
.balken .fa{position:absolute;top:-2px;bottom:-2px;width:3px;background:var(--fa)}
.legende{display:flex;gap:16px;flex-wrap:wrap;font-size:.82rem;color:var(--leise)}
.legende i{display:inline-block;width:12px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}
ul{margin:0;padding-left:20px;display:grid;gap:4px}
.hh small{display:block;color:var(--leise);font-size:.78rem}
</style>
<div class="seite">
<header class="karte" style="gap:6px">
<p class="leise" style="font-size:.8rem;letter-spacing:.06em;text-transform:uppercase">Datei-Organizer · Testlauf vom 12.11.2026 · alles erfundene Daten</p>
<h1>Wie gut sortiert der Datei-Organizer – an eigenen und an fremden Briefen?</h1>
<p class="leise">${normal.length} normale Runden und ${chaos.length} Runden „neben der Spur“ (abfotografierte, schiefe, dunkle Briefe, Unsinnsnamen, Mehrfachkopien). Jede Runde hat neue Formulierungen, Daten, Beträge und Dateinamen. Daneben der heutige Eingang der Familienakte und BookLedgerPro am selben Stapel.</p>
</header>
${blindKz}
<section class="kennzahlen" aria-label="Kennzahlen eigener Generator">
<div class="kz"><b>${zahl(alleDateien)}</b><span>Dateien aus dem eigenen Generator</span></div>
<div class="kz"><b>${fmt(pz(gesamt.kategorie))}</b><span>Bereich richtig, eigener Generator (Familienakte heute ${fmt(pz(faKat))}) – geschönt durch Überanpassung</span></div>
<div class="kz"><b>${fmt(pz(gesamt.absender))}</b><span>Absender richtig (heute ${fmt(pz(faAbs))})</span></div>
<div class="kz"><b>${fmt(pz(gesamt.person))}</b><span>Person richtig zugeordnet</span></div>
<div class="kz"><b>${Math.round((100 * offen) / alleDateien)} %</b><span>landen bei „bitte prüfen“ (heute ${Math.round((100 * faPruef) / alleDateien)} %)</span></div>
</section>
${unabhaengig}
<section class="karte">
<h2>Je Feld (eigener Generator)</h2>
<div class="legende"><span><i style="background:var(--akzent)"></i>Datei-Organizer-Kern</span><span><i style="background:var(--fa)"></i>Familienakte heute</span><span>„sicher, aber falsch“ = die App war sich sicher und lag falsch (das Schlimmste)</span></div>
<div class="tab"><table><thead><tr><th>Feld</th><th>gesamt</th><th>normal</th><th>neben der Spur</th><th>sicher, aber falsch</th><th>Familienakte heute</th><th></th></tr></thead><tbody>${FELDER.map(zeileFeld).join("")}</tbody></table></div>
</section>
<section class="karte">
<h2>Je Person und Lebenslage</h2>
<div class="tab"><table><thead><tr><th>Haushalt</th><th>Dateien</th>${FELDER.slice(0, 4).map(([, n]) => `<th>${n}</th>`).join("")}<th>bitte prüfen</th></tr></thead><tbody>${proH.map((x) => `<tr class="hh"><th scope="row">${esc(x.h.titel)}<small>${esc(x.h.personen.map((p) => p.vorname + " (" + p.rolle + ")").join(", "))}</small></th><td class="z">${zahl(x.n)}</td>${FELDER.slice(0, 4).map(([k]) => { const v = pz(x.f[k]); return `<td class="z ${ton(v)}">${fmt(v)}</td>`; }).join("")}<td class="z">${x.offenPz ?? "–"} %</td></tr>`).join("")}</tbody></table></div>
</section>
<section class="karte">
<h2>Bereich je Dokumentart</h2>
<div class="tab"><table><thead><tr><th>Dokumentart</th><th>Anzahl</th><th>Bereich richtig</th><th></th></tr></thead><tbody>${Object.entries(arten).sort((a, b) => b[1].n - a[1].n).map(([a, x]) => { const v = pz(x); return `<tr><th scope="row">${esc(a)}</th><td class="z">${zahl(x.n)}</td><td class="z ${ton(v)}">${fmt(v)}</td><td class="bz">${balken(v)}</td></tr>`; }).join("")}</tbody></table></div>
</section>
<section class="karte">
<h2>Gehaltsabrechnungen (${zahl(gehaltN)} Stück, Aufbau wie in Lohnprogrammen)</h2>
<div class="tab"><table><thead><tr><th>Feld</th><th>normal</th><th>neben der Spur (abfotografiert)</th></tr></thead><tbody>${GF.map(([f, n]) => { const a = pz(sum(normal, (r) => r.gehalt?.[f])), b = pz(sum(chaos, (r) => r.gehalt?.[f])); return `<tr><th scope="row">${n}</th><td class="z ${ton(a)}">${fmt(a)}</td><td class="z ${ton(b)}">${fmt(b)}</td></tr>`; }).join("")}</tbody></table></div>
</section>
<section class="karte">
<h2>Bedienung: lernt die App, und schadet ein Nutzer neben der Spur?</h2>
<p class="leise">Die App lernt aus den Antworten auf „bitte prüfen“ in einem Stapel und wird an einem anderen, ungesehenen Stapel gemessen. Der Nutzer „neben der Spur“ drückt meist „Stimmt“, wählt manchmal irgendetwas und verstellt auch Richtiges.</p>
<div class="tab"><table><thead><tr><th>Nutzer</th><th>gelernt aus</th><th>geprüft an</th><th>Antworten</th><th>davon falsch</th><th>Bereich ohne Lernen</th><th>Bereich mit Lernen</th></tr></thead><tbody>${lernZeilen}</tbody></table></div>
</section>
<section class="karte">
<h2>Ablage im echten Leben</h2>
<ul>
<li>Doppelte (OneDrive-Konfliktkopien, „(1)“, WhatsApp-Kopien): <b>${zahl(dopp.ok)} von ${zahl(dopp.n)}</b> erkannt, ${zahl(dopp.f)} fälschlich als doppelt.</li>
<li>Leere Dateien aus abgebrochener OneDrive-Synchronisierung gemeldet: <b>${fmt(pz(leer))}</b>.</li>
<li>E-Mail-Anhänge ausgepackt und einzeln einsortiert: <b>${fmt(pz(anh))}</b>.</li>
<li>BookLedgerPro an Kassenbons: Betrag <b>${fmt(pz(blpB))}</b>, Datum <b>${fmt(pz(blpD))}</b>. Buchungskonto (SKR03) an Geschäftsbelegen der Boutique: <b>${fmt(pz(blpK))}</b> – die Kontenregeln kennen Wareneingang aus dem Ausland, Kartengebühren und Werbung noch nicht.</li>
</ul>
</section>
<section class="karte">
<h2>Wo das Ergebnis zu gut aussehen kann</h2>
<ul>
<li><b>Generator und Kern stammen von derselben Hand.</b> „Ungesehen“ heißt hier: neue Startwerte, aber dieselben Briefvorlagen und Formulierungen, an denen der Kern trainiert wurde. Die Zahlen oben zeigen, wie gut er diese Vorlagen wiedererkennt – nicht echte Post.</li>
<li><b>Wortschatz aus den eigenen Vorlagen:</b> beim Training kamen Wörter dazu, die genau so in den Testbriefen stehen (z. B. „eur/l“, „hafenfest“, „verlagsvertrag“, „tierarzt“ bei Freizeit). Das ist Überanpassung.</li>
<li><b>Drei Erwartungen wurden während des Trainings geändert, alle zugunsten des Kerns:</b> Rundfunkbeitrag von „Verträge“ zu „Steuern &amp; Behörden“, Fahrkarte von „Rechnung“ zu „Brief“, bei Kassenbons und Fotos wird die Person nicht mehr gemessen (wer fotografiert hat, steht nicht auf dem Bon).</li>
<li><b>Die Familienakte wurde mit leerer Akte nachgestellt</b> (keine Personen, keine Vorgänge). Ihr Zuordnungsvorschlag kann so nie „eindeutig“ werden; darum landet bei ihr fast alles bei „bitte prüfen“. Mit gefüllter Akte wäre dieser Wert niedriger. Ihr Bereich und Absender sind fair gemessen (gleicher Text, gleicher Briefkopf-Leser wie in der App).</li>
<li><b>BookLedgerPro</b> wurde an Geschäfts- und Haushaltsbelegen gemessen, für die seine Kontenregeln nicht gebaut sind; der Wert ist eine Lückenliste, kein Urteil.</li>
<li><b>Der Nutzer „neben der Spur“</b> ist eine Annahme (die Hälfte „Stimmt“, ein Fünftel irgendetwas), keine Beobachtung.</li>
</ul>
</section>
<section class="karte">
<h2>Was das heißt und was es nicht heißt</h2>
<ul>
<li>Gemessen an erfundenen Unterlagen aus einem Generator. Echte Post ist vielfältiger; an echten Dateien wird es schlechter sein.</li>
<li>Die normalen Runden hat der Kern nie gesehen (neue Startwerte); trainiert wurde an anderen Runden.</li>
<li>Texterkennung: Tesseract mit den deutschen Sprachdaten der Familienakte. Handschrift und echte Handyfotos sind nicht dabei.</li>
<li>Die Familienakte arbeitet heute ohne diesen Kern. Der nächste Schritt ist, den Kern byte-gleich in die Familienakte zu übernehmen und dort dieselbe Probe zu fahren.</li>
</ul>
</section>
</div>`;
writeFileSync("ergebnisse/uebersicht.html", html);
console.log(`Übersicht: ${alleDateien} Dateien, ${runden.length} Runden, ${lernen.length} Bedien-Läufe → ergebnisse/uebersicht.html`);
