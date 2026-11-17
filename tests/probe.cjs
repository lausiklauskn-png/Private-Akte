// Klick-Probe in Handy- und PC-Breite. Vorher im Repo-Ordner: python3 -m http.server 8765 ; dann: node tests/probe.cjs
// Bilder landen im Ordner p/ neben dem Aufrufort (vorher anlegen: mkdir -p p).
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const fehler = []; let n = 0;
  const soll = (ok, was) => { n++; if (!ok) fehler.push('SOLL: ' + was); };
  for (const [name, w, h] of [['handy',390,800],['pc',1280,800]]) {
    const p = await b.newPage({ viewport:{width:w,height:h} });
    p.on('console', m => { if (m.type()==='error') fehler.push(name+' console: '+m.text()); });
    p.on('pageerror', e => fehler.push(name+' fehler: '+e.message));
    await p.addInitScript(name => { window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name, {create:true}); }, name);
    await p.goto('http://localhost:8765/'); await p.waitForSelector('.werk');
    const breit = async wo => soll(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name+' quer scrollbar bei '+wo);
    const klick = async sel => { await p.locator(sel).first().click(); };
    const text = async () => await p.evaluate(() => document.body.innerText);
    await breit('start'); await p.screenshot({path:`p/${name}-1-start.png`});
    soll((await p.locator('.werk').count())===5, 'fünf Werkzeugknöpfe'); soll((await p.locator('#echt [data-a=echt-neu]').count())===0, 'kein zweiter Knopf „Datei hineinlegen“'); soll((await p.locator('[data-a=sicherung].rund').count())===0, 'kein Schild-Knopf'); soll((await p.locator('.ablegen, [data-a=landkarte]').count())===0, 'kein Ablegen, keine Landkarte'); soll((await p.locator('.nav button').count())===4, 'vier Bereiche');
    soll((await text()).includes('0.3.4 · Basic'), 'Fassung beim Namen');
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
    // Tresor exportieren (verschlüsselter Ordner am gewählten Ort), Speicher des Browsers leeren, wieder importieren
    const kopf = async a => { if (name==='handy') await klick('[data-a=mehr]'); await klick(name==='handy' ? `.menue [data-a=${a}]` : `.kopfknoepfe [data-a=${a}]`); }; const sicherungAuf = () => kopf('export');
    await sicherungAuf(); soll((await text()).includes('1 Unterlage'), 'Sicherung zählt die echte Unterlage'); soll((await p.locator('#letzter-export').innerText()).includes('Noch kein Backup') || name==='pc', 'vor dem ersten Export: noch kein Ordner'); soll((await text()).includes('Backup erstellen') || name==='pc', 'erstes Mal: Tresor als Ordner anlegen'); await klick('[data-a=sich-export]');
    await p.fill('[name=p1]','kurz'); await p.fill('[name=p2]','kurz'); await p.evaluate(() => document.querySelector('[data-form=export]').noValidate = true); await klick('[data-form=export] button[type=submit]');
    await p.waitForFunction(() => document.getElementById('toast').textContent.includes('mindestens 10')); soll(true, 'zu kurzes Passwort wird abgewiesen');
    await p.fill('[name=p1]','Erfundenes-Probe-Passwort-1'); await p.fill('[name=p2]','Erfundenes-Probe-Passwort-1'); await klick('[data-form=export] button[type=submit]');
    await p.waitForSelector('#notfall', {timeout:60000}); soll((await p.locator('#notfall').innerText()).replace(/[^0-9A-Z]/g,'').length===52, 'Notfallschlüssel mit 52 Zeichen'); await breit('exportiert'); await p.screenshot({path:`p/${name}-1c-export.png`});
    const exp = await p.evaluate(async name => { const z = await (await navigator.storage.getDirectory()).getDirectoryHandle('probe-ziel-'+name); const o = []; for await (const [n, h] of z.entries()) { o.push(n); if (h.kind==='directory') for await (const [m] of h.entries()) o.push(n+'/'+m); } return o; }, name);
    soll(exp.some(n => /^Familienakte_Vollsicherung_.*\/Vollsicherung_Verschluesselt\.json$/.test(n)) && !exp.some(n => /Register\.json$/.test(n)), 'Ordner mit Datum am gewählten Ort, Register nur verschlüsselt');
    const [blatt] = await Promise.all([p.waitForEvent('download'), klick('[data-a=sich-blatt]')]); soll(/^Notfallblatt_.*\.txt$/.test(blatt.suggestedFilename()), 'Notfallblatt als Datei'); await klick('.fenster .reihe [data-a=zu]');
    await sicherungAuf(); soll(/Letztes Backup: \d\d\.\d\d\.\d{4}/.test(await p.locator('#letzter-export').innerText()) && (await p.locator('#letzter-export').innerText()).includes('probe-ziel-'+name), 'Sicherung nennt, wann und wohin zuletzt exportiert wurde'); await klick('[data-a=zu]');
    await p.evaluate(async () => { const w = await navigator.storage.getDirectory(); for await (const [n] of w.entries()) if (!n.startsWith('probe-ziel-')) await w.removeEntry(n, {recursive:true}); for (const k of Object.keys(localStorage)) if (k !== 'private-akte-letzter-export') localStorage.removeItem(k); });
    await p.reload(); await p.waitForFunction(() => document.querySelector('#echt')?.dataset.bereit === '1'); soll((await text()).includes('Noch nichts hineingelegt'), 'Speicher des Browsers geleert: Tresor leer');
    await kopf('import'); soll((await p.locator('.fenster .zeile').count())===2 && (await text()).includes('Datei in die Akte legen') && (await text()).includes('Backup einlesen'), 'Importieren: Datei oder Backup'); await klick('[data-a=sich-import]'); await p.waitForSelector('[data-form=import]'); soll((await text()).includes('Familienakte_Vollsicherung_'), 'Import nennt die gefundene Sicherung');
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
