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
    p.on('response', r => { if (r.status() === 404) fehler.push(name+' 404: '+r.url()); });
    await p.addInitScript(() => { localStorage.setItem('pa_klapp', JSON.stringify({echt:1, faellig:1, zuletzt:1})); });
    await p.addInitScript(name => { window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name, {create:true}); }, name);
    await p.goto('http://localhost:8765/'); await p.waitForSelector('.werk');
    const breit = async wo => soll(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name+' quer scrollbar bei '+wo);
    const klick = async sel => { await p.locator(sel).first().click(); };
    const text = async () => await p.evaluate(() => document.body.innerText);
    await breit('start'); await p.screenshot({path:`p/${name}-1-start.png`});
    soll((await p.locator('.werk').count())===5, 'fünf Werkzeugknöpfe'); soll((await p.locator('#echt [data-a=echt-neu]').count())===0, 'kein zweiter Knopf „Datei hineinlegen“'); soll((await p.locator('[data-a=sicherung].rund').count())===0, 'kein Schild-Knopf'); soll((await p.locator('.ablegen, [data-a=landkarte]').count())===0, 'kein Ablegen, keine Landkarte'); soll((await p.locator('.nav button').count())===4, 'vier Bereiche');
    soll((await text()).includes('0.6.3 · Basic'), 'Fassung beim Namen');
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
      const aus = { stelle:hp && hp.stelle, seite:hp && hp.seite, pdf:!!(hp && hp.imText), pdfFremd:!!(hf && hf.imText), n:h.length, erster:h[0] && h[0].id === miete.id, wort:h[0] && h[0].wort, nah:h[0] && h[0].naehe, fremd:(h.find(x => x.id === kuchen.id) || {}).naehe, roh:(h.find(x => x.id === kuchen.id) || {}).roh };
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
    // Ordner aus dem Datei-Organizer: Einordnung, Datum und Text kommen aus dem Index, Doppeltes bleibt draußen
    const ordProbe = await p.evaluate(async () => {
      const t = window.PrivateAkteTresor, wurzel = await navigator.storage.getDirectory(), o = await wurzel.getDirectoryHandle('probe-organizer', {create:true});
      const schreib = async (n, inhalt) => { const w = await (await o.getFileHandle(n, {create:true})).createWritable(); await w.write(inhalt); await w.close(); return (await (await o.getFileHandle(n)).getFile()).size; };
      const a = await schreib('Strom-Abschlag.txt', 'Abschlag Strom'), b = await schreib('Strom-Kopie.txt', 'Abschlag Strom Kopie'), c = await schreib('Ohne-Eintrag.txt', 'nichts');
      await schreib('organizer-index.json', JSON.stringify({format:'datei-organizer-index', fassung:1, dateien:[
        {pfad:'Strom-Abschlag.txt', groesse:a, pruefstand:'frei', kategorie:'Haus & Wohnung', schriftstueck:'Rechnung', datum:'2026-03-04', absender:'Stadtwerke Beispiel', sicherheit:{kategorie:'von dir'}, text:'Ihr neuer Abschlag beträgt 84 Euro. Zählernummer Beispiel.'},
        {pfad:'Strom-Kopie.txt', groesse:b, pruefstand:'doppelt', doppeltVon:'Strom-Abschlag.txt', kategorie:'Haus & Wohnung', sicherheit:{}}]}));
      const alt = window.showDirectoryPicker; window.showDirectoryPicker = async () => o;
      try {
        const r = await t.organizer.waehlen(), s = r.stuecke.find(x => x.name === 'Strom-Abschlag.txt'), k = r.stuecke.find(x => x.name === 'Strom-Kopie.txt');
        const e = await t.organizer.uebernehmen(r.stuecke.filter(x => !x.doppelt).map(x => ({name:x.name, bereich:x.bereich || 'Sonstiges'})));
        const liste = await t.liste(), d = liste.find(x => x.originalName === 'Strom-Abschlag.txt'), wort = d ? t.suchen('Zählernummer', liste).includes(d.id) : false;
        for (const x of liste) if (/^(Strom-|Ohne-)/.test(x.originalName)) await t.herausnehmen(x.id);
        return { index:r.index, bereich:s && s.bereich, datum:s && s.datum, art:s && s.art, text:s && s.text, doppelt:k && k.doppelt, abgelegt:e.abgelegt, fehler:e.fehler, kat:d && d.category, tag:d && d.documentDate, wort };
      } finally { window.showDirectoryPicker = alt; await wurzel.removeEntry('probe-organizer', {recursive:true}); }
    });
    soll(ordProbe.index && ordProbe.bereich === 'Haus & Wohnung' && ordProbe.datum === '2026-03-04' && ordProbe.art === 'Rechnung' && ordProbe.text && ordProbe.doppelt && ordProbe.abgelegt === 2 && ordProbe.kat === 'Haus & Wohnung' && ordProbe.wort, 'Ordner aus dem Datei-Organizer: Bereich, Datum und Text kommen mit, Doppeltes bleibt draußen (' + JSON.stringify(ordProbe) + ')');
    // Leser: das PDF in der Akte öffnen, auf der Seite der Fundstelle, die Wörter markiert, darin suchen
    const leserProbe = await p.evaluate(async () => {
      const t = window.PrivateAkteTresor, seite = (n, wort) => `BT /F1 14 Tf 20 100 Td (${wort}) Tj ET`;
      const pdf = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R 6 0 R]/Count 2>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 400 200]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n4 0 obj<</Length 60>>stream\nBT /F1 14 Tf 20 100 Td (Erste Seite ohne das gesuchte Wort) Tj ET\nendstream endobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n6 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 400 200]/Contents 7 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n7 0 obj<</Length 60>>stream\nBT /F1 14 Tf 20 100 Td (Hier steht Schmierseife im Text) Tj ET\nendstream endobj\ntrailer<</Root 1 0 R>>\n%%EOF';
      const d = await t.ablegen(new File([pdf], 'Leseheft.pdf', {type:'application/pdf'}), {bereich:'Sonstiges', datum:null, titel:null, notiz:null}); await echtLaden();
      await fLeser(d.id, 1, ''); const f = document.querySelector('.lesersuche'); f.q.value = 'Schmierseife'; f.requestSubmit();
      for (let i = 0; i < 60 && !(document.querySelector('.lesermarken i') && document.getElementById('leser-ort').textContent.startsWith('Seite 2')); i++) await new Promise(r => setTimeout(r, 100));
      const aus = { ort:document.getElementById('leser-ort').textContent, fund:document.getElementById('leser-fund').textContent, marken:+(document.querySelector('.lesermarken') || {dataset:{zahl:0}}).dataset.zahl };
      zu(); await t.herausnehmen(d.id); await echtLaden(); return aus;
    });
    soll(leserProbe.ort === 'Seite 2 von 2' && leserProbe.marken === 1 && /auf 1 Seite gefunden/.test(leserProbe.fund), 'Leser: Suche springt zur Seite mit dem Wort und markiert es (' + JSON.stringify(leserProbe) + ')');
    soll(sinnProbe.pdf && !sinnProbe.pdfFremd, 'PDF wird gelesen: Wörter aus dem Inhalt finden die Unterlage (' + JSON.stringify(sinnProbe) + ')');
    soll(/Wolltuch/.test(sinnProbe.stelle || '') && sinnProbe.seite === 1, 'Fundstelle: Ausschnitt mit dem Wort und die Seite');
    soll(sinnProbe.erster && sinnProbe.wort, 'Sage-Rangliste: die Unterlage mit den Wörtern der Frage steht vorn'); soll(sinnProbe.nah > 0.3 && sinnProbe.fremd < sinnProbe.nah / 2 && sinnProbe.roh > 0.8, 'zentrierte Nähe trennt: passend klar vorn, fremd höchstens halb so nah – obwohl der rohe Wert beim Fremden über 0,8 liegt (' + JSON.stringify(sinnProbe) + ')');
    await p.evaluate(() => { bed.geladen = false; bed.treffer = []; bed.zu = ''; echtLaden(); }); await klick('[data-a=suche-leer]'); await p.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1');

    // Zurück: schließt erst das Fenster, dann die Ansicht; die Seite bleibt dieselbe
    await klick('.nav [data-zu=baum]'); soll(!/Tippe ein Schild an|So ist die App gedacht|Die Zahlen sind/.test(await text()), 'Baum ohne Hinweistexte'); await klick('.werk[data-a=kalender]'); await p.waitForSelector('#rahmen'); await p.goBack(); await p.waitForFunction(() => !document.querySelector('#rahmen')); soll((await p.locator('.baumbild').count())===1, 'Zurück schließt das Fenster, der Baum bleibt');
    await p.goBack(); await p.waitForSelector('#echt'); soll(p.url()==='http://localhost:8765/' && (await p.locator('.baumbild').count())===0, 'Zurück geht vom Baum zum Start');
    await p.goBack(); await p.waitForFunction(() => document.getElementById('toast').textContent.includes('Du bist am Anfang')); soll(p.url()==='http://localhost:8765/' && (await p.locator('.werk').count())===5, 'Zurück am Anfang: die App bleibt offen und sagt es');
    await klick('.nav [data-zu=akten]'); await klick('.nav [data-zu=start]'); await p.goBack(); await p.waitForTimeout(300); soll((await p.locator('.werk').count())===5 && p.url()==='http://localhost:8765/', 'von Hand zurück zum Start: kein toter Schritt im Verlauf');
    // Mikrofon (gestellt): läuft das Diktat und man drückt „Finden“, endet es
    await p.evaluate(() => { window.__stopps = 0; sprech.sitzung = { stop(){ window.__stopps++; }, start(){}, active:true }; sprech.an = true; });
    await p.fill('.suche input','Probe'); await p.keyboard.press('Enter'); soll(await p.evaluate(() => window.__stopps >= 1 && sprech.an === false), 'Finden beendet ein laufendes Diktat'); await p.evaluate(() => { sprech.sitzung = null; }); await klick('[data-a=suche-leer]');
    // Tresor exportieren (verschlüsselter Ordner am gewählten Ort), Speicher des Browsers leeren, wieder importieren
    const kopf = async a => { if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? `.menue [data-a=${a}]` : `.kopfknoepfe [data-a=${a}]`); }; const sicherungAuf = () => kopf('export');
    await sicherungAuf(); soll((await text()).includes('1 Unterlage'), 'Sicherung zählt die echte Unterlage'); soll((await p.locator('#letzter-export').innerText()).includes('Noch kein Backup') || name==='pc', 'vor dem ersten Export: noch kein Ordner'); soll((await text()).includes('Backup erstellen') || name==='pc', 'erstes Mal: Tresor als Ordner anlegen'); await klick('[data-a=sich-export]');
    // Gelerntes des Datei-Organizers (gestellt): zwei Regeln und eine eigene Kategorie – sie müssen mit ins Backup und wieder zurück
    await p.evaluate(() => new Promise((ok, nein) => { localStorage.setItem('pa_do-eigene-kategorien', '["Motorboot"]'); const q = indexedDB.open('PrivateAkteOrganizer1', 1); q.onupgradeneeded = () => q.result.createObjectStore('kv'); q.onerror = () => nein(q.error); q.onsuccess = () => { const t = q.result.transaction('kv', 'readwrite'); t.objectStore('kv').put({fassung:1, ordnerName:'', quelle:'', stufe:0, dateien:[], verlauf:[], regeln:[{wenn:{absender:'Stadtwerke Probehausen'}, feld:'kategorie', dann:'Energie & Versorgung', anzahl:3, stimmen:{'Energie & Versorgung':3}}, {wenn:{absender:'Bootswerft Erfunden', sache:'Archiv'}, feld:'kategorie', dann:'Motorboot', anzahl:2}], zeit:''}, 'zustand'); t.oncomplete = () => { q.result.close(); ok(); }; }; }));
    await p.fill('[name=p1]','kurz'); await p.fill('[name=p2]','kurz'); await p.evaluate(() => document.querySelector('[data-form=export]').noValidate = true); await klick('[data-form=export] button[type=submit]');
    await p.waitForFunction(() => document.getElementById('toast').textContent.includes('mindestens 10')); soll(true, 'zu kurzes Passwort wird abgewiesen');
    await p.fill('[name=p1]','Erfundenes-Probe-Passwort-1'); await p.fill('[name=p2]','Erfundenes-Probe-Passwort-1'); await klick('[data-form=export] button[type=submit]');
    await p.waitForSelector('#notfall', {timeout:60000}); soll((await p.locator('#notfall').innerText()).replace(/[^0-9A-Z]/g,'').length===52, 'Notfallschlüssel mit 52 Zeichen'); await breit('exportiert'); await p.screenshot({path:`p/${name}-1c-export.png`});
    const exp = await p.evaluate(async name => { const z = await (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name); const o = []; const lauf = async (h, pfad) => { for await (const [n, k] of h.entries()) { o.push(pfad+n); if (k.kind==='directory' && pfad.split('/').length < 3) await lauf(k, pfad+n+'/'); } }; await lauf(z, ''); return o; }, name);
    soll(exp.some(n => /^Privatakte_Backup_\d{4}-\d\d-\d\d_\d\d-\d\d-\d\d\/Familienakte_Vollsicherung_.*\/Vollsicherung_Verschluesselt\.json$/.test(n)) && !exp.some(n => /Register\.json$/.test(n)), 'Ordner „Privatakte_Backup_…“ am gewählten Ort, darin die Vollsicherung, Register nur verschlüsselt');
    const gel = await p.evaluate(async name => { const z = await (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name); let t = ''; for await (const [n, k] of z.entries()) if (k.kind === 'directory' && n.startsWith('Privatakte_Backup_')) { try { t = await (await (await k.getFileHandle('Gelerntes.json')).getFile()).text(); } catch { /* fehlt */ } } return { da:t.includes('private-akte-gelerntes'), klar:/Stadtwerke|Motorboot|Bootswerft/.test(t), anzeige:document.getElementById('backup-gelernt')?.innerText || '' }; }, name);
    soll(gel.da && !gel.klar && /2 Regeln, 1 eigene Kategorie/.test(gel.anzeige), 'Backup: Gelerntes.json liegt im Backup-Ordner, verschlüsselt, und das Fenster nennt es (' + JSON.stringify(gel) + ')');
    const [blatt] = await Promise.all([p.waitForEvent('download'), klick('[data-a=sich-blatt]')]); soll(/^Notfallblatt_.*\.txt$/.test(blatt.suggestedFilename()), 'Notfallblatt als Datei'); await klick('.fenster .reihe [data-a=zu]');
    await sicherungAuf(); soll(/Letztes Backup: \d\d\.\d\d\.\d{4}/.test(await p.locator('#letzter-export').innerText()) && (await p.locator('#letzter-export').innerText()).includes('probe-ziel-'+name), 'Sicherung nennt, wann und wohin zuletzt exportiert wurde'); await klick('[data-a=zu]');
    await p.evaluate(async () => { const w = await navigator.storage.getDirectory(); for await (const [n] of w.entries()) if (!n.startsWith('probe-ziel-')) await w.removeEntry(n, {recursive:true}); for (const k of Object.keys(localStorage)) if (k !== 'private-akte-letzter-export') localStorage.removeItem(k); await new Promise(ok => { const q = indexedDB.deleteDatabase('PrivateAkteOrganizer1'); q.onsuccess = q.onerror = q.onblocked = () => ok(); }); });
    await p.reload(); await p.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1'); soll((await text()).includes('Noch nichts hineingelegt'), 'Speicher des Browsers geleert: Tresor leer');
    await kopf('import'); soll((await p.locator('.fenster .zeile').count())===3 && (await text()).includes('Datei in die Akte legen') && (await text()).includes('Ordner in die Akte legen') && (await text()).includes('Backup einlesen'), 'Importieren: Datei, Ordner oder Backup'); await klick('[data-a=sich-import]'); await p.waitForSelector('[data-form=import]'); soll((await text()).includes('Privatakte_Backup_') && !(await text()).includes('Familienakte_Vollsicherung_'), 'Import nennt das gefundene Backup unter dem Namen Privatakte');
    await p.fill('[name=passwort]','Falsches-Passwort-123'); await klick('[data-form=import] button[type=submit]'); await p.waitForFunction(() => document.getElementById('toast').textContent.includes('passt nicht'), null, {timeout:60000}); soll(true, 'falsches Passwort wird abgewiesen');
    await p.fill('[name=passwort]','Erfundenes-Probe-Passwort-1'); await klick('[data-form=import] button[type=submit]'); await p.waitForSelector('#echt [data-a=echt-auf]', {timeout:60000});
    soll((await p.locator('#echt').innerText()).includes(`Probe-Unterlage ${name}`), 'nach dem Import wieder da');
    const gelZurueck = await p.evaluate(async () => { const z = await new Promise(ok => { const q = indexedDB.open('PrivateAkteOrganizer1', 1); q.onupgradeneeded = () => q.result.createObjectStore('kv'); q.onsuccess = () => { const t = q.result.transaction('kv', 'readonly'), a = t.objectStore('kv').get('zustand'); t.oncomplete = () => { q.result.close(); ok(a.result); }; }; }); const zahl = await window.PrivateAkteTresor.sicherung.gelernt(); return { regeln:z ? z.regeln.map(r => r.wenn.absender + '>' + r.dann + ':' + r.anzahl) : [], kat:localStorage.getItem('pa_do-eigene-kategorien'), zahl, toast:document.getElementById('toast').textContent }; });
    soll(gelZurueck.regeln.length === 2 && gelZurueck.regeln[0] === 'Stadtwerke Probehausen>Energie & Versorgung:3' && gelZurueck.kat === '["Motorboot"]' && gelZurueck.zahl.regeln === 2 && /Gelerntes dazu: 2 Regeln/.test(gelZurueck.toast), 'Backup einlesen: die gelernten Regeln und die eigene Kategorie sind wieder da (' + JSON.stringify(gelZurueck) + ')');
    await p.evaluate(() => { indexedDB.deleteDatabase('PrivateAkteOrganizer1'); localStorage.removeItem('pa_do-eigene-kategorien'); });
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
    await klick('.astnav.teil [data-teil=pdf]'); await p.evaluate(() => { s.scan = true; fStadt('buero', [], 'pdf'); }); soll((await text()).includes('Neuer Scan') && (await p.locator('.fenster [data-a=wfpdf]').count())===1,'Scan (Beispiel) und Knopf Workflow PDF öffnen'); await klick('[data-a=scan-zur-akte]'); soll((await text()).includes('Scan vom 17.11.2026'),'Scan im Eingang'); await breit('eingang'); await p.screenshot({path:`p/${name}-6-eingang.png`});
    // Bearbeiten mit aus dem Eingang -> Pseudo
    await klick('[data-a=mit][data-neu="201"]'); soll((await p.locator('[data-a=mit-wahl]').count())===6,'sechs Wege'); await p.screenshot({path:`p/${name}-7-mit.png`});
    await klick('[data-womit=pseudo]'); soll((await text()).includes('⟦STELLE-1⟧') && (await text()).includes('⟦NUMMER-1⟧'),'Pseudo'); await p.screenshot({path:`p/${name}-8-pseudo.png`}); await klick('[data-a=pseudo-sicht]'); soll((await text()).includes('A123456789'),'Original'); await klick('[data-a=zu]');
    // Unterlage -> Workflow PDF -> Zur Akte (Film)
    await klick('.nav [data-zu=akten]'); await klick('[data-a=bereich][data-id=wohnen]'); await klick('[data-a=doc][data-id="1"]'); await klick('.fenster [data-a=mit]'); await klick('[data-womit=pdf]'); soll((await text()).includes('Hier wurde etwas markiert'),'Kopie im PDF'); await klick('[data-a=zurueck]');
    soll((await p.locator('video.baumfilm').count())===1,'Film'); await p.waitForTimeout(600); await p.screenshot({path:`p/${name}-9-baum-film.png`});
    await p.evaluate(() => document.querySelector('video')?.remove()); await breit('baum'); await p.screenshot({path:`p/${name}-10-baum.png`});
    soll((await p.locator('.schild').count())===8,'Schilder'); soll((await p.locator('main .karte').count())===0 && !(await text()).includes('Bunte Kugeln'),'keine Erklärkarten am Baum'); soll(!(await text()).includes('Helfer tragen'),'kein Text über dem Film');
    soll((await p.locator('.wokasten.tresor').count())===1,'ein Tresor'); soll((await p.locator('.wozeile').count())===5,'fünf Fächer im Tresor'); soll((await p.locator('.wostadt').count())===6,'sechs Werkzeuge ohne Speicher'); soll((await text()).includes('1 · Hinzufügen') && (await text()).includes('3 · Tools') && !(await text()).includes('Städte'),'Hinzufügen und Werkzeugstätte'); soll((await text()).includes('der einzige Speicher'),'Wo liegt was'); await p.locator('#wo-liegt-was').scrollIntoViewIfNeeded(); await breit('wo liegt was'); await p.screenshot({path:`p/${name}-10b-wo.png`, fullPage:true}); 
    // Kalender und Notizen, echt (0.6.0): die Ansicht der Familienakte im Rahmen, gespeichert im Tresor
    {
      const tagVon = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const heute = tagVon(new Date()), morgen = tagVon(new Date(Date.now() + 864e5));
      await p.evaluate(() => { zu(); s.frage = ''; s.bereich = null; s.ansicht = 'start'; zeigen(); }); await p.waitForSelector('#faellig');
      soll((await p.locator('#faellig').innerText()).includes('nichts offen'), 'Fällig ist am Anfang leer (keine Beispiele mehr)');
      soll(await p.locator('#glocke').count() === 1 && !(await p.locator('#glocke').isVisible()), 'Glocke läuft unsichtbar mit'); soll((await p.locator('#kopfknoepfe .glockenknopf').getAttribute('data-stand')) === 'grau' && await p.locator('#kopfknoepfe .glockenknopf').isVisible(), 'Glockensymbol oben ist grau: keine Erinnerung gespeichert');
      soll(await p.locator('#kopfknoepfe .glockenknopf').evaluate(e => { const c = getComputedStyle(e); return c.backgroundColor === 'rgba(0, 0, 0, 0)' && c.boxShadow === 'none'; }), 'Glocke ist ein durchsichtiger Knopf: nur das Symbol');
      await klick('.werk[data-a=notiz]'); await p.waitForSelector('#rahmen'); const kal = p.frameLocator('#rahmen');
      await kal.locator('[data-notiz-fenster]').waitFor({timeout:30000}); await kal.locator('[data-notiz-eingabe]').fill('Erinnere mich morgen um 9 Uhr, die Hausverwaltung anzurufen');
      await kal.locator('[data-notiz-speichern]').click(); await kal.locator('[data-notiz-eintrag]').waitFor(); await p.screenshot({path:`p/${name}-11-notiz.png`});
      await kal.locator('[data-notiz-fertig]').click(); await kal.locator('[data-pa-notiz]').waitFor();
      soll((await kal.locator('[data-pa-notizen]').innerText()).includes('Hausverwaltung') && (await kal.locator('[data-pa-notiz]').count()) === 1, 'Notiz liegt in der Akte (Liste „Notizen“)');
      soll((await kal.locator(`[data-mk-tag="${morgen}"] .mk-punkt`).count()) === 1, 'Notiz mit Datum steht im Kalender am Tag von morgen');
      soll(/gespeichert/.test(await p.locator('#rahmen-meldung').innerText()), 'Bestätigung der Notiz in der Leiste des Rahmens');
      // Eintrag von Hand, 15 Minuten vor seiner Uhrzeit läutet die Glocke: Uhrzeit so, dass sie in der nächsten Minute fällig ist
      const um = new Date(Math.ceil((Date.now() + 5000) / 60000) * 60000 + 15 * 60000), uhr = `${String(um.getHours()).padStart(2,'0')}:${String(um.getMinutes()).padStart(2,'0')}`, glockeGeht = tagVon(um) === heute;
      await kal.locator(`[data-mk-tag="${heute}"]`).click(); await kal.locator('[data-mk-neu]').click(); await kal.locator('[data-mk-titel]').fill(`Zählerablesung ${name}`); if (glockeGeht) await kal.locator('[data-mk-uhr]').fill(uhr);
      await kal.locator('[data-mk-speichern]').click(); await kal.locator('[data-mk-eintrag]').first().waitFor(); await breit('kalender');
      soll((await kal.locator('.mk-tagesliste').innerText()).includes(`Zählerablesung ${name}`), 'Eintrag steht in der Tagesliste von heute'); await p.screenshot({path:`p/${name}-12-kalender.png`});
      await kal.locator('[data-kalender-aufklapper]').first().click(); soll(/Google/.test(await kal.locator('[data-pa-verbinden]').innerText()) && /Microsoft|Outlook/.test(await kal.locator('[data-pa-verbinden]').innerText()), 'Kalender verbinden bietet Google und Microsoft an');
      soll((await kal.locator('.site-header').count()) === 0 && (await kal.locator('[data-pa-notizen] .card-heading [data-notiz-knopf]').count()) === 1, 'keine eigene Kopfreihe im Kalender, der Erinnerungs-Knopf sitzt im Kopf der Karte „Notizen“');
      soll((await p.locator('.rahmenfenster .fkopf').evaluate(e => e.offsetHeight)) <= 48, 'Leiste des Rahmens bleibt flach (Bestätigung einzeilig)');
      await kal.locator('.seitenleiste-griff').click(); soll((await kal.locator('[data-leiste=oben]').count()) === 1 && (await kal.locator('[data-leiste=unten]').count()) === 1 && (await kal.locator('[data-leiste=zurueck]').count()) === 1, 'Seitenleiste der Familienakte: nach oben, nach unten, zurück');
      await kal.locator('[data-leiste=zurueck]').click(); await p.waitForFunction(() => !document.querySelector('#rahmen')); soll(true, 'Seitenleiste: „Zurück“ schließt den Kalender');
      await p.waitForFunction(() => /Zählerablesung/.test(document.querySelector('#faellig')?.innerText || ''));
      const f = await p.locator('#faellig').innerText();
      soll(f.includes('2 Einträge') && /Zählerablesung[^\n]*\n[^\n]*\n?heute/.test(f) && /Hausverwaltung/.test(f) && f.includes('morgen'), 'Fällig zeigt die zwei echten Einträge mit heute und morgen (' + f.replace(/\n/g, ' | ') + ')');
      soll(await p.evaluate(async () => { const k = await window.PrivateAkteTresor.kalender.termine(); return k.termine.length === 2 && k.notizen === 1; }), 'Tresor: zwei offene Termine, eine Notiz');
      const gk = '#kopfknoepfe .glockenknopf';
      soll((await p.locator(gk).getAttribute('data-stand')) === 'gruen' && (await p.locator(gk + ' .gzahl').count()) === 0, 'Glocke ist grün ohne Zahl: Einträge gespeichert, nichts fällig');
      if (glockeGeht) { await p.waitForSelector(gk + '.laeutet', {timeout:100000}).catch(() => {});
        soll((await p.locator(gk + '.laeutet').count()) === 1 && !(await p.locator('#glocke').isVisible()), 'Erinnerung läutet (15 Min. vorher): die Glocke meldet es, nichts schiebt sich über die Seite'); }
      // Glockenfeld: alle offenen Einträge, einzeln öffnen oder abhaken
      await klick(gk); await p.waitForSelector('.glockenfeld .gzeile'); await breit('glockenfeld');
      { const g = await p.locator('.glockenfeld').innerText(); soll((await p.locator('.glockenfeld .gzeile').count()) === 2 && /Zählerablesung/.test(g) && /Hausverwaltung/.test(g), 'Glockenfeld zeigt beide Einträge'); } await p.screenshot({path:`p/${name}-12b-glocke.png`});
      soll((await p.locator('.glockenfeld .gtun').count()) === 0, 'Glockenfeld: Zeilen sind zugeklappt, keine Knöpfe zu sehen'); await p.locator('.glockenfeld .gzeile', {hasText:'Hausverwaltung'}).locator('[data-a=glocke-auf]').click(); soll(/Öffnen\s*Erledigt/.test(await p.locator('.glockenfeld .gzeile.auf .gtun').innerText()), 'Pfeil klappt die Zeile auf: „Öffnen“ und „Erledigt“');
      await p.locator('.glockenfeld .gzeile.auf .gtun [data-a=kal-tag]').click(); await p.waitForSelector('#rahmen');
      await p.frameLocator('#rahmen').locator(`[data-mk-tag="${morgen}"].gewaehlt`).waitFor({timeout:30000}); soll((await p.locator('.glockenfeld').count()) === 0, '„Öffnen“ im Glockenfeld öffnet den Kalender an dem Tag');
      // Überfälliges: gestern eintragen (wenn gestern im selben Monat steht) – Glocke rot mit Zahl, im Feld abhaken
      const gestern = tagVon(new Date(Date.now() - 864e5));
      if (gestern.slice(0, 7) === heute.slice(0, 7)) { const k3 = p.frameLocator('#rahmen');
        await k3.locator(`[data-mk-tag="${gestern}"]`).click(); await k3.locator('[data-mk-neu]').click(); await k3.locator('[data-mk-titel]').fill('Versäumtes Probe'); await k3.locator('[data-mk-speichern]').click(); await k3.locator('[data-mk-formular]').waitFor({state:'detached'});
        await p.waitForSelector('.rahmenfenster .glockenknopf[data-stand=rot]'); soll((await p.locator('.rahmenfenster .glockenknopf .gzahl').innerText()) === '1', 'Glocke in der Leiste des Rahmens: rot mit der Zahl 1 (ein Eintrag überfällig)');
        soll((await p.locator('.rahmenfenster .fkopf').evaluate(e => e.offsetHeight)) <= 48, 'Leiste des Rahmens bleibt flach, auch mit Glocke');
        await klick('[data-a=rahmen-zu]'); await p.waitForSelector(gk + '[data-stand=rot]'); await klick(gk);
        soll((await p.locator('.glockenfeld .gzeile.rot').count()) === 1 && /überfällig/.test(await p.locator('.glockenfeld .gzeile.rot').innerText()), 'Glockenfeld: der überfällige Eintrag ist rot markiert');
        await p.locator('.glockenfeld .gzeile.rot [data-a=glocke-auf]').click(); await p.locator('.glockenfeld .gzeile.rot [data-a=glocke-erledigt]').click(); await p.waitForSelector(gk + '[data-stand=gruen]'); soll((await p.locator('.glockenfeld .gzeile').count()) === 2 && (await p.locator(gk + ' .gzahl').count()) === 0, 'Abhaken im Glockenfeld: Eintrag weg, Glocke wieder grün');
      } else { await klick('[data-a=rahmen-zu]'); await klick(gk); }
      { const z = p.locator('.glockenfeld .gzeile', {hasText:'Hausverwaltung'}); if (!(await z.locator('[data-a=glocke-erledigt]').count())) await z.locator('[data-a=glocke-auf]').click(); await z.locator('[data-a=glocke-erledigt]').click(); } await p.waitForFunction(() => document.querySelectorAll('.glockenfeld .gzeile').length === 1);
      await p.mouse.click(5, h - 5); await p.waitForFunction(() => !document.querySelector('.glockenfeld')); soll(true, 'Tipp daneben schließt das Glockenfeld');
      await p.waitForFunction(() => !/Hausverwaltung/.test(document.querySelector('#faellig')?.innerText || 'Hausverwaltung'));
      soll((await p.locator('#faellig').innerText()).includes('1 Eintrag'), 'Erledigtes steht nicht mehr unter Fällig');
    }
    // Baum über „Deine Unterlagen“ (0.6.2): „Alle Unterlagen“ mit Zahl, aufklappen zeigt Gruppen, Tipp auf eine Gruppe zeigt nur sie; je 30 Stück
    { await p.evaluate(async () => { const t = window.PrivateAkteTresor; for (let i = 1; i <= 34; i++) await t.ablegen(new File(['Baumprobe ' + i], `Baumprobe-${String(i).padStart(2, '0')}.txt`, {type:'text/plain'}), {bereich:i % 2 ? 'Reisen & Freizeit' : 'Versicherungen', datum:i % 2 ? '2024-05-01' : '2025-06-01', titel:null, notiz:null}); klapp.ebaum = 0; echt.knoten = null; await echtLaden(); mainZeigen(); });
      const gesamt = await p.evaluate(() => echt.liste.length);
      soll((await p.locator('#echt .eknoten.alle b').innerText()) === String(gesamt) && (await p.locator('#echt .eknoten:not(.alle)').count()) === 0, 'Baum: „Alle Unterlagen“ zeigt die Gesamtzahl, eingeklappt keine Gruppen');
      soll((await p.locator('#echt > summary').evaluate(e => e.offsetHeight)) <= 44 && !/gespeichert/.test(await p.locator('#echt > summary').innerText()), 'Kopf „Deine Unterlagen“ ist eine Zeile, nur mit der Zahl');
      soll((await p.locator('#echt [data-a=echt-auf]').count()) === 30 && (await p.locator('#echt [data-a=echt-mehr]').innerText()).includes(`30 von ${gesamt}`), 'Liste zeigt 30 Stück und „Weitere zeigen“');
      soll((await p.locator('#echt [data-a=echt-auf]').first().evaluate(e => e.offsetHeight)) <= 44, 'Zeilen in „Deine Unterlagen“ sind flach (höchstens 44 px)');
      await klick('#echt .eknoten.alle'); await p.waitForSelector('#echt .eknoten:not(.alle)');
      const gr = await p.evaluate(() => [...document.querySelectorAll('#echt .eknoten:not(.alle)')].map(e => [e.querySelector('.ename').innerText, +e.querySelector('b').innerText]));
      soll(gr.some(g => g[0] === 'Reisen & Freizeit' && g[1] === 17) && gr.some(g => g[0] === 'Versicherungen' && g[1] === 17) && gr.reduce((a, g) => a + g[1], 0) === gesamt, 'Baum aufgeklappt: Bereiche mit ihren Zahlen, Summe = Gesamtzahl (' + JSON.stringify(gr) + ')');
      await p.locator('#echt .eknoten', {hasText:'Versicherungen'}).click(); await p.waitForSelector('#echt .egewaehlt');
      soll((await p.locator('#echt [data-a=echt-auf]').count()) === 17 && (await p.locator('#echt [data-a=echt-auf] small').allInnerTexts()).every(t => t.startsWith('Versicherungen')), 'Tipp auf einen Bereich zeigt nur dessen 17 Unterlagen');
      await p.selectOption('#echt-sort', 'datum'); await p.waitForFunction(() => [...document.querySelectorAll('#echt .eknoten:not(.alle) .ename')].some(e => e.innerText === '2025'));
      soll((await p.locator('#echt .eknoten', {hasText:'2025'}).locator('b').innerText()) === '17', 'Sortieren nach Datum: der Baum zeigt Jahre mit Zahlen');
      await p.selectOption('#echt-sort', 'art'); await p.waitForFunction(() => [...document.querySelectorAll('#echt .eknoten:not(.alle) .ename')].some(e => e.innerText === 'TXT')); soll(true, 'Sortieren nach Art der Datei: der Baum zeigt die Dateiarten');
      await p.selectOption('#echt-sort', 'neu'); await klick('#echt .eknoten.alle'); await p.waitForFunction(() => !document.querySelector('#echt .eknoten:not(.alle)')); await breit('baum der unterlagen'); await p.screenshot({path:`p/${name}-12d-unterlagen.png`});
      soll(!/Gespeichert wird nur|Alles andere ist erfunden/.test(await text()), 'Startseite ohne den Text „Vorschau … gespeichert wird nur …“');
      // Vorschläge beim Tippen: Wortanfänge in Titel und gelesenem Text, ohne „Finden“
      await p.evaluate(async () => { await window.PrivateAkteTresor.ablegen(new File(['Vorschlagsprobe'], 'Baumprobe-Rezeptheft.txt', {type:'text/plain'}), {bereich:'Sonstiges', datum:null, titel:null, notiz:null, text:'Zutaten für den Zitronenkuchen: Mehl, Butter, Zucker'}); await echtLaden(); mainZeigen(); });
      const q = '.suche input[name=q]';
      await p.fill(q, 'b'); await p.waitForTimeout(250); soll((await p.locator('#suchvor .zeile').count()) === 0, 'Vorschläge: bei einem Buchstaben noch nichts');
      await p.fill(q, 'baumpr'); await p.waitForSelector('#suchvor .zeile'); soll((await p.locator('#suchvor .zeile').count()) === 6 && (await p.locator('#suchvor .zeile strong').allInnerTexts()).every(t => /^Baumprobe/.test(t)), 'Vorschläge: „baumpr“ zeigt sofort sechs passende Unterlagen');
      await p.fill(q, 'baumprobe 07'); await p.waitForFunction(() => { const z = document.querySelectorAll('#suchvor .zeile'); return z.length === 1 && /07/.test(z[0].innerText); }); soll((await p.locator('#suchvor .zeile strong').innerText()).startsWith('Baumprobe-07'), 'Vorschläge: jedes Wort muss passen – „baumprobe 07“ lässt genau eine übrig'); await p.screenshot({path:`p/${name}-12e-vorschlag.png`});
      await p.fill(q, 'zitr'); await p.waitForFunction(() => { const z = document.querySelectorAll('#suchvor .zeile'); return z.length === 1 && /Rezeptheft/.test(z[0].innerText); }, null, {timeout:5000}).catch(() => {}); soll((await p.locator('#suchvor .zeile').count()) === 1 && /Rezeptheft/.test(await p.locator('#suchvor .zeile').innerText()), 'Vorschläge: „zitr“ findet die Unterlage über ihren gelesenen Text');
      await p.fill(q, 'xyzq'); await p.waitForFunction(() => !document.querySelector('#suchvor .zeile')); soll(true, 'Vorschläge: nichts Passendes – kein Vorschlag');
      const dauer = await p.evaluate(() => { const t0 = performance.now(); for (let i = 0; i < 20; i++) suchVorschlaege('baumpr'); return (performance.now() - t0) / 20; }); soll(dauer < 30, 'Vorschläge rechnen schnell (' + dauer.toFixed(1) + ' ms je Eingabe bei ' + gesamt + ' Unterlagen)');
      await p.fill(q, 'zitr'); await p.waitForFunction(() => /Rezeptheft/.test(document.querySelector('#suchvor .zeile')?.innerText || '')); await klick('#suchvor .zeile'); await p.waitForSelector('.fenster'); soll((await p.locator('.fenster').innerText()).includes('Rezeptheft'), 'Tipp auf einen Vorschlag öffnet die Unterlage'); await klick('[data-a=zu]');
      await p.fill(q, ''); await p.waitForFunction(() => !document.querySelector('#suchvor .zeile'));
      await p.evaluate(async () => { const t = window.PrivateAkteTresor; for (const d of await t.liste()) if (/^Baumprobe-/.test(d.originalName)) await t.herausnehmen(d.id); await echtLaden(); mainZeigen(); });
    }
    // Seitenleiste am Handy (0.6.1): Griff rechts, nach oben/unten, Zurück, Startseite, Baum und was hinter „⋯“ liegt; am Monitor nicht
    if (name === 'pc') { soll(await p.locator('.seitenleiste-griff').isVisible(), 'Seitenleiste: auch bei 1280 px da (geteilter Bildschirm, Tablet quer)'); await p.setViewportSize({width:1500, height:h}); soll(!(await p.locator('.seitenleiste-griff').isVisible()), 'Seitenleiste: am großen Monitor (1500 px) nicht zu sehen'); await p.setViewportSize({width:w, height:h}); }
    else {
      soll(await p.locator('.seitenleiste-griff').isVisible(), 'Seitenleiste: Griff am rechten Rand im Handyformat'); await klick('.seitenleiste-griff'); await breit('seitenleiste');
      { const t = await p.locator('.seitenleiste-knoepfe').innerText(); soll(/Nach oben/.test(t) && /Nach unten/.test(t) && /Akten/.test(t) && /Eingang/.test(t) && /Baum/.test(t) && /Importieren/.test(t) && /Exportieren/.test(t) && /Drucken/.test(t) && /Farbpalette/.test(t) && !/Startseite/.test(t), 'Seitenleiste: hoch, runter, Baum und die Funktionen aus „⋯“; auf der Startseite keine „Startseite“ (' + t.replace(/\n/g, ' | ') + ')'); } await p.screenshot({path:`p/${name}-12c-seitenleiste.png`});
      await klick('.seitenleiste [data-a=leiste-unten]'); await p.waitForFunction(() => scrollY > 100); soll(!(await p.locator('.seitenleiste-knoepfe').count()), 'Seitenleiste: „Nach unten“ rollt ans Ende und klappt zu');
      await klick('.seitenleiste-griff'); await klick('.seitenleiste [data-a=leiste-oben]'); await p.waitForFunction(() => scrollY === 0); soll(true, 'Seitenleiste: „Nach oben“ rollt an den Anfang');
      await klick('.seitenleiste-griff'); await klick('.seitenleiste [data-a=geh][data-zu=baum]'); await p.waitForSelector('.baumbild'); await klick('.seitenleiste-griff');
      soll((await p.locator('.seitenleiste [data-a=leiste-zurueck]').count()) === 1 && (await p.locator('.seitenleiste [data-a=geh][data-zu=start]').count()) === 1, 'Seitenleiste: im Baum gibt es „Zurück“ und „Startseite“');
      await klick('.seitenleiste [data-a=leiste-zurueck]'); await p.waitForSelector('#faellig'); soll(true, 'Seitenleiste: „Zurück“ geht einen Schritt zurück');
      // Verschieben: Griff nach links oben ziehen – bleibt dort, auch nach dem Neuzeichnen; Tipp öffnet weiter
      { const g = await p.locator('.seitenleiste-griff').boundingBox(); soll(g.x > w / 2 && g.y > h / 2, 'Seitenleiste: ab Werk rechts, unterhalb der Mitte');
        await p.mouse.move(g.x + g.width / 2, g.y + g.height / 2); await p.mouse.down(); await p.mouse.move(w / 2, h / 2, {steps:4}); soll(await p.locator('.seitenleiste.zieht').count() === 1, 'Seitenleiste: beim Ziehen wird der Griff zum runden Knopf mit Pfeilen'); await p.mouse.move(30, 240, {steps:4}); await p.mouse.up();
        const n = await p.locator('.seitenleiste-griff').boundingBox(); soll(n.x < 5 && Math.abs(n.y + n.height / 2 - 240) < 20 && (await p.locator('.seitenleiste-knoepfe').count()) === 0, 'Seitenleiste: liegt nach dem Ziehen am linken Rand auf der neuen Höhe und klappt dabei nicht auf');
        soll(JSON.parse(await p.evaluate(() => localStorage.getItem('pa_leiste'))).seite === 'l', 'Seitenleiste: die Stelle wird gemerkt'); await p.waitForTimeout(550);
        await klick('.seitenleiste-griff'); soll((await p.locator('.seitenleiste.links .seitenleiste-knoepfe').count()) === 1, 'Seitenleiste: öffnet auch links'); await p.screenshot({path:`p/${name}-12f-leiste-links.png`}); await klick('.seitenleiste [data-a=leiste-zu]');
        // langer Druck ohne Bewegung macht den Griff zum Verschiebe-Knopf; unten losgelassen dockt die Leiste unten an und ersetzt die untere Leiste
        { const g2 = await p.locator('.seitenleiste-griff').boundingBox(); await p.mouse.move(g2.x + g2.width / 2, g2.y + g2.height / 2); await p.mouse.down(); await p.waitForSelector('.seitenleiste.zieht', {timeout:3000}).catch(() => {}); soll((await p.locator('.seitenleiste.zieht').count()) === 1, 'Seitenleiste: langer Druck macht den Griff zum Verschiebe-Knopf');
          await p.mouse.move(w / 2, h - 12, {steps:5}); await p.mouse.up(); const u = await p.locator('.seitenleiste-griff').boundingBox();
          soll((await p.locator('.seitenleiste.unten').count()) === 1 && u.y + u.height >= h - 2 && u.width > u.height && Math.abs(u.x + u.width / 2 - w / 2) < 20, 'Seitenleiste: unten losgelassen liegt der Griff quer am unteren Rand');
          soll(!(await p.locator('.nav').isVisible()), 'Seitenleiste unten: die untere Leiste der Akte tritt zurück'); await p.waitForTimeout(550);
          await klick('.seitenleiste-griff'); const k = await p.locator('.seitenleiste-knoepfe').boundingBox(); const t2 = await p.locator('.seitenleiste-knoepfe').innerText();
          soll(k.y + k.height <= h + 1 && k.x >= -1 && k.x + k.width <= w + 1 && /Akten/.test(t2) && /Eingang/.test(t2) && /Baum/.test(t2), 'Seitenleiste unten: klappt nach oben auf, ganz im Bild, mit Akten, Eingang, Baum'); await breit('seitenleiste unten'); await p.screenshot({path:`p/${name}-12g-leiste-unten.png`});
          await klick('.seitenleiste [data-a=geh][data-zu=akten]'); await p.waitForFunction(() => s.ansicht === 'akten'); soll(true, 'Seitenleiste unten: „Akten“ wechselt die Ansicht'); await p.evaluate(() => { s.ansicht = 'start'; zeigen(); }); }
        await p.evaluate(() => { leistePos.seite = 'r'; leistePos.oben = 64; localStorage.removeItem('pa_leiste'); seitenleisteZeigen(); }); }
      await klick('.seitenleiste-griff'); await klick('.seitenleiste [data-a=import]'); await p.waitForSelector('.fenster'); soll(!(await p.locator('.seitenleiste').isVisible()), 'Seitenleiste: „Importieren“ öffnet das Fenster, die Leiste tritt zurück'); await klick('[data-a=zu]');
    }
    // Organizer
    await p.evaluate(() => { if (!organizer.length) organizer = ORGANIZER_NEU(); fStadt('sort'); }); await klick('[data-a=osort]'); await klick('[data-a=sort-zur-akte]'); await p.evaluate(() => document.querySelector('video')?.remove());
    // Mail
    await klick('.schild[data-id=mail]'); await klick('[data-a=mail-ki]'); soll((await text()).includes('⟦STELLE-1⟧'),'Mail an KI'); await klick('[data-a=zu]');
    // Suche + Mappe
    await klick('.nav [data-zu=start]'); soll((await p.locator('.chip, .unter').count())===0 && (await p.locator('h1.titel').isVisible())===(name==='pc'), 'Start ohne Beispiele und Erklärsatz, Überschrift nur am PC'); await p.fill('.suche input','Nebenkostenabrechnung'); await p.keyboard.press('Enter'); await p.locator('.haken').first().check(); await klick('[data-a=mappe]'); soll((await text()).includes('Zur Akte'),'Mappe'); await klick('[data-a=zu]');
    // Farbe der Akte kräftig
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=farbe]' : '.kopfknoepfe [data-a=farbe]'); await klick('[data-farbe=kraeftig]'); await klick('.nav [data-zu=start]'); await p.screenshot({path:`p/${name}-13-kraeftig.png`});
    // Drucken-Fenster, Hilfe, Fuß
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=drucken]' : '.kopfknoepfe [data-a=drucken]'); soll((await text()).includes('Einzelne Unterlage'),'Drucken'); await klick('[data-a=zu]');
    if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? '.menue [data-a=hilfe]' : '.kopfknoepfe [data-a=hilfe]'); await p.screenshot({path:`p/${name}-14-hilfe.png`}); soll((await p.locator('.fenster a[href="./rechtliches.html"]').count())===1,'Hilfe-Link'); await klick('[data-a=zu]');
    // Sortierung von „Deine Unterlagen“: ab Werk das zuletzt Abgelegte oben, umstellbar und gemerkt
    { const sortProbe = await p.evaluate(async () => { const t = window.PrivateAkteTresor; const a = await t.ablegen(new File(['aaa aaa aaa aaa'], 'Zebra-Sortierprobe.txt', {type:'text/plain'}), {bereich:'Archiv', datum:'2020-01-01', titel:null, notiz:null}); await new Promise(r => setTimeout(r, 1100)); const b = await t.ablegen(new File(['b'], 'Anton-Sortierprobe.txt', {type:'text/plain'}), {bereich:'Archiv', datum:'2021-01-01', titel:null, notiz:null}); await echtLaden(); mainZeigen(); return [a.id, b.id]; });
      const reihe = async () => p.evaluate(ids => [...document.querySelectorAll('#echt [data-id]')].map(x => x.dataset.id).filter(i => ids.includes(i)), sortProbe);
      const r1 = await reihe(); await p.selectOption('#echt-sort', 'groesse'); const r2 = await reihe(); await p.selectOption('#echt-sort', 'name'); const r3 = await reihe(); await p.selectOption('#echt-sort', 'neu');
      soll(r1[0] === sortProbe[1] && r2[0] === sortProbe[0] && r3[0] === sortProbe[1], 'Deine Unterlagen: zuletzt abgelegt oben, nach Größe und Name umstellbar (' + JSON.stringify([r1, r2, r3].map(r => r.map(i => sortProbe.indexOf(i)))) + ')');
      await p.evaluate(async ids => { for (const i of ids) await window.PrivateAkteTresor.herausnehmen(i); await echtLaden(); mainZeigen(); }, sortProbe); }
    // Startseite: Abschnitte sind ab Werk eingeklappt, ein Tipp klappt auf und wird gemerkt; Bereiche in einer Zeile
    { const q = await b.newPage({ viewport:{width:w,height:h} }); await q.goto('http://localhost:8765/'); await q.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1');
      const zu = await q.evaluate(() => [...document.querySelectorAll('details.klapp')].map(d => d.open)); await q.locator('#echt > summary').click(); await q.waitForFunction(() => /"echt":1/.test(localStorage.getItem('pa_klapp') || '')); await q.reload(); await q.waitForSelector('#echt');
      const nach = await q.evaluate(() => ({ echt:document.querySelector('#echt').open, faellig:document.querySelector('[data-klapp=faellig]').open, zeile:getComputedStyle(document.querySelector('.kacheln.seitlich')).display }));
      soll(zu.length === 3 && zu.every(x => !x) && nach.echt && !nach.faellig && nach.zeile === 'flex', 'Startseite: drei Abschnitte eingeklappt, Aufklappen wird gemerkt, Bereiche seitlich (' + JSON.stringify([zu, nach]) + ')');
      await q.screenshot({path:`p/${name}-30-start-klapp.png`}); await q.evaluate(() => localStorage.setItem('pa_klapp', JSON.stringify({echt:1, faellig:1, zuletzt:1}))); await q.close(); }
    // Baum: Workflow PDF hat eine eigene Stadt, ein Tipp öffnet den echten Klon
    await klick('.nav [data-zu=baum]'); soll((await p.locator('.schild[data-id=pdf]').innerText()).includes('Workflow PDF'), 'Baum: Stadt Workflow PDF'); await breit('Baum mit Workflow PDF'); await p.screenshot({path:`p/${name}-31-baum.png`});
    await klick('.schild[data-id=pdf]'); await p.waitForSelector('#rahmen'); soll(/workflow-pdf/.test(await p.locator('#rahmen').getAttribute('src')), 'Baum: Stadt Workflow PDF öffnet Workflow PDF im Rahmen'); await klick('[data-a=rahmen-zu]');
    // ---------- Klone im Rahmen ----------
    await klick('.nav [data-zu=start]');
    // Datei-Organizer hinter dem grünen Knopf: echter Klon, eigener Speicher, kein eigener Worker, Übergabe an die Akte
    await klick('.werk[data-a=viele]'); await p.waitForSelector('#rahmen');
    const org = p.frameLocator('#rahmen'); await org.locator('[data-testordner]').waitFor({timeout:30000});
    if (name === 'handy') { const kopf = await p.evaluate(() => { const d = document.querySelector('#rahmen').contentDocument, h = d.querySelector('header'); return document.querySelector('.rahmenfenster .fkopf').offsetHeight + (h ? h.offsetHeight : 999); });
      soll(kopf <= 100, 'Datei-Organizer im Rahmen am Handy: Kopf zusammen höchstens zwei Zeilen (' + kopf + ' px)'); soll((await org.locator('[data-leiste-griff]').count()) === 1, 'Datei-Organizer 0.4.15 im Rahmen: Seitenleiste ist da'); }
    await breit('Organizer im Rahmen'); await p.screenshot({path:`p/${name}-20-organizer.png`});
    const of = p.frames().find(f => /rahmen\/datei-organizer|datei-organizer\/app\/~rahmen/.test(f.url()));
    const orgLage = await of.evaluate(async () => ({ marke:document.documentElement.dataset.paEingebettet, rahmen:!!window.DO_RAHMEN, navy:getComputedStyle(document.documentElement).getPropertyValue('--navy').trim(), sw:(await navigator.serviceWorker.getRegistrations()).length, basis:document.baseURI.includes('/klone/datei-organizer/app/'), titel:document.title }));
    soll(orgLage.marke === '1' && orgLage.rahmen && orgLage.sw === 0 && orgLage.basis && /Datei-Organizer/.test(orgLage.titel) && /107c41|pa-b/.test(orgLage.navy), 'Organizer im Rahmen: Brücke, Farben, kein Worker (' + JSON.stringify(orgLage) + ')');
    if (name === 'pc') {
      await org.locator('[data-testordner]').click();
      await of.waitForFunction(() => !document.querySelector('[data-ladebalken]') && /Testordner/.test(document.body.innerText) && document.querySelectorAll('[data-ordner-pill]').length > 0, null, {timeout:180000});
      await p.waitForTimeout(1500);
      const dbs = await of.evaluate(async () => { localStorage.setItem('do-probe', '1'); const echt = Object.keys(localStorage).filter(k => /probe/.test(k)); localStorage.removeItem('do-probe'); return { namen:(await indexedDB.databases()).map(d => d.name), echt }; });
      soll(dbs.namen.includes('PrivateAkteOrganizer1') && !dbs.namen.includes('DateiOrganizer1') && dbs.echt.includes('pa_do-probe') && !dbs.echt.includes('do-probe'), 'Organizer im Rahmen: eigener Speicher (' + JSON.stringify(dbs) + ')');
      await of.evaluate(() => { location.hash = 'sortieren'; }); for (let i = 0; i < 6; i++) { const k = org.locator('[data-durchsieben]'); if (await k.isDisabled().catch(() => true)) break; await k.click(); await p.waitForTimeout(700); }
      await of.evaluate(() => { location.hash = 'akte'; }); await org.locator('[data-uebergeben]').click();
      await p.waitForSelector('.fenster form[data-form=ordner]', {timeout:60000});
      const zeilen = await p.locator('.fenster .ordzeile').count(), mitBereich = await p.evaluate(() => [...document.querySelectorAll('.fenster select[name=b]')].filter(x => x.value && x.value !== 'Sonstiges').length), verschieden = await p.evaluate(() => new Set([...document.querySelectorAll('.fenster select[name=b]')].map(x => x.value)).size);
      soll(zeilen > 50 && mitBereich > 20 && verschieden >= 5 && (await p.locator('#rahmen').count()) === 1, `Übergabe: Fenster „Ordner in die Akte legen“ über dem Rahmen, ${zeilen} Dateien, ${mitBereich} mit Bereich, ${verschieden} verschiedene Bereiche`);
      await p.screenshot({path:`p/${name}-21-uebergabe.png`});
      const gewaehlt = await p.evaluate(() => { const h = [...document.querySelectorAll('.fenster input[name=d]')]; const pdf = h.filter(x => /\.pdf$/i.test(x.value)).slice(0, 2).map(x => x.value); h.forEach(x => { x.checked = pdf.includes(x.value); }); return pdf; });
      await klick('.fenster form[data-form=ordner] [type=submit]'); await p.waitForFunction(() => !document.querySelector('.fenster form[data-form=ordner]'), null, {timeout:120000});
      const drin = await p.evaluate(async namen => { const t = window.PrivateAkteTresor, l = await t.liste(), da = l.filter(x => namen.some(n => n.endsWith(x.originalName))); const r = { n:da.length, bereich:da.map(x => x.category), text:da.some(x => (x.textAuszug || x.textHint || '').length > 20) }; for (const x of da) await t.herausnehmen(x.id); return r; }, gewaehlt);
      soll(gewaehlt.length === 2 && drin.n === 2, 'Übergabe: zwei gewählte Dateien liegen in der Akte (' + JSON.stringify(drin) + ')');
      soll(((await of.evaluate(() => document.querySelector('[data-uebergabe] [data-meldung]')?.innerText || '')).includes('bereit')), 'Übergabe: der Organizer zeigt die Antwort der Akte');
    }
    await klick('[data-a=rahmen-zu]'); soll((await p.locator('#rahmen').count()) === 0, 'Rahmen geht mit „‹ Akte“ zu');
    // Workflow PDF im Rahmen: Scanner über den roten Knopf, „Teilen“ legt in die Akte, Unterlage aus der Akte öffnen
    await klick('.werk[data-a=scan]'); await p.waitForSelector('#rahmen');
    let wf = null; for (let i = 0; i < 100 && !wf; i++) { wf = p.frames().find(f => /rahmen\/workflow-pdf|workflow-pdf\/~rahmen/.test(f.url())); if (!wf) await p.waitForTimeout(100); }
    await wf.waitForFunction(() => window.__wfpdf && window.WFP && WFP.DB && WFP.Scanner, null, {timeout:60000});
    await p.waitForTimeout(1500); await breit('Workflow PDF im Rahmen'); await p.screenshot({path:`p/${name}-22-wfpdf-scan.png`});
    const wfLage = await wf.evaluate(async () => ({ marke:document.documentElement.dataset.paEingebettet, sw:(await navigator.serviceWorker.getRegistrations()).length, dbs:(await indexedDB.databases()).map(d => d.name), rot:getComputedStyle(document.documentElement).getPropertyValue('--rot-d').trim(), netz:!!document.querySelector('script[src*="sbkim-init"]'), inst:getComputedStyle(document.getElementById('btnInstall')).display, scanner:!!document.querySelector('.scan, #scanner, [class*=scan-]') }));
    soll(wfLage.marke === '1' && wfLage.sw === 0 && wfLage.dbs.includes('PrivateAkteWFPDF1') && !wfLage.dbs.includes('WorkflohPDF1') && !wfLage.netz && wfLage.inst === 'none' && wfLage.scanner, 'Workflow PDF im Rahmen: Brücke, eigene Bibliothek, kein Worker, kein Mycel, Scanner offen (' + JSON.stringify(wfLage) + ')');
    const PDF = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 400 200]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n4 0 obj<</Length 44>>stream\nBT /F1 18 Tf 40 100 Td (Probe Rahmen) Tj ET\nendstream endobj\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF';
    // „Teilen“ fragt, wohin: Abbrechen legt nichts ab, „anderes Programm“ ruft das Teilen des Geräts (hier gestellt), „Akte“ legt ab
    await wf.evaluate(() => { window.__geraet = 0; const N = Object.getPrototypeOf(navigator); });
    const teil = (ziel, datei) => wf.evaluate(async ([pdf, datei, ziel]) => { const lauf = navigator.share({files:[new File([pdf], datei, {type:'application/pdf'})]}).then(() => 'ok', e => e.name === 'AbortError' ? 'abgebrochen' : String(e.message)); await new Promise(r => setTimeout(r, 100)); const k = document.querySelector(`#pa-teilen [data-pa-teilen=${ziel}]`); if (!k) return 'kein Fenster'; k.click(); return lauf; }, [PDF, datei, ziel]);
    const nein = await teil('nein', `Probe-Nein-${name}.pdf`), geraet = await teil('geraet', `Probe-Geraet-${name}.pdf`);
    const nichtDa = await p.evaluate(async name => (await window.PrivateAkteTresor.liste()).filter(x => /^Probe-(Nein|Geraet)-/.test(x.originalName)).length, name);
    soll(nein === 'abgebrochen' && nichtDa === 0 && geraet !== 'kein Fenster' && geraet !== 'ok-akte', 'Workflow PDF: Teilen fragt wohin; Abbrechen und „anderes Programm“ legen nichts in die Akte (' + nein + ' / ' + geraet + ')');
    const geteilt = await teil('akte', `Probe-Teilen-${name}.pdf`);
    const inAkte = await p.evaluate(async name => { const t = window.PrivateAkteTresor, d = (await t.liste()).find(x => x.originalName === `Probe-Teilen-${name}.pdf`); return d ? d.id : ''; }, name);
    soll(geteilt === 'ok' && !!inAkte, 'Workflow PDF: „Teilen“ legt die Datei in die Akte (' + geteilt + ')');
    soll(/liegt jetzt in der Privaten Akte/.test(await p.locator('#rahmen-meldung').innerText()) && await p.locator('#rahmen-meldung').isVisible(), 'Workflow PDF: Bestätigung steht sichtbar in der Leiste des Rahmens');
    await klick('[data-a=rahmen-zu]');
    if (inAkte) {
      await p.evaluate(id => fEcht(id), inAkte); await klick('.fenster [data-a=echt-wfpdf]'); await p.waitForSelector('#rahmen');
      let w2 = null; for (let i = 0; i < 100 && !w2; i++) { w2 = p.frames().find(f => /rahmen\/workflow-pdf|workflow-pdf\/~rahmen/.test(f.url())); if (!w2) await p.waitForTimeout(100); }
      const offen = await w2.waitForFunction(name => window.__wfpdf && __wfpdf.S && __wfpdf.S.doc && __wfpdf.S.doc.name === `Probe-Teilen-${name}`, name, {timeout:60000}).then(() => true, () => false);
      soll(offen, 'Workflow PDF: Unterlage aus der Akte ist im Editor offen'); await p.screenshot({path:`p/${name}-23-wfpdf-offen.png`});
      await w2.evaluate(async () => { for (const d of await WFP.DB.all('docs')) { await WFP.DB.del('files', d.id); await WFP.DB.del('docs', d.id); } }).catch(() => {});
      await klick('[data-a=rahmen-zu]'); await p.evaluate(id => window.PrivateAkteTresor.herausnehmen(id), inAkte);
    }
    // Akte leeren: Unterlagen endgültig weg, die Bibliothek von Workflow PDF und die Liste des Organizers auch
    await klick('.nav [data-zu=start]');
    await p.evaluate(async () => { const t = window.PrivateAkteTresor; await t.ablegen(new File(['Leerprobe eins'], 'Leerprobe-1.txt', {type:'text/plain'}), {bereich:'Archiv', datum:null, titel:null, notiz:null}); const d = await t.ablegen(new File(['Leerprobe zwei'], 'Leerprobe-2.txt', {type:'text/plain'}), {bereich:'Archiv', datum:null, titel:null, notiz:null}); await t.herausnehmen(d.id); localStorage.setItem('pa_wfpdf_probe', '1'); localStorage.setItem('pa_do-eigene-kategorien', '["Motorboot"]');
      await new Promise((ok, nein) => { const q = indexedDB.open('PrivateAkteOrganizer1', 1); q.onupgradeneeded = () => q.result.createObjectStore('kv'); q.onerror = () => nein(q.error); q.onsuccess = () => { const t = q.result.transaction('kv', 'readwrite'); t.objectStore('kv').put({fassung:1, ordnerName:'Probe', quelle:'test', stufe:5, dateien:[{pfad:'a.pdf'}], verlauf:[{x:1}], regeln:[{id:'probe-regel-1'}, {id:'probe-regel-2'}], zeit:''}, 'zustand'); t.objectStore('kv').put({x:1}, 'lauf'); t.oncomplete = () => { q.result.close(); ok(); }; }; });
      await echtLaden(); });
    soll(await p.evaluate(async () => { const k = await window.PrivateAkteTresor.kalender.termine(); return k.termine.length === 1 && k.notizen === 1; }), 'vor dem Leeren: ein offener Termin, eine Notiz');
    await p.evaluate(() => fLeeren()); await klick('[data-form=leeren] [type=submit]'); soll((await p.locator('[data-form=leeren]').count()) === 1, 'Akte leeren: ohne das Wort „leeren“ geschieht nichts');
    await p.fill('[data-form=leeren] [name=wort]', 'Leeren'); await klick('[data-form=leeren] [type=submit]'); await p.waitForFunction(() => !document.querySelector('[data-form=leeren]'), null, {timeout:60000});
    const leer = await p.evaluate(async () => { const dbs = (await indexedDB.databases()).map(d => d.name);
      const z = await new Promise(ok => { const q = indexedDB.open('PrivateAkteOrganizer1', 1); q.onsuccess = () => { const t = q.result.transaction('kv', 'readonly'), a = t.objectStore('kv').get('zustand'), k = t.objectStore('kv').getAllKeys(); t.oncomplete = () => { q.result.close(); ok({ z:a.result, keys:k.result }); }; }; });
      const kal = await window.PrivateAkteTresor.kalender.termine();
      return { termine:kal.termine.length, notizen:kal.notizen, n:(await window.PrivateAkteTresor.liste()).length, wf:dbs.includes('PrivateAkteWFPDF1'), wfMerker:Object.keys(localStorage).filter(k => /^pa_wfpdf_/.test(k)).length, regeln:z.z ? z.z.regeln.length : -1, dateien:z.z ? z.z.dateien.length + z.z.verlauf.length : -1, keys:z.keys, kat:localStorage.getItem('pa_do-eigene-kategorien'), text:document.body.innerText.includes('Noch nichts hineingelegt') }; });
    soll(leer.termine === 0 && leer.notizen === 0, 'Akte leeren: Termine und Notizen sind weg');
    soll(leer.n === 0 && !leer.wf && leer.wfMerker === 0 && leer.text, 'Akte leeren: Unterlagen und Workflow PDF sind leer (' + JSON.stringify(leer) + ')');
    soll(leer.regeln === 2 && leer.dateien === 0 && leer.keys.length === 1 && leer.kat === '["Motorboot"]', 'Akte leeren: im Organizer sind Liste und Verlauf weg, die gelernten Regeln und eigenen Kategorien bleiben');
    await p.evaluate(() => { indexedDB.deleteDatabase('PrivateAkteOrganizer1'); localStorage.removeItem('pa_do-eigene-kategorien'); });
    await p.evaluate(async () => { const t = window.PrivateAkteTresor; const d = await t.ablegen(new File(['Leerprobe eins'], 'Leerprobe-1.txt', {type:'text/plain'}), {bereich:'Archiv', datum:null, titel:null, notiz:null}); const ok = !!d.id; await t.herausnehmen(d.id); window.__wieder = ok; }); soll(await p.evaluate(() => window.__wieder), 'Akte leeren: dieselbe Datei lässt sich danach wieder ablegen');
    soll((await p.locator('.fuss a').count())===4,'Fuß-Links');
    await p.goto('http://localhost:8765/rechtliches.html'); soll((await text()).includes('Impressum'),'rechtliches'); await breit('rechtliches');
    await p.close();
  }
  console.log(n+' Prüfungen, '+fehler.length+' Fehler'); fehler.forEach(f => console.log(' - '+f));
  await b.close();
})();
