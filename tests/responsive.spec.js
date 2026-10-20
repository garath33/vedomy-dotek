import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', title: 'Terapie vědomého dotyku' },
  { path: '/o-martinovi.html', title: 'O Martinovi' },
  { path: '/reference.html', title: 'Reference' },
  { path: '/cenik.html', title: 'Ceník' },
  { path: '/faq.html', title: 'Časté dotazy' },
  { path: '/kontakt.html', title: 'Kontakt' },
  { path: '/storno-podminky.html', title: 'Storno podmínky' },
  { path: '/ochrana-osobnich-udaju.html', title: 'Ochrana osobních údajů' },
  { path: '/404.html', title: 'Stránka nenalezena' },
];

test.describe('Responzivita a Layout (Desktop & Mobile)', () => {
  for (const pageInfo of PAGES) {
    test(`Stránka ${pageInfo.path} se načte bez horizontálního přetečení (overflow)`, async ({ page, isMobile }) => {
      await page.goto(pageInfo.path);

      // 1. Ověřit načtení a titulek
      await expect(page).toHaveTitle(new RegExp(pageInfo.title, 'i'));

      // 2. Klíčový test responzivity: Žádný horizontální scrollbar (žádný prvek nesmí přetékat šířku viewportu)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll, `Stránka ${pageInfo.path} má horizontální přetečení (scroll width > client width)`).toBe(false);

      // 3. Test viditelnosti navigace podle typu zařízení
      const menuToggle = page.locator('.menu-toggle');
      const navMenu = page.locator('.nav-menu');
      const viewport = page.viewportSize();
      const isMobileWidth = viewport && viewport.width <= 960;

      if (isMobileWidth) {
        // Na mobilu a tabletu (<= 960px) musí být viditelné hamburger tlačítko
        await expect(menuToggle).toBeVisible();

        // Otestovat otevření a zavření mobilního menu
        await menuToggle.click();
        await expect(navMenu).toBeVisible();
        await expect(navMenu).toHaveClass(/open/);

        // Zavřít menu
        await menuToggle.click();
        await expect(navMenu).not.toHaveClass(/open/);
      } else {
        // Na desktopu je hamburger tlačítko skryté a menu je přímo v hlavičce
        await expect(menuToggle).toBeHidden();
        await expect(navMenu).toBeVisible();
      }
    });
  }
});

