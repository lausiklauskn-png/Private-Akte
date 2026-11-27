'use strict';
/* Private Akte – Vorschau. Die Beispiele sind erfunden und werden nicht gespeichert, kein echtes Programm wird geöffnet.
   Echt ist nur der Abschnitt „Deine Unterlagen“: er speichert über tresor.js im unveränderten Tresor der Familienakte. */
const FASSUNG = '0.9.12', NAME = 'Private Akte', HEUTE = new Date(2026, 10, 17);
const $ = id => document.getElementById(id);
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const euro = n => new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(n);
const datum = d => d.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'});
const P = {
 vollbild:'<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
 start:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 akten:'<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
 eingang:'<path d="M4 4h16l2 11v5H2v-5ZM2 15h6l2 3h4l2-3h6M12 5v7m-3-3 3 3 3-3"/>',
 baum:'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', lupe:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
 zu:'<path d="m6 6 12 12M6 18 18 6"/>', pfeil:'<path d="M4 12h16m-6-6 6 6-6 6"/>', weiter:'<path d="m9 5 7 7-7 7"/>',
 herz:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
 person:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 koffer:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 13h18"/>',
 haus:'<path d="m2 10 10-8 10 8M5 8v13h14V8M9 21v-8h6v8"/>',
 kiste:'<path d="m12 2 9 5v10l-9 5-9-5V7ZM3 7l9 5 9-5M12 12v10"/>',
 geld:'<path d="M20 7V4H5a3 3 0 0 0 0 6h16v10H5a3 3 0 0 1-3-3V7M21 11h-6v6h6"/>',
 kamera:'<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="4"/>',
 datei:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>',
 pdf:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 17v-4h1.2a1.2 1.2 0 0 1 0 2.400H8m4.500 1.600v-4h.8a2 2 0 0 1 0 4Zm4 0v-4h2m-2 2h1.500"/>',
 scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M3 12h18"/>',
 stift:'<path d="M4 20h4L20 8l-4-4L4 16Z"/>', auge:'<path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>', muell:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>', teilen:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.600 13.500 6.800 4M15.400 6.500l-6.800 4"/>', sort:'<path d="M4 6h16M7 12h10M10 18h4"/>',
 ordner:'<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M12 11v6m-3-3 3 3 3-3"/>',
 importpfeil:'<path d="M12 4v11m-4-4 4 4 4-4M5 19h14"/>', exportpfeil:'<path d="M12 15V4m-4 4 4-4 4 4M5 19h14"/>',
 haken:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 hoch:'<path d="M12 19V5M5 12l7-7 7 7"/>', runter:'<path d="M12 5v14M5 12l7 7 7-7"/>', zurueck:'<path d="M19 12H5M12 5l-7 7 7 7"/>',
 glocke:'<path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 notiz:'<path d="M5 3h14v14l-4 4H5Z"/><path d="M15 21v-4h4M8 8h8M8 12h6"/>',
 kalender:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4m8-4v4M8 14h3v3H8Z"/>',
 tabelle:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16"/>',
 folie:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4m-4 0h8M8 12l3-3 2 2 3-3"/>',
 drucker:'<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="7" rx="1"/>',
 karte:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3ZM9 3v15m6-12v15"/>',
 schild:'<path d="M12 2 4 5v6c0 5 3.400 9.300 8 11 4.600-1.700 8-6 8-11V5Z"/><path d="m8.500 12 2.500 2.500 4.500-5"/>',
 mehr:'<circle cx="5" cy="12" r="1.400"/><circle cx="12" cy="12" r="1.400"/><circle cx="19" cy="12" r="1.400"/>',
 maske:'<path d="M3 6c3 0 5-1 9-1s6 1 9 1c0 7-3 12-9 12S3 13 3 6Z"/><path d="M7 10h3m4 0h3"/>',
 mikro:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 hinaus:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
};
const ic = n => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${P[n]||P.datei}</svg>`;

/* ---------- Farben: Wasserfarben des Familienbüros (lib/onlyoffice/farbpalette.ts) ---------- */
const FARBEN = {
 blau:{de:'Wasserblau',k:['#a9cff2','#c9e2f7','#dcedf5'],schrift:'#0b3154',akz:'#2f6ea8',fl:'#e4eef7'},
 gruen:{de:'Wassergrün',k:['#aee2cc','#cdeede','#e4f3d6'],schrift:'#0f4a43',akz:'#087f7a',fl:'#e4f1eb'},
 gelb:{de:'Helles Gelb',k:['#f7e3a0','#fbeec4','#fdf5dc'],schrift:'#5a4310',akz:'#916612',fl:'#f5efdc'},
 koralle:{de:'Koralle',k:['#f9c9ad','#fbdcc8','#fdebd9'],schrift:'#6b2a12',akz:'#c2562b',fl:'#f6e9e1'},
 /* nur über „Wie die Kachel“: eigene Farbe der Akte und des Kalenders */
 see:{k:['#a8dde0','#c8ebec','#e0f3f0'],schrift:'#0b3154',akz:'#0b6f7a',fl:'#e2f1f1'},
 flieder:{k:['#cfc4f0','#e0d8f6','#eee9fa'],schrift:'#35215f',akz:'#6a45a8',fl:'#ece7f8'},
 kraeftig:{de:'Kräftig',k:['#0b3154','#164f7d','#087f7a'],schrift:'#ffffff',akz:'#0b3154',fl:'#dfeaf3'}
};
const WAHL = [['auto','Wie die Kachel'],['blau','Wasserblau'],['gruen','Wassergrün'],['gelb','Helles Gelb'],['koralle','Koralle'],['kraeftig','Kräftig']];
const KACHEL = {akte:'see',buero:'blau',geld:'gelb',sort:'gruen',mail:'koralle',kal:'flieder',pdf:'koralle'};
const farbwahl = {};                                   // je Programm gemerkt (nur für diese Sitzung)
const farbe = ort => FARBEN[(farbwahl[ort] && farbwahl[ort] !== 'auto') ? farbwahl[ort] : KACHEL[ort]];
const farbStil = ort => { const f = farbe(ort); return `--k1:${f.k[0]};--k2:${f.k[1]};--k3:${f.k[2]};--schrift:${f.schrift};--akz:${f.akz};--fl:${f.fl}`; };
function farbeAkte(){ document.documentElement.style.cssText = farbStil('akte'); document.querySelector('meta[name=theme-color]').content = farbe('akte').k[1]; }

/* ---------- Beispieldaten (alles erfunden) ---------- */
const BEREICHE = [
 {id:'ich',name:'Persönliches',icon:'person',a:'#6f8fe0',b:'#33519c'},
 {id:'gesund',name:'Gesundheit',icon:'herz',a:'#e2596b',b:'#9b1f38'},
 {id:'arbeit',name:'Arbeit',icon:'koffer',a:'#3f8fe0',b:'#185abd'},
 {id:'wohnen',name:'Wohnen',icon:'haus',a:'#f0b93a',b:'#b77a0c'},
 {id:'kauf',name:'Käufe & Fahrzeug',icon:'kiste',a:'#2bb673',b:'#107c41'},
 {id:'geld',name:'Geld & Belege',icon:'geld',a:'#9a7bd6',b:'#5b3aa6'}
];
const bereich = id => BEREICHE.find(b => b.id === id);
const bereichWahl = (wert, attr, vorschlag=true) => `<select class="feld" ${attr} aria-label="Bereich" style="flex:1 1 120px">${wert?'':'<option value="">Bereich wählen …</option>'}${BEREICHE.map(b => `<option value="${b.id}" ${b.id===wert?'selected':''}>${b.name}${vorschlag&&b.id===wert?' (Vorschlag)':''}</option>`).join('')}</select>`;
/* Städte am Baum = Programme in derselben App */
const STAEDTE = [
 {id:'buero',name:'Familienbüro',tut:'Schreiben, Tabellen, Folien – eigene App',icon:'stift',a:'#3f8fe0',b:'#185abd',ort:[84,23]},
 {id:'geld',name:'Portemonnaie',tut:'Bon fotografieren, Einnahmen, Ausgaben, was bleibt übrig',icon:'geld',a:'#f0b93a',b:'#b77a0c',ort:[13,84]},
 {id:'sort',name:'Datei-Organizer',tut:'Viele Dateien auf einmal vorsortieren',icon:'sort',a:'#2bb673',b:'#107c41',ort:[16,36]},
 {id:'mail',name:'Private Brain',tut:'E-Mails mit Anlagen hereinholen',icon:'mail',a:'#f08a4b',b:'#c43e1c',ort:[80,84]},
 {id:'kal',name:'Kalender',tut:'Termine und Fristen',icon:'kalender',a:'#9a7bd6',b:'#5b3aa6',ort:[64,47]},
 /* Workflow PDF ist ein eigenes Tool mit eigener Stadt (Klaus 18.11.: der Datei-Organizer hat eine, das Scannen fehlte im Baum) – echter Klon im Rahmen. */
 {id:'pdf',name:'Workflow PDF',tut:'Scannen, PDF ausfüllen und bearbeiten',icon:'pdf',a:'#e2596b',b:'#9b1f38',ort:[60,19]}
];
const stadt = id => STAEDTE.find(w => w.id === id);
const TEILE = [
 {id:'text',name:'Schreiben',icon:'stift',a:'#3f8fe0',b:'#185abd',tut:'Briefe und Texte'},
 {id:'tab',name:'Tabellen',icon:'tabelle',a:'#2bb673',b:'#107c41',tut:'Listen und Rechnen'},
 {id:'folie',name:'Folien',icon:'folie',a:'#f08a4b',b:'#c43e1c',tut:'Zeigen und Vortragen'},
 {id:'pdf',name:'Workflow PDF',icon:'pdf',a:'#e2596b',b:'#9b1f38',tut:'Scannen, PDF bearbeiten, ausfüllen'}
];
const teil = id => TEILE.find(t => t.id === id);
const inArbeit = d => d.bei === 'buero' ? teil(d.teil).name : stadt(d.bei).name;
let nr = 100;
const docs = [
 {id:1,titel:'Nebenkostenabrechnung 2025',art:'PDF',bereich:'wohnen',vorgang:'Nebenkosten 2025',datum:'12.11.2026',herkunft:'Workflow PDF',text:'Hausverwaltung Beispiel. Abrechnungszeitraum 01.01.–31.12.2025. Nachzahlung 184,20 €. Widerspruch bis 12.12.2026 möglich.'},
 {id:2,titel:'Zählerstände zur Abrechnung',art:'JPG',bereich:'wohnen',vorgang:'Nebenkosten 2025',datum:'03.01.2026',herkunft:'Foto',text:'Foto der Zähler Strom, Wasser, Heizung am 31.12.2025.'},
 {id:3,titel:'Anfrage zur Belegeinsicht',art:'DOCX',bereich:'wohnen',vorgang:'Nebenkosten 2025',datum:'14.11.2026',herkunft:'Familienbüro · Schreiben',text:'Brief an die Hausverwaltung Beispiel: Bitte um Einsicht in die Belege der Nebenkostenabrechnung.'},
 {id:4,titel:'Mietvertrag',art:'PDF',bereich:'wohnen',vorgang:'Mietvertrag',datum:'01.04.2019',herkunft:'Datei',text:'Mietvertrag Wohnung, Beginn 01.04.2019, Kaltmiete und Nebenkostenvorauszahlung.'},
 {id:5,titel:'Garantie Waschmaschine',art:'PDF',bereich:'kauf',vorgang:'Waschmaschine',datum:'20.03.2025',herkunft:'Datei',text:'Garantieurkunde Waschmaschine, Kauf 20.03.2025, Garantie zwei Jahre bis 20.03.2027.'},
 {id:6,titel:'Kaufbeleg Waschmaschine',art:'BELEG',bereich:'kauf',vorgang:'Waschmaschine',datum:'20.03.2025',herkunft:'Foto',text:'Kassenbon Elektromarkt Beispiel, Waschmaschine 499,00 €.'},
 {id:7,titel:'Fahrzeugschein',art:'JPG',bereich:'kauf',vorgang:'Auto',datum:'02.06.2022',herkunft:'Foto',text:'Zulassungsbescheinigung Teil I, Hauptuntersuchung fällig 06/2027.'},
 {id:8,titel:'Arztbrief Hausarzt',art:'PDF',bereich:'gesund',vorgang:'Vorsorge 2026',datum:'18.09.2026',herkunft:'Datei',text:'Hausarztpraxis Beispiel. Arztbrief zur Vorsorgeuntersuchung, Versichertennummer A123456789, Befund unauffällig, Kontrolle in zwölf Monaten.'},
 {id:9,titel:'Impfpass',art:'JPG',bereich:'gesund',vorgang:'Impfungen',datum:'05.02.2024',herkunft:'Foto',text:'Impfausweis, letzte Auffrischung 02/2024.'},
 {id:10,titel:'Gehaltsabrechnung Oktober 2026',art:'PDF',bereich:'arbeit',vorgang:'Gehalt 2026',datum:'30.10.2026',herkunft:'Datei',text:'Entgeltabrechnung Oktober 2026, Brutto, Netto, Auszahlung.'},
 {id:11,titel:'Personalausweis (Kopie)',art:'JPG',bereich:'ich',vorgang:'Ausweise',datum:'11.08.2023',herkunft:'Foto',text:'Kopie Personalausweis, gültig bis 08/2033.'},
 {id:12,titel:'Steuerbescheid 2025',art:'PDF',bereich:'geld',vorgang:'Steuer 2025',datum:'22.10.2026',herkunft:'Datei',text:'Finanzamt Beispiel. Einkommensteuerbescheid 2025, Steuer-ID 12 345 678 901, Erstattung 312,00 €. Einspruch bis 25.11.2026.'}
].map(d => ({fassung:1,bei:null,teil:null,...d}));
const eingang = { neu:[
 {id:201,titel:'Brief der Krankenkasse',art:'PDF',vorschlag:'gesund',vorgang:'Krankenkasse',quelle:'Datei-Organizer',text:'Krankenkasse Beispiel. Schreiben zum Beitrag ab Januar, Versichertennummer A123456789.'},
 {id:202,titel:'Rechnung Autowerkstatt',art:'PDF',vorschlag:'kauf',vorgang:'Auto',quelle:'Workflow PDF',text:'Autowerkstatt Beispiel. Rechnung Inspektion, 268,40 €.'}
], zurueck:[] };
const ORGANIZER_NEU = () => [
 {titel:'Stromabrechnung 2025',art:'PDF',vorschlag:'wohnen',vorgang:'Strom',sicher:true},
 {titel:'Lohnsteuerbescheinigung 2025',art:'PDF',vorschlag:'arbeit',vorgang:'Gehalt 2025',sicher:true},
 {titel:'Rezept Apotheke',art:'JPG',vorschlag:'gesund',vorgang:'Vorsorge 2026',sicher:true},
 {titel:'Unbekanntes Schreiben',art:'PDF',vorschlag:'ich',vorgang:'Sonstiges',sicher:false}
];
let organizer = ORGANIZER_NEU();
const mails = [
 {von:'Hausverwaltung Beispiel',betreff:'Termin zur Zählerablesung',anlage:'Ablesetermin.pdf',vorschlag:'wohnen',vorgang:'Nebenkosten 2025'},
 {von:'Krankenkasse Beispiel',betreff:'Ihr Beitrag ab Januar',anlage:'Beitragsbescheid.pdf',vorschlag:'gesund',vorgang:'Krankenkasse'},
 {von:'Autowerkstatt Beispiel',betreff:'Kostenvoranschlag',anlage:'Kostenvoranschlag.pdf',vorschlag:'kauf',vorgang:'Auto'}
];
const geld = { start:600, posten:[{t:'Monatsgeld November',b:600,w:'Haushalt'},{t:'Wochenmarkt',b:-18.50,w:'Lebensmittel'}], bonNr:0, docId:null, gegeben:false, vor:'' };
const s = { tipps:true, ansicht:'start', bereich:null, frage:'', wahl:new Set(), reisen:0, offen:null, teil:'start', scan:false, zuDoc:null };
const sprech = { sitzung:null, an:false };
/* Bedeutungssuche: geladen = Modell liegt geprüft auf dem Gerät; frage = ob die Zeile „Ja/Nein“ nach diesem „Finden“ zu sehen ist. */
const bed = { geladen:null, frage:false, phase:'', fertig:0, gesamt:0, fehler:'', sucht:false, treffer:[], zu:'' };

/* ---------- Helfer ---------- */
let toastZeit;
function toast(t){ $('toast').textContent = t; clearTimeout(toastZeit); toastZeit = setTimeout(() => $('toast').textContent = '', 5200); }
const ort = d => `${bereich(d.bereich).name} / ${d.vorgang}`;
const SYN = {auf:'',aus:'',mit:'',von:'',vom:'',bei:'',nach:'',den:'',dem:'',des:'',einer:'',einem:'',oder:'',wann:'',welche:'',gibt:'',ist:'',sind:'',habe:'',hat:'',finde:'',was:'',wie:'',wo:'',und:'',für:'',fürs:'',ein:'',eine:'',einen:'',dokumente:'',unterlagen:'',alles:'',zur:'',zum:'',der:'',die:'',das:'',meine:'',mein:'',ich:'',brauche:'',nebenkostenabrechnung:'nebenkosten',gesundheitsunterlagen:'gesundheit',arzt:'gesundheit',wohnung:'wohnen',miete:'miet',auto:'auto',steuern:'steuer',notizen:'notiz'};
const suchWoerter = frage => frage.toLowerCase().split(/[^a-zäöüß0-9]+/).map(x => x in SYN ? SYN[x] : x).filter(x => x.length > 2);
/* Beispiele: erst alle Wörter; findet das nichts, zählt, wer die meisten Wörter trifft (Klaus 17.11.: „Gehaltsabrechnung September“
   soll wenigstens die Gehaltsabrechnung finden). Rückgabe: Treffer und ob nur ein Teil der Wörter passte. */
function suche(frage){
  const w = suchWoerter(frage); if (!w.length) return [];
  const heu = d => (d.titel+' '+ort(d)+' '+d.text+' '+d.art).toLowerCase(), alle = docs.filter(d => w.every(x => heu(d).includes(x)));
  if (alle.length || w.length < 2) return alle;
  const teil = docs.map(d => ({d, n:w.filter(x => heu(d).includes(x)).length})).filter(t => t.n), best = Math.max(0, ...teil.map(t => t.n));
  const aus = teil.filter(t => t.n === best).map(t => t.d); aus.teil = true; return aus;
}
/* Echte Unterlagen: die Wortsuche des Klons verlangt alle Wörter. Findet sie nichts, wird Wort für Wort gesucht. */
function echtSuche(frage){
  if (!T() || !echt.liste) return {ids:[], teil:false};
  const alle = T().suchen(frage, echt.liste); if (alle.length) return {ids:alle, teil:false};
  const w = T().teilWoerter(frage); if (w.length < 2) return {ids:[], teil:false};
  const zahl = new Map(); for (const wort of w) for (const id of T().suchen(wort, echt.liste)) zahl.set(id, (zahl.get(id) || 0) + 1);
  const best = Math.max(0, ...zahl.values());
  return {ids:[...zahl].filter(([, n]) => n === best).map(([id]) => id), teil:zahl.size > 0};
}
function neuesDoc(a){ const d = {id:++nr,datum:datum(HEUTE),fassung:1,bei:null,teil:null,...a}; docs.push(d); return d; }
function docZeile(d, {haken=false}={}){
  const m = d.bei ? `<span class="marke2 m-arbeit">in Arbeit: ${esc(inArbeit(d))}</span>` : d.fassung > 1 ? `<span class="marke2 m-ok">Fassung ${d.fassung}</span>` : '';
  return `<div class="zeile">${haken?`<input type="checkbox" class="haken" data-wahl="${d.id}" ${s.wahl.has(d.id)?'checked':''} aria-label="${esc(d.titel)} auswählen">`:''}
   <button class="zeile" style="padding:0;border:0" data-a="doc" data-id="${d.id}"><span class="art ${d.art}">${d.art}</span><span class="mitte"><strong>${esc(d.titel)}</strong><small>${esc(ort(d))} · ${d.datum}</small></span>${m}${ic('weiter')}</button></div>`;
}
/* Maske für die Vorschau: Stellen und Nummern werden zu Platzhaltern, Beträge und Daten bleiben lesbar. */
function maske(text){
  const z = new Map(), n = {};
  const neu = (art, w) => { if (!z.has(w)) { n[art] = (n[art]||0) + 1; z.set(w, `⟦${art}-${n[art]}⟧`); } return z.get(w); };
  const aus = text.replace(/[A-ZÄÖÜ][a-zäöüß]+ Beispiel/g, w => neu('STELLE', w)).replace(/\b[A-Z]\d{9}\b|\b\d{2} \d{3} \d{3} \d{3}\b/g, w => neu('NUMMER', w));
  return {text:aus, zahl:z.size};
}

/* ---------- Kopf und Navigation ---------- */
const WERK = [
 ['bon-start','geld','Portemonnaie','geld','Geld rein, Geld raus – Bon fotografieren'],
 ['scan','scan','PDF scannen','pdf','Foto zu PDF – öffnet den Scanner von Workflow PDF'],
 ['viele','ordner','Dateien hineingeben','sort','ganze Dateien oder Ordner – öffnet den Datei-Organizer'],
 ['notiz','notiz','Notiz','akte','schreiben oder sprechen, von Hand zuordnen'],
 ['kalender','kalender','Kalender','kal','Termine und Fristen']
];
const WERKFARBE = {geld:['#f0b93a','#b77a0c'],pdf:['#e2596b','#9b1f38'],sort:['#2bb673','#107c41'],akte:['#1aa59d','#0b5a66'],kal:['#9a7bd6','#5b3aa6']};
const MEHR = [['import','importpfeil','Importieren','Datei in die Akte legen oder Backup einlesen'],['export','exportpfeil','Exportieren','Backup erstellen – die ganze Akte als verschlüsselter Ordner'],['drucken','drucker','Drucken'],['farbe','','Farbpalette'],['hilfe','','Hilfe']];
/* Die Glocke (Klaus 18.11.): nur das Symbol, ohne Text und ohne sichtbare Fläche – die erscheint erst beim Darauf-Gehen (wie die
   Leiste unten am Galaxy Tab). Drei Farben: rot = etwas ist fällig (heute oder überfällig), nachsehen; grün = Einträge sind
   gespeichert; grau = keine. An der roten Glocke steht die Zahl der fälligen. Ein Tipp klappt das Glockenfeld auf (wie das
   Benachrichtigungsfeld am Tablet): alle offenen Einträge untereinander, jeder einzeln zu öffnen (Pfeil) oder abzuhaken.
   Nichts schiebt sich von selbst über die Seite; läutet es, wackelt die Glocke kurz. */
const glocke = { laeutet:false, auf:null };
const istFaellig = t => { const d = new Date(), z = n => String(n).padStart(2, '0'), h = tagHeute(); return t.tag < h || (t.tag === h && (!t.zeit || t.zeit <= `${z(d.getHours())}:${z(d.getMinutes())}`)); };
const glockeStand = () => { const alle = echt.termine || [], n = alle.filter(istFaellig).length; return n ? ['rot', `${n} fällig`, n] : alle.length ? ['gruen', `${alle.length} ${alle.length === 1 ? 'Eintrag' : 'Einträge'} im Kalender`, 0] : ['grau', 'Keine Erinnerung gespeichert', 0]; };
const glockeInnen = n => ic('glocke') + (n ? `<span class="gzahl">${n > 99 ? '99+' : n}</span>` : '');
function glockeKnopf(){ const [st, t, n] = glockeStand(); return `<button class="geist glockenknopf${glocke.laeutet ? ' laeutet' : ''}" data-a="glocke" data-stand="${st}" aria-label="Glocke: ${t}" aria-haspopup="menu">${glockeInnen(n)}</button>`; }
function glockeNeu(){ const [st, t, n] = glockeStand(); document.querySelectorAll('.glockenknopf').forEach(k => { if (k.dataset.stand !== st || k.dataset.zahl !== String(n)) k.innerHTML = glockeInnen(n); k.dataset.stand = st; k.dataset.zahl = n; k.classList.toggle('laeutet', glocke.laeutet); k.setAttribute('aria-label', 'Glocke: ' + t); }); }
setInterval(() => glockeNeu(), 30000); /* „fällig“ hängt an der Uhr */
function glockenFeld(){
  /* Wie das Benachrichtigungsfeld am Tablet (Klaus' Bilder 18.11.): eine Zeile je Eintrag, ein Tipp darauf öffnet ihn im Kalender;
     der kleine Pfeil klappt die Zeile auf – ganzer Text, darunter die Handlungen als Wörter. */
  const alle = echt.termine || [], zeile = t => { const f = istFaellig(t), auf = glocke.auf === t.id, wann = `${f ? (t.tag < tagHeute() ? 'überfällig · ' : 'heute · ') : ''}${tagText(t.tag)}${t.zeit ? ' · ' + t.zeit + ' Uhr' : ''}`;
    return `<div class="gzeile${f ? ' rot' : ''}${auf ? ' auf' : ''}"><div class="gkopf"><button class="gtext" data-a="kal-tag" data-tag="${t.tag}" data-id="${esc(t.id)}"><span><strong>${esc(t.titel)}</strong><small>${t.art} · ${wann}</small></span></button><button class="geist gpfeil" data-a="glocke-auf" data-id="${esc(t.id)}" aria-expanded="${auf}" aria-label="„${esc(t.titel)}“ ${auf ? 'zuklappen' : 'aufklappen'}">${ic('weiter')}</button></div>${auf ? `<div class="gtun"><button data-a="kal-tag" data-tag="${t.tag}" data-id="${esc(t.id)}">Öffnen</button><button data-a="glocke-erledigt" data-id="${esc(t.id)}">Erledigt</button></div>` : ''}</div>`; };
  menue(`${alle.length ? alle.map(zeile).join('') : '<p class="leer" style="padding:10px">Keine Erinnerung gespeichert.</p>'}<hr><button data-a="kalender">${ic('kalender')} Kalender öffnen</button><button data-a="notiz">${ic('notiz')} Neue Notiz</button>`, 'glockenfeld');
}
function kopfZeigen(){
  $('fassung').textContent = `${FASSUNG} · ${window.PA_PRO ? 'Pro' : 'Basic'}`;
  /* ⟳ nur in der Web-App (Klaus 20.11.: „Aktualisierungsbutton, da ich nicht immer Hard Reload machen kann“); in der App prüft die Fassung/das Fähnchen. */
  { const k = $('pwa-neu'); if (k) k.hidden = !!window.PA_PRO; }
  $('werkleiste').innerHTML = WERK.map(([a,i,t,f,u]) => `<button class="werk" data-a="${a}" aria-label="${t}" data-tipp="${t}" data-tipp2="${u}" style="--a:${WERKFARBE[f][0]};--b:${WERKFARBE[f][1]}">${ic(i)}</button>`).join('');
  $('kopfknoepfe').innerHTML = glockeKnopf() + MEHR.map(([a,i,t,u]) => `<button class="rund nurbreit ${a==='farbe'?'farbknopf':''} ${a==='import'?'hinein':a==='export'?'hinaus':''}" data-a="${a}" data-ort="akte" aria-label="${t}" data-tipp="${t}" ${u?`data-tipp2="${u}"`:''}>${a==='farbe'?'':i?ic(i):'?'}</button>`).join('')
    + `<button class="rund nurschmal" data-a="mehr" aria-label="Mehr: Importieren, Exportieren, Drucken, Farbpalette, Hilfe" aria-haspopup="menu">${ic('mehr')}</button>`;
}
/* Navi-Leiste (0.6.5, Klaus 18.11.: „das Flying Widget ist unsere Navigationsleiste“): am Handy gibt es die untere Leiste nicht mehr –
   Start, Akten, Eingang, Baum stehen in der Seitenleiste. Am breiten Bildschirm steht sie links und lässt sich mit dem Pfeil zu einer
   schmalen Spalte nur mit Symbolen einklappen (gemerkt `pa_nav_zu`). */
const navZu = () => { try { return localStorage.getItem('pa_nav_zu') === '1'; } catch { return false; } };
function navZeigen(){
  const NAV = [['start','Start'],['akten','Akten'],['eingang','Eingang'],['baum','Baum']];
  document.body.classList.toggle('nav-zu', navZu());
  $('nav').innerHTML = `<button class="navklapp" data-a="nav-klapp" aria-label="${navZu() ? 'Leiste aufklappen' : 'Leiste einklappen'}" data-tipp="${navZu() ? 'Aufklappen' : 'Einklappen'}">${ic(navZu() ? 'weiter' : 'zurueck')}</button>` + NAV.map(([id,t]) => `<button data-a="geh" data-zu="${id}" ${s.ansicht===id?'aria-current="page"':''}>${ic(id)}<span>${t}</span>${id==='eingang'&&einordnenZahl()?`<span class="zahl">${einordnenZahl()}</span>`:''}</button>`).join('');
}
const fuss = () => `<footer class="fuss"><span>© 2026 Family-Projekt</span><a href="./rechtliches.html#impressum">Impressum</a><a href="./rechtliches.html#datenschutz">Datenschutz</a><a href="./rechtliches.html#haftung">Haftungsausschluss</a><a href="./rechtliches.html#lizenz">Lizenz</a></footer>`;

/* ---------- Ansichten ---------- */
function sucheFeld(){
  return `<form class="suche" data-form="suche">${ic('lupe')}<input name="q" value="${esc(s.frage)}" placeholder="Welche Unterlage brauchst du?" aria-label="Suchen" autocomplete="off"><button type="button" class="suchknopf" data-a="suche-leer" aria-label="Eingabe löschen" data-tipp="Eingabe löschen" ${s.frage ? '' : 'hidden'}>${ic('zu')}</button>${T() && T().diktat.moeglich() ? `<button type="button" class="suchknopf" data-a="suche-mikro" aria-label="Sprechen" data-tipp="Sprechen" data-tipp2="Sag, was du suchst. Noch einmal tippen beendet und sucht.">${ic('mikro')}</button>` : ''}<button class="knopf" type="submit">Finden</button></form><div id="suchvor" aria-live="polite"></div>`;
}
function treffer(){
  const t = suche(s.frage), es = echtSuche(s.frage), ids = es.ids, e = ids.map(id => echt.liste.find(d => d.id === id)).filter(Boolean);
  // Dem Sinn nach (eigener Abschnitt ganz unten, was die Wörter treffen steht oben): die Rangliste kommt verschmolzen aus Wörtern und
  // Bedeutung (Sage-Protokol). Gezeigt wird, was die Wortsuche oben nicht schon hat – mit der zentrierten Nähe: Fremdes liegt dort
  // um 0, darum zählt erst, was klar darüber liegt und mindestens halb so nah ist wie das Beste. Untere Grenze 0,2: am Tablet
  // (0.4.0, drei Unterlagen) kam Fremdes auf 0,11 und 0,16. Die zweite Grenze ist weiter geschätzt, die Zahl steht an der Zeile. Ist der Bestand für einen Mittelwert zu
  // klein, gibt es keine Nähe; dann die ersten drei der Rangliste, ohne Zahl.
  // Im Text gefunden: alle Inhaltswörter der Frage stehen im gelesenen Inhalt (auch im PDF) – das ist ein Wort-Treffer und steht oben.
  const imText = bed.zu === s.frage && echt.liste ? bed.treffer.filter(h => h.imText && !ids.includes(h.id)).map(h => ({d:echt.liste.find(d => d.id === h.id), h})).filter(x => x.d) : [];
  const rang = bed.zu === s.frage && echt.liste ? bed.treffer.filter(h => !ids.includes(h.id) && !h.imText) : [];
  const roh = rang.some(h => h.naehe !== null) ? (n => n.filter(h => h.naehe >= 0.2 && h.naehe >= n[0].naehe / 2).slice(0, 5))(rang.filter(h => h.naehe !== null).sort((a, b) => b.naehe - a.naehe)) : rang.slice(0, 3);
  const sinn = roh.map(h => ({d:echt.liste.find(d => d.id === h.id), h})).filter(x => x.d);
  // Was die Suche gelesen hat (Klaus 17.11.: nicht zu sehen, ob der Inhalt der PDFs gelesen wurde)
  const g = bed.zu === s.frage && T() && T().bedeutung.gelesen ? T().bedeutung.gelesen() : null;
  const stand = g ? `<p class="lesestand" id="lesestand">Inhalt gelesen bei ${g.unterlagen - g.ohneInhalt} von ${g.unterlagen} Unterlagen${g.ohneInhalt ? ' – bei den übrigen zählen nur Titel, Bereich und Notiz' : ''}.</p>` : '';
  if (!t.length && !e.length && !imText.length && !sinn.length) return `<div class="abschnitt"><div class="liste"><p class="leer">${bed.sucht ? 'Die Wörter finden nichts. Die Suche nach Bedeutung läuft noch …' + (bed.lage ? ' ' + esc(bed.lage) + '.' : '') : `Nichts gefunden zu „${esc(s.frage)}“. Versuch ein anderes Wort.`}</p></div></div>${stand}`;
  const b = new Set(t.map(d=>d.bereich)).size, teil = '<span>nicht alle Wörter passen</span>';
  return `${e.length || imText.length ? `<div class="abschnitt" id="echt-treffer"><h2>Deine Unterlagen <span>${e.length + imText.length} Treffer</span>${es.teil && e.length ? teil : ''}</h2><div class="liste">${e.map(d => echtZeile(d)).join('')}${imText.map(x => echtZeile(x.d, 'im Text gefunden', x.h)).join('')}</div></div>` : ''}
   ${t.length ? `<div class="abschnitt" id="beispiel-treffer"><h2>${t.length} ${t.length===1?'Beispiel':'Beispiele'} <span>aus ${b} ${b===1?'Bereich':'Bereichen'} · anhaken zum Sammeln</span>${t.teil ? teil : ''}</h2>
   <div class="liste">${t.map(d => docZeile(d,{haken:true})).join('')}</div>${s.wahl.size?`<div class="leiste"><span>${s.wahl.size} gesammelt</span><button class="knopf" data-a="mappe">Mappe öffnen ${ic('pfeil')}</button></div>`:''}</div>` : ''}
   ${sinn.length ? `<div class="abschnitt" id="sinn-treffer"><h2>Passt vielleicht dem Sinn nach <span>deine Unterlagen · die Zahl ist die Nähe zur Frage, 0 heißt fremd</span></h2><div class="liste">${sinn.map(x => echtZeile(x.d, x.h.naehe === null ? 'dem Sinn nach' : 'dem Sinn nach · ' + x.h.naehe.toFixed(2).replace('.', ','), x.h)).join('')}</div></div>` : ''}
   ${stand}`;
}
/* Abschnitte der Startseite als Knopf, eingeklappt (Klaus 18.11.: bei 100 Unterlagen wird die Seite sonst endlos). Offen/zu wird gemerkt. */
const klapp = (() => { try { return JSON.parse(localStorage.getItem('pa_klapp') || '{}') || {}; } catch { return {}; } })();
const klappTeil = (id, titel, unter, innen, attr = '') => `<details class="abschnitt klapp" ${attr} data-klapp="${id}" ${klapp[id] ? 'open' : ''}><summary><b>${titel}</b><span>${unter}</span>${ic('weiter')}</summary><div class="liste">${innen}</div></details>`;
document.addEventListener('toggle', ev => { const d = ev.target; if (!d.dataset || !d.dataset.klapp) return; kartenHoehe(); klapp[d.dataset.klapp] = d.open ? 1 : 0; try { localStorage.setItem('pa_klapp', JSON.stringify(klapp)); } catch { /* gilt dann bis zum Neuladen */ } }, true);
/* Fällig, echt (0.6.0): offene Termine, Fristen und Erinnerungen aus dem Tresor – dieselben wie in „Mein Kalender“. Ein Tipp öffnet den Kalender an dem Tag. */
const tagHeute = () => { const d = new Date(), z = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; };
const tagText = t => `${t.slice(8, 10)}.${t.slice(5, 7)}.${t.slice(0, 4)}`;
function echtTerminZeile(t){
  const n = Math.round((new Date(t.tag + 'T00:00') - new Date(tagHeute() + 'T00:00')) / 864e5);
  return `<button class="zeile" data-a="kal-tag" data-tag="${t.tag}" data-id="${esc(t.id)}"><span class="art" style="background:#ece7f8;color:#5b3aa6">${ic('kalender')}</span><span class="mitte"><strong>${esc(t.titel)}</strong><small>${t.art} · ${tagText(t.tag)}${t.zeit ? ' · ' + t.zeit + ' Uhr' : ''}</small></span><span class="marke2 ${n < 14 ? 'm-rot' : 'm-grau'}">${n < 0 ? 'überfällig' : n === 0 ? 'heute' : n === 1 ? 'morgen' : 'in ' + n + ' Tagen'}</span></button>`;
}
function faelligTeil(){
  const t = echt.termine || [];
  return klappTeil('faellig', 'Fällig', t.length ? `${t.length} ${t.length === 1 ? 'Eintrag' : 'Einträge'} im Kalender` : 'nichts offen', t.length ? t.slice(0, 5).map(echtTerminZeile).join('') + (t.length > 5 ? `<button class="zeile" data-a="kalender"><span class="mitte"><strong>Alle im Kalender ansehen</strong></span></button>` : '') : `<p class="leer">Nichts offen. <button class="knopf hell klein" data-a="kalender">Kalender öffnen</button></p>`, 'id="faellig"');
}
function vStart(){
  return `<h1 class="titel nurpc">Was möchtest du finden?</h1>${sucheFeld()}
  ${s.frage ? `<div id="bedort">${bedZeile()}</div><div id="trefferort">${treffer()}</div>` : `
  ${echtAbschnitt()}
  ${faelligTeil()}
  ${bereicheKacheln()}`}${fuss()}`;
}
/* Bereiche der Startseite, echt (0.7.0, Klaus 18.11. zu E: „echt machen“): die Bereiche, in denen Unterlagen liegen, mit ihrer Zahl.
   Ein Tipp zeigt den Bereich im Baum über „Deine Unterlagen“ (Sortieren: Bereich). */
const KFARBE = [['#61b4ef','#2c79c5'],['#77d48a','#27945c'],['#ffd75a','#d79a16'],['#ff8f7d','#d34a4a'],['#b69be6','#7550c2'],['#5fd0c6','#16867f']];
/* 0.9.4 (Klaus 20.11., Bild der Pro-App mit leerer Akte: „nur leere Container sieht hässlich aus, ich will was fürs Auge“): sechs
   Grundbereiche stehen immer da, auch bei leerer Akte („noch leer“); dazu jeder weitere Bereich, in dem Unterlagen liegen. */
const GRUNDBEREICHE = ['Familie & persönliche Dokumente', 'Finanzen & Konten', 'Gesundheit & Pflege', 'Haus & Wohnung', 'Versicherungen', 'Auto & Mobilität'];
function bereicheKacheln(){
  const l = echt.liste || [];
  const zahl = new Map(); for (const d of l) { const k = kanonBereich(d.category); zahl.set(k, (zahl.get(k) || 0) + 1); }
  const voll = [...zahl].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]), 'de'));
  const leer = GRUNDBEREICHE.filter(b => ![...zahl.keys()].some(k => bereichKern(k) === bereichKern(b))).map(b => [b, 0]);
  const g = [...voll, ...leer].sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'de')); // Klaus 23.11.: nach dem Alphabet, dann findet man sie leichter
  return `<div class="abschnitt" id="bereiche"><h2>Bereiche <span>${g.length}</span></h2><div class="kacheln bereichsraster">${g.map(([b, n], i) => `<button class="kachel${n ? '' : ' leer'}" style="--a:${KFARBE[i % 6][0]};--b:${KFARBE[i % 6][1]}" data-a="echt-bereich" data-k="${esc(b)}"><span class="tupfer eckig">${ic('akten')}</span><span><strong>${esc(b)}</strong><small>${n ? `${n} ${n === 1 ? 'Unterlage' : 'Unterlagen'}` : 'noch leer'}</small></span></button>`).join('')}</div></div>`;
}
/* ---------- Akten (0.7.0, Klaus 18.11., Antworten A–D ja) ----------
   Datei = Rohmaterial (bleibt im Datei-Organizer), Unterlage = in die Akte gelegt, Akte = ein Fach mit Namen, einer Person zugeordnet
   oder allen. Personen und Akten sind Datensätze im Register der Familienakte (`T().akten`); eine Unterlage kann in mehreren Akten liegen.
   Oben die Personen als Reiter, darunter die Akten mit Zahl. `s.bereich` = die geöffnete Akte (oder „p:<Person>“, „ohne“). */
function vAkten(){
  /* 0.7.3 (Klaus 18.11.): dieselbe Ansicht wie „Deine Unterlagen“ – links der Baum wie im Explorer (Alle Personen › Person › ihre Akten,
     dazu „Gemeinsam“ und „Ohne Akte“), rechts die Unterlagen mit dem Pfad darüber. `s.bereich` ist der gewählte Knoten. */
  const ak = AK(), l = echt.liste || [], k = s.bereich || '';
  const ohneAkte = l.filter(d => !echtBezug(d).akten.length), gemeinsam = ak.akten.filter(a => !a.person);
  const knoten = [];
  for (const p of ak.personen) { const meine = ak.akten.filter(a => a.person === p.id), lose = docsZuPerson(p).filter(d => !echtBezug(d).akten.length);
    knoten.push({k:'p:' + p.id, t:p.name, n:new Set([...docsZuPerson(p).map(d => d.id), ...meine.flatMap(a => docsInAkte(a.id).map(d => d.id))]).size, kinder:[...meine.map(a => ({k:'p:' + p.id + '|a:' + a.id, t:a.titel, n:docsInAkte(a.id).length})), ...(lose.length ? [{k:'p:' + p.id + '|ohne', t:'ohne Akte', n:lose.length}] : [])]}); }
  if (gemeinsam.length) knoten.push({k:'g', t:'Gemeinsam', n:new Set(gemeinsam.flatMap(a => docsInAkte(a.id).map(d => d.id))).size, kinder:gemeinsam.map(a => ({k:'g|a:' + a.id, t:a.titel, n:docsInAkte(a.id).length}))});
  knoten.push({k:'ohne', t:'Ohne Akte', n:ohneAkte.length, kinder:[]});
  // Was rechts steht und der Pfad dazu
  const teile = k.split('|'), p = teile[0].startsWith('p:') ? ak.personen.find(x => x.id === teile[0].slice(2)) : null, a = (teile.find(x => x.startsWith('a:')) || '').slice(2);
  const pfad = ['Alle Personen', p ? p.name : teile[0] === 'g' ? 'Gemeinsam' : teile[0] === 'ohne' ? 'Ohne Akte' : null, a ? (akteVon(a) || {}).titel : teile[1] === 'ohne' ? 'ohne Akte' : null].filter(Boolean);
  const liste = echtSortiert(a ? docsInAkte(a) : k === 'ohne' ? ohneAkte : p && teile[1] === 'ohne' ? docsZuPerson(p).filter(d => !echtBezug(d).akten.length) : p ? l.filter(d => docsZuPerson(p).includes(d) || ak.akten.some(x => x.person === p.id && echtBezug(d).akten.includes(x.id))) : k === 'g' ? l.filter(d => gemeinsam.some(x => echtBezug(d).akten.includes(x.id))) : l);
  const ordner = `<svg class="icon eordner" viewBox="0 0 24 24" aria-hidden="true">${P.akten}</svg>`, personIc = `<svg class="icon eordner" viewBox="0 0 24 24" aria-hidden="true">${P.person}</svg>`;
  const auf = x => k === x.k || k.startsWith(x.k + '|');
  const zweig = x => `<li><button class="eknoten${k === x.k ? ' an' : ''}${auf(x) ? ' offen' : ''}" data-a="akte-auf" data-id="${esc(x.k)}" aria-expanded="${auf(x)}"><span class="epfeil${x.kinder.length ? '' : ' leer'}">${ic('weiter')}</span>${x.k.startsWith('p:') ? personIc : ordner}<span class="ename">${esc(x.t)}</span><b>${x.n}</b></button>${x.kinder.length && auf(x) ? `<ul>${x.kinder.map(c => `<li><button class="eknoten unter${k === c.k ? ' an' : ''}" data-a="akte-auf" data-id="${esc(c.k)}"><span class="epfeil leer"></span>${ordner}<span class="ename">${esc(c.t)}</span><b>${c.n}</b></button></li>`).join('')}</ul>` : ''}</li>`;
  return `<h1 class="titel">Akten</h1>
   <div class="ekopf akopf"><button class="chip" data-a="person-neu">${ic('plus')} Person</button><button class="chip" data-a="akte-neu">${ic('plus')} Neue Akte</button>${ak.beispiel ? `<button class="chip" data-a="beispiel-weg">Beispielfamilie entfernen</button>` : !ak.personen.length && l.length ? `<button class="chip" data-a="beispiel-an">Beispielfamilie anlegen</button>` : ''}</div>
   <div class="eexplorer" id="akten-ansicht"><section class="ekarte ebaumkarte"><div class="ebaum"><ul class="ebaumliste"><li><button class="eknoten alle${k ? '' : ' an'}" data-a="akte-auf" data-id="" aria-expanded="true"><span class="epfeil">${ic('weiter')}</span>${personIc}<span class="ename">Alle Personen</span><b>${AK().personen.length}</b></button><ul id="akten-liste">${knoten.map(zweig).join('')}</ul></li></ul></div></section>
    <section class="ekarte elistekarte"><h3 class="egewaehlt apfad">${pfad.map(esc).join(' <span>›</span> ')}<b>${liste.length}</b></h3>
     ${p && !a && teile[1] !== 'ohne' ? steckbriefTeil(p) : ''}
     ${a ? `<div class="reihe" style="margin:0 12px 6px"><button class="knopf hell klein" data-a="akte-fuellen" data-id="${esc(a)}">${ic('plus')} Unterlagen hineinlegen</button></div>` : ''}
     <div id="akte-liste" class="eliste">${liste.length ? liste.slice(0, echt.zeig || ECHT_SEITE).map(echtReihe).join('') + (liste.length > (echt.zeig || ECHT_SEITE) ? `<button class="zeile emehr" data-a="echt-mehr"><span class="mitte"><strong>Weitere zeigen</strong></span></button>` : '') : '<p class="leer">Noch keine Unterlage.</p>'}</div></section></div>${fuss()}`;
}
/* Steckbrief der Person (0.9.4, Familienakte 2.28.75): Kontakt, Ausweise & Nummern (Nummer verdeckt, gültig bis, Foto), weitere Einträge.
   Rechts über den Unterlagen der Person, einklappbar (pa_klapp.stb, ab Werk zu), Zahl daneben. Lesen und Speichern über T().akten –
   gespeichert wird nur über den Kern des Klons (updateLocalPersonContact, updateLocalPersonSteckbrief). */
const stb = { daten:{}, laedt:{}, bearb:null, entwurf:null, offen:new Set() };
async function stbLaden(id){ stb.laedt[id] = 1; try { stb.daten[id] = await T().akten.steckbrief(id) || {kontakt:{}, steckbrief:{ausweise:[], eintraege:[]}}; } catch (err) { toast(fehlerText(err)); } stb.laedt[id] = 0; if (s.ansicht === 'akten') mainZeigen(); }
const stbZahl = x => Object.values(x.kontakt).filter(Boolean).length + x.steckbrief.ausweise.length + x.steckbrief.eintraege.length;
const datumDe = t => /^\d{4}-\d{2}-\d{2}$/.test(t || '') ? tagText(t) : '';
function steckbriefTeil(p){
  const x = stb.daten[p.id];
  if (!x) { if (!stb.laedt[p.id] && T()) stbLaden(p.id); return ''; }
  const ak = T().akten, k = x.kontakt, sb = x.steckbrief, bearb = stb.bearb === p.id;
  let innen;
  if (bearb) {
    const e = stb.entwurf, arten = [...ak.steckbriefArten];
    const kf = ak.kontaktFelder.map(f => `<label>${esc(ak.kontaktBeschriftung[f])}<input class="feld" name="k_${f}" value="${esc(e.kontakt[f] || '')}" autocomplete="off"></label>`).join('');
    const aw = e.ausweise.map((w, i) => `<div class="stbzeile" data-i="${i}"><select class="feld" name="a_art">${[...(w.art && !arten.includes(w.art) ? [w.art] : []), ...arten].map(o => `<option${o === w.art ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select><input class="feld" name="a_nr" value="${esc(w.nummer)}" placeholder="Nummer" autocomplete="off" spellcheck="false"><input class="feld" type="date" name="a_bis" value="${esc(w.gueltigBis)}" aria-label="gültig bis"><button class="rund klein" type="button" data-a="stb-foto" data-i="${i}" aria-label="Foto" data-tipp="Foto">${ic('kamera')}${(w.dokumentIds || []).length ? `<b>${w.dokumentIds.length}</b>` : ''}</button><button class="rund klein" type="button" data-a="stb-weg" data-art="a" data-i="${i}" aria-label="Entfernen">${ic('muell')}</button></div>`).join('');
    const ew = e.eintraege.map((w, i) => `<div class="stbzeile" data-i="${i}"><input class="feld" name="e_name" value="${esc(w.name)}" placeholder="Name" autocomplete="off"><input class="feld" name="e_wert" value="${esc(w.wert)}" placeholder="Wert" autocomplete="off"><button class="rund klein" type="button" data-a="stb-weg" data-art="e" data-i="${i}" aria-label="Entfernen">${ic('muell')}</button></div>`).join('');
    innen = `<form class="stbform" data-form="steckbrief" data-id="${esc(p.id)}"><h4>Kontakt</h4><div class="felder stbkontakt">${kf}</div>
      <h4>Ausweise &amp; Nummern</h4><div id="stb-ausweise">${aw}</div><button class="chip" type="button" data-a="stb-plus" data-art="a">${ic('plus')} Ausweis</button>
      <h4>Weitere Einträge</h4><div id="stb-eintraege">${ew}</div><button class="chip" type="button" data-a="stb-plus" data-art="e">${ic('plus')} Eintrag</button>
      <div class="reihe"><button class="knopf gruen" type="submit">Übernehmen</button><button class="knopf hell" type="button" data-a="stb-stift" data-id="${esc(p.id)}">Abbrechen</button></div></form>`;
  } else {
    const ort = [k.street, [k.postalCode, k.city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    const kz = [ort, k.phone, k.email].filter(Boolean).map(t => `<div class="stbwert">${esc(t)}</div>`).join('');
    const az = sb.ausweise.map(w => { const st = ak.ausweisStand(w.gueltigBis), auf = stb.offen.has(w.id);
      return `<div class="stbwert stbausweis"><b>${esc(w.art)}</b>${w.nummer ? `<button class="stbnr" data-a="stb-nr" data-id="${esc(w.id)}" aria-label="${auf ? 'Nummer verdecken' : 'Nummer zeigen'}">${esc(auf ? w.nummer : ak.nummerVerdeckt(w.nummer))}</button>` : ''}${w.gueltigBis ? `<span class="stbbis ${st}">bis ${datumDe(w.gueltigBis)}</span>` : ''}${(w.dokumentIds || []).map(d => `<button class="chip klein" data-a="echt-oeffnen" data-id="${esc(d)}">${ic('kamera')} Foto</button>`).join('')}</div>`; }).join('');
    const ez = sb.eintraege.map(w => `<div class="stbwert"><b>${esc(w.name)}</b> ${esc(w.wert)}</div>`).join('');
    innen = `${kz ? `<h4>Kontakt</h4>${kz}` : ''}${az ? `<h4>Ausweise &amp; Nummern</h4>${az}` : ''}${ez ? `<h4>Weitere Einträge</h4>${ez}` : ''}<div class="reihe"><button class="knopf hell klein" data-a="stb-stift" data-id="${esc(p.id)}">${ic('stift')} Ändern</button></div>`;
  }
  return `<details class="stb" id="steckbrief" data-klapp="stb" ${klapp.stb || bearb ? 'open' : ''}><summary><b>Steckbrief</b><b class="stbzahl">${stbZahl(x)}</b>${ic('weiter')}</summary><div class="stbinnen">${innen}</div></details>`;
}
function stbAusForm(){ const f = document.querySelector('form.stbform'), e = stb.entwurf; if (!f || !e) return;
  for (const k of T().akten.kontaktFelder) e.kontakt[k] = f.elements['k_' + k].value;
  f.querySelectorAll('#stb-ausweise .stbzeile').forEach(z => { const w = e.ausweise[+z.dataset.i]; w.art = z.querySelector('[name=a_art]').value; w.nummer = z.querySelector('[name=a_nr]').value; w.gueltigBis = z.querySelector('[name=a_bis]').value; });
  f.querySelectorAll('#stb-eintraege .stbzeile').forEach(z => { const w = e.eintraege[+z.dataset.i]; w.name = z.querySelector('[name=e_name]').value; w.wert = z.querySelector('[name=e_wert]').value; }); }
const stbNeuId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));
document.addEventListener('submit', async ev => { const f = ev.target; if (f.dataset.form !== 'steckbrief') return; ev.preventDefault(); stbAusForm();
  const id = f.dataset.id, e = stb.entwurf, knopf = f.querySelector('[type=submit]'); knopf.disabled = true;
  try { await T().akten.kontaktSpeichern(id, e.kontakt); await T().akten.steckbriefSpeichern(id, {ausweise:e.ausweise, eintraege:e.eintraege}); stb.bearb = null; stb.entwurf = null; await stbLaden(id); toast('Steckbrief gespeichert.'); }
  catch (err) { knopf.disabled = false; toast(fehlerText(err)); } });
