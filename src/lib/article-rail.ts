/**
 * The reading rail for article pages: this page's chapters, then the other pages in the same
 * folder (the same parent page), so a reader can move on without going back to the overview.
 * Section overviews (hubs) do not get a rail: their cards already are the list.
 */
import type { MarkdownHeading } from 'astro';
import { ui } from '../i18n/ui';
import { byOrder, getPublishedEntries, routeFor, type RoutedEntry } from './content';

interface RailItem {
  href: string;
  label: string;
  current?: boolean;
}
interface RailGroup {
  label: string;
  items: RailItem[];
  closed?: boolean;
}

const MIN_CHAPTERS = 3;
const OPEN_SIBLINGS = 10;

export const articleRailGroups = async (
  entry: RoutedEntry,
  headings: MarkdownHeading[],
): Promise<RailGroup[]> => {
  const t = ui(entry.data.locale);
  const route = routeFor(entry);
  const groups: RailGroup[] = [];

  const chapters = headings.filter((heading) => heading.depth === 2);
  if (chapters.length >= MIN_CHAPTERS)
    groups.push({
      label: t.onThisPage,
      items: chapters.map((heading) => ({ href: `${route}#${heading.slug}`, label: heading.text })),
    });

  const segments = entry.data.slug.split('/');
  if (segments.length > 1) {
    const parentSlug = segments.slice(0, -1).join('/');
    const published = await getPublishedEntries();
    const parent = published.find(
      (candidate) =>
        candidate.data.locale === entry.data.locale && candidate.data.slug === parentSlug,
    );
    const siblings = published
      .filter(
        (candidate) =>
          candidate.data.locale === entry.data.locale &&
          candidate.data.slug.startsWith(`${parentSlug}/`) &&
          !candidate.data.slug.slice(parentSlug.length + 1).includes('/'),
      )
      .sort(byOrder);
    if (parent && siblings.length > 1)
      groups.push({
        label: parent.data.cardTitle ?? parent.data.title,
        closed: siblings.length > OPEN_SIBLINGS,
        items: [
          ...siblings.map((sibling) => ({
            href: routeFor(sibling),
            label: sibling.data.cardTitle ?? sibling.data.title,
            current: sibling === entry,
          })),
          { href: routeFor(parent), label: t.overview },
        ],
      });
  }
  return groups;
};
