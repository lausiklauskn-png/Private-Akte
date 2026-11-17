// Prüft die mit NSIS installierte Windows-App über die Prüf-Schnittstelle des Prüfbaus (messprobe, Port 9223).
// Phase „erste“: Name, Fassung, Zugriffsschutz, Ordner über die Oberfläche einlesen, Index in den Ordner schreiben, Speichern unter …,
// „Öffnen mit“ (zweiter Programmstart). Phase „neustart“: der gemerkte Ordner öffnet ohne Dialog, der Index aus dem ersten Start ist da.
// Nur im Prüfbau; der Auslieferungsbau hat keine Prüf-Schnittstelle. Vorbild BookLedgerPro windows/pruefung/installed.mjs.
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {writeFile,readFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {spawn} from 'node:child_process';
const phase=process.argv[2]||'erste',out=resolve(process.argv[3]||'windows-bericht.json');
const report={phase,quelle:process.env.DO_SOURCE_COMMIT||'',gruen:[],fehler:[]};
const version=JSON.parse(await readFile(new URL('../src-tauri/tauri.conf.json',import.meta.url),'utf8')).version;
const ok=(name,value)=>{assert.ok(value,name);report.gruen.push(name);console.log('PASS '+name);};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const ORDNER=process.env.DO_WINDOWS_TEST_FOLDER;
let browser,page;
async function verbinden(){for(let i=0;i<120;i++){try{browser=await chromium.connectOverCDP('http://127.0.0.1:9223');return;}catch{await pause(500);}}throw Error('Die installierte App hat die Prüf-Schnittstelle nicht geöffnet');}
const seiten=()=>browser.contexts().flatMap(c=>c.pages());
const call=(plugin,method,args={})=>page.evaluate(async({plugin,method,args})=>{try{return await Capacitor.Plugins[plugin][method](args);}catch(e){return {fehler:e.code||String(e)};}},{plugin,method,args});
try{
  await verbinden();
  for(let i=0;i<120&&!page;i++){page=seiten().find(p=>/^https:\/\/tauri\.localhost\/(index\.html)?(#.*)?$/.test(p.url()));if(!page)await pause(250);}
  assert.ok(page,'Hauptfenster gefunden');
  page.on('pageerror',e=>report.fehler.push(String(e.stack||e.message).slice(0,800)));
  await page.waitForFunction(()=>window.Capacitor&&document.querySelector('[data-app-name]'),null,{timeout:90000});
  ok('Hülle meldet Windows',await page.evaluate(()=>Capacitor.getPlatform()==='windows'&&Capacitor.isNativePlatform()));
  ok('Name „Datei-Organizer Pro“ in Kopf und Titel',await page.evaluate(()=>document.querySelector('[data-app-name]').textContent==='Datei-Organizer Pro'&&document.title==='Datei-Organizer Pro'));
  ok('Fassung der App = tauri.conf.json',(await call('DoDateien','appInfo')).version===version);
  ok('kein Service Worker in der App',await page.evaluate(async()=>!(await navigator.serviceWorker?.getRegistration?.())));
  ok('Aufruf ohne Sitzungsschlüssel wird verweigert',await page.evaluate(async()=>{try{await __TAURI_INTERNALS__.invoke('do_call',{plugin:'DoDateien',method:'appInfo',options:{}});return false;}catch(e){return String(e).includes('NOT_ALLOWED');}}));
  ok('Methode außerhalb der Verträge wird verweigert',(await call('FamilyFolders','loeschen')).fehler==='NOT_ALLOWED');
  // Seit 14.11. ist der öffentliche Schlüssel eingetragen. Vor der ersten Veröffentlichung liegt kein (oder kein unterschriebener) Feed auf dem Server:
  // dann muss die Prüfung mit einem UPDATE_-Fehler enden, nie mit einem Angebot – und „installieren“ ohne geprüftes Angebot wird verweigert.
  // Nach der ersten Veröffentlichung meldet ein Prüfbau derselben Fassung „aktuell“. Der echte Wert steht im Bericht.
  { const u=await call('DoUpdates','pruefen'); report.update=u; console.log('Update-Prüfung meldet: '+JSON.stringify(u));
    ok('Updates: Fehler UPDATE_… oder „aktuell“, nie ein Angebot für einen Prüfbau',(typeof u.fehler==='string'&&/^UPDATE_/.test(u.fehler))||(u.aktuell===true&&!u.neu));
    const i=await call('DoUpdates','installieren'); report.installieren=i; console.log('Installieren meldet: '+JSON.stringify(i));
    ok('Updates: „installieren“ ohne geprüftes Angebot wird verweigert, nie ein Download',typeof i.fehler==='string'&&/^UPDATE_/.test(i.fehler)); }
  if(phase==='erste'){
    await page.evaluate(()=>{location.hash='ordner';});
    const knopf=page.locator('[data-nativ-ordner]');await knopf.waitFor({state:'visible',timeout:30000});
    ok('Knopf „Ordner am PC“ der App ist da',await knopf.isVisible());
    await knopf.click();
    await page.waitForFunction(()=>/[1-9]\d* Dateien/.test(document.querySelector('[data-zahl="gesamt"]')?.textContent||''),null,{timeout:120000});
    ok('Prüfordner über die Oberfläche eingelesen (3 Dateien, Unterordner)',(await page.locator('[data-zahl="gesamt"]').textContent()).startsWith('3 '));
    const w=await call('FamilyFolders','gemerkt');ok('Ordner ist gemerkt',(w.ordner||[]).some(o=>o.name==='DO Organizer Probe'&&o.da));
    const g=await call('FamilyFolders','wiederOeffnen',{id:w.ordner[0].id});
    const text='{"probe":"Windows ä"}',b64=Buffer.from(text).toString('base64');
    const s=await call('FamilyFolders','dateiBeginn',{token:g.token,pfad:'organizer-index.json'});
    await call('FamilyFolders','dateiAnhaengen',{id:s.id,offset:0,data:b64});
    const f=await call('FamilyFolders','dateiFertig',{id:s.id,size:Buffer.byteLength(text)});
    ok('Index in den Ordner geschrieben',f.size===Buffer.byteLength(text)&&(await readFile(resolve(ORDNER,'organizer-index.json'),'utf8'))===text);
    ok('nur .json direkt im Ordner',(await call('FamilyFolders','dateiBeginn',{token:g.token,pfad:'Bank/x.json'})).fehler==='DO_NICHT_ERLAUBT');
    const sp=await call('DoDateien','speichern',{name:'DO-Probe.json',data:Buffer.from('{"a":1}').toString('base64')});
    ok('Speichern unter … schreibt die Datei',sp.gespeichert===true&&(await readFile(resolve(process.env.DO_WINDOWS_TEST_SAVE_FOLDER,'DO-Probe.json'),'utf8'))==='{"a":1}');
    const beleg=resolve(process.env.RUNNER_TEMP||'.','Brief-Öffnen-mit.txt');await writeFile(beleg,'Stadtwerke Musterstadt\nRechnung 4711\n');
    const zweiter=spawn(process.env.DO_WINDOWS_TEST_EXE,[beleg],{windowsHide:true,stdio:'ignore'});
    assert.equal(await new Promise((r,j)=>{zweiter.once('error',j);zweiter.once('exit',r);}),0);
    let angekommen=false;
    for(let i=0;i<80&&!angekommen;i++){
      angekommen=/4 Dateien/.test(await page.locator('[data-zahl="gesamt"]').textContent().catch(()=>''));
      if(!angekommen)await pause(250);
    }
    ok('„Öffnen mit“ (zweiter Programmstart): Datei kommt zum Bestand dazu',angekommen);
    ok('Original nach „Öffnen mit“ unverändert',(await readFile(beleg,'utf8')).startsWith('Stadtwerke'));
  }else{
    const w=await call('FamilyFolders','gemerkt');
    ok('nach Neustart: Ordner aus dem ersten Start ist gemerkt',(w.ordner||[]).some(o=>o.name==='DO Organizer Probe'&&o.da));
    await page.evaluate(()=>{location.hash='ordner';});
    const wieder=page.locator('[data-ordner-wieder]').first();await wieder.waitFor({state:'visible',timeout:30000});
    ok('Knopf „Zuletzt“ zeigt den gemerkten Ordner',(await wieder.textContent()).includes('DO Organizer Probe'));
    await wieder.click();
    // Vorher stehen 4 (3 aus dem Ordner + 1 aus „Öffnen mit“); neu eingelesen ersetzt den Bestand durch den Ordner: 3.
    await page.waitForFunction(()=>/^3 /.test(document.querySelector('[data-zahl="gesamt"]')?.textContent||''),null,{timeout:120000});
    ok('gemerkter Ordner ohne Dialog wieder eingelesen',true);
    ok('Index aus dem ersten Start liegt noch im Ordner',(await readFile(resolve(ORDNER,'organizer-index.json'),'utf8')).includes('Windows'));
  }
  ok('keine Skriptfehler in der Seite',report.fehler.length===0);
}catch(error){report.fehler.push(String(error.stack||error.message));process.exitCode=1;console.error(error);}
finally{
  await mkdir(dirname(out),{recursive:true});await writeFile(out,JSON.stringify(report,null,2)+'\n');
  if(browser)await browser.close().catch(()=>{});
}
