export const prerender = true;

export function GET() {
  const noIndex = process.env.NO_INDEX === 'true';
  const body = noIndex
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\nSitemap: /sitemap-index.xml\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
