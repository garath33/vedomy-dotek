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

---

## 4. Testovací fáze (QA)

Projekt obsahuje sadu skriptů, které chrání web před chybami:

1. **`npm run test:links`**
   - Projde všechny vygenerované HTML soubory v `dist/`.
   - Zkontroluje, zda každý interní odkaz (na jinou stránku, kotvu, CSS styl, JS skript nebo obrázek) reálně existuje na disku.
   - Zabraňuje chybám 404 (nefunkční obrázky, překlepy v odkazech).

2. **`npm run test:content`**
   - Ověřuje přítomnost povinných SEO meta tagů (`<title>`, `<meta name="description">`, viewport).
   - Kontroluje, že na stránkách nechybí zásadní údaje:
     - Kontaktní údaje (telefon, e-mail, adresa, IČO)
     - Ceny a varianty služeb
     - Jména a citace z referencí
     - Klíčové informace o Martinovi (psychoterapeutický výcvik, bojová umění, masérská praxe).

3. **`npm run build`**
   - Statická kompilace přes Vite. Kontroluje syntaktickou správnost a optimalizuje assety.

---

## 5. Budoucí napojení vlastní domény

Až budete chtít web převést z `github.io` na vlastní doménu (např. `www.vedomydotek.cz`):
1. V **Settings** &rarr; **Pages** &rarr; **Custom domain** zadáte název vaší domény.
2. U vašeho registrátora domény (např. Wedos, Forpsi, Active24) nastavíte DNS záznamy:
   - buď CNAME pro subdoménu (např. `www` mířící na `<vase-jmeno>.github.io`),
   - nebo A záznamy pro GitHub IP adresy (`185.199.108.153`, atd.).
3. Zaškrtnete **Enforce HTTPS** na GitHubu pro bezplatný SSL certifikát Let's Encrypt.
