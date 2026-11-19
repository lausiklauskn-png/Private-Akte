// windows/tools/build-web.mjs — Oberfläche der Windows-Hülle: dasselbe Web-Paket wie Android (tools/native/web-paket.mjs).
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('../../',import.meta.url));
const {bauen}=await import('../../tools/native/web-paket.mjs');
bauen(join(root,'windows','dist'));
