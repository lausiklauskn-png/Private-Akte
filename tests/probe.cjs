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
    await p.goto('http://localhost:8765/'); await p.waitForSelector('.werk');
    const breit = async wo => soll(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name+' quer scrollbar bei '+wo);
    const klick = async sel => { await p.locator(sel).first().click(); };
    const text = async () => await p.evaluate(() => document.body.innerText);
    await breit('start'); await p.screenshot({path:`p/${name}-1-start.png`});
    soll((await p.locator('.werk').count())===5, 'fünf Werkzeugknöpfe'); soll((await p.locator('.ablegen, [data-a=landkarte]').count())===0, 'kein Ablegen, keine Landkarte'); soll((await p.locator('.nav button').count())===4, 'vier Bereiche');
    soll((await text()).includes('0.1.5 · Basic'), 'Fassung beim Namen');
    if (name==='handy') { soll(await p.locator('[data-a=mehr]').isVisible(), 'Mehr-Knopf'); soll(!(await p.locator('.kopfknoepfe [data-a=drucken]').isVisible()), 'Drucken hinter Mehr');
      await klick('[data-a=mehr]'); await p.screenshot({path:`p/${name}-2-mehr.png`}); soll((await p.locator('.menue button').count())===4,'vier Einträge hinter Mehr'); await p.keyboard.press('Escape'); }
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
    await klick('.nav [data-zu=start]'); await klick('.chip[data-a=frage]'); await p.locator('.haken').first().check(); await klick('[data-a=mappe]'); soll((await text()).includes('Zur Akte'),'Mappe'); await klick('[data-a=zu]');
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
