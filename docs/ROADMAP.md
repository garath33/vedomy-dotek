# Roadmap

## Schválené zadání

- Web zůstává **Terapie vědomého dotyku**. Terapeutická masáž je metoda: prvky muzikoterapie, vedený rozhovor a bodyterapeutické techniky.
- Čeština je jediný jazyk.
- Termín se domlouvá telefonicky. Formulář na kontaktu zůstává jako alternativa. Kalendář na webu nebude.
- Cílová skupina: lidé, kteří se už trochu znají a chtějí nový vhled skrze tělo.
- Nové stránky: ochrana osobních údajů (patička) a 404. Reference už existují a patří do menu.
- Měření: Umami, až bude adresa instance a website ID.
- SEO: veřejná adresa je `https://garath33.github.io/vedomy-dotek/`. `sitemap.xml`, `robots.txt`, kanonické URL, Open Graph a favicon jsou součást fáze 1. Podklady od uživatele nejsou.
- Umami se nevkládá, dokud není adresa instance a website ID.
- Rychlost webu a úpravy fotek v této fázi nejsou. Fonty se hostují na webu, aby prohlížeč neposílal adresu návštěvníka na Google.
- Bezpečnostní hlavičky GitHub Pages nastavit neumí. Meta značku Content-Security-Policy teď nedáváme, protože by musela povolit vložené styly a FormSubmit.
- Ceny, které platí: ochutnávka 800 Kč / 60 min a terapie 1 600 Kč / 120 min. Příplatek +500 Kč neplatí a na webu už není. Fotky zůstávají.
- Formulář doručí zprávu na `cesta-zmeny@email.cz` přes FormSubmit. Kalendář na webu nebude.
- Dokumentace: `README.md` je návod ke spuštění, `SDLC_GUIDE.md` je provozní příručka, `docs/ROADMAP.md` je plán a `docs/CHANGELOG.md` je historie změn. Všechny čtyři zůstávají.
- Hosting: GitHub Pages. Odkazy hlídá CI (Lychee nebo htmlproofer).
- Před schválením změny dostane uživatel odkaz na náhled daného commitu (`https://cdn.jsdelivr.net/gh/garath33/vedomy-dotek@<sha>/index.html`), ne na ostrý web.
- Agent posoudí, jestli zvolený model na úkol sedí, a zůstane na něm. Jiný model nebo subagent na jiném modelu jen s výslovným souhlasem.

## Další práce

1. Po nasazení na `main` provést registraci `sitemap.xml` v Google Search Console.
2. Umami doplnit až s reálnou adresou instance a website ID. Do měření nepatří jméno, telefon ani text z formuláře.
3. Lychee v GitHub Actions, až bude na řadě samostatná úprava pipeline.

## Hotovo

- Úvodní stránka ukazuje u výkladu terapie medailonek Martina Šimůnka, aby bylo hned jasné, kdo masáž provádí.
- Tři návrhy vzhledu (Lehátko v klidu, Světlý dech, Večerní klid) s rozostřeným záběrem lehátka a fotkou v hlavičce podle stránky. Portrét na stránce O Martinovi se neměnil. Po výběru jednoho směru se přepínač sundá.
- Náhled před schválením je veřejný odkaz na commit. Ostrý web se k tomu nepoužívá.
- Volba modelu zůstává na uživateli. Agent ji posoudí a bez souhlasu ji nemění, ani u subagenta.
- Reference mluví jen o vědomém dotyku. Koučink a osobní rozvoj v ohlasech nejsou. Popisek referujícího je pod jménem. Kontakt má nadpis Kontakt a objednání a ceník neopakuje „na místě“.
- `.cursorrules` a `.cursorignore` drží schválené zadání a rozsah souborů, které se nemají načítat.
- Úvodní text popisuje terapeutickou masáž jako metodu Terapie vědomého dotyku.
- Kontaktní formulář odesílá poptávku přes FormSubmit na `cesta-zmeny@email.cz`.
- Fáze 1: kanonické URL a absolutní Open Graph, `sitemap.xml`, `robots.txt`, favicon, ochrana osobních údajů v patičce, stránka 404 mimo menu a mimo sitemap, lokální fonty.
