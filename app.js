'use strict';
/* Private Akte – Vorschau. Die Beispiele sind erfunden und werden nicht gespeichert, kein echtes Programm wird geöffnet.
   Echt ist nur der Abschnitt „Deine Unterlagen“: er speichert über tresor.js im unveränderten Tresor der Familienakte. */
const FASSUNG = '0.6.0', NAME = 'Private Akte', HEUTE = new Date(2026, 10, 17);
const $ = id => document.getElementById(id);
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const euro = n => new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(n);
const datum = d => d.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'});
const P = {
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
 stift:'<path d="M4 20h4L20 8l-4-4L4 16Z"/>', sort:'<path d="M4 6h16M7 12h10M10 18h4"/>',
 ordner:'<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M12 11v6m-3-3 3 3 3-3"/>',
 importpfeil:'<path d="M12 4v11m-4-4 4 4 4-4M5 19h14"/>', exportpfeil:'<path d="M12 15V4m-4 4 4-4 4 4M5 19h14"/>',
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
 {id:'buero',name:'Familienbüro',tut:'Schreiben, Tabellen, Folien und Workflow PDF',icon:'stift',a:'#3f8fe0',b:'#185abd',ort:[84,23]},
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
const termine = [
 {titel:'Einspruch Steuerbescheid',am:new Date(2026,10,25),art:'Frist',doc:12},
 {titel:'Widerspruch Nebenkosten',am:new Date(2026,11,12),art:'Frist',doc:1},
 {titel:'Zählerablesung',am:new Date(2026,10,27),art:'Termin',doc:null}
];
const tage = t => Math.round((t.am - HEUTE) / 864e5);
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
const bons = [['Bäckerei',-4.80],['Supermarkt',-37.25],['Tankstelle',-52.10],['Drogerie',-12.95],['Baumarkt',-23.40]];
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
 ['bon-start','kamera','Bon fotografieren','geld','öffnet das Portemonnaie'],
 ['scan','scan','PDF scannen','pdf','Foto zu PDF – öffnet den Scanner von Workflow PDF'],
 ['viele','ordner','Dateien hineingeben','sort','ganze Dateien oder Ordner – öffnet den Datei-Organizer'],
 ['notiz','notiz','Notiz','akte','schreiben oder sprechen, von Hand zuordnen'],
 ['kalender','kalender','Kalender','kal','Termine und Fristen']
];
const WERKFARBE = {geld:['#f0b93a','#b77a0c'],pdf:['#e2596b','#9b1f38'],sort:['#2bb673','#107c41'],akte:['#1aa59d','#0b5a66'],kal:['#9a7bd6','#5b3aa6']};
const MEHR = [['import','importpfeil','Importieren','Datei in die Akte legen oder Backup einlesen'],['export','exportpfeil','Exportieren','Backup erstellen – die ganze Akte als verschlüsselter Ordner'],['drucken','drucker','Drucken'],['farbe','','Farbpalette'],['hilfe','','Hilfe']];
function kopfZeigen(){
  $('fassung').textContent = `${FASSUNG} · Basic`;
  $('werkleiste').innerHTML = WERK.map(([a,i,t,f,u]) => `<button class="werk" data-a="${a}" aria-label="${t}" data-tipp="${t}" data-tipp2="${u}" style="--a:${WERKFARBE[f][0]};--b:${WERKFARBE[f][1]}">${ic(i)}</button>`).join('');
  $('kopfknoepfe').innerHTML = MEHR.map(([a,i,t,u]) => `<button class="rund nurbreit ${a==='farbe'?'farbknopf':''} ${a==='import'?'hinein':a==='export'?'hinaus':''}" data-a="${a}" data-ort="akte" aria-label="${t}" data-tipp="${t}" ${u?`data-tipp2="${u}"`:''}>${a==='farbe'?'':i?ic(i):'?'}</button>`).join('')
    + `<button class="rund nurschmal" data-a="mehr" aria-label="Mehr: Importieren, Exportieren, Drucken, Farbpalette, Hilfe" aria-haspopup="menu">${ic('mehr')}</button>`;
}
function navZeigen(){
  const NAV = [['start','Start'],['akten','Akten'],['eingang','Eingang'],['baum','Baum']];
  $('nav').innerHTML = NAV.map(([id,t]) => `<button data-a="geh" data-zu="${id}" ${s.ansicht===id?'aria-current="page"':''}>${ic(id)}<span>${t}</span>${id==='eingang'&&eingang.neu.length?`<span class="zahl">${eingang.neu.length}</span>`:''}</button>`).join('');
}
const fuss = () => `<footer class="fuss"><span>© 2026 Family-Projekt</span><a href="./rechtliches.html#impressum">Impressum</a><a href="./rechtliches.html#datenschutz">Datenschutz</a><a href="./rechtliches.html#haftung">Haftungsausschluss</a><a href="./rechtliches.html#lizenz">Lizenz</a></footer>`;

