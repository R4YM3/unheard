/**
 * Site navigation as data: the main menu, the section bar under it and the groups that
 * the reading rail and the previous/next links use. One source, so a page can never
 * light up under the wrong section.
 *
 * Navigation is defined per locale: each language gets its own paths (slugs may be
 * translated) and labels. A locale without an entry has only a home link until its
 * translation is approved.
 *
 * Paths are relative to the site base, with a trailing slash ("nl/herstel/").
 */
import type { Locale } from '../i18n/config';

export interface NavLink {
  href: string;
  label: string;
}

export interface Section {
  /** Main-menu entry this section belongs to. */
  menu: NavLink;
  /** Accessible name of the section bar. */
  label: string;
  /** At most four parts, shared by desktop dropdowns and the active mobile section. */
  tabs: NavLink[];
  /** Path prefixes that belong to this section (besides the tab paths themselves). */
  prefixes: string[];
}

export interface PageGroup {
  /** Short name shown above the group in the rail and in previous/next links. */
  label: string;
  /** Page paths in reading order. */
  pages: string[];
}

export interface LocaleNavigation {
  home: NavLink;
  help: NavLink;
  sections: Section[];
  feelingGroups: PageGroup[];
  feelingsOverview: string;
  /** Link groups in the footer. */
  footer: Array<{ heading: string; links: NavLink[] }>;
}

const nlSections: Section[] = [
  {
    menu: { href: 'nl/wat-voel-ik/', label: 'Wat voel ik?' },
    label: 'Binnen Wat voel ik?',
    tabs: [
      { href: 'nl/wat-voel-ik/', label: 'Gevoelens' },
      { href: 'nl/hulpmiddelen/help-me-woorden-vinden/', label: 'Help me woorden vinden' },
    ],
    prefixes: ['nl/wat-voel-ik/'],
  },
  {
    menu: { href: 'nl/begrijp-het/', label: 'Begrijp het' },
    label: 'Binnen Begrijp het',
    tabs: [
      { href: 'nl/begrijp-het/emotioneel-misbruik/', label: 'Emotioneel misbruik' },
      { href: 'nl/begrijp-het/financieel-misbruik/', label: 'Financieel misbruik' },
      { href: 'nl/begrippen/', label: 'Begrippen A–Z' },
      { href: 'nl/mannen-in-cijfers/', label: 'In cijfers' },
    ],
    prefixes: ['nl/begrijp-het/', 'nl/begrippen/', 'nl/mannen-in-cijfers/'],
  },
  {
    menu: { href: 'nl/herstel/', label: 'Herstel' },
    label: 'Binnen Herstel',
    tabs: [
      { href: 'nl/herstel/', label: 'Herstel' },
      { href: 'nl/herstel/therapievormen/', label: 'Therapievormen' },
    ],
    prefixes: ['nl/herstel/'],
  },
  {
    menu: { href: 'nl/mijn-verhaal/', label: 'Mijn verhaal' },
    label: 'Binnen Mijn verhaal',
    tabs: [
      { href: 'nl/mijn-verhaal/', label: 'Het verhaal' },
      { href: 'nl/over/', label: 'Waarom Ongehoord' },
      { href: 'nl/werkwijze/', label: 'Werkwijze' },
    ],
    prefixes: ['nl/mijn-verhaal/', 'nl/over/', 'nl/werkwijze/'],
  },
  {
    menu: { href: 'nl/hulpmiddelen/', label: 'Hulpmiddelen' },
    label: 'Binnen Hulpmiddelen',
    tabs: [
      { href: 'nl/hulpmiddelen/', label: 'Vragenkaarten' },
      { href: 'nl/ik-maak-me-zorgen-om-iemand/', label: 'Voor naasten' },
      { href: 'nl/veilig-gebruik/', label: 'Veilig gebruik' },
    ],
    prefixes: ['nl/hulpmiddelen/', 'nl/ik-maak-me-zorgen-om-iemand/', 'nl/veilig-gebruik/'],
  },
];

const nlFeelingGroups: PageGroup[] = [
  {
    label: 'Over jezelf',
    pages: [
      'nl/wat-voel-ik/ik-twijfel-aan-mezelf/',
      'nl/wat-voel-ik/ik-voel-me-schuldig/',
      'nl/wat-voel-ik/ik-herken-mezelf-niet-meer/',
      'nl/wat-voel-ik/ik-zoek-steeds-bevestiging/',
    ],
  },
  {
    label: 'Met de ander',
    pages: [
      'nl/wat-voel-ik/ik-durf-geen-nee-te-zeggen/',
      'nl/wat-voel-ik/ik-durf-niet-over-geld-te-praten/',
      'nl/wat-voel-ik/ik-mis-iemand-die-mij-pijn-heeft-gedaan/',
    ],
  },
  {
    label: 'In je lijf en daarna',
    pages: [
      'nl/wat-voel-ik/ik-sta-voortdurend-aan/',
      'nl/wat-voel-ik/ik-begrijp-het-maar-het-blijft-pijn-doen/',
    ],
  },
];

