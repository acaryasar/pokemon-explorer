// Bağımlılıksız statik site üretici: `node build.mjs` → dist/
import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { join } from 'node:path';
import { site, products } from './src/data.mjs';
import { homePage, productPage, notFoundPage } from './src/templates.mjs';

const out = new URL('./dist/', import.meta.url).pathname;

const write = async (path, content) => {
  const file = join(out, path);
  await mkdir(join(file, '..'), { recursive: true });
  await writeFile(file, content);
};

await rm(out, { recursive: true, force: true });
await cp(new URL('./src/assets/', import.meta.url).pathname, join(out, 'assets'), { recursive: true });
await cp(new URL('./static/', import.meta.url).pathname, out, { recursive: true });

await write('index.html', homePage());
await write('404.html', notFoundPage());
for (const p of products) await write(`${p.slug}/index.html`, productPage(p));

const urls = ['/', ...products.map((p) => `/${p.slug}`)];
await write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${site.url}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
await write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`✓ ${urls.length} sayfa üretildi → dist/`);