/* Eingang, echt (0.7.0): was in der Akte liegt, aber noch keiner Akte und keiner Person zugeordnet ist – bis du es einordnest. */
function vEingang(){
  const n = echtSortiert(offenEinordnen());
  return `<h1 class="titel">Eingang <span class="zahlklein">${n.length}</span></h1>
  <div class="abschnitt" id="eingang-liste"><div class="liste">${n.length ? n.slice(0, echt.zeig || ECHT_SEITE).map(echtReihe).join('') + (n.length > (echt.zeig || ECHT_SEITE) ? `<button class="zeile emehr" data-a="echt-mehr"><span class="mitte"><strong>Weitere zeigen</strong></span></button>` : '') : '<p class="leer">Alles eingeordnet.</p>'}</div></div>${fuss()}`;
}
/* Der Baum (Bild und Film aus der Discovery-Seite des Datei-Organizers) */
function blaetter(id){ return id==='mail' ? 0 : id==='geld' ? (pm.liste || []).length : id==='sort' ? organizer.length : id==='kal' ? (echt.termine || []).length : docs.filter(d => d.bei===id).length; }
function schild(w){ const [x,y] = w.ort, n = blaetter(w.id), was = w.id==='kal' ? (n===1?' Termin':' Termine') : w.id==='geld' ? ' Posten' : w.id==='mail' ? (n===1?' Mail':' Mails') : (n===1?' Datei':' Dateien');
  return `<button class="schild" style="left:${x}%;top:${y}%;--farbe:${w.a}" data-a="stadt" data-id="${w.id}"><b>${w.name}</b><small>${n ? n+was : 'bereit'}</small></button>`; }
function woLiegtWas(){
  const zl = (a, attr, t, u, n) => `<button class="wozeile" data-a="${a}" ${attr}><span><b>${t}</b><small>${u}</small></span><em>${n}</em></button>`;
  const st = STAEDTE.map(w => `<button class="wostadt" style="--farbe:${w.a}" data-a="stadt" data-id="${w.id}">${w.name}</button>`).join('');
  return `<div class="abschnitt" id="wo-liegt-was"><h2>Wo liegt was? <span>ein Speicher für alles – der Tresor</span></h2>
  <div class="wo">
   <div class="wokasten"><h3>1 · Hinzufügen</h3><p>Leiste oben: Bon, Scan, Dateien, Notiz, Kalender – und Importieren (grüner Pfeil). Dazu Mails aus Private Brain.</p><p class="wonotiz">Was noch in keiner Akte liegt, steht im Eingang.</p></div>
   <i class="wopfeil" aria-hidden="true"></i>
   <div class="wokasten tresor"><h3>2 · Der Tresor <small>der einzige Speicher</small></h3>
    ${zl('geh','data-zu="akten"','Unterlagen','in Akten, je Person',(echt.liste || []).length)}
    ${zl('geh','data-zu="eingang"','Eingang','Neues, bis es in einer Akte liegt',einordnenZahl())}
    ${zl('stadt','data-id="kal"','Termine, Fristen und Notizen','der Kalender der Akte',(echt.termine || []).length)}
    ${zl('stadt','data-id="geld"','Portemonnaie','Posten und die Bons dazu',(pm.liste || []).length)}
    ${zl('stadt','data-id="mail"','E-Mails','in Private Brain, eigene App','›')}
    <p class="wonotiz">Dazu das Register: was wo liegt, Vorgänge, Herkunft. Die Suche liest nur hier.</p></div>
   <i class="wopfeil beide" aria-hidden="true"></i>
   <div class="wokasten"><h3>3 · Tools <small>die Werkzeugstätten im Bild · kein eigener Speicher</small></h3><div class="wostaedte">${st}</div><p class="wonotiz">Ein Werkzeug holt eine Kopie, du arbeitest, „Zur Akte“ legt das Ergebnis als neue Fassung in den Tresor. Die Helfer lesen und schlagen vor, sie behalten nichts.</p></div>
  </div>
  <div class="wo unten">
   <button class="wokasten klein" data-a="sicherung"><h3>Sicherung</h3><p>Eine Kopie des ganzen Tresors an einem zweiten Ort. Ein Speicher heißt: eine Sicherung reicht.</p></button>
   <button class="wokasten klein aussen" data-a="hinaus-info"><h3>Nach außen</h3><p>Nur ein Weg: das Portemonnaie gibt den Monat als Datei an BookLedgerPro. Sonst verlässt nichts den Tresor.</p></button>
  </div></div>`;
}
function vBaum(){
  const film = s.reisen ? `<video class="baumfilm" src="./bilder/zur-akte.mp4" autoplay muted playsinline onended="this.remove()" onerror="this.remove()"></video>` : '';
  s.reisen = 0;
  return `<h1 class="titel">Der Baum</h1>
  <div class="abschnitt"><div class="baumbild"><img src="./bilder/baum.jpg" width="1280" height="716" alt="Ein großer Baum am Abend. In der Mitte eine leuchtende Halle, an den Ästen kleine Städte. An einem neuen Ast entsteht gerade eine weitere Stadt mit Kränen, bunte Helfer schauen zu.">
   <svg class="wege" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M13 84 C9 90 5 93 0 95" fill="none" stroke="#ffe7ad" stroke-width="2.5" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/></svg>
   <button class="schild akte" style="left:37%;top:58%" data-a="geh" data-zu="start"><b>${NAME}</b><small>die Akte · ${(echt.liste || []).length} Unterlagen</small></button>
   ${STAEDTE.map(schild).join('')}
   <button class="schild aussen" style="left:0;top:93%" data-a="hinaus-info"><b>→ BookLedgerPro</b><small>Weg nach außen</small></button>${film}</div></div>
  ${woLiegtWas()}${fuss()}`;
}

