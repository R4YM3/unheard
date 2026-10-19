import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseDocument } from 'yaml';

const articleDirectory = 'src/content/articles';
const pageDirectory = 'src/content/pages';
const supportedLocales = new Set(['nl', 'en', 'ar']);
const walk = async (directory) =>
  (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name),
      ),
    )
  ).flat();
const parseFrontmatter = async (file) => {
  const text = await readFile(file, 'utf8');
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match) throw new Error(`${file}: missing YAML frontmatter`);
  const document = parseDocument(match[1]);
  if (document.errors.length > 0) {
    throw new Error(
      `${file}: invalid YAML — ${document.errors.map(({ message }) => message).join(', ')}`,
    );
  }
  return document.toJS();
};

const errors = [];
const files = (await walk(articleDirectory)).filter((file) => /\.mdx?$/.test(file));
const articles = await Promise.all(
  files.map(async (file) => ({ file, data: await parseFrontmatter(file) })),
);
const publishedByKey = new Map();
const slugs = new Set();
for (const { file, data } of articles) {
  if (!data || typeof data !== 'object') {
    errors.push(`${file}: frontmatter must be an object`);
    continue;
  }
  const required = [
    'title',
    'description',
    'locale',
    'translationKey',
    'slug',
    'kind',
    'published',
    'author',
    'updatedAt',
  ];
  for (const field of required) if (!(field in data)) errors.push(`${file}: missing ${field}`);
  if (!supportedLocales.has(data.locale)) errors.push(`${file}: locale must be nl, en, or ar`);
  if (
    typeof data.slug !== 'string' ||
    !/^[a-z0-9]+(?:[a-z0-9-]*\/)*[a-z0-9]+(?:[a-z0-9-]*)?$/.test(data.slug)
  ) {
    errors.push(`${file}: slug must use lowercase URL-safe segments without a leading slash`);
  } else {
    const key = `${data.locale}:${data.slug}`;
    if (slugs.has(key)) errors.push(`${file}: duplicate route ${key}`);
    slugs.add(key);
  }
  if (typeof data.updatedAt !== 'string' || Number.isNaN(Date.parse(data.updatedAt)))
    errors.push(`${file}: updatedAt must be an ISO date`);
  if (!Array.isArray(data.related)) errors.push(`${file}: related must be an array`);
  if (!Array.isArray(data.sources)) errors.push(`${file}: sources must be an array`);
  if (data.published === true && data.sources?.length === 0)
    errors.push(`${file}: published content needs at least one source`);
  for (const source of data.sources ?? []) {
    if (!source?.label || typeof source.url !== 'string' || !source.url.startsWith('https://'))
      errors.push(`${file}: every source needs a label and HTTPS URL`);
  }
  if (data.published === true && typeof data.translationKey === 'string') {
    const key = `${data.locale}:${data.translationKey}`;
    if (publishedByKey.has(key)) errors.push(`${file}: duplicate published translation key ${key}`);
    publishedByKey.set(key, file);
  }
}
for (const { file, data } of articles.filter(({ data }) => data?.published === true)) {
  for (const relatedKey of data.related ?? []) {
    if (!publishedByKey.has(`${data.locale}:${relatedKey}`))
      errors.push(`${file}: related entry ${relatedKey} is not a published ${data.locale} article`);
  }
}
const pageFiles = (await walk(pageDirectory)).filter((file) => /\.mdx?$/.test(file));
const pages = await Promise.all(
  pageFiles.map(async (file) => ({ file, data: await parseFrontmatter(file) })),
);
const pageRoutes = new Set();
for (const { file, data } of pages) {
  if (!data || typeof data !== 'object') {
    errors.push(`${file}: frontmatter must be an object`);
    continue;
  }
  for (const field of [
    'title',
    'description',
    'heading',
    'locale',
    'slug',
    'eyebrow',
    'lead',
    'kind',
  ]) {
    if (!(field in data)) errors.push(`${file}: missing ${field}`);
  }
  if (!supportedLocales.has(data.locale)) errors.push(`${file}: locale must be nl, en, or ar`);
  if (typeof data.slug !== 'string' || !/^[a-z0-9]+(?:[a-z0-9-]*\/)*[a-z0-9-]+$/.test(data.slug)) {
    errors.push(`${file}: slug must use lowercase URL-safe segments without a leading slash`);
  } else {
    const route = `${data.locale}:${data.slug}`;
    if (pageRoutes.has(route)) errors.push(`${file}: duplicate page route ${route}`);
    pageRoutes.add(route);
  }
  if (!['hub', 'tools', 'support', 'therapy', 'story'].includes(data.kind))
    errors.push(`${file}: kind must be hub, tools, support, therapy, or story`);
  if (!Array.isArray(data.sources) || (data.kind !== 'story' && data.sources.length === 0))
    errors.push(`${file}: non-story content pages need at least one source`);
  for (const source of data.sources ?? []) {
    if (!source?.label || typeof source.url !== 'string' || !source.url.startsWith('https://'))
      errors.push(`${file}: every source needs a label and HTTPS URL`);
  }
  if ('cards' in data && !Array.isArray(data.cards)) errors.push(`${file}: cards must be an array`);
  for (const card of data.cards ?? []) {
    if (!card?.title || !card?.description)
      errors.push(`${file}: every card needs title and description`);
    if (card.href && /^(?:https?:)?\/\//i.test(card.href))
      errors.push(`${file}: card links must be internal routes`);
    if (card.items && !Array.isArray(card.items))
      errors.push(`${file}: card items must be an array`);
  }
  if (data.safety) {
    for (const field of ['title', 'description', 'href', 'label']) {
      if (!data.safety[field]) errors.push(`${file}: safety needs ${field}`);
    }
  }
  if (data.kind === 'therapy') {
    const therapy = data.therapy;
    const sections = ['introduction', 'experiences', 'questions', 'closing', 'support'];
    if (!therapy || typeof therapy !== 'object') {
      errors.push(`${file}: therapy pages need therapy content`);
    } else {
      for (const section of sections) {
        if (!therapy[section] || typeof therapy[section] !== 'object')
          errors.push(`${file}: therapy content needs ${section}`);
      }
      if (!Array.isArray(therapy.experiences?.items) || therapy.experiences.items.length === 0)
        errors.push(`${file}: therapy experiences need at least one item`);
      if (!Array.isArray(therapy.questions?.items) || therapy.questions.items.length === 0)
        errors.push(`${file}: therapy questions need at least one item`);
      if (therapy.support?.href && /^(?:https?:)?\/\//i.test(therapy.support.href))
        errors.push(`${file}: therapy support link must be an internal route`);
    }
  }
  if (data.kind === 'story') {
    const story = data.story;
    const sections = ['introduction', 'timeline', 'fatherhood', 'recovery', 'letter'];
    if (!story || typeof story !== 'object') {
      errors.push(`${file}: story pages need story content`);
    } else {
      for (const section of sections) {
        if (!story[section] || typeof story[section] !== 'object')
          errors.push(`${file}: story content needs ${section}`);
      }
      for (const milestone of story.timeline?.milestones ?? []) {
        if (!Array.isArray(milestone.lenses) || milestone.lenses.length !== 4)
          errors.push(`${file}: every story milestone needs four lenses`);
      }
      if (story.recovery?.href && /^(?:https?:)?\/\//i.test(story.recovery.href))
        errors.push(`${file}: story recovery link must be an internal route`);
    }
  }
}
if (errors.length > 0) throw new Error(`Content validation failed:\n${errors.join('\n')}`);
console.log(
  `Validated ${articles.length} articles, ${pages.length} pages, and ${publishedByKey.size} published relations.`,
);
