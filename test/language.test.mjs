import test from 'node:test';
import assert from 'node:assert/strict';
import { normaliseLocale, preferredLocale, targetForLocale } from '../src/i18n/language.mjs';
test('normalises supported regional locales and falls back to the published Dutch edition', () => {
  assert.equal(normaliseLocale('nl-BE'), 'nl');
  assert.equal(normaliseLocale('en-US'), 'en');
  assert.equal(normaliseLocale('ar-SA'), 'ar');
  assert.equal(normaliseLocale('de-DE'), 'nl');
  assert.equal(normaliseLocale(undefined), 'nl');
});
test('only published locales are selected', () => {
  assert.equal(preferredLocale({ saved: 'ar', languages: ['nl-NL'] }), 'nl');
  assert.equal(preferredLocale({ languages: ['de-DE', 'ar-SA', 'nl-NL'] }), 'nl');
  assert.equal(preferredLocale({ languages: ['fr-FR', 'nl-BE'] }), 'nl');
  assert.equal(preferredLocale({ languages: ['de-DE', 'fr-FR'] }), 'nl');
});
test('unpublished languages fall back to the complete Dutch home route', () => {
  assert.equal(targetForLocale('ar', '/ongehoord/nl/', '/ongehoord/'), '/ongehoord/nl/');
  assert.equal(
    targetForLocale('nl', '/ongehoord/nl/begrippen/darvo/', '/ongehoord/'),
    '/ongehoord/nl/',
  );
  assert.equal(targetForLocale('de', '/ongehoord/ar/', '/ongehoord/'), '/ongehoord/nl/');
});