/* ---------- Fenster ---------- */
function fenster(html, klasse='', stil=''){ $('fensterort').innerHTML = `<div class="schleier" data-a="zu-aussen"><div class="fenster ${klasse}" ${stil?`style="${stil}"`:''} role="dialog" aria-modal="true">${html}</div></div>`; }
function zu(){ $('fensterort').innerHTML = ''; s.offen = null; }
function menueZu(){ $('menueort').innerHTML = ''; }
const fk = (t, u='', extra='') => `<div class="fkopf"><h2>${t}${u?`<small>${u}</small>`:''}</h2>${extra}<button class="rund" data-a="zu" aria-label="Schließen">${ic('zu')}</button></div>`;
function fDoc(id){
  const d = docs.find(x => x.id == id); if (!d) return;
  const knopf = d.bei
    ? `<button class="knopf gruen voll" data-a="stadt" data-id="${d.bei}" data-teil="${d.teil||''}">Weiter in ${esc(inArbeit(d))} ${ic('pfeil')}</button>`
    : `<button class="knopf voll" data-a="mit" data-doc="${d.id}">${ic('stift')} Bearbeiten mit …</button>`;
  fenster(`${fk(esc(d.titel), esc(ort(d)))}
   <div class="blatt"><small>${d.art} · Vorschau</small><b>${esc(d.titel)}</b>${esc(d.text)}${d.fassung>1?'<p style="margin-top:8px"><span class="mark">Markierung aus der Bearbeitung</span></p>':''}</div>
   <dl class="angaben"><dt>Abgelegt</dt><dd>${d.datum}</dd><dt>Herkunft</dt><dd>${esc(d.herkunft)}</dd><dt>Fassung</dt><dd>${d.fassung}${d.fassung>1?' (ältere bleiben erhalten)':''}</dd>${d.bei?`<dt>Zustand</dt><dd><span class="marke2 m-arbeit">Kopie in Arbeit: ${esc(inArbeit(d))}</span></dd>`:''}</dl>
   ${knopf}<div class="reihe"><button class="knopf hell" data-a="kopie">Kopie herausholen</button><button class="knopf hell" data-a="teilen">Teilen</button><button class="knopf hell" data-a="druck-doc" data-id="${d.id}">${ic('drucker')} Drucken</button></div>`);
}
/* „Bearbeiten mit“: an jeder Unterlage, jedem Foto, jeder Notiz – auch an dem, was gerade hereinkommt */
const MIT = [
 ['text','stift','Familienbüro · Schreiben','einen Brief oder Text dazu schreiben',['#3f8fe0','#185abd']],
 ['pdf','pdf','Workflow PDF','markieren, ausfüllen, zusammenfügen (im Familienbüro)',['#e2596b','#9b1f38']],
 ['geld','geld','Portemonnaie','als Ausgabe oder Einnahme eintragen',['#f0b93a','#b77a0c']],
 ['sort','sort','Datei-Organizer','neu zuordnen lassen',['#2bb673','#107c41']],
 ['pseudo','maske','Pseudonymisieren · An KI','Namen und Nummern verdecken, dann erst weitergeben',['#1aa59d','#0b5a66']]
];
function fMit(e){
  const was = e.dataset.neu ? eingang.neu.find(x => x.id == e.dataset.neu) : docs.find(x => x.id == e.dataset.doc);
  const wo = e.dataset.neu ? `data-neu="${was.id}"` : `data-doc="${was.id}"`;
  fenster(`${fk('Bearbeiten mit', esc(was.titel))}
   <p class="unter" style="margin-bottom:10px">${e.dataset.neu ? 'Die Sache gilt als in der Akte angekommen (mit dem gewählten Bereich).' : 'Das Original bleibt in der Akte.'} Bearbeitet wird eine Kopie im Tool.</p>
   <div class="liste">${MIT.map(([id,i,t,u,f]) => `<button class="zeile" data-a="mit-wahl" data-womit="${id}" ${wo}><span class="tupfer eckig" style="--a:${f[0]};--b:${f[1]}">${ic(i)}</span><span class="mitte"><strong>${t}</strong><small>${u}</small></span>${ic('weiter')}</button>`).join('')}</div>`);
}
function ablegenAusEingang(id){
  const i = eingang.neu.findIndex(x => x.id == id), x = eingang.neu[i]; eingang.neu.splice(i,1);
  return neuesDoc({id:x.id,titel:x.titel,art:x.art,bereich:x.vorschlag,vorgang:x.vorgang,herkunft:x.quelle,text:x.text||x.titel});
}
function fPseudo(d, original=false){
  s.pseudo = d;
  const m = maske(d.text), sicht = original ? esc(d.text) : esc(m.text).replace(/⟦[^⟧]+⟧/g, p => `<span class="platz">${p}</span>`);
  fenster(`${fk('Pseudonymisieren', esc(d.titel))}
   <div class="schritte"><span>1 Zur KI</span><span>2 Zurück</span></div>
   <div class="blatt"><small>${original ? 'Original' : 'Das sieht die KI · ⟦PSEUDONYMISIERT v1⟧'}</small><b>${esc(d.titel)}</b>${sicht}</div>
   <p class="hinweis" style="text-align:left;margin-top:8px">${m.zahl} ${m.zahl===1?'Stelle':'Stellen'} verdeckt. Beträge und Daten bleiben lesbar. Die Zuordnung bleibt auf dem Gerät.</p>
   <div class="reihe"><button class="knopf" data-a="pseudo-kopie">Fassung kopieren</button><button class="knopf hell" data-a="pseudo-sicht" data-original="${original?'':'1'}">${original?'KI sieht':'Original'} zeigen</button><button class="knopf hell" data-a="pseudo-zurueck">Antwort zurückführen</button></div>
   <p class="hinweis">Beispiel. In der echten App arbeitet hier die Maske aus der Familienakte; eine KI ist nicht angeschlossen.</p>`);
}

/* ---------- Die Städte ---------- */
function fStadt(wid, ids=[], teilId){
  const w = stadt(wid);
  ids = ids.map(Number).filter(Boolean);
  if (wid === 'buero') { if (teilId) s.teil = teilId; else if (!ids.length && s.offen !== 'buero') s.teil = 'start'; }
  ids.forEach(i => { const d = docs.find(x => x.id === i); if (d) { d.bei = wid; d.teil = wid === 'buero' ? s.teil : null; } });
  if (wid === 'geld' && s.offen !== 'geld') pm.liste = null;
  s.offen = wid;
  const inhalt = ({buero, geld:portemonnaie, sort:sortierer, mail:post, })[wid]();
  const astnav = `<div class="astnav" aria-label="Zwischen den Programmen wechseln"><button data-a="geh" data-zu="start">‹ Akte</button><button data-a="geh" data-zu="baum">Baum</button>${STAEDTE.map(x => `<button data-a="stadt" data-id="${x.id}" ${x.id===wid?'aria-current="true"':''}>${x.name}</button>`).join('')}</div>`;
  fenster(fk(esc(w.name), `Tool in der Privaten Akte · ${esc(w.tut)}`, `<button class="rund farbknopf" data-a="farbe" data-ort="${wid}" aria-label="Farbpalette für ${esc(w.name)}" title="Farbpalette"></button>`) + astnav + `<div id="astinhalt">${inhalt}</div>`, 'ast', farbStil(wid));
  navZeigen(); mainZeigen();
}
const stadtNeu = () => { if (s.offen) fStadt(s.offen); };
function buero(){
  const t = s.teil, da = id => docs.filter(d => d.bei === 'buero' && d.teil === id);
  const leiste = `<div class="astnav teil" aria-label="Programme im Familienbüro"><button data-a="teil" data-teil="start" ${t==='start'?'aria-current="true"':''}>Übersicht</button>${TEILE.map(x => `<button data-a="teil" data-teil="${x.id}" ${t===x.id?'aria-current="true"':''}>${x.name}</button>`).join('')}</div>`;
  if (t === 'start') return leiste + `<div class="kacheln" style="grid-template-columns:repeat(2,1fr)">${TEILE.map(x => { const n = da(x.id).length; return `<button class="kachel gross" style="--a:${x.a};--b:${x.b}" data-a="teil" data-teil="${x.id}"><span class="tupfer">${ic(x.icon)}</span><span><strong>${x.name}</strong><small>${n ? n+' in Arbeit' : x.tut}</small></span></button>`; }).join('')}</div>
    <p class="hinweis">Vier Kacheln wie im Familienbüro. Die PDF-Kachel heißt hier „Workflow PDF“, damit klar ist, was sich öffnet.</p>`;
  const x = teil(t), ds = da(t);
  const blaetter = ds.map(d => `<div class="blatt" style="margin-bottom:8px"><small>Kopie · Fassung ${d.fassung} · ${esc(ort(d))}</small><b>${esc(d.titel)}</b>${esc(d.text)}<p style="margin-top:8px"><span class="mark">${t==='pdf'?'Hier wurde etwas markiert (Beispiel)':'Hier wurde weitergeschrieben (Beispiel)'}</span></p></div>`).join('');
  const zurAkte = ds.length ? `<button class="knopf gruen voll" data-a="zurueck" data-docs="${ds.map(d => d.id).join(',')}">Zur Akte ${ic('pfeil')}</button>` : '';
  let eigen = '';
  if (t === 'pdf') eigen = (s.scan ? `<div class="blatt" style="margin-bottom:8px"><small>Neuer Scan · 1 Seite · Foto zu PDF</small><b>Scan vom ${datum(HEUTE)}</b>Die Kamera hat die Seite aufgenommen, gerade gerückt und als PDF gespeichert (Beispiel).<div class="reihe"><button class="knopf gruen klein" data-a="scan-zur-akte">Zur Akte ${ic('pfeil')}</button><button class="knopf hell klein" data-a="scan">Noch eine Seite</button></div></div>` : '') + blaetter
    + (!s.scan && !ds.length ? `<p class="leer">Gerade liegt hier nichts. „Workflow PDF öffnen“ zeigt das echte Programm, „PDF scannen“ macht aus einem Foto ein PDF.</p>` : '') + zurAkte + `<div class="reihe"><button class="knopf rot" data-a="wfpdf">${ic('pdf')} Workflow PDF öffnen</button><button class="knopf hell" data-a="scan">${ic('scan')} PDF scannen</button></div>`;
  else if (t === 'text') eigen = blaetter + (ds.length ? '' : '<p class="leer">Gerade liegt hier kein Text.</p>') + zurAkte + `<div class="reihe"><button class="knopf" data-a="neu-buero" data-titel="Neuer Brief" data-art="DOCX">${ic('plus')} Neuer Brief</button></div>`;
  else if (t === 'tab') eigen = `<div class="mock">${['Monat','Strom','Wasser','Heizung','Januar','62,00','18,40','95,00','Februar','58,50','17,90','91,20','März','55,10','18,10','74,60'].map(z => `<span>${z}</span>`).join('')}</div><div class="reihe"><button class="knopf" data-a="neu-buero" data-titel="Verbrauch 2026" data-art="XLSX">Zur Akte ${ic('pfeil')}</button></div>`;
  else eigen = `<div class="folie"><div><b style="font-size:18px">Unser Umzug</b><br><small>Folie 1 von 3 · Beispiel</small></div></div><div class="reihe"><button class="knopf" data-a="neu-buero" data-titel="Folien Umzug" data-art="PPTX">Zur Akte ${ic('pfeil')}</button></div>`;
  return leiste + `<div class="reihe" style="margin:0 0 10px"><span class="tupfer eckig" style="--a:${x.a};--b:${x.b}">${ic(x.icon)}</span><b>${x.name}</b><small style="color:var(--muted)">${x.tut}</small></div>${eigen}<p class="hinweis">Nur eine Beispielansicht. Hier wird nichts wirklich bearbeitet.</p>`;
}
/* Portemonnaie, echt (0.7.0): Geld rein / Geld raus, im Tresor (`T().geld`). Rechnen mit den Bausteinen aus BookLedgerPro (Klon mit Pin).
   Bon fotografieren: das Foto wird eine Unterlage, der Betrag wird vom Bon gelesen und nur vorgeschlagen. */
const pm = { liste:null, monat:new Date().toISOString().slice(0, 7), bon:null, bonText:'', vorschlag:null, liest:false, gegeben:{},
  fach:(() => { try { return localStorage.getItem('pa_pm_fach') || 'bargeld'; } catch { return 'bargeld'; } })(), konten:null, umsaetze:null, konto:'', lesen:null, kontoNeu:false };
const MONATE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const monatName = m => `${MONATE[+m.slice(5, 7) - 1]} ${m.slice(0, 4)}`;
const monatPlus = (m, n) => { const d = new Date(+m.slice(0, 4), +m.slice(5, 7) - 1 + n, 1); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; };
async function pmLaden(){
  try { [pm.liste, pm.konten, pm.umsaetze] = await Promise.all([T().geld.posten(), T().bank.konten(), T().bank.umsaetze()]); } catch (e) { pm.liste = pm.liste || []; pm.konten = pm.konten || []; pm.umsaetze = pm.umsaetze || []; toast(fehlerText(e)); }
  if (!pm.konten.some(k => k.id === pm.konto)) pm.konto = pm.konten[0]?.id || '';
  stadtNeu();
}
const VERFAHREN_NAME = { hand:'von Hand', csv:'CSV', camt:'CAMT', mt940:'MT940', pdf:'PDF', excel:'Excel' };
const VERFAHREN_ANNEHMEN = { csv:'.csv,text/csv,text/plain', camt:'.xml,application/xml,text/xml', mt940:'.sta,.940,.mt940,.txt', pdf:'.pdf,application/pdf', excel:'.xlsx' };
const ibanKurz = i => i ? '… ' + i.slice(-4) : '';
function pmFachKopf(){
  return `<div class="pm-monat"><button class="rund klein" data-a="pm-monat" data-n="-1" aria-label="Monat davor">‹</button><b>${monatName(pm.monat)}</b><button class="rund klein" data-a="pm-monat" data-n="1" aria-label="Nächster Monat">›</button></div>
   <div class="reiter pm-faecher" role="tablist">${[['bargeld','Bargeld'],['bank','Bank'],['summe','Summe']].map(([f, n]) => `<button class="chip ${pm.fach === f ? 'an' : ''}" role="tab" aria-selected="${pm.fach === f}" data-a="pm-fach" data-f="${f}">${n}</button>`).join('')}</div>`;
}
function portemonnaie(){
  if (!T()) return '<p class="leer">Der Tresor ist in diesem Browser nicht geladen.</p>';
  if (pm.liste === null || pm.konten === null) { pmLaden(); return '<p class="leer">Wird geöffnet …</p>'; }
  const weg = `<div class="karte" style="margin-top:12px"><b>Weg nach außen</b><p style="font-size:13px;color:var(--muted);margin:4px 0 10px">Der Monat geht als Datei an BookLedgerPro.${pm.gegeben[pm.monat] ? ` <span class="marke2 m-ok">${MONATE[+pm.monat.slice(5, 7) - 1]} übergeben</span>` : ''}</p>
    <div class="reihe" style="margin:0"><button class="knopf pm-knopf" style="flex:2" data-a="an-bookledger">${ic('hinaus')} An BookLedgerPro geben</button><button class="knopf pm-knopf" style="flex:1" data-a="pm-tabelle">Als Tabelle</button></div></div>`;
  return pmFachKopf() + (pm.fach === 'bank' ? pmBank() : pm.fach === 'summe' ? pmSumme() : pmBargeld()) + weg;
}
function pmBargeld(){
  const g = T().geld, b = g.bericht(pm.liste, pm.monat), heute = new Date().toISOString().slice(0, 10);
  return `<div class="karte" style="margin:8px 0"><small style="color:var(--muted)">Übrig</small><div class="geld" id="pm-rest">${g.euro(b.endbestand)}</div><small style="color:var(--muted)">im Monat: rein ${g.euro(b.summeEinnahmen)} · raus ${g.euro(b.summeAusgaben)}</small></div>
   <label class="knopf pm-knopf voll" for="pm-bon">${ic('kamera')} ${pm.liest ? 'Bon wird gelesen …' : 'Bon fotografieren'}</label><input type="file" id="pm-bon" accept="image/*,application/pdf" capture="environment" hidden>
   ${pm.bon ? `<p class="lesestand" id="pm-bonzeile">Bon: ${esc(pm.bon.name)}${pm.vorschlag ? ' · erkannt ' + g.euro(pm.vorschlag) : ' · kein Betrag erkannt'} <button type="button" class="knopf hell klein" data-a="pm-bon-weg">Bon weg</button></p>` : ''}
   <form class="felder pm-form" data-form="posten"><div class="reihe" style="margin:0"><input class="feld" name="t" placeholder="Was?" aria-label="Was" style="flex:2 1 110px" value="${pm.bon ? 'Einkauf' : ''}"><input class="feld" name="w" placeholder="Wofür?" aria-label="Wofür" style="flex:2 1 110px"></div>
    <div class="reihe" style="margin:0"><input class="feld" name="b" inputmode="decimal" placeholder="Betrag" aria-label="Betrag" style="flex:1 1 90px" value="${pm.vorschlag ? esc(g.euro(pm.vorschlag).replace(' €', '')) : ''}"><input class="feld" type="date" name="am" value="${pm.monat === heute.slice(0, 7) ? heute : pm.monat + '-01'}" aria-label="Tag" style="flex:1 1 120px">${pm.konten.length ? `<label class="pm-haken"><input type="checkbox" name="vk"> vom Konto</label>` : ''}</div>
    <div class="reihe" style="margin:0"><button class="knopf pm-knopf" name="art" value="aus" style="flex:1">− Ausgabe</button><button class="knopf pm-knopf" name="art" value="ein" style="flex:1">+ Einnahme</button></div></form>
   <div class="liste" id="pm-liste" style="margin-top:12px">${b.zeilen.length ? [...b.zeilen].reverse().map(z => { const p = pm.liste.find(x => x.id === z.id) || {}; return `<div class="zeile"><span class="mitte"><strong>${esc(z.beschreibung)}</strong><small>${tagText(z.datum)}${p.wofuer ? ' · wofür: ' + esc(p.wofuer) : ''}${p.bon ? ' · Bon in der Akte' : ''}${p.vomKonto ? ' · vom Konto' : ''}</small></span><span class="${z.ausgabe ? 'minus' : 'plus'}">${z.ausgabe ? '− ' + g.euro(z.ausgabe) : '+ ' + g.euro(z.einnahme)}</span>${p.bon ? `<button class="rund klein geist" data-a="echt-auf" data-id="${esc(p.bon)}" aria-label="Bon ansehen">${ic('datei')}</button>` : ''}<button class="rund klein geist" data-a="pm-weg" data-id="${esc(z.id)}" aria-label="Posten herausnehmen">${ic('zu')}</button></div>`; }).join('') : '<p class="leer">Noch nichts in diesem Monat.</p>'}</div>`;
}
function pmKontoForm(k){
  const v = k?.verfahren || 'hand';
  return `<form class="felder pm-form karte" data-form="pm-konto" ${k ? `data-id="${esc(k.id)}"` : ''} style="margin:8px 0">
    <div class="reihe" style="margin:0"><input class="feld" name="bank" placeholder="Bank" aria-label="Name der Bank" required maxlength="80" value="${esc(k?.bank || '')}" style="flex:1 1 140px"><input class="feld" name="name" placeholder="Girokonto" aria-label="Name des Kontos" maxlength="80" value="${esc(k?.name || '')}" style="flex:1 1 120px"></div>
    <div class="reihe" style="margin:0"><input class="feld" name="iban" placeholder="IBAN (freiwillig)" aria-label="IBAN, freiwillig" maxlength="42" value="${esc(k?.iban || '')}" autocomplete="off" style="flex:2 1 180px"><input class="feld" name="anfang" inputmode="decimal" placeholder="Anfangssaldo" aria-label="Anfangssaldo" value="${k ? esc(T().geld.euro(k.anfangCent).replace(' €', '')) : ''}" style="flex:1 1 100px"></div>
    <div class="reihe" style="margin:0"><select class="feld" name="verfahren" aria-label="Verfahren" style="flex:1 1 120px">${T().bank.VERFAHREN.map(x => `<option value="${x}" ${x === v ? 'selected' : ''}>${VERFAHREN_NAME[x]}</option>`).join('')}</select>
    <button class="knopf pm-knopf" type="submit" style="flex:1">${k ? 'Speichern' : 'Konto anlegen'}</button>${pm.konten.length ? `<button class="knopf hell" type="button" data-a="pm-konto-zu">Abbrechen</button>` : ''}${k ? `<button class="rund klein geist" type="button" data-a="pm-konto-weg" data-id="${esc(k.id)}" aria-label="Konto herausnehmen" title="Konto herausnehmen">${ic('muell')}</button>` : ''}</div></form>`;
}
function pmLesenAnsicht(k){
  const l = pm.lesen, g = T().geld;
  if (l.art === 'tabelle' && !l.zeilen) {
    const t = l.tabelle, kopf = t.kopf.length ? t.kopf : (t.beispiele[0] || []).map((_, i) => `Spalte ${i + 1}`), z = t.einstellung.zuordnung;
    const r = T().bank.tabelleLesen(t.eingabe, t.einstellung), u = r.gelesen.umsaetze[0];
    const wahl = (feld, name) => `<label class="pm-wahl">${name} <select class="feld" data-pm-feld="${feld}"><option value="-1">—</option>${kopf.map((x, i) => `<option value="${i}" ${z[feld] === i ? 'selected' : ''}>${esc(x || 'Spalte ' + (i + 1))}</option>`).join('')}</select></label>`;
    return `<div class="karte pm-lesen" data-pm-lesen="tabelle" style="margin:8px 0"><b>${esc(l.datei.name)}</b> <span class="marke2 ${t.gemerkt ? 'm-ok' : 'm-arbeit'}">${t.gemerkt ? 'Spalten gemerkt' : 'Spalten prüfen'}</span>
      <div class="reihe pm-wahlen">${wahl('datum', 'Datum')}${wahl('betrag', 'Betrag')}${wahl('soll', 'Soll')}${wahl('haben', 'Haben')}${wahl('sh', 'S/H')}${wahl('text', 'Text')}${wahl('gegen', 'Gegenseite')}${wahl('saldo', 'Saldo')}
      <label class="pm-wahl">Datum als <select class="feld" data-pm-feld="datumsform">${T().bank.DATUMSFORMEN.map(x => `<option ${x === t.einstellung.datumsform ? 'selected' : ''}>${x}</option>`).join('')}</select></label>
      <label class="pm-wahl">Komma <select class="feld" data-pm-feld="dezimal"><option ${t.einstellung.dezimal === ',' ? 'selected' : ''}>,</option><option ${t.einstellung.dezimal === '.' ? 'selected' : ''}>.</option></select></label></div>
      <p class="lesestand">${u ? `${tagText(u.buchung || u.valuta)} · ${u.richtung === 'einnahme' ? '+' : '−'} ${g.euro(u.betragCent)} · ${esc((u.gegen || u.zweck || '').slice(0, 50))} · ${r.gelesen.umsaetze.length} Umsätze` : 'Keine Umsätze erkannt.'}</p>
      ${r.fehler.length ? `<p class="rot">${r.fehler.includes('datum-fehlt') ? 'Spalte für das Datum fehlt.' : ''} ${r.fehler.includes('betrag-fehlt') ? 'Spalte für den Betrag fehlt.' : ''}</p>` : ''}
      <div class="reihe" style="margin:0"><button class="knopf pm-knopf" style="flex:1" data-a="pm-tabelle-weiter" ${r.fehler.length || !u ? 'disabled' : ''}>Weiter</button><button class="knopf hell" data-a="pm-lesen-zu">Abbrechen</button></div></div>`;
  }
  const an = l.zeilen.filter(x => x.an).length, p = l.pruef, diff = p?.warnungen.find(w => w.code === 'saldo-differenz');
  return `<div class="karte pm-lesen" data-pm-lesen="${l.art}" style="margin:8px 0"><b>${esc(l.datei.name)}</b> <span class="marke2 m-grau">${l.art === 'pdf' ? 'PDF' : l.art === 'tabelle' ? 'Tabelle' : esc(l.gelesen.format || '')}</span>
    ${diff ? `<p class="rot" data-pm-saldo="falsch">Saldo geht nicht auf: ${g.euro(Math.abs(diff.differenzCent))} Unterschied.</p>` : p && p.saldoEndeCent != null ? `<p class="lesestand" data-pm-saldo="ok">Saldo stimmt: ${g.euro(p.saldoEndeCent)}</p>` : ''}
    <div class="liste pm-vorschlag">${l.zeilen.map((x, i) => `<label class="zeile ${x.unsicher ? 'pm-unsicher' : ''}"><input type="checkbox" class="haken" data-pm-zeile="${i}" ${x.an ? 'checked' : ''}><span class="mitte">${l.art === 'pdf'
      ? `<input class="feld" data-pm-text="${i}" value="${esc(x.zweck || x.gegen || '')}" aria-label="Text"><small>${tagText(x.buchung || x.valuta)}</small>`
      : `<strong>${esc((x.zweck || x.gegen || '').slice(0, 80))}</strong><small>${tagText(x.buchung || x.valuta)}${x.gegen && x.zweck ? ' · ' + esc(x.gegen.slice(0, 40)) : ''}</small>`}</span>${l.art === 'pdf'
      ? `<input class="feld pm-betrag" data-pm-betrag="${i}" inputmode="decimal" value="${x.richtung === 'einnahme' ? '' : '-'}${esc(g.euro(x.betragCent).replace(' €', ''))}" aria-label="Betrag">`
      : `<span class="${x.richtung === 'einnahme' ? 'plus' : 'minus'}">${x.richtung === 'einnahme' ? '+' : '−'} ${g.euro(x.betragCent)}</span>`}</label>`).join('')}</div>
    <div class="reihe" style="margin:0"><button class="knopf pm-knopf" style="flex:1" data-a="pm-uebernehmen" ${an ? '' : 'disabled'}>Übernehmen (${an})</button><button class="knopf hell" data-a="pm-lesen-zu">Abbrechen</button></div></div>`;
}
function pmBank(){
  const g = T().geld;
  if (!pm.konten.length || pm.kontoNeu === true) return pmKontoForm(null);
  const k = pm.konten.find(x => x.id === pm.konto) || pm.konten[0];
  if (pm.kontoNeu === 'aendern') return pmKontoForm(k);
  const b = T().bank.bericht(k, pm.umsaetze, pm.monat), heute = new Date().toISOString().slice(0, 10);
  const liste = pm.umsaetze.filter(u => u.konto === k.id && u.am.slice(0, 7) === pm.monat).reverse();
  return `<div class="reiter pm-konten">${pm.konten.map(x => `<button class="chip ${x.id === k.id ? 'an' : ''}" data-a="pm-konto" data-id="${esc(x.id)}">${esc(x.bank)} · ${esc(x.name)}</button>`).join('')}<button class="chip" data-a="pm-konto-neu" aria-label="Konto anlegen">${ic('plus')}</button></div>
   <div class="karte" style="margin:8px 0"><small style="color:var(--muted)">${esc(k.bank)} · ${esc(k.name)} ${ibanKurz(k.iban)}</small><div class="geld" id="pm-kontostand">${g.euro(b.endbestand)}</div><small style="color:var(--muted)">im Monat: rein ${g.euro(b.summeEinnahmen)} · raus ${g.euro(b.summeAusgaben)}</small>
    <button class="rund klein geist" style="float:right;margin-top:-28px" data-a="pm-konto-aendern" aria-label="Konto ändern">${ic('stift')}</button></div>
   ${pm.lesen ? pmLesenAnsicht(k) : `<label class="knopf pm-knopf voll" for="pm-auszug">${ic('runter')} Kontoauszug einlesen${k.verfahren !== 'hand' ? ' · ' + VERFAHREN_NAME[k.verfahren] : ''}</label><input type="file" id="pm-auszug" accept="${VERFAHREN_ANNEHMEN[k.verfahren] ? VERFAHREN_ANNEHMEN[k.verfahren] + ',' : ''}.csv,.xml,.sta,.940,.txt,.pdf,.xlsx" hidden>`}
   <form class="felder pm-form" data-form="bank-hand"><div class="reihe" style="margin:0"><input class="feld" name="t" placeholder="Was?" aria-label="Was" style="flex:2 1 140px"><input class="feld" name="b" inputmode="decimal" placeholder="Betrag" aria-label="Betrag" style="flex:1 1 90px"><input class="feld" type="date" name="am" value="${pm.monat === heute.slice(0, 7) ? heute : pm.monat + '-01'}" aria-label="Tag" style="flex:1 1 120px"></div>
    <div class="reihe" style="margin:0"><button class="knopf pm-knopf" name="art" value="aus" style="flex:1">− Ausgabe</button><button class="knopf pm-knopf" name="art" value="ein" style="flex:1">+ Einnahme</button></div></form>
   <div class="liste" id="pm-bankliste" style="margin-top:12px">${liste.length ? liste.map(u => `<div class="zeile"><span class="mitte"><strong>${esc(u.titel)}</strong><small>${tagText(u.am)}${u.gegen ? ' · ' + esc(u.gegen) : ''}${u.zurKasse ? ' · zur Kasse' : ''}${u.auszug ? ' · Auszug in der Akte' : ''}</small></span><span class="${u.cent < 0 ? 'minus' : 'plus'}">${u.cent < 0 ? '− ' + g.euro(-u.cent) : '+ ' + g.euro(u.cent)}</span>${u.cent < 0 ? `<button class="rund klein geist ${u.zurKasse ? 'an' : ''}" data-a="pm-zurkasse" data-id="${esc(u.id)}" data-an="${u.zurKasse ? 0 : 1}" aria-label="${u.zurKasse ? 'Nicht zur Kasse' : 'Barabhebung zur Kasse'}" aria-pressed="${u.zurKasse}">${ic('hinaus')}</button>` : ''}${u.auszug ? `<button class="rund klein geist" data-a="echt-auf" data-id="${esc(u.auszug)}" aria-label="Auszug ansehen">${ic('datei')}</button>` : ''}<button class="rund klein geist" data-a="pm-weg" data-id="${esc(u.id)}" aria-label="Umsatz herausnehmen">${ic('zu')}</button></div>`).join('') : '<p class="leer">Noch nichts in diesem Monat.</p>'}</div>`;
}
/** Monatsabschluss: je Fach Anfang, rein, raus, Ende; Summe ohne Geld, das nur zwischen Bank und Kasse wandert. */
function pmAbschluss(){
  const g = T().geld, zeilen = [], im = p => p.am.slice(0, 7) === pm.monat;
  const bb = g.bericht(pm.liste, pm.monat), wandert = pm.liste.filter(p => im(p) && p.vomKonto).reduce((a, p) => a + Math.abs(p.cent), 0);
  zeilen.push({ name:'Bargeld', anfang:bb.anfangsbestand, rein:bb.summeEinnahmen, raus:bb.summeAusgaben, ende:bb.endbestand, wRein:wandert, wRaus:0 });
  for (const k of pm.konten) { const b = T().bank.bericht(k, pm.umsaetze, pm.monat); const wk = pm.umsaetze.filter(u => u.konto === k.id && im(u) && u.zurKasse).reduce((a, u) => a + Math.abs(u.cent), 0);
    zeilen.push({ name:k.name, anfang:b.anfangsbestand, rein:b.summeEinnahmen, raus:b.summeAusgaben, ende:b.endbestand, wRein:0, wRaus:wk }); }
  const sum = f => zeilen.reduce((a, z) => a + z[f], 0);
  // Barabhebung steht doppelt (Bank raus, Bargeld rein): aus beiden Summen nehmen, was auf BEIDEN Seiten markiert ist (vom Konto / zur Kasse).
  const doppelt = Math.min(sum('wRein'), sum('wRaus'));
  const summe = { name:'Summe', anfang:sum('anfang'), rein:sum('rein') - doppelt, raus:sum('raus') - doppelt, ende:sum('ende') };
  return { zeilen, summe, doppelt };
}
function pmSumme(){
  const g = T().geld, a = pmAbschluss(), z = x => `<tr${x.name === 'Summe' ? ' class="pm-summe"' : ''}><th>${esc(x.name)}</th><td>${g.euro(x.anfang)}</td><td class="plus">${g.euro(x.rein)}</td><td class="minus">${g.euro(x.raus)}</td><td><b>${g.euro(x.ende)}</b></td></tr>`;
  return `<div class="karte" style="margin:8px 0;overflow-x:auto"><table class="pm-tabelle" id="pm-abschluss"><thead><tr><th></th><th>Anfang</th><th>rein</th><th>raus</th><th>Ende</th></tr></thead><tbody>${a.zeilen.map(z).join('')}${z(a.summe)}</tbody></table></div>`;
}
async function pmPosten(f, art){
  const g = T().geld, cent = g.cent(f.b.value);
  if (!(cent > 0)) return toast('Bitte einen Betrag eintragen.');
  try { await g.eintragen({titel:f.t.value.trim() || (art === 'ein' ? 'Einnahme' : 'Ausgabe'), cent, rein:art === 'ein', wofuer:f.w.value.trim(), am:f.am.value || new Date().toISOString().slice(0, 10), bon:pm.bon, bonText:pm.bonText, vomKonto:!!f.vk?.checked});
    const mitBon = !!pm.bon; pm.bon = null; pm.bonText = ''; pm.vorschlag = null; pm.monat = (f.am.value || pm.monat).slice(0, 7); await pmLaden(); if (mitBon) echtLaden();
    toast(`${art === 'ein' ? 'Eingetragen' : 'Abgezogen'}: ${g.euro(cent)}.${mitBon ? ' Der Bon liegt in der Akte.' : ''}`); } catch (e) { toast(fehlerText(e)); }
}
async function pmBankHand(f, art){
  const g = T().geld, cent = g.cent(f.b.value);
  if (!(cent > 0)) return toast('Bitte einen Betrag eintragen.');
  try { await T().bank.eintragen(pm.konto, { titel:f.t.value.trim() || (art === 'ein' ? 'Gutschrift' : 'Lastschrift'), cent, rein:art === 'ein', am:f.am.value || new Date().toISOString().slice(0, 10) });
    pm.monat = (f.am.value || pm.monat).slice(0, 7); await pmLaden(); toast(`${art === 'ein' ? 'Eingetragen' : 'Abgezogen'}: ${g.euro(cent)}.`); } catch (e) { toast(fehlerText(e)); }
}
async function pmKontoSpeichern(f){
  const g = T().geld, anfang = f.anfang.value.trim() ? g.cent(f.anfang.value.replace(/^\+/, '')) : 0;
  if (!Number.isInteger(anfang)) return toast('Anfangssaldo bitte als Betrag, z. B. 1.250,00 oder -80,00.');
  const e = { bank:f.bank.value, name:f.name.value, iban:f.iban.value, anfangCent:anfang, verfahren:f.verfahren.value };
  try { if (f.dataset.id) await T().bank.kontoAendern(f.dataset.id, e); else pm.konto = await T().bank.kontoAnlegen(e);
    pm.kontoNeu = false; await pmLaden(); toast(f.dataset.id ? 'Konto gespeichert.' : 'Konto angelegt.'); } catch (err) { toast(fehlerText(err)); }
}
async function pmAuszugWahl(datei){
  const k = pm.konten.find(x => x.id === pm.konto); if (!k || !datei) return;
  try { const r = await T().bank.lesen(datei, k);
    if (r.art === 'leer') { pm.lesen = null; stadtNeu(); return toast('In dieser Datei wurden keine Umsätze erkannt.'); }
    pm.lesen = { datei, ...r, zeilen: r.gelesen ? r.gelesen.umsaetze.map(u => ({ ...u, an:true })) : null }; stadtNeu();
  } catch (e) { toast(fehlerText(e)); }
}
async function pmUebernehmen(){
  const k = pm.konten.find(x => x.id === pm.konto), l = pm.lesen; if (!k || !l) return;
  const g = T().geld, zeilen = [];
  for (const [i, x] of l.zeilen.entries()) {
    if (!x.an) continue;
    if (l.art === 'pdf') { const tx = document.querySelector(`[data-pm-text="${i}"]`), bx = document.querySelector(`[data-pm-betrag="${i}"]`);
      const c = bx ? g.cent(bx.value.replace(/^[-−]/, '')) : x.betragCent, neg = bx ? /^\s*[-−]/.test(bx.value) : x.richtung === 'ausgabe';
      if (!(c > 0)) return toast(`Zeile ${i + 1}: bitte einen Betrag eintragen.`);
      zeilen.push({ ...x, zweck:tx ? tx.value.trim() : x.zweck, betragCent:c, richtung:neg ? 'ausgabe' : 'einnahme' }); }
    else zeilen.push(x);
  }
  try { const r = await T().bank.uebernehmen(k, l.datei, zeilen, { einstellung: l.art === 'tabelle' ? l.tabelle.einstellung : undefined, saldoEndeCent: l.pruef?.saldoEndeCent ?? null });
    pm.lesen = null; await pmLaden(); if (r.auszug) echtLaden();
    toast(`${r.neu} ${r.neu === 1 ? 'Umsatz' : 'Umsätze'} übernommen${r.schon ? `, ${r.schon} waren schon da` : ''}.`); } catch (e) { toast(fehlerText(e)); }
}
document.addEventListener('change', ev => { const t = ev.target;
  if (t.id === 'pm-auszug' && t.files[0]) pmAuszugWahl(t.files[0]);
  if (t.dataset.pmFeld && pm.lesen?.tabelle) { const e = pm.lesen.tabelle.einstellung; if (['datumsform', 'dezimal'].includes(t.dataset.pmFeld)) e[t.dataset.pmFeld] = t.value; else e.zuordnung[t.dataset.pmFeld] = +t.value; stadtNeu(); }
  if (t.dataset.pmZeile && pm.lesen?.zeilen) { pm.lesen.zeilen[+t.dataset.pmZeile].an = t.checked; const k = document.querySelector('[data-a="pm-uebernehmen"]'); if (k) { const n = pm.lesen.zeilen.filter(x => x.an).length; k.textContent = `Übernehmen (${n})`; k.disabled = !n; } }
});
document.addEventListener('change', async ev => { if (ev.target.id !== 'pm-bon' || !ev.target.files[0]) return; pm.bon = ev.target.files[0]; pm.vorschlag = null; pm.bonText = ''; pm.liest = true; stadtNeu();
  try { const r = await T().geld.bonLesen(pm.bon); pm.bonText = r.text || ''; pm.vorschlag = r.cent; } catch { /* dann ohne Vorschlag */ } pm.liest = false; stadtNeu(); });
