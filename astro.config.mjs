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
        // The root only redirects to /nl/ and is noindex.
        new URL(page).pathname.replace(/\/$/, '') !==
          (process.env.GITHUB_ACTIONS && !usesCustomDomain
            ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''}`
            : '') &&
        // Locales without an approved translation (see src/i18n/language.mjs) stay out.
        !/\/(?:en|ar)\//.test(page) &&
        !/\/nl\/(?:financieel-misbruik|herstel\/therapie|herstel\/therapievormen\/groepsschematherapie|ontwerp-systeem)\/$/.test(
          page,
        ),
    }),
  ],
  build: { format: 'directory' },
});
