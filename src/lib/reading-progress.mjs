/**
 * Reading position within the article. Pure functions: no DOM, no storage.
 * `read` is 0 at the start of the article and 1 when the end reaches the viewport.
 */

const clamp = (value) => Math.min(1, Math.max(0, value));

export const readAmount = (scrollY, articleTop, articleHeight, viewHeight) => {
  const distance = articleHeight - viewHeight;
  if (distance <= 0) return scrollY + viewHeight >= articleTop + articleHeight ? 1 : 0;
  return clamp((scrollY - articleTop) / distance);
};