function sortierer(){
  return `<p class="unter">Du gibst Dateien oder ganze Ordner hinein. Die Zuordnung passiert hier: ein Helfer rät, du berichtigst, er lernt daraus. In die Akte kommt nur das Ergebnis.</p>
   <div class="schritte"><span>raten</span><span>berichtigen</span><span>lernen</span></div>
   <div class="liste" style="margin-top:10px">${organizer.length ? organizer.map((o,i) => `<div class="zeile" style="flex-wrap:wrap"><span class="art ${o.art}">${o.art}</span><span class="mitte"><strong>${esc(o.titel)}</strong><small>→ ${bereich(o.vorschlag).name} / ${esc(o.vorgang)}</small></span>${o.sicher?'<span class="marke2 m-ok">bestätigt</span>':`<span class="unten">${bereichWahl(o.vorschlag, `data-osort="${i}"`, false)}<button class="knopf gruen klein" data-a="osort" data-i="${i}">Stimmt</button></span>`}</div>`).join('') : '<p class="leer">Alles ist in der Akte.</p>'}</div>
   <div class="reihe"><button class="knopf gruen" style="flex:1" data-a="sort-zur-akte" ${organizer.length?'':'disabled'}>Zur Akte ${ic('pfeil')}</button><button class="knopf hell" data-a="sort-mehr">${ic('ordner')} Dateien hineingeben</button></div>`;
}
function post(){
  return `<p class="unter">Holt E-Mails mit Anlagen. Der Helfer schlägt vor, wohin die Anlage gehört. Du schickst sie zur Akte – oder gibst sie verdeckt an eine KI.</p>
   <div class="liste" style="margin-top:10px">${mails.length ? mails.map((m,i) => `<div class="zeile" style="flex-wrap:wrap"><span class="art PDF">PDF</span><span class="mitte"><strong>${esc(m.betreff)}</strong><small>von ${esc(m.von)} · Anlage: ${esc(m.anlage)}</small></span>
     <span class="unten">${bereichWahl(m.vorschlag, `data-mail="${i}"`)}<button class="knopf gruen klein" data-a="mail-zur-akte" data-i="${i}">Zur Akte</button><button class="knopf hell klein" data-a="mail-ki" data-i="${i}">${ic('maske')} An KI</button></span></div>`).join('') : '<p class="leer">Alle Anlagen sind in der Akte.</p>'}</div>
   <p class="hinweis">Beispiel. Es ist kein Postfach angeschlossen.</p>`;
}

/* ---------- Menüs: Mehr, Farbpalette, Drucken ---------- */
function menue(html, klasse=''){ $('menueort').innerHTML = `<div class="menue ${klasse}" data-a="menue-aussen"><div role="menu">${html}</div></div>`; }
function fMehr(){
  menue(MEHR.map(([a,i,t]) => `<button role="menuitem" data-a="${a}" data-ort="akte">${a==='farbe'?'<span class="fleck farbknopf" style="display:grid;place-items:center"></span>':`<span class="tupfer" style="--a:#1aa59d;--b:#0b5a66">${i?ic(i):'?'}</span>`}${t}</button>`).join('')
);
}
function fFarbe(wo){
  const aktuell = farbwahl[wo] || 'auto', name = wo === 'akte' ? 'die Akte' : stadt(wo).name;
  menue(`<h3>Farbe für ${esc(name)}</h3>` + WAHL.map(([id,t]) => { const f = FARBEN[id === 'auto' ? KACHEL[wo] : id]; return `<button role="menuitemradio" aria-checked="${aktuell===id}" data-a="farbe-wahl" data-ort="${wo}" data-farbe="${id}"><span class="fleck" style="background:linear-gradient(135deg,${f.k[0]},${f.k[2]})"></span>${t}</button>`; }).join('')
   + `<h3>Jedes Programm merkt sich seine eigene Farbe.</h3>`);
}
function fDrucken(){
  fenster(`${fk('Drucken')}<div class="liste"><button class="zeile" data-a="druck-seite"><span class="art">${ic('drucker')}</span><span class="mitte"><strong>Diese Seite</strong><small>so, wie sie gerade zu sehen ist</small></span>${ic('weiter')}</button></div>
   <div class="abschnitt"><h2>Einzelne Unterlage</h2><div class="liste">${[...docs].sort((a,b) => b.id - a.id).map(d => `<button class="zeile" data-a="druck-doc" data-id="${d.id}"><span class="art ${d.art}">${d.art}</span><span class="mitte"><strong>${esc(d.titel)}</strong><small>${esc(ort(d))}</small></span>${ic('drucker')}</button>`).join('')}</div></div>`);
}
function drucken(d){
  document.body.classList.toggle('druck-einzel', !!d);
  $('druck').innerHTML = d ? `<h1>${esc(d.titel)}</h1><p>${esc(d.text)}</p><dl><dt>Ablage</dt><dd>${esc(ort(d))}</dd><dt>Abgelegt</dt><dd>${d.datum}</dd><dt>Fassung</dt><dd>${d.fassung}</dd><dt>Herkunft</dt><dd>${esc(d.herkunft)}</dd></dl><p><small>${NAME} ${FASSUNG} · Beispielunterlage, erfunden</small></p>` : '';
  zu(); menueZu(); setTimeout(() => window.print(), 50);
}
addEventListener('afterprint', () => document.body.classList.remove('druck-einzel'));
function neuInEingang(titel, art, vorschlag, vorgang, quelle){
  eingang.neu.unshift({id:++nr,titel,art,vorschlag,vorgang,quelle,text:'Neu hereingekommen (Beispiel).'});
  zu(); s.ansicht = 'eingang'; zeigen(); toast('Liegt im Eingang. Der Vorschlag wartet auf dein „Stimmt“.');
}
function zurAkteFilm(n){ s.reisen = n; zu(); s.ansicht = 'baum'; s.frage = ''; zeigen(); scrollTo(0,0); }

/* ---------- Aktionen ---------- */
const A = {
 geh: e => { s.ansicht = e.dataset.zu; s.bereich = null; s.frage = ''; s.wahl.clear(); zu(); menueZu(); zeigen(); scrollTo(0,0); },
 bereich: e => { s.ansicht = 'akten'; s.bereich = e.dataset.id || null; zeigen(); scrollTo(0,0); },
 frage: e => { s.frage = e.dataset.q; s.ansicht = 'start'; s.wahl.clear(); zeigen(); },
 doc: e => fDoc(e.dataset.id),
 zu, 'zu-aussen': (e, ev) => { if (ev.target === e) zu(); }, 'menue-aussen': (e, ev) => { if (ev.target === e) menueZu(); },
 mehr: fMehr,
 wo: (e, ev) => { ev.preventDefault(); document.getElementById('wo-liegt-was').scrollIntoView({behavior:'smooth'}); },
 farbe: e => fFarbe(e.dataset.ort || 'akte'),
 'farbe-wahl': e => { const wo = e.dataset.ort; farbwahl[wo] = e.dataset.farbe; menueZu(); if (wo === 'akte') farbeAkte(); else fStadt(wo); },
 drucken: () => { menueZu(); fDrucken(); },
 'druck-seite': () => drucken(null),
 'druck-doc': e => drucken(docs.find(d => d.id == e.dataset.id)),
 hilfe: () => { menueZu(); fenster(`${fk('So funktioniert die Private Akte')}<ul style="padding-left:18px;margin:0;display:grid;gap:8px">
   <li><b>Hereinbringen:</b> die Leiste oben – Bon fotografieren, PDF scannen, Dateien hineingeben, Notiz, Kalender.</li>
   <li><b>Importieren</b> (grüner Pfeil nach unten): eine Datei in die Akte legen oder ein Backup einlesen.</li>
   <li><b>Exportieren</b> (roter Pfeil nach oben): ein Backup erstellen – die ganze Akte als verschlüsselter Ordner.</li>
   <li><b>Finden:</b> die Suche oder die sechs Bereiche.</li>
   <li><b>Bearbeiten mit:</b> an jeder Unterlage, jedem Foto, jeder Notiz. Du wählst das Tool; bearbeitet wird eine Kopie.</li>
   <li><b>Zur Akte:</b> das Ergebnis liegt als neue Fassung am alten Platz. Das Original bleibt.</li>
   <li><b>Der Baum:</b> die Landkarte der App – in der Mitte die Akte, an den Ästen die Tools. Darunter „Wo liegt was?“: ein Tresor für alles.</li>
   <li><b>Farbpalette:</b> der bunte runde Knopf. Jedes Programm merkt sich seine eigene Farbe.</li></ul>
   <div class="logos"><figure><img src="./bilder/logo-basic-rund.png" alt="Zeichen der Basic-Fassung auf Weiß">Basic<br>diese Web-App</figure><figure><img src="./bilder/logo-pro-rund.png" alt="Zeichen der Pro-Fassung mit buntem Rand">Pro<br>bunter Rand</figure></div>
   <label class="schalter"><input type="checkbox" data-tippwahl ${s.tipps?'checked':''}> Tooltips an den Knöpfen anzeigen</label>
   <p style="font-size:13.5px"><a href="./rechtliches.html">Impressum, Datenschutz, Haftungsausschluss, Lizenz &amp; Copyright</a></p>
   <p class="hinweis">Vorschau ${FASSUNG}. Alles ist ein Beispiel, nichts wird gespeichert.</p>`); },
 sicherung: () => { menueZu(); fSicherung(); },
 viele: () => { menueZu(); fRahmen('organizer'); },
 wfpdf: () => { menueZu(); fRahmen('wfpdf'); },
 'rahmen-zu': () => rahmenZu(),
 'sort-mehr': () => fRahmen('organizer'),
 notiz: () => { menueZu(); fRahmen('kalender', 'notiz=1'); },
 glocke: () => { if (document.querySelector('.glockenfeld')) return menueZu(); glockenFeld(); },
 'glocke-auf': e => { glocke.auf = glocke.auf === e.dataset.id ? null : e.dataset.id; glockenFeld(); },
 'glocke-erledigt': async e => { try { await T().kalender.erledigen(e.dataset.id); await termineLaden(); const g = $('glocke'); if (g) g.contentWindow.location.reload(); const k = $('rahmen'); if (k && rahmen.was === 'kalender') k.contentWindow.location.reload(); glockenFeld(); if (s.ansicht === 'start' && !$('rahmenort').innerHTML) mainZeigen(); glockenFeld(); } catch (err) { toast(fehlerText(err)); } },
 'kal-tag': e => { menueZu(); fRahmen('kalender', `tag=${encodeURIComponent(e.dataset.tag)}&id=${encodeURIComponent(e.dataset.id)}`); },
 kalender: () => { menueZu(); fRahmen('kalender'); },
 /* Familienbüro (0.7.0, Klaus 18.11.: „nur aufrufen“): eigene App (AGPL-3.0 wegen ONLYOFFICE), öffnet sich unter ihrer Adresse daneben. */
 'buero-auf': () => { const w = window.open(FAMILIENBUERO, 'familienbuero'); if (!w) location.href = FAMILIENBUERO; },
 stadt: e => { if (e.dataset.id === 'buero') return A['buero-auf'](); if (e.dataset.id === 'sort') return fRahmen('organizer'); if (e.dataset.id === 'pdf') return fRahmen('wfpdf'); if (e.dataset.id === 'kal') return fRahmen('kalender'); if (e.dataset.id === 'mail') return fRahmen('brain'); fStadt(e.dataset.id, [], e.dataset.teil || undefined); },
 teil: e => { s.teil = e.dataset.teil; if (s.teil !== 'pdf') s.scan = false; stadtNeu(); },
 mit: fMit,
 'mit-wahl': e => {
   const neu = !!e.dataset.neu, d = neu ? ablegenAusEingang(e.dataset.neu) : docs.find(x => x.id == e.dataset.doc), womit = e.dataset.womit;
   if (neu) { zeigen(); }
   if (womit === 'text' || womit === 'pdf') fStadt('buero', [d.id], womit);
   else if (womit === 'geld') { geld.vor = d.titel; fStadt('geld'); geld.vor = ''; }
   else if (womit === 'sort') { organizer.unshift({titel:d.titel,art:d.art,vorschlag:d.bereich,vorgang:d.vorgang,sicher:false,doc:d.id}); fStadt('sort'); }
   else fPseudo(d);
   toast(neu ? `In der Akte angekommen: ${ort(d)}. Bearbeitet wird eine Kopie.` : 'Das Original bleibt in der Akte. Bearbeitet wird eine Kopie.');
 },
 'pseudo-sicht': e => fPseudo(s.pseudo, !!e.dataset.original),
 'pseudo-kopie': async () => { const t = '⟦PSEUDONYMISIERT v1⟧\n' + maske(s.pseudo.text).text; try { await navigator.clipboard.writeText(t); toast('Die verdeckte Fassung liegt in der Zwischenablage.'); } catch { toast('Kopieren ist hier nicht erlaubt. Die Fassung steht oben zum Markieren.'); } },
 'pseudo-zurueck': () => toast('Die Antwort der KI bekäme hier ihre echten Namen und Nummern zurück (Beispiel).'),
 'mail-ki': e => { const m = mails[+e.dataset.i]; fPseudo({id:0,titel:m.betreff,text:`E-Mail von ${m.von}. Betreff: ${m.betreff}. Anlage: ${m.anlage}. Kundennummer K123456789.`}); },
 bestaetigen: e => { const d = ablegenAusEingang(e.dataset.id); zeigen(); toast(`Abgelegt in ${ort(d)}.`); },
 mappe: () => fStadt('buero', [...s.wahl], 'pdf'),
 zurueck: e => { const ids = e.dataset.docs.split(',').map(Number);
   ids.forEach(i => { const d = docs.find(x => x.id === i), wo = inArbeit(d); d.bei = null; d.teil = null; d.fassung++; eingang.zurueck.unshift({doc:d.id,titel:d.titel,text:`Fassung ${d.fassung} aus ${wo} · liegt in ${ort(d)}`}); });
   s.wahl.clear(); zurAkteFilm(ids.length);
   toast(ids.length === 1 ? `Liegt als Fassung ${docs.find(x => x.id === ids[0]).fassung} am alten Platz. Ohne Rückfrage.` : `${ids.length} Unterlagen liegen als neue Fassung an ihrem Platz.`); },
 'sort-zur-akte': () => { const offen = organizer.filter(o => !o.sicher); if (offen.length) return toast(`Noch ${offen.length} unsicher. Bitte erst „Stimmt“ oder berichtigen.`);
   const n = organizer.length; organizer.forEach(o => { const alt = o.doc && docs.find(d => d.id === o.doc); if (alt) { alt.bereich = o.vorschlag; alt.vorgang = o.vorgang; } else neuesDoc({titel:o.titel,art:o.art,bereich:o.vorschlag,vorgang:o.vorgang,herkunft:'Datei-Organizer',text:o.titel}); });
   organizer = []; zurAkteFilm(n); toast(`${n} Dateien sind in der Akte, jede an ihrem Platz.`); },
 'mail-zur-akte': e => { const m = mails.splice(+e.dataset.i,1)[0]; neuesDoc({titel:m.anlage.replace('.pdf',''),art:'PDF',bereich:m.vorschlag,vorgang:m.vorgang,herkunft:'Private Brain',text:`Anlage aus der E-Mail „${m.betreff}“ von ${m.von}.`}); stadtNeu(); toast(`Liegt in ${bereich(m.vorschlag).name} / ${m.vorgang}.`); },
 osort: e => { organizer[+e.dataset.i].sicher = true; stadtNeu(); toast('Gemerkt. Der Helfer lernt aus deiner Berichtigung.'); },
 'pm-monat': e => { pm.monat = monatPlus(pm.monat, +e.dataset.n); stadtNeu(); },
 'pm-bon-weg': () => { pm.bon = null; pm.vorschlag = null; pm.bonText = ''; stadtNeu(); },
 'pm-weg': async e => { try { await T().geld.entfernen(e.dataset.id); await pmLaden(); toast(pm.fach === 'bank' ? 'Umsatz herausgenommen.' : 'Posten herausgenommen.'); } catch (err) { toast(fehlerText(err)); } },
 'pm-fach': e => { pm.fach = e.dataset.f; try { localStorage.setItem('pa_pm_fach', pm.fach); } catch { /* nur gemerkt, wenn möglich */ } stadtNeu(); },
 'pm-konto': e => { pm.konto = e.dataset.id; pm.lesen = null; stadtNeu(); },
 'pm-konto-neu': () => { pm.kontoNeu = true; pm.lesen = null; stadtNeu(); },
 'pm-konto-aendern': () => { pm.kontoNeu = 'aendern'; stadtNeu(); },
 'pm-konto-zu': () => { pm.kontoNeu = false; stadtNeu(); },
 'pm-konto-weg': async e => { const k = pm.konten.find(x => x.id === e.dataset.id); if (!k || !confirm(`„${k.bank} · ${k.name}“ herausnehmen? Umsätze und Kontoauszüge bleiben in der Akte.`)) return;
   try { await T().bank.kontoEntfernen(k.id); pm.konto = null; pm.kontoNeu = false; pm.lesen = null; await pmLaden(); toast('Konto herausgenommen.'); } catch (err) { toast(fehlerText(err)); } },
 'pm-lesen-zu': () => { pm.lesen = null; stadtNeu(); },
 'pm-tabelle-weiter': () => { const l = pm.lesen, r = T().bank.tabelleLesen(l.tabelle.eingabe, l.tabelle.einstellung); l.gelesen = r.gelesen; l.pruef = r.pruef; l.zeilen = r.gelesen.umsaetze.map(u => ({ ...u, an:true })); stadtNeu(); },
 'pm-uebernehmen': () => pmUebernehmen(),
 'pm-zurkasse': async e => { try { await T().bank.zurKasse(e.dataset.id, e.dataset.an === '1'); await pmLaden(); } catch (err) { toast(fehlerText(err)); } },
 'pm-tabelle': () => {
   const zeilen = T().geld.csv(pm.liste || [], pm.monat); geben(new Blob(['\ufeff' + zeilen], {type:'text/csv'}), `portemonnaie-${pm.monat}.csv`).catch(err => toast(fehlerText(err))); },
 'bon-start': () => { menueZu(); fStadt('geld'); },
 'an-bookledger': () => {
   const b = T().bank, datei = b.monatsdatei(pm.monat, pm.liste || [], pm.konten || [], pm.umsaetze || []);
   geben(new Blob([JSON.stringify(datei, null, 1)], {type:'application/json'}), b.monatsdateiName(pm.monat)).catch(err => toast(fehlerText(err)));
   pm.gegeben[pm.monat] = true; stadtNeu(); toast(`${monatName(pm.monat)} liegt als Datei für BookLedgerPro bereit.`); },
 'hinaus-info': () => { fStadt('geld'); toast('Der Weg nach außen: „An BookLedgerPro geben“ unten im Portemonnaie.'); },
 scan: () => { menueZu(); fRahmen('wfpdf', 'scan=1&von=PrivateAkte'); },
 'scan-zur-akte': () => { s.scan = false; neuInEingang('Scan vom '+datum(HEUTE),'PDF','ich','Sonstiges','Workflow PDF'); },
 'neu-buero': e => neuInEingang(e.dataset.titel, e.dataset.art, 'ich', 'Sonstiges', 'Familienbüro'),
 kopie: () => toast('Eine Kopie liegt in deinen Downloads (Beispiel). Das Original bleibt in der Akte.'),
 teilen: () => toast('Hier öffnet sich das Teilen-Fenster des Geräts (Beispiel).')
};
document.addEventListener('click', ev => { const e = ev.target.closest('[data-a]'); if (e && A[e.dataset.a]) A[e.dataset.a](e, ev); });
document.addEventListener('keydown', ev => { if (ev.key === 'Escape') { if ($('menueort').innerHTML) menueZu(); else zu(); } });
document.addEventListener('change', ev => {
  const t = ev.target;
  if (t.dataset.wahl) { const i = +t.dataset.wahl; t.checked ? s.wahl.add(i) : s.wahl.delete(i); zeigen(); }
  if (t.dataset.mail) mails[+t.dataset.mail].vorschlag = t.value;
  if (t.dataset.osort) organizer[+t.dataset.osort].vorschlag = t.value;
  if (t.dataset.vorschlag) eingang.neu.find(x => x.id == t.dataset.vorschlag).vorschlag = t.value;
});
document.addEventListener('submit', ev => {
  ev.preventDefault(); const f = ev.target, art = ev.submitter?.value;
  if (f.dataset.form === 'suche') { if (sprech.sitzung) sprech.sitzung.stop(); sprech.an = false; s.frage = f.q.value.trim(); s.wahl.clear(); bed.frage = true; bed.fehler = ''; zeigen(); bedSuchen(); }
  if (f.dataset.form === 'posten') { pmPosten(f, art); }
  if (f.dataset.form === 'bank-hand') { pmBankHand(f, art); }
  if (f.dataset.form === 'pm-konto') { pmKontoSpeichern(f); }

});

/* ---------- Deine Unterlagen: echt, im Tresor der Familienakte (tresor.js = Brücke zum Klon) ---------- */
const T = () => window.PrivateAkteTresor;
const echt = { liste:null, fehler:'', datei:null, laeuft:false, termine:[], notizen:0, knoten:null, zeig:30 };
const echtTitel = d => d.titel || d.originalName;
const echtArt = d => { const e = (d.originalName.split('.').pop() || '').toUpperCase().slice(0,4); return e === 'JPEG' ? 'JPG' : e || 'DAT'; };
const echtGroesse = n => n < 1024 ? n + ' B' : n < 1048576 ? Math.round(n/1024) + ' KB' : (n/1048576).toFixed(1).replace('.',',') + ' MB';
const echtDatum = iso => iso ? datum(new Date(iso.length === 10 ? iso + 'T12:00:00' : iso)) : '';
const fehlerText = e => (e && e.message) || 'Das hat nicht geklappt.';
/* Bereiche wie in der Familienakte: die festen, dazu eigene. Ein eigener Bereich ist ein frei eingetragener Name und entsteht mit der
   ersten Unterlage, die ihn trägt. Gleicher Name in anderer Schreibweise = der vorhandene Bereich, kein zweiter. */
const echtBereiche = () => [...new Set([...T().bereiche, ...(echt.liste || []).map(d => d.category)])];
const bereichKern = b => b.toLowerCase().replace(/&/g, ' und ').replace(/\s+/g, ' ').trim();
function echtBereich(eingabe){ const b = eingabe.replace(/\s+/g, ' ').trim().slice(0, 60), k = bereichKern(b); return echtBereiche().find(x => bereichKern(x) === k) || b; }
async function termineLaden(){ try { const k = await T().kalender.termine(); echt.termine = k.termine; echt.notizen = k.notizen; } catch { echt.termine = echt.termine || []; } glockeNeu(); }
/* Laufen zwei Ladevorgänge zugleich (Rahmen zu, Speichern), gilt nur der jüngste – sonst zeigt ein älterer einen überholten Stand. */
let echtLauf = 0;
async function echtLaden(){
  const lauf = ++echtLauf; let liste = [], fehler = '', ak = echt.ak;
  if (!T()) fehler = 'Der Tresor ist in diesem Browser nicht geladen.';
  else { try { liste = await T().liste(); } catch (e) { fehler = fehlerText(e); } try { ak = await T().akten.lesen(); } catch { /* bleibt */ } }
  if (lauf !== echtLauf) return;
  echt.liste = liste; echt.fehler = fehler; echt.ak = ak;
  vor.heu.clear();
  await termineLaden();
  navZeigen(); if (s.ansicht !== 'baum' && !sprech.an) mainZeigen();
}
/* Fundstelle am Treffer (Klaus 17.11.): der Satz, in dem es gefunden wurde, mit der Seite. */
const fundstelle = h => h && h.stelle ? `<small class="stelle">${h.seite ? 'Seite ' + h.seite + ' · ' : ''}${esc(h.stelle)}</small>` : '';
const echtZeile = (d, marke = 'echt', h = null) => `<button class="zeile" data-a="${h && h.seite ? 'leser' : 'echt-auf'}" data-id="${esc(d.id)}" ${h && h.seite ? `data-seite="${h.seite}"` : ''}><span class="art ${echtArt(d)}">${esc(echtArt(d))}</span><span class="mitte"><strong>${esc(echtTitel(d))}</strong><small>${esc(d.category)}${d.documentDate ? ' · ' + echtDatum(d.documentDate) : ''}${echtSort() === 'groesse' ? ' · ' + echtGroesse(d.sizeBytes) : ''} · <span class="epfad" data-tipp="Pfad" data-tipp2="${esc(echtPfad(d))}" data-immer="1">${esc(kurzPfad(echtPfad(d)))}</span></small>${fundstelle(h)}</span><span class="marke2 ${marke === 'echt' ? 'm-ok' : 'm-arbeit'}">${marke}</span>${ic('weiter')}</button>`;
/* Zeilen wie „Finden“ im Datei-Organizer (0.7.6, Klaus 18.11., Bilder vom Tablet): an jeder Unterlage Auge, Stift, Papierkorb. Auge (oder
   Tipp auf die Zeile) klappt den Steckbrief direkt unter der Zeile auf, ein zweiter Tipp schließt ihn; der Stift klappt darunter das
   Einordnen auf (Bereich samt neuer Kategorie, Person, Akten, Absender). Kein eigenes Fenster mehr; in den Suchtreffern bleibt das Fenster. */
const echtArchiv = d => notizAngabe(d, 'Archivnummer');
const echtReihe = d => { const id = esc(d.id), sb = echt.sb === d.id, st = echt.stift === d.id, nr = echtArchiv(d);
  return `<div class="ereihe${sb || st ? ' offen' : ''}" data-reihe="${id}"><div class="ezeilemit"><button class="zeile ezeile" data-a="echt-auf" data-id="${id}" aria-expanded="${sb}"><span class="art ${echtArt(d)}">${esc(echtArt(d))}</span><span class="mitte"><strong>${esc(echtTitel(d))}</strong><small>${esc(d.category)}${d.documentDate ? ' · ' + echtDatum(d.documentDate) : ''}${echtSort() === 'groesse' ? ' · ' + echtGroesse(d.sizeBytes) : ''} · <span class="epfad" data-tipp="Pfad" data-tipp2="${esc(echtPfad(d))}" data-immer="1">${esc(kurzPfad(echtPfad(d)))}</span></small></span>${nr ? `<span class="marke2 m-ok enr">${esc(nr)}</span>` : ''}</button>
   <button class="rund klein geist" data-a="echt-auge" data-id="${id}" aria-pressed="${sb}" aria-label="Ansehen" data-tipp="Ansehen">${ic('auge')}</button><button class="rund klein geist" data-a="echt-stift" data-id="${id}" aria-pressed="${st}" aria-label="Einordnen" data-tipp="Einordnen">${ic('stift')}</button><button class="rund klein geist" data-a="echt-muell" data-id="${id}" aria-label="Aus der Akte nehmen" data-tipp="Aus der Akte nehmen">${ic('muell')}</button></div>
   ${st ? echtStift(d) : ''}${sb ? echtSteckbrief(d) : ''}</div>`; };
