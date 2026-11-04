/**
 * Reading position for the side rail. Pure functions: no DOM, no storage.
 * `read` is 0 at the start of the article and 1 when the end reaches the viewport.
 * The active section is the last heading that has passed the reading line.
 */

const clamp = (value) => Math.min(1, Math.max(0, value));

export const readAmount = (scrollY, articleTop, articleHeight, viewHeight) => {
  const distance = articleHeight - viewHeight;
  if (distance <= 0) return scrollY + viewHeight >= articleTop + articleHeight ? 1 : 0;
  return clamp((scrollY - articleTop) / distance);
};

/**
 * @param {{ id: string, top: number }[]} sections document positions, any order
 * @param {number} line the reading line, in the same coordinates as `top`
 */
export const activeSection = (sections, line) => {
  const ordered = [...sections].sort((a, b) => a.top - b.top);
  let current = ordered[0]?.id;
  for (const section of ordered) if (section.top <= line) current = section.id;
  return current;
};

/**
 * Position among the chapters, as a number from 0 to the number of chapters: the integer part
 * is the chapter whose heading last passed the reading line, the fraction is how far the line
 * is towards the next heading (or towards `end` after the last one).
 * @param {number[]} tops chapter heading positions, in document order
 * @param {number} end where the last chapter ends
 * @param {number} line the reading line
 */
export const chapterProgress = (tops, end, line) => {
  if (tops.length === 0 || line < tops[0]) return 0;
  const bounds = [...tops, Math.max(end, tops.at(-1))];
  for (let index = 0; index < tops.length; index += 1) {
    const start = bounds[index];
    const stop = bounds[index + 1];
    if (line < stop) return index + (stop > start ? (line - start) / (stop - start) : 0);
  }
  return tops.length;
};
