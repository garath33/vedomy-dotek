import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

console.log('--- TEST: Validace povinného obsahu, meta tagů a klíčových údajů ---');

const requiredFiles = [
  'index.html',
  'o-martinovi.html',
  'reference.html',
  'cenik.html',
  'faq.html',
  'kontakt.html',
  'storno-podminky.html',
  'ochrana-osobnich-udaju.html',
  '404.html'
];

let errors = 0;

// 1. Zkontrolujeme přítomnost souborů
requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Chybí vygenerovaný soubor: ${file}`);
    errors++;
  } else {
    const html = fs.readFileSync(filePath, 'utf8');

    // Kontrola základních HTML tagů
    if (!html.includes('<title>') || !html.includes('</title>')) {
      console.error(`❌ V souboru ${file} chybí tag <title>`);
      errors++;
    }
    if (!html.includes('<meta name="description"')) {
      console.error(`❌ V souboru ${file} chybí <meta name="description">`);
      errors++;
    }
    if (!html.includes('<meta name="viewport"')) {
      console.error(`❌ V souboru ${file} chybí viewport tag`);
      errors++;
    }
    if (!html.includes('rel="canonical" href="https://garath33.github.io/vedomy-dotek/')) {
      console.error(`❌ V souboru ${file} chybí kanonická adresa`);
      errors++;
    }
    if (!html.includes('href="./favicon.svg"')) {
      console.error(`❌ V souboru ${file} chybí favicon`);
      errors++;
    }
    if (!html.includes('property="og:image" content="https://garath33.github.io/vedomy-dotek/images/')) {
      console.error(`❌ V souboru ${file} chybí absolutní og:image`);
      errors++;
    }
    if (!html.includes('ochrana-osobnich-udaju.html')) {
      console.error(`❌ V souboru ${file} chybí odkaz na ochranu osobních údajů`);
      errors++;
    }
  }
});

// 2. Kontrola specifického obsahu
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const expectedTexts = [
  'Terapie vědomého dotyku',
  'Když analytická mysl nestačí a odpovědi hledáme v těle.',
  'šamanský buben, Koshi, kalimba',
  'Hlava zná příběh, ale tělo drží emoci',
  'Ochutnávka vědomého dotyku',
  '1 600 Kč',
  '800 Kč',
  'Anna',
  'Jana',
  'Lucie',
  'Hanka'
];

expectedTexts.forEach(text => {
  if (!indexHtml.includes(text)) {
    console.error(`❌ V index.html nebyl nalezen očekávaný text: "${text}"`);
    errors++;
  }
});

// 3. Kontrola kontaktních údajů
const kontaktHtml = fs.readFileSync(path.join(distDir, 'kontakt.html'), 'utf8');
const contactDetails = [
  '+420 604 430 087',
  'cesta-zmeny@email.cz',
  'Hevlínská 495/3',
  'Praha 5',
  '08162867'
];

contactDetails.forEach(detail => {
  if (!kontaktHtml.includes(detail)) {
    console.error(`❌ V kontakt.html chybí klíčový údaj: "${detail}"`);
    errors++;
  }
});
if (!kontaktHtml.includes('<h1>Kontakt a objednání</h1>')) {
  console.error('❌ V kontakt.html chybí nadpis Kontakt a objednání.');
  errors++;
}
if (kontaktHtml.includes('Kontakt a rezervace')) {
  console.error('❌ V kontakt.html zůstal nadpis Kontakt a rezervace.');
  errors++;
}

// 4. Kontrola profilu v o-martinovi.html
const oMartinoviHtml = fs.readFileSync(path.join(distDir, 'o-martinovi.html'), 'utf8');
const aboutDetails = [
  'Psychoterapeutický výcvik',
  'Bojová umění a sebeobrana',
  'divadelní improvizace',
  'rekvalifikovaný masér'
];

aboutDetails.forEach(detail => {
  if (!oMartinoviHtml.toLowerCase().includes(detail.toLowerCase())) {
    console.error(`❌ V o-martinovi.html chybí informace: "${detail}"`);
    errors++;
  }
});

// 5. Kontrola podstránky reference.html
const referenceHtml = fs.readFileSync(path.join(distDir, 'reference.html'), 'utf8');
const referenceNames = ['Anna', 'Jana', 'Lucie', 'Hanka'];
referenceNames.forEach(name => {
  if (!referenceHtml.includes(name)) {
    console.error(`❌ V reference.html chybí recenzent: "${name}"`);
    errors++;
  }
});
['Koučink &amp; rozvoj', 'Osobní rozvoj', 'Milena'].forEach(phrase => {
  if (referenceHtml.includes(phrase)) {
    console.error(`❌ V reference.html zůstala reference na koučink nebo rozvoj: "${phrase}"`);
    errors++;
  }
});

// 6. Kontrola podstránky storno-podminky.html a úprav ceníku / FAQ
const stornoHtml = fs.readFileSync(path.join(distDir, 'storno-podminky.html'), 'utf8');
const stornoDetails = ['48 hodin', '50 %', '100 %', 'Slevu 30 %', '30 minut péče navíc'];
stornoDetails.forEach(detail => {
  if (!stornoHtml.includes(detail)) {
    console.error(`❌ V storno-podminky.html chybí klíčový údaj: "${detail}"`);
    errors++;
  }
});

const cenikHtml = fs.readFileSync(path.join(distDir, 'cenik.html'), 'utf8');
const paymentSentence = 'Platbu je možné provést na místě v hotovosti, případně přes QR kód.';
if (!cenikHtml.includes(paymentSentence)) {
  console.error('❌ V cenik.html chybí formulace o platbě na místě v hotovosti nebo přes QR kód.');
  errors++;
}
if ((cenikHtml.match(/na místě/g) || []).length !== 1) {
  console.error('❌ V cenik.html se slovní spojení „na místě“ neopakuje právě jednou.');
  errors++;
}
if (!cenikHtml.includes('storno-podminky.html')) {
  console.error('❌ V cenik.html chybí odkaz na storno-podminky.html.');
  errors++;
}
const integrationPhrase = 'Klidová integrace na lůžku v délce podle vaší potřeby';
if (!indexHtml.includes('Délku tohoto doznění přizpůsobím tomu, jak se právě cítíte.')) {
  console.error('❌ V index.html chybí obecné znění délky doznění na lůžku.');
  errors++;
}
if (!indexHtml.includes(integrationPhrase) || !cenikHtml.includes(integrationPhrase)) {
  console.error('❌ V nabídce chybí klidová integrace v délce podle potřeby.');
  errors++;
}
if (/minimálně 10 minut/i.test(indexHtml) || /minimálně 10 minut/i.test(cenikHtml)) {
  console.error('❌ Na webu zůstala pevná délka klidové integrace (minimálně 10 minut).');
  errors++;
}

const faqHtml = fs.readFileSync(path.join(distDir, 'faq.html'), 'utf8');
if (faqHtml.includes('specifických ortopedických diagnóz')) {
  console.error('❌ V faq.html stále zůstal starý text "specifických ortopedických diagnóz"!');
  errors++;
}
if (!faqHtml.includes('specifických diagnóz')) {
  console.error('❌ V faq.html chybí nový text "specifických diagnóz"!');
  errors++;
}

const privacyHtml = fs.readFileSync(path.join(distDir, 'ochrana-osobnich-udaju.html'), 'utf8');
const privacyDetails = [
  'FormSubmit',
  'cesta-zmeny@email.cz',
  'jméno a příjmení',
  'e-mail nebo telefon',
  'zvolenou péči',
  'text zprávy'
];
privacyDetails.forEach(detail => {
  if (!privacyHtml.includes(detail)) {
    console.error(`❌ V ochrana-osobnich-udaju.html chybí údaj: "${detail}"`);
    errors++;
  }
});

const notFoundHtml = fs.readFileSync(path.join(distDir, '404.html'), 'utf8');
if (!notFoundHtml.includes('name="robots" content="noindex"')) {
  console.error('❌ V 404.html chybí noindex');
  errors++;
}

const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const robots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
if (!sitemap.includes('https://garath33.github.io/vedomy-dotek/ochrana-osobnich-udaju.html')) {
  console.error('❌ V sitemap.xml chybí ochrana osobních údajů');
  errors++;
}
if (sitemap.includes('404.html')) {
  console.error('❌ sitemap.xml nesmí obsahovat 404.html');
  errors++;
}
if (!robots.includes('Sitemap: https://garath33.github.io/vedomy-dotek/sitemap.xml')) {
  console.error('❌ V robots.txt chybí odkaz na sitemap');
  errors++;
}

const cssFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(file => file.endsWith('.css'));
if (cssFiles.length === 0) {
  console.error('❌ V dist/assets chybí sestavené CSS');
  errors++;
}
cssFiles.forEach(file => {
  const css = fs.readFileSync(path.join(distDir, 'assets', file), 'utf8');
  if (css.includes('fonts.googleapis.com')) {
    console.error(`❌ ${file} stále načítá Google Fonts`);
    errors++;
  }
  const fontUrls = css.match(/url\(([^)]+\.woff2)\)/g) || [];
  if (fontUrls.length === 0) {
    console.error(`❌ ${file} neobsahuje lokální fonty`);
    errors++;
  }
  fontUrls.forEach(token => {
    const relative = token.slice(4, -1).replace(/['"]/g, '');
    const fontPath = path.resolve(path.join(distDir, 'assets'), relative);
    if (!fs.existsSync(fontPath)) {
      console.error(`❌ Chybí font odkazovaný z CSS: ${relative}`);
      errors++;
    }
  });
});

if (errors > 0) {
  console.error(`\n❌ Testy obsahu selhaly (${errors} chyb)!`);
  process.exit(1);
} else {
  console.log('✅ Všechny testy obsahu a povinných struktur prošly úspěšně.');
}
