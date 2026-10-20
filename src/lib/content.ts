import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';

export const routedCollections = [
  'emotions',
  'patterns',
  'articles',
  'therapies',
  'tools',
  'hubs',
  'story',
] as const;
export type RoutedCollection = (typeof routedCollections)[number];
export type RoutedEntry = CollectionEntry<RoutedCollection>;

/**
 * Relation keys for term articles that are written on the parallel `content/begrippen`
 * branch. They may be referenced before they exist; they render once published.
 * Any other unknown key fails the build. See docs/SCHEMA_CHANGES.md.
 */
export const plannedKeys = new Set([
  'gaslighting',
  'hoovering',
  'triangulatie',
  'framing',
  'schuldverschuiving',
  'projectie',
  'silent-treatment',
  'love-bombing',
  'dwingende-controle',
  'isolatie',
  'sociale-druk',
  'traumabinding',
  'hyperwaakzaamheid',
  'fawn-respons',
  'conflictvermijding',
  'emotionele-uitputting',
  'verlies-van-identiteit',
  'schaamte',
  'narcisme',
  'antisociale-persoonlijkheidsstoornis',
  'psychopathie',
]);

export const collectionLabels: Record<RoutedCollection, string> = {
  emotions: 'Gevoel',
  patterns: 'Begrip',
  articles: 'Uitleg',
  therapies: 'Therapievorm',
  tools: 'Hulpmiddel',
  hubs: 'Overzicht',
  story: 'Mijn verhaal',
};

export const routeFor = (entry: RoutedEntry) =>
  entry.data.slug === 'home' ? `${entry.data.locale}/` : `${entry.data.locale}/${entry.data.slug}/`;

let cache: Promise<RoutedEntry[]> | undefined;

/** Every published, routable entry across collections. Throws on duplicate keys or routes. */
export const getPublishedEntries = () => {
  cache ??= (async () => {
    const all = (
      await Promise.all(
        routedCollections.map(
          (name) => getCollection(name, ({ data }) => data.published) as Promise<RoutedEntry[]>,
        ),
      )
    ).flat();
    const keys = new Map<string, string>();
    const routes = new Map<string, string>();
    for (const entry of all) {
      const keyId = `${entry.data.locale}:${entry.data.translationKey}`;
      const route = routeFor(entry);
      if (keys.has(keyId))
        throw new Error(`Duplicate translationKey ${keyId}: ${keys.get(keyId)} and ${entry.id}`);
      if (routes.has(route))
        throw new Error(`Duplicate route ${route}: ${routes.get(route)} and ${entry.id}`);
      keys.set(keyId, `${entry.collection}/${entry.id}`);
      routes.set(route, `${entry.collection}/${entry.id}`);
    }
    for (const entry of all) {
      for (const relatedKey of entry.data.related) {
        if (!keys.has(`${entry.data.locale}:${relatedKey}`) && !plannedKeys.has(relatedKey))
          throw new Error(
            `${entry.collection}/${entry.id}: related key "${relatedKey}" is not a published ${entry.data.locale} entry`,
          );
      }
    }
    return all;
  })();
  return cache;
};

export const findByKey = async (locale: Locale | string, translationKey: string) =>
  (await getPublishedEntries()).find(
    (entry) => entry.data.locale === locale && entry.data.translationKey === translationKey,
  );

export interface LinkCard {
  href: string;
  title: string;
  text: string;
  eyebrow: string;
  collection: RoutedCollection;
}

export const cardFor = (entry: RoutedEntry): LinkCard => ({
  href: routeFor(entry),
  title: entry.data.cardTitle ?? entry.data.title,
  text: entry.data.cardText ?? entry.data.description,
  eyebrow:
    entry.collection === 'emotions'
      ? `Gevoel · ${entry.data.feeling}`
      : entry.collection === 'therapies'
        ? `Therapievorm · ${entry.data.name}`
        : collectionLabels[entry.collection],
  collection: entry.collection,
});

