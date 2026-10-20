import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const key = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'use lowercase kebab-case keys');
const routeSlug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/, 'use lowercase URL segments');
const internalHref = z
  .string()
  .min(1)
  .refine((href) => !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href) || href.startsWith('tel:'), {
    message: 'use an internal route, anchor or tel: link',
  })
  .refine((href) => !href.startsWith('/'), {
    message: 'internal routes are relative to <base>, e.g. nl/hulp-vinden/',
  });

const source = z.object({
  label: z.string().min(2),
  url: z.url().refine((url) => url.startsWith('https://'), { message: 'sources need HTTPS' }),
  publisher: z.string().min(2).optional(),
  checkedAt: z.coerce.date().optional(),
  note: z.string().min(5).optional(),
});

/** Accepts `[a, b]` or grouped `{ patterns: [a], recovery: [b] }` and normalises to keys. */
const related = z
  .union([z.array(key), z.record(z.string(), z.array(key))])
  .default([])
  .transform((value) => (Array.isArray(value) ? value : Object.values(value).flat()));

const author = z.preprocess(
  (value) => (value === 'Ongehoord' ? 'editorial' : value),
  z.enum(['founder', 'editorial']),
);

const action = z.object({
  href: internalHref,
  label: z.string().min(2),
  quiet: z.boolean().default(false),
});

const hero = z.object({
  eyebrow: z.string().min(2),
  paragraphs: z.array(z.string().min(20)).min(1),
  actions: z.array(action).default([]),
  visualNote: z.string().min(10).optional(),
});

const glossary = z.object({
  term: z.string().min(2),
  definition: z.string().min(20).max(260),
  aliases: z.array(z.string().min(2)).default([]),
  category: z.enum(['patroon', 'controle', 'financieel', 'impact', 'labels', 'basis']),
});

const scenario = z.object({
  label: z.string().min(3).max(48),
  outside: z.string().min(3),
  inside: z.string().min(10),
  context: z.string().min(20),
});

const reflection = z.object({
  heading: z.string().min(8).optional(),
  questions: z.array(z.string().min(10)).min(1).max(6),
  note: z.string().min(20).optional(),
  writable: z.boolean().default(false),
});

const card = z.object({
  eyebrow: z.string().min(2).optional(),
  title: z.string().min(3),
  text: z.string().min(10),
  href: internalHref.optional(),
  label: z.string().min(2).optional(),
});

const founderNote = z.object({
  eyebrow: z.string().min(2).default('Waarom Ongehoord bestaat'),
  heading: z.string().min(8),
  paragraphs: z.array(z.string().min(20)).min(1),
  needsReview: z.boolean().default(true),
});

/** Shared editorial frontmatter for every routed page. */
const base = z.object({
  title: z.string().min(8),
  description: z.string().min(30).max(200),
  locale: z.enum(['nl', 'en', 'ar']).default('nl'),
  translationKey: key,
  slug: routeSlug,
  status: z.enum(['draft', 'in_review', 'approved']).default('draft'),
  published: z.boolean().default(false),
  author: author.default('editorial'),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  reviewedAt: z.coerce.date().nullable().default(null),
  sources: z.array(source).default([]),
  related,
  hero: hero.optional(),
  summary: z.string().min(40).max(420).optional(),
  glossary: glossary.optional(),
  reviewNotes: z.array(z.string().min(10)).default([]),
  cardTitle: z.string().min(4).optional(),
  cardText: z.string().min(10).max(200).optional(),
  order: z.number().int().optional(),
});

const prefixed = <T extends z.ZodObject>(schema: T, prefix: string) =>
  schema.refine((data) => String((data as { slug?: unknown }).slug).startsWith(prefix), {
    message: `slug must start with "${prefix}"`,
    path: ['slug'],
  });

