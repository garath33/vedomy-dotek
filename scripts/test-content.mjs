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
  'storno-podminky.html'
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
  }
});

// 2. Kontrola specifického obsahu
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const expectedTexts = [
  'Terapie vědomého dotyku',
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
const referenceNames = ['Anna', 'Jana', 'Lucie', 'Hanka', 'Milena'];
referenceNames.forEach(name => {
  if (!referenceHtml.includes(name)) {
    console.error(`❌ V reference.html chybí recenzent: "${name}"`);
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
if (!cenikHtml.includes('přes QR kód na místě.')) {
  console.error('❌ V cenik.html chybí upravená formulace o platbě přes QR kód na místě.');
  errors++;
}
if (!cenikHtml.includes('storno-podminky.html')) {
  console.error('❌ V cenik.html chybí odkaz na storno-podminky.html.');
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

if (errors > 0) {
  console.error(`\n❌ Testy obsahu selhaly (${errors} chyb)!`);
  process.exit(1);
} else {
  console.log('✅ Všechny testy obsahu a povinných struktur prošly úspěšně.');
}
