// Klick-Probe in Handy- und PC-Breite. Vorher im Repo-Ordner: python3 -m http.server 8765 ; dann: node tests/probe.cjs
// Bilder landen im Ordner p/ neben dem Aufrufort (vorher anlegen: mkdir -p p).
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const fehler = []; let n = 0;
  const soll = (ok, was) => { n++; if (!ok) fehler.push('SOLL: ' + was); };
  for (const [name, w, h] of [['handy',390,800],['pc',1280,800]]) {
    const p = await b.newPage({ viewport:{width:w,height:h} });
    p.on('console', m => { if (m.type()==='error' && !/net::ERR_FAILED/.test(m.text())) fehler.push(name+' console: '+m.text()); }); // ERR_FAILED: die Probe sperrt die Modell-Quellen mit Absicht
    p.on('pageerror', e => fehler.push(name+' fehler: '+e.message));
    await p.addInitScript(name => { window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name, {create:true}); }, name);
    await p.goto('http://localhost:8765/'); await p.waitForSelector('.werk');
    const breit = async wo => soll(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name+' quer scrollbar bei '+wo);
    const klick = async sel => { await p.locator(sel).first().click(); };
    const text = async () => await p.evaluate(() => document.body.innerText);
    await breit('start'); await p.screenshot({path:`p/${name}-1-start.png`});
    soll((await p.locator('.werk').count())===5, 'fünf Werkzeugknöpfe'); soll((await p.locator('#echt [data-a=echt-neu]').count())===0, 'kein zweiter Knopf „Datei hineinlegen“'); soll((await p.locator('[data-a=sicherung].rund').count())===0, 'kein Schild-Knopf'); soll((await p.locator('.ablegen, [data-a=landkarte]').count())===0, 'kein Ablegen, keine Landkarte'); soll((await p.locator('.nav button').count())===4, 'vier Bereiche');
    soll((await text()).includes('0.4.4 · Basic'), 'Fassung beim Namen');
    // Deine Unterlagen: echt, im Tresor der Familienakte (Browser-Speicher) – hineinlegen, neu laden, öffnen, herausnehmen
    await p.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1'); soll((await text()).includes('Noch nichts hineingelegt'), 'Tresor ist am Anfang leer');
    await p.setInputFiles('#echt-datei', {name:`Probe ${name}.txt`, mimeType:'text/plain', buffer:Buffer.from(`Erfundene Probe-Unterlage ${name}`)});
    await p.waitForSelector('[data-form=echt]'); await breit('echt hineinlegen'); await p.fill('[data-form=echt] [name=titel]', `Probe-Unterlage ${name}`);
    soll((await p.locator('#echt-bereiche option').count())===18, 'die 18 festen Bereiche der Familienakte zur Auswahl'); await p.fill('[data-form=echt] [name=bereich]', '  haus &  wohnung '); await p.fill('[data-form=echt] [name=datum]', '2026-11-03'); await klick('[data-form=echt] button[type=submit]');
    await p.waitForSelector('#echt [data-a=echt-auf]'); soll((await p.locator('#echt [data-a=echt-auf]').count())===1, 'eine echte Unterlage in der Liste');
    soll((await p.locator('#echt').innerText()).includes(`Probe-Unterlage ${name}`) && (await p.locator('#echt').innerText()).includes('Haus & Wohnung · 03.11.2026'), 'Titel, Bereich und Datum in der Zeile');
    await p.screenshot({path:`p/${name}-1b-echt.png`});
    await p.setInputFiles('#echt-datei', {name:`Probe ${name}.txt`, mimeType:'text/plain', buffer:Buffer.from(`Erfundene Probe-Unterlage ${name}`)});
    await p.waitForSelector('[data-form=echt]'); await p.fill('[data-form=echt] [name=bereich]', 'Archiv'); await klick('[data-form=echt] button[type=submit]');
    await p.waitForFunction(() => document.getElementById('toast').textContent.includes('Dublette')); soll(true, 'dieselbe Datei zweimal: der Tresor meldet die Dublette'); await klick('[data-a=zu]');
    await p.reload(); await p.waitForSelector('#echt [data-a=echt-auf]'); soll((await p.locator('#echt').innerText()).includes(`Probe-Unterlage ${name}`), 'nach dem Neuladen noch da');
    const inhalt = await p.evaluate(async () => { const t = window.PrivateAkteTresor, d = (await t.liste())[0]; return (await t.datei(d.id)).text(); }); soll(inhalt === `Erfundene Probe-Unterlage ${name}`, 'die Datei kommt unverändert aus dem Tresor');
    // Eigener Bereich: frei eingetippt, entsteht mit der Unterlage, steht danach zur Auswahl; andere Schreibweise = derselbe Bereich
    await p.setInputFiles('#echt-datei', {name:`Boot ${name}.txt`, mimeType:'text/plain', buffer:Buffer.from(`Erfundener Liegeplatz ${name}`)});
    await p.waitForSelector('[data-form=echt]'); await p.fill('[data-form=echt] [name=bereich]', 'Motorboot'); await klick('[data-form=echt] button[type=submit]');
    await p.waitForFunction(() => document.querySelectorAll('#echt [data-a=echt-auf]').length===2); soll((await p.locator('#echt').innerText()).includes('Motorboot'), 'eigener Bereich an der Unterlage');
    soll(await p.evaluate(() => echtBereiche().includes('Motorboot') && echtBereich(' motorBOOT ')==='Motorboot' && echtBereich('Segelboot')==='Segelboot' && echtBereich('Haus und Wohnung')==='Haus & Wohnung'), 'eigener Bereich steht zur Auswahl, andere Schreibweise ergibt denselben');
    await p.evaluate(async () => { const t = window.PrivateAkteTresor; await t.herausnehmen((await t.liste()).find(d => d.category==='Motorboot').id); }); await p.reload(); await p.waitForSelector('#echt [data-a=echt-auf]');
    // Suche: Wortsuche der Familienakte über die echten Unterlagen, X löscht
    await p.fill('.suche input','Probe'); soll(await p.locator('[data-a=suche-leer]').isVisible(), 'X erscheint beim Tippen'); await p.keyboard.press('Enter'); soll((await p.locator('#echt-treffer .zeile').count())>=1, 'Suche findet die echte Unterlage'); await klick('#echt-treffer .zeile'); soll((await text()).includes('in der Akte auf diesem Gerät'), 'Treffer öffnet die echte Unterlage'); await klick('[data-a=zu]');
    await klick('[data-a=suche-leer]'); soll((await p.inputValue('.suche input'))==='' && (await p.locator('#echt-treffer').count())===0 && !(await p.locator('[data-a=suche-leer]').isVisible()), 'X löscht die Eingabe und die Treffer');
    // Bedeutungssuche: nach „Finden“ fragt eine Zeile Ja/Nein; Nein blendet sie bis zum nächsten „Finden“ aus; ohne Netz meldet Ja den Fehler
    await p.waitForFunction(() => document.querySelector('.suche input')); await p.fill('.suche input','Probe'); await p.keyboard.press('Enter'); await p.waitForSelector('#bed-frage'); soll((await text()).includes('Auch nach Bedeutung suchen?'), 'nach Finden: Frage nach der Bedeutungssuche'); await breit('bedeutungsfrage'); await p.screenshot({path:`p/${name}-1d-bedeutung.png`});
    await klick('[data-a=bed-nein]'); soll((await p.locator('#bed-frage').count())===0, 'Nein blendet die Frage aus'); await p.keyboard.press('Enter'); await p.locator('.suche input').press('Enter'); await p.waitForSelector('#bed-frage'); soll(true, 'beim nächsten Finden ist die Frage wieder da');
    await p.route(/family-projekt\.de|huggingface\.co|jsdelivr\.net|unpkg\.com/, r => r.abort()); await klick('[data-a=bed-ja]'); await p.waitForSelector('.bedzeile.fehler', {timeout:30000}); soll((await text()).includes('Das Laden hat nicht geklappt'), 'ohne Netz: Laden meldet den Fehler, Wortsuche bleibt'); soll((await p.locator('#echt-treffer .zeile').count())>=1, 'Treffer der Wörter bleiben stehen'); await klick('[data-a=bed-nein]');
    // Treffer dem Sinn nach (Modell gestellt): stehen hinter den Wort-Treffern, mit eigener Marke
    await p.evaluate(async () => { const t = window.PrivateAkteTresor, d = (await t.liste())[0]; window.__echtSuchen = t.bedeutung.suchen; t.bedeutung.suchen = async () => [{id:d.id, naehe:0.42, roh:0.88, wort:false}]; bed.geladen = true; });
    await p.fill('.suche input','Zettel vom Arzt'); await p.keyboard.press('Enter'); await p.waitForSelector('#sinn-treffer .m-arbeit'); soll((await p.locator('#sinn-treffer').innerText()).includes('dem Sinn nach · 0,42') && (await p.locator('#bed-frage').count())===0, 'Treffer dem Sinn nach als eigener Abschnitt mit Nähe, keine Frage mehr');
    await p.fill('.suche input','Gehaltsabrechnung September'); await p.keyboard.press('Enter'); await p.waitForSelector('#beispiel-treffer'); soll((await p.locator('#beispiel-treffer').innerText()).includes('Gehaltsabrechnung Oktober 2026') && (await p.locator('#beispiel-treffer').innerText()).includes('nicht alle Wörter passen'), 'ein Wort passt nicht: der Rest wird trotzdem gefunden'); soll(await p.evaluate(() => { const b = document.querySelector('#beispiel-treffer'), s = document.querySelector('#sinn-treffer'); return !s || (b.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_FOLLOWING) > 0; }), 'Wort-Treffer stehen über „dem Sinn nach“');
    await p.fill('.suche input','Probe Kaktus'); await p.keyboard.press('Enter'); await p.waitForSelector('#echt-treffer'); soll((await p.locator('#echt-treffer').innerText()).includes('nicht alle Wörter passen'), 'echte Unterlagen: ein Wort passt nicht, der Rest wird gefunden'); await p.screenshot({path:`p/${name}-1e-sinn.png`});
    // Klaus' Bilder 0.4.0: Füll- und Bereichswörter dürfen im Rückfall nicht alles treffen; Fremdes lag dem Sinn nach bei 0,11 und 0,16
    await p.evaluate(() => { window.PrivateAkteTresor.bedeutung.suchen = async () => []; });
    await p.fill('.suche input','Dokumente für eine Auslandsreise'); await p.keyboard.press('Enter'); await p.waitForFunction(() => document.querySelector('.leer') || document.querySelector('#echt-treffer') || document.querySelector('#beispiel-treffer')); soll((await p.locator('#echt-treffer').count())===0 && (await p.locator('#beispiel-treffer').count())===0, 'Füllwörter und „Dokumente“ treffen nicht jede Unterlage');
    await p.fill('.suche input','was brauche ich für eine Auslandsreise'); await p.keyboard.press('Enter'); await p.waitForSelector('.leer'); soll((await p.locator('#beispiel-treffer').count())===0, '„was“ trifft nicht die Waschmaschine');
    await p.fill('.suche input','Ordnung auf japanisch'); await p.keyboard.press('Enter'); await p.waitForSelector('.leer'); soll((await p.locator('#beispiel-treffer').count())===0, '„auf“ trifft nicht den Kaufbeleg');
    await p.evaluate(async () => { const t = window.PrivateAkteTresor, d = (await t.liste())[0]; t.bedeutung.suchen = async () => [{id:d.id, naehe:0.16, roh:0.85, wort:false}]; });
    await p.fill('.suche input','Auslandsreise Unsinn'); await p.keyboard.press('Enter'); await p.waitForSelector('.leer'); await p.waitForTimeout(400); soll((await p.locator('#sinn-treffer').count())===0, 'Nähe 0,16 gilt als fremd und wird nicht gezeigt');
    // Der echte Suchweg mit gestelltem Rechner (das Sprachmodell kann die Probe nicht laden): Sage Modul 04 verschmilzt Wörter und
    // Bedeutung, der Mittelwert wird abgezogen. Der Rechner ahmt den hohen Boden nach: jeder Text bekommt denselben großen Anteil
    // und einen kleinen, der von seinen Wörtern abhängt.
    const sinnProbe = await p.evaluate(async () => {
      const t = window.PrivateAkteTresor; t.bedeutung.suchen = window.__echtSuchen;
      const vek = text => { const v = new Float32Array(384).fill(0.9 / Math.sqrt(384)); for (const w of text.toLowerCase().replace(/^(query|passage): /, '').split(/[^a-zäöüß0-9]+/).filter(x => x.length > 2)) { let h = 7; for (const c of w) h = (h * 31 + c.charCodeAt(0)) % 384; v[h] += 0.15; } const n = Math.hypot(...v); return v.map(x => x / n); };
      t.bedeutung.zurProbe(async text => vek(text));
      for (const [name, inhalt] of [['Rezept Apfelkuchen.txt','Apfelkuchen backen mit Zimt und Butter'],['Mietvertrag Wohnung.txt','Mietvertrag Wohnung Kaution Nebenkosten'],['Impfpass Kopie.txt','Impfung Tetanus Arzt Praxis']]) await t.ablegen(new File([inhalt], name, {type:'text/plain'}), {bereich:'Sonstiges', datum:null, titel:null, notiz:null});
      // Ein PDF mit Textebene: der Titel verrät nichts, die Wörter stehen nur im Inhalt
      const pdf = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 400 200]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n4 0 obj<</Length 62>>stream\nBT /F1 14 Tf 20 100 Td (Wolltuch fuer Laminat und Arbeitsplatte) Tj ET\nendstream endobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF';
      await t.ablegen(new File([pdf], 'Heft.pdf', {type:'application/pdf'}), {bereich:'Sonstiges', datum:null, titel:null, notiz:null});
      const liste = await t.liste(), h = await t.bedeutung.suchen('Kaution Wohnung', 'probe-stand'), kuchen = liste.find(d => d.originalName.startsWith('Rezept')), miete = liste.find(d => d.originalName.startsWith('Mietvertrag'));
      const heft = (await t.liste()).find(d => d.originalName === 'Heft.pdf'), hp = (await t.bedeutung.suchen('Laminat Wolltuch', 'probe-stand')).find(x => x.id === heft.id), hf = (await t.bedeutung.suchen('Kaution Wohnung', 'probe-stand')).find(x => x.id === heft.id);
      const aus = { pdf:!!(hp && hp.imText), pdfFremd:!!(hf && hf.imText), n:h.length, erster:h[0] && h[0].id === miete.id, wort:h[0] && h[0].wort, nah:h[0] && h[0].naehe, fremd:(h.find(x => x.id === kuchen.id) || {}).naehe, roh:(h.find(x => x.id === kuchen.id) || {}).roh };
      t.bedeutung.zurProbe(null); for (const d of liste) if (/^(Rezept|Mietvertrag|Impfpass|Heft)/.test(d.originalName)) await t.herausnehmen(d.id);
      return aus;
    });
    // Texterkennung: ein Foto mit gedrucktem Text wird auf dem Gerät gelesen (Tesseract aus dem Klon), der Auszug liegt an der Unterlage
    soll(await p.evaluate(async () => { const t = window.PrivateAkteTresor; return typeof t.bedeutung.gelesen === 'function' && t.bedeutung.lage() === ''; }), 'Lesestand ist abfragbar');
    const ocrProbe = await p.evaluate(async () => {
      const t = window.PrivateAkteTresor, c = document.createElement('canvas'); c.width = 1400; c.height = 500; const x = c.getContext('2d');
      x.fillStyle = '#fff'; x.fillRect(0, 0, 1400, 500); x.fillStyle = '#000'; x.font = '64px Arial'; x.fillText('Quittung Fahrradladen', 60, 160); x.fillText('Schlauch und Mantel 38,50 Euro', 60, 300);
      const blob = await new Promise(r => c.toBlob(r, 'image/png')), datei = new File([blob], 'Foto-Beleg.png', {type:'image/png'});
      const g = await t.textLesen(datei), d = await t.ablegen(datei, {bereich:'Sonstiges', datum:null, titel:null, notiz:null, text:g.text});
      const liste = await t.liste(), wort = t.suchen('Fahrradladen', liste).includes(d.id), auszug = (liste.find(e => e.id === d.id) || {}).textAuszug || '';
      await t.herausnehmen(d.id); return { art:g.art, text:g.text, wort, auszug:auszug.length };
    });
    soll(ocrProbe.art === 'erkannt' && /Fahrradladen/.test(ocrProbe.text) && ocrProbe.wort && ocrProbe.auszug > 10, 'Texterkennung liest ein Foto, die Wortsuche findet es über den Inhalt (' + JSON.stringify(ocrProbe) + ')');
    soll(sinnProbe.pdf && !sinnProbe.pdfFremd, 'PDF wird gelesen: Wörter aus dem Inhalt finden die Unterlage (' + JSON.stringify(sinnProbe) + ')');
    soll(sinnProbe.erster && sinnProbe.wort, 'Sage-Rangliste: die Unterlage mit den Wörtern der Frage steht vorn'); soll(sinnProbe.nah > 0.3 && sinnProbe.fremd < sinnProbe.nah / 2 && sinnProbe.roh > 0.8, 'zentrierte Nähe trennt: passend klar vorn, fremd höchstens halb so nah – obwohl der rohe Wert beim Fremden über 0,8 liegt (' + JSON.stringify(sinnProbe) + ')');
    await p.evaluate(() => { bed.geladen = false; bed.treffer = []; bed.zu = ''; echtLaden(); }); await klick('[data-a=suche-leer]'); await p.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1');

    // Zurück: schließt erst das Fenster, dann die Ansicht; die Seite bleibt dieselbe
    await klick('.nav [data-zu=baum]'); await klick('.werk[data-a=kalender]'); await p.waitForSelector('.fenster'); await p.goBack(); await p.waitForFunction(() => !document.querySelector('.fenster')); soll((await p.locator('.baumbild').count())===1, 'Zurück schließt das Fenster, der Baum bleibt');
    await p.goBack(); await p.waitForSelector('#echt'); soll(p.url()==='http://localhost:8765/' && (await p.locator('.baumbild').count())===0, 'Zurück geht vom Baum zum Start');
    await p.goBack(); await p.waitForFunction(() => document.getElementById('toast').textContent.includes('Du bist am Anfang')); soll(p.url()==='http://localhost:8765/' && (await p.locator('.werk').count())===5, 'Zurück am Anfang: die App bleibt offen und sagt es');
    await klick('.nav [data-zu=akten]'); await klick('.nav [data-zu=start]'); await p.goBack(); await p.waitForTimeout(300); soll((await p.locator('.werk').count())===5 && p.url()==='http://localhost:8765/', 'von Hand zurück zum Start: kein toter Schritt im Verlauf');
    // Mikrofon (gestellt): läuft das Diktat und man drückt „Finden“, endet es
    await p.evaluate(() => { window.__stopps = 0; sprech.sitzung = { stop(){ window.__stopps++; }, start(){}, active:true }; sprech.an = true; });
    await p.fill('.suche input','Probe'); await p.keyboard.press('Enter'); soll(await p.evaluate(() => window.__stopps >= 1 && sprech.an === false), 'Finden beendet ein laufendes Diktat'); await p.evaluate(() => { sprech.sitzung = null; }); await klick('[data-a=suche-leer]');
    // Tresor exportieren (verschlüsselter Ordner am gewählten Ort), Speicher des Browsers leeren, wieder importieren
    const kopf = async a => { if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? `.menue [data-a=${a}]` : `.kopfknoepfe [data-a=${a}]`); }; const sicherungAuf = () => kopf('export');
    await sicherungAuf(); soll((await text()).includes('1 Unterlage'), 'Sicherung zählt die echte Unterlage'); soll((await p.locator('#letzter-export').innerText()).includes('Noch kein Backup') || name==='pc', 'vor dem ersten Export: noch kein Ordner'); soll((await text()).includes('Backup erstellen') || name==='pc', 'erstes Mal: Tresor als Ordner anlegen'); await klick('[data-a=sich-export]');
    await p.fill('[name=p1]','kurz'); await p.fill('[name=p2]','kurz'); await p.evaluate(() => document.querySelector('[data-form=export]').noValidate = true); await klick('[data-form=export] button[type=submit]');
    await p.waitForFunction(() => document.getElementById('toast').textContent.includes('mindestens 10')); soll(true, 'zu kurzes Passwort wird abgewiesen');
    await p.fill('[name=p1]','Erfundenes-Probe-Passwort-1'); await p.fill('[name=p2]','Erfundenes-Probe-Passwort-1'); await klick('[data-form=export] button[type=submit]');
    await p.waitForSelector('#notfall', {timeout:60000}); soll((await p.locator('#notfall').innerText()).replace(/[^0-9A-Z]/g,'').length===52, 'Notfallschlüssel mit 52 Zeichen'); await breit('exportiert'); await p.screenshot({path:`p/${name}-1c-export.png`});
    const exp = await p.evaluate(async name => { const z = await (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name); const o = []; const lauf = async (h, pfad) => { for await (const [n, k] of h.entries()) { o.push(pfad+n); if (k.kind==='directory' && pfad.split('/').length < 3) await lauf(k, pfad+n+'/'); } }; await lauf(z, ''); return o; }, name);
    soll(exp.some(n => /^Privatakte_Backup_\d{4}-\d\d-\d\d_\d\d-\d\d-\d\d\/Familienakte_Vollsicherung_.*\/Vollsicherung_Verschluesselt\.json$/.test(n)) && !exp.some(n => /Register\.json$/.test(n)), 'Ordner „Privatakte_Backup_…“ am gewählten Ort, darin die Vollsicherung, Register nur verschlüsselt');
    const [blatt] = await Promise.all([p.waitForEvent('download'), klick('[data-a=sich-blatt]')]); soll(/^Notfallblatt_.*\.txt$/.test(blatt.suggestedFilename()), 'Notfallblatt als Datei'); await klick('.fenster .reihe [data-a=zu]');
    await sicherungAuf(); soll(/Letztes Backup: \d\d\.\d\d\.\d{4}/.test(await p.locator('#letzter-export').innerText()) && (await p.locator('#letzter-export').innerText()).includes('probe-ziel-'+name), 'Sicherung nennt, wann und wohin zuletzt exportiert wurde'); await klick('[data-a=zu]');
    await p.evaluate(async () => { const w = await navigator.storage.getDirectory(); for await (const [n] of w.entries()) if (!n.startsWith('probe-ziel-')) await w.removeEntry(n, {recursive:true}); for (const k of Object.keys(localStorage)) if (k !== 'private-akte-letzter-export') localStorage.removeItem(k); });
    await p.reload(); await p.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1'); soll((await text()).includes('Noch nichts hineingelegt'), 'Speicher des Browsers geleert: Tresor leer');
    await kopf('import'); soll((await p.locator('.fenster .zeile').count())===2 && (await text()).includes('Datei in die Akte legen') && (await text()).includes('Backup einlesen'), 'Importieren: Datei oder Backup'); await klick('[data-a=sich-import]'); await p.waitForSelector('[data-form=import]'); soll((await text()).includes('Privatakte_Backup_') && !(await text()).includes('Familienakte_Vollsicherung_'), 'Import nennt das gefundene Backup unter dem Namen Privatakte');
    await p.fill('[name=passwort]','Falsches-Passwort-123'); await klick('[data-form=import] button[type=submit]'); await p.waitForFunction(() => document.getElementById('toast').textContent.includes('passt nicht'), null, {timeout:60000}); soll(true, 'falsches Passwort wird abgewiesen');
    await p.fill('[name=passwort]','Erfundenes-Probe-Passwort-1'); await klick('[data-form=import] button[type=submit]'); await p.waitForSelector('#echt [data-a=echt-auf]', {timeout:60000});
    soll((await p.locator('#echt').innerText()).includes(`Probe-Unterlage ${name}`), 'nach dem Import wieder da');
    const zurueck = await p.evaluate(async () => { const t = window.PrivateAkteTresor, d = (await t.liste())[0]; return (await t.datei(d.id)).text(); }); soll(zurueck === `Erfundene Probe-Unterlage ${name}`, 'die Datei kommt unverändert aus dem Export zurück');
    await klick('#echt [data-a=echt-auf]'); soll((await text()).includes('in der Akte auf diesem Gerät'), 'Fenster der echten Unterlage'); await breit('echt offen'); await klick('[data-a=echt-raus]');
    await p.waitForFunction(() => !document.querySelector('#echt [data-a=echt-auf]')); soll((await text()).includes('Noch nichts hineingelegt'), 'herausgenommen: Liste wieder leer');
    if (name==='handy') { soll(await p.locator('[data-a=mehr]').isVisible(), 'Mehr-Knopf'); soll(!(await p.locator('.kopfknoepfe [data-a=drucken]').isVisible()), 'Drucken hinter Mehr');
      await klick('[data-a=mehr]'); await p.screenshot({path:`p/${name}-2-mehr.png`}); soll((await p.locator('.menue button').count())===5,'fünf Einträge hinter Mehr'); await p.keyboard.press('Escape'); }
    else soll(await p.locator('.kopfknoepfe [data-a=drucken]').isVisible(), 'Drucken sichtbar am PC');
    soll((await p.locator('.werk').first().innerText()).trim()==='', 'Werkzeugknöpfe ohne Beschriftung'); soll(await p.evaluate(() => { const r = document.querySelector('.werk').getBoundingClientRect(); return Math.abs(r.width-r.height) < 1; }), 'Werkzeugknöpfe rund');
    await p.hover('.werk[data-a=kalender]'); await p.waitForTimeout(600); soll(await p.locator('#tipp').isVisible() && (await p.locator('#tipp').innerText()).includes('Kalender'), 'Tooltip ohne Klick'); await p.screenshot({path:`p/${name}-1b-tipp.png`}); await p.mouse.move(5, 400); soll(!(await p.locator('#tipp').isVisible()), 'Tooltip geht wieder weg');
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=hilfe]' : '.kopfknoepfe [data-a=hilfe]'); await p.uncheck('[data-tippwahl]'); await klick('[data-a=zu]'); await p.hover('.werk[data-a=kalender]'); await p.waitForTimeout(600); soll(!(await p.locator('#tipp').isVisible()), 'Tooltips abschaltbar'); await p.mouse.move(5, 400);
    // Bon
    await klick('.werk[data-a=bon-start]'); soll((await text()).includes('An BookLedgerPro geben'), 'Portemonnaie mit BookLedger'); await p.screenshot({path:`p/${name}-3-geld.png`});
    const [dl] = await Promise.all([p.waitForEvent('download'), klick('[data-a=an-bookledger]')]); soll(dl.suggestedFilename()==='portemonnaie-2026-11.csv','CSV'); soll((await text()).includes('November übergeben'),'übergeben');
    await p.fill('[data-form=posten] [name=t]','Kino'); await p.fill('[data-form=posten] [name=w]','Freizeit'); await p.fill('[data-form=posten] [name=b]','12,50'); await klick('[data-form=posten] [value=aus]'); soll((await text()).includes('wofür: Freizeit'),'wofür');
    // Farbe der Stadt
    await klick('.fenster [data-a=farbe]'); await p.screenshot({path:`p/${name}-4-farbe.png`}); await klick('[data-farbe=koralle]'); soll(await p.evaluate(() => document.querySelector('.fenster.ast').style.getPropertyValue('--k1'))==='#f9c9ad','Stadtfarbe Koralle');
    // Büro
    await klick('.astnav [data-id=buero]'); soll((await p.locator('.kachel.gross').count())===4,'vier Kacheln'); soll((await text()).includes('Workflow PDF'),'Kachel Workflow PDF'); await p.screenshot({path:`p/${name}-5-buero.png`});
    await klick('.astnav.teil [data-teil=pdf]'); await klick('.fenster [data-a=scan]'); soll((await text()).includes('Neuer Scan'),'Scan'); await klick('[data-a=scan-zur-akte]'); soll((await text()).includes('Scan vom 17.11.2026'),'Scan im Eingang'); await breit('eingang'); await p.screenshot({path:`p/${name}-6-eingang.png`});
    // Bearbeiten mit aus dem Eingang -> Pseudo
    await klick('[data-a=mit][data-neu="201"]'); soll((await p.locator('[data-a=mit-wahl]').count())===6,'sechs Wege'); await p.screenshot({path:`p/${name}-7-mit.png`});
    await klick('[data-womit=pseudo]'); soll((await text()).includes('⟦STELLE-1⟧') && (await text()).includes('⟦NUMMER-1⟧'),'Pseudo'); await p.screenshot({path:`p/${name}-8-pseudo.png`}); await klick('[data-a=pseudo-sicht]'); soll((await text()).includes('A123456789'),'Original'); await klick('[data-a=zu]');
    // Unterlage -> Workflow PDF -> Zur Akte (Film)
    await klick('.nav [data-zu=akten]'); await klick('[data-a=bereich][data-id=wohnen]'); await klick('[data-a=doc][data-id="1"]'); await klick('.fenster [data-a=mit]'); await klick('[data-womit=pdf]'); soll((await text()).includes('Hier wurde etwas markiert'),'Kopie im PDF'); await klick('[data-a=zurueck]');
    soll((await p.locator('video.baumfilm').count())===1,'Film'); await p.waitForTimeout(600); await p.screenshot({path:`p/${name}-9-baum-film.png`});
    await p.evaluate(() => document.querySelector('video')?.remove()); await breit('baum'); await p.screenshot({path:`p/${name}-10-baum.png`});
    soll((await p.locator('.schild').count())===7,'Schilder'); soll((await p.locator('main .karte').count())===0 && !(await text()).includes('Bunte Kugeln'),'keine Erklärkarten am Baum'); soll(!(await text()).includes('Helfer tragen'),'kein Text über dem Film');
    soll((await p.locator('.wokasten.tresor').count())===1,'ein Tresor'); soll((await p.locator('.wozeile').count())===5,'fünf Fächer im Tresor'); soll((await p.locator('.wostadt').count())===5,'fünf Werkzeuge ohne Speicher'); soll((await text()).includes('1 · Hinzufügen') && (await text()).includes('3 · Tools') && !(await text()).includes('Städte'),'Hinzufügen und Werkzeugstätte'); soll((await text()).includes('der einzige Speicher'),'Wo liegt was'); await p.locator('#wo-liegt-was').scrollIntoViewIfNeeded(); await breit('wo liegt was'); await p.screenshot({path:`p/${name}-10b-wo.png`, fullPage:true}); 
    // Notiz mit Termin
    await klick('.werk[data-a=notiz]'); await klick('[data-a=sprechen]'); await p.fill('[name=titel]','Anruf Hausverwaltung'); await p.selectOption('[data-form=notiz] [name=bereich]','wohnen'); await p.fill('[name=vorgang]','Nebenkosten 2025'); await p.check('[name=termin]'); await p.screenshot({path:`p/${name}-11-notiz.png`}); await klick('[data-form=notiz] [type=submit]');
    soll((await text()).includes('Termin zu „Anruf Hausverwaltung“'),'Kalender zur Notiz'); await klick('[data-form=termin] [type=submit]'); soll((await p.locator('.fenster .liste .zeile').count())===4,'vier Termine'); await p.screenshot({path:`p/${name}-12-kalender.png`}); await klick('[data-a=zu]');
    // Organizer
    await klick('.werk[data-a=viele]'); await klick('[data-a=osort]'); await klick('[data-a=sort-zur-akte]'); await p.evaluate(() => document.querySelector('video')?.remove());
    // Mail
    await klick('.schild[data-id=mail]'); await klick('[data-a=mail-ki]'); soll((await text()).includes('⟦STELLE-1⟧'),'Mail an KI'); await klick('[data-a=zu]');
    // Suche + Mappe
    await klick('.nav [data-zu=start]'); soll((await p.locator('.chip, .unter').count())===0 && (await p.locator('h1.titel').isVisible())===(name==='pc'), 'Start ohne Beispiele und Erklärsatz, Überschrift nur am PC'); await p.fill('.suche input','Nebenkostenabrechnung'); await p.keyboard.press('Enter'); await p.locator('.haken').first().check(); await klick('[data-a=mappe]'); soll((await text()).includes('Zur Akte'),'Mappe'); await klick('[data-a=zu]');
    // Farbe der Akte kräftig
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=farbe]' : '.kopfknoepfe [data-a=farbe]'); await klick('[data-farbe=kraeftig]'); await klick('.nav [data-zu=start]'); await p.screenshot({path:`p/${name}-13-kraeftig.png`});
    // Drucken-Fenster, Hilfe, Fuß
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=drucken]' : '.kopfknoepfe [data-a=drucken]'); soll((await text()).includes('Einzelne Unterlage'),'Drucken'); await klick('[data-a=zu]');
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=hilfe]' : '.kopfknoepfe [data-a=hilfe]'); await p.screenshot({path:`p/${name}-14-hilfe.png`}); soll((await p.locator('.fenster a[href="./rechtliches.html"]').count())===1,'Hilfe-Link'); await klick('[data-a=zu]');
    soll((await p.locator('.fuss a').count())===4,'Fuß-Links');
    await p.goto('http://localhost:8765/rechtliches.html'); soll((await text()).includes('Impressum'),'rechtliches'); await breit('rechtliches');
    await p.close();
  }
  console.log(n+' Prüfungen, '+fehler.length+' Fehler'); fehler.forEach(f => console.log(' - '+f));
  await b.close();
})();
