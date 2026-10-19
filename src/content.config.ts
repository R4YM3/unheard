import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(8),
    description: z.string().min(30),
    locale: z.enum(['nl', 'en', 'ar']),
    translationKey: z.string().min(2),
    slug: z.string().min(2),
    kind: z.enum(['emotion', 'concept', 'recovery', 'resource']),
    published: z.boolean(),
    author: z.string(),
    reviewedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date(),
    related: z.array(z.string()).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    hero: z
      .object({
        eyebrow: z.string().min(2),
        paragraphs: z.array(z.string().min(20)).min(1),
        actions: z
          .array(
            z.object({
              href: z.string().min(1),
              label: z.string().min(2),
              quiet: z.boolean().default(false),
            }),
          )
          .default([]),
        visualNote: z.string().min(10).optional(),
      })
      .optional(),
  }),
});
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(8),
    description: z.string().min(30),
    heading: z.string().min(8),
    locale: z.enum(['nl', 'en', 'ar']),
    slug: z.string().min(2),
    eyebrow: z.string().min(2),
    lead: z.string().min(20),
    kind: z.enum(['hub', 'tools', 'support', 'therapy', 'story', 'home']),
    sources: z.array(z.object({ label: z.string().min(2), url: z.url() })).default([]),
    cards: z
      .array(
        z.object({
          eyebrow: z.string().min(2).optional(),
          title: z.string().min(4),
          description: z.string().min(10),
          href: z.string().min(1).optional(),
          items: z.array(z.string().min(3)).default([]),
        }),
      )
      .default([]),
    safety: z
      .object({
        title: z.string().min(4),
        description: z.string().min(10),
        href: z.string().min(1),
        label: z.string().min(2),
      })
      .optional(),
    therapy: z
      .object({
        heroParagraphs: z.array(z.string().min(20)).min(1).optional(),
        introduction: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          paragraphs: z.array(z.string().min(20)).min(1),
          quote: z.string().min(8),
          notice: z.string().min(20),
        }),
        experiences: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          lead: z.string().min(20),
          items: z
            .array(
              z.object({
                eyebrow: z.string().min(2),
                title: z.string().min(2),
                personal: z.string().min(20),
                explanation: z.string().min(20),
              }),
            )
            .min(1),
        }),
        questions: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          lead: z.string().min(20),
          items: z
            .array(z.object({ title: z.string().min(5), description: z.string().min(10) }))
            .min(1),
        }),
        closing: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          paragraphs: z.array(z.string().min(20)).min(1),
          quote: z.string().min(8),
        }),
        support: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          paragraphs: z.array(z.string().min(20)).min(1),
          href: z.string().min(1),
          label: z.string().min(2),
        }),
      })
      .optional(),
    story: z
      .object({
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
                lenses: z
                  .array(z.object({ heading: z.string().min(4), text: z.string().min(10) }))
                  .length(4),
                between: z
                  .array(z.object({ title: z.string().min(4), text: z.string().min(10) }))
                  .max(2)
                  .default([]),
              }),
            )
            .min(1),
          note: z.string().min(20),
        }),
        fatherhood: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          cards: z
            .array(z.object({ title: z.string().min(4), description: z.string().min(20) }))
            .min(1),
        }),
        recovery: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          cards: z
            .array(z.object({ title: z.string().min(4), description: z.string().min(20) }))
            .min(1),
          href: z.string().min(1),
          label: z.string().min(2),
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
      })
      .optional(),
    home: z
      .object({
        hero: z.object({
          eyebrow: z.string().min(2),
          lead: z.string().min(20),
          description: z.string().min(20),
          primary: z.object({ href: z.string().min(1), label: z.string().min(2) }),
          secondary: z.object({ href: z.string().min(1), label: z.string().min(2) }),
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
          cards: z
            .array(
              z.object({
                eyebrow: z.string().min(2),
                title: z.string().min(5),
                href: z.string().min(1),
              }),
            )
            .min(1),
        }),
        patterns: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          cards: z
            .array(
              z.object({
                eyebrow: z.string().min(2),
                title: z.string().min(8),
                description: z.string().min(20),
                note: z.string().min(10),
                label: z.string().min(2),
                href: z.string().min(1),
              }),
            )
            .min(1),
        }),
        storyTeaser: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          paragraphs: z.array(z.string().min(20)).min(1),
          href: z.string().min(1),
          label: z.string().min(2),
        }),
        timelineTeaser: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(4),
          description: z.string().min(20),
          href: z.string().min(1),
          label: z.string().min(2),
        }),
        resources: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          cards: z
            .array(
              z.object({
                eyebrow: z.string().min(2),
                title: z.string().min(8),
                description: z.string().min(20),
                label: z.string().min(2),
                href: z.string().min(1),
              }),
            )
            .min(1),
        }),
        closing: z.object({
          eyebrow: z.string().min(2),
          heading: z.string().min(8),
          description: z.string().min(20),
          href: z.string().min(1),
          label: z.string().min(2),
          note: z.string().min(20),
        }),
      })
      .optional(),
  }),
});
export const collections = { articles, pages };
