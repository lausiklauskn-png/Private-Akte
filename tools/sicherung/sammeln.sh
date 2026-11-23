#!/usr/bin/env bash
# Geschenkbox und Sicherung: sammelt für jede App aus apps.tsv
#   - den Quellcode mit vollem Verlauf (alle Zweige, Tags, Commits) als ZIP,
#   - die neueste Android-APK und den neuesten Windows-Installer aus den Releases,
#   - die veröffentlichte Web-App (PWA) als ZIP,
# und schreibt dazu INHALT.md, Geschenkbox.html und SHA256SUMS.
# Läuft in GitHub Actions (braucht git, gh, jq, curl, wget, zip). Ergebnis: Ordner ./paket
set -euo pipefail

BESITZER="lausiklauskn-png"
HIER="$(cd "$(dirname "$0")" && pwd)"
ARBEIT="${ARBEIT:-$PWD/sicherung-arbeit}"
PAKET="${PAKET:-$PWD/paket}"
STAND="${STAND:-$(date -u +%Y-%m-%d)}"
mkdir -p "$ARBEIT" "$PAKET"
: > "$ARBEIT/zeilen.tsv"

groesse() { numfmt --to=iec --suffix=B "$(stat -c %s "$1")"; }

# neueste Datei mit passender Endung aus den Releases eines Repos (ohne Entwürfe)
neueste() {
  local repo="$1" muster="$2"
  gh api "repos/$BESITZER/$repo/releases?per_page=60" 2>/dev/null | jq -r --arg m "$muster" '
    [ .[] | select(.draft | not) ] | sort_by(.created_at) | reverse
    | [ .[] | .tag_name as $t | .assets[] | select(.name | test($m; "i")) | {t: $t, n: .name, u: .browser_download_url} ]
    | first // empty | "\(.t)\t\(.n)\t\(.u)"'
}

