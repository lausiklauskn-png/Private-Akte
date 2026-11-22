// windows/engine/build.mjs — übersetzt die Windows-Engine der Pro-Akte: die unveränderte Engine des Datei-Organizer-Klons
// (tools/native/klon-quellen.mjs legt sie gegen ihren Pin geprüft nach build/klon-src) plus DesktopBuild mit der Fassung der Akte.
import {readFile,writeFile,mkdir,rm,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join,delimiter} from 'node:path';
const here=fileURLToPath(new URL('.',import.meta.url));
const build=join(here,'build');
const sha=b=>createHash('sha256').update(b).digest('hex');
await mkdir(join(build,'lib'),{recursive:true});
const deps=JSON.parse(await readFile(join(here,'dependencies.json'),'utf8')).dependencies;
for(const dep of deps){
  const path=join(build,'lib',`${dep.name}-${dep.version}.jar`);
  let bytes=await readFile(path).catch(()=>null);
  if(!bytes||sha(bytes)!==dep.sha256){
    // Maven Central meldete am 20.–22.11.2026 zeitweise 404/429 für vorhandene Dateien: zweiter Spiegel derselben Datei, je drei Versuche.
    // Der Fingerabdruck unten bleibt die Prüfung – ein anderer Spiegel kann keine andere Datei unterschieben.
    const quellen=[dep.url,dep.url.replace('://repo.maven.apache.org/','://repo1.maven.org/'),dep.url.replace('://repo.maven.apache.org/','://maven-central.storage-download.googleapis.com/')].filter((u,i,a)=>a.indexOf(u)===i);
    bytes=null;
    for(let versuch=0;versuch<3&&!bytes;versuch++)for(const url of quellen){
      const response=await fetch(url).catch(()=>null);
      if(response?.ok){bytes=Buffer.from(await response.arrayBuffer());break;}
      await new Promise(r=>setTimeout(r,1500*(versuch+1)));
    }
    if(!bytes)throw Error('Abhängigkeit nicht ladbar: '+dep.name);
    if(sha(bytes)!==dep.sha256)throw Error('Abhängigkeit mit falschem Fingerabdruck: '+dep.name);
    await writeFile(path,bytes);
  }
}
const config=JSON.parse(await readFile(join(here,'../src-tauri/tauri.conf.json'),'utf8'));
const gen=join(build,'source');await rm(gen,{recursive:true,force:true});await mkdir(gen,{recursive:true});
await writeFile(join(gen,'DesktopBuild.java'),`package de.familyprojekt.dateiorganizer.desktop; final class DesktopBuild { static final String VERSION=${JSON.stringify(config.version)}; }\n`);
const {legen}=await import('../../tools/native/klon-quellen.mjs');const klon=join(legen('windows'),'datei-organizer');
const eigene=(await readdir(klon)).filter(n=>n.endsWith('.java')).sort().map(n=>join(klon,n));
await rm(join(build,'classes'),{recursive:true,force:true});await mkdir(join(build,'classes'),{recursive:true});
const libs=deps.map(d=>join(build,'lib',`${d.name}-${d.version}.jar`)).join(delimiter);
execFileSync('java',['-m','jdk.compiler/com.sun.tools.javac.Main','-source','21','-target','21','-encoding','UTF-8','-Xlint:-options','-cp',libs,'-d',join(build,'classes'),join(gen,'DesktopBuild.java'),...eigene],{stdio:'inherit'});
await writeFile(join(build,'shared-source.json'),JSON.stringify({abhaengigkeiten:deps,eigene:eigene.length},null,2)+'\n');
console.log(`Windows-Engine übersetzt: ${eigene.length} eigene Dateien.`);
export const classpath=[join(build,'classes'),join(build,'lib','*')].join(delimiter);
