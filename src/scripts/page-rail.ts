/**
 * Marks the section in view and fills the reading line. Nothing is stored or sent.
 * Without JavaScript the rail stays a list of links.
 */
import { activeSection, readAmount } from '../lib/page-rail.mjs';

export const enhancePageRail = () => {
  const rail = document.querySelector<HTMLElement>('.page-rail');
  const article = document.querySelector<HTMLElement>('.article-layout__main');
  if (!rail || !article || rail.dataset.read === 'on') return;
  const links = [...rail.querySelectorAll<HTMLAnchorElement>('nav a[href*="#"]')].flatMap(
    (link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      return target ? [{ link, id, target }] : [];
    },
  );
  if (links.length === 0) return;
  rail.dataset.read = 'on';

  let frame = 0;
  const update = () => {
    frame = 0;
    const amount = readAmount(
      window.scrollY,
      article.getBoundingClientRect().top + window.scrollY,
      article.offsetHeight,
      window.innerHeight,
    );
    rail.style.setProperty('--read', amount.toFixed(4));
    const line = window.scrollY + Math.min(160, window.innerHeight * 0.28);
    const current = activeSection(
      links.map(({ id, target }) => ({
        id,
        top: target.getBoundingClientRect().top + window.scrollY,
      })),
      amount > 0.98 ? Number.POSITIVE_INFINITY : line,
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
