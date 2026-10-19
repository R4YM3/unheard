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
    kind: z.enum(['hub', 'tools', 'support']),
    sources: z.array(z.object({ label: z.string().min(2), url: z.url() })).min(1),
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
  }),
});
export const collections = { articles, pages };
