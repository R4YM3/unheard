import type { Locale } from '../i18n/config';
import { navigationFor, sectionFor } from './navigation';

/**
 * Every pillar has one colour and one line pattern, the same as its chapter on the homepage.
 * A page's hero takes the colour of the pillar it belongs to, so a reader can tell where they
 * are from the band alone. Pages outside a pillar, and Wat voel ik? (the homepage's own
 * colours), keep the mist hero with its contour lines.
 */
const chapterByMenu: Record<string, string> = {
  'nl/begrijp-het/': 'chapter--understanding',
  'nl/herstel/': 'chapter--recovery',
  'nl/mijn-verhaal/': 'chapter--story',
  'nl/hulpmiddelen/': 'chapter--tools',
};

export const heroPillarClass = (locale: Locale, path: string): string => {
  const nav = navigationFor(locale);
  const section = nav ? sectionFor(nav, path) : undefined;
  return (section && chapterByMenu[section.menu.href]) ?? 'hero--home';
};

/** The pillar's short name, for its band and pattern classes (pillar-band--…). */
export const pillarName = (locale: Locale, path: string): string => {
  const chapter = heroPillarClass(locale, path);
  return chapter === 'hero--home' ? 'recognition' : chapter.replace('chapter--', '');
};

/** The band colour of the pillar, for the lists on its own pages (no pattern there). */
export const pillarBand = (locale: Locale, path: string): string => {
  const chapter = heroPillarClass(locale, path);
  return chapter === 'hero--home'
    ? 'var(--safe)'
    : `var(--${chapter.replace('chapter--', 'chapter-')})`;
};
