import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', title: 'Terapie vědomého dotyku' },
  { path: '/o-martinovi.html', title: 'O Martinovi' },
  { path: '/reference.html', title: 'Reference' },
  { path: '/cenik.html', title: 'Ceník' },
  { path: '/faq.html', title: 'Časté dotazy' },
  { path: '/kontakt.html', title: 'Kontakt' },
  { path: '/storno-podminky.html', title: 'Storno podmínky' },
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

    const nameInput = page.locator('#name');
    const contactInput = page.locator('#contact-input');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(contactInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Vyzkoušet vepsání
    await nameInput.fill('Jan Novák');
    await expect(nameInput).toHaveValue('Jan Novák');
  });

  test('Filtrování referencí na podstránce reference.html funguje', async ({ page }) => {
    await page.goto('/reference.html');

    const cards = page.locator('.reference-card');
    await expect(cards).toHaveCount(8);

    // Kliknout na filtr "Vědomý dotyk"
    const dotekBtn = page.locator('button[data-filter="dotek"]');
    await dotekBtn.click();

    // Viditelné pouze karty kategorie dotek
    const visibleCards = page.locator('.reference-card:visible');
    await expect(visibleCards).toHaveCount(4);

    // Kliknout na "Všechny ohlasy"
    const allBtn = page.locator('button[data-filter="all"]');
    await allBtn.click();
    await expect(page.locator('.reference-card:visible')).toHaveCount(8);
  });
});
