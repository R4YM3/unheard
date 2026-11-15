/** Decorative article progress. No storage, tracking or scroll announcements. */
import { readAmount } from '../lib/reading-progress.mjs';

export const enhanceArticleProgress = () => {
  const progress = document.querySelector<HTMLElement>('[data-reading-progress]');
  const start = document.querySelector<HTMLElement>('[data-reading-start]');
  const end = document.querySelector<HTMLElement>('[data-reading-end]');
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!progress || !start || !end || progress.dataset.ready) return;
  progress.dataset.ready = 'true';
  progress.hidden = false;
  let frame = 0;
  const update = () => {
    frame = 0;
    const obstruction = Math.max(0, header?.getBoundingClientRect().bottom ?? 0);
    document.documentElement.style.setProperty('--article-header-height', `${obstruction}px`);
    const articleTop = start.getBoundingClientRect().top + window.scrollY;
    const articleEnd = end.getBoundingClientRect().bottom + window.scrollY;
    const amount = readAmount(
      window.scrollY + obstruction,
      articleTop,
      articleEnd - articleTop,
      Math.max(1, window.innerHeight - obstruction),
    );
    progress.style.top = `${obstruction}px`;
    progress.style.transform = `scaleX(${amount})`;
  };
  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  // Expanded examples, disclosure content and font loading may move the article's end.
  const observer = new ResizeObserver(schedule);
  observer.observe(document.body);
  if (header) observer.observe(header);
};
