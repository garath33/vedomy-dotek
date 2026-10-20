# Průvodce SDLC, GitHub Pages a Staging prostředím

Tento dokument slouží jako detailní manuál pro správu webu **Terapie vědomého dotyku** podle profesionálních standardů vývoje software (SDLC).

---

## 1. Jak založit nový repozitář na GitHubu

1. Přihlaste se na svůj účet na [GitHub.com](https://github.com).
2. Vpravo nahoře klikněte na tlačítko **`+`** &rarr; **New repository**.
3. **Repository name**: Zvolte například:
   - `vedomy-dotek` (stránka pak bude dostupná na `https://<vase-jmeno>.github.io/vedomy-dotek/`)
   - nebo `terapie-vedomeho-dotyku`
   - *(Tip: pokud byste v budoucnu chtěl web na hlavní doméně bez podadresáře, můžete repozitář pojmenovat `<vase-jmeno>.github.io`)*.
4. **Visibility**: Vyberte **Public** (pro bezplatné GitHub Pages u standardních osobních účtů je nutné Public).
5. **Initialize repository**: Nezaškrtávejte README ani .gitignore (ty již máme v našem projektu vytvořené).
6. Klikněte na **Create repository**.

---

## 2. Jak nastavit GitHub Pages v nastavení repozitáře

Aby GitHub věděl, že k nasazení používá naši automatizovanou pipeline:

1. V repozitáři přejděte do záložky **Settings** (Ozubené kolo nahoře).
2. V levém menu klikněte na **Pages**.
3. V sekci **Build and deployment** pod **Source**:
   - Zvolte možnost **GitHub Actions** (místo původního "Deploy from a branch").
4. To je vše! Jakmile provedete push do větve `main` nebo `staging`, GitHub Actions workflow v `.github/workflows/deploy.yml` web automaticky otestuje a publikuje.

---

## 3. Náhled a ostrý web

Jeden repozitář GitHub Pages má jen jeden web. Ostrý web a náhled jsou proto dva repozitáře.

### Ostrý web
- Adresa je `https://terapiedoteku.cz/`. `https://garath33.github.io/vedomy-dotek/` na ni přesměrovává.
- Publikuje se jen při pushi do `main`, po zelených testech.
- Schválení změny je sloučení pull requestu do `main`.

### Náhled
- Adresa je `https://garath33.github.io/vedomy-dotek-preview/`.
- Pull request po zelených testech vezme už sestavenou složku `dist/`, doplní `noindex`, smaže `sitemap.xml` a na náhled dá `robots.txt` se zákazem procházení. Kanonická adresa zůstává `https://terapiedoteku.cz/`, aby se náhled nezařadil jako druhý web.
- Soubory se odešlou do repozitáře `garath33/vedomy-dotek-preview`, složka `site/`. Tamní Actions je teprve vystaví na GitHub Pages.
- Prohlížeč musí dostat `text/html`. jsDelivr ani raw GitHub se neposílají.
- U konkrétní úpravy se k adrese přidá i stránka, například `o-martinovi.html`.
- Větev `staging` je dál jen kopie `main`. Na Pages se z ní nenasazuje.

### Jednorázové propojení náhledu
V repozitáři `vedomy-dotek` je potřeba secret `PREVIEW_PAGES_TOKEN`. Bez něj job „Náhled na GitHub Pages“ skončí chybou a náhled se neaktualizuje.

1. V GitHubu otevřete **Settings → Developer settings → Fine-grained tokens** a vytvořte token.
2. Přístup dejte jen k repozitáři `garath33/vedomy-dotek-preview`. Oprávnění **Contents: Read and write**.
3. V repozitáři `vedomy-dotek` otevřete **Settings → Secrets and variables → Actions** a přidejte secret `PREVIEW_PAGES_TOKEN`.
4. V repozitáři `vedomy-dotek-preview` při prvním běhu Actions potvrďte nasazení, pokud si ho GitHub vyžádá. Workflow do toho repozitáře zkopíruje první úspěšný náhled, ručně se tam nic nenahrává.

### Model a souhlas s jiným modelem
- Agent si na začátku úkolu řekne, jestli zvolený model na tu práci sedí. Slabý model na těžký úkol i silný model na drobnost (styly, texty, changelog) má pojmenovat a navrhnout nejnižší model, který stačí.
- Zůstává na modelu, který jste vybral. Přepnutí na jiný model, včetně Sonnetu, je až po vašem výslovném souhlasu.
- Subagent, pokud vůbec běží, jede na stejném modelu. Když to neumí, nespouští se.

---

## 4. Testovací fáze (QA & Automatizované testy)

Projekt obsahuje komplexní testovací sadu, kterou lze spustit jedním příkazem `npm run test`:

1. **`npm run test:e2e` (Playwright testy responzivity - Desktop, Mobil, Tablet)**
   - Testuje zobrazení na reálných rozlišeních: **Desktop Chrome (1280px)**, **Mobile Pixel 5 (393px)**, **Mobile iPhone 13 (390px)** a **Tablet iPad (820px)**.
   - **Horizontal Overflow Check**: Zaručuje, že na žádném mobilním telefonu nedochází k nechtěnému vodorovnému posouvání (žádný element nepřetéká obrazovku).
   - **Navigační test**: Ověřuje chování hamburger menu na mobilu/tabletu a standardního menu na desktopu.
   - **Interaktivní prvky**: Testuje přepínání referencí v karuselu, otevírání/zavírání akordeonů v sekci FAQ a funkčnost rezervačního formuláře.

2. **`npm run test:compat` (Zpětná kompatibilita Staging & Produkce)**
   - Ověřuje, že všechny interní assety a skripty používají relativní cesty, takže fungují na jakékoliv subdoméně, náhledu i vlastní produkční doméně bez zásahu do kódu.
   - Kontroluje bezpečnostní atributy (`rel="noopener"` u externích odkazů).

3. **`npm run test:links` (Broken Link Checker)**
   - Projde všechny vygenerované HTML soubory v `dist/`.
   - Zkontroluje, zda každý interní odkaz (na jinou stránku, kotvu, CSS styl, JS skript nebo obrázek) reálně existuje na disku.

4. **`npm run test:content` (Validace obsahu)**
   - Ověřuje přítomnost povinných SEO meta tagů (`<title>`, `<meta name="description">`, viewport).
   - Kontroluje přítomnost klíčových údajů (kontakt, ceník, reference).

---

## 5. Zpětná kompatibilita a přímý deploy na produkci (Bypass Stagingu)

Pokud nastane situace, kdy potřebujete **nasadit úpravy ihned na produkci (`main`)**:
- Pipeline je navržena tak, že **přímý push do větve `main` projde kompletní sadou testů (včetně responzivity)**.
- Pokud testy projdou, změna se okamžitě nasadí na produkční web.
- **Automatická synchronizace do stagingu**: Krok `sync-back-to-staging` v GitHub Actions automaticky přenese změny z `main` zpět do větve `staging`.
- Tím je zaručeno, že **staging nikdy nezůstane zastaralý** a nedojde k divergenci větví ani přepsání novinek při budoucím vývoji.

---

## 5. Vlastní doména terapiedoteku.cz

Web se má otevírat na `https://terapiedoteku.cz/`. DNS je u Hukotu, soubor k importu je `docs/dns/terapiedoteku.cz.zone`.

1. V repozitáři **Settings** → **Pages** → **Custom domain** zadejte `terapiedoteku.cz` a uložte. Tohle je potřeba dřív než import DNS.
2. V administraci Hukotu u zóny `terapiedoteku.cz` použijte **Importovat zónu** a nahrajte `docs/dns/terapiedoteku.cz.zone`. Tlačítko **Přepsat data ze šablony pro cluster** nepoužívejte, vrátilo by adresy hostingu Hukotu.
3. Až záznamy ukážou IP GitHub Pages, v Pages zaškrtněte **Enforce HTTPS**.
4. V Google Search Console přidejte `https://terapiedoteku.cz/` a odešlete `https://terapiedoteku.cz/sitemap.xml`.

---

## 6. Řízené iterace, pull request a konflikty

Úpravy webu jdou po schválených krocích, ne plošně.

1. Nový optimalizační záměr začíná otázkami na stav webu, architekturu a cíl. Z odpovědí vznikne prioritizovaný plán v `docs/ROADMAP.md`.
2. Každá fáze začíná krátkým popisem záměru. Realizace začne až po vašem souhlasu.
3. Funkční části, které fáze nevyžaduje, zůstávají beze změny.
4. Hotová a odladěná feature větev jde rovnou do finálního pull requestu proti `main`. Draft PR se nezakládá.
5. Před pushem i před mergem se větev porovná s aktuálním `origin/main`. Když hrozí nebo vznikne konflikt, dostanete ho popsaný v chatu a návrh řešení v kódu. Ruční skládání konfliktu ve webovém rozhraní GitHubu se nepoužívá.
6. Merge do `main` je až po závěrečné kontrole a vašem schválení.
7. U změny designu nebo layoutu je u vykresleného náhledu ještě úsporný snímek: výřez změněné části, ne sada velkých celostránkových obrázků.
8. Rozbité odkazy, validace HTML a výsledek buildu se berou z GitHub Actions a z `npm test`, ne z ručního procházení.

Po významnější fázi se zkontroluje `sitemap.xml`, kanonické URL a dopad na indexaci. Když se mění adresa stránky, navrhne se přesměrování nebo vyžádání nového crawlu v Google Search Console. Registrace `sitemap.xml` po ostrém spuštění zůstává samostatný krok.
