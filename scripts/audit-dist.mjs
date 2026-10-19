import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const walk = async (d) => {
  const all = await readdir(d, { withFileTypes: true });
  return (
    await Promise.all(all.map((e) => (e.isDirectory() ? walk(join(d, e.name)) : join(d, e.name))))
  ).flat();
};
const files = (await walk('dist')).filter((f) => f.endsWith('.html'));
const noIndex = process.env.NO_INDEX === 'true';
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
const requiredDutchNavigation = [
  ['Wat voel ik?', 'nl/wat-voel-ik/'],
  ['Begrijp het', 'nl/begrippen/'],
  ['Herstel', 'nl/herstel/'],
  ['Mijn verhaal', 'nl/mijn-verhaal/'],
  ['Hulp vinden', 'nl/hulp-vinden/'],
];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const root = file.endsWith('/index.html') && file === 'dist/index.html';
  const unpublishedLocaleReviewRoute = /\/dist\/(?:en|ar)\/index\.html$/.test(file);
  if (!html.includes('http-equiv="refresh"') && !html.includes('<main'))
    bad.push(`${file}: missing main`);
  if (!html.includes('<title>')) bad.push(`${file}: missing title`);
  if (!html.includes('<base href=')) bad.push(`${file}: missing base URL`);
  if (/href="\/nl\//.test(html)) bad.push(`${file}: GitHub Pages-unsafe root link`);
  if (!root && !/<html lang="(nl|en|ar)"/.test(html)) bad.push(`${file}: invalid html language`);
  if (!root && html.includes('example.github.io')) bad.push(`${file}: placeholder canonical URL`);
  if (!root && !html.includes('application/ld+json')) bad.push(`${file}: missing JSON-LD`);
  if (!root && !html.includes('property="og:title"')) bad.push(`${file}: missing Open Graph title`);
  if (!root && !html.includes('property="og:description"'))
    bad.push(`${file}: missing Open Graph description`);
  if (!root && !html.includes('property="og:url"')) bad.push(`${file}: missing Open Graph URL`);
  if (!root && !html.includes('rel="canonical"')) bad.push(`${file}: missing canonical URL`);
  if (!root && !html.includes('logo.svg')) bad.push(`${file}: missing structured-data logo URL`);
  if (
    (noIndex || unpublishedLocaleReviewRoute) &&
    !html.includes('name="robots" content="noindex, nofollow"')
  )
    bad.push(`${file}: missing required noindex directive`);
  if (!root && (html.match(/<h1[ >]/g) || []).length !== 1) bad.push(`${file}: expected one H1`);
  if (!root && !html.includes('href="#main"')) bad.push(`${file}: missing skip link`);
  if (!root && !html.includes('<main id="main"')) bad.push(`${file}: missing main landmark target`);
  if (/<img\b(?![^>]*\balt=)[^>]*>/i.test(html)) bad.push(`${file}: image without alt attribute`);
  if (/<html lang="ar"(?![^>]*\bdir="rtl")/i.test(html))
    bad.push(`${file}: Arabic page missing RTL direction`);

  if (file.includes('/nl/')) {
    const navigation = html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
    const navigationLinks = [
      ...navigation.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi),
    ].map(([, renderedHref, text]) => [renderedHref, text.replace(/<[^>]+>/g, '').trim()]);
    for (const [label, href] of requiredDutchNavigation) {
      if (
        !navigationLinks.some(([renderedHref, text]) => renderedHref === href && text === label)
      ) {
        bad.push(`${file}: missing Dutch navigation link ${label}`);
      }
    }
  }

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
  if (!root && !types.has('Organization')) bad.push(`${file}: missing Organization JSON-LD`);
  if (!root && !types.has('WebSite')) bad.push(`${file}: missing WebSite JSON-LD`);
  if (!root && !types.has('WebPage')) bad.push(`${file}: missing WebPage JSON-LD`);
  if (hasContentArticle && !types.has('Article'))
    bad.push(`${file}: article missing Article JSON-LD`);
  if (hasContentArticle && !types.has('BreadcrumbList'))
    bad.push(`${file}: article missing BreadcrumbList JSON-LD`);
  if (hasContentArticle && !html.includes('id="sources-heading"'))
    bad.push(`${file}: article missing visible source attribution`);
  if (hasContentArticle && !html.includes('"citation":['))
    bad.push(`${file}: article missing structured-data citations`);
  if (hasContentArticle && file.includes('/begrippen/') && !types.has('DefinedTerm'))
    bad.push(`${file}: concept article missing DefinedTerm JSON-LD`);

  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] > headingLevels[index - 1] + 1) {
      bad.push(
        `${file}: heading level skips from h${headingLevels[index - 1]} to h${headingLevels[index]}`,
      );
    }
  }

  const tabs = [
    ...html.matchAll(/<button\b(?=[^>]*\brole="tab")(?=[^>]*\baria-controls="([^"]+)")[^>]*>/gi),
  ];
  for (const tab of tabs) {
    const panelId = tab[1];
    const escapedPanelId = panelId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`<[^>]+\\bid="${escapedPanelId}"[^>]*\\brole="tabpanel"`, 'i').test(html)) {
      bad.push(`${file}: tab controls missing panel ${panelId}`);
    }
  }

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
if (noIndex) {
  const robots = await readFile('dist/robots.txt', 'utf8');
  if (!robots.includes('Disallow: /')) bad.push('dist/robots.txt: expected global crawl block');
}
if (!noIndex) {
  const robots = await readFile('dist/robots.txt', 'utf8');
  for (const route of ['/en/', '/ar/']) {
    if (!robots.includes(`Disallow: ${route}`))
      bad.push(`dist/robots.txt: expected ${route} review block`);
  }
}
if (bad.length) throw new Error(bad.join('\n'));
console.log(`Audited ${files.length} HTML pages.`);
