export const locales = ['nl','en','ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'nl';
export const localeNames: Record<Locale,string> = {nl:'Nederlands',en:'English',ar:'العربية'};
export const isLocale = (value:string): value is Locale => locales.includes(value as Locale);
