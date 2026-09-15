# Terapie vědomého dotyku - Martin Šimůnek

Samostatný statický web pro terapeutickou práci s tělem, masáže a vědomý dotek (Praha 5 – Zličín).

Tento projekt je připraven pro bezplatný hosting na **GitHub Pages**, nabízí plně responzivní design, automatické testy v rámci SDLC (Software Development Life Cycle) a CI/CD pipeline přes GitHub Actions.

---

## 📋 Přehled stránek a struktura

Web je rozdělen do čistých, srozumitelných sekcí:

1. **Úvodní stránka (`index.html`)**:
   - Filozofie vědomého dotyku a propojení těla s emocemi
   - Záměr práce (biodynamický přístup, uvolnění emočního náboje ze svalů a kloubů)
   - 3 kroky průběhu setkání (Naladění a rozhovor &rarr; Práce s tělem &rarr; Integrace)
   - Interaktivní slideshow s reálnými referencemi klientů (Anna, Jana, Lucie, Hanka)
   - Rychlý přehled variant péče a CTA tlačítka

2. **O Martinovi (`o-martinovi.html`)**:
   - Kompletní životní příběh a cesta od IT a státní správy k pomáhajícím profesím
   - Zkušenosti a vzdělání:
     - 4. rok 5letého psychoterapeutického výcviku
     - Rekvalifikovaný masér (Čechy, Thajsko)
     - Bojová umění a sebeobrana (WingTsun, Kung-fu terapie)
     - Vedení skupin divadelní improvizace
     - Koučink a kariérní poradenství

3. **Ceník a formáty sezení (`cenik.html`)**:
   - **Ochutnávka vědomého dotyku**: 800 Kč / 60 min
   - **Terapie vědomého dotyku**: 1 600 Kč / 120 min (hloubková péče se šamanským bubnem)
   - **Masáž u vás (domov/kancelář)**: příplatek +500 Kč po Praze
   - Platební a storno podmínky (zrušení do 24 h)

4. **Časté dotazy (`faq.html`)**:
   - Interaktivní akordeon s odpověďmi na přípravu, kontraindikace, otázku usnutí při masáži a přístup k tlaku

5. **Kontakt a rezervace (`kontakt.html`)**:
   - Telefon: `+420 604 430 087`
   - E-mail: `cesta-zmeny@email.cz`
   - Adresa studia: `Hevlínská 495/3, Praha 5 - Zličín`
   - MHD dostupnost a bezplatné parkování
   - IČO: `08162867`
   - Rezervační/poptávkový formulář

---

## 🛠️ Použitý technologický stack

- **Vite**: Moderní a bleskově rychlý bundler pro statický HTML/CSS/JS export
- **Responzivní CSS Design Systém**: Moderní typografie (*Playfair Display*, *Plus Jakarta Sans*, *Montserrat*), přizpůsobená barevná paleta odkazující na prvek těla
- **Vanilla JavaScript**: Mobilní hamburger navigace, interaktivní slideshow referencí a obsluha akordeonů
- **Automatizované testy (Node.js)**:
  - `check-links.mjs`: Broken link checker ověřující existenci všech interních odkazů, CSS a obrázků
  - `test-content.mjs`: Test integrity obsahu a přítomnosti klíčových informací a meta tagů

---

## 🚀 Lokální spuštění a vývoj

Pro spuštění projektu na vašem počítači:

```bash
# 1. Instalace závislostí
npm install

# 2. Spuštění lokálního vývojového serveru
npm run dev

# 3. Spuštění testů a validace odkazů
npm run test

# 4. Produkční sestavení (vygeneruje soubory do složky dist/)
npm run build
```

---

## 🔄 SDLC a GitHub Staging/Produkční Workflow

Projekt implementuje standardní **SDLC (Software Development Life Cycle)**:

```
[Lokální větev / feature branch]
               │
               ▼  (Git push & PR)
      [Větev `staging`]
               │
               ├─► GitHub Actions spustí: Testy (link check + content validation)
               ├─► Automatický build (Vite)
               └─► Deploy na GitHub Pages (Staging Preview)
               │
               ▼  (Schválení / Merge)
       [Větev `main`]
               │
               ├─► Automatický build & test
               └─► Produkční nasazení (GitHub Pages Production)
```

Pipeline v `.github/workflows/deploy.yml` automaticky:
1. Nainstaluje čisté závislosti (`npm ci`).
2. Sestaví projekt (`npm run build`).
3. Otestuje všechny odkazy a assety (`npm run test:links`).
4. Ověří integritu klíčového obsahu (`npm run test:content`).
5. Pokud vše projde, automaticky publikuje na **GitHub Pages**.

---

## 🌐 Návod: Jak založit repozitář na GitHubu a aktivovat Pages

Podrobný krok-za-krokem návod naleznete v odpovědi v chatu nebo v souboru `SDLC_GUIDE.md`.
