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
export const collections = { articles };
