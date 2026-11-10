export type InlinePart = { text: string; href?: string };

/** Only explicit, base-relative content links; everything else stays plain text. */
export const inlineParts = (text: string): InlinePart[] => {
  const parts: InlinePart[] = [];
  const links =
    /\[([^\]\n[]+)\]\(((?:nl|en|ar)\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*(?:#[a-z0-9-]+)?)\)/g;
  let offset = 0;
  for (const match of text.matchAll(links)) {
    if (match.index > offset) parts.push({ text: text.slice(offset, match.index) });
    parts.push({ text: match[1], href: match[2] });
    offset = match.index + match[0].length;
  }
  if (offset < text.length) parts.push({ text: text.slice(offset) });
  return parts;
};
