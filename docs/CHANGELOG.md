# Changelog

## Unreleased

### Changed

- Z referencí i úvodního přehledu ohlasů jsou pryč karty ke koučinku a osobnímu rozvoji. Zůstávají Anna, Jana, Lucie a Hanka.
- Jméno a popisek u ohlasu jsou pod sebou, aby se dlouhý popisek nelámal vedle jména.
- Úhrada v ceníku říká „na místě“ jen jednou: hotovost, případně QR kód.
- Nadpis kontaktu je Kontakt a objednání, stejně jako titulek stránky a odkaz v patičce.
- Úvodní stránka nese text o terapeutické masáži: analytická mysl, tělo jako místo odpovědí, vedený rozhovor a léčivé zvuky (šamanský buben, Koshi, kalimba).
- Kontaktní formulář odesílá poptávku přes FormSubmit na `cesta-zmeny@email.cz`. Po odeslání se návštěvník vrací na kontakt s potvrzením.

### Added

- Před schválením změn se posílá odkaz na náhled commitu přes jsDelivr, ne na ostrý web. Postup je v `SDLC_GUIDE.md` a v `.cursorrules`.
- Agent má posoudit vhodnost zvoleného modelu a nepřeptávat se na jiný, včetně Sonnetu, bez výslovného souhlasu. Subagent zůstává na stejném modelu, jinak se nespouští.

- `.cursorrules` popisují tento web: název Terapie vědomého dotyku, terapeutická masáž jako metoda, jen čeština, telefon jako hlavní rezervace, formulář jako alternativa, bez kalendáře, Umami až s reálným ID, styly ve stávajícím CSS.
- `.cursorignore` navíc vynechává výsledky testů, report Playwrightu a `public/images/`.
- `docs/ROADMAP.md` drží schválený rozsah a pořadí dalších úprav.
- Doplněno zadání: sitemap a kanonické URL, vlastní favicon a Open Graph, ceny bez příplatku +500 Kč, stávající fotky a doručení formuláře na `cesta-zmeny@email.cz`. Dokumentace zůstává ve čtyřech souborech s různým účelem.
