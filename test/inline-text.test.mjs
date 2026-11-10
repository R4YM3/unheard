import assert from 'node:assert/strict';
import test from 'node:test';
import { inlineParts } from '../src/lib/inline-text.ts';

test('editorial links preserve the surrounding text and site-base-relative destinations', () => {
  assert.deepEqual(
    inlineParts(
      'Dat heet [gaslighting](nl/begrippen/gaslighting/). Lees [meer](nl/herstel/#stappen).',
    ),
    [
      { text: 'Dat heet ' },
      { text: 'gaslighting', href: 'nl/begrippen/gaslighting/' },
      { text: '. Lees ' },
      { text: 'meer', href: 'nl/herstel/#stappen' },
      { text: '.' },
    ],
  );
});

test('untrusted URLs, HTML and ordinary bracketed text remain text rather than links or markup', () => {
  for (const text of [
    '[klik](javascript:alert(1))',
    '[klik](https://example.com/)',
    '[klik](//example.com/)',
    '[klik](nl/../../private/)',
    '[klik](nl/begrippen/" onmouseover="alert(1))',
    '<img src=x onerror=alert(1)>',
    '[OPRICHTER REVIEW NODIG] Persoonlijke tekst.',
  ]) {
    assert.deepEqual(inlineParts(text), [{ text }]);
  }
});
