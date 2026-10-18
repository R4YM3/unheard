import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({ site: process.env.SITE_URL ?? 'https://example.github.io', base: process.env.GITHUB_ACTIONS ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''}` : '/', output: 'static', integrations: [sitemap()], build: { format: 'directory' } });
