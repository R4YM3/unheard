/**
 * Site-wide facts used in visible bylines and structured data.
 *
 * `founderName` stays null until the founder decides to publish under a name. While it is
 * null, founder texts are attributed to "de oprichter van Ongehoord" and structured data names
 * the organisation as author, so no personal name ends up in search engines.
 */
export const brandName = 'Ongehoord';
export const founderName: string | null = null;
export const shareImage = { path: 'og-image.png', width: 1200, height: 630 };
