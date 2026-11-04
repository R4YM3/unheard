import assert from 'node:assert/strict';
import test from 'node:test';
import { markReview, REVIEW_MARKER } from '../src/lib/review-marks.ts';

test('paragraphs and list items with a review marker are flagged', () => {
  const html = `<p>Klaar.</p><p>${REVIEW_MARKER} Nog te schrijven.</p><ul><li>Vraag? ${REVIEW_MARKER}</li></ul>`;
  const out = markReview(html);
  assert.match(out, /<p>Klaar\.<\/p>/);
  assert.match(out, /<p class="needs-review"><mark class="review-marker">/);
  assert.match(out, /<li class="needs-review">Vraag\? <mark class="review-marker">/);
});

test('existing classes are kept and highlighted markers are not wrapped twice', () => {
  const html = `<p class="lead"><mark class="review-marker">${REVIEW_MARKER}</mark> x</p>`;
  const out = markReview(html);
  assert.equal(out.match(/review-marker/g)?.length, 1);
  assert.match(out, /<p class="needs-review lead">/);
});

test('scripts are left untouched and pages without markers are unchanged', () => {
  const script = `<script type="application/ld+json">{"x":"${REVIEW_MARKER}"}</script>`;
  assert.equal(markReview(script), script);
  assert.equal(markReview('<p>Niets</p>'), '<p>Niets</p>');
});
