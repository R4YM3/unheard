import assert from 'node:assert/strict';
import test from 'node:test';
import { activeSection, readAmount } from '../src/lib/page-rail.mjs';

const sections = [
  { id: 'kort', top: 400 },
  { id: 'herken', top: 900 },
  { id: 'gevolgen', top: 1800 },
];

test('reading starts at the article and ends when the article has passed', () => {
  assert.equal(readAmount(0, 500, 2000, 800), 0);
  assert.equal(readAmount(500, 500, 2000, 800), 0);
  assert.equal(readAmount(1100, 500, 2000, 800), 0.5);
  assert.equal(readAmount(2000, 500, 2000, 800), 1);
  assert.equal(readAmount(4000, 500, 2000, 800), 1);
});

test('a short article is finished once its end is on screen', () => {
  assert.equal(readAmount(0, 700, 400, 800), 0);
  assert.equal(readAmount(300, 700, 400, 800), 1);
  assert.equal(readAmount(0, 100, 400, 800), 1);
});

test('the active section is the last heading above the reading line', () => {
  assert.equal(activeSection(sections, 0), 'kort');
  assert.equal(activeSection(sections, 900), 'herken');
  assert.equal(activeSection(sections, 1799), 'herken');
  assert.equal(activeSection(sections, 1800), 'gevolgen');
  assert.equal(activeSection([...sections].reverse(), 1000), 'herken');
});
