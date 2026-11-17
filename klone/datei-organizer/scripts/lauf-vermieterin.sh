#!/bin/bash
# Lauf „Vermieterin“: alle Auswertungen eines Jahres gegen die Mehrheit der vorhandenen Einordner (Text und gescannt).
# Aufruf: bash scripts/lauf-vermieterin.sh <stapel> <stapel-ocr> <kennung für ergebnisse/> [gemerkt.json]
set -e; N=$1; O=$2; K=$3; M=$4; ruhig() { grep -v "Warning\|Reparsing\|eliminate\|trace-warn" || true; }
echo "## Einigkeit"; node scripts/mehrheit-briefe.mjs $N 2>&1 | grep -E "^==|Kappa"
for f in "$N" "$O"; do echo "## Briefe $f"; node scripts/messen-briefe.mjs $f --soll mehrheit --json ergebnisse/$K-briefe$([ $f = $O ] && echo -ocr).json 2>&1 | grep -A1 "^==" | grep -v "^--"; done
for f in "$N" "$O"; do echo "## Fristkette $f"; node scripts/messen-fristkette.mjs $N $f --json ergebnisse/$K-fristkette$([ $f = $O ] && echo -ocr).json 2>&1 | ruhig | tr -d '\n' | cut -c1-700; echo; done
echo "## Private Brain"; node scripts/messen-privatebrain.mjs $N $O | sed -n 3,4p
echo "## Bank"; node scripts/messen-bank.mjs $N --ocr $O --blp ../bookledgerpro --json ergebnisse/$K-bank.json 2>&1 | ruhig | sed -n 10,36p | tr -d '\n '; echo
if [ -n "$M" ]; then for f in "$N" "$O"; do echo "## Merken $f"; node scripts/merken.mjs messen $N $f $M --json ergebnisse/$K-merken$([ $f = $O ] && echo -ocr).json 2>&1 | ruhig | tr -d '\n ' | cut -c1-1500; echo; done; fi