/* ---------- Ansichten ---------- */
function sucheFeld(){
  return `<form class="suche" data-form="suche">${ic('lupe')}<input name="q" value="${esc(s.frage)}" placeholder="Welche Unterlage brauchst du?" aria-label="Suchen" autocomplete="off"><button type="button" class="suchknopf" data-a="suche-leer" aria-label="Eingabe löschen" data-tipp="Eingabe löschen" ${s.frage ? '' : 'hidden'}>${ic('zu')}</button>${T() && T().diktat.moeglich() ? `<button type="button" class="suchknopf" data-a="suche-mikro" aria-label="Sprechen" data-tipp="Sprechen" data-tipp2="Sag, was du suchst. Noch einmal tippen beendet und sucht.">${ic('mikro')}</button>` : ''}<button class="knopf" type="submit">Finden</button></form>`;
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
const terminZeile = t => `<button class="zeile" data-a="${t.doc?'doc':'kalender'}" data-id="${t.doc||''}"><span class="art" style="background:#ece7f8;color:#5b3aa6">${ic('kalender')}</span><span class="mitte"><strong>${esc(t.titel)}</strong><small>${t.art} · ${datum(t.am)}${t.doc?' · '+esc(docs.find(d => d.id===t.doc).titel):''}</small></span><span class="marke2 ${tage(t)<14?'m-rot':'m-grau'}">${tage(t)<0?'vorbei':tage(t)===0?'heute':'noch '+tage(t)+' Tage'}</span>${ic('weiter')}</button>`;
/* Abschnitte der Startseite als Knopf, eingeklappt (Klaus 18.11.: bei 100 Unterlagen wird die Seite sonst endlos). Offen/zu wird gemerkt. */
const klapp = (() => { try { return JSON.parse(localStorage.getItem('pa_klapp') || '{}') || {}; } catch { return {}; } })();
const klappTeil = (id, titel, unter, innen, attr = '') => `<details class="abschnitt klapp" ${attr} data-klapp="${id}" ${klapp[id] ? 'open' : ''}><summary><b>${titel}</b><span>${unter}</span>${ic('weiter')}</summary><div class="liste">${innen}</div></details>`;
document.addEventListener('toggle', ev => { const d = ev.target; if (!d.dataset || !d.dataset.klapp) return; klapp[d.dataset.klapp] = d.open ? 1 : 0; try { localStorage.setItem('pa_klapp', JSON.stringify(klapp)); } catch { /* gilt dann bis zum Neuladen */ } }, true);
const termineSortiert = () => [...termine].sort((a,b) => a.am - b.am);
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
  const zuletzt = [...docs].sort((a,b) => b.id - a.id).slice(0,4);
  return `<h1 class="titel nurpc">Was möchtest du finden?</h1>${sucheFeld()}
  ${s.frage ? `<div id="bedort">${bedZeile()}</div><div id="trefferort">${treffer()}</div>` : `
  ${echtAbschnitt()}
  ${faelligTeil()}
  <div class="abschnitt"><h2>Bereiche</h2><div class="kacheln seitlich">${BEREICHE.map(b => { const n = docs.filter(d => d.bereich===b.id).length; return `<button class="kachel" style="--a:${b.a};--b:${b.b}" data-a="bereich" data-id="${b.id}"><span class="tupfer eckig">${ic(b.icon)}</span><span><strong>${b.name}</strong><small>${n} ${n===1?'Unterlage':'Unterlagen'}</small></span></button>`; }).join('')}</div></div>
  ${klappTeil('zuletzt', 'Zuletzt abgelegt', `${zuletzt.length} Beispiele`, zuletzt.map(d => docZeile(d)).join(''))}`}
  <p class="hinweis">Vorschau ${FASSUNG} · Gespeichert wird nur, was du unter „Deine Unterlagen“ hineinlegst – auf diesem Gerät. Alles andere ist erfunden.</p>${fuss()}`;
}
function vAkten(){
  if (!s.bereich) return `<h1 class="titel">Akten</h1><p class="unter">Dieselben sechs Bereiche wie auf der Startseite.</p>
   <div class="abschnitt"><div class="liste">${BEREICHE.map(b => { const d = docs.filter(x => x.bereich===b.id); return `<button class="zeile" data-a="bereich" data-id="${b.id}"><span class="tupfer eckig" style="--a:${b.a};--b:${b.b}">${ic(b.icon)}</span><span class="mitte"><strong>${b.name}</strong><small>${[...new Set(d.map(x=>x.vorgang))].join(' · ')||'noch leer'}</small></span><span class="marke2 m-grau">${d.length}</span>${ic('weiter')}</button>`; }).join('')}</div></div>${fuss()}`;
  const b = bereich(s.bereich), d = docs.filter(x => x.bereich===b.id), vorg = [...new Set(d.map(x => x.vorgang))];
  return `<button class="chip" data-a="bereich" data-id="">‹ Alle Bereiche</button><h1 class="titel" style="margin-top:10px">${b.name}</h1><p class="unter">${d.length} Unterlagen in ${vorg.length} ${vorg.length===1?'Vorgang':'Vorgängen'}</p>
   ${vorg.map(v => `<div class="abschnitt"><h2>${esc(v)}</h2><div class="liste">${d.filter(x => x.vorgang===v).map(x => docZeile(x)).join('')}</div></div>`).join('')}${fuss()}`;
}
function vEingang(){
  const z = eingang.zurueck, n = eingang.neu;
  return `<h1 class="titel">Eingang</h1><p class="unter">Geprüft wird nur, was wirklich neu ist.</p>
  <div class="abschnitt"><h2>Neu <span>Vorschlag bestätigen, ändern oder gleich weiterarbeiten</span></h2><div class="liste">${n.length ? n.map(e => `<div class="zeile" style="flex-wrap:wrap"><span class="art ${e.art}">${e.art}</span><span class="mitte"><strong>${esc(e.titel)}</strong><small>aus: ${esc(e.quelle)}</small></span>
    <span class="unten">${bereichWahl(e.vorschlag, `data-vorschlag="${e.id}"`)}<button class="knopf gruen klein" data-a="bestaetigen" data-id="${e.id}">Stimmt</button><button class="knopf hell klein" data-a="mit" data-neu="${e.id}">Bearbeiten mit</button></span></div>`).join('') : '<p class="leer">Nichts zu prüfen.</p>'}</div></div>
  <div class="abschnitt"><h2>Aus den Tools <span>schon abgelegt, nur zur Kenntnis</span></h2><div class="liste">${z.length ? z.map(e => `<button class="zeile" data-a="doc" data-id="${e.doc}"><span class="art" style="background:var(--tealsoft);color:var(--teal)">✓</span><span class="mitte"><strong>${esc(e.titel)}</strong><small>${esc(e.text)}</small></span>${ic('weiter')}</button>`).join('') : `<p class="leer">Noch nichts zurückgekommen. Öffne eine Unterlage und tippe auf „Bearbeiten mit“.</p>`}</div></div>${fuss()}`;
}
/* Der Baum (Bild und Film aus der Discovery-Seite des Datei-Organizers) */
function blaetter(id){ return id==='mail' ? mails.length : id==='geld' ? geld.posten.length : id==='sort' ? organizer.length : id==='kal' ? (echt.termine || []).length : docs.filter(d => d.bei===id).length; }
function schild(w){ const [x,y] = w.ort, n = blaetter(w.id), was = w.id==='kal' ? (n===1?' Termin':' Termine') : w.id==='geld' ? ' Posten' : w.id==='mail' ? (n===1?' Mail':' Mails') : (n===1?' Datei':' Dateien');
  return `<button class="schild" style="left:${x}%;top:${y}%;--farbe:${w.a}" data-a="stadt" data-id="${w.id}"><b>${w.name}</b><small>${n ? n+was : 'bereit'}</small></button>`; }
