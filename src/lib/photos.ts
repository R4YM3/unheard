/**
 * Photo slots. Drop a file named after a slot into src/assets/photos/ (jpg, png, webp or
 * avif) and it appears in that place; Astro resizes and converts it at build time. Without
 * a file the slot shows a decorative landscape in the same frame (see HeroArt.astro).
 *
 * The photos are AI-generated (see src/assets/photos/README.md); the footer says so as soon
 * as one is present. Never put a generated portrait of the founder here.
 */
import type { ImageMetadata } from 'astro';

export type PhotoSlot =
  | 'home'
  | 'mijn-verhaal'
  | 'wat-voel-ik'
  | 'begrijp-het'
  | 'herstel'
  | 'hulpmiddelen'
  | 'hulp-vinden';

const alts: Record<PhotoSlot, string> = {
  home: 'Handen om een mok koffie aan een houten keukentafel, in zacht ochtendlicht.',
  'mijn-verhaal': 'Een man in een donkere jas loopt alleen over een bospad, van achteren gezien.',
  'wat-voel-ik':
    'Een telefoon met het scherm naar beneden op een houten tafel, naast een sleutelbos.',
  'begrijp-het': 'Een opengeslagen notitieboek met een pen op een houten tafel, bij daglicht.',
  hulpmiddelen: 'Een paar handgeschreven kaartjes met vragen op een tafel, naast een kop thee.',
  herstel: 'Een open raam met een linnen gordijn en een kleine plant in ochtendlicht.',
  'hulp-vinden':
    'Twee mensen aan een tafeltje; alleen hun handen en twee koppen thee zijn te zien.',
};

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const bySlot = new Map<string, ImageMetadata>();
for (const [path, module] of Object.entries(files)) {
  const name = path
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '');
  if (name) bySlot.set(name, module.default);
}

/** Pages whose hero has an image slot, by translation key. */
const slotForKey: Partial<Record<string, PhotoSlot>> = {
  'wat-voel-ik': 'wat-voel-ik',
  'begrijp-het': 'begrijp-het',
  herstel: 'herstel',
  hulpmiddelen: 'hulpmiddelen',
  'hulp-vinden': 'hulp-vinden',
};

export const slotFor = (translationKey: string) => slotForKey[translationKey];

export const photoFor = (slot: PhotoSlot) => {
  const src = bySlot.get(slot);
  return src ? { src, alt: alts[slot] } : undefined;
};

export const hasPhotos = bySlot.size > 0;
