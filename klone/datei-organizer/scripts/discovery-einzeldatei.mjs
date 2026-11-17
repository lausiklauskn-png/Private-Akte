#!/usr/bin/env node
// Discovery als EINE Datei zum Versenden (Klaus 15.11.2026): Seite, three.js, die 13 Tonspuren, der Kreislauf-Film und sein
// Standbild stecken in einer HTML-Datei – läuft ohne Netz, auch als Anhang geöffnet.
// Aufruf: node scripts/discovery-einzeldatei.mjs [ziel.html]   (Vorgabe: Discovery-Sortierkern.html im Arbeitsordner; nicht ins Repo legen, ~9 MB)
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
const Q = new URL("../src/public/", import.meta.url).pathname, ziel = process.argv[2] || "Discovery-Sortierkern.html";
let s = readFileSync(Q + "discovery.html", "utf8");
const b64 = (f) => readFileSync(Q + f).toString("base64");
const ton = Object.fromEntries(readdirSync(Q + "discovery-ton").filter((f) => f.endsWith(".mp3")).map((f) => [f.replace(".mp3", ""), "data:audio/mpeg;base64," + b64("discovery-ton/" + f)]));
const kopf = `<script>window.EINZELDATEI=true;window.TONSPUREN=${JSON.stringify(ton)};window.DISCOVERY_BILD="data:image/jpeg;base64,${b64("discovery-kreislauf.jpg")}";
(function(){var z=atob("${b64("discovery-kreislauf.mp4")}"),n=z.length,u=new Uint8Array(n);for(var i=0;i<n;i++)u[i]=z.charCodeAt(i);window.DISCOVERY_FILM=URL.createObjectURL(new Blob([u],{type:"video/mp4"}));})();</script>\n`;
const filme = Object.fromEntries(readdirSync(Q).filter((f) => /^discovery-film-.*\.mp4$/.test(f)).map((f) => [f, b64(f)]));
const kopf2 = `<script>(function(){var F=${JSON.stringify(filme)},K={"discovery-film-brieftraeger.mp4":"film_brieftraeger","discovery-film-kern.mp4":"film_kern_raet","discovery-film-strafzettel.mp4":"film_strafzettel"};window.DISCOVERY_FILME={};
for(var f in F){var z=atob(F[f]),n=z.length,u=new Uint8Array(n);for(var i=0;i<n;i++)u[i]=z.charCodeAt(i);window.DISCOVERY_FILME[K[f]]=URL.createObjectURL(new Blob([u],{type:"video/mp4"}));}
window.DISCOVERY_STADTBILDER=${JSON.stringify([0,1,2,3].map((i) => "data:image/jpeg;base64," + b64(`discovery-stadt-${i}.jpg`)))};\nwindow.DISCOVERY_FILMBILDER={film_brieftraeger:"data:image/jpeg;base64,${b64("discovery-film-brieftraeger.jpg")}"};})();</script>\n`;
const marke = '<script src="discovery-three.min.js"></script>';
if (!s.includes(marke)) { console.error("ABBRUCH: three.js-Einbindung nicht gefunden."); process.exit(2); }
const i = s.indexOf("<script");
s = s.slice(0, i) + kopf + kopf2 + s.slice(i);
s = s.replace(marke, () => "<script>" + readFileSync(Q + "discovery-three.min.js", "utf8").replace(/<\/script/gi, "<\\/script") + "</script>");
writeFileSync(ziel, s);
console.log(`geschrieben: ${ziel} (${(s.length / 1048576).toFixed(1)} MB) · ${Object.keys(ton).length} Tonspuren, Film, three.js eingebettet`);
