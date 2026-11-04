/**
 * Founder-review markers. In the published view every paragraph or list item that still
 * carries "[OPRICHTER REVIEW NODIG]" is flagged `needs-review` and hidden by CSS, so visitors
 * never read placeholder text. Adding ?review to a URL shows them again, highlighted.
 * Script blocks are left untouched.
 */
export const REVIEW_MARKER = '[OPRICHTER REVIEW NODIG]';

const escapedMarker = REVIEW_MARKER.replace(/[[\]]/g, '\\$&');
const bareMarker = new RegExp(`(?<!<mark class="review-marker">)${escapedMarker}`, 'g');
const flaggedBlock =
  /<(p|li)(\s[^>]*)?>((?:(?!<\/?(?:p|li)[\s>])[\s\S])*?review-marker[\s\S]*?)<\/\1>/g;

const addClass = (attributes = '') =>
  /\sclass="/.test(attributes)
    ? attributes.replace(/\sclass="/, ' class="needs-review ')
    : `${attributes} class="needs-review"`;

export const markReview = (html: string) => {
  if (!html.includes(REVIEW_MARKER)) return html;
  return html
    .split(/(<script[\s\S]*?<\/script>)/)
    .map((part) =>
      part.startsWith('<script')
        ? part
        : part
            .replace(bareMarker, `<mark class="review-marker">${REVIEW_MARKER}</mark>`)
            .replace(
              flaggedBlock,
              (_match, tag: string, attributes: string | undefined, inner: string) =>
                `<${tag}${addClass(attributes)}>${inner}</${tag}>`,
            ),
    )
    .join('');
};
