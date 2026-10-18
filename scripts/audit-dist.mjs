import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const walk = async (d) => {
  const all = await readdir(d, { withFileTypes: true });
  return (
    await Promise.all(all.map((e) => (e.isDirectory() ? walk(join(d, e.name)) : join(d, e.name))))
  ).flat();
};
const files = (await walk('dist')).filter((f) => f.endsWith('.html'));
const routeForFile = (file) => {
  const route = file
    .replace(/^dist/, '')
    .replace(/index\.html$/, '')
    .replace(/\\/g, '/');
  return route === '' ? '/' : route;
};
const publishedRoutes = new Set(files.map(routeForFile));
const internalHrefs = (html) =>
  [...html.matchAll(/<a\b[^>]*\bhref=(['"])(.*?)\1/gi)].map((match) => match[2]);
const isExternalHref = (href) => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
    (match) => match[1],
  );
const bad = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const root = file.endsWith('/index.html') && file === 'dist/index.html';
  if (!html.includes('http-equiv="refresh"') && !html.includes('<main'))
    bad.push(`${file}: missing main`);
  if (!html.includes('<title>')) bad.push(`${file}: missing title`);
  if (!html.includes('<base href=')) bad.push(`${file}: missing base URL`);
  if (/href="\/nl\//.test(html)) bad.push(`${file}: GitHub Pages-unsafe root link`);
  if (!root && !/<html lang="(nl|en|ar)"/.test(html)) bad.push(`${file}: invalid html language`);
  if (!root && html.includes('example.github.io')) bad.push(`${file}: placeholder canonical URL`);
  if (!root && !html.includes('application/ld+json')) bad.push(`${file}: missing JSON-LD`);
  if (!root && !html.includes('property="og:title"')) bad.push(`${file}: missing Open Graph title`);
  if (!root && (html.match(/<h1[ >]/g) || []).length !== 1) bad.push(`${file}: expected one H1`);
  if (!root && !html.includes('href="#main"')) bad.push(`${file}: missing skip link`);
  if (!root && !html.includes('<main id="main"')) bad.push(`${file}: missing main landmark target`);
  if (/<img\b(?![^>]*\balt=)[^>]*>/i.test(html)) bad.push(`${file}: image without alt attribute`);
  if (/<html lang="ar"(?![^>]*\bdir="rtl")/i.test(html))
    bad.push(`${file}: Arabic page missing RTL direction`);

  const types = new Set();
  for (const block of jsonLdBlocks(html)) {
    try {
      const parsed = JSON.parse(block);
      for (const item of Array.isArray(parsed) ? parsed : [parsed]) types.add(item['@type']);
    } catch {
      bad.push(`${file}: invalid JSON-LD`);
    }
  }
  const hasContentArticle = html.includes('class="breadcrumbs"');
  if (hasContentArticle && !types.has('Article'))
    bad.push(`${file}: article missing Article JSON-LD`);
  if (hasContentArticle && !types.has('BreadcrumbList'))
    bad.push(`${file}: article missing BreadcrumbList JSON-LD`);

  const base = html.match(/<base href="([^"]+)"/i)?.[1];
  if (!base) continue;
  if (!base.endsWith('/')) bad.push(`${file}: base URL must end with a slash`);
  const pageUrl = new URL(base, 'https://audit.invalid');
  for (const href of internalHrefs(html)) {
    if (!href || href.startsWith('#') || href.startsWith('?') || isExternalHref(href)) continue;
    const targetUrl = new URL(href, pageUrl);
    const basePath = new URL(base, 'https://audit.invalid').pathname.replace(/\/$/, '');
    if (!targetUrl.pathname.startsWith(`${basePath}/`) && targetUrl.pathname !== basePath) continue;
    const route = targetUrl.pathname.slice(basePath.length) || '/';
    if (!publishedRoutes.has(route))
      bad.push(`${file}: broken internal link ${href} (resolved ${route})`);
  }
}
if (bad.length) throw new Error(bad.join('\n'));
console.log(`Audited ${files.length} HTML pages.`);
