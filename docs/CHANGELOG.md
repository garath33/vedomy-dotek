# Changelog

## Unreleased

### Added

- Na úvodní stránce je u výkladu terapie medailonek Martina Šimůnka s popiskem, kdo masáž provádí, a odkazem na stránku O Martinovi.
- Tři návrhy vzhledu na všech stránkách: Lehátko v klidu, Světlý dech a Večerní klid. Přepínač je dole na stránce, volba zůstane v prohlížeči a jde sdílet přes `?vzhled=klid`, `?vzhled=svetlo` nebo `?vzhled=soumrak`.
- Nové atmosférické fotky lehátka, ručníků, dlaní, kalimby a tichého místa k zastavení. Pozadí je rozostřené, místnost nejde poznat. Stávající portrét Martina zůstává.

### Changed

- Úvod už nezakrývá fotku tmavým cihlovým přechodem. V klidu je text vedle záběru lehátka, ve světlém dechu leží v mléčném rámečku a ve večerním klidu stojí ve stínu vlevo.
- Hlavičky podstránek nesou fotku k tématu stránky: ceník ručníky a olej, kontakt připravené lehátko, reference dlaně v klidu, časté dotazy kalimbu, O Martinovi tiché zastavení. Právní stránky a 404 používají záběr lehátka.
- Kanonické URL a absolutní Open Graph adresa `https://garath33.github.io/vedomy-dotek/` na všech stránkách.
- `sitemap.xml`, `robots.txt` a favicon s písmenem V.
- Stránka `ochrana-osobnich-udaju.html` s odkazem v patičce a u souhlasu ve formuláři. Popisuje údaje z formuláře a doručení přes FormSubmit na `cesta-zmeny@email.cz`.
- Stránka `404.html` pro neexistující adresu. Není v menu ani v sitemap a má `noindex`.
- Fonty Playfair Display, Plus Jakarta Sans a Montserrat jsou uložené ve webu (latin a latin-ext, licence SIL OFL).
- Před schválením změn se posílá odkaz na náhled commitu přes jsDelivr, ne na ostrý web. Postup je v `SDLC_GUIDE.md` a v `.cursorrules`.
- Agent má posoudit vhodnost zvoleného modelu a nepřeptávat se na jiný, včetně Sonnetu, bez výslovného souhlasu. Subagent zůstává na stejném modelu, jinak se nespouští.
- `.cursorrules` popisují tento web: název Terapie vědomého dotyku, terapeutická masáž jako metoda, jen čeština, telefon jako hlavní rezervace, formulář jako alternativa, bez kalendáře, Umami až s reálným ID, styly ve stávajícím CSS.
- `.cursorignore` navíc vynechává výsledky testů, report Playwrightu a `public/images/`.
- `docs/ROADMAP.md` drží schválený rozsah a pořadí dalších úprav.
- Doplněno zadání: sitemap a kanonické URL, vlastní favicon a Open Graph, ceny bez příplatku +500 Kč, stávající fotky a doručení formuláře na `cesta-zmeny@email.cz`. Dokumentace zůstává ve čtyřech souborech s různým účelem.

### Changed

- Z referencí i úvodního přehledu ohlasů jsou pryč karty ke koučinku a osobnímu rozvoji. Zůstávají Anna, Jana, Lucie a Hanka.
- Jméno a popisek u ohlasu jsou pod sebou, aby se dlouhý popisek nelámal vedle jména.
- Úhrada v ceníku říká „na místě“ jen jednou: hotovost, případně QR kód.
- Nadpis kontaktu je Kontakt a objednání, stejně jako titulek stránky a odkaz v patičce.
- Úvodní stránka nese text o terapeutické masáži: analytická mysl, tělo jako místo odpovědí, vedený rozhovor a léčivé zvuky (šamanský buben, Koshi, kalimba).
- Kontaktní formulář odesílá poptávku přes FormSubmit na `cesta-zmeny@email.cz`. Po odeslání se návštěvník vrací na kontakt s poděkováním a telefonem.
