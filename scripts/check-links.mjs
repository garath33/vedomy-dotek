import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Chyba: Složka dist neexistuje! Spusťte nejprve `npm run build`.');
  process.exit(1);
}

console.log('--- TEST: Kontrola integrity odkazů a souborů (Broken Link Checker) ---');

const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));
let errorsCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Hledáme interní odkazy href="./..." a href="..." i src="./..."
  const linkRegex = /(?:href|src)=["']([^"']+)["']/g;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[1];

    // Ignorujeme externí odkazy, mailto, tel a kotvy
    if (
      rawTarget.startsWith('http://') ||
      rawTarget.startsWith('https://') ||
      rawTarget.startsWith('mailto:') ||
      rawTarget.startsWith('tel:') ||
      rawTarget.startsWith('javascript:') ||
      rawTarget.startsWith('#')
    ) {
      continue;
    }

    // Očistit kotvy #sekce
    const targetClean = rawTarget.split('#')[0].split('?')[0];
    if (!targetClean) continue;

    // Relativní cesta z pohledu souboru
    const resolvedPath = path.resolve(distDir, targetClean);

    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ CHYBA v souboru [${file}]: Cíl '${rawTarget}' neexistuje (hledáno v: ${resolvedPath})`);
      errorsCount++;
    } else {
      // console.log(`✓ OK: [${file}] -> ${rawTarget}`);
    }
  }
});

if (errorsCount > 0) {
  console.error(`\n❌ Nalezeno celkem ${errorsCount} neplatných odkazů!`);
  process.exit(1);
} else {
  console.log(`✅ Všechny interní odkazy a assety (${htmlFiles.length} HTML stránek) jsou platné a soubory existují.`);
}
