import { publishedLocales } from './language.mjs';
export const locales = ['nl', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
  ar: 'العربية',
};
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

/**
 * Locales whose translation is approved. Other locales are built for review only: always
 * noindex, absent from the sitemap and never advertised with hreflang or a language link.
 */
export const publicLocales = publishedLocales as readonly Locale[];
export const isPublicLocale = (locale: Locale) => publicLocales.includes(locale);

/** The locale of a page, from the first path segment after the site base. */
export const localeFromPath = (pathname: string, base = '/'): Locale => {
  const local = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const first = local.replace(/^\//, '').split('/')[0] ?? '';
  return isLocale(first) ? first : 'nl';
};
