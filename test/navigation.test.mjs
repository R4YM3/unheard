import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  currentTab,
  groupFor,
  isMenuCurrent,
  mainMenu,
  navigationFor,
  neighbours,
  sectionFor,
} from '../src/lib/navigation.ts';
import { heroTrail } from '../src/lib/trail.ts';

const nav = navigationFor('nl');
const sectionOf = (path) => sectionFor(nav, path)?.menu.label;

test('every page lights up under the section it belongs to', () => {
  assert.equal(sectionOf('nl/wat-voel-ik/ik-twijfel-aan-mezelf/'), 'Wat voel ik?');
  assert.equal(sectionOf('nl/hulpmiddelen/help-me-woorden-vinden/'), 'Wat voel ik?');
  assert.equal(sectionOf('nl/begrippen/darvo/'), 'Begrijp het');
  assert.equal(sectionOf('nl/begrijp-het/financieel-misbruik/signalen/'), 'Begrijp het');
  assert.equal(sectionOf('nl/mannen-in-cijfers/'), 'Begrijp het');
  assert.equal(sectionOf('nl/herstel/therapievormen/emdr/'), 'Herstel');
  assert.equal(sectionOf('nl/over/'), 'Mijn verhaal');
  // Tool pages used to show "Binnen Herstel".
  assert.equal(sectionOf('nl/hulpmiddelen/wat-voel-ik-en-wat-heb-ik-nodig/'), 'Hulpmiddelen');
  assert.equal(sectionOf('nl/veilig-gebruik/'), 'Hulpmiddelen');
  assert.equal(sectionOf('nl/'), undefined);
  assert.equal(sectionOf('nl/hulp-vinden/'), undefined);
});

test('the current part of a section is the most specific match', () => {
  const herstel = nav.sections.find((section) => section.menu.label === 'Herstel');
  assert.equal(currentTab(herstel, 'nl/herstel/rouw/')?.label, 'Herstel');
  assert.equal(currentTab(herstel, 'nl/herstel/therapievormen/emdr/')?.label, 'Therapievormen');
});

test('the main menu marks one entry at a time', () => {
  const menu = mainMenu(nav).map((link) => link.href);
  const current = (path) => menu.filter((href) => isMenuCurrent(nav, href, path));
  assert.deepEqual(current('nl/'), ['nl/']);
  assert.deepEqual(current('nl/werkwijze/'), ['nl/mijn-verhaal/']);
  assert.deepEqual(current('nl/hulp-vinden/'), ['nl/hulp-vinden/']);
  assert.deepEqual(current('nl/herstel/therapievormen/emdr/'), ['nl/herstel/']);
});

test('sections have at most four parts', () => {
  for (const section of nav.sections) assert.ok(section.tabs.length <= 4, section.label);
});

test('the English pilot menu links only to pages that exist in English', async () => {
  const en = navigationFor('en');
  assert.ok(en);
  const slugs = new Set(['en/']);
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) await walk(path);
      else if (/\.mdx?$/.test(entry.name)) {
        const text = await readFile(path, 'utf8');
        if (/^locale: en$/m.test(text) && /^published: true$/m.test(text))
          slugs.add(`en/${text.match(/^slug: '?([^'\n]+)'?$/m)[1]}/`);
      }
    }
  };
  await walk('src/content');
  const hrefs = [
    ...mainMenu(en).map((link) => link.href),
    ...en.sections.flatMap((section) => section.tabs.map((tab) => tab.href)),
    ...en.feelingGroups.flatMap((group) => group.pages),
    ...en.footer.flatMap((group) => group.links.map((link) => link.href)),
  ].filter((href) => href.startsWith('en/'));
  for (const href of hrefs.map((href) => href.replace('en/home/', 'en/')))
    assert.ok(slugs.has(href), `${href} is not a published English page`);
  assert.equal(navigationFor('ar'), undefined);
});

test('every feeling page is in exactly one group', async () => {
  const files = (await readdir('src/content/emotions')).filter((file) => file.endsWith('.md'));
  const grouped = nav.feelingGroups.flatMap((group) => group.pages);
  assert.equal(new Set(grouped).size, grouped.length);
  assert.equal(grouped.length, files.length);
  for (const file of files) {
    const path = `nl/wat-voel-ik/${file.replace(/\.md$/, '')}/`;
    assert.ok(groupFor(nav.feelingGroups, path), `${path} has no group`);
  }
});

test('previous and next stay inside the group', () => {
  const [first] = nav.feelingGroups;
  assert.deepEqual(neighbours(first, first.pages[0]), {
    previous: undefined,
    next: first.pages[1],
  });
  assert.equal(neighbours(first, first.pages.at(-1)).next, undefined);
});

const crumbs = [
  { href: 'nl/', label: 'Home' },
  { href: 'nl/herstel/', label: 'Herstel' },
  { href: 'nl/herstel/therapievormen/', label: 'Therapievormen' },
  { href: 'nl/herstel/therapievormen/emdr/', label: 'EMDR' },
];

test('the trail shows only the pages between home and the title', () => {
  const trail = heroTrail(crumbs, 'Herstel / Therapievormen / EMDR', ['Herstel']);
  assert.deepEqual(
    trail.ancestors.map((crumb) => crumb.label),
    ['Herstel', 'Therapievormen'],
  );
  assert.equal(trail.current?.label, 'EMDR');
  assert.equal(trail.eyebrow, undefined);
});

test('an eyebrow survives only when it adds something', () => {
  const top = crumbs.slice(0, 2);
  assert.equal(heroTrail(top, 'Herstel', ['Herstel']).eyebrow, undefined);
  assert.equal(heroTrail(top, 'Mijn verhaal / Ongehoord', []).eyebrow, undefined);
  assert.equal(heroTrail(top, 'Waarom Ongehoord bestaat', []).eyebrow, 'Waarom Ongehoord bestaat');
  assert.equal(heroTrail(crumbs, 'Waarom Ongehoord bestaat', []).eyebrow, undefined);
});
