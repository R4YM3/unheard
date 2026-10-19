export const supportedLocales = ['nl', 'en', 'ar'];
export const publishedLocales = ['nl'];
export const fallbackLocale = 'nl';
export function normaliseLocale(value) {
  if (typeof value !== 'string') return fallbackLocale;
  const primary = value.trim().toLowerCase().split('-')[0];
  return supportedLocales.includes(primary) ? primary : fallbackLocale;
}
export function preferredLocale({ saved, languages } = {}) {
  if (typeof saved === 'string' && publishedLocales.includes(normaliseLocale(saved)))
    return normaliseLocale(saved);
  if (Array.isArray(languages))
    for (const language of languages) {
      const candidate = normaliseLocale(language);
      if (publishedLocales.includes(candidate)) return candidate;
    }
  return fallbackLocale;
}
export function targetForLocale(locale, pathname, base = '/') {
  const normalised = normaliseLocale(locale);
  const target = publishedLocales.includes(normalised) ? normalised : fallbackLocale;
  const root = base.replace(/\/$/, '');
  const localPath = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname.replace(/^\//, '');
  const parts = localPath.split('/').filter(Boolean);
  if (supportedLocales.includes(parts[0])) parts.shift();
  return `${root}/${target}/`.replace(/\/{2,}/g, '/');
}
