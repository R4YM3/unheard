/**
 * One line of wayfinding above a page title. The main menu already says which section a
 * page is in and the title names the page itself, so the visible trail shows only the
 * pages in between. Home is the logo. The full trail stays in BreadcrumbList data and for
 * screen readers.
 *
 * An eyebrow is kept only when it adds something: not when it repeats the trail as a
 * path ("Herstel / Therapievormen / EMDR"), not when it repeats a crumb or the menu, and
 * not when there is a trail to show.
 */
export interface Crumb {
  href: string;
  label: string;
}

const normalise = (text: string) => text.trim().toLocaleLowerCase();

export const heroTrail = (crumbs: Crumb[], eyebrow?: string, menuLabels: string[] = []) => {
  const ancestors = crumbs.slice(1, -1);
  const current = crumbs.length > 1 ? crumbs.at(-1) : undefined;
  const known = new Set(
    [...crumbs, ...menuLabels.map((label) => ({ label }))].map((item) => normalise(item.label)),
  );
  const keepEyebrow =
    Boolean(eyebrow?.trim()) &&
    ancestors.length === 0 &&
    !/\s[/·|›>]\s/.test(eyebrow ?? '') &&
    !known.has(normalise(eyebrow ?? ''));
  return { ancestors, current, eyebrow: keepEyebrow ? eyebrow : undefined };
};