const emotions = defineCollection({
  loader: glob({ base: './src/content/emotions', pattern: '**/*.{md,mdx}' }),
  schema: prefixed(
    base.extend({
      feeling: z.string().min(3).max(40),
      scenarios: z.array(scenario).max(3).default([]),
      impacts: z
        .array(z.object({ title: z.string().min(3), text: z.string().min(10) }))
        .default([]),
      reflection: reflection.optional(),
      helps: z.array(z.object({ title: z.string().min(3), text: z.string().min(10) })).default([]),
      founderNote: founderNote.optional(),
    }),
    'wat-voel-ik/',
  ),
});

const darvo = z.object({
  quote: z.object({ text: z.string().min(20) }),
  steps: z
    .array(
      z.object({
        label: z.string().min(2),
        title: z.string().min(2),
        quote: z.string().min(8),
        experience: z.string().min(20),
      }),
    )
    .length(3),
  perspectives: z.object({ outside: z.string().min(20), inside: z.string().min(20) }),
  impacts: z.array(z.object({ title: z.string().min(3), text: z.string().min(10) })).min(1),
  why: z.array(z.string().min(20)).min(1),
  reflection: z.array(z.string().min(10)).min(1),
  nextStep: z.array(z.string().min(20)).min(1),
});

/** Glossary terms and behavioural patterns. Term articles are written on `content/begrippen`. */
const patterns = defineCollection({
  loader: glob({ base: './src/content/patterns', pattern: '**/*.{md,mdx}' }),
  schema: prefixed(
    base.extend({
      scenarios: z.array(scenario).max(3).default([]),
      reflection: reflection.optional(),
      darvo: darvo.optional(),
    }),
    'begrippen/',
  ),
});

/** Explanatory, recovery, support and about pages. */
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    scenarios: z.array(scenario).max(3).default([]),
    reflection: reflection.optional(),
    cards: z.array(card).default([]),
    founderNote: founderNote.optional(),
  }),
});

const therapies = defineCollection({
  loader: glob({ base: './src/content/therapies', pattern: '**/*.{md,mdx}' }),
  schema: prefixed(
    base.extend({
      name: z.string().min(3),
      focus: z.string().min(20).max(220),
      professionalQuestions: z.array(z.string().min(10)).min(3),
      founder: z
        .object({
          text: z.array(z.string().min(20)).min(1),
          needsReview: z.boolean().default(true),
        })
        .optional(),
    }),
    'herstel/therapievormen/',
  ),
});

const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
  schema: prefixed(
    base.extend({
      purpose: z.string().min(20),
      usage: z.array(z.string().min(10)).min(1),
      safety: z.string().min(20),
      card: z.object({
        title: z.string().min(4),
        intro: z.string().min(10).optional(),
        prompts: z
          .array(
            z.object({
              question: z.string().min(6),
              hint: z.string().min(6).optional(),
              kind: z.enum(['lines', 'check']).default('lines'),
              lines: z.number().int().min(1).max(8).default(3),
            }),
          )
          .min(3),
        closing: z.string().min(10).optional(),
      }),
    }),
    'hulpmiddelen/',
  ),
});

/** Individually verified figures. Only `verified: true` entries are rendered. */
const stats = defineCollection({
  loader: glob({ base: './src/content/stats', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    order: z.number().int(),
    verified: z.boolean(),
    value: z.string().min(1),
    label: z.string().min(10),
    explanation: z.string().min(40),
    study: z.string().min(10),
    publisher: z.string().min(2),
    year: z.number().int().min(2000),
    definition: z.string().min(20),
    population: z.string().min(10),
    period: z.string().min(4),
    limitations: z.array(z.string().min(20)).min(1),
    url: z.url().refine((url) => url.startsWith('https://')),
    checkedAt: z.coerce.date(),
  }),
});

const listing = z.object({
  collection: z.enum(['emotions', 'patterns', 'articles', 'therapies', 'tools']),
  prefix: z.string().optional(),
  eyebrow: z.string().min(2).optional(),
  heading: z.string().min(4),
  lead: z.string().min(10).optional(),
  tone: z.enum(['neutral', 'safe', 'tension']).default('neutral'),
  cardStyle: z.enum(['default', 'feeling']).default('default'),
});

const homeCard = z.object({
  eyebrow: z.string().min(2),
  title: z.string().min(5),
  description: z.string().min(20).optional(),
  note: z.string().min(10).optional(),
  label: z.string().min(2).optional(),
  href: internalHref,
});

