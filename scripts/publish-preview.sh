#!/bin/sh
# Nahraje složku dist/ do garath33/vedomy-dotek-preview, větev main, adresář site/.
# Historie náhledu se nepřidává: každý běh je nový kořen, ať se fotky nehromadí.
set -eu

if [ -z "${PREVIEW_TOKEN:-}" ]; then
  echo "Chybí secret PREVIEW_PAGES_TOKEN. Náhled se bez něj na GitHub Pages nepublikuje."
  exit 1
fi

if [ ! -f dist/index.html ]; then
  echo "Ve složce dist/ chybí index.html. Nejdřív musí proběhnout npm run build."
  exit 1
fi

workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT

git clone --depth 1 https://github.com/garath33/vedomy-dotek-preview.git "$workdir/repo"
if [ ! -f "$workdir/repo/.github/workflows/deploy-preview.yml" ]; then
  mkdir -p "$workdir/repo/.github/workflows"
  cp preview-pages/deploy-preview.yml "$workdir/repo/.github/workflows/deploy-preview.yml"
fi
if [ ! -f "$workdir/repo/README.md" ]; then
  cp preview-pages/README.md "$workdir/repo/README.md"
fi

mkdir -p "$workdir/github"
cp -a "$workdir/repo/.github" "$workdir/github/"

rm -rf "$workdir/repo/.git" "$workdir/repo/site"
mkdir -p "$workdir/repo/site"
cp -a dist/. "$workdir/repo/site/"
rm -rf "$workdir/repo/.github"
cp -a "$workdir/github/.github" "$workdir/repo/.github"

git -C "$workdir/repo" init -b main
git -C "$workdir/repo" remote add origin https://github.com/garath33/vedomy-dotek-preview.git
git -C "$workdir/repo" config user.name "github-actions[bot]"
git -C "$workdir/repo" config user.email "github-actions[bot]@users.noreply.github.com"
git -C "$workdir/repo" add -A
git -C "$workdir/repo" commit -m "Náhled ${GITHUB_SHA:-místní}"
git -C "$workdir/repo" -c http.extraheader="AUTHORIZATION: bearer ${PREVIEW_TOKEN}" push --force origin HEAD:main
echo "Náhled je odeslaný. Stránka se publikuje z repozitáře vedomy-dotek-preview."
