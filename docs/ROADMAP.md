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
- Formulář doručí zprávu na `cesta-zmeny@email.cz`. Dnešní `mailto:` jen otevře poštovní program návštěvníka. Odeslání doplníme službou, až uživatel dodá její adresu.
- Dokumentace: `README.md` je návod ke spuštění, `SDLC_GUIDE.md` je provozní příručka, `docs/ROADMAP.md` je plán a `docs/CHANGELOG.md` je historie změn. Všechny čtyři zůstávají.
- Hosting: GitHub Pages. Odkazy hlídá CI (Lychee nebo htmlproofer).

## Další práce

1. Propis metody do textů na úvodu a v navazujících stránkách, bez přejmenování praxe.
2. Telefon jako hlavní výzva k akci. Formulář nechat jako druhou cestu a napojit ho na doručení e-mailu, až bude adresa služby. Ověřit, že nikde není kalendář.
3. `reference.html` do navigace, `ochrana-osobnich-udaju.html` a `404.html`.
4. `sitemap.xml`, `robots.txt`, kanonické URL, jednoduchý favicon a Open Graph. Místo pro Umami skript.
5. Lychee v GitHub Actions. Po nasazení připomenout registraci sitemap v Google Search Console.

## Hotovo

- `.cursorrules` a `.cursorignore` drží schválené zadání a rozsah souborů, které se nemají načítat.