const hubs = defineCollection({
  loader: glob({ base: './src/content/hubs', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    heading: z.string().min(8),
    eyebrow: z.string().min(2),
    lead: z.string().min(20),
    listings: z.array(listing).default([]),
    cards: z.array(card).default([]),
    scenarios: z.array(scenario).max(3).default([]),
    reflection: reflection.optional(),
    chooser: z.boolean().default(false),
    glossaryIndex: z.boolean().default(false),
    stats: z.boolean().default(false),
    searchIndex: z.boolean().default(false),
    founderNote: founderNote.optional(),
    home: z
      .object({
        hero: z.object({
          eyebrow: z.string().min(2),
          lead: z.string().min(20),
          description: z.string().min(20),
          primary: action,
          secondary: action,
        }),
        introduction: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          paragraphs: z.array(z.string().min(20)).min(1),
        }),
        feelings: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(4),
          lead: z.string().min(10),
          cards: z.array(homeCard).min(3).max(9),
          moreHref: internalHref,
          moreLabel: z.string().min(4),
        }),
        topics: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          cards: z.array(homeCard).min(2),
        }),
        perspective: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          lead: z.string().min(20),
        }),
        storyTeaser: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          paragraphs: z.array(z.string().min(20)).min(1),
          href: internalHref,
          label: z.string().min(2),
        }),
        timelineTeaser: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(4),
          description: z.string().min(20),
          href: internalHref,
          label: z.string().min(2),
        }),
        resources: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          cards: z.array(homeCard).min(1),
        }),
        fact: z.object({
          eyebrow: z.string().min(2),
          text: z.string().min(20),
          href: internalHref,
          label: z.string().min(2),
        }),
        closing: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          description: z.string().min(20),
          href: internalHref,
          label: z.string().min(2),
          note: z.string().min(20),
        }),
      })
      .optional(),
  }),
});

const lens = z.object({ heading: z.string().min(4), text: z.string().min(10) });

const story = defineCollection({
  loader: glob({ base: './src/content/story', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    heading: z.string().min(8),
    eyebrow: z.string().min(2),
    lead: z.string().min(20),
    heroPersonal: z.string().min(20),
    introduction: z.object({
      eyebrow: z.string().min(2),
      heading: z.string().min(8),
      lead: z.string().min(20),
      paragraphs: z.array(z.string().min(20)).min(1),
      note: z.string().min(20),
    }),
    timeline: z.object({
      eyebrow: z.string().min(2),
      heading: z.string().min(8),
      lead: z.string().min(20),
      label: z.string().min(4),
      milestones: z
        .array(
          z.object({
            eyebrow: z.string().min(2),
            title: z.string().min(8),
            description: z.string().min(20),
            lenses: z.array(lens).length(4),
            between: z
              .array(z.object({ title: z.string().min(4), text: z.string().min(10) }))
              .max(3)
              .default([]),
          }),
        )
        .min(1),
      note: z.string().min(20),
    }),
    therapy: z.object({
      eyebrow: z.string().min(2),
      heading: z.string().min(8),
      paragraphs: z.array(z.string().min(20)).min(1),
      cards: z
        .array(z.object({ title: z.string().min(4), description: z.string().min(20) }))
        .min(1),
      href: internalHref,
      label: z.string().min(2),
    }),
    fatherhood: z.object({
      eyebrow: z.string().min(2),
      heading: z.string().min(8),
      cards: z
        .array(z.object({ title: z.string().min(4), description: z.string().min(20) }))
        .min(1),
    }),
    letter: z.object({
      eyebrow: z.string().min(2),
      heading: z.string().min(4),
      paragraphs: z.array(z.string().min(20)).min(1),
      signature: z.string().min(2),
    }),
    closing: z.object({
      eyebrow: z.string().min(2),
      heading: z.string().min(8),
      paragraphs: z.array(z.string().min(20)).min(1),
    }),
  }),
});

export const collections = { emotions, patterns, articles, therapies, tools, stats, hubs, story };
