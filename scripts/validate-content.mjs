import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseDocument } from 'yaml';
import { validateModel } from '../src/lib/word-finder.mjs';

/**
 * Fast pre-build checks across all content collections. The Zod schemas in
 * src/content.config.ts remain authoritative; this script adds cross-file rules that Zod
 * cannot express: unique keys/routes, resolvable relations, the review gate and editorial
 * lint. Usage: `node scripts/validate-content.mjs [file …]` (no args = everything).
 */
const root = 'src/content';
const collections = {
  emotions: 'wat-voel-ik/',
  patterns: 'begrippen/',
  articles: '',
  therapies: 'herstel/therapievormen/',
  tools: 'hulpmiddelen/',
  hubs: '',
  story: '',
};
const plannedKeys = new Set(
  (await readFile('src/lib/content.ts', 'utf8'))
    .match(/plannedKeys = new Set\(\[([\s\S]*?)\]\)/)?.[1]
    .match(/'([a-z0-9-]+)'/g)
    ?.map((value) => value.slice(1, -1)) ?? [],
);
const editorialReviewRequired = process.env.NO_INDEX === 'false';
const onlyFiles = new Set(process.argv.slice(2).map((file) => file.replace(/^\.\//, '')));

const walk = async (directory) =>
  (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name),
      ),
    )
  ).flat();

const parse = async (file) => {
  const text = await readFile(file, 'utf8');
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match) return { error: 'missing YAML frontmatter' };
  const document = parseDocument(match[1]);
  if (document.errors.length > 0)
    return { error: `invalid YAML — ${document.errors.map(({ message }) => message).join('; ')}` };
  return { data: document.toJS(), body: text.slice(match[0].length) };
};

const errors = [];
const entries = [];
for (const [collection, prefix] of Object.entries(collections)) {
  let files = [];
  try {
    files = (await walk(join(root, collection))).filter((file) => /\.mdx?$/.test(file));
  } catch {
    continue;
  }
  for (const file of files) {
    const { data, body, error } = await parse(file);
    if (error) {
      errors.push(`${file}: ${error}`);
      continue;
    }
    entries.push({ file, collection, prefix, data, body });
  }
}

const isDate = (value) =>
  value instanceof Date || (typeof value === 'string' && !Number.isNaN(Date.parse(value)));
const externalHref = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;
const forbidden = [
  [/\blorem ipsum\b/i, 'placeholder text'],
  [
    /\bons team\b|\bonze redactie\b|\bons platform\b|\bwij zijn er\b|\bwij bieden\b/i,
    '"wij/ons team" voice',
  ],
  [/\b(?:is|zijn) (?:een )?(?:narcist|sociopaat|psychopaat)\b/i, 'labels a person'],
];
const hrefsIn = (value, found = []) => {
  if (Array.isArray(value)) value.forEach((item) => hrefsIn(item, found));
  else if (value && typeof value === 'object')
    for (const [field, item] of Object.entries(value)) {
      if (field === 'href' && typeof item === 'string') found.push(item);
      else hrefsIn(item, found);
    }
  return found;
};

const keys = new Map();
const routes = new Map();
for (const entry of entries) {
  const { file, data, prefix, collection } = entry;
  const where = `${file}`;
  for (const field of [
    'title',
    'description',
    'translationKey',
    'slug',
    'publishedAt',
    'updatedAt',
  ])
    if (!(field in data)) errors.push(`${where}: missing ${field}`);
  if (!['nl', 'en', 'ar'].includes(data.locale ?? 'nl'))
    errors.push(`${where}: locale must be nl, en or ar`);
  if (data.status && !['draft', 'in_review', 'approved'].includes(data.status))
    errors.push(`${where}: status must be draft, in_review or approved`);
  if (data.author && !['founder', 'editorial', 'Ongehoord'].includes(data.author))
    errors.push(`${where}: author must be founder or editorial`);
  if (typeof data.slug !== 'string' || !data.slug.startsWith(prefix))
    errors.push(`${where}: slug must start with "${prefix}"`);
  if (
    typeof data.description === 'string' &&
    (data.description.length < 30 || data.description.length > 200)
  )
    errors.push(`${where}: description must be 30–200 characters (${data.description.length})`);
  for (const field of ['publishedAt', 'updatedAt'])
    if (field in data && !isDate(data[field]))
      errors.push(`${where}: ${field} must be an ISO date`);
  if (data.reviewedAt != null && !isDate(data.reviewedAt))
    errors.push(`${where}: reviewedAt must be an ISO date or null`);
  if (data.published === true && editorialReviewRequired && !data.reviewedAt)
    errors.push(`${where}: published content needs reviewedAt before NO_INDEX can be disabled`);
  if (data.published === true && editorialReviewRequired && data.status !== 'approved')
    errors.push(`${where}: published content must be approved before NO_INDEX can be disabled`);
  for (const source of data.sources ?? []) {
    if (!source?.label || typeof source.url !== 'string' || !source.url.startsWith('https://'))
      errors.push(`${where}: every source needs a label and an HTTPS URL`);
  }
  const needsSources = ['emotions', 'patterns', 'therapies'].includes(collection);
  if (data.published === true && needsSources && !(data.sources ?? []).length)
    errors.push(`${where}: published ${collection} need at least one source`);
  for (const href of hrefsIn(data)) {
    if (href.startsWith('/')) errors.push(`${where}: href ${href} must be relative to <base>`);
    else if (externalHref.test(href) && !href.startsWith('tel:'))
      errors.push(`${where}: frontmatter href ${href} must be internal`);
  }
  for (const [pattern, reason] of forbidden) {
    if (pattern.test(entry.body) || pattern.test(JSON.stringify(data)))
      errors.push(`${where}: editorial lint — ${reason}`);
  }
  for (const link of entry.body.matchAll(/\]\((\/[^)]*)\)/g))
    errors.push(`${where}: Markdown link ${link[1]} must be relative to <base>`);
  if (/^#\s/m.test(entry.body)) errors.push(`${where}: body must not contain an H1 (#)`);
  if (data.published !== true) continue;
  const keyId = `${data.locale ?? 'nl'}:${data.translationKey}`;
  const route = `${data.locale ?? 'nl'}:${data.slug}`;
  if (keys.has(keyId))
    errors.push(`${where}: duplicate translationKey ${keyId} (${keys.get(keyId)})`);
  if (routes.has(route)) errors.push(`${where}: duplicate route ${route} (${routes.get(route)})`);
  keys.set(keyId, file);
  routes.set(route, file);
}

