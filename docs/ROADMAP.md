# Roadmap

## Schválené zadání

- Web zůstává **Terapie vědomého dotyku**. Terapeutická masáž je metoda: prvky muzikoterapie, vedený rozhovor a bodyterapeutické techniky.
- Čeština je jediný jazyk.
- Termín se domlouvá telefonicky. Formulář na kontaktu zůstává jako alternativa. Kalendář na webu nebude.
- Cílová skupina: lidé, kteří se už trochu znají a chtějí nový vhled skrze tělo.
- Nové stránky: ochrana osobních údajů (patička) a 404. Reference už existují a patří do menu.
- Měření: Umami, až bude adresa instance a website ID.
- SEO: `sitemap.xml`, `robots.txt` a kanonické URL jsou schválené. Open Graph a favicon vzniknou v projektu, podklady od uživatele nejsou.
- Ceny, které platí: ochutnávka 800 Kč / 60 min a terapie 1 600 Kč / 120 min. Příplatek +500 Kč neplatí a na webu už není. Fotky zůstávají.
- Formulář doručí zprávu na `cesta-zmeny@email.cz` přes FormSubmit. Kalendář na webu nebude.
- Dokumentace: `README.md` je návod ke spuštění, `SDLC_GUIDE.md` je provozní příručka, `docs/ROADMAP.md` je plán a `docs/CHANGELOG.md` je historie změn. Všechny čtyři zůstávají.
- Hosting: GitHub Pages. Odkazy hlídá CI (Lychee nebo htmlproofer).
- Před schválením změny dostane uživatel odkaz na náhled daného commitu (`https://cdn.jsdelivr.net/gh/garath33/vedomy-dotek@<sha>/index.html`), ne na ostrý web.
- Agent posoudí, jestli zvolený model na úkol sedí, a zůstane na něm. Jiný model nebo subagent na jiném modelu jen s výslovným souhlasem.

## Další práce

1. Propis metody do textů na úvodu a v navazujících stránkách, bez přejmenování praxe.
2. Ověřit, že nikde není kalendář a telefon zůstává hlavní výzva k akci.
3. `reference.html` do navigace, `ochrana-osobnich-udaju.html` a `404.html`.
4. `sitemap.xml`, `robots.txt`, kanonické URL, jednoduchý favicon a Open Graph. Místo pro Umami skript.
5. Lychee v GitHub Actions. Po nasazení připomenout registraci sitemap v Google Search Console.

## Hotovo

- Náhled před schválením je veřejný odkaz na commit. Ostrý web se k tomu nepoužívá.
- Volba modelu zůstává na uživateli. Agent ji posoudí a bez souhlasu ji nemění, ani u subagenta.
- Reference mluví jen o vědomém dotyku. Koučink a osobní rozvoj v ohlasech nejsou. Popisek referujícího je pod jménem. Kontakt má nadpis Kontakt a objednání a ceník neopakuje „na místě“.
- `.cursorrules` a `.cursorignore` drží schválené zadání a rozsah souborů, které se nemají načítat.
- Úvodní text popisuje terapeutickou masáž jako metodu Terapie vědomého dotyku.
- Kontaktní formulář odesílá poptávku přes FormSubmit na `cesta-zmeny@email.cz`.
