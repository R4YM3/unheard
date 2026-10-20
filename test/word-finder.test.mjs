import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { parse } from 'yaml';
import {
  buildResult,
  cleanAnswers,
  limits,
  resultToText,
  validateModel,
} from '../src/lib/word-finder.mjs';

const model = parse(await readFile('src/content/finder/help-me-woorden-vinden.yaml', 'utf8'));
for (const question of model.questions) for (const option of question.options) option.routes ??= [];

const walk = async (directory) =>
  (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name),
      ),
    )
  ).flat();
const published = new Set();
for (const file of (await walk('src/content')).filter((name) => /\.mdx?$/.test(name))) {
  const front = (await readFile(file, 'utf8')).match(/^---\s*\n([\s\S]*?)\n---/)?.[1];
  const data = front ? parse(front) : {};
  if (data.published && data.locale !== 'en') published.add(data.translationKey);
}

const pages = Object.fromEntries(
  [...published].map((key) => [key, { href: `nl/${key}/`, title: `Pagina ${key}` }]),
);
const allOptions = model.questions.flatMap((question) =>
  question.options.map((option) => ({ question: question.id, ...option })),
);
const pick = (...ids) => {
  const answers = {};
  for (const id of ids) {
    const option = allOptions.find((candidate) => candidate.id === id);
    assert.ok(option, `unknown option ${id}`);
    (answers[option.question] ??= []).push(id);
  }
  return answers;
};

test('the content model is valid and only links to published pages', () => {
  assert.deepEqual(validateModel(model, published), []);
});

test('every route is reachable from at least one answer', () => {
  const reachable = new Set(allOptions.flatMap((option) => option.routes));
  for (const route of model.routes) assert.ok(reachable.has(route.id), route.id);
  assert.equal(model.routes.length, 8);
});

test('validation catches unknown pages, routes and verdict language', () => {
  const broken = JSON.parse(JSON.stringify(model));
  broken.routes[0].patterns.push('bestaat-niet');
  broken.questions[0].options[0].routes.push('onbekend');
  broken.empty = 'Je score is 80%.';
  const problems = validateModel(broken, published).join('\n');
  assert.match(problems, /bestaat-niet/);
  assert.match(problems, /unknown route onbekend/);
  assert.match(problems, /percentages/);
  assert.match(problems, /scores or verdicts/);
});

test('no answers gives a calm, general result without routes', () => {
  const result = buildResult(model, {});
  assert.equal(result.empty, true);
  assert.deepEqual(result.routes, []);
  assert.deepEqual(result.acknowledged, []);
  assert.deepEqual(result.safety, []);
  assert.deepEqual(result.patterns, model.general.reading);
  assert.ok(result.reflections.length >= 2 && result.reflections.length <= 3);
  for (const key of model.general.next) assert.ok(result.next.includes(key));
});

test('only "none of these" answers still count as empty', () => {
  const result = buildResult(model, pick('gevoel-geen', 'ruzie-geen', 'vrij', 'veilig'));
  assert.equal(result.empty, true);
});

test('answers become acknowledgements, routes, links and 2–3 reflection questions', () => {
  const result = buildResult(model, pick('twijfel', 'anders-onthouden', 'geen-zicht'));
  assert.equal(result.empty, false);
  assert.equal(result.acknowledged.length, 3);
  assert.deepEqual(
    result.routes.map((route) => route.id),
    ['zelftwijfel', 'financieel'],
  );
  assert.ok(result.patterns.includes('gaslighting'));
  assert.ok(result.patterns.includes('economisch-misbruik'));
  assert.ok(result.reflections.length >= 2 && result.reflections.length <= limits.reflections);
  assert.ok(result.next.includes('hulp-vinden'));
});

test('the most chosen routes come first and the overview stays short', () => {
  const everything = pick(
    ...allOptions.filter((option) => !option.exclusive).map((option) => option.id),
  );
  const result = buildResult(model, everything);
  assert.equal(result.routes.length, limits.routes);
  assert.ok(result.patterns.length <= limits.patterns);
  assert.ok(result.feelings.length <= limits.feelings);
  assert.equal(result.reflections.length, limits.reflections);
  assert.equal(new Set(result.next).size, result.next.length);
});

test('an exclusive answer replaces the other answers to that question', () => {
  assert.deepEqual(cleanAnswers(model, pick('twijfel', 'schuldig', 'gevoel-geen')), {
    gevoel: ['gevoel-geen'],
  });
  assert.deepEqual(cleanAnswers(model, { gevoel: ['bestaat-niet'], onbekend: ['x'] }), {});
});

test('safety answers put help first, most urgent first', () => {
  assert.deepEqual(buildResult(model, pick('soms-bang')).safety, ['concern']);
  const result = buildResult(model, pick('soms-bang', 'niet-veilig', 'niet-meer-willen'));
  assert.deepEqual(result.safety, ['crisis', 'danger', 'concern']);
  assert.match(result.safetyTexts[0], /113/);
  assert.match(result.safetyTexts[1], /112/);
  assert.match(result.safetyTexts[1], /0800-2000/);
});

test('the result never contains a score, percentage, verdict or label', () => {
  const everything = pick(
    ...allOptions.filter((option) => !option.exclusive).map((option) => option.id),
  );
  const result = buildResult(model, everything);
  const text = JSON.stringify(result);
  assert.doesNotMatch(text, /\d+\s?%|procent|score|risico|uitslag/i);
  assert.doesNotMatch(text, /je bent (?:\w+ )?(?:misbruikt|slachtoffer)/i);
  assert.doesNotMatch(text, /\b(?:is|zijn) (?:een )?(?:narcist|sociopaat|psychopaat)\b/i);
  for (const key of Object.keys(result)) assert.doesNotMatch(key, /score|count|weight|level/i);
});

test('the download text includes help and only the notes the reader chose to include', () => {
  const result = buildResult(model, pick('twijfel', 'niet-veilig'));
  const help = ['Direct gevaar: bel 112.'];
  const toUrl = (href) => `https://unheard.support/${href}`;
  const text = resultToText(result, pages, {
    toUrl,
    help,
    notes: [
      { question: 'Welk woord past?', answer: 'moe' },
      { question: 'Leeg', answer: '   ' },
    ],
  });
  assert.match(text, /^Ongehoord · Mijn overzicht/);
  assert.match(text, /geen diagnose/);
  assert.match(text, /Direct gevaar: bel 112\./);
  assert.match(text, /https:\/\/unheard\.support\/nl\/gaslighting\//);
  assert.match(text, /Welk woord past\?\nmoe/);
  assert.doesNotMatch(text, /Leeg/);
  const without = resultToText(result, pages, { toUrl, help });
  assert.doesNotMatch(without, /Wat ik eigenlijk heb meegemaakt/);
});
