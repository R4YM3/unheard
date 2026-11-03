import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import test from 'node:test';
import {
  currentTab,
  feelingGroups,
  groupFor,
  isMenuCurrent,
  neighbours,
  sectionFor,
  sections,
} from '../src/lib/navigation.ts';

const sectionOf = (path) => sectionFor(path)?.menu.label;

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

test('the current tab is the most specific match', () => {
  const herstel = sections.find((section) => section.menu.label === 'Herstel');
  assert.equal(currentTab(herstel, 'nl/herstel/rouw/')?.label, 'Herstel');
  assert.equal(currentTab(herstel, 'nl/herstel/therapievormen/emdr/')?.label, 'Therapievormen');
});

test('the main menu marks one entry at a time', () => {
  assert.equal(isMenuCurrent('nl/', 'nl/'), true);
  assert.equal(isMenuCurrent('nl/', 'nl/herstel/'), false);
  assert.equal(isMenuCurrent('nl/mijn-verhaal/', 'nl/werkwijze/'), true);
  assert.equal(isMenuCurrent('nl/hulp-vinden/', 'nl/hulp-vinden/'), true);
});

test('sections have at most four tabs', () => {
  for (const section of sections) assert.ok(section.tabs.length <= 4, section.label);
});

test('every feeling page is in exactly one group', async () => {
  const files = (await readdir('src/content/emotions')).filter((file) => file.endsWith('.md'));
  const grouped = feelingGroups.flatMap((group) => group.pages);
  assert.equal(new Set(grouped).size, grouped.length);
  assert.equal(grouped.length, files.length);
  for (const file of files) {
    const path = `nl/wat-voel-ik/${file.replace(/\.md$/, '')}/`;
    assert.ok(groupFor(feelingGroups, path), `${path} has no group`);
  }
});

test('previous and next stay inside the group', () => {
  const [first] = feelingGroups;
  assert.deepEqual(neighbours(first, first.pages[0]), {
    previous: undefined,
    next: first.pages[1],
  });
  const last = first.pages.at(-1);
  assert.equal(neighbours(first, last).next, undefined);
});