function woLiegtWas(){
  const zl = (a, attr, t, u, n) => `<button class="wozeile" data-a="${a}" ${attr}><span><b>${t}</b><small>${u}</small></span><em>${n}</em></button>`;
  const st = STAEDTE.map(w => `<button class="wostadt" style="--farbe:${w.a}" data-a="stadt" data-id="${w.id}">${w.name}</button>`).join('');
  return `<div class="abschnitt" id="wo-liegt-was"><h2>Wo liegt was? <span>ein Speicher für alles – der Tresor</span></h2>
  <div class="wo">
   <div class="wokasten"><h3>1 · Hinzufügen</h3><p>Leiste oben: Bon, Scan, Dateien, Notiz, Kalender – und Importieren (grüner Pfeil). Dazu Mails aus Private Brain.</p><p class="wonotiz">Alles Neue kommt zuerst in den Eingang.</p></div>
   <i class="wopfeil" aria-hidden="true"></i>
   <div class="wokasten tresor"><h3>2 · Der Tresor <small>der einzige Speicher</small></h3>
    ${zl('geh','data-zu="akten"','Unterlagen','Original und jede neue Fassung, in sechs Bereichen',docs.length)}
    ${zl('geh','data-zu="eingang"','Eingang','Neues, bis du den Vorschlag bestätigst',eingang.neu.length)}
    ${zl('stadt','data-id="kal"','Termine, Fristen und Notizen','der Kalender der Akte',(echt.termine || []).length)}
    ${zl('stadt','data-id="geld"','Portemonnaie','Posten und die Bons dazu',geld.posten.length)}
    ${zl('stadt','data-id="mail"','E-Mails','mit ihren Anlagen',mails.length)}
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
  return `<h1 class="titel">Der Baum</h1><p class="unter">Eine App. In der Mitte die Akte, an den Ästen die Tools. <a href="#wo-liegt-was" data-a="wo">Wo liegt was? ↓</a></p>
  <div class="abschnitt"><div class="baumbild"><img src="./bilder/baum.jpg" width="1280" height="716" alt="Ein großer Baum am Abend. In der Mitte eine leuchtende Halle, an den Ästen kleine Städte. An einem neuen Ast entsteht gerade eine weitere Stadt mit Kränen, bunte Helfer schauen zu.">
   <svg class="wege" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M13 84 C9 90 5 93 0 95" fill="none" stroke="#ffe7ad" stroke-width="2.5" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/></svg>
   <button class="schild akte" style="left:37%;top:58%" data-a="geh" data-zu="start"><b>${NAME}</b><small>die Akte · ${docs.length} Unterlagen</small></button>
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
 ['kal','kalender','Kalender','einen Termin oder eine Frist dazu anlegen',['#9a7bd6','#5b3aa6']],
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
function fNotiz(text=''){
  fenster(`${fk('Notiz','Schreiben oder sprechen. Du ordnest sie selbst zu.')}
   <form class="felder" data-form="notiz">
    <textarea class="feld" name="text" placeholder="Was möchtest du festhalten?" aria-label="Notiz" required>${esc(text)}</textarea>
    <div class="reihe" style="margin:0"><button type="button" class="knopf hell klein" data-a="sprechen">${ic('mikro')} Sprechen</button></div>
    <label>Was ist es? <input class="feld" name="titel" placeholder="zum Beispiel: Anruf bei der Hausverwaltung" required></label>
    <label>Bereich ${bereichWahl('', 'name="bereich" required', false)}</label>
    <label>Vorgang <input class="feld" name="vorgang" placeholder="zum Beispiel: Nebenkosten 2025" list="vorgaenge"></label>
    <datalist id="vorgaenge">${[...new Set(docs.map(d => d.vorgang))].map(v => `<option value="${esc(v)}">`).join('')}</datalist>
    <label><span><input type="checkbox" name="termin" class="haken" style="vertical-align:middle"> Gleich einen Termin dazu anlegen</span></label>
    <button class="knopf gruen voll" type="submit">In die Akte legen ${ic('pfeil')}</button>
   </form>
   <p class="hinweis">Kein Helfer: Die Zuordnung machst du von Hand.</p>`);
}

/* ---------- Die Städte ---------- */
function fStadt(wid, ids=[], teilId){
  const w = stadt(wid);
  ids = ids.map(Number).filter(Boolean);
  if (wid === 'buero') { if (teilId) s.teil = teilId; else if (!ids.length && s.offen !== 'buero') s.teil = 'start'; }
  ids.forEach(i => { const d = docs.find(x => x.id === i); if (d) { d.bei = wid; d.teil = wid === 'buero' ? s.teil : null; } });
  s.offen = wid;
  const inhalt = ({buero, geld:portemonnaie, sort:sortierer, mail:post, kal:kalender})[wid]();
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
function portemonnaie(){
  const rest = geld.posten.reduce((a,p) => a + p.b, 0), aus = geld.posten.filter(p => p.b < 0).reduce((a,p) => a - p.b, 0), ein = geld.posten.filter(p => p.b > 0).reduce((a,p) => a + p.b, 0);
  return `<p class="unter">Kein Buchhaltungsprogramm. Nur: was kam herein, was ging hinaus, wofür, was bleibt.</p>
   <div class="karte" style="margin:10px 0"><small style="color:var(--muted)">Übrig im November</small><div class="geld">${euro(rest)}</div><small style="color:var(--muted)">Einnahmen ${euro(ein)} · Ausgaben ${euro(aus)}</small></div>
   <button class="knopf gruen voll" data-a="bon">${ic('kamera')} Bon fotografieren</button>
   <form class="reihe" data-form="posten"><input class="feld" name="t" value="${esc(geld.vor)}" placeholder="Was?" aria-label="Was" style="flex:2 1 110px"><input class="feld" name="w" placeholder="Wofür?" aria-label="Wofür" style="flex:2 1 110px"><input class="feld" name="b" inputmode="decimal" placeholder="Betrag" aria-label="Betrag" style="flex:1 1 80px"><button class="knopf hell klein" name="art" value="ein">+ Einnahme</button><button class="knopf hell klein" name="art" value="aus">− Ausgabe</button></form>
   <div class="liste" style="margin-top:12px">${[...geld.posten].reverse().map(p => `<div class="zeile"><span class="mitte"><strong>${esc(p.t)}</strong><small>wofür: ${esc(p.w||'–')}${p.bon?' · Bon liegt in der Akte':''}</small></span><span class="${p.b<0?'minus':'plus'}">${p.b<0?'−':'+'} ${euro(Math.abs(p.b))}</span></div>`).join('')}</div>
   <div class="karte" style="margin-top:12px"><b>Weg nach außen</b><p style="font-size:13px;color:var(--muted);margin:4px 0 10px">Der Monat geht als Datei an BookLedgerPro. Die Buchhaltung selbst bleibt draußen.${geld.gegeben?' <span class="marke2 m-ok">November übergeben</span>':''}</p>
    <button class="knopf hell voll" data-a="an-bookledger">${ic('hinaus')} An BookLedgerPro geben</button></div>
   <p class="hinweis">Die Monatsübersicht liegt immer als Kopie in der Akte (Geld &amp; Belege / Ausgaben 2026).</p>`;
}
function geldInAkte(){
  const rest = geld.posten.reduce((a,p) => a + p.b, 0), text = `Monatsübersicht aus dem Portemonnaie. ${geld.posten.length} Posten. Übrig: ${euro(rest)}.`;
  const d = docs.find(x => x.id === geld.docId);
  if (d) d.text = text; else geld.docId = neuesDoc({titel:'Portemonnaie November 2026',art:'BELEG',bereich:'geld',vorgang:'Ausgaben 2026',herkunft:'Portemonnaie',text}).id;
}
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
function kalender(){
  const zu = s.zuDoc ? docs.find(d => d.id === s.zuDoc) : null;
  return `<p class="unter">Termine und Fristen. Eine Notiz oder Unterlage bekommt ihren Termin von hier oder über „Bearbeiten mit“.</p>
   <div class="liste" style="margin-top:10px">${termineSortiert().map(terminZeile).join('')}</div>
   <form class="karte felder" style="margin-top:12px" data-form="termin"><b>${zu ? 'Termin zu „'+esc(zu.titel)+'“' : 'Neuer Termin'}</b>
    <label>Was? <input class="feld" name="titel" required value="${zu ? esc(zu.titel) : ''}"></label>
    <div class="reihe" style="margin:0"><label style="flex:1 1 130px">Wann? <input class="feld" type="date" name="am" required min="2026-11-17" value="2026-11-24"></label><label style="flex:1 1 110px">Art <select class="feld" name="art"><option>Termin</option><option>Frist</option></select></label></div>
    <label>Gehört zu <select class="feld" name="doc"><option value="">keiner Unterlage</option>${docs.map(d => `<option value="${d.id}" ${zu&&zu.id===d.id?'selected':''}>${esc(d.titel)}</option>`).join('')}</select></label>
    <button class="knopf voll" type="submit">${ic('plus')} Eintragen</button></form>
   <p class="hinweis">Erinnerung: noch offen (Glocke wie in der Familienakte oder Gerätekalender). Hier wird nichts erinnert.</p>`;
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
 'kal-tag': e => fRahmen('kalender', `tag=${encodeURIComponent(e.dataset.tag)}&id=${encodeURIComponent(e.dataset.id)}`),
 sprechen: e => { const f = e.closest('form').text; f.value = (f.value ? f.value+' ' : '') + 'Hausverwaltung angerufen, Belegeinsicht ist am 27.11. um 10 Uhr möglich.'; feldWachsen(f); toast('Gesprochenes steht im Feld (Beispiel, kein Mikrofon benutzt).'); },
 kalender: () => { menueZu(); fRahmen('kalender'); },
 stadt: e => { if (e.dataset.id === 'sort') return fRahmen('organizer'); if (e.dataset.id === 'pdf') return fRahmen('wfpdf'); if (e.dataset.id === 'kal') return fRahmen('kalender'); fStadt(e.dataset.id, [], e.dataset.teil || undefined); },
 teil: e => { s.teil = e.dataset.teil; if (s.teil !== 'pdf') s.scan = false; stadtNeu(); },
 mit: fMit,
 'mit-wahl': e => {
   const neu = !!e.dataset.neu, d = neu ? ablegenAusEingang(e.dataset.neu) : docs.find(x => x.id == e.dataset.doc), womit = e.dataset.womit;
   if (neu) { zeigen(); }
   if (womit === 'text' || womit === 'pdf') fStadt('buero', [d.id], womit);
   else if (womit === 'geld') { geld.vor = d.titel; fStadt('geld'); geld.vor = ''; }
   else if (womit === 'sort') { organizer.unshift({titel:d.titel,art:d.art,vorschlag:d.bereich,vorgang:d.vorgang,sicher:false,doc:d.id}); fStadt('sort'); }
   else if (womit === 'kal') { s.zuDoc = d.id; fStadt('kal'); }
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
 bon: () => { const [t,b] = bons[geld.bonNr++ % bons.length]; geld.posten.push({t,b,w:'Einkauf',bon:true}); neuesDoc({titel:'Bon '+t,art:'BELEG',bereich:'geld',vorgang:'Ausgaben 2026',herkunft:'Portemonnaie',text:`Kassenbon ${t}, ${euro(-b)}.`}); geldInAkte(); stadtNeu(); toast(`${euro(-b)} abgezogen. Der Bon liegt in der Akte.`); },
 'bon-start': () => { menueZu(); fStadt('geld'); A.bon(); },
 'an-bookledger': () => {
   const zeilen = ['Datum;Was;Wofuer;Betrag', ...geld.posten.map(p => `${datum(HEUTE)};${p.t};${p.w||''};${p.b.toFixed(2).replace('.',',')}`)].join('\r\n');
   const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿'+zeilen], {type:'text/csv'})); a.download = 'portemonnaie-2026-11.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
   geld.gegeben = true; stadtNeu(); toast('Der November liegt als Datei für BookLedgerPro bereit (Beispieldaten). Die Buchhaltung bleibt draußen.'); },
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
  if (f.dataset.form === 'posten') { const b = parseFloat(f.b.value.replace(',','.')); if (!(b > 0)) return toast('Bitte einen Betrag eintragen.'); geld.posten.push({t:f.t.value.trim() || (art==='ein'?'Einnahme':'Ausgabe'), w:f.w.value.trim(), b: art==='ein' ? b : -b}); geldInAkte(); stadtNeu(); }
  if (f.dataset.form === 'notiz') {
    const d = neuesDoc({titel:f.titel.value.trim(),art:'NOTIZ',bereich:f.bereich.value,vorgang:f.vorgang.value.trim()||'Notizen',herkunft:'Notiz, von Hand zugeordnet',text:f.text.value.trim()});
    if (f.termin.checked) { s.zuDoc = d.id; fStadt('kal'); } else { zu(); s.ansicht = 'akten'; s.bereich = d.bereich; zeigen(); }
    toast(`Die Notiz liegt in ${ort(d)}.`);
  }
  if (f.dataset.form === 'termin') { const [j,m,t] = f.am.value.split('-').map(Number); termine.push({titel:f.titel.value.trim(),am:new Date(j,m-1,t),art:f.art.value,doc:+f.doc.value||null}); s.zuDoc = null; stadtNeu(); toast('Eingetragen. Der Termin steht auch auf der Startseite unter „Fällig“.'); }
});

/* ---------- Deine Unterlagen: echt, im Tresor der Familienakte (tresor.js = Brücke zum Klon) ---------- */
const T = () => window.PrivateAkteTresor;
const echt = { liste:null, fehler:'', datei:null, laeuft:false, termine:[], notizen:0 };
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
async function termineLaden(){ try { const k = await T().kalender.termine(); echt.termine = k.termine; echt.notizen = k.notizen; } catch { echt.termine = echt.termine || []; } }
async function echtLaden(){
  if (!T()) { echt.fehler = 'Der Tresor ist in diesem Browser nicht geladen.'; echt.liste = []; }
  else try { echt.liste = await T().liste(); echt.fehler = ''; } catch (e) { echt.liste = []; echt.fehler = fehlerText(e); }
  await termineLaden();
  if (s.ansicht === 'start' && !sprech.an) mainZeigen();
}
/* Fundstelle am Treffer (Klaus 17.11.): der Satz, in dem es gefunden wurde, mit der Seite. */
const fundstelle = h => h && h.stelle ? `<small class="stelle">${h.seite ? 'Seite ' + h.seite + ' · ' : ''}${esc(h.stelle)}</small>` : '';
const echtZeile = (d, marke = 'echt', h = null) => `<button class="zeile" data-a="${h && h.seite ? 'leser' : 'echt-auf'}" data-id="${esc(d.id)}" ${h && h.seite ? `data-seite="${h.seite}"` : ''}><span class="art ${echtArt(d)}">${esc(echtArt(d))}</span><span class="mitte"><strong>${esc(echtTitel(d))}</strong><small>${esc(d.category)}${d.documentDate ? ' · ' + echtDatum(d.documentDate) : ''} · ${echtGroesse(d.sizeBytes)}</small>${fundstelle(h)}</span><span class="marke2 ${marke === 'echt' ? 'm-ok' : 'm-arbeit'}">${marke}</span>${ic('weiter')}</button>`;
/* Sortierung von „Deine Unterlagen“ (Klaus 18.11.: der neue Scan war zwischen 100 Unterlagen nicht zu finden). Ab Werk: zuletzt abgelegt oben. */
const ECHT_SORT = [['neu','zuletzt abgelegt'],['datum','Datum der Unterlage'],['name','Name'],['groesse','Größe'],['bereich','Bereich']];
const echtSort = () => { try { const w = localStorage.getItem('pa_sort'); return ECHT_SORT.some(x => x[0] === w) ? w : 'neu'; } catch { return 'neu'; } };
function echtSortiert(l){
  const w = echtSort(), text = (a, b) => String(a).localeCompare(String(b), 'de', {numeric:true, sensitivity:'base'}), neu = (a, b) => text(b.addedAt || '', a.addedAt || '');
  const f = {neu, datum:(a, b) => text(b.documentDate || '', a.documentDate || '') || neu(a, b), name:(a, b) => text(echtTitel(a), echtTitel(b)), groesse:(a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0), bereich:(a, b) => text(a.category, b.category) || neu(a, b)}[w];
  return [...l].sort(f);
}
document.addEventListener('change', ev => { if (ev.target.id !== 'echt-sort') return; try { localStorage.setItem('pa_sort', ev.target.value); } catch { /* gilt dann nicht */ } mainZeigen(); });
function echtAbschnitt(){
  const l = echt.liste;
  const innen = l === null ? '<p class="leer">Die Akte wird geöffnet …</p>'
    : echt.fehler ? `<p class="leer">${esc(echt.fehler)}</p>`
    : !l.length ? '<p class="leer">Noch nichts hineingelegt. Oben „Importieren“ (grüner Pfeil) legt eine Datei in die Akte – sie bleibt auf diesem Gerät.</p>'
    : `<label class="sortzeile">Sortiert nach <select class="feld schmal" id="echt-sort" aria-label="Deine Unterlagen sortieren">${ECHT_SORT.map(([id, t]) => `<option value="${id}" ${id === echtSort() ? 'selected' : ''}>${t}</option>`).join('')}</select></label>` + echtSortiert(l).map(d => echtZeile(d)).join('');
  return klappTeil('echt', 'Deine Unterlagen', `${l && !echt.fehler ? l.length + ' · ' : ''}echt · auf diesem Gerät gespeichert`, innen, `id="echt" data-bereit="${l === null ? 0 : 1}"`);
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
    <button class="knopf gruen voll" type="submit">In die Akte legen ${ic('pfeil')}</button>
   </form>
   <p class="hinweis">Die Datei kommt in die Akte: sie liegt im Speicher dieses Browsers auf diesem Gerät und verlässt es nicht. Einen Ordner dazu gibt es erst mit einem Backup (oben „Exportieren“, roter Pfeil).</p>`}`);
}
function fEcht(id){
  const d = (echt.liste || []).find(x => x.id === id); if (!d) return;
  fenster(`${fk(esc(echtTitel(d)), esc(d.category))}
   <dl class="angaben"><dt>Datei</dt><dd>${esc(d.originalName)} · ${echtGroesse(d.sizeBytes)}</dd>${d.documentDate ? `<dt>Datum</dt><dd>${echtDatum(d.documentDate)}</dd>` : ''}<dt>Abgelegt</dt><dd>${echtDatum(d.addedAt)}</dd><dt>Liegt</dt><dd>in der Akte auf diesem Gerät</dd></dl>
   ${/\.pdf$/i.test(d.originalName) ? `<button class="knopf voll" data-a="leser" data-id="${esc(d.id)}">Lesen und darin suchen</button><div class="reihe"><button class="knopf hell" data-a="echt-oeffnen" data-id="${esc(d.id)}">Im Browser öffnen</button></div>` : `<button class="knopf voll" data-a="echt-oeffnen" data-id="${esc(d.id)}">Öffnen</button>`}
   ${/\.(pdf|png|jpe?g|webp)$/i.test(d.originalName) ? `<div class="reihe"><button class="knopf hell" data-a="echt-wfpdf" data-id="${esc(d.id)}">${ic('pdf')} Mit Workflow PDF bearbeiten</button></div>` : ''}
   <div class="reihe"><button class="knopf hell" data-a="echt-raus" data-id="${esc(d.id)}">Aus der Akte nehmen</button></div>`);
}
/* ---------- Ordner in die Akte legen (Klaus 17.11.): ein im Datei-Organizer sortierter Ordner kommt mit seiner Einordnung herein ---------- */
const ord = { ordner:'', index:false, grund:'', stuecke:[], laeuft:false };
function fOrdner(){
  const holen = ord.stuecke.filter(x => !x.doppelt), doppelt = ord.stuecke.length - holen.length, wahl = echtBereiche();
  const zeile = x => `<label class="ordzeile"><input type="checkbox" class="haken" name="d" value="${esc(x.name)}" checked aria-label="${esc(x.name)} übernehmen">
    <span class="mitte"><strong>${esc(x.name.replace(/∕/g, '/'))}</strong><small style="white-space:normal">${[x.art, x.datum ? echtDatum(x.datum) : '', echtGroesse(x.groesse), x.text ? 'Text gelesen' : ''].filter(Boolean).map(esc).join(' · ')}${x.warnung ? `<br><b class="warn">${esc(x.warnung)}</b>` : ''}</small></span>
    <select class="feld schmal" name="b" data-name="${esc(x.name)}" aria-label="Bereich für ${esc(x.name)}">${[...new Set([x.bereich || 'Sonstiges', ...wahl].filter(Boolean))].map(b => `<option ${b === (x.bereich || 'Sonstiges') ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select></label>`;
  fenster(`${fk('Ordner in die Akte legen', esc(ord.ordner))}
   <p class="hinweis">${ord.index ? 'Die Einordnung kommt aus dem Datei-Organizer. Du kannst den Bereich je Datei ändern oder Dateien abwählen.' : `In diesem Ordner liegt keine Einordnung aus dem Datei-Organizer${ord.grund ? ' (' + esc(ord.grund) + ')' : ''}. Die Dateien kommen nach „Sonstiges“, wenn du nichts anderes wählst.`}${doppelt ? ` ${doppelt} doppelte ${doppelt === 1 ? 'Datei bleibt' : 'Dateien bleiben'} im Ordner.` : ''}</p>
   ${holen.length ? `<form data-form="ordner"><div class="liste ordliste">${holen.map(zeile).join('')}</div>
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
    zu(); await echtLaden();
    toast(`${r.abgelegt} ${r.abgelegt === 1 ? 'Datei liegt' : 'Dateien liegen'} in der Akte.${r.schonDa ? ` ${r.schonDa} waren schon da.` : ''}${r.fehler.length ? ` Nicht geklappt: ${r.fehler[0]}${r.fehler.length > 1 ? ' und ' + (r.fehler.length - 1) + ' weitere' : ''}.` : ''}`);
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
 'echt-auf': e => fEcht(e.dataset.id),
 'echt-oeffnen': async e => {
   try { const f = await T().datei(e.dataset.id), url = URL.createObjectURL(f), a = document.createElement('a');
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
    echt.datei = null; zu(); await echtLaden(); toast(`„${echtTitel(d)}“ liegt in ${d.category}.${gelesen.text ? ' Text gelesen – die Suche findet auch den Inhalt.' : lesbar ? ' Kein Text erkannt.' : ''}`);
  } catch (err) { knopf.disabled = false; toast(fehlerText(err)); } finally { echt.laeuft = false; }
});

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
   : `<p class="hinweis">Dieser Browser kann keinen Ordner wählen. Ein Backup geht in Chrome oder Edge.</p>`}`);
}
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
 'sich-export': fExport, import: () => { menueZu(); fImportWahl(); }, export: () => { menueZu(); fSicherung(); },
 'sich-import': async () => { try { sich.art = await T().sicherung.importWaehlen(); fImport(); } catch (err) { const m = zugangFehler(err); if (m) toast(m); } },
 'sich-blatt': () => { const a = document.createElement('a'), url = URL.createObjectURL(new Blob([sich.notfallblatt], {type:'text/plain'}));
   a.href = url; a.download = `Notfallblatt_${sich.ordner}.txt`; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000); }
});
document.addEventListener('submit', async ev => {
  const f = ev.target, art = f.dataset.form; if (art !== 'export' && art !== 'import') return; ev.preventDefault();
  if (echt.laeuft) return; const knopf = f.querySelector('button[type=submit]');
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
function mainZeigen(){ if (sprech.an && sprech.sitzung) { sprech.sitzung.stop(); sprech.an = false; } $('main').innerHTML = ({start:vStart, akten:vAkten, eingang:vEingang, baum:vBaum})[s.ansicht](); }
function zeigen(){ navZeigen(); mainZeigen(); }
farbeAkte(); kopfZeigen(); zeigen(); echtLaden().finally(glockeStarten); bedPruefen(); /* die Glocke erst, wenn die Akte den Tresor geöffnet hat – nie zwei zugleich beim ersten Anlegen */
/* Neue Fassung: der Browser fragt sw.js immer beim Server (updateViaCache none), beim Start und beim Zurückkommen.
   Übernimmt ein neuer Worker, zeigt die Fassungsmarke „neu“; neu geladen wird erst auf Tipp, damit keine Eingabe verloren geht. */
let swReg = null;
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  const hatte = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('./sw.js', {updateViaCache:'none'}).then(r => { swReg = r; r.update().catch(() => {}); }).catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hatte) { const f = $('fassung'); f.classList.add('neu'); f.textContent = 'Neue Fassung · antippen'; } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && swReg) swReg.update().catch(() => {}); });
}
A['neu-laden'] = async () => {
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
document.addEventListener('pointerover', ev => { if (!s.tipps || ev.pointerType === 'touch') return; const e = ev.target.closest('[data-tipp]'); if (!e) return; clearTimeout(tippZeit); tippZeit = setTimeout(() => tippZeigen(e), 400); });
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
    text: t => { const f = suchFeld(); if (f) { f.value = t; const x = document.querySelector('[data-a=suche-leer]'); if (x) x.hidden = !t; } },
    zustand: an => { const k = document.querySelector('[data-a=suche-mikro]'); if (k) k.classList.toggle('an', an); if (!an && sprech.an && !sprech.sitzung.active) sprech.an = false; },
    hinweis: (t, fehler) => { if (t && (fehler || /bitte tippen/.test(t))) { sprech.an = false; toast(t); } }
  });
  sprech.an = true; sprech.sitzung.start(suchFeld() ? suchFeld().value : '', false);
};
document.addEventListener('input', ev => { if (ev.target.matches('.suche input[name=q]')) { const x = document.querySelector('[data-a=suche-leer]'); if (x) x.hidden = !ev.target.value; } });

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
 wfpdf:{name:'Workflow PDF', unter:'Scannen, ausfüllen, bearbeiten – „Teilen“: in die Akte oder an ein anderes Programm', seite:'workflow-pdf/index.html', stil:farbStilFest(['#f6c3cb','#fbdde1','#fdeef0'],'#6b1226','#9b1f38','#f8e6e9')}
};
function farbStilFest(k, schrift, akz, fl){ return `--k1:${k[0]};--k2:${k[1]};--k3:${k[2]};--schrift:${schrift};--akz:${akz};--fl:${fl}`; }
const rahmen = { was:null, wartet:null };
function fRahmen(was, frage = '', dateien = null){
  const r = RAHMEN[was]; zu(); rahmen.was = was; rahmen.wartet = dateien;
  $('rahmenort').innerHTML = `<div class="rahmenfenster" style="${r.stil}" role="dialog" aria-modal="true" aria-label="${r.name}">
   <div class="fkopf"><h2>${r.name}<small>${r.unter}</small></h2><span class="rahmenmeldung" id="rahmen-meldung" role="status" aria-live="polite"></span><button class="knopf hell klein" data-a="rahmen-zu">‹ Akte</button></div>
   <iframe id="rahmen" title="${r.name}" allow="camera; microphone; clipboard-write; web-share; fullscreen"></iframe></div>`;
  /* Lädt im Rahmen je die ungepatchte Startseite des Klons (Neuladen, Link „zurück zur App“), kommt gleich wieder die Seite mit Brücke. */
  const f = $('rahmen'), adresse = `./rahmen/${r.seite}?v=${FASSUNG}${frage ? '&' + frage : ''}`;
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
   Die Glocke ist dieselbe Seite noch einmal, unsichtbar, nur mit der App-Glocke des Klons: sie läutet, solange die Akte offen ist,
   und zeigt sich oben, wenn sie läutet. */
function glockeStarten(){ if ($('glocke') || !T()) return; const f = document.createElement('iframe'); f.id = 'glocke'; f.title = 'Erinnerung'; f.hidden = true; f.src = `./rahmen/kalender/index.html?v=${FASSUNG}&nur=glocke`; document.body.appendChild(f); }
addEventListener('message', async ev => {
  if (ev.origin !== location.origin) return; const d = ev.data || {}, k = $('rahmen'), g = $('glocke');
  const ausKalender = k && rahmen.was === 'kalender' && ev.source === k.contentWindow, ausGlocke = g && ev.source === g.contentWindow;
  if (!ausKalender && !ausGlocke) return;
  if (d.typ === 'pa-kalender-meldung' && ausKalender) rahmenMelden(String(d.text || ''), d.gut !== false);
  if (d.typ === 'pa-kalender-geaendert') { const vorher = JSON.stringify(echt.termine); await termineLaden(); if (ausKalender && g) g.contentWindow.location.reload(); /* neu zeichnen nur, wenn sich wirklich etwas geändert hat – sonst klappt zu, was gerade aufgeklappt wurde */ if (ausGlocke && vorher !== JSON.stringify(echt.termine) && s.ansicht === 'start' && !$('rahmenort').innerHTML && !$('fensterort').innerHTML && !s.frage && !sprech.an) mainZeigen(); }
  if (d.typ === 'pa-glocke' && ausGlocke) g.hidden = !d.an;
  if (d.typ === 'pa-kalender-oeffnen' && ausGlocke) fRahmen('kalender', `tag=${encodeURIComponent(String(d.tag || ''))}&id=${encodeURIComponent(String(d.id || ''))}`);
});
A['echt-wfpdf'] = async e => {
  try { const d = (echt.liste || []).find(x => x.id === e.dataset.id), datei = await T().datei(e.dataset.id); fRahmen('wfpdf', '', [new File([datei], (d && d.originalName) || datei.name, {type:datei.type, lastModified:datei.lastModified})]); }
  catch (err) { toast(fehlerText(err)); }
};
addEventListener('message', async ev => {
  const f = $('rahmen'); if (!f || ev.origin !== location.origin || ev.source !== f.contentWindow) return;
  const d = ev.data || {}, antwort = m => { try { f.contentWindow.postMessage(m, location.origin); } catch { /* Rahmen ist schon zu */ } };
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
const zurTiefe = () => ($('rahmenort').innerHTML ? 1 : 0) + ($('fensterort').innerHTML ? 1 : 0) + ($('menueort').innerHTML ? 1 : 0) + (s.frage ? 1 : 0) + (s.bereich ? 1 : 0) + (s.ansicht !== 'start' ? 1 : 0);
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
  if ($('fensterort').innerHTML) zu();
  else if ($('menueort').innerHTML) menueZu();
  else if ($('rahmenort').innerHTML) rahmenZu();
  else if (s.frage) { sprechEnde(false); s.frage = ''; s.wahl.clear(); zeigen(); }
  else if (s.bereich) { s.bereich = null; zeigen(); }
  else { s.ansicht = 'start'; zeigen(); scrollTo(0,0); }
});
new MutationObserver(() => queueMicrotask(zurAbgleich)).observe(document.body, {childList:true, subtree:true});
document.addEventListener('visibilitychange', () => { if (document.hidden && sprech.an) sprechEnde(false); });
