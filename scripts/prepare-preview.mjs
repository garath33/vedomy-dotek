import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const robotsMeta = '<meta name="robots" content="noindex, nofollow">';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  if (html.includes('name="robots"')) continue;
  if (!html.includes('<head>')) {
    throw new Error(`V ${file} chybí <head>, náhled nejde označit jako noindex.`);
  }
  await writeFile(file, html.replace('<head>', `<head>\n  ${robotsMeta}`));
}

await writeFile(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

try {
  await unlink(join(dist, 'sitemap.xml'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
