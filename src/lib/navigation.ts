/**
 * Site navigation as data: the main menu, the section bar under it and the groups that
 * the reading rail and the previous/next links use. One source, so a page can never
 * light up under the wrong section.
 *
 * Paths are locale-relative to the site base, with a trailing slash ("nl/herstel/").
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface Section {
  /** Main-menu entry this section belongs to. */
  menu: NavLink;
  /** Accessible name of the section bar. */
  label: string;
  /** At most four tabs; the same on every page of the section. */
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

export const homeHref = 'nl/';
export const helpHref = 'nl/hulp-vinden/';

export const sections: Section[] = [
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

/** Main menu, in order. "Hulp vinden" is rendered as a button, not a section. */
export const mainMenu: NavLink[] = [
  { href: homeHref, label: 'Home' },
  ...sections.map((section) => section.menu),
  { href: helpHref, label: 'Hulp vinden' },
];

export const feelingGroups: PageGroup[] = [
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

const longestMatch = (path: string, candidates: string[]) =>
  candidates
    .filter((candidate) => path.startsWith(candidate))
    .reduce((best, candidate) => Math.max(best, candidate.length), -1);

/**
 * The section a page belongs to. An exact tab match wins (so a tab can point into another
 * folder), then the longest matching path prefix.
 */
export const sectionFor = (path: string): Section | undefined => {
  const exact = sections.find((section) => section.tabs.some((tab) => tab.href === path));
  if (exact) return exact;
  let best: Section | undefined;
  let bestLength = -1;
  for (const section of sections) {
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
export const isMenuCurrent = (href: string, path: string) => {
  if (href === homeHref) return path === homeHref;
  if (href === helpHref) return path.startsWith(helpHref);
  return sectionFor(path)?.menu.href === href;
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