const byLocale: Partial<Record<Locale, LocaleNavigation>> = {
  nl: {
    home: { href: 'nl/', label: 'Home' },
    help: { href: 'nl/hulp-vinden/', label: 'Hulp vinden' },
    sections: nlSections,
    feelingGroups: nlFeelingGroups,
    feelingsOverview: 'nl/wat-voel-ik/',
    footer: [
      {
        heading: 'Ontdek',
        links: [
          { href: 'nl/wat-voel-ik/', label: 'Wat voel ik?' },
          { href: 'nl/begrijp-het/', label: 'Begrijp het' },
          { href: 'nl/begrippen/', label: 'Begrippen van A tot Z' },
          { href: 'nl/herstel/', label: 'Herstel' },
          { href: 'nl/hulpmiddelen/', label: 'Hulpmiddelen' },
          { href: 'nl/mannen-in-cijfers/', label: 'Mannen in cijfers' },
          { href: 'nl/zoeken/', label: 'Zoeken' },
        ],
      },
      {
        heading: 'Over deze site',
        links: [
          { href: 'nl/over/', label: 'Over Ongehoord' },
          { href: 'nl/werkwijze/', label: 'Werkwijze en bronnen' },
          { href: 'nl/veilig-gebruik/', label: 'Privacy en veilig gebruik' },
          { href: 'nl/toegankelijkheid/', label: 'Toegankelijkheid' },
          { href: 'nl/ik-maak-me-zorgen-om-iemand/', label: 'Voor naasten' },
        ],
      },
    ],
  },
  /* English pilot: only pages that exist in English. Grows with each translated page. */
  en: {
    home: { href: 'en/', label: 'Home' },
    help: { href: 'en/find-help/', label: 'Find help' },
    sections: [
      {
        menu: { href: 'en/what-do-i-feel/', label: 'What do I feel?' },
        label: 'Within What do I feel?',
        tabs: [{ href: 'en/what-do-i-feel/', label: 'Feelings' }],
        prefixes: ['en/what-do-i-feel/'],
      },
      {
        menu: { href: 'en/understand/emotional-abuse/', label: 'Emotional abuse' },
        label: 'Within Understand',
        tabs: [{ href: 'en/understand/emotional-abuse/', label: 'Emotional abuse' }],
        prefixes: ['en/understand/'],
      },
    ],
    feelingGroups: [{ label: 'About yourself', pages: ['en/what-do-i-feel/i-doubt-myself/'] }],
    feelingsOverview: 'en/what-do-i-feel/',
    footer: [
      {
        heading: 'Explore',
        links: [
          { href: 'en/what-do-i-feel/', label: 'What do I feel?' },
          { href: 'en/understand/emotional-abuse/', label: 'Emotional abuse' },
          { href: 'nl/', label: 'Full Dutch edition' },
        ],
      },
      {
        heading: 'About this site',
        links: [{ href: 'en/safe-use/', label: 'Privacy and safe use' }],
      },
    ],
  },
};

export const navigationFor = (locale: Locale): LocaleNavigation | undefined => byLocale[locale];

/** Main menu, in order. The help link is rendered as a button, not as a section. */
export const mainMenu = (nav: LocaleNavigation): NavLink[] => [
  nav.home,
  ...nav.sections.map((section) => section.menu),
  nav.help,
];

const longestMatch = (path: string, candidates: string[]) =>
  candidates
    .filter((candidate) => path.startsWith(candidate))
    .reduce((best, candidate) => Math.max(best, candidate.length), -1);

/**
 * The section a page belongs to. An exact tab match wins (so a tab can point into another
 * folder), then the longest matching path prefix.
 */
export const sectionFor = (nav: LocaleNavigation, path: string): Section | undefined => {
  const exact = nav.sections.find((section) => section.tabs.some((tab) => tab.href === path));
  if (exact) return exact;
  let best: Section | undefined;
  let bestLength = -1;
  for (const section of nav.sections) {
    const length = longestMatch(path, section.prefixes);
    if (length > bestLength) {
      best = section;
      bestLength = length;
    }
  }
  return bestLength >= 0 ? best : undefined;
};

/** The tab that is current on a page: an exact match, else the longest prefix match. */
export const currentTab = (section: Section, path: string): NavLink | undefined => {
  const exact = section.tabs.find((tab) => tab.href === path);
  if (exact) return exact;
  let best: NavLink | undefined;
  let bestLength = -1;
  for (const tab of section.tabs) {
    if (path.startsWith(tab.href) && tab.href.length > bestLength) {
      best = tab;
      bestLength = tab.href.length;
    }
  }
  return best;
};

/** Whether a main-menu entry is current for a page. */
export const isMenuCurrent = (nav: LocaleNavigation, href: string, path: string) => {
  if (href === nav.home.href) return path === nav.home.href;
  if (href === nav.help.href) return path.startsWith(nav.help.href);
  return sectionFor(nav, path)?.menu.href === href;
};

export const groupFor = (groups: PageGroup[], path: string) =>
  groups.find((group) => group.pages.includes(path));

/** Previous and next page within the same group, in reading order. */
export const neighbours = (group: PageGroup, path: string) => {
  const index = group.pages.indexOf(path);
  return {
    previous: index > 0 ? group.pages[index - 1] : undefined,
    next: index >= 0 && index < group.pages.length - 1 ? group.pages[index + 1] : undefined,
  };
};
