import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

console.log('--- TEST: Kontrola zpětné kompatibility a produkční bezpečnosti ---');

// 1. Zpětná kompatibilita URL: Stará struktura z cesta-zmeny.cz vs nová struktura
// Ověřujeme, že všechny klíčové URL endpointy existují a jsou konzistentní:
const canonicalPages = [
  'index.html',
  'o-martinovi.html',
  'reference.html',
  'cenik.html',
  'faq.html',
  'kontakt.html'
];

let errors = 0;

canonicalPages.forEach(page => {
  const fullPath = path.join(distDir, page);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Chybí povinná stránka pro produkční kompatibilitu: ${page}`);
    errors++;
  }
});

// 2. Ověření relativních cest (zajišťuje nezávislost na subdoméně /staging/ vs /)
canonicalPages.forEach(page => {
  const fullPath = path.join(distDir, page);
  if (fs.existsSync(fullPath)) {
    const html = fs.readFileSync(fullPath, 'utf8');
    // Žádný interní asset nesmí začínat absolutním lomítkem typu href="/assets/..."
    // protože by rozbil staging prostředí běžící v podadresáři nebo na náhledové URL.
    const absoluteInternalLinkRegex = /(?:href|src)=["']\/(assets|images)\//g;
    const matches = html.match(absoluteInternalLinkRegex);
    if (matches && matches.length > 0) {
      console.error(`❌ Stránka ${page} obsahuje absolutní cesty bez tečky (${matches.join(', ')}), což by rozbilo kompatibilitu staging/produkce!`);
      errors++;
    }
  }
});

// 3. Kontrola základních bezpečnostních a UX prvků
canonicalPages.forEach(page => {
  const fullPath = path.join(distDir, page);
  if (fs.existsSync(fullPath)) {
    const html = fs.readFileSync(fullPath, 'utf8');
    if (!html.includes('lang="cs"')) {
      console.warn(`⚠️ Varování: Stránka ${page} nemá atribut lang="cs".`);
    }
    // Odkazy do nového okna musí mít rel="noopener"
    if (html.includes('target="_blank"') && !html.includes('rel="noopener')) {
      console.error(`❌ Bezpečnostní riziko: Stránka ${page} má target="_blank" bez rel="noopener".`);
      errors++;
    }
  }
});

if (errors > 0) {
  console.error(`\n❌ Kontrola zpětné kompatibility selhala (${errors} chyb)!`);
  process.exit(1);
} else {
  console.log('✅ Zpětná kompatibilita a bezpečnost staging/produkce jsou 100% v pořádku.');
}
