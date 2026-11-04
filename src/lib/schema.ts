/** JSON-LD nodes that repeat text and links already visible on the page. */

export type SchemaNode = Record<string, unknown>;

export interface ListedLink {
  href?: string;
  title: string;
  text?: string;
}

export const itemList = (
  id: string,
  name: string,
  items: ListedLink[],
  pageId: string,
  url: (path: string) => string,
): SchemaNode | undefined => {
  const listed = items.filter((item) => item.title);
  if (listed.length === 0) return undefined;
  return {
    '@type': 'ItemList',
    '@id': id,
    name,
    numberOfItems: listed.length,
    isPartOf: { '@id': pageId },
    itemListElement: listed.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      ...(item.text ? { description: item.text } : {}),
      ...(item.href ? { url: url(item.href) } : {}),
    })),
  };
};
