/** Optional native contents for long articles; no lists of sibling pages. */
import type { MarkdownHeading } from 'astro';
import { ui } from '../i18n/ui';
import { routeFor, type RoutedEntry } from './content';

interface ContentsItem {
  href: string;
  label: string;
}
interface ContentsGroup {
  label: string;
  items: ContentsItem[];
}

const MIN_CHAPTERS = 3;

export const articleContentsGroups = (
  entry: RoutedEntry,
  headings: MarkdownHeading[],
): ContentsGroup[] => {
  const t = ui(entry.data.locale);
  const route = routeFor(entry);
  const groups: ContentsGroup[] = [];

  const chapters = headings.filter((heading) => heading.depth === 2);
  if (chapters.length >= MIN_CHAPTERS)
    groups.push({
      label: t.onThisPage,
      items: chapters.map((heading) => ({ href: `${route}#${heading.slug}`, label: heading.text })),
    });

  return groups;
};
