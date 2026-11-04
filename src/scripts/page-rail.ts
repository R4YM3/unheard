/**
 * Marks the chapter being read and moves the reading line along the chapter links, so the
 * line always sits at the chapter in view. Nothing is stored or sent. Without JavaScript the
 * rail stays a list of links.
 */
import { activeSection, chapterProgress } from '../lib/page-rail.mjs';

export const enhancePageRail = () => {
  const rail = document.querySelector<HTMLElement>('.page-rail');
  const progress = rail?.querySelector<HTMLElement>('.read-progress');
  if (!rail || rail.dataset.read === 'on') return;
  const links = [...rail.querySelectorAll<HTMLAnchorElement>('nav a[href*="#"]')].flatMap(
    (link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      return target ? [{ link, id, target }] : [];
    },
  );
  if (links.length === 0) return;
  rail.dataset.read = 'on';
  // The chapters end where the text ends: the block that holds the last chapter heading.
  const text = links.at(-1)?.target.closest<HTMLElement>('.prose') ?? null;

  let frame = 0;
  const update = () => {
    frame = 0;
    const top = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
    const tops = links.map(({ target }) => top(target));
    const end = text ? top(text) + text.offsetHeight : tops.at(-1)!;
    const line = window.scrollY + window.innerHeight * 0.35;
    const atEnd = window.scrollY + window.innerHeight >= end;
    const position = atEnd ? links.length : chapterProgress(tops, end, line);
    rail.style.setProperty('--read', (position / links.length).toFixed(4));

    // Desktop: draw the line from the first chapter link down to the current point.
    if (progress && getComputedStyle(progress).position === 'absolute') {
      const railTop = rail.getBoundingClientRect().top;
      const linkTop = (index: number) => {
        const box = links[Math.min(index, links.length - 1)].link.getBoundingClientRect();
        return index >= links.length ? box.bottom - railTop : box.top - railTop;
      };
      const index = Math.floor(position);
      const from = linkTop(0);
      const at = linkTop(index) + (linkTop(index + 1) - linkTop(index)) * (position - index);
      progress.style.top = `${from + rail.scrollTop}px`;
      progress.style.height = `${Math.max(0, at - from)}px`;
    } else if (progress) {
      progress.style.removeProperty('top');
      progress.style.removeProperty('height');
    }

    const current = activeSection(
      links.map(({ id }, index) => ({ id, top: tops[index] })),
      atEnd ? Number.POSITIVE_INFINITY : line,
    );
    for (const { link, id } of links) {
      if (id === current) link.setAttribute('aria-current', 'location');
      else if (link.getAttribute('aria-current') === 'location')
        link.removeAttribute('aria-current');
    }
  };
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
};
