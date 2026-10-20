# Roadmap

## Schválené zadání

- Web zůstává **Terapie vědomého dotyku**. Terapeutická masáž je metoda: prvky muzikoterapie, vedený rozhovor a bodyterapeutické techniky.
- Čeština je jediný jazyk.
- Termín se domlouvá telefonicky. Formulář na kontaktu zůstává jako alternativa. Kalendář na webu nebude.
- Cílová skupina: lidé, kteří se už trochu znají a chtějí nový vhled skrze tělo.
- Nové stránky: ochrana osobních údajů (patička) a 404. Reference už existují a patří do menu.
- Měření: Umami, až bude adresa instance a website ID.
- SEO: veřejná adresa je `https://terapiedoteku.cz/`. `sitemap.xml`, `robots.txt`, kanonické URL, Open Graph a favicon jsou součást fáze 1. Podklady od uživatele nejsou.
- Umami se nevkládá, dokud není adresa instance a website ID.
- Rychlost webu a úpravy fotek v této fázi nejsou. Fonty se hostují na webu, aby prohlížeč neposílal adresu návštěvníka na Google.
- Bezpečnostní hlavičky GitHub Pages nastavit neumí. Meta značku Content-Security-Policy teď nedáváme, protože by musela povolit vložené styly a FormSubmit.
- Ceny, které platí: ochutnávka 800 Kč / 60 min a terapie 1 600 Kč / 120 min. Příplatek +500 Kč neplatí a na webu už není. Fotky zůstávají.
- Formulář doručí zprávu na `cesta-zmeny@email.cz` přes FormSubmit. Kalendář na webu nebude.
- Dokumentace: `README.md` je návod ke spuštění, `SDLC_GUIDE.md` je provozní příručka, `docs/ROADMAP.md` je plán a `docs/CHANGELOG.md` je historie změn. Všechny čtyři zůstávají.
- Hosting: GitHub Pages. Odkazy hlídá CI (Lychee nebo htmlproofer).
- Před schválením změny dostane uživatel odkaz, na kterém prohlížeč vidí sestavený web. jsDelivr ani raw GitHub to nejsou: vracejí zdrojový kód.
- Agent posoudí, jestli zvolený model na úkol sedí, a zůstane na něm. Když je zbytečně silný nebo slabý, navrhne nejnižší dostatečný model ještě před prací. Jiný model nebo subagent na jiném modelu jen s výslovným souhlasem.
- Nový optimalizační záměr začíná otázkami na stav, architekturu a cíl. Plán je prioritizovaný v tomto souboru. Fáze jde do kódu až po schválení záměru. Funkční části mimo úkol se nemění.
- Pull request je rovnou finální, bez draftu. Konflikt s `main` se popíše v chatu a vyřeší v kódu.
- U změny vzhledu patří k náhledu úsporný snímek nebo výřez. Rozbité odkazy, HTML a build hlídá CI.
- Po významnější fázi se kontroluje `sitemap.xml`, kanonické URL a indexace. Podle výsledku se navrhne redirect nebo nový crawl v Google Search Console.

## Další práce

1. Až DNS `terapiedoteku.cz` ukazuje na GitHub Pages a v repozitáři je vlastní doména, v Google Search Console přidat vlastnost `https://terapiedoteku.cz/` a zaregistrovat `sitemap.xml`. Starou vlastnost `https://garath33.github.io/vedomy-dotek/` nechat, dokud Google nepřevezme kanonické URL na doméně. Po dalších významných fázích zkontrolovat kanonické URL a navrhnout nový crawl.
2. Umami doplnit až s reálnou adresou instance a website ID. Do měření nepatří jméno, telefon ani text z formuláře.
3. Lychee v GitHub Actions, až bude na řadě samostatná úprava pipeline.

## Hotovo

- Texty podmínek a ochrany údajů jsou zkrácené. Vzor zprávy pro potvrzení termínu na webu není. Pravidla ceny, storna, reklamace a vzniku smlouvy zůstávají.
- Podmínky služby uvádějí konečné ceny, neplátcovství DPH a platbu ve studiu. Předmět podnikání z rejstříku na webu není. Smlouva vzniká až potvrzením termínu. Storno je zdarma nad 48 hodin, 50 % mezi 24 a 48 hodinami a 100 % pod 24 hodin, při náhlé nemoci bez poplatku. Reklamace a Česká obchodní inspekce jsou na stejné stránce. Tlačítko „Odstoupit od smlouvy“ se doplní až ve chvíli, kdy by formulář začal smlouvu uzavírat a právo odstoupit by u ní bylo. Léčivé zvuky a popis úlevy od bolesti zůstávají, sezení je vymezené jako terapeutická masáž, ne jako zdravotní péče.
- Doména `terapiedoteku.cz` má připravený import zóny v `docs/dns/terapiedoteku.cz.zone`. Apex míří na IP GitHub Pages, `www` na `garath33.github.io`, pošta zůstává u Hukotu. Kanonické URL, Open Graph, sitemap a robots používají `https://terapiedoteku.cz/`.
- Na stránce O Martinovi je „IT a státní správy“ ve stejné síle písma jako okolní věta. Psychoterapeutický výcvik je popsaný jako stav před koncem.
- Úvodní hero má text výš a rozložený do plochy, ne sražený u spodního okraje fotky.
- Nové fotky dlaní a svíčky jsou na úvodu u průběhu sezení, ve sloupci do 300 px. Na celou šířku hero se nehodí: zdroj má 505 px na šířku a je na výšku.
- Úvodní hero nese výřez dodaného záběru sezení. Rozložení a stín textu zůstávají. Spodní černý pruh na snímku není.
- Úvodní stránka ukazuje u výkladu terapie medailonek Martina Šimůnka, aby bylo hned jasné, kdo masáž provádí.
- Popisek u oleje na úvodu zní: Na masáži na vás čekají čisté ručníky, prostěradlo a přírodní olej.
- Nabídka na úvodu a v ceníku klidovou integraci na lůžku neuvádí. V průběhu sezení na úvodu zůstává jen čas na doznění.
- Pull request je rovnou připravený ke kontrole. Uživatel na GitHubu nepřepíná draft na Ready for review.
- Zvolený vzhled je Večerní klid. Přepínač a další dva návrhy jsou pryč. Portrét na stránce O Martinovi se neměnil.
- Kalimba a olej jsou na úvodu i jako menší záběry vedle textu.
- Dodaná fotka lehátka je na kontaktu. Úvodní hero používá výřez záběru sezení ve stejném rozložení.
- Náhled před schválením je vykreslená stránka sestaveného webu. jsDelivr se nepoužívá, protože ukazuje zdrojový kód. Ostrý web se k tomu nepoužívá.
- Volba modelu zůstává na uživateli. Agent ji posoudí a bez souhlasu ji nemění, ani u subagenta.
- Reference mluví jen o vědomém dotyku. Koučink a osobní rozvoj v ohlasech nejsou. Popisek referujícího je pod jménem. Kontakt má nadpis Kontakt a objednání a ceník neopakuje „na místě“.
- `.cursorrules` a `.cursorignore` drží schválené zadání a rozsah souborů, které se nemají načítat.
- Úvodní text popisuje terapeutickou masáž jako metodu Terapie vědomého dotyku.
- Kontaktní formulář odesílá poptávku přes FormSubmit na `cesta-zmeny@email.cz`.
- Fáze 1: kanonické URL a absolutní Open Graph, `sitemap.xml`, `robots.txt`, favicon, ochrana osobních údajů v patičce, stránka 404 mimo menu a mimo sitemap, lokální fonty.