function echtKurzsatz(d){ const art = notizAngabe(d, 'Art'), abs = echtAbsender(d), p = echtPersonen(d), betrag = notizAngabe(d, 'Betrag'), frist = notizAngabe(d, 'Frist');
  const t = [art || 'Unterlage', abs && 'von ' + abs, d.documentDate && 'vom ' + echtDatum(d.documentDate), p.length && 'für ' + p.join(', '), betrag && 'über ' + betrag, frist && 'Frist ' + frist].filter(Boolean);
  return t.length > 1 ? t.join(', ') + '.' : ''; }
const fristVorbei = f => { const m = String(f).match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/); return m ? new Date(+m[3], +m[2] - 1, +m[1], 23, 59) < new Date() : false; };
function echtSteckbrief(d){
  const id = esc(d.id), nr = echtArchiv(d), art = notizAngabe(d, 'Art'), frist = notizAngabe(d, 'Frist'), betrag = notizAngabe(d, 'Betrag'), satz = echtKurzsatz(d);
  const pdf = /\.pdf$/i.test(d.originalName), bild = /\.(png|jpe?g|webp)$/i.test(d.originalName), akten = echtBezug(d).akten.map(a => (akteVon(a) || {}).titel).filter(Boolean);
  const z = (dt, dd) => dd ? `<dt>${dt}</dt><dd>${dd}</dd>` : '';
  return `<section class="esteckbrief" data-steckbrief="${id}"><h4>${esc(echtTitel(d))}${nr ? `<span class="marke2 m-ok enr">${esc(nr)}</span>` : ''}</h4>${satz ? `<p class="ekurz">${esc(satz)}</p>` : ''}
   <dl class="angaben">${z('Liegt in', esc(echtPfad(d)))}${z('Datei', esc(echtArt(d)) + ' · ' + echtGroesse(d.sizeBytes))}${z('Art', esc(art))}${z('Bereich', esc(d.category))}${z('Absender', esc(echtAbsender(d)))}${z('Betrifft', esc(echtPersonen(d).join(', ') || 'alle'))}${z('Akten', esc(akten.join(', ')))}${z('Datum', d.documentDate ? echtDatum(d.documentDate) : '')}${z('Frist', frist ? esc(frist) + (fristVorbei(frist) ? ' · <span class="rot">Frist überschritten</span>' : '') : '')}${z('Betrag', esc(betrag))}${z('Abgelegt', echtDatum(d.addedAt))}${z('Gespeichert', 'in der Akte auf diesem Gerät')}</dl>
   <div class="reihe esbknoepfe">${pdf || bild ? `<button class="rund klein" data-a="echt-vorschau" data-id="${id}" aria-pressed="${echt.vor === d.id}" aria-label="Vorschau" data-tipp="Vorschau">${ic('auge')}</button>` : ''}<button class="knopf hell" data-a="echt-teilen" data-id="${id}">${ic('teilen')} Teilen</button><button class="rund klein" data-a="echt-stift" data-id="${id}" aria-label="Einordnen" data-tipp="Einordnen">${ic('stift')}</button><button class="knopf hell" data-a="echt-termin" data-id="${id}">${ic('kalender')} Termin dazu</button>
    ${pdf ? `<button class="knopf hell" data-a="leser" data-id="${id}">Lesen und darin suchen</button>` : ''}<button class="knopf hell" data-a="echt-oeffnen" data-id="${id}">${pdf ? 'Im Browser öffnen' : 'Öffnen'}</button>${pdf || bild ? `<button class="knopf hell" data-a="echt-wfpdf" data-id="${id}">${ic('pdf')} Mit Workflow PDF bearbeiten</button>` : ''}<button class="rund klein" data-a="echt-raus" data-id="${id}" aria-label="Aus der Akte nehmen" data-tipp="Aus der Akte nehmen">${ic('muell')}</button></div>
   ${echt.vor === d.id ? `<div class="evorschau-rahmen"><button class="rund klein evoll" data-a="echt-vollbild" data-id="${id}" aria-label="Vollbild" data-tipp="Vollbild">${ic('vollbild')}</button><div class="evorschau" id="evorschau"><p class="leer">Vorschau wird geladen …</p></div></div>` : ''}
   ${d.textAuszug ? `<details class="etext"><summary>Erkannter Text</summary><pre>${esc(T().lesbarerText(d.originalName || '', d.textAuszug))}</pre></details>` : ''}</section>`;
}
function echtStift(d){
  return `<form class="felder estift" data-form="zuordnen" data-id="${esc(d.id)}"><label>Bereich – auswählen oder neue Kategorie eintippen <input class="feld" name="bereich" list="estift-bereiche" value="${esc(d.category)}" required maxlength="60" autocomplete="off"></label><datalist id="estift-bereiche">${echtBereiche().map(b => `<option value="${esc(b)}">`).join('')}</datalist>
   ${zuordnenFelder(d)}<div class="reihe"><button class="knopf gruen" type="submit">Übernehmen</button><button class="knopf hell" type="button" data-a="echt-stift" data-id="${esc(d.id)}">Abbrechen</button></div></form>`;
}
/* Vollbild der Vorschau (Klaus 22.11., Bild vom Tablet: „Möglichkeit machen, den Vollbildschirm anzugucken“): eigene Fläche über allem,
   Foto ganz eingepasst, PDF alle Seiten in voller Breite (höchstens 40) zum Rollen; Zurück, Esc oder × schließt. Der Bildschirm wird – wo der
   Browser es erlaubt – ganz belegt; sonst füllt die Fläche das Fenster. */
async function vollbildAuf(id){
  const d = (echt.liste || []).find(x => x.id === id); if (!d) return; vollbildZu();
  document.body.insertAdjacentHTML('beforeend', `<div id="vollbild" class="vollbild" role="dialog" aria-label="${esc(echtTitel(d))}"><button class="rund vbzu" data-a="vollbild-zu" aria-label="Schließen" data-tipp="Schließen">${ic('zu')}</button><div class="vbinhalt"><p class="leer">Wird geladen …</p></div></div>`);
  const v = $('vollbild'), o = v.querySelector('.vbinhalt'); try { v.requestFullscreen?.().catch(() => {}); } catch { /* nur Fläche */ }
  try {
    if (/\.pdf$/i.test(d.originalName)) { const pdf = await T().pdf(id); if (!pdf || !$('vollbild')) return; o.innerHTML = ''; o.classList.add('seiten');
      const breit = Math.min(o.clientWidth - 16, 1400), punkt = Math.min(2, devicePixelRatio || 1);
      for (let n = 1; n <= Math.min(40, pdf.numPages); n++) { const seite = await pdf.getPage(n), grund = seite.getViewport({scale:1}), sicht = seite.getViewport({scale:breit / grund.width * punkt}), c = document.createElement('canvas');
        c.width = Math.round(sicht.width); c.height = Math.round(sicht.height); c.style.width = breit + 'px'; await seite.render({canvasContext:c.getContext('2d'), viewport:sicht}).promise; if (!$('vollbild')) return; o.append(c); }
      if (pdf.numPages > 40) o.insertAdjacentHTML('beforeend', `<p class="leer">Seite 1–40 von ${pdf.numPages} · ganz über „Lesen und darin suchen“</p>`);
    } else { const f = await T().datei(id), url = URL.createObjectURL(f); o.innerHTML = `<img alt="" src="${url}">`; setTimeout(() => URL.revokeObjectURL(url), 120000); }
  } catch (err) { if ($('vollbild')) o.innerHTML = `<p class="leer">${esc(fehlerText(err))}</p>`; }
}
function vollbildZu(){ const v = $('vollbild'); if (!v) return; v.remove(); try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch { /* schon zu */ } }
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && $('vollbild')) vollbildZu(); });
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && $('vollbild')) vollbildZu(); });
/* Vorschau im Steckbrief (wie das Auge im Steckbrief des Organizers): bei PDFs die ersten drei Seiten, bei Fotos das Bild. */
async function echtVorschau(id){
  const o = $('evorschau'); if (!o) return; const d = (echt.liste || []).find(x => x.id === id); if (!d) return;
  try {
    if (/\.pdf$/i.test(d.originalName)) { const pdf = await T().pdf(id); if (!pdf || !$('evorschau')) return; const breit = Math.max(240, o.clientWidth - 8), punkt = Math.min(2, devicePixelRatio || 1); o.innerHTML = '';
      for (let n = 1; n <= Math.min(3, pdf.numPages); n++) { const seite = await pdf.getPage(n), grund = seite.getViewport({scale:1}), sicht = seite.getViewport({scale:breit / grund.width * punkt}), c = document.createElement('canvas');
        c.width = Math.round(sicht.width); c.height = Math.round(sicht.height); await seite.render({canvasContext:c.getContext('2d'), viewport:sicht}).promise; if (echt.vor !== id) return; o.append(c); }
      if (pdf.numPages > 3) o.insertAdjacentHTML('beforeend', `<p class="leer">Seite 1–3 von ${pdf.numPages} · ganz über „Lesen und darin suchen“</p>`);
    } else { const f = await T().datei(id), url = URL.createObjectURL(f); o.innerHTML = `<img alt="" src="${url}">`; setTimeout(() => URL.revokeObjectURL(url), 60000); }
  } catch (err) { if ($('evorschau')) $('evorschau').innerHTML = `<p class="leer">${esc(fehlerText(err))}</p>`; }
}
/* Sortierung von „Deine Unterlagen“ (Klaus 18.11.: der neue Scan war zwischen 100 Unterlagen nicht zu finden). Ab Werk: zuletzt abgelegt oben. */
const ECHT_SORT = [['neu','zuletzt abgelegt'],['datum','Datum der Unterlage'],['name','Name'],['groesse','Größe'],['bereich','Bereich'],['art','Art der Datei'],['person','Wen es betrifft'],['absender','Absender']];
const echtSort = () => { try { const w = localStorage.getItem('pa_sort'); return ECHT_SORT.some(x => x[0] === w) ? w : 'neu'; } catch { return 'neu'; } };
/* Richtung (0.7.2, Klaus 18.11.: „Pfeil nach oben, Pfeil nach unten – oder das zweite Mal draufklicken in die andere Richtung, da spart
   man Platz“): der Pfeil neben „Sortieren“ dreht die Reihenfolge um, für Liste und Gruppen (Jahre). Gemerkt `pa_sort_ab`. */
const echtUmgekehrt = () => { try { return localStorage.getItem('pa_sort_ab') === '1'; } catch { return false; } };
function echtSortiert(l){
  const w = echtSort(), text = (a, b) => String(a).localeCompare(String(b), 'de', {numeric:true, sensitivity:'base'}), neu = (a, b) => text(b.addedAt || '', a.addedAt || '');
  const f = {neu, datum:(a, b) => text(b.documentDate || '', a.documentDate || '') || neu(a, b), name:(a, b) => text(echtTitel(a), echtTitel(b)), groesse:(a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0), bereich:(a, b) => text(a.category, b.category) || neu(a, b), art:(a, b) => text(echtArt(a), echtArt(b)) || neu(a, b), person:(a, b) => text(echtAngabe(a, 'Person'), echtAngabe(b, 'Person')) || neu(a, b), absender:(a, b) => text(echtAngabe(a, 'Absender'), echtAngabe(b, 'Absender')) || neu(a, b)}[w];
  const r = [...l].sort(f); return echtUmgekehrt() ? r.reverse() : r;
}
A['echt-richtung'] = () => { try { localStorage.setItem('pa_sort_ab', echtUmgekehrt() ? '0' : '1'); } catch { /* gilt dann nicht */ } echt.zeig = ECHT_SEITE; mainZeigen(); };
document.addEventListener('change', ev => { if (ev.target.id !== 'echt-sort') return; try { localStorage.setItem('pa_sort', ev.target.value); } catch { /* gilt dann nicht */ } echt.knoten = null; echt.zeig = ECHT_SEITE; mainZeigen(); });
/* Der Baum über „Deine Unterlagen“ (0.6.2, Klaus 18.11.: „die Sicht aus dem Finden des Datei-Organizers, mit dem einklappbaren
   Alle-Dateien-Knopf – da sehe ich, wie viele es insgesamt sind“): oben „Alle Unterlagen“ mit der Zahl, aufgeklappt darunter die
   Gruppen mit ihren Zahlen. Ein Tipp auf eine Gruppe zeigt nur sie. Gruppiert wird nach dem, was unter „Sortieren“ gewählt ist:
   Art der Datei, Jahr (bei „Datum der Unterlage“), sonst der Bereich. Die Liste zeigt je 30 Stück, „Weitere zeigen“ holt mehr. */
const ECHT_SEITE = 30;
/* „Wen es betrifft“ und „Absender“ (Klaus 18.11.: wie die Sicht im Finden des Datei-Organizers – ein Ordner je Familienangehörigem):
   der Organizer gibt beides bei der Übergabe mit, es steht in der Notiz der Unterlage („… · Absender: X · Person: Y · …“,
   so schreibt es `lib/organizer-uebernahme.ts` des Klons). Ohne Angabe: „ohne Angabe“. */
/* Seit 0.7.0 zuerst aus dem Register (Person über „betrifft“, Absender als Organisation, von Hand gesetzt), sonst aus der Notiz. */
const notizAngabe = (d, feld) => { const m = String(d.notes || '').match(new RegExp('(?:^|· |– )' + feld + ': ([^·\n]+)')); return m ? m[1].trim() : ''; };
const AK = () => echt.ak || {personen:[], akten:[], bezug:{}, absender:[]};
const echtBezug = d => AK().bezug[d.id] || {akten:[], personen:[], absender:[]};
const personName = id => (AK().personen.find(p => p.id === id) || {}).name || '';
const akteVon = id => AK().akten.find(a => a.id === id);
const gleichName = (a, b) => String(a).replace(/\s+/g, ' ').trim().toLocaleLowerCase('de') === String(b).replace(/\s+/g, ' ').trim().toLocaleLowerCase('de');
const echtPersonen = d => { const b = echtBezug(d).personen.map(personName).filter(Boolean); if (b.length) return b; const n = notizAngabe(d, 'Person'); return n ? [n] : []; };
/* Absender, die nur Reste einer HTML-Datei sind („doctype html>“ – so las der Organizer vor 0.4.24 HTML-Dateien), nicht zeigen (Klaus 21.11.). */
const keinMarkup = v => v && !/doctype|[<>]/i.test(v) ? v : '';
const echtAbsender = d => keinMarkup(echtBezug(d).absender[0]) || keinMarkup(notizAngabe(d, 'Absender'));
const echtAngabe = (d, feld) => (feld === 'Person' ? echtPersonen(d)[0] : echtAbsender(d)) || 'ohne Angabe';
const docsInAkte = id => (echt.liste || []).filter(d => echtBezug(d).akten.includes(id));
const docsZuPerson = p => (echt.liste || []).filter(d => echtBezug(d).personen.includes(p.id) || (!echtBezug(d).personen.length && echtPersonen(d).some(n => gleichName(n, p.name))));
const offenEinordnen = () => (echt.liste || []).filter(d => !echtBezug(d).akten.length && !echtPersonen(d).length);
const einordnenZahl = () => offenEinordnen().length;
/* Ordnerbaum wie im Finden des Datei-Organizers (0.7.2, Klaus 18.11., Bild vom Tablet): unter jeder Gruppe die Unterordner mit Zahl –
   unter einem Bereich die Art der Unterlage (Rechnung, Brief, Befund … aus dem Organizer, sonst die Art der Datei), unter einem Jahr die
   Monate, unter Person oder Absender der Bereich. Tipp auf eine Gruppe wählt sie und klappt ihre Unterordner auf. */
const echtPfad = d => notizAngabe(d, 'Pfad') || d.originalName;
/* Langer Pfad (Klaus 18.11.: „abgekürzt – Anfang, Punkt, Punkt, Punkt und Ende“): Anfang … Ende, der ganze Pfad steht im Hinweis. */
const kurzPfad = (t, max = 38) => t.length <= max ? t : t.slice(0, Math.ceil(max * 0.4)) + '…' + t.slice(-Math.floor(max * 0.6));
/* Ein Bereich, auch in anderer Schreibweise („Haus und Wohnung“ = „Haus & Wohnung“, Klaus' Bild 18.11.: zwei Ordner im Baum). */
const kanonBereich = b => echtBereiche().find(x => bereichKern(x) === bereichKern(String(b || ''))) || b;
const echtGruppe = d => { const w = echtSort(); return w === 'person' ? echtAngabe(d, 'Person') : w === 'absender' ? echtAngabe(d, 'Absender') : w === 'art' ? echtArt(d) : w === 'datum' ? (d.documentDate ? String(d.documentDate).slice(0, 4) : 'ohne Datum') : kanonBereich(d.category); };
const echtUnter = d => { const w = echtSort(); return w === 'datum' ? (d.documentDate ? MONATE[+String(d.documentDate).slice(5, 7) - 1] || 'ohne Monat' : 'ohne Datum') : ['person', 'absender', 'art'].includes(w) ? kanonBereich(d.category) : notizAngabe(d, 'Art') || echtArt(d); };
const WURZEL = {person:'Alle Personen', absender:'Alle Absender', art:'Alle Dateiarten', datum:'Alle Jahre'};
const SEP = '\u0001';
const echtImKnoten = d => echt.knoten === null || (echt.knoten.includes(SEP) ? echtGruppe(d) + SEP + echtUnter(d) === echt.knoten : echtGruppe(d) === echt.knoten);
echt.auf = new Set();
/* Zwei Karten nebeneinander wie „Finden“ im Datei-Organizer (0.7.3, Klaus 18.11., Bilder vom Tablet: „links der Baum, rechts die
   dazugehörigen Dateien – nicht alles untereinander, sonst wird die Liste ewig lang“). Links „Alle Kategorien“ (beim Sortieren nach
   Datum „Alle Jahre“ usw.) mit Baumlinien, zusammenklappbar; rechts der gewählte Ordner mit Überschrift und Zahl. Schmal untereinander. */