# Web-App: so, wie GitHub Pages sie ausliefert.
#  - Pages aus dem Zweig (kein upload-pages-artifact): die Dateien des Hauptzweigs sind die Web-App.
#  - Pages aus einem Bau: das letzte noch vorhandene Paket "github-pages" eines erfolgreichen Laufs.
#  - Sonst ein Abzug der Seite (mehrere Runden: alles, was HTML, CSS, JS und JSON nennen).
# Ergebnis in $ARBEIT/pwa/<repo>; Rückgabe der Art in $webart.
pwa_holen() {
  local repo="$1" q="$2" ziel="$ARBEIT/pwa/$1" basis="https://$BESITZER.github.io/$1/"
  rm -rf "$ziel"; mkdir -p "$ziel"; webart=""
  local bau
  bau=$(grep -l 'upload-pages-artifact' "$q"/.github/workflows/*.y*ml 2>/dev/null | head -n 1 || true)
  if [ -z "$bau" ]; then
    [ -f "$q/index.html" ] || return 1
    git -C "$q" archive --format=tar HEAD | tar -x -C "$ziel"
    webart="Dateien des Hauptzweigs (so liefert GitHub Pages sie aus)"
    return 0
  fi
  local wf lauf art
  wf=$(basename "$bau")
  for lauf in $(gh api "repos/$BESITZER/$repo/actions/workflows/$wf/runs?status=success&per_page=20" -q '.workflow_runs[].id' 2>/dev/null); do
    art=$(gh api "repos/$BESITZER/$repo/actions/runs/$lauf/artifacts" -q '.artifacts[] | select(.name=="github-pages" and (.expired|not)) | .id' 2>/dev/null | head -n 1)
    [ -n "$art" ] || continue
    if gh api "repos/$BESITZER/$repo/actions/artifacts/$art/zip" > "$ARBEIT/pages.zip" 2>/dev/null; then
      rm -rf "$ARBEIT/pages"; mkdir -p "$ARBEIT/pages"
      unzip -q -o "$ARBEIT/pages.zip" -d "$ARBEIT/pages" && tar -xf "$ARBEIT/pages/artifact.tar" -C "$ziel"
      rm -rf "$ARBEIT/pages" "$ARBEIT/pages.zip"
      [ -f "$ziel/index.html" ] && { webart="Bau aus Lauf $lauf ($wf), wie auf GitHub Pages veröffentlicht"; return 0; }
    fi
  done
  # Rückfall: Abzug der veröffentlichten Seite
  curl -fsSIL "$basis" > /dev/null 2>&1 || return 1
  wget -q -e robots=off --mirror --no-parent --page-requisites -nH --cut-dirs=1 --reject-regex '\?' -P "$ziel" "$basis" || true
  local runde d p
  for runde in 1 2 3 4; do
    : > "$ARBEIT/neu.txt"
    find "$ziel" -type f \( -name '*.html' -o -name '*.js' -o -name '*.mjs' -o -name '*.css' -o -name '*.json' -o -name '*.webmanifest' \) -size -8M -print0 \
      | xargs -0 grep -ohE "[\"'(](\./|/$repo/)?[A-Za-z0-9_][A-Za-z0-9_./@-]*\.(js|mjs|css|html|json|png|svg|ico|jpg|jpeg|webp|webmanifest|woff2?|wasm|txt|gz|onnx|traineddata|mp4|webm)[\"')]" 2>/dev/null \
      | sed -E "s#^[\"'(]##; s#[\"')]\$##; s#^\./##; s#^/$repo/##" | grep -v '^\.\.' | sort -u > "$ARBEIT/kandidaten.txt" || true
    while read -r p; do
      [ -f "$ziel/$p" ] && continue
      mkdir -p "$ziel/$(dirname "$p")"
      if curl -fsSL "$basis$p" -o "$ziel/$p" 2>/dev/null; then echo "$p" >> "$ARBEIT/neu.txt"; else rm -f "$ziel/$p"; fi
    done < "$ARBEIT/kandidaten.txt"
    [ -s "$ARBEIT/neu.txt" ] || break
  done
  find "$ziel" -type d -empty -delete
  [ -f "$ziel/index.html" ] && webart="Abzug der veröffentlichten Seite (das Bau-Paket war abgelaufen; vollständig neu bauen aus dem Quellcode)"
  [ -n "$webart" ]
}

while IFS=$'\t' read -r repo name rolle pwa; do
  [ -z "$repo" ] || [ "${repo:0:1}" = "#" ] && continue
  echo "::group::$name ($repo)"

  # 1. Quellcode mit vollem Verlauf
  q="$ARBEIT/quelle/$repo"
  rm -rf "$q"
  git clone --quiet --no-single-branch "https://github.com/$BESITZER/$repo.git" "$q"
  git -C "$q" fetch --quiet --tags origin '+refs/heads/*:refs/remotes/origin/*'
  # alle Zweige als eigene Zweige anlegen, damit sie nach dem Entpacken ohne Netz da sind
  for z in $(git -C "$q" for-each-ref --format='%(refname:strip=3)' refs/remotes/origin | grep -v '^HEAD$'); do
    git -C "$q" show-ref --quiet "refs/heads/$z" || git -C "$q" branch --quiet "$z" "origin/$z" 2>/dev/null || true
  done
  git -C "$q" remote set-url origin "https://github.com/$BESITZER/$repo.git"
  commits=$(git -C "$q" rev-list --count --all)
  zweige=$(git -C "$q" for-each-ref refs/heads | wc -l)
  tags=$(git -C "$q" tag | wc -l)
  kopf=$(git -C "$q" rev-parse --short=12 HEAD)
  zuletzt=$(git -C "$q" log -1 --format=%cs HEAD)
  erster=$(git -C "$q" log --all --max-parents=0 --format=%cs | sort | sed -n 1p)
  git -C "$q" fsck --no-progress --connectivity-only > /dev/null
  # Web-App (PWA), solange die Quelle noch da ist
  web="" webart=""
  if [ "$pwa" = "ja" ] && pwa_holen "$repo" "$q"; then
    web="WebApp-$repo.zip"
    ( cd "$ARBEIT/pwa" && zip -qry "$PAKET/$web" "$repo" )
  fi
  rm -rf "$ARBEIT/pwa/$repo"
  zipq="Quellcode-$repo-mit-Verlauf.zip"
  ( cd "$ARBEIT/quelle" && zip -qry "$PAKET/$zipq" "$repo" )
  rm -rf "$q"

  # 2. Android und Windows aus den Releases
  apk="" exe=""
  if z=$(neueste "$repo" '\.apk$') && [ -n "$z" ]; then
    IFS=$'\t' read -r t n u <<< "$z"; apk="$repo--$n"; curl -fsSL "$u" -o "$PAKET/$apk"; apktag="$t"
  fi
  if z=$(neueste "$repo" '(setup|installer)?.*\.(exe|msi)$') && [ -n "$z" ]; then
    IFS=$'\t' read -r t n u <<< "$z"; exe="$repo--$n"; curl -fsSL "$u" -o "$PAKET/$exe"; exetag="$t"
  fi

  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' \
    "$repo" "$name" "$rolle" "$zipq" "$commits" "$zweige" "$tags" "$kopf" "$erster" "$zuletzt" \
    "$apk" "${apktag:-}" "$exe" "${exetag:-}" >> "$ARBEIT/zeilen.tsv"
  printf '%s\t%s\n' "$web" "$webart" >> "$ARBEIT/web.txt"
  unset apktag exetag
  echo "::endgroup::"
done < "$HIER/apps.tsv"

cp "$HIER/WIEDERHERSTELLEN.md" "$PAKET/WIEDERHERSTELLEN.md"
paste "$ARBEIT/zeilen.tsv" "$ARBEIT/web.txt" > "$ARBEIT/alle.tsv"
STAND="$STAND" PAKET="$PAKET" node "$HIER/beschreiben.mjs" "$ARBEIT/alle.tsv"
( cd "$PAKET" && sha256sum -- * | grep -v ' SHA256SUMS$' > SHA256SUMS )
ls -la "$PAKET"
du -sh "$PAKET"
