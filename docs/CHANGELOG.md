# Changelog

## Unreleased

### Added

- Soubor `docs/dns/terapiedoteku.cz.zone` pro import do DNS u Hukotu. Apex `terapiedoteku.cz` míří na GitHub Pages, `www` na `garath33.github.io`. Pošta, nameservery a CAA pro Let's Encrypt zůstávají.
- Na úvodní stránce je u výkladu terapie medailonek Martina Šimůnka s popiskem, kdo masáž provádí, a odkazem na stránku O Martinovi.
- Pull request se zakládá rovnou jako připravený ke kontrole. Draft se nenechává.
- Tři návrhy vzhledu na všech stránkách: Lehátko v klidu, Světlý dech a Večerní klid. Přepínač je dole na stránce, volba zůstane v prohlížeči a jde sdílet přes `?vzhled=klid`, `?vzhled=svetlo` nebo `?vzhled=soumrak`.
- Nové atmosférické fotky lehátka, ručníků, dlaní, kalimby a tichého místa k zastavení. Pozadí je rozostřené, místnost nejde poznat. Stávající portrét Martina zůstává.
- Na úvodu jsou kalimba a olej také jako menší záběry u textu o léčivých zvucích a přípravě sezení.
- Úvod a kontakt používají dodanou fotku lehátka v měkkém denním světle.
- Kanonické URL a absolutní Open Graph adresa `https://garath33.github.io/vedomy-dotek/` na všech stránkách.
- `sitemap.xml`, `robots.txt` a favicon s písmenem V.
- Stránka `ochrana-osobnich-udaju.html` s odkazem v patičce a u souhlasu ve formuláři. Popisuje údaje z formuláře a doručení přes FormSubmit na `cesta-zmeny@email.cz`.
- Stránka `404.html` pro neexistující adresu. Není v menu ani v sitemap a má `noindex`.
- Fonty Playfair Display, Plus Jakarta Sans a Montserrat jsou uložené ve webu (latin a latin-ext, licence SIL OFL).
- Před schválením změn se posílá odkaz na vykreslený sestavený web, ne na ostrý web a ne na jsDelivr. jsDelivr vrací zdrojový kód. Postup je v `SDLC_GUIDE.md` a v `.cursorrules`.
- Agent má posoudit vhodnost zvoleného modelu a nepřeptávat se na jiný, včetně Sonnetu, bez výslovného souhlasu. Subagent zůstává na stejném modelu, jinak se nespouští.
- `.cursorrules` popisují tento web: název Terapie vědomého dotyku, terapeutická masáž jako metoda, jen čeština, telefon jako hlavní rezervace, formulář jako alternativa, bez kalendáře, Umami až s reálným ID, styly ve stávajícím CSS.
- `.cursorignore` navíc vynechává výsledky testů, report Playwrightu a `public/images/`.
- `docs/ROADMAP.md` drží schválený rozsah a pořadí dalších úprav.
- Do `.cursorrules`, `SDLC_GUIDE.md` a `docs/ROADMAP.md` přibyl zbytek master promptu, který tam chyběl: práce po schválených iteracích, nejnižší dostatečný model bez přepnutí bez souhlasu, respekt k `.gitignore`, finální pull request bez draftu, konflikty popsané v chatu a vyřešené v kódu, úsporný vizuální náhled u změny layoutu a kontrola sitemap, kanonických URL a indexace po významnější fázi.
- Doplněno zadání: sitemap a kanonické URL, vlastní favicon a Open Graph, ceny bez příplatku +500 Kč, stávající fotky a doručení formuláře na `cesta-zmeny@email.cz`. Dokumentace zůstává ve čtyřech souborech s různým účelem.

### Changed

- Stránka podmínek uvádí konečné ceny, neplátcovství DPH, platbu ve studiu a vznik smlouvy až potvrzením termínu. Storno zůstává zdarma nad 48 hodin, 50 % mezi 24 a 48 hodinami a 100 % pod 24 hodin, s výjimkou náhlé nemoci. Doplněna je reklamace, Česká obchodní inspekce a věta, že tlačítko pro odstoupení na webu není, protože se tu smlouva neuzavírá. Léčivé zvuky a úleva od bolesti zůstávají, s vymezením, že sezení není zdravotní péče. Tlačítka znějí „Poptat“ a formulář zůstává nezávaznou poptávkou.
- Kanonické URL, Open Graph, `sitemap.xml` a `robots.txt` používají `https://terapiedoteku.cz/`.
- Na stránce O Martinovi už není tučně „IT a státní správy“. U psychoterapeutického výcviku je, že je Martin před jeho koncem.
- Úvodní text na mobilu a tabletu začíná výš a je rozložený po výšce hero, aby horní část fotky nezůstávala prázdná. Stín je silnější u textu a dolů pouští lehátko. Na široké obrazovce je stejný text opticky ve středu výšky.
- Popisek u oleje na úvodu zní: Na masáži na vás čekají čisté ručníky, prostěradlo a přírodní olej.
- V nabídce na úvodu i v ceníku už není položka o klidové integraci na lůžku. V popisu průběhu na úvodu zůstává jen to, že na lůžku bude čas na doznění.
- Zvolený vzhled je Večerní klid. Přepínač návrhů a varianty Lehátko v klidu a Světlý dech jsou pryč.
- Úvod už nezakrývá fotku tmavým cihlovým přechodem. Text stojí ve stínu vlevo přes záběr lehátka.
- Hlavičky podstránek nesou fotku k tématu stránky: ceník ručníky a olej, kontakt připravené lehátko, reference dlaně v klidu, časté dotazy kalimbu, O Martinovi tiché zastavení. Právní stránky a 404 používají záběr lehátka.
- Z referencí i úvodního přehledu ohlasů jsou pryč karty ke koučinku a osobnímu rozvoji. Zůstávají Anna, Jana, Lucie a Hanka.
- Jméno a popisek u ohlasu jsou pod sebou, aby se dlouhý popisek nelámal vedle jména.
- Úhrada v ceníku říká „na místě“ jen jednou: hotovost, případně QR kód.
- Nadpis kontaktu je Kontakt a objednání, stejně jako titulek stránky a odkaz v patičce.
- Úvodní stránka nese text o terapeutické masáži: analytická mysl, tělo jako místo odpovědí, vedený rozhovor a léčivé zvuky (šamanský buben, Koshi, kalimba).
- Kontaktní formulář odesílá poptávku přes FormSubmit na `cesta-zmeny@email.cz`. Po odeslání se návštěvník vrací na kontakt s poděkováním a telefonem.