for (const { file, data } of entries.filter(({ data }) => data.feelingTimeline)) {
  const steps = data.feelingTimeline.steps ?? [];
  const stepKeys = steps.map((step) => step?.key);
  if (new Set(stepKeys).size !== stepKeys.length)
    errors.push(`${file}: feeling timeline repeats a feeling`);
  const locale = data.locale ?? 'nl';
  const feelings = entries
    .filter(
      (entry) =>
        entry.collection === 'emotions' &&
        entry.data.published === true &&
        (entry.data.locale ?? 'nl') === locale,
    )
    .map((entry) => entry.data.translationKey);
  for (const feeling of stepKeys) {
    if (!feelings.includes(feeling))
      errors.push(`${file}: feeling timeline step "${feeling}" is not a published feeling`);
  }
  for (const feeling of feelings) {
    if (!stepKeys.includes(feeling))
      errors.push(`${file}: feeling timeline misses published feeling "${feeling}"`);
  }
}

for (const { file, data } of entries.filter(({ data }) => data.published === true)) {
  const related = Array.isArray(data.related)
    ? data.related
    : Object.values(data.related ?? {}).flat();
  for (const relatedKey of related) {
    if (!keys.has(`${data.locale ?? 'nl'}:${relatedKey}`) && !plannedKeys.has(relatedKey))
      errors.push(`${file}: related key "${relatedKey}" is not a published entry or planned key`);
  }
}

const statsFiles = (await walk(join(root, 'stats')).catch(() => [])).filter((file) =>
  /\.ya?ml$/.test(file),
);
for (const file of statsFiles) {
  const document = parseDocument(await readFile(file, 'utf8'));
  const data = document.toJS();
  for (const field of ['value', 'study', 'url', 'checkedAt', 'population', 'period', 'definition'])
    if (!data?.[field]) errors.push(`${file}: missing ${field}`);
  if (data?.url && !String(data.url).startsWith('https://'))
    errors.push(`${file}: url must be HTTPS`);
}

const finderFiles = (await walk(join(root, 'finder')).catch(() => [])).filter((file) =>
  /\.ya?ml$/.test(file),
);
const nlKeys = new Set(
  [...keys.keys()].filter((id) => id.startsWith('nl:')).map((id) => id.slice(3)),
);
for (const file of finderFiles) {
  const document = parseDocument(await readFile(file, 'utf8'));
  if (document.errors.length > 0) {
    errors.push(`${file}: invalid YAML`);
    continue;
  }
  const model = document.toJS();
  for (const question of model.questions ?? [])
    for (const option of question.options ?? []) option.routes ??= [];
  for (const problem of validateModel(model, nlKeys)) errors.push(`${file}: ${problem}`);
  for (const [pattern, reason] of forbidden)
    if (pattern.test(JSON.stringify(model))) errors.push(`${file}: editorial lint — ${reason}`);
}

const reported = onlyFiles.size
  ? errors.filter((message) => [...onlyFiles].some((file) => message.startsWith(file)))
  : errors;
if (reported.length > 0) {
  console.error(`Content validation failed:\n${reported.join('\n')}`);
  process.exit(1);
}
console.log(
  `Validated ${entries.length} content files (${keys.size} published keys), ${statsFiles.length} figures and ${finderFiles.length} word finder.`,
);
