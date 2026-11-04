import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { isPublicLocale, localeFromPath } from '../src/i18n/config.ts';

test('only Dutch is public until a translation is approved', () => {
  assert.equal(isPublicLocale('nl'), true);
  assert.equal(isPublicLocale('en'), false);
  assert.equal(isPublicLocale('ar'), false);
});

test('the locale of a page comes from its first path segment', () => {
  assert.equal(localeFromPath('/en/find-help/'), 'en');
  assert.equal(localeFromPath('/unheard/en/find-help/', '/unheard/'), 'en');
  assert.equal(localeFromPath('/nl/'), 'nl');
  assert.equal(localeFromPath('/404.html'), 'nl');
});

test('unreviewed translations never reach the built sitemap or carry hreflang', async (t) => {
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8').catch(() => undefined);
  if (!sitemap) return t.skip('no build output');
  assert.doesNotMatch(sitemap, /\/(?:en|ar)\//);
  const english = await readFile('dist/en/find-help/index.html', 'utf8');
  assert.match(english, /<meta name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(english, /hreflang/);
});
