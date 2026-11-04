export const prerender = true;

export function GET({ site }: { site?: URL }) {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const sitemap = new URL(`${base}sitemap-index.xml`, site ?? 'https://unheard.support').href;
  const noIndex = process.env.NO_INDEX === 'true';
  const body = noIndex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nDisallow: /en/\nDisallow: /ar/\nAllow: /\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
