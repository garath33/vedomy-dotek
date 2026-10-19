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

## 3. Staging vs. Produkce (Jak funguje synchronizace a Preview)

Pro bezpečné provádění změn (nové texty, fotky, úpravy cen) doporučujeme dodržovat tento tok:

### Větev `staging` (Přípravné prostředí)
- Na této větvi testujete nové úpravy.
- Každý `git push` do větve `staging` automaticky spustí testy a vygeneruje náhled.
- Pokud chcete oddělené staging URL, můžete v GitHub repozitáři využít např. GitHub Environments (nebo jednoduchou větev `gh-pages-staging`).

### Větev `main` (Produkce)
- `main` představuje ostrý produkční stav, který vidí návštěvníci.
- Změny do `main` se přenášejí pomocí **Pull Requestu** ze `staging` &rarr; `main`.
- Pull Request automaticky provede testy (Broken links + Content check). Pokud testy selžou, nepustí vás k mergi.

### Náhled před schválením
- Než se změna sloučí, má být k dispozici odkaz na náhled **právě toho commitu**, ne na ostrý web.
- Ostrý web je `https://garath33.github.io/vedomy-dotek/`. Větev `staging` se nasazuje na stejné GitHub Pages, proto to není oddělený náhled.
- Náhled větve po pushi: `https://cdn.jsdelivr.net/gh/garath33/vedomy-dotek@<celý-sha-commitu>/index.html`
- U konkrétní úpravy přidej i dotčené stránky, například `reference.html`, `cenik.html` nebo `kontakt.html`.
- Fotky v tomto náhledu nemusí být vidět. Ve zdrojácích leží ve `public/images/` a do `images/` se kopírují až při sestavení na GitHub Pages. Text, styly a skripty náhled ukazuje.

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

## 5. Budoucí napojení vlastní domény

Až budete chtít web převést z `github.io` na vlastní doménu (např. `www.vedomydotek.cz`):
1. V **Settings** &rarr; **Pages** &rarr; **Custom domain** zadáte název vaší domény.
2. U vašeho registrátora domény (např. Wedos, Forpsi, Active24) nastavíte DNS záznamy:
   - buď CNAME pro subdoménu (např. `www` mířící na `<vase-jmeno>.github.io`),
   - nebo A záznamy pro GitHub IP adresy (`185.199.108.153`, atd.).
3. Zaškrtnete **Enforce HTTPS** na GitHubu pro bezplatný SSL certifikát Let's Encrypt.

---

## 6. Řízené iterace, pull request a konflikty

Úpravy webu jdou po schválených krocích, ne plošně.

1. Nový optimalizační záměr začíná otázkami na stav webu, architekturu a cíl. Z odpovědí vznikne prioritizovaný plán v `docs/ROADMAP.md`.
2. Každá fáze začíná krátkým popisem záměru. Realizace začne až po vašem souhlasu.
3. Funkční části, které fáze nevyžaduje, zůstávají beze změny.
4. Hotová a odladěná feature větev jde rovnou do finálního pull requestu proti `main`. Draft PR se nezakládá.
5. Před pushem i před mergem se větev porovná s aktuálním `origin/main`. Když hrozí nebo vznikne konflikt, dostanete ho popsaný v chatu a návrh řešení v kódu. Ruční skládání konfliktu ve webovém rozhraní GitHubu se nepoužívá.
6. Merge do `main` je až po závěrečné kontrole a vašem schválení.
7. U změny designu nebo layoutu je u náhledu commitu ještě úsporný snímek: výřez změněné části, ne sada velkých celostránkových obrázků.
8. Rozbité odkazy, validace HTML a výsledek buildu se berou z GitHub Actions a z `npm test`, ne z ručního procházení.

Po významnější fázi se zkontroluje `sitemap.xml`, kanonické URL a dopad na indexaci. Když se mění adresa stránky, navrhne se přesměrování nebo vyžádání nového crawlu v Google Search Console. Registrace `sitemap.xml` po ostrém spuštění zůstává samostatný krok.