test.describe('Interaktivní prvky a použitelnost na mobilu i desktopu', () => {
  test('Úvod vedle výkladu terapie ukazuje, kdo masáž provádí', async ({ page }) => {
    await page.goto('/');

    const intro = page.locator('.therapy-intro');
    const practitioner = intro.locator('.practitioner');
    await expect(practitioner).toBeVisible();
    await expect(practitioner).toContainText('Kdo masáž provádí');
    await expect(practitioner).toContainText('Martin Šimůnek');
    await expect(practitioner.locator('img')).toBeVisible();
    await expect(practitioner.locator('img')).toHaveAttribute('alt', 'Portrét Martina Šimůnka');
    await expect(practitioner.getByRole('link', { name: 'Víc o mně' })).toHaveAttribute('href', './o-martinovi.html');
    await expect(intro.getByRole('heading', { name: 'Když analytická mysl nestačí' })).toBeVisible();

    const linked = await page.evaluate(() => {
      const portrait = document.querySelector('.practitioner-portrait');
      const heading = document.querySelector('.therapy-intro-copy h2');
      const portraitBox = portrait.getBoundingClientRect();
      const headingBox = heading.getBoundingClientRect();
      const sideBySide = portraitBox.right <= headingBox.left + 8;
      const stacked = portraitBox.bottom <= headingBox.top + 8;
      return sideBySide || stacked;
    });
    expect(linked).toBe(true);
  });

  test('Úvod v průběhu sezení ukazuje záběr doteku v rozumné velikosti', async ({ page }) => {
    await page.goto('/');

    const photos = page.locator('#jak-probiha .session-photos img');
    await expect(photos).toHaveCount(2);

    const hands = photos.first();
    await expect(hands).toBeVisible();
    await expect(hands).toHaveAttribute('src', './images/dotek-rukou.jpg');
    await expect(hands).toHaveAttribute('alt', /dlaně/);

    const box = await hands.boundingBox();
    expect(box.width).toBeGreaterThan(200);
    expect(box.width).toBeLessThanOrEqual(320);

    const candle = photos.nth(1);
    await expect(candle).toBeVisible();
    await expect(candle).toHaveAttribute('src', './images/svicka-levandule.jpg');
  });

  test('Slideshow referencí funguje a reaguje na přepínání', async ({ page }) => {
    await page.goto('/');

    const slideshow = page.locator('.slideshow-wrapper');
    await expect(slideshow).toBeVisible();

    const activeSlide = slideshow.locator('.slide-item.active');
    await expect(activeSlide).toBeVisible();
    const firstAuthor = await activeSlide.locator('.slide-author-name').innerText();

    // Kliknutí na šipku Další
    const nextBtn = slideshow.locator('.slide-btn.next');
    await nextBtn.click();

    // Nový aktivní slide
    const nextActiveSlide = slideshow.locator('.slide-item.active');
    await expect(nextActiveSlide).toBeVisible();
    const secondAuthor = await nextActiveSlide.locator('.slide-author-name').innerText();

    expect(firstAuthor).not.toEqual(secondAuthor);
  });

  test('FAQ harmonika se správně otevírá a zavírá', async ({ page }) => {
    await page.goto('/faq.html');

    const firstFaq = page.locator('.faq-item').first();
    const summary = firstFaq.locator('.faq-summary');
    
    // Zkontrolovat, že tělo odpovědi je dostupné a kliknutím lze zavřít/otevřít
    await summary.click();
    // Kliknutí změní stav
    const isOpen = await firstFaq.getAttribute('open');
    // Klikneme znovu pro ověření přepínání
    await summary.click();
    const isToggled = await firstFaq.getAttribute('open');
    expect(isOpen).not.toBe(isToggled);
  });

  test('Formulář v kontaktu obsahuje validní prvky na jakémkoliv zařízení', async ({ page }) => {
    await page.goto('/kontakt.html');

    const form = page.locator('#contact-form');
    const nameInput = page.locator('#name');
    const contactInput = page.locator('#contact-input');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(form).toHaveAttribute('action', 'https://formsubmit.co/cesta-zmeny@email.cz');
    await expect(nameInput).toBeVisible();
    await expect(contactInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
    await expect(page.locator('#form-success')).toBeHidden();

    // Vyzkoušet vepsání. Formulář se neodesílá, aby na e-mail nepřišla testovací zpráva.
    await nameInput.fill('Jan Novák');
    await expect(nameInput).toHaveValue('Jan Novák');
    await expect(page.locator('#form-next')).toHaveValue(/odeslano=1/);
  });

  test('Po návratu z FormSubmit je vidět potvrzení', async ({ page }) => {
    await page.goto('/kontakt.html?odeslano=1');
    const success = page.locator('#form-success');
    await expect(success).toBeVisible();
    await expect(success).toContainText('Vaše zpráva ke mně dorazila');
    await expect(success).toContainText('Ozvu se vám na kontakt, který jste uvedli');
    await expect(success.getByRole('link', { name: /Zavolat/ })).toBeVisible();
    await expect(page.locator('#contact-form')).toBeHidden();
    await expect(page.locator('#form-intro')).toBeHidden();
  });

  test('Reference ukazují jen ohlasy vědomého dotyku a jméno s popiskem jdou pod sebou', async ({ page }) => {
    await page.goto('/reference.html');

    const cards = page.locator('.reference-card');
    await expect(cards).toHaveCount(4);
    await expect(cards.filter({ hasText: 'Koučink' })).toHaveCount(0);
    await expect(cards.filter({ hasText: 'Osobní rozvoj' })).toHaveCount(0);
    await expect(page.locator('.filter-tabs')).toHaveCount(0);

    const jana = page.locator('.reference-card').filter({ hasText: 'Jana' });
    const name = jana.locator('.reference-author-name');
    const role = jana.locator('.reference-author-role');
    await expect(name).toHaveText('Jana');
    await expect(role).toHaveText('frekventantka psychoterapeutického výcviku');

    const stacked = await name.evaluate((nameEl) => {
      const roleEl = nameEl.parentElement.querySelector('.reference-author-role');
      const nameBox = nameEl.getBoundingClientRect();
      const roleBox = roleEl.getBoundingClientRect();
      return roleBox.top >= nameBox.bottom - 1 && roleBox.left <= nameBox.left + 2;
    });
    expect(stacked).toBe(true);
  });
});