function echtBaum(l){
  const zahl = new Map(), unter = new Map();
  for (const d of l) { const g = echtGruppe(d), u = echtUnter(d); zahl.set(g, (zahl.get(g) || 0) + 1); if (!unter.has(g)) unter.set(g, new Map()); unter.get(g).set(u, (unter.get(g).get(u) || 0) + 1); }
  const vgl = (a, b) => String(a).localeCompare(String(b), 'de', {numeric:true, sensitivity:'base'}), ab = echtUmgekehrt() ? -1 : 1;
  const gruppen = [...zahl].sort((a, b) => echtSort() === 'datum' ? -ab * vgl(a[0], b[0]) : vgl(a[0], b[0]));
  if (echt.knoten !== null && !l.some(echtImKnoten)) echt.knoten = null;
  const auf = klapp.ebaum !== 0, mon = u => MONATE.indexOf(u), ast = 'data-a="echt-knoten"';
  const ordner = `<svg class="icon eordner" viewBox="0 0 24 24" aria-hidden="true">${P.akten}</svg>`;
  const kinder = g => `<ul>${[...unter.get(g)].sort((a, b) => echtSort() === 'datum' ? -ab * (mon(a[0]) - mon(b[0])) : vgl(a[0], b[0])).map(([u, n]) => `<li><button class="eknoten unter${echt.knoten === g + SEP + u ? ' an' : ''}" ${ast} data-k="${esc(g + SEP + u)}"><span class="epfeil leer"></span>${ordner}<span class="ename">${esc(u)}</span><b>${n}</b></button></li>`).join('')}</ul>`;
  return `<div class="ebaum" data-ebaum="${auf ? 'auf' : 'zu'}"><ul class="ebaumliste"><li><button class="eknoten alle${echt.knoten === null ? ' an' : ''}" ${ast} data-k="" aria-expanded="${auf}"><span class="epfeil">${ic('weiter')}</span>${ordner}<span class="ename">${WURZEL[echtSort()] || 'Alle Kategorien'}</span><b data-tipp="${gruppen.length === 1 ? 'eine Gruppe' : gruppen.length + ' Gruppen'} · ${l.length} Unterlagen">${gruppen.length}</b></button>
    ${auf ? `<ul>${gruppen.map(([g, n]) => `<li><button class="eknoten${echt.knoten === g || String(echt.knoten).startsWith(g + SEP) ? ' an' : ''}${echt.auf.has(g) ? ' offen' : ''}" ${ast} data-k="${esc(g)}" aria-expanded="${echt.auf.has(g)}"><span class="epfeil">${ic('weiter')}</span>${ordner}<span class="ename">${esc(g)}</span><b>${n}</b></button>${echt.auf.has(g) ? kinder(g) : ''}</li>`).join('')}</ul>` : ''}</li></ul></div>`;
}
const echtSortZeile = () => `<div class="ekopf"><label class="sortzeile">Sortieren <select class="feld schmal" id="echt-sort" aria-label="Deine Unterlagen sortieren">${ECHT_SORT.map(([id, t]) => `<option value="${id}" ${id === echtSort() ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    <button class="rund klein geist" id="echt-richtung" data-a="echt-richtung" aria-label="Reihenfolge umkehren" data-tipp="Reihenfolge umkehren">${ic(echtUmgekehrt() ? 'hoch' : 'runter')}</button></div>`;
A['echt-knoten'] = e => { const k = e.dataset.k;
  if (k === '') { if (echt.knoten === null) { klapp.ebaum = klapp.ebaum !== 0 ? 0 : 1; try { localStorage.setItem('pa_klapp', JSON.stringify(klapp)); } catch { /* gilt bis zum Neuladen */ } } echt.knoten = null; }
  else if (k.includes(SEP)) echt.knoten = echt.knoten === k ? k.split(SEP)[0] : k;
  else { if (echt.knoten === k) { echt.auf.delete(k); echt.knoten = null; } else { echt.knoten = k; echt.auf.add(k); } }
  echt.zeig = ECHT_SEITE; mainZeigen(); };
A['echt-mehr'] = () => { echt.zeig = (echt.zeig || ECHT_SEITE) + ECHT_SEITE; mainZeigen(); };
/* „Alle Unterlagen“ als Knopf zum Einklappen wie „Alle Kategorien“ links (Klaus 18.11.: „beide Container als Button“); gemerkt in pa_klapp. */
const listeKopf = (t, n) => `<h3 class="egewaehlt"><button class="elistekopf" data-a="echt-liste-klapp" aria-expanded="${klapp.eliste !== 0}"><span class="epfeil">${ic('weiter')}</span><span>${esc(t)}</span></button><b>${n}</b></h3>`;
A['echt-liste-klapp'] = () => { klapp.eliste = klapp.eliste === 0 ? 1 : 0; try { localStorage.setItem('pa_klapp', JSON.stringify(klapp)); } catch { /* gilt bis zum Neuladen */ } mainZeigen(); };
function echtAbschnitt(){
  const l = echt.liste; let innen;
  if (l === null) innen = '<p class="leer">Die Akte wird geöffnet …</p>';
  else if (echt.fehler) innen = `<p class="leer">${esc(echt.fehler)}</p>`;
  else if (!l.length) innen = '<p class="leer">Noch nichts hineingelegt. Oben „Importieren“ (grüner Pfeil) legt eine Datei in die Akte – sie bleibt auf diesem Gerät.</p>';
  else { const alle = echtSortiert(l.filter(echtImKnoten)), n = echt.zeig || ECHT_SEITE;
    innen = `${echtSortZeile()}<div class="eexplorer"><section class="ekarte ebaumkarte">${echtBaum(l)}</section>
     <section class="ekarte elistekarte">${listeKopf(echt.knoten === null ? 'Alle Unterlagen' : echt.knoten.split(SEP).pop(), alle.length)}${klapp.eliste === 0 ? '' : `<div class="eliste">${alle.slice(0, n).map(echtReihe).join('')}
      ${alle.length > n ? `<button class="zeile emehr" data-a="echt-mehr"><span class="mitte"><strong>Weitere zeigen</strong><small>${n} von ${alle.length}</small></span></button>` : ''}</div>`}</section></div>`; }
  return klappTeil('echt', 'Deine Unterlagen', l && !echt.fehler ? String(l.length) : '', innen, `id="echt" data-bereit="${l === null ? 0 : 1}"`);
}
function fEchtNeu(datei){
  echt.datei = datei;
  const zuGross = datei.size > T().hoechstBytes;
  fenster(`${fk('In die Akte legen', esc(datei.name) + ' · ' + echtGroesse(datei.size))}
   ${zuGross ? `<p class="leer">Die Datei ist größer als ${echtGroesse(T().hoechstBytes)}. So große Dateien nimmt der Tresor nicht.</p>` : `<form class="felder" data-form="echt">
    <label>Was ist es? <input class="feld" name="titel" value="${esc(datei.name.replace(/\.[^.]+$/, ''))}" required maxlength="200"></label>
    <label>Bereich – auswählen oder einen eigenen eintippen <input class="feld" name="bereich" list="echt-bereiche" required maxlength="60" autocomplete="off" placeholder="zum Beispiel: Haus &amp; Wohnung"></label>
    <datalist id="echt-bereiche">${echtBereiche().map(b => `<option value="${esc(b)}">`).join('')}</datalist>
    <label>Datum der Unterlage <input class="feld" type="date" name="datum"></label>
    ${zuordnenFelder()}
    <button class="knopf gruen voll" type="submit">In die Akte legen ${ic('pfeil')}</button>
   </form>
   `}`);
}
function fEcht(id){
  const d = (echt.liste || []).find(x => x.id === id); if (!d) return;
  fenster(`${fk(esc(echtTitel(d)), esc(d.category))}
   <dl class="angaben"><dt>Datei</dt><dd>${esc(d.originalName)} · ${echtGroesse(d.sizeBytes)}</dd>${d.documentDate ? `<dt>Datum</dt><dd>${echtDatum(d.documentDate)}</dd>` : ''}<dt>Abgelegt</dt><dd>${echtDatum(d.addedAt)}</dd><dt>Liegt</dt><dd>in der Akte auf diesem Gerät</dd>
    <dt>Betrifft</dt><dd>${esc(echtPersonen(d).join(', ') || 'alle')}</dd><dt>Akten</dt><dd>${esc(echtBezug(d).akten.map(a => (akteVon(a) || {}).titel).filter(Boolean).join(', ') || '–')}</dd>${echtAbsender(d) ? `<dt>Absender</dt><dd>${esc(echtAbsender(d))}</dd>` : ''}</dl>
   <div class="reihe"><button class="knopf hell" data-a="echt-zuordnen" data-id="${esc(d.id)}">${ic('akten')} Einordnen</button><button class="knopf hell" data-a="echt-termin" data-id="${esc(d.id)}">${ic('kalender')} Termin dazu</button></div>
   ${/\.pdf$/i.test(d.originalName) ? `<button class="knopf voll" data-a="leser" data-id="${esc(d.id)}">Lesen und darin suchen</button><div class="reihe"><button class="knopf hell" data-a="echt-oeffnen" data-id="${esc(d.id)}">Im Browser öffnen</button></div>` : `<button class="knopf voll" data-a="echt-oeffnen" data-id="${esc(d.id)}">Öffnen</button>`}
   ${/\.(pdf|png|jpe?g|webp)$/i.test(d.originalName) ? `<div class="reihe"><button class="knopf hell" data-a="echt-wfpdf" data-id="${esc(d.id)}">${ic('pdf')} Mit Workflow PDF bearbeiten</button></div>` : ''}
   <div class="reihe"><button class="knopf hell" data-a="echt-raus" data-id="${esc(d.id)}">Aus der Akte nehmen</button></div>`);
}
/* Einordnen (0.7.0): wen es betrifft, in welche Akten, Absender – beim Ablegen und an jeder Unterlage. Neue Person oder Akte entsteht
   mit dem Speichern (die Akte gehört dann der ersten gewählten Person, sonst allen). Leer lassen geht. */
function zuordnenFelder(d = null){
  const ak = AK(), b = d ? echtBezug(d) : {akten:[], personen:[]}, abs = d ? echtAbsender(d) : '';
  const notizP = d && !b.personen.length ? echtPersonen(d)[0] : '', vor = id => b.personen.includes(id) || (notizP && gleichName(notizP, personName(id)));
  const haken = (name, id, t, an) => `<label class="wahlchip"><input type="checkbox" name="${name}" value="${esc(id)}" ${an ? 'checked' : ''}> ${esc(t)}</label>`;
  return `<fieldset class="zuordnen"><legend>Wen betrifft es?</legend><div class="chips">${ak.personen.map(p => haken('zp', p.id, p.name, vor(p.id))).join('')}<input class="feld schmal" name="zp_neu" placeholder="${ak.personen.length ? 'weitere Person' : 'Name, leer = alle'}" maxlength="120" autocomplete="off" ${notizP && !ak.personen.some(p => gleichName(p.name, notizP)) ? `value="${esc(notizP)}"` : ''}></div></fieldset>
   <fieldset class="zuordnen"><legend>Akte</legend><div class="chips">${ak.akten.map(a => haken('za', a.id, a.titel + (a.person ? ' · ' + personName(a.person) : ''), b.akten.includes(a.id))).join('')}<input class="feld schmal" name="za_neu" placeholder="neue Akte, darf leer bleiben" maxlength="120" autocomplete="off"></div></fieldset>
   <label>Absender <input class="feld" name="zabs" list="za-absender" value="${esc(abs)}" maxlength="120" autocomplete="off" placeholder="darf leer bleiben"></label><datalist id="za-absender">${ak.absender.map(x => `<option value="${esc(x)}">`).join('')}</datalist>`;
}
async function zuordnenSpeichern(f, docId){
  const ak = AK(), personen = [...f.querySelectorAll('input[name=zp]:checked')].map(i => i.value), akten = [...f.querySelectorAll('input[name=za]:checked')].map(i => i.value);
  const pNeu = (f.zp_neu && f.zp_neu.value || '').replace(/\s+/g, ' ').trim(), aNeu = (f.za_neu && f.za_neu.value || '').replace(/\s+/g, ' ').trim();
  if (pNeu) { const da = ak.personen.find(p => gleichName(p.name, pNeu)); personen.push(da ? da.id : await T().akten.personAnlegen(pNeu)); }
  if (aNeu) { const da = ak.akten.find(a => gleichName(a.titel, aNeu)); akten.push(da ? da.id : await T().akten.akteAnlegen(aNeu, personen[0] || null)); }
  const abs = f.zabs ? f.zabs.value : '';
  await T().akten.zuordnen(docId, {akten:[...new Set(akten)], personen:[...new Set(personen)], absender:abs.trim() || null});
}
function fZuordnen(id){
  const d = (echt.liste || []).find(x => x.id === id); if (!d) return;
  fenster(`${fk('Einordnen', esc(echtTitel(d)))}<form class="felder" data-form="zuordnen" data-id="${esc(d.id)}">${zuordnenFelder(d)}<button class="knopf gruen voll" type="submit">Speichern</button></form>`);
}
function fPersonNeu(){ fenster(`${fk('Person anlegen')}<form class="felder" data-form="person-neu"><label>Name <input class="feld" name="name" required maxlength="120" autocomplete="off"></label><label>Rolle <input class="feld" name="rolle" maxlength="80" placeholder="z. B. ich, Partnerin, Kind" autocomplete="off"></label><button class="knopf gruen voll" type="submit">Anlegen</button></form>`); }
function fAkteNeu(){
  const ak = AK();
  fenster(`${fk('Neue Akte')}<form class="felder" data-form="akte-neu"><label>Name der Akte <input class="feld" name="titel" required maxlength="120" placeholder="z. B. Auto, Nebenkosten 2025" autocomplete="off"></label>
   <label>Wem gehört sie? <select class="feld" name="person"><option value="">allen</option>${ak.personen.map(p => `<option value="${esc(p.id)}" ${s.person === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label><button class="knopf gruen voll" type="submit">Anlegen</button></form>`);
}
function fAkteFuellen(id){
  const a = akteVon(id); if (!a) return; const l = echtSortiert(echt.liste || []);
  fenster(`${fk('Unterlagen hineinlegen', esc(a.titel))}<form data-form="akte-fuellen" data-id="${esc(id)}"><div class="liste ordliste">${l.map(d => `<label class="ordzeile"><input type="checkbox" class="haken" name="d" value="${esc(d.id)}" ${echtBezug(d).akten.includes(id) ? 'checked' : ''}><span class="mitte"><strong>${esc(echtTitel(d))}</strong><small>${esc(d.category)}${d.documentDate ? ' · ' + echtDatum(d.documentDate) : ''}</small></span></label>`).join('') || '<p class="leer">Noch nichts in der Akte.</p>'}</div>
   <div class="reihe"><button class="knopf gruen" type="submit">Speichern</button><button class="knopf hell" type="button" data-a="zu">Abbrechen</button></div></form>`, 'leser');
}
/* Termin zu einer echten Unterlage (0.7.0): Frist oder Aufgabe im Kalender der Familienakte, mit Bezug auf die Unterlage. */
function fTermin(id){
  const d = (echt.liste || []).find(x => x.id === id); if (!d) return;
  fenster(`${fk('Termin dazu', esc(echtTitel(d)))}<form class="felder" data-form="termin-echt" data-id="${esc(d.id)}"><label>Was? <input class="feld" name="titel" required maxlength="200" value="${esc(echtTitel(d))}"></label>
   <div class="reihe"><label style="flex:1">Tag <input class="feld" type="date" name="tag" required value="${tagHeute()}"></label><label style="flex:1">Uhrzeit <input class="feld" type="time" name="zeit"></label></div>
   <label>Art <select class="feld" name="art"><option value="deadline">Frist</option><option value="task">Aufgabe</option></select></label><button class="knopf gruen voll" type="submit">In den Kalender</button></form>`);
}
document.addEventListener('submit', async ev => {
  const f = ev.target, art = f.dataset.form; if (!['zuordnen', 'person-neu', 'akte-neu', 'akte-fuellen', 'termin-echt'].includes(art)) return; ev.preventDefault();
  const knopf = f.querySelector('button[type=submit]'); if (knopf.disabled) return; knopf.disabled = true;
  try {
    if (art === 'zuordnen') { if (f.bereich && f.bereich.value.trim()) { const b = echtBereich(f.bereich.value), d = (echt.liste || []).find(x => x.id === f.dataset.id); if (d && b !== d.category) await T().bereichSetzen(f.dataset.id, b); } await zuordnenSpeichern(f, f.dataset.id); if (echt.stift === f.dataset.id) { echt.stift = null; echt.sb = f.dataset.id; } toast('Eingeordnet.'); }
    if (art === 'person-neu') { s.person = await T().akten.personAnlegen(f.name.value.trim(), f.rolle.value.trim()); toast('Person angelegt.'); }
    if (art === 'akte-neu') { await T().akten.akteAnlegen(f.titel.value.trim(), f.person.value || null); toast('Akte angelegt.'); }
    if (art === 'akte-fuellen') { const an = new Set([...f.querySelectorAll('input[name=d]:checked')].map(i => i.value)); let n = 0;
      for (const d of echt.liste || []) { const b = echtBezug(d), drin = b.akten.includes(f.dataset.id); if (drin === an.has(d.id)) continue;
        await T().akten.zuordnen(d.id, {akten: drin ? b.akten.filter(x => x !== f.dataset.id) : [...b.akten, f.dataset.id], personen:b.personen, absender:b.absender[0] || null}); n++; }
      toast(n ? `${n} ${n === 1 ? 'Unterlage' : 'Unterlagen'} geändert.` : 'Nichts geändert.'); }
    if (art === 'termin-echt') { await T().kalender.anlegen({titel:f.titel.value.trim(), tag:f.tag.value, zeit:f.zeit.value || null, art:f.art.value, docId:f.dataset.id}); const g = $('glocke'); if (g) g.contentWindow.location.reload(); toast('Im Kalender eingetragen.'); }
    zu(); await echtLaden();
  } catch (err) { knopf.disabled = false; toast(fehlerText(err)); }
});
Object.assign(A, {
 'echt-zuordnen': e => fZuordnen(e.dataset.id), 'echt-termin': e => fTermin(e.dataset.id),
 'person-reiter': e => { s.person = e.dataset.id || null; mainZeigen(); }, 'person-neu': () => fPersonNeu(), 'akte-neu': () => fAkteNeu(),
 'akte-auf': e => { s.ansicht = 'akten'; const k = e.dataset.id || null; s.bereich = s.bereich === k && k && !k.includes('|') ? null : k; echt.zeig = ECHT_SEITE; zeigen(); },
 'beispiel-an': async e => { e.disabled = true; try { const r = await T().akten.beispielAnlegen(); await echtLaden(); toast(`Beispielfamilie angelegt: ${r.personen} erfundene Personen, ${r.unterlagen} Unterlagen zugeordnet.`); } catch (err) { toast(fehlerText(err)); } },
 'beispiel-weg': async e => { if (!confirm('Die erfundene Beispielfamilie und ihre Akten herausnehmen? Die Unterlagen bleiben.')) return; e.disabled = true; try { await T().akten.beispielEntfernen(); s.bereich = null; await echtLaden(); toast('Beispielfamilie entfernt. Die Unterlagen sind unverändert.'); } catch (err) { toast(fehlerText(err)); } }, 'akte-fuellen': e => fAkteFuellen(e.dataset.id),
 'echt-bereich': e => { try { localStorage.setItem('pa_sort', 'bereich'); } catch { /* gilt dann nicht */ } klapp.echt = 1; klapp.ebaum = 1; echt.knoten = e.dataset.k; echt.auf.add(e.dataset.k); echt.zeig = ECHT_SEITE; mainZeigen(); const o = $('echt'); if (o) o.scrollIntoView({block:'start'}); },
});
/* ---------- Ordner in die Akte legen (Klaus 17.11.): ein im Datei-Organizer sortierter Ordner kommt mit seiner Einordnung herein ---------- */
const ord = { ordner:'', index:false, grund:'', stuecke:[], laeuft:false };
const NUR_DATEI = ['Angebot/Werbung', 'Foto', 'Unklar'];
A['ord-alle'] = e => { e.closest('form').querySelectorAll('input[name=d]').forEach(i => { i.checked = true; }); };
function fOrdner(){
  const holen = ord.stuecke.filter(x => !x.doppelt), doppelt = ord.stuecke.length - holen.length, wahl = echtBereiche();
  // Übergabe nimmt ab Werk nur Unterlagen mit (0.7.0, Klaus 18.11. zu D: ja): Fotos, Werbung, Unklares und Gesperrtes bleiben Dateien
  // und kommen nur auf ausdrücklichen Haken mit. Ohne Einordnung aus dem Organizer ist alles angehakt (wie bisher).
  const an = x => !ord.index || (!!x.art && !NUR_DATEI.includes(x.art) && !x.warnung), angehakt = holen.filter(an).length;
  const zeile = x => `<label class="ordzeile"><input type="checkbox" class="haken" name="d" value="${esc(x.name)}" ${an(x) ? 'checked' : ''} aria-label="${esc(x.name)} übernehmen">
    <span class="mitte"><strong>${esc(x.name.replace(/∕/g, '/'))}</strong><small style="white-space:normal">${[x.art, x.datum ? echtDatum(x.datum) : '', echtGroesse(x.groesse), x.text ? 'Text gelesen' : ''].filter(Boolean).map(esc).join(' · ')}${x.warnung ? `<br><b class="warn">${esc(x.warnung)}</b>` : ''}</small></span>
    <select class="feld schmal" name="b" data-name="${esc(x.name)}" aria-label="Bereich für ${esc(x.name)}">${[...new Set([x.bereich || 'Sonstiges', ...wahl].filter(Boolean))].map(b => `<option ${b === (x.bereich || 'Sonstiges') ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select></label>`;
  fenster(`${fk('Ordner in die Akte legen', esc(ord.ordner))}
   <p class="hinweis">${ord.index ? 'Die Einordnung kommt aus dem Datei-Organizer. Du kannst den Bereich je Datei ändern oder Dateien abwählen.' : `In diesem Ordner liegt keine Einordnung aus dem Datei-Organizer${ord.grund ? ' (' + esc(ord.grund) + ')' : ''}. Die Dateien kommen nach „Sonstiges“, wenn du nichts anderes wählst.`}${doppelt ? ` ${doppelt} doppelte ${doppelt === 1 ? 'Datei bleibt' : 'Dateien bleiben'} im Ordner.` : ''}</p>
   ${holen.length ? `<form data-form="ordner">${ord.index && angehakt < holen.length ? `<p class="lesestand" id="ord-wahl">${angehakt} Unterlagen angehakt · ${holen.length - angehakt} ${holen.length - angehakt === 1 ? 'Datei bleibt' : 'Dateien bleiben'} draußen (Fotos, Werbung, Unklares) <button type="button" class="knopf hell klein" data-a="ord-alle">Alle anhaken</button></p>` : ''}
    <label class="ordakte">Akte für alle <input class="feld schmal" name="akte" list="ord-akten" maxlength="120" placeholder="darf leer bleiben" autocomplete="off"></label><datalist id="ord-akten">${AK().akten.map(a => `<option value="${esc(a.titel)}">`).join('')}</datalist>
    <div class="liste ordliste">${holen.map(zeile).join('')}</div>
    <p class="lesestand" id="ord-stand"></p>
    <div class="reihe"><button class="knopf gruen" type="submit">${holen.length} ${holen.length === 1 ? 'Datei' : 'Dateien'} in die Akte legen</button><button class="knopf hell" type="button" data-a="zu">Abbrechen</button></div></form>`
   : '<p class="leer">In diesem Ordner liegt nichts zum Übernehmen.</p>'}`, 'leser');
}
A['ordner-import'] = async () => {
  try { const r = await T().organizer.waehlen(); Object.assign(ord, r); fOrdner(); }
  catch (err) { if (!(err && err.name === 'AbortError')) toast(fehlerText(err)); }
};
document.addEventListener('submit', async ev => { const f = ev.target; if (f.dataset.form !== 'ordner') return; ev.preventDefault();
  if (ord.laeuft) return; const an = new Set([...f.querySelectorAll('input[name=d]:checked')].map(i => i.value));
  const auswahl = [...f.querySelectorAll('select[name=b]')].filter(sel => an.has(sel.dataset.name)).map(sel => ({name:sel.dataset.name, bereich:echtBereich(sel.value)}));
  if (!auswahl.length) { toast('Keine Datei gewählt.'); return; }
  ord.laeuft = true; const knopf = f.querySelector('button[type=submit]'); knopf.disabled = true;
  try {
    const r = await T().organizer.uebernehmen(auswahl, (fertig, gesamt, name) => { const o = $('ord-stand'); if (o) o.textContent = name ? `Datei ${fertig + 1} von ${gesamt}: ${name}` : ''; });
    const akteName = (f.akte && f.akte.value || '').replace(/\s+/g, ' ').trim();
    if (akteName && r.ids.length) { await echtLaden(); const da = AK().akten.find(a => gleichName(a.titel, akteName)), aid = da ? da.id : await T().akten.akteAnlegen(akteName, null);
      for (const id of r.ids) await T().akten.zuordnen(id, {akten:[aid], personen:[], absender:null}); }
    zu(); await echtLaden();
    toast(`${r.abgelegt} ${r.abgelegt === 1 ? 'Datei liegt' : 'Dateien liegen'} in der Akte.${r.schonDa ? ` ${r.schonDa} waren schon da${r.aktualisiert ? ' – ihre Einordnung kommt jetzt aus dem Organizer' : ''}.` : ''}${r.fehler.length ? ` Nicht geklappt: ${r.fehler[0]}${r.fehler.length > 1 ? ' und ' + (r.fehler.length - 1) + ' weitere' : ''}.` : ''}`);
  } catch (err) { knopf.disabled = false; toast(fehlerText(err)); } finally { ord.laeuft = false; }
});
/* ---------- Leser (Klaus 17.11.): das PDF in der Akte lesen, auf der Seite der Fundstelle, Wörter markiert, darin suchen ---------- */
const les = { id:null, pdf:null, seite:1, seiten:0, woerter:[], text:null, fund:[], lauf:0, auftrag:null };
const lesWoerter = q => (T().inhaltsWoerter(q).length ? T().inhaltsWoerter(q) : q.split(/\s+/).filter(Boolean)).map(w => w.toLowerCase());
/* Fundseiten: Seiten, auf denen alle Wörter stehen; gibt es keine, die mit irgendeinem der Wörter. */
function lesFundRechnen(){ const seiten = wie => les.text.map((s, i) => les.woerter[wie](w => s.includes(w)) ? i + 1 : 0).filter(Boolean); les.fund = les.text && les.woerter.length ? (seiten('every').length ? seiten('every') : seiten('some')) : []; }
function lesLeiste(){
  const o = $('leser-ort'); if (o) o.textContent = `Seite ${les.seite} von ${les.seiten}`;
  const f = $('leser-fund'); if (f) f.textContent = !les.woerter.length ? '' : !les.text ? 'nur mit Textebene' : les.fund.length ? `auf ${les.fund.length} ${les.fund.length === 1 ? 'Seite' : 'Seiten'} gefunden${les.fund.includes(les.seite) ? ' · ' + (les.fund.indexOf(les.seite) + 1) + '. davon' : ''}` : 'nicht gefunden';
  document.querySelectorAll('[data-a=leser-fund-vor],[data-a=leser-fund-zurueck]').forEach(k => k.disabled = !les.fund.length);
}
async function lesZeigen(){
  const blatt = $('leser-blatt'); if (!blatt || !les.pdf) return; const lauf = ++les.lauf; lesLeiste();
  try {
    if (les.auftrag) { try { les.auftrag.cancel(); } catch (e) {} }
    const seite = await les.pdf.getPage(les.seite); if (lauf !== les.lauf) return;
    const breit = Math.max(280, blatt.clientWidth), grund = seite.getViewport({scale:1}), mass = breit / grund.width, punkt = Math.min(2, window.devicePixelRatio || 1);
    const sicht = seite.getViewport({scale:mass * punkt}), c = document.createElement('canvas'); c.width = Math.round(sicht.width); c.height = Math.round(sicht.height); c.style.width = '100%';
    les.auftrag = seite.render({canvasContext:c.getContext('2d'), viewport:sicht}); await les.auftrag.promise; if (lauf !== les.lauf) return;
    // Marken: jedes Textstück der Seite, in dem ein Wort steht – der Teil des Stücks, den das Wort einnimmt (nach Zeichenzahl geschätzt)
    const marken = [], inhalt = les.woerter.length ? await seite.getTextContent() : {items:[]};
    for (const st of inhalt.items) { const str = (st.str || '').toLowerCase(); if (!str) continue;
      for (const w of les.woerter) for (let i = str.indexOf(w); i >= 0; i = str.indexOf(w, i + w.length)) {
        const m = window.pdfjsLib.Util.transform(sicht.transform, st.transform), hoch = Math.hypot(m[2], m[3]), lang = st.width * mass * punkt;
        marken.push(`<i style="left:${(m[4] + lang * i / str.length) / c.width * 100}%;top:${(m[5] - hoch) / c.height * 100}%;width:${lang * w.length / str.length / c.width * 100}%;height:${hoch * 1.15 / c.height * 100}%"></i>`); } }
    if (lauf !== les.lauf) return;
    blatt.innerHTML = ''; blatt.append(c); blatt.insertAdjacentHTML('beforeend', `<div class="lesermarken" data-zahl="${marken.length}">${marken.join('')}</div>`);
    const erste = blatt.querySelector('.lesermarken i'); if (erste) erste.scrollIntoView({block:'center'}); else blatt.scrollIntoView({block:'start'});
  } catch (err) { if (lauf === les.lauf && !(err && err.name === 'RenderingCancelledException')) blatt.innerHTML = '<p class="leer">Die Seite lässt sich nicht anzeigen.</p>'; }
}
async function fLeser(id, seite, frage){
  const d = (echt.liste || []).find(x => x.id === id); if (!d) return;
  Object.assign(les, {id, pdf:null, seite:Math.max(1, +seite || 1), seiten:0, woerter:frage ? lesWoerter(frage) : [], text:null, fund:[]});
  fenster(`${fk(esc(echtTitel(d)), esc(d.category))}
   <form class="suche lesersuche" data-form="leser">${ic('lupe')}<input name="q" value="${esc(frage || '')}" placeholder="Wort in dieser Unterlage suchen" aria-label="In dieser Unterlage suchen" autocomplete="off"><button class="knopf" type="submit">Suchen</button></form>
   <div class="leserleiste"><button class="knopf hell" data-a="leser-zurueck" aria-label="Seite zurück">‹</button><span id="leser-ort">Seite …</span><button class="knopf hell" data-a="leser-vor" aria-label="Seite weiter">›</button>
    <span class="luecke"></span><button class="knopf hell" data-a="leser-fund-zurueck" aria-label="Vorige Fundstelle" disabled>‹ Fund</button><button class="knopf hell" data-a="leser-fund-vor" aria-label="Nächste Fundstelle" disabled>Fund ›</button></div>
   <p class="lesestand" id="leser-fund"></p>
   <div class="leserblatt" id="leser-blatt"><p class="leer">Die Unterlage wird geöffnet …</p></div>`, 'leser');
  try {
    const pdf = await T().pdf(id); if (les.id !== id) return;
    if (!pdf) { $('leser-blatt').innerHTML = '<p class="leer">Lesen geht hier nur bei PDFs.</p>'; return; }
    les.pdf = pdf; les.seiten = pdf.numPages; les.seite = Math.min(les.seite, les.seiten);
    try { const tx = await T().seitenText(id); les.text = tx && tx.some(s => s.length > 20) ? tx : null; } catch (e) { les.text = null; }
    lesFundRechnen(); await lesZeigen();
  } catch (err) { if ($('leser-blatt')) $('leser-blatt').innerHTML = `<p class="leer">${esc(fehlerText(err))}</p>`; }
}
const lesGeh = n => { if (!les.pdf) return; const z = Math.min(les.seiten, Math.max(1, n)); if (z !== les.seite) { les.seite = z; lesZeigen(); } };
document.addEventListener('submit', ev => { const f = ev.target; if (f.dataset.form !== 'leser') return; ev.preventDefault();
  les.woerter = f.q.value.trim() ? lesWoerter(f.q.value.trim()) : []; lesFundRechnen();
  if (les.fund.length && !les.fund.includes(les.seite)) les.seite = les.fund.find(n => n > les.seite) || les.fund[0]; lesZeigen(); });
Object.assign(A, {
 leser: e => fLeser(e.dataset.id, e.dataset.seite, e.dataset.seite ? s.frage : ''),
 'leser-vor': () => lesGeh(les.seite + 1), 'leser-zurueck': () => lesGeh(les.seite - 1),
 'leser-fund-vor': () => { if (les.fund.length) lesGeh(les.fund.find(n => n > les.seite) || les.fund[0]); },
 'leser-fund-zurueck': () => { if (les.fund.length) lesGeh([...les.fund].reverse().find(n => n < les.seite) || les.fund[les.fund.length - 1]); },
});
Object.assign(A, {
 'echt-neu': () => { zu(); $('echt-datei').click(); },
 'echt-auf': e => { if (!e.closest('.ereihe')) return fEcht(e.dataset.id); A['echt-auge'](e); },
 'echt-auge': e => { const id = e.dataset.id; echt.sb = echt.sb === id ? null : id; echt.vor = null; echt.stift = null; mainZeigen(); },
 'echt-stift': e => { const id = e.dataset.id; echt.stift = echt.stift === id ? null : id; if (echt.stift) echt.sb = null; mainZeigen(); },
 'echt-vollbild': e => vollbildAuf(e.dataset.id),
 'vollbild-zu': () => vollbildZu(),
 'echt-vorschau': e => { const id = e.dataset.id; echt.vor = echt.vor === id ? null : id; mainZeigen(); if (echt.vor) echtVorschau(id); },
 'echt-muell': e => { const d = (echt.liste || []).find(x => x.id === e.dataset.id); if (d && confirm(`„${echtTitel(d)}“ aus der Akte nehmen?`)) A['echt-raus'](e); },
 'echt-teilen': async e => {
   try { const f = await T().datei(e.dataset.id); if (await nativUebergeben(f, true)) return;
     if (navigator.canShare && navigator.canShare({files:[f]})) { await navigator.share({files:[f], title:f.name}); return; }
     await geben(f, f.name);
   } catch (err) { if (err && err.name !== 'AbortError') toast(fehlerText(err)); } },
 'echt-oeffnen': async e => {
   try { const f = await T().datei(e.dataset.id); if (await nativUebergeben(f, false)) return; if (nativSpeichern()) { await geben(f, f.name); return; } const url = URL.createObjectURL(f), a = document.createElement('a');
     a.href = url; a.target = '_blank'; a.rel = 'noopener'; if (!/^(application\/pdf|image\/|text\/plain)/.test(f.type)) a.download = f.name;
     document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
   } catch (err) { toast(fehlerText(err)); } },
 'echt-raus': async e => {
   if (echt.laeuft) return; echt.laeuft = true;
   try { const erg = await T().herausnehmen(e.dataset.id); zu(); await echtLaden(); toast(erg.fehler.length ? erg.fehler[0] : 'Aus der Akte genommen.'); }
   catch (err) { toast(fehlerText(err)); } finally { echt.laeuft = false; } }
});
document.addEventListener('change', ev => { if (ev.target.id === 'echt-datei' && ev.target.files[0]) { fEchtNeu(ev.target.files[0]); ev.target.value = ''; } });
document.addEventListener('submit', async ev => {
  const f = ev.target; if (f.dataset.form !== 'echt') return; ev.preventDefault();
  if (echt.laeuft || !echt.datei) return; echt.laeuft = true;
  const knopf = f.querySelector('button[type=submit]'); knopf.disabled = true;
  try {
    // Text lesen, bevor abgelegt wird (PDF: Textebene, Foto und Scan: Texterkennung auf dem Gerät) – der Auszug liegt dann an der
    // Unterlage und die Suche findet sie über ihren Inhalt. Klappt das Lesen nicht, wird trotzdem abgelegt.
    let gelesen = {text:'', art:''};
    if (T().textLesbar(echt.datei)) { const alt = knopf.textContent; knopf.textContent = 'Text wird gelesen …'; try { gelesen = await T().textLesen(echt.datei); } catch (e) { gelesen = {text:'', art:'fehler'}; } knopf.textContent = alt; }
    const d = await T().ablegen(echt.datei, {bereich:echtBereich(f.bereich.value), datum:f.datum.value || null, titel:f.titel.value.trim(), notiz:null, text:gelesen.text});
    const lesbar = T().textLesbar(echt.datei);
    try { await zuordnenSpeichern(f, d.id); } catch (err) { toast(fehlerText(err)); }
    echt.datei = null; zu(); await echtLaden(); toast(`„${echtTitel(d)}“ liegt in ${d.category}.${gelesen.text ? ' Text gelesen – die Suche findet auch den Inhalt.' : lesbar ? ' Kein Text erkannt.' : ''}`);
  } catch (err) { knopf.disabled = false; toast(fehlerText(err)); } finally { echt.laeuft = false; }
});

/* Datei hinausgeben: im Browser als Download; in der Pro-App (Android/Windows) über „Speichern unter …“ des Geräts (DoDateien aus dem
   Klon des Datei-Organizers) – die WebView der App kennt keinen Download. */
/* Öffnen und Teilen in der Android-App (Klaus 21.11., Bilder vom Tablet: bei einer HTML-Datei boten „Öffnen“ und „Teilen“ nur „Speichern“ an):
   über ProFiles aus dem Klon Private Brain Pro – „Öffnen“ = Androids „Öffnen mit“ (z. B. Chrome), „Teilen“ = Teilen-Fenster des Geräts.
   Bis 16 MB (Grenze des Klons); größer oder ohne die App: wie bisher. */
const nativDateien = () => { const c = window.Capacitor; return c && c.isNativePlatform && c.isNativePlatform() && c.Plugins && c.Plugins.ProFiles && c.Plugins.ProFiles.open ? c.Plugins.ProFiles : null; };
async function nativUebergeben(f, teilen){
  const p = nativDateien(); if (!p || f.size > 16 * 1024 * 1024) return false;
  const data = await new Promise((ok, nein) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1] || ''); r.onerror = () => nein(r.error); r.readAsDataURL(f); });
  try { await p[teilen ? 'share' : 'open']({data, name:f.name}); return true; } catch { return false; }
}
const nativSpeichern = () => { const c = window.Capacitor; return c && c.isNativePlatform && c.isNativePlatform() && c.Plugins && c.Plugins.DoDateien && c.Plugins.DoDateien.speichern ? c.Plugins.DoDateien : null; };
async function geben(blob, name){
  const n = nativSpeichern();
  if (n) {
    const b = new Uint8Array(await blob.arrayBuffer()); let t = ''; for (let i = 0; i < b.length; i += 8192) t += String.fromCharCode.apply(null, b.subarray(i, i + 8192));
    const r = await n.speichern({ name, mime: blob.type || 'application/octet-stream', data: btoa(t) }); return !!(r && r.gespeichert);
  }
  const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000); return true;
}
/* ---------- Tresor exportieren / importieren: die Vollsicherung der Familienakte (verschlüsselter Ordner an einem gewählten Ort) ---------- */
const sich = { art:null, notfallblatt:'', ordner:'' };
/* Wohin zuletzt exportiert wurde – nur zum Wiederfinden gemerkt (der Browser nennt den Namen des gewählten Ordners, nicht den ganzen Pfad). */
const EXPORT_MERKER = 'private-akte-letzter-export';
const letzterExport = () => { try { return JSON.parse(localStorage.getItem(EXPORT_MERKER) || 'null'); } catch { return null; } };
const uhr = iso => new Date(iso).toLocaleString('de-DE', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
const zugangFehler = e => /PASSWORT_FALSCH/.test(e && e.message) ? 'Das Passwort oder der Notfallschlüssel passt nicht zu dieser Sicherung.' : /PASSWORT_FEHLT/.test(e && e.message) ? 'Diese Sicherung ist verschlüsselt. Bitte das Passwort eintragen.' : e && e.name === 'AbortError' ? '' : fehlerText(e);
function fSicherung(){
  const kann = T() && T().sicherung.ordnerWaehlbar(), n = (echt.liste || []).length;
  fenster(`${fk('Sichern & Exportieren','Ein Backup ist die ganze Akte als verschlüsselter Ordner – dort, wo du willst.')}
   <div class="liste"><div class="zeile"><span class="mitte"><strong>In der Akte auf diesem Gerät</strong><small>${n} ${n===1?'Unterlage':'Unterlagen'} · im Speicher des Browsers</small></span></div>
   ${(l => l ? `<div class="zeile" id="letzter-export"><span class="mitte"><strong>Letztes Backup: ${uhr(l.erstellt)}</strong><small style="white-space:normal;overflow-wrap:anywhere">in den Ordner „${esc(l.ziel)}“, dort als „${esc(l.ordner)}“</small></span><span class="marke2 m-ok">${l.dateien} ${l.dateien===1?'Datei':'Dateien'}</span></div>` : `<div class="zeile" id="letzter-export"><span class="mitte"><strong>Noch kein Backup</strong><small>die Akte liegt nur im Speicher des Browsers</small></span></div>`)(letzterExport())}</div>
   ${kann ? `<div class="reihe"><button class="knopf gruen" data-a="sich-export">Backup erstellen</button><button class="knopf hell" data-a="akte-leeren">Akte leeren …</button></div>
   <p class="hinweis">Der Browser kann seinen Speicher leeren. Darum regelmäßig ein Backup erstellen – auf das Gerät, eine SD-Karte oder einen Stick. Einlesen geht über „Importieren“.</p>`
   : `<p class="hinweis">Dieser Browser kann keinen Ordner wählen. Ein Backup geht in Chrome oder Edge.</p>`}
   ${kann ? kopieTeil() : ''}`);
}
/* Kopie an einem zweiten Ort (Pro-Akte, Klaus 18.11.): der „Zweite Ort“ der Familienakte – verschlüsselt, von selbst aktuell. */
function kopieTeil(){
  const k = sich.kopie, l = k && (k.letzte || null), g = k && k.letzteGelungen;
  if (!k) return `<div class="liste" id="kopie"><div class="zeile"><span class="mitte"><strong>Kopie</strong><small>noch keine – z. B. SD-Karte oder Festplatte</small></span></div></div>
   <div class="reihe"><button class="knopf hell" data-a="kopie-neu">Kopie einrichten</button></div>`;
  const stand = l && !l.ok ? `<b class="warn">${esc(l.grund || 'nicht gelungen')}</b>` : g ? 'zuletzt ' + uhr(g.zeit) : 'noch keine Kopie dort';
  return `<div class="liste" id="kopie"><div class="zeile"><span class="mitte"><strong>Kopie: ${esc(k.name)}</strong><small style="white-space:normal">verschlüsselt · ${stand}</small></span></div></div>
   <div class="reihe"><button class="knopf hell" data-a="kopie-jetzt">Jetzt kopieren</button><button class="knopf hell" data-a="kopie-weg">Kopie beenden</button></div>`;
}
function fKopie(){
  const m = T().sicherung.passwortMindestens;
  fenster(`${fk('Kopie einrichten','Ein Ort für eine zweite Akte, verschlüsselt.')}
   <form class="felder" data-form="kopie">
    <label>Passwort (mindestens ${m} Zeichen) <input class="feld" type="password" name="p1" required minlength="${m}" autocomplete="new-password"></label>
    <label>Passwort wiederholen <input class="feld" type="password" name="p2" required minlength="${m}" autocomplete="new-password"></label>
    <button class="knopf gruen voll" type="submit">Ort wählen ${ic('pfeil')}</button>
   </form>`);
}
async function kopieLaden(){ try { sich.kopie = T() && T().kopie ? await T().kopie.lesen() : null; } catch { sich.kopie = null; } }
/* Beim Öffnen: ist eine Kopie eingerichtet, kommt sie von selbst auf den neuesten Stand (nur bei Änderung, höchstens einmal am Tag). */
function kopieAuto(){ if (T() && T().kopie) T().kopie.sichern(`Private Akte ${FASSUNG}`, true).catch(() => {}); }
function fImportWahl(){
  const kann = T() && T().sicherung.ordnerWaehlbar(), bereit = echt.liste !== null && !echt.fehler;
  const z = (a, i, t, u, aus) => `<button class="zeile" data-a="${a}" ${aus ? 'disabled' : ''}><span class="art">${ic(i)}</span><span class="mitte"><strong>${t}</strong><small style="white-space:normal">${u}</small></span>${ic('weiter')}</button>`;
  fenster(`${fk('Importieren','Etwas in die Akte holen.')}<div class="liste">
   ${z('echt-neu','datei','Datei in die Akte legen','eine Datei vom Gerät – sie liegt danach unter „Deine Unterlagen“', !bereit)}
   ${z('ordner-import','ordner','Ordner in die Akte legen', kann ? 'viele Dateien auf einmal – mit der Einordnung aus dem Datei-Organizer, wenn sie im Ordner liegt' : 'geht in Chrome oder Edge', !kann || !bereit)}
   ${z('sich-import','schild','Backup einlesen', kann ? 'einen Backup-Ordner wählen – was schon da ist, wird nicht überschrieben' : 'geht in Chrome oder Edge', !kann)}
  </div>`);
}
function fExport(){
  const m = T().sicherung.passwortMindestens;
  fenster(`${fk('Backup erstellen','Ein Ordner mit Datum, mit deinem Passwort verschlüsselt.')}
   <form class="felder" data-form="export">
    <label>Passwort (mindestens ${m} Zeichen) <input class="feld" type="password" name="p1" required minlength="${m}" autocomplete="new-password"></label>
    <label>Passwort wiederholen <input class="feld" type="password" name="p2" required minlength="${m}" autocomplete="new-password"></label>
    <button class="knopf gruen voll" type="submit">Ordner wählen und Backup erstellen ${ic('pfeil')}</button>
   </form>
   <p class="hinweis">Ohne Passwort kommt niemand hinein – auch du nicht. Danach bekommst du einen Notfallschlüssel für den Fall, dass du es vergisst.</p>`);
}
function fImport(){
  const a = sich.art;
  fenster(`${fk('Backup einlesen', esc(a.name) + (a.erstellt ? ' · vom ' + echtDatum(a.erstellt) : ''))}
   <form class="felder" data-form="import">
    ${a.verschluesselt ? `<label>Passwort <input class="feld" type="password" name="passwort" autocomplete="current-password"></label>
    <label>oder Notfallschlüssel <input class="feld" name="notfall" autocomplete="off" placeholder="nur wenn das Passwort fehlt"></label>` : '<p class="hinweis">Diese Sicherung ist nicht verschlüsselt.</p>'}
    <button class="knopf gruen voll" type="submit">Prüfen und hereinholen ${ic('pfeil')}</button>
   </form>
   <p class="hinweis">Erst wird jede Datei geprüft, dann hereingeholt. Was schon in der Akte liegt, wird nicht überschrieben.</p>`);
}
Object.assign(A, {
 'sich-export': fExport, import: () => { menueZu(); fImportWahl(); }, export: async () => { menueZu(); await kopieLaden(); fSicherung(); },
 'kopie-neu': fKopie,
 'kopie-jetzt': async () => { if (echt.laeuft) return; echt.laeuft = true; toast('Kopie läuft …');
   try { const r = await T().kopie.sichern(`Private Akte ${FASSUNG}`, false); toast(r && r.zweit.ok ? 'Kopie ist auf dem neuesten Stand.' : (r && r.zweit.grund) || 'Kopie nicht gelungen.'); }
   catch (err) { toast(fehlerText(err)); } finally { echt.laeuft = false; await kopieLaden(); fSicherung(); } },
 'kopie-weg': async () => { if (!confirm('Kopie beenden? Die Kopie dort bleibt liegen.')) return; await T().kopie.beenden(); await kopieLaden(); fSicherung(); },
 'sich-import': async () => { try { sich.art = await T().sicherung.importWaehlen(); fImport(); } catch (err) { const m = zugangFehler(err); if (m) toast(m); } },
 'sich-blatt': () => geben(new Blob([sich.notfallblatt], {type:'text/plain'}), `Notfallblatt_${sich.ordner}.txt`).catch(err => toast(fehlerText(err)))
});
document.addEventListener('submit', async ev => {
  const f = ev.target, art = f.dataset.form; if (art !== 'export' && art !== 'import' && art !== 'kopie') return; ev.preventDefault();
  if (echt.laeuft) return; const knopf = f.querySelector('button[type=submit]');
  if (art === 'kopie') {
    const p = f.p1.value, falsch = p !== f.p2.value ? 'Die beiden Passwörter sind nicht gleich.' : T().sicherung.passwortPruefen(p);
    if (falsch) { toast(falsch); return; }
    echt.laeuft = true; knopf.disabled = true;
    try {
      const r = await T().kopie.einrichten(p, `Private Akte ${FASSUNG}`); sich.notfallblatt = r.notfallblatt || ''; sich.ordner = r.name;
      await kopieLaden();
      fenster(`${fk('Kopie eingerichtet', esc(r.name))}
       <p class="hinweis">${r.lauf && r.lauf.zweit.ok ? 'Die erste Kopie liegt dort.' : '<b class="warn">' + esc((r.lauf && r.lauf.zweit.grund) || 'Die erste Kopie ist nicht gelungen.') + '</b>'}</p>
       ${r.notfall ? `<div class="blatt"><small>Notfallschlüssel · öffnet die Kopie auch ohne Passwort</small><b id="notfall">${esc(r.notfall)}</b></div>
       <div class="reihe"><button class="knopf hell" data-a="sich-blatt">Notfallblatt speichern</button></div>` : ''}`);
    } catch (err) { const m = zugangFehler(err); if (m) toast(m); } finally { echt.laeuft = false; knopf.disabled = false; }
    return;
  }
  if (art === 'export') {
    const p = f.p1.value, falsch = p !== f.p2.value ? 'Die beiden Passwörter sind nicht gleich.' : T().sicherung.passwortPruefen(p);
    if (falsch) { toast(falsch); return; }
    echt.laeuft = true; knopf.disabled = true;
    try {
      const r = await T().sicherung.exportieren(p, `Private Akte ${FASSUNG}`); sich.notfallblatt = r.notfallblatt || ''; sich.ordner = r.ordner;
      try { localStorage.setItem(EXPORT_MERKER, JSON.stringify({ziel:r.ziel, ordner:r.ordner, erstellt:r.erstellt, dateien:r.dateien})); } catch { /* nur eine Merkhilfe */ }
      fenster(`${fk('Backup erstellt','verschlüsselt · ' + r.dateien + (r.dateien===1?' Datei':' Dateien'))}
       <p class="hinweis" id="backup-gelernt">${r.gelernt ? `Mit dabei: das Gelernte des Datei-Organizers (${r.gelernt.regeln} ${r.gelernt.regeln===1?'Regel':'Regeln'}, ${r.gelernt.kategorien} eigene ${r.gelernt.kategorien===1?'Kategorie':'Kategorien'}).` : '<b class="warn">Das Gelernte des Datei-Organizers konnte nicht mitgesichert werden.</b>'}</p>
       <dl class="angaben"><dt>Gewählt</dt><dd>${esc(r.ziel)}</dd><dt>Darin neu</dt><dd style="overflow-wrap:anywhere">${esc(r.ordner)}</dd><dt>Stand</dt><dd>${echtDatum(r.erstellt)}</dd></dl>
       <div class="blatt"><small>Notfallschlüssel · öffnet diese Sicherung auch ohne Passwort</small><b id="notfall">${esc(r.notfall || '')}</b></div>
       <div class="reihe"><button class="knopf" data-a="sich-blatt">Notfallblatt speichern</button><button class="knopf hell" data-a="zu">Fertig</button></div>
       <p class="hinweis">Du findest die Sicherung in der Dateien-App: im gewählten Ordner „${esc(r.ziel)}“ liegt der neue Ordner. Das Notfallblatt ausdrucken und zu den wichtigen Papieren legen – nicht zur Sicherung.</p>`);
    } catch (err) { knopf.disabled = false; const m = zugangFehler(err); if (m) toast(m); } finally { echt.laeuft = false; }
  } else {
    const zugang = f.passwort && f.passwort.value ? {passwort:f.passwort.value} : f.notfall && f.notfall.value.trim() ? {notfall:f.notfall.value.trim()} : undefined;
    echt.laeuft = true; knopf.disabled = true;
    try {
      const probe = await T().sicherung.importPruefen(zugang);
      if (!probe.ok) { knopf.disabled = false; toast('Die Sicherung ist nicht in Ordnung: ' + probe.fehler.slice(0,2).join(' · ')); return; }
      const r = await T().sicherung.importieren(zugang, probe.zusammen ? probe.zusammen.revision : undefined);
      zu(); await echtLaden();
      const g = r.gelernt || {}, gText = g.grund === 'notfall' ? ' Das Gelernte des Datei-Organizers lässt sich nur mit dem Passwort einlesen, nicht mit dem Notfallschlüssel.' : g.grund === 'unlesbar' ? ' Das Gelernte im Backup war nicht lesbar.' : (g.regeln || g.kategorien) ? ` Gelerntes dazu: ${g.regeln} ${g.regeln===1?'Regel':'Regeln'}${g.kategorien ? `, ${g.kategorien} eigene ${g.kategorien===1?'Kategorie':'Kategorien'}` : ''}.` : '';
      toast((r.zusammengefuehrt ? `Zusammengeführt: ${r.zusammengefuehrt.neu} neu, ${r.kopiert} ${r.kopiert===1?'Datei':'Dateien'} hereingeholt.` : `Hereingeholt: ${r.kopiert} ${r.kopiert===1?'Datei':'Dateien'}.`) + gText);
    } catch (err) { knopf.disabled = false; const m = zugangFehler(err); if (m) toast(m); } finally { echt.laeuft = false; }
  }
});
/* Wird die Ansicht neu gezeichnet (Finden, Wechsel, Zurück), endet ein laufendes Diktat – sonst hört das Mikrofon unsichtbar weiter. */
/* Neu zeichnen ohne Sprung: Rollstand der Listen in den Karten bleibt (Auge, Stift unter der Zeile). */
function mainZeigen(){ if (sprech.an && sprech.sitzung) { sprech.sitzung.stop(); sprech.an = false; }
  const roll = [...document.querySelectorAll('main .eliste, main .ebaumkarte')].map(e => [e.id || e.className, e.scrollTop]);
  $('main').innerHTML = ({start:vStart, akten:vAkten, eingang:vEingang, baum:vBaum})[s.ansicht](); kachelRaster(); kartenHoehe();
  for (const [k, t] of roll) { const e = [...document.querySelectorAll('main .eliste, main .ebaumkarte')].find(x => (x.id || x.className) === k); if (e) e.scrollTop = t; }
  if (echt.vor && $('evorschau')) echtVorschau(echt.vor); }
/* Höhe der zwei Karten (Klaus 18.11.): keine Karte höher als der Bildschirm, die rechte höchstens so hoch wie die linke (aber nie
   niedriger als 300 px); was nicht hineinpasst, rollt in der Karte – die Seite selbst bleibt kurz, „Fällig“ und „Bereiche“ bleiben
   sichtbar. Untereinander (schmal) zählt nur die Bildschirmhöhe. */
function kartenHoehe(){
  /* Nebeneinander (Klaus 18.11.: „an die Fensterhöhe anpassen, unten ist noch zu viel Platz“): die Karten reichen genau bis zum
     unteren Fensterrand – gemessen wird, wo sie anfangen und wie viel Platz das darunter („Fällig“, „Bereiche“) braucht; mindestens
     300 px. Untereinander (Handy): der Baum höchstens halb so hoch wie das Fenster, die Liste so hoch wie das Fenster. */
  for (const ex of document.querySelectorAll('.eexplorer')) {
    const l = ex.querySelector('.ebaumkarte'), r = ex.querySelector('.elistekarte'); if (!l || !r) continue;
    /* Rollstand merken: ohne Höhe wäre er sonst weg (der Browser kürzt ihn beim Messen auf 0). */
    const li = r.querySelector('.eliste'), stand = [l.scrollTop, li ? li.scrollTop : 0];
    const zurueck = () => { l.scrollTop = stand[0]; if (li) li.scrollTop = stand[1]; };
    const nebeneinander = getComputedStyle(ex).gridTemplateColumns.split(' ').length > 1;
    l.style.height = r.style.height = l.style.maxHeight = r.style.maxHeight = '';
    /* Beide zugeklappt (Klaus 18.11.): die Karten so niedrig wie ihr Inhalt – alles darunter rutscht hoch. */
    const listeZu = !r.querySelector('.eliste'), baumZu = !!l.querySelector('[data-ebaum=zu]');
    if (listeZu && baumZu) { ex.classList.add('beidezu'); continue; } ex.classList.remove('beidezu');
    if (nebeneinander) {
      const oben = ex.getBoundingClientRect().top + scrollY, huelle = ex.closest('#echt') || ex;
      let darunter = 0; for (let n = huelle.nextElementSibling; n && !n.matches('footer, .fuss'); n = n.nextElementSibling) { const m = getComputedStyle(n); darunter += n.offsetHeight + parseFloat(m.marginTop) + parseFloat(m.marginBottom); }
      const h = Math.max(300, Math.floor(innerHeight - oben - darunter - 18)) + 'px'; l.style.height = r.style.height = h;
    } else { l.style.maxHeight = Math.max(200, Math.floor(innerHeight * 0.5)) + 'px'; r.style.maxHeight = Math.max(320, innerHeight - 70) + 'px'; }
    zurueck();
  }
}
addEventListener('resize', () => kartenHoehe());
/* Bereichs-Knöpfe (Klaus 18.11.): erst eine Reihe ganz füllen, dann die nächste – höchstens drei Reihen; sind es mehr, stehen sie in
   drei Reihen und lassen sich seitlich schieben. Die Knöpfe behalten ihre Größe (so breit wie ihr Text, Klaus: „nicht größer ziehen“). */
function kachelRaster(){ const o = document.querySelector('.bereichsraster'); if (!o) return; o.classList.remove('viele'); if (matchMedia('(max-width:699px)').matches) return; const reihen = new Set([...o.children].map(k => k.offsetTop)).size; o.classList.toggle('viele', reihen > 3); }
addEventListener('resize', () => kachelRaster());
function zeigen(){ navZeigen(); mainZeigen(); }
farbeAkte(); kopfZeigen(); zeigen(); echtLaden().finally(() => { glockeStarten(); empfangStarten(); kopieAuto(); }); bedPruefen(); /* die Glocke erst, wenn die Akte den Tresor geöffnet hat – nie zwei zugleich beim ersten Anlegen */
/* Neue Fassung: der Browser fragt sw.js immer beim Server (updateViaCache none), beim Start und beim Zurückkommen.
   Übernimmt ein neuer Worker, zeigt die Fassungsmarke „neu“; neu geladen wird erst auf Tipp, damit keine Eingabe verloren geht. */
let swReg = null;
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  const hatte = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).then(r => { swReg = r; r.update().catch(() => {}); }).catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hatte) { const f = $('fassung'); f.classList.add('neu'); f.textContent = 'Neue Fassung · antippen'; } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && swReg) swReg.update().catch(() => {}); });
}
/* Updates mit Fähnchen (Klaus 19.11.2026, nur in der Android-App): DoUpdates aus dem Klon Datei-Organizer fragt beim Server der Akte
   (Ziel im Manifest), prüft Unterschrift, Größe, SHA-256, Paket, Zertifikat und versionCode und öffnet Androids Installieren-Fenster.
   Still geprüft beim Start, beim Zurückholen der App und höchstens alle 15 Minuten (nach einem Fehler 2 Minuten). */
const nativUpdates = () => { const c = window.Capacitor; return c && c.isNativePlatform && c.isNativePlatform() && c.Plugins && c.Plugins.DoUpdates || null; };
const upd = { neu: '', ruhe: 0, laeuft: false };
async function updatePruefen(laut){
  const u = nativUpdates(); if (!u || upd.laeuft || (!laut && Date.now() < upd.ruhe)) return null;
  upd.laeuft = true;
  try {
    const r = await u.pruefen(); upd.ruhe = Date.now() + 15 * 60000; upd.neu = r && r.neu || '';
    const f = $('update-fahne'); f.hidden = !upd.neu; f.textContent = upd.neu ? 'Update ' + upd.neu : '';
    if (laut && !upd.neu) toast(`${FASSUNG} ist aktuell.`);
    return r;
  } catch (e) { upd.ruhe = Date.now() + 2 * 60000; if (laut) toast(String(e && (e.code || e.message) || e) === 'UPDATE_NICHT_EINGERICHTET' ? 'Updates sind noch nicht eingerichtet.' : 'Update-Server gerade nicht erreichbar.'); return null; }
  finally { upd.laeuft = false; }
}
A['update-laden'] = async () => {
  const u = nativUpdates(); if (!u) return;
  if (!upd.neu) { await updatePruefen(true); if (!upd.neu) return; }
  const f = $('update-fahne'); f.textContent = 'Lädt …';
  const h = u.addListener ? await u.addListener('stand', s => { if (s && s.groesse) f.textContent = Math.round(s.geladen * 100 / s.groesse) + ' %'; }) : null;
  try { const r = await u.installieren(); if (r && r.erlaubnis) toast('Bitte „Apps installieren“ erlauben, dann noch einmal auf das Fähnchen tippen.', 8000); }
  catch (e) { upd.neu = ''; upd.ruhe = 0; toast('Update nicht geladen – die Datei bestand die Prüfung nicht oder der Server war nicht erreichbar.', 8000); }
  finally { if (h && h.remove) h.remove(); f.textContent = upd.neu ? 'Update ' + upd.neu : ''; f.hidden = !upd.neu; }
};
if (nativUpdates()) {
  setTimeout(() => updatePruefen(false), 4000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updatePruefen(false); });
}
A['neu-laden'] = async () => {
  if (nativUpdates()) { await updatePruefen(true); if (upd.neu) A['update-laden'](); return; }
  toast('Sehe nach einer neuen Fassung …');
  try { if (swReg) await swReg.update(); await fetch('./index.html', {cache:'reload'}); } catch (e) {}
  location.reload();
};

/* ---------- Tooltips: Maus oder Stift über einem Knopf, ohne Klick; abschaltbar in der Hilfe ---------- */
let tippZeit;
function tippWeg(){ clearTimeout(tippZeit); $('tipp').hidden = true; }
function tippZeigen(e){
  const el = $('tipp'); el.innerHTML = `<b>${esc(e.dataset.tipp)}</b>${e.dataset.tipp2 ? `<small>${esc(e.dataset.tipp2)}</small>` : ''}`; el.hidden = false;
  const r = e.getBoundingClientRect(), b = el.getBoundingClientRect();
  el.style.left = Math.max(8, Math.min(innerWidth - b.width - 8, r.left + r.width/2 - b.width/2)) + 'px';
  el.style.top = (r.bottom + 8 + b.height > innerHeight ? r.top - b.height - 8 : r.bottom + 8) + 'px';
}
document.addEventListener('pointerover', ev => { if (ev.pointerType === 'touch') return; const e = ev.target.closest('[data-tipp]'); if (!e || (!s.tipps && !e.dataset.immer)) return; clearTimeout(tippZeit); tippZeit = setTimeout(() => tippZeigen(e), 400); });
document.addEventListener('pointerout', ev => { if (ev.target.closest('[data-tipp]')) tippWeg(); });
document.addEventListener('focusin', ev => { const e = ev.target.closest('[data-tipp]'); if (s.tipps && e && e.matches(':focus-visible')) tippZeigen(e); });
document.addEventListener('focusout', tippWeg);
/* Textfelder wachsen mit dem Text (getippt oder gesprochen); der Griff unten rechts zum Ziehen bleibt. */
function feldWachsen(f){ if (CSS.supports('field-sizing','content')) return; f.style.height = 'auto'; f.style.height = Math.min(f.scrollHeight + 2, innerHeight * .6) + 'px'; }
document.addEventListener('input', ev => { if (ev.target.matches('textarea.feld')) feldWachsen(ev.target); });
document.addEventListener('pointerdown', tippWeg);
addEventListener('scroll', tippWeg, true);
document.addEventListener('change', ev => { if (ev.target.matches('[data-tippwahl]')) { s.tipps = ev.target.checked; toast(s.tipps ? 'Tooltips sind an.' : 'Tooltips sind aus.'); } });

/* ---------- Suchfeld: X löscht die Eingabe, Mikrofon spricht sie ein (Diktat der Familienakte über tresor.js) ---------- */
const suchFeld = () => document.querySelector('.suche input[name=q]');
function sprechEnde(suchen){ if (sprech.sitzung) sprech.sitzung.stop(); sprech.an = false; const k = document.querySelector('[data-a=suche-mikro]'); if (k) k.classList.remove('an');
  const f = suchFeld(); if (suchen && f && f.value.trim()) { s.frage = f.value.trim(); s.wahl.clear(); zeigen(); } }
A['suche-leer'] = () => { sprechEnde(false); s.frage = ''; s.wahl.clear(); zeigen(); const f = suchFeld(); if (f) f.focus(); };
A['suche-mikro'] = e => {
  if (sprech.an) { sprechEnde(true); return; }
  if (!sprech.sitzung) sprech.sitzung = T().diktat.sitzung({
    text: t => { const f = suchFeld(); if (f) { f.value = t; const x = document.querySelector('[data-a=suche-leer]'); if (x) x.hidden = !t; vorBald(); } },
    zustand: an => { const k = document.querySelector('[data-a=suche-mikro]'); if (k) k.classList.toggle('an', an); if (!an && sprech.an && !sprech.sitzung.active) sprech.an = false; },
    hinweis: (t, fehler) => { if (t && (fehler || /bitte tippen/.test(t))) { sprech.an = false; toast(t); } }
  });
  sprech.an = true; sprech.sitzung.start(suchFeld() ? suchFeld().value : '', false);
};
document.addEventListener('input', ev => { if (ev.target.matches('.suche input[name=q]')) { const x = document.querySelector('[data-a=suche-leer]'); if (x) x.hidden = !ev.target.value; vorBald(); } });
/* Vorschläge schon beim Tippen oder Sprechen (0.6.2, Klaus 18.11.: „wie bei den E-Mails von Microsoft – die ersten Buchstaben, und er
   zeigt schon, was es sein könnte“). Ab zwei Zeichen stehen unter dem Suchfeld bis zu sechs Unterlagen: jedes getippte Wort muss
   ein Wortanfang im Titel, Dateinamen, Bereich, in der Notiz oder im gelesenen Text sein (Titel zählt doppelt); dazu, was die
   Wortsuche des Klons findet. Das ist nur eine schnelle Vorschau in der Hülle – „Finden“ sucht unverändert (Wortsuche und
   Bedeutungssuche des Kerns), am Kern ändert sich nichts. Ein Tipp auf einen Vorschlag öffnet die Unterlage. */
const vor = { zeit:0, heu:new Map() };
const vorNorm = t => String(t || '').toLowerCase().replace(/ß/g, 'ss').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ');
function vorHeu(d){ let h = vor.heu.get(d.id); if (!h) { h = {titel:' ' + vorNorm(echtTitel(d) + ' ' + (d.originalName || '')), rest:' ' + vorNorm((d.category || '') + ' ' + (d.notes || '') + ' ' + (d.textAuszug || ''))}; vor.heu.set(d.id, h); } return h; }
function suchVorschlaege(frage){
  const w = vorNorm(frage).trim().split(' ').filter(Boolean); if (w.join('').length < 2 || !echt.liste) return [];
  const treffer = [];
  for (const d of echt.liste) { const h = vorHeu(d); let p = 0; for (const x of w) { if (h.titel.includes(' ' + x)) p += 2; else if (h.rest.includes(' ' + x)) p += 1; else { p = -1; break; } } if (p > 0) treffer.push([p, d]); }
  try { for (const id of T().suchen(frage, echt.liste)) if (!treffer.some(t => t[1].id === id)) { const d = echt.liste.find(x => x.id === id); if (d) treffer.push([0.5, d]); } } catch { /* die Vorschau kommt dann nur aus den Wortanfängen */ }
  return treffer.sort((a, b) => b[0] - a[0] || String(b[1].addedAt || '').localeCompare(String(a[1].addedAt || ''))).slice(0, 6).map(t => t[1]);
}
function vorZeigen(){ const f = suchFeld(), o = $('suchvor'); if (!o) return; const t = f ? f.value.trim() : ''; const l = t && t !== s.frage ? suchVorschlaege(t) : []; o.innerHTML = l.length ? `<div class="liste vorliste">${l.map(d => echtZeile(d, '')).join('')}</div>` : ''; }
function vorBald(){ clearTimeout(vor.zeit); vor.zeit = setTimeout(vorZeigen, 120); }

/* ---------- Bedeutungssuche hinter „Finden“ (Klaus 17.11.): kein eigener Knopf. Nach jedem „Finden“ fragt eine Zeile unter der
   Suchleiste „Ja / Nein“, solange das Sprachmodell nicht geladen ist; „Nein“ blendet sie bis zum nächsten „Finden“ aus.
   Geladen und gerechnet wird über tresor.js mit den Teilen der Familienakte. ---------- */
const mb = n => Math.round(n / 1e6).toLocaleString('de-DE') + ' MB';
const bedStand = () => (echt.liste || []).map(d => d.id + ':' + (d.updatedAt || d.addedAt || '')).join('|');
const BED_FEHLER = { APP_OFFLINE:'Das Internet ist ausgeschaltet.', MODEL_CHECKSUM:'Eine geladene Datei war beschädigt. Bitte noch einmal.', CANCELLED:'' };
function bedZeile(){
  if (!T() || !T().bedeutung.moeglich() || bed.geladen === null) return '';
  if (bed.phase === 'laden') { const p = Math.min(100, Math.round(100 * bed.fertig / (bed.gesamt || 1)));
    return `<div class="bedzeile" role="status"><span>Lädt das Sprachmodell … ${mb(bed.fertig)} von rund ${mb(bed.gesamt)}${bed.quelle ? ` · von ${esc(bed.quelle)}` : ''}</span><progress max="100" value="${p}"></progress><button class="knopf hell klein" data-a="bed-stopp">Abbrechen</button></div>`; }
  if (bed.phase === 'lesen') return `<div class="bedzeile" role="status"><span>Liest deine Unterlagen …${bed.gesamt ? ` ${bed.fertig} von ${bed.gesamt}` : ''}</span><progress ${bed.gesamt ? `max="${bed.gesamt}" value="${bed.fertig}"` : ''}></progress></div>`;
  if (bed.fehler) return `<div class="bedzeile fehler" role="status"><span>${esc(bed.fehler)}</span><button class="knopf hell klein" data-a="bed-ja">Noch einmal</button><button class="knopf hell klein" data-a="bed-nein">Schließen</button></div>`;
  if (bed.geladen) return bed.sucht ? `<div class="bedzeile still" role="status"><span>Sucht auch nach Bedeutung …${bed.lage ? ' ' + esc(bed.lage) : ''}</span></div>` : '';
  if (!bed.frage) return '';
  return `<div class="bedzeile" id="bed-frage"><span><b>Auch nach Bedeutung suchen?</b> Dann findet „Finden“ auch, was nur dem Sinn nach passt. Dafür wird einmal ein Sprachmodell auf dieses Gerät geladen (rund 140 MB).</span><button class="knopf klein" data-a="bed-ja">Ja</button><button class="knopf hell klein" data-a="bed-nein">Nein</button></div>`;
}
function bedZeigen(){ const o = $('bedort'); if (o) o.innerHTML = bedZeile(); const t = $('trefferort'); if (t && s.frage) t.innerHTML = treffer(); }
async function bedPruefen(){ try { if (T() && T().bedeutung.moeglich()) bed.geladen = (await T().bedeutung.zustand()).geladen; } catch (e) { bed.geladen = null; } bedZeigen(); }
async function bedSuchen(){
  const frage = s.frage; if (!frage || !bed.geladen || !T() || echt.liste === null) return;
  bed.sucht = true; bedZeigen();
  const takt = setInterval(() => { const l = T().bedeutung.lage ? T().bedeutung.lage() : ''; if (l !== bed.lage) { bed.lage = l; bedZeigen(); } }, 700);
  try { const h = await T().bedeutung.suchen(frage, bedStand()); bed.treffer = h; bed.zu = frage; }
  catch (e) { bed.treffer = []; bed.zu = ''; bed.fehler = 'Die Suche nach Bedeutung hat nicht geklappt. Die Wörter gelten.'; }
  finally { clearInterval(takt); bed.lage = ''; bed.sucht = false; if (s.frage === frage || !s.frage) bedZeigen(); }
}
A['bed-nein'] = () => { bed.frage = false; bed.fehler = ''; bedZeigen(); };
A['bed-stopp'] = async () => { try { await T().bedeutung.abbrechen(); } catch (e) {} };
A['bed-ja'] = async () => {
  if (bed.phase) return; bed.fehler = ''; bed.phase = 'laden'; bed.fertig = 0; bed.gesamt = 139e6; bedZeigen();
  try {
    await T().bedeutung.laden();
    for (;;) { const z = await T().bedeutung.zustand(); bed.fertig = z.fertig; bed.gesamt = z.gesamt; bed.quelle = z.quelle || ''; bedZeigen();
      if (z.geladen) break; if (z.fehler || !z.laeuft) throw new Error(z.fehler || 'MODEL_DOWNLOAD');
      await new Promise(r => setTimeout(r, 400)); }
    bed.geladen = true; bed.phase = 'lesen'; bed.fertig = 0; bed.gesamt = 0; bedZeigen();
    await T().bedeutung.lesen(bedStand(), (f, g) => { bed.fertig = f; bed.gesamt = g; bedZeigen(); });
    bed.phase = ''; bed.frage = false; bedZeigen(); toast('Die Suche nach Bedeutung ist eingerichtet.'); bedSuchen();
  } catch (e) {
    const k = e && e.message; bed.phase = '';
    bed.fehler = k === 'CANCELLED' ? '' : (BED_FEHLER[k] || (bed.geladen ? 'Das Lesen der Unterlagen hat nicht geklappt.' : 'Das Laden hat nicht geklappt. Besteht eine Internetverbindung?'));
    bedZeigen();
  }
};

/* ---------- Zurück (Klaus 17.11.): der Zurück-Knopf von Android, Browser oder Maus geht in der App einen Schritt zurück –
   erst das offene Fenster, dann das Menü, die Suche, der Bereich, die Ansicht. Erst am Anfang und beim zweiten Zurück
   kurz hintereinander verlässt man die App. Die App legt dafür je Schritt einen Eintrag in den Verlauf des Browsers. ---------- */
/* ---------- Klone im Rahmen (0.5.0, Klaus 17.11.): Datei-Organizer und Workflow PDF laufen unverändert in einem Rahmen ----------
   Die Seiten liegen unter rahmen/ (tools/rahmen-bauen.mjs): Brücke der Akte als erstes Skript, <base> auf den Klon, Farbdatei.
   Der Rahmen hat einen eigenen Ort (#rahmenort), damit ein Fenster der Akte (z. B. „Ordner in die Akte legen“) darüber aufgehen
   kann, ohne dass der Klon neu lädt. Nachrichten nur vom eigenen Ursprung und nur aus dem offenen Rahmen. */
const RAHMEN = {
 organizer:{name:'Datei-Organizer', unter:'Dateien sortieren, dann an die Akte übergeben', seite:'datei-organizer/app/index.html', stil:farbStilFest(['#aee2cc','#cdeede','#e4f3d6'],'#0f4a43','#107c41','#e4f1eb')},
 kalender:{name:'Kalender', unter:'Termine, Fristen und Notizen', seite:'kalender/index.html', stil:farbStilFest(['#d9cdf3','#e8e0f8','#f3effb'],'#3b2372','#5b3aa6','#efeaf9')},
 /* Private Brain (0.7.0): die echte, veröffentlichte Web-App unter ihrer eigenen Adresse (dieselbe Seite wie Pages von Privat-Brain-Pro),
    unverändert und mit eigenem Speicher. Ein Klon Datei für Datei liefe nicht: die Web-Seite entsteht dort erst beim Bauen (`build:web`). */
 brain:{name:'Private Brain', unter:'Mails und Dateien – die eigene App', url:window.PA_PRO ? './klone/privat-brain-pro/index.html' : '../Privat-Brain-Pro/', stil:farbStilFest(['#f9c9ad','#fcdcc8','#fdeee4'],'#6b2a12','#c2552c','#fbece4')},
 wfpdf:{name:'Workflow PDF', unter:'Scannen, ausfüllen, bearbeiten – „Teilen“: in die Akte oder an ein anderes Programm', seite:'workflow-pdf/index.html', stil:farbStilFest(['#f6c3cb','#fbdde1','#fdeef0'],'#6b1226','#9b1f38','#f8e6e9')}
};
function farbStilFest(k, schrift, akz, fl){ return `--k1:${k[0]};--k2:${k[1]};--k3:${k[2]};--schrift:${schrift};--akz:${akz};--fl:${fl}`; }
const rahmen = { was:null, wartet:null };
/* In der Pro-App gibt es kein ../ neben der Akte: dort die veröffentlichte Adresse (Android/Windows öffnen sie im Browser bzw. der installierten App). */
const FAMILIENBUERO = window.PA_PRO ? 'https://lausiklauskn-png.github.io/Familienbuero-Pro/' : '../Familienbuero-Pro/';
function fRahmen(was, frage = '', dateien = null){
  const r = RAHMEN[was]; zu(); rahmen.was = was; rahmen.wartet = dateien;
  $('rahmenort').innerHTML = `<div class="rahmenfenster" style="${r.stil}" role="dialog" aria-modal="true" aria-label="${r.name}">
   <div class="fkopf"><h2>${r.name}<small>${r.unter}</small></h2><span class="rahmenmeldung" id="rahmen-meldung" role="status" aria-live="polite"></span>${glockeKnopf()}<button class="knopf hell klein" data-a="rahmen-zu">‹ Akte</button></div>
   <iframe id="rahmen" title="${r.name}" allow="camera; microphone; clipboard-write; web-share; fullscreen"></iframe></div>`;
  /* Lädt im Rahmen je die ungepatchte Startseite des Klons (Neuladen, Link „zurück zur App“), kommt gleich wieder die Seite mit Brücke. */
  const f = $('rahmen');
  if (r.url) { f.src = r.url; return; }
  const adresse = `./rahmen/${r.seite}?v=${FASSUNG}${frage ? '&' + frage : ''}`;
  f.addEventListener('load', () => { try { const w = f.contentWindow; if (!w.document.documentElement.dataset.paEingebettet && /(~rahmen|\/|\/index\.html)$/.test(w.location.pathname)) f.src = `./rahmen/${r.seite}?v=${FASSUNG}`; } catch { /* fremde Seite: bleibt */ } });
  f.src = adresse;
}
/* Bestätigung in der Leiste des Rahmens (Klaus 18.11.: nach „PDF erstellen“ war nicht zu sehen, dass der Scan schon in der Akte liegt –
   die Meldung der Akte lag unter dem Rahmen, die im Klon wurde von dessen eigener überschrieben). Bleibt 12 s stehen. */
let rahmenMeldZeit = 0;
function rahmenMelden(t, gut = true){ const o = $('rahmen-meldung'); if (!o) return; o.textContent = (gut ? '✓ ' : '') + t; o.className = 'rahmenmeldung an' + (gut ? '' : ' schlecht'); clearTimeout(rahmenMeldZeit); rahmenMeldZeit = setTimeout(() => { o.textContent = ''; o.className = 'rahmenmeldung'; }, 12000); }
function rahmenZu(){ $('rahmenort').innerHTML = ''; rahmen.was = null; rahmen.wartet = null; echtLaden().then(() => { if (s.ansicht === 'start') mainZeigen(); }).catch(() => {}); }
/* Kalender und Notizen (0.6.0): die Ansicht der Familienakte läuft im Rahmen (rahmen/kalender). Sie meldet, was gespeichert wurde
   (steht dann in der Leiste des Rahmens), und dass sich etwas geändert hat (dann stimmen „Fällig“, der Baum und die Glocke wieder).
   Die Glocke ist dieselbe Seite noch einmal, unsichtbar, nur mit der App-Glocke des Klons: sie läutet, solange die Akte offen ist;
   zu sehen ist sie nie – die Akte zeigt das Glockensymbol und das Glockenfeld. */
function glockeStarten(){ if ($('glocke') || !T()) return; const f = document.createElement('iframe'); f.id = 'glocke'; f.title = 'Erinnerung'; f.hidden = true; f.src = `./rahmen/kalender/index.html?v=${FASSUNG}&nur=glocke`; document.body.appendChild(f); }
addEventListener('message', async ev => {
  if (ev.origin !== location.origin) return; const d = ev.data || {}, k = $('rahmen'), g = $('glocke');
  const ausKalender = k && rahmen.was === 'kalender' && ev.source === k.contentWindow, ausGlocke = g && ev.source === g.contentWindow;
  if (!ausKalender && !ausGlocke) return;
  if (d.typ === 'pa-kalender-meldung' && ausKalender) rahmenMelden(String(d.text || ''), d.gut !== false);
  if (d.typ === 'pa-kalender-geaendert') { const vorher = JSON.stringify(echt.termine); await termineLaden(); if (ausKalender && g) g.contentWindow.location.reload(); /* neu zeichnen nur, wenn sich wirklich etwas geändert hat – sonst klappt zu, was gerade aufgeklappt wurde */ if (ausGlocke && vorher !== JSON.stringify(echt.termine) && s.ansicht === 'start' && !$('rahmenort').innerHTML && !$('fensterort').innerHTML && !s.frage && !sprech.an) mainZeigen(); }
  if (d.typ === 'pa-glocke' && ausGlocke) { glocke.laeutet = !!d.an; glockeNeu(); } /* läutet es, wackelt nur die Glocke; der Rahmen der Glocke bleibt unsichtbar (Ton und Meldung des Geräts kommen von dort) */
  /* Seitenleiste der Familienakte im Kalender: Zurück und Startseite schließen den Kalender, „Seite wählen“ zeigt den Baum, Hilfe die Hilfe der Akte. */
  if (d.typ === 'pa-kalender-geh' && ausKalender) { rahmenZu(); if (d.wohin === 'start' || d.wohin === 'baum') { s.ansicht = d.wohin; s.bereich = null; s.frage = ''; zu(); zeigen(); scrollTo(0, 0); } if (d.wohin === 'hilfe') A.hilfe(); }
  if (d.typ === 'pa-kalender-oeffnen' && ausGlocke) fRahmen('kalender', `tag=${encodeURIComponent(String(d.tag || ''))}&id=${encodeURIComponent(String(d.id || ''))}`);
});
A['echt-wfpdf'] = async e => {
  try { const d = (echt.liste || []).find(x => x.id === e.dataset.id), datei = await T().datei(e.dataset.id); fRahmen('wfpdf', '', [new File([datei], (d && d.originalName) || datei.name, {type:datei.type, lastModified:datei.lastModified})]); }
  catch (err) { toast(fehlerText(err)); }
};
/* Übergabe aus dem eigenständigen Datei-Organizer (0.7.4, Organizer 0.4.19, Klaus 18.11.): er öffnet `?empfang=organizer` im selben
   Browser; sobald der Tresor offen ist, meldet die Akte „pa-empfang-bereit“ an das öffnende Fenster und nimmt dasselbe Paket an wie
   aus dem Rahmen. Nur Fenster derselben Adresse. */
const empfang = { an:new URLSearchParams(location.search).get('empfang') === 'organizer' && !!window.opener, uhr:0 };
function empfangStarten(){ if (!empfang.an || empfang.uhr) return; const sag = () => { try { window.opener.postMessage({typ:'pa-empfang-bereit'}, location.origin); } catch { clearInterval(empfang.uhr); } }; sag(); empfang.uhr = setInterval(sag, 500); setTimeout(() => clearInterval(empfang.uhr), 120000); }
addEventListener('message', async ev => {
  const f = $('rahmen'), ausRahmen = !!f && ev.source === f.contentWindow, ausOpener = empfang.an && ev.source === window.opener;
  if (ev.origin !== location.origin || (!ausRahmen && !ausOpener)) return;
  if (ausOpener && (ev.data || {}).typ !== 'pa-organizer-uebergabe') return;
  if (ausOpener) clearInterval(empfang.uhr);
  const d = ev.data || {}, antwort = m => { try { ev.source.postMessage(m, location.origin); } catch { /* Fenster ist schon zu */ } };
  if (d.typ === 'pa-wfpdf-bereit' && rahmen.wartet) { const dateien = rahmen.wartet; rahmen.wartet = null; antwort({typ:'pa-wfpdf-oeffnen', id:'akte', dateien}); return; }
  if (d.typ === 'pa-organizer-uebergabe') {
    try {
      if (typeof d.index !== 'string' || !Array.isArray(d.dateien) || !d.dateien.length) throw new Error('Die Übergabe ist leer.');
      const r = T().organizer.ausStapel(String(d.ordner || 'Datei-Organizer'), d.index, d.dateien);
      Object.assign(ord, r); antwort({typ:'pa-organizer-angenommen', id:d.id, ok:true, text:`${r.stuecke.length} ${r.stuecke.length === 1 ? 'Datei liegt' : 'Dateien liegen'} zur Auswahl in der Privaten Akte bereit.`});
      fOrdner();
    } catch (err) { antwort({typ:'pa-organizer-angenommen', id:d.id, ok:false, text:fehlerText(err)}); toast(fehlerText(err)); }
    return;
  }
  if (d.typ === 'pa-wfpdf-ablegen') {
    /* Aus Workflow PDF („Teilen“ oder fertiger Scan): gleich ablegen, Text vorher lesen; Bereich „Sonstiges“, später änderbar ist er nicht – steht in CLAUDE.md. */
    try {
      const dateien = (Array.isArray(d.dateien) ? d.dateien : []).filter(x => x instanceof File); if (!dateien.length) throw new Error('Keine Datei angekommen.');
      let neu = 0, da = 0;
      for (const datei of dateien) {
        let text = ''; if (T().textLesbar(datei)) { try { text = (await T().textLesen(datei)).text; } catch { text = ''; } }
        try { await T().ablegen(datei, {bereich:'Sonstiges', datum:null, titel:null, notiz:d.quelle === 'scan' ? 'Scan aus Workflow PDF' : 'Aus Workflow PDF', text}); neu++; }
        catch (err) { if (/Dublette|schon abgelegt/.test(fehlerText(err) + (err && err.message || ''))) da++; else throw err; }
      }
      await echtLaden();
      const t = neu ? `${neu === 1 ? '„' + dateien[0].name + '“ liegt' : neu + ' Dateien liegen'} jetzt in der Privaten Akte (Sonstiges).` : 'Lag schon in der Privaten Akte.';
      antwort({typ:'pa-wfpdf-abgelegt', id:d.id, ok:true, text:t}); toast(t); rahmenMelden(neu ? t.replace(' (Sonstiges)', '') + ' Zurück mit „‹ Akte“.' : t);
    } catch (err) { antwort({typ:'pa-wfpdf-abgelegt', id:d.id, ok:false, text:fehlerText(err)}); toast(fehlerText(err)); rahmenMelden(fehlerText(err), false); }
  }
});
/* ---------- Akte leeren (Klaus 18.11.: Backup anlegen, beiseite legen, dann alles leeren – auch die Tools) ---------- */
function fLeeren(){
  const n = (echt.liste || []).length, l = letzterExport();
  fenster(`${fk('Akte leeren', 'Endgültig – zurück geht es nur über ein Backup')}
   <p class="hinweis">${l ? `Letztes Backup: ${uhr(l.erstellt)} in „${esc(l.ziel)}“. Was danach dazukam, ist nicht gesichert.` : '<b class="warn">Es gibt noch kein Backup.</b> Was du jetzt leerst, ist weg.'}</p>
   <form data-form="leeren"><div class="liste">
    <label class="ordzeile"><input type="checkbox" class="haken" name="akte" checked><span class="mitte"><strong>Unterlagen in der Akte</strong><small>${n} ${n === 1 ? 'Unterlage' : 'Unterlagen'}, auch früher Herausgenommenes</small></span></label>
    <label class="ordzeile"><input type="checkbox" class="haken" name="kalender" checked><span class="mitte"><strong>Termine und Notizen</strong><small>${(echt.termine || []).length} offene Einträge im Kalender, ${echt.notizen || 0} ${echt.notizen === 1 ? 'Notiz' : 'Notizen'}</small></span></label>
    <label class="ordzeile"><input type="checkbox" class="haken" name="wfpdf" checked><span class="mitte"><strong>Bibliothek von Workflow PDF</strong><small>Scans und Arbeitskopien im Tool, samt seinen Einstellungen</small></span></label>
    <label class="ordzeile"><input type="checkbox" class="haken" name="organizer" checked><span class="mitte"><strong>Liste im Datei-Organizer</strong><small style="white-space:normal">nur die sortierte Liste und der Verlauf; die Originale im Ordner bleiben. <b>Was er aus deinen Korrekturen gelernt hat und deine eigenen Kategorien bleiben.</b></small></span></label></div>
    <label style="display:block;margin:10px 0">Zur Sicherheit das Wort <b>leeren</b> eintippen <input class="feld" name="wort" autocomplete="off" autocapitalize="off"></label>
    <div class="reihe"><button class="knopf rot" type="submit">Endgültig leeren</button><button class="knopf hell" type="button" data-a="zu">Abbrechen</button></div></form>`);
}
A['akte-leeren'] = () => fLeeren();
/* Der Kern bleibt (Klaus 18.11.: „das Gelernte soll niemals gelöscht werden – das ist der Kern“): im Datei-Organizer verschwinden nur die
   Liste der Dateien, der Verlauf, der gemerkte Ordner und ein angefangenes Einlesen. Die gelernten Regeln (im gemerkten Stand unter
   „regeln“) werden zurückgeschrieben, die Merker im Browser (eigene Kategorien u. a.) nicht angefasst. Wie „Organizer leeren“ dort. */
function organizerListeLeeren(){
  return new Promise((ok, nein) => {
    const auf = indexedDB.open('PrivateAkteOrganizer1', 1);
    auf.onupgradeneeded = () => auf.result.createObjectStore('kv');
    auf.onerror = () => nein(auf.error);
    auf.onsuccess = () => { const db = auf.result;
      try {
        const t = db.transaction('kv', 'readwrite'), kv = t.objectStore('kv'), lies = kv.get('zustand'); let regeln = [];
        lies.onsuccess = () => { const z = lies.result; regeln = z && Array.isArray(z.regeln) ? z.regeln : [];
          kv.clear().onsuccess = () => { if (regeln.length) kv.put({fassung:1, ordnerName:'', quelle:'', stufe:0, dateien:[], verlauf:[], regeln, zeit:new Date().toISOString()}, 'zustand'); }; };
        t.oncomplete = () => { db.close(); ok(regeln.length); }; t.onerror = t.onabort = () => { db.close(); nein(t.error); };
      } catch (e) { db.close(); nein(e); }
    };
  });
}
const dbWeg = name => new Promise(ok => { const q = indexedDB.deleteDatabase(name); q.onsuccess = q.onerror = q.onblocked = () => ok(); });
document.addEventListener('submit', async ev => { const f = ev.target; if (f.dataset.form !== 'leeren') return; ev.preventDefault();
  if (f.wort.value.trim().toLowerCase() !== 'leeren') { toast('Bitte das Wort „leeren“ eintippen.'); return; }
  if (!f.akte.checked && !f.kalender.checked && !f.wfpdf.checked && !f.organizer.checked) { toast('Nichts gewählt.'); return; }
  const knopf = f.querySelector('button[type=submit]'); knopf.disabled = true; knopf.textContent = 'Wird geleert …';
  try {
    $('rahmenort').innerHTML = ''; rahmen.was = null; const teile = [];
    if (f.akte.checked) { const r = await T().leeren(); teile.push(`${r.geloescht} ${r.geloescht === 1 ? 'Unterlage' : 'Unterlagen'} gelöscht${r.blieb ? `, ${r.blieb} Dateien blieben liegen` : ''}`); bed.treffer = []; }
    if (f.kalender.checked) { const n = await T().kalender.leeren(); teile.push(`${n} ${n === 1 ? 'Termin oder Notiz' : 'Termine und Notizen'} gelöscht`); const g = $('glocke'); if (g) g.contentWindow.location.reload(); }
    if (f.wfpdf.checked) { await dbWeg('PrivateAkteWFPDF1'); for (const k of Object.keys(localStorage)) if (k.startsWith('pa_wfpdf_')) localStorage.removeItem(k); teile.push('Workflow PDF geleert'); }
    if (f.organizer.checked) { const g = await organizerListeLeeren(); teile.push(`Liste im Datei-Organizer geleert${g ? `, ${g} gelernte ${g === 1 ? 'Regel bleibt' : 'Regeln bleiben'}` : ''}`); }
    zu(); s.frage = ''; await echtLaden(); zeigen(); toast(teile.join(' · ') + '.');
  } catch (err) { knopf.disabled = false; knopf.textContent = 'Endgültig leeren'; toast(fehlerText(err)); }
});
const zur = { tiefe:0, still:0, wache:false, zuletzt:0 };
/* ---------- Seitenleiste am Handy (0.6.1, Klaus 18.11.: „am Handy auf jeden Fall, da können die anderen Funktionen hinein“) ----------
   Wie die Seitenleiste der Familienakte (dort app/seitenleiste.tsx, im Kalender läuft sie selbst): ein schmaler Griff am rechten Rand,
   wandert mit; ein Tipp zeigt nach oben, nach unten, Zurück, Startseite, Baum – und was sonst hinter „⋯“ liegt. Bis 1400 px Breite
   (Handy, geteilter Bildschirm, Tablet); am großen Monitor stehen die Knöpfe ohnehin oben. Aussehen und Maße wie im Klon, hier für die Hülle ohne React geschrieben. */
const leiste = { auf:false, gezogen:0 };
/* Verschieben (Klaus 18.11.: für Linkshänder – „anpacken, vier Pfeile, verschieben: nach links, nach unten, nach oben“): den Griff
   lange drücken oder ziehen; er wird dabei rund mit vier Pfeilen, folgt dem Finger und verankert sich, wo man loslässt – am linken
   oder rechten Rand (Höhe frei, 8–92 %) oder unten (Stelle von links frei). Gemerkt im Browser (`pa_leiste`). Ab Werk rechts,
   unterhalb der Mitte. Ein kurzer Tipp öffnet wie bisher; aufgeklappt richten sich die Knöpfe nach der Lage. */
const leistePos = (() => { try { const p = JSON.parse(localStorage.getItem('pa_leiste') || 'null'); if (p && ['l', 'r', 'u'].includes(p.seite) && p.oben >= 8 && p.oben <= 92) return p; } catch { /* Werkseinstellung */ } return {seite:'r', oben:64}; })();
/* Lage: 'l'/'r' = am linken/rechten Rand, `oben` = Höhe in Prozent; 'u' = unten angedockt, `oben` ist dann die Stelle von links in
   Prozent. Unten angedockt ersetzt die Leiste am Handy die untere Leiste der Akte (Klaus 18.11.: „dann kann ich komplett auf die
   untere Navi-Leiste verzichten“) – die tritt dann zurück (`body.leiste-unten`). */
function leisteLage(){ const o = $('seitenleiste'); if (!o) return; const u = leistePos.seite === 'u';
  o.classList.toggle('links', leistePos.seite === 'l'); o.classList.toggle('unten', u); document.body.classList.toggle('leiste-unten', u);
  o.style.top = u ? 'auto' : (leiste.auf ? Math.min(70, Math.max(30, leistePos.oben)) : leistePos.oben) + '%';
  o.style.left = u ? (leiste.auf ? 50 : leistePos.oben) + '%' : ''; }
let leisteZug = null;
const leisteZieht = () => { if (!leisteZug) return; leisteZug.weit = true; const o = $('seitenleiste'); if (o) o.classList.add('zieht'); };
document.addEventListener('pointerdown', ev => { const g = ev.target.closest && ev.target.closest('.seitenleiste-griff'); if (!g) return; leisteZug = {x:ev.clientX, y:ev.clientY, weit:false, uhr:setTimeout(leisteZieht, 450)}; try { g.setPointerCapture(ev.pointerId); } catch { /* geht auch ohne */ } });
document.addEventListener('pointermove', ev => { if (!leisteZug) return; if (!leisteZug.weit && Math.hypot(ev.clientX - leisteZug.x, ev.clientY - leisteZug.y) < 10) return;
  leisteZieht(); const o = $('seitenleiste');
  /* beim Ziehen folgt der runde Knopf dem Finger; verankert wird beim Loslassen */
  o.classList.remove('links', 'unten'); o.style.top = ev.clientY + 'px'; o.style.left = ev.clientX + 'px'; o.classList.add('frei');
  if (ev.clientY > innerHeight * .86) { leistePos.seite = 'u'; leistePos.oben = Math.round(Math.min(92, Math.max(8, ev.clientX / innerWidth * 100))); }
  else { leistePos.seite = ev.clientX < innerWidth / 2 ? 'l' : 'r'; leistePos.oben = Math.round(Math.min(92, Math.max(8, ev.clientY / innerHeight * 100))); } });
const leisteLos = () => { if (!leisteZug) return; const weit = leisteZug.weit; clearTimeout(leisteZug.uhr); leisteZug = null; const o = $('seitenleiste'); if (o) o.classList.remove('zieht', 'frei');
  if (weit) { leiste.gezogen = Date.now(); try { localStorage.setItem('pa_leiste', JSON.stringify(leistePos)); } catch { /* gilt bis zum Neuladen */ } leisteLage(); } };
document.addEventListener('pointerup', leisteLos); document.addEventListener('pointercancel', leisteLos);
document.addEventListener('contextmenu', ev => { if (ev.target.closest && ev.target.closest('.seitenleiste-griff')) ev.preventDefault(); }); /* langer Druck soll kein Menü des Browsers öffnen */
function seitenleisteZeigen(){
  let o = $('seitenleiste'); if (!o) { o = document.createElement('aside'); o.id = 'seitenleiste'; o.className = 'seitenleiste'; o.setAttribute('aria-label', 'Seitenleiste'); document.body.appendChild(o); }
  o.dataset.seitenleiste = leiste.auf ? 'offen' : 'zu'; leisteLage();
  if (!leiste.auf) { o.innerHTML = `<button class="seitenleiste-griff" data-a="leiste-auf" aria-label="Seitenleiste öffnen: nach oben, nach unten, zurück … Ziehen verschiebt sie."><span aria-hidden="true"></span></button>`; return; }
  const k = (a, i, t, attr = '') => `<button role="menuitem" data-a="${a}" ${attr}>${i}<span>${t}</span></button>`;
  o.innerHTML = `<div class="seitenleiste-knoepfe" role="menu"><button class="seitenleiste-zu" data-a="leiste-zu" aria-label="Seitenleiste schließen">${ic('zu')}</button>`
    + k('leiste-oben', ic('hoch'), 'Nach oben') + k('leiste-unten', ic('runter'), 'Nach unten')
    + (zurTiefe() ? k('leiste-zurueck', ic('zurueck'), 'Zurück') : '')
    + (s.ansicht !== 'start' || s.frage || s.bereich ? k('geh', ic('start'), 'Startseite', 'data-zu="start"') : '')
    + [['akten', 'Akten'], ['eingang', 'Eingang'], ['baum', 'Baum']].filter(([id]) => s.ansicht !== id).map(([id, t]) => k('geh', ic(id), t + (id === 'eingang' && einordnenZahl() ? ` <span class="zahl">${einordnenZahl()}</span>` : ''), `data-zu="${id}"`)).join('') + '<hr>'
    + MEHR.map(([a, i, t]) => k(a, a === 'farbe' ? '<span class="fleck farbknopf"></span>' : i ? ic(i) : '<b class="lfrage">?</b>', t, 'data-ort="akte"')).join('') + '</div>';
}
A['nav-klapp'] = () => { const zu = !navZu(); try { localStorage.setItem('pa_nav_zu', zu ? '1' : '0'); } catch { /* gilt bis zum Neuladen */ } navZeigen(); };
A['leiste-auf'] = () => { if (Date.now() - leiste.gezogen < 500) return; /* das war ein Ziehen, kein Tipp */ leiste.auf = true; seitenleisteZeigen(); };
A['leiste-zu'] = () => { leiste.auf = false; seitenleisteZeigen(); };
A['leiste-oben'] = () => scrollTo({top:0, behavior:'smooth'});
A['leiste-unten'] = () => scrollTo({top:document.documentElement.scrollHeight, behavior:'smooth'});
A['leiste-zurueck'] = () => history.back();
/* Nach jedem Tipp (auch auf einen Knopf der Leiste, dessen Handlung oben schon gelaufen ist) klappt die Leiste wieder zu. */
document.addEventListener('click', ev => { if (leiste.auf && !ev.target.closest('.seitenleiste-griff')) { leiste.auf = false; seitenleisteZeigen(); } });
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && leiste.auf) { leiste.auf = false; seitenleisteZeigen(); } });
seitenleisteZeigen();
const zurTiefe = () => ($('vollbild') ? 1 : 0) + ($('rahmenort').innerHTML ? 1 : 0) + ($('fensterort').innerHTML ? 1 : 0) + ($('menueort').innerHTML ? 1 : 0) + (s.frage ? 1 : 0) + (s.bereich ? 1 : 0) + (s.ansicht !== 'start' ? 1 : 0);
function zurAbgleich(){
  if (!zur.wache) return; const t = zurTiefe();
  if (t > zur.tiefe) { for (; zur.tiefe < t; zur.tiefe++) history.pushState({pa:zur.tiefe + 1}, ''); }
  else if (t < zur.tiefe) { const d = zur.tiefe - t; zur.tiefe = t; zur.still++; history.go(-d); }
}
/* Die Wache entsteht mit der ersten Berührung: Einträge ohne Zutun des Nutzers überspringt der Browser beim Zurück. */
function zurWache(){ if (zur.wache) return; zur.wache = true; history.pushState({pa:0}, ''); zurAbgleich(); }
addEventListener('pointerdown', zurWache, true); addEventListener('keydown', zurWache, true);
addEventListener('popstate', () => {
  if (zur.still) { zur.still--; return; }
  if (!zur.wache) return;
  if (zur.tiefe === 0) {
    if (Date.now() - zur.zuletzt < 2500) { zur.wache = false; history.back(); return; }
    zur.zuletzt = Date.now(); history.pushState({pa:0}, ''); toast('Du bist am Anfang. Noch einmal zurück verlässt die App.'); return;
  }
  zur.tiefe--;
  if ($('vollbild')) vollbildZu();
  else if ($('fensterort').innerHTML) zu();
  else if ($('menueort').innerHTML) menueZu();
  else if ($('rahmenort').innerHTML) rahmenZu();
  else if (s.frage) { sprechEnde(false); s.frage = ''; s.wahl.clear(); zeigen(); }
  else if (s.bereich) { s.bereich = null; zeigen(); }
  else { s.ansicht = 'start'; zeigen(); scrollTo(0,0); }
});
new MutationObserver(() => queueMicrotask(zurAbgleich)).observe(document.body, {childList:true, subtree:true});
document.addEventListener('visibilitychange', () => { if (document.hidden && sprech.an) sprechEnde(false); });
/* Steckbrief der Person: Knöpfe (0.9.4) */
Object.assign(A, {
  'stb-stift': e => { const id = e.dataset.id; if (stb.bearb === id) { stb.bearb = null; stb.entwurf = null; } else { const x = stb.daten[id]; stb.bearb = id; stb.entwurf = JSON.parse(JSON.stringify({kontakt:x.kontakt, ausweise:x.steckbrief.ausweise, eintraege:x.steckbrief.eintraege})); } mainZeigen(); },
  'stb-nr': e => { const id = e.dataset.id; stb.offen.has(id) ? stb.offen.delete(id) : stb.offen.add(id); mainZeigen(); },
  'stb-plus': e => { stbAusForm(); if (e.dataset.art === 'a') stb.entwurf.ausweise.push({id:stbNeuId(), art:T().akten.steckbriefArten[0], nummer:'', gueltigBis:''}); else stb.entwurf.eintraege.push({id:stbNeuId(), name:'', wert:''}); mainZeigen(); },
  'stb-weg': e => { stbAusForm(); (e.dataset.art === 'a' ? stb.entwurf.ausweise : stb.entwurf.eintraege).splice(+e.dataset.i, 1); mainZeigen(); },
  'stb-foto': e => { stbAusForm(); const i = +e.dataset.i, inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*,application/pdf';
    inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; const id = stb.bearb, w = stb.entwurf.ausweise[i], p = AK().personen.find(x => x.id === id);
      try { const doc = await T().akten.ausweisFoto(id, p ? p.name : '', w.art, f); w.dokumentIds = [...(w.dokumentIds || []), doc]; toast('Foto liegt bei der Person.'); await echtLaden(); } catch (err) { toast(fehlerText(err)); } };
    inp.click(); },
});
