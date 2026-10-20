import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const siteUrl = process.env.SITE_URL || 'https://r4ym3.github.io';
const usesCustomDomain = Boolean(process.env.SITE_URL);
export default defineConfig({
  site: siteUrl,
  base:
    process.env.GITHUB_ACTIONS && !usesCustomDomain
      ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''}`
      : '/',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(?:en|ar)\/$/.test(page) &&
        !/\/nl\/(?:financieel-misbruik|herstel\/therapie|ontwerp-systeem)\/$/.test(page),
    }),
  ],
  build: { format: 'directory' },
});
