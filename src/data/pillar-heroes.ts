/**
 * Content for the pillar heroes. Every item points to a published page by translation key, so
 * the build fails when a page is renamed or unpublished. Texts are taken from those pages (a
 * page title, or a sentence from its body); nothing here is new copy.
 */

/** Wat voel ik?: a word to touch, the sentence it opens and the page behind it. */
export const feelingWords: Array<{ word: string; sentence: string; key: string }> = [
  { word: 'twijfel', sentence: 'Ik twijfel steeds aan mezelf.', key: 'zelftwijfel' },
  { word: 'schuld', sentence: 'Ik voel me verantwoordelijk voor alles.', key: 'schuldgevoel' },
  { word: 'mezelf kwijt', sentence: 'Ik herken mezelf niet meer.', key: 'identiteit' },
  { word: 'pijn', sentence: 'Ik begrijp het, maar het blijft pijn doen.', key: 'pijn-na-inzicht' },
  { word: 'nee zeggen', sentence: 'Ik durf geen nee te zeggen.', key: 'grenzen' },
  { word: 'geld', sentence: 'Ik durf niet over geld te praten.', key: 'geld-praten' },
  { word: 'op mijn hoede', sentence: 'Ik sta voortdurend aan.', key: 'spanning' },
  { word: 'gemis', sentence: 'Ik mis iemand die mij pijn heeft gedaan.', key: 'gemis' },
  { word: 'bevestiging', sentence: 'Ik zoek steeds bevestiging.', key: 'bevestiging' },
  { word: 'uitgeput', sentence: 'Als je niets meer over hebt.', key: 'emotionele-uitputting' },
  { word: 'pleasen', sentence: 'Pleasen om veilig te blijven.', key: 'fawn-respons' },
  {
    word: 'de sfeer aftasten',
    sentence: 'Als je voortdurend de sfeer aftast.',
    key: 'hyperwaakzaamheid',
  },
  { word: 'alleen', sentence: 'Als je wereld steeds kleiner wordt.', key: 'isolatie' },
  {
    word: 'niet los kunnen',
    sentence: 'Waarom loskomen zo moeilijk kan zijn.',
    key: 'traumabinding',
  },
];

/** Begrijp het: which homepage examples the cross-section shows (index in home `scenarios`). */
export const layeredMoments = [0, 2, 5];

/** Herstel: one topic per step of the line, with a sentence from that topic's own article. */
export const recoverySteps: Array<{ name: string; quote: string; key: string }> = [
  {
    name: 'Erkenning',
    quote: 'Het gaat om: dit is wat ik heb meegemaakt, en dit is wat het met mij deed.',
    key: 'herstel-erkenning',
  },
  {
    name: 'Rouw',
    quote: 'Opluchting en verdriet kunnen naast elkaar bestaan.',
    key: 'herstel-rouw',
  },
  {
    name: 'Grenzen leren stellen',
    quote: 'Een grens begint meestal niet bij woorden, maar bij een signaal.',
    key: 'herstel-grenzen',
  },
  { name: 'Leren voelen', quote: 'Er is geen goed of fout gevoel.', key: 'herstel-leren-voelen' },
  {
    name: 'Zelfvertrouwen',
    quote: 'Je merkt iets op, het blijkt te kloppen, en dat zie je ook. Keer op keer.',
    key: 'herstel-zelfvertrouwen',
  },
];

/** Hulpmiddelen: the cards in the fan, in this order. */
export const fanCards = [
  'kaart-zelfreflectie',
  'kaart-partnergesprek',
  'kaart-hulpverlener',
  'kaart-naaste',
  'kaart-financieel',
  'kaart-pijn-na-inzicht',
];
