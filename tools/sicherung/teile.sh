#!/usr/bin/env bash
# Packt alle Dateien aus dem Paket-Ordner in wenige ZIPs zu je höchstens ~1,9 GB
# (GitHub erlaubt je Release-Datei höchstens 2 GB). Jedes Teil trägt die kleinen Begleitdateien mit;
# alle Teile in denselben Ordner entpackt ergeben die ganze Sicherung.
# Aufruf: teile.sh <paket-ordner> <stand>   Ergebnis: <paket-ordner>/Sicherung-<stand>-Teil-N-von-M.zip, TEILE-SHA256SUMS
set -euo pipefail
PAKET="$1"; STAND="$2"; GRENZE=$(( ${TEIL_MB:-1900} * 1024 * 1024 ))
ORDNER="Sicherung-$STAND"
cd "$PAKET"
BEGLEIT=(Geschenkbox.html INHALT.md WIEDERHERSTELLEN.md SHA256SUMS)
begleit_groesse=$(cat "${BEGLEIT[@]}" | wc -c)

# große Dateien zuerst, jede in das erste Teil, in das sie noch passt
declare -a fuell=() inhalt=()
while read -r groesse name; do
  case " ${BEGLEIT[*]} " in *" $name "*) continue ;; esac
  i=0
  while [ "$i" -lt "${#fuell[@]}" ] && [ $(( fuell[i] + groesse + begleit_groesse )) -gt "$GRENZE" ]; do i=$((i + 1)); done
  [ "$i" -lt "${#fuell[@]}" ] || { fuell[i]=0; inhalt[i]=""; }
  fuell[i]=$(( fuell[i] + groesse )); inhalt[i]="${inhalt[i]} $name"
done < <(find . -maxdepth 1 -type f ! -name 'Sicherung-*-Teil-*' ! -name 'TEILE-SHA256SUMS' -printf '%s %f\n' | sort -rn)

m=${#fuell[@]}
mkdir -p "/tmp/teile/$ORDNER"
for i in "${!inhalt[@]}"; do
  n=$((i + 1)); ziel="$PAKET/$ORDNER-Teil-$n-von-$m.zip"
  rm -rf "/tmp/teile/$ORDNER"; mkdir -p "/tmp/teile/$ORDNER"
  for f in ${inhalt[i]} "${BEGLEIT[@]}"; do ln "$PAKET/$f" "/tmp/teile/$ORDNER/$f" 2>/dev/null || cp "$PAKET/$f" "/tmp/teile/$ORDNER/$f"; done
  # ohne Kompression: der Inhalt sind schon gepackte Dateien (ZIP, APK, EXE)
  ( cd /tmp/teile && zip -q -0 -r "$ziel" "$ORDNER" )
  echo "Teil $n von $m: $(numfmt --to=iec "$(stat -c %s "$ziel")")B, $(echo "${inhalt[i]}" | wc -w) Dateien"
done
rm -rf /tmp/teile
sha256sum -- "$ORDNER"-Teil-*.zip > TEILE-SHA256SUMS
cat TEILE-SHA256SUMS