/** Related entries in declared order; planned-but-unpublished keys are skipped. */
export const resolveRelated = async (entry: RoutedEntry) => {
  const published = await getPublishedEntries();
  return entry.data.related
    .map((relatedKey) =>
      published.find(
        (candidate) =>
          candidate.data.locale === entry.data.locale &&
          candidate.data.translationKey === relatedKey,
      ),
    )
    .filter((candidate): candidate is RoutedEntry => Boolean(candidate))
    .map(cardFor);
};

const byOrder = (a: RoutedEntry, b: RoutedEntry) =>
  (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title, 'nl');

/** Published entries of a collection; with a prefix, only direct children (`prefix/<segment>`). */
export const listCollection = async (
  collection: RoutedCollection,
  locale: Locale | string,
  prefix?: string,
) =>
  (await getPublishedEntries())
    .filter((entry) => {
      if (entry.collection !== collection || entry.data.locale !== locale) return false;
      if (!prefix) return true;
      const rest = entry.data.slug.slice(prefix.length);
      return entry.data.slug.startsWith(prefix) && rest.length > 0 && !rest.includes('/');
    })
    .sort(byOrder);

export interface GlossaryItem {
  term: string;
  definition: string;
  aliases: string[];
  category: string;
  href: string;
  letter: string;
}

const letterFor = (term: string) => {
  const first = term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .charAt(0)
    .toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
};

/** Glossary blocks from every published entry, alphabetised. */
export const glossaryItems = async (locale: Locale | string): Promise<GlossaryItem[]> =>
  (await getPublishedEntries())
    .filter((entry) => entry.data.locale === locale && entry.data.glossary)
    .map((entry) => {
      const glossary = entry.data.glossary!;
      return {
        term: glossary.term,
        definition: glossary.definition,
        aliases: glossary.aliases,
        category: glossary.category,
        href: routeFor(entry),
        letter: letterFor(glossary.term),
      };
    })
    .sort((a, b) => a.term.localeCompare(b.term, 'nl', { sensitivity: 'base' }));

export const glossaryCategoryLabels: Record<string, string> = {
  patroon: 'Patroon',
  controle: 'Controle',
  financieel: 'Financieel',
  impact: 'Mogelijke impact',
  labels: 'Labels en diagnoses',
  basis: 'Basisbegrip',
};

export interface SearchItem extends LinkCard {
  keywords: string;
}

/** Every published page except home and the search page itself, for the static search list. */
export const searchItems = async (locale: Locale | string): Promise<SearchItem[]> =>
  (await getPublishedEntries())
    .filter(
      (entry) =>
        entry.data.locale === locale &&
        entry.data.slug !== 'home' &&
        entry.data.translationKey !== 'zoeken',
    )
    .sort(byOrder)
    .map((entry) => ({
      ...cardFor(entry),
      keywords: [
        entry.data.title,
        entry.data.cardTitle,
        entry.data.description,
        entry.data.glossary?.term,
        ...(entry.data.glossary?.aliases ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
    }));

export const statusLabels = {
  draft: 'Concept',
  in_review: 'In review',
  approved: 'Gecontroleerd',
} as const;

export const authorLabels = {
  founder: 'De oprichter van Ongehoord (persoonlijke ervaring)',
  editorial: 'Ongehoord (algemene uitleg)',
} as const;

const dateFormat = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});
export const formatDate = (date: Date) => dateFormat.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Hub titles used to build breadcrumbs from route segments. */
export const breadcrumbsFor = async (entry: RoutedEntry) => {
  const published = await getPublishedEntries();
  const segments = entry.data.slug.split('/');
  const crumbs: Array<{ href: string; label: string }> = [
    { href: `${entry.data.locale}/`, label: 'Home' },
  ];
  if (entry.data.translationKey === 'home') return crumbs;
  for (let index = 1; index < segments.length; index += 1) {
    const parentSlug = segments.slice(0, index).join('/');
    const parent = published.find(
      (candidate) =>
        candidate.data.locale === entry.data.locale && candidate.data.slug === parentSlug,
    );
    if (parent)
      crumbs.push({ href: routeFor(parent), label: parent.data.cardTitle ?? parent.data.title });
  }
  crumbs.push({ href: routeFor(entry), label: entry.data.cardTitle ?? entry.data.title });
  return crumbs;
};
