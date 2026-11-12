/** Browser regression checks for desktop dropdowns, slow font loading and home entry points. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const origin = 'http://127.0.0.1:4335';
const server = spawn(
  'python3',
  ['-m', 'http.server', '4335', '--bind', '127.0.0.1', '--directory', process.argv[2] ?? 'dist'],
  { stdio: 'ignore' },
);
const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome');
let browser;
try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(`${origin}/nl/`)).ok) break;
    } catch {
      /* Server is still starting. */
    }
    await delay(150);
  }
  browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage();
  for (const width of [961, 1024, 1120, 1280, 1440]) {
    await page.setViewport({ width, height: 1000 });
    await page.goto(`${origin}/nl/mijn-verhaal/`, { waitUntil: 'networkidle0' });
    const items = await page.$$('.desktop-nav-item');
    assert.equal(items.length, 5, 'Every main section needs its own desktop submenu');
    const rows = await page.$$eval('.nav > *', (nodes) =>
      nodes
        .filter((node) => node.getBoundingClientRect().height > 0)
        .map((node) => node.getBoundingClientRect().y),
    );
    assert(Math.max(...rows) - Math.min(...rows) < 2, `Header wraps at ${width}px`);
    const mainTop = await page.$eval('main', (node) => node.getBoundingClientRect().y);
    for (const item of items) {
      await item.hover();
      assert(await item.$eval('details', (node) => node.open), 'Hover must open the submenu');
      const link = await item.$('ul a');
      await link.hover();
      assert(
        await item.$eval('details', (node) => node.open),
        'Moving into the submenu must keep it open',
      );
      const bounds = await item.$eval('ul', (node) => ({
        left: node.getBoundingClientRect().left,
        right: node.getBoundingClientRect().right,
      }));
      assert(bounds.left >= 0 && bounds.right <= width, `Submenu overflows at ${width}px`);
      assert.equal(
        await page.$eval('main', (node) => node.getBoundingClientRect().y),
        mainTop,
        'Opening a submenu must not move the page',
      );
      await page.mouse.move(10, 400);
      assert.equal(
        await item.$eval('details', (node) => node.open),
        false,
        'Hover menu must close when the pointer leaves',
      );
    }
  }
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${origin}/nl/begrippen/gaslighting/`, { waitUntil: 'networkidle0' });
  const summary = await page.$('.desktop-nav-item:nth-of-type(2) summary');
  assert(summary);
  await summary.focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(
    await page.evaluate(() => globalThis.document.activeElement?.textContent.trim()),
    'Emotioneel misbruik',
  );
  await page.keyboard.press('Tab');
  assert.equal(
    await page.evaluate(() => globalThis.document.activeElement?.textContent.trim()),
    'Financieel misbruik',
  );
  await page.keyboard.press('Escape');
  assert.equal(
    new URL(page.url()).pathname,
    '/nl/begrippen/gaslighting/',
    'First Escape closes the menu without leaving the site',
  );
  assert.equal(await page.$$eval('.desktop-subnav[open]', (nodes) => nodes.length), 0);
  assert(
    await summary.evaluate((node) => node === globalThis.document.activeElement),
    'Focus returns to the disclosure',
  );
  await page.setRequestInterception(true);
  page.on('request', (request) =>
    request.url().startsWith('https://www.knmi.nl')
      ? request.respond({ status: 200, body: '<title>Exit target</title>' })
      : request.continue(),
  );
  /* Escape never leaves: repeated presses keep the page and the scroll position. */
  await page.evaluate(() => globalThis.scrollTo({ top: 400, behavior: 'instant' }));
  for (let press = 0; press < 3; press += 1) await page.keyboard.press('Escape');
  await delay(200);
  assert(page.url().endsWith('/nl/begrippen/gaslighting/'), 'Repeated Escape must not leave');
  assert.equal(
    await page.evaluate(() => Math.round(globalThis.scrollY)),
    400,
    'Repeated Escape keeps the position',
  );
  /* The explicit exit is a native link: Enter follows it. */
  await page.focus('.safety-dock [data-safe-exit]');
  await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
  assert.equal(new URL(page.url()).hostname, 'www.knmi.nl', 'Verlaat site leaves with Enter');
  await page.close();

  /* Search keeps what was typed when Escape is pressed. */
  const search = await browser.newPage();
  await search.goto(`${origin}/nl/zoeken/`, { waitUntil: 'networkidle0' });
  await search.type('input[type=search]', 'woorden');
  for (let press = 0; press < 3; press += 1) await search.keyboard.press('Escape');
  assert.equal(await search.$eval('input[type=search]', (node) => node.value), 'woorden');
  await search.close();

  /* Without JavaScript, Verlaat site is still a working link to the neutral page. */
  const plain = await browser.newPage();
  await plain.setJavaScriptEnabled(false);
  await plain.setRequestInterception(true);
  plain.on('request', (request) =>
    request.url().startsWith('https://www.knmi.nl')
      ? request.respond({ status: 200, body: '<title>Exit target</title>' })
      : request.continue(),
  );
  await plain.goto(`${origin}/nl/`, { waitUntil: 'networkidle0' });
  await Promise.all([plain.waitForNavigation(), plain.click('.safety-dock [data-safe-exit]')]);
  assert.equal(new URL(plain.url()).hostname, 'www.knmi.nl', 'Verlaat site works without JS');
  await plain.close();
  console.log(
    'Desktop: hover, pointer transfer, keyboard, dismissal, Escape stays, explicit exit (Enter, no JS), search keeps input.',
  );

  for (const javascript of [true, false]) {
    const mobile = await browser.newPage();
    await mobile.setJavaScriptEnabled(javascript);
    await mobile.setViewport({ width: 375, height: 850 });
    await mobile.goto(`${origin}/nl/mijn-verhaal/`, { waitUntil: 'networkidle0' });
    await mobile.click('.mobile-menu > summary');
    assert.deepEqual(
      await mobile.$$eval('.mobile-menu__sub', (nodes) =>
        nodes.map((node) => node.textContent.trim()),
      ),
      /* 'Het verhaal' is the section link itself: one link per destination. */
      ['Waarom Ongehoord', 'Werkwijze'],
    );
    await mobile.goto(`${origin}/nl/`, { waitUntil: 'networkidle0' });
    assert.equal(
      await mobile.$eval('.home-hero__copy .button', (node) => node.getAttribute('href')),
      'nl/hulpmiddelen/help-me-woorden-vinden/',
    );
    assert(await mobile.$('.word-finder-invite a[href="nl/hulpmiddelen/help-me-woorden-vinden/"]'));
    const visibleHeroConversation = await mobile.waitForSelector(
      '[data-conversation-frame]:not([hidden])',
      { visible: true },
    );
    assert(visibleHeroConversation, 'The home conversation is visible on mobile');
    const exampleSelector = '#perspectief-scene-2';
    const countVisibleExamples = () =>
      mobile.$$eval(
        exampleSelector,
        (nodes) => nodes.filter((node) => node.getBoundingClientRect().width > 0).length,
      );
    assert.equal(await countVisibleExamples(), 1);
    if (javascript) {
      await mobile.emulateMediaType('print');
      assert.equal(await countVisibleExamples(), 1, 'All homepage examples must print');
    } else {
      await mobile.setViewport({ width: 1440, height: 1000 });
      await mobile.click('.desktop-nav-item summary');
      assert(
        await mobile.$eval('.desktop-subnav', (node) => node.open),
        'Desktop submenu still works as a native disclosure without JavaScript',
      );
    }
    await mobile.close();
  }
  console.log(
    'Mobile: original active-section links, prominent finder entry, all examples visible, no-JS and print content.',
  );

  /* Home hero: introduction and the two actions only; destinations stay reachable. */
  const home = await browser.newPage();
  await home.setViewport({ width: 1280, height: 900 });
  await home.goto(`${origin}/nl/`, { waitUntil: 'networkidle0' });
  assert.equal(await home.$('.hero-entries'), null, 'Hero has no separate entry row');
  assert.equal(await home.$$eval('.home-hero__copy .actions a', (nodes) => nodes.length), 2);
  for (const target of ['#gevoelens', '#perspectief']) {
    assert(await home.$(target), `Home section ${target} exists`);
  }
  assert(await home.$('.nav a[href="nl/begrijp-het/"]'), 'Begrijp het stays in the navigation');
  assert(await home.$('#verhaal a[href="nl/over/#waarom-ik-hiermee-begon"]'));
  assert(await home.$('#hulp a[href="nl/hulp-vinden/"]'));
  const homeOrder = await home.$$eval('main [id]', (nodes) =>
    nodes
      .map((node) => node.id)
      .filter((id) =>
        [
          'gevoelens',
          'gedachte',
          'beginnen',
          'verhaal-citaat',
          'perspectief-scene-2',
          'word-finder-invite-heading',
          'verhaal',
          'herstel',
        ].includes(id),
      ),
  );
  assert.deepEqual(homeOrder, [
    'gevoelens',
    'gedachte',
    'beginnen',
    'verhaal-citaat',
    'perspectief-scene-2',
    'word-finder-invite-heading',
    'verhaal',
    'herstel',
  ]);
  await home.setJavaScriptEnabled(false);
  await home.reload();
  const options = await home.$$('#beginnen details');
  const labels = [
    'Ik twijfel nog',
    'Ik zit er nog middenin',
    'De relatie is voorbij',
    'Ik maak me zorgen om iemand',
  ];
  for (const [index, label] of labels.entries()) {
    const option = options[index];
    assert(option, `Missing starting route: ${label}`);
    const summary = await option.$('summary');
    assert(summary);
    assert.equal(await summary.evaluate((node) => node.textContent.trim()), label);
    await summary.focus();
    await home.keyboard.press('Enter');
    assert(await option.evaluate((node) => node.open), `Enter opens ${label}`);
    assert(await option.$('a[href="nl/hulp-vinden/"]'), `Advice is available from ${label}`);
  }
  await home.close();

  /* Link hierarchy: inline links underlined; stand-alone, navigation and cards are not. */
  const links = await browser.newPage();
  await links.setViewport({ width: 1280, height: 900 });
  const underline = (selector) =>
    links.$$eval(selector, (nodes) =>
      nodes
        .filter((node) => node.getClientRects().length)
        .map((node) => globalThis.getComputedStyle(node).textDecorationLine.includes('underline')),
    );
  await links.goto(`${origin}/nl/begrijp-het/conflict-of-patroon/`, { waitUntil: 'networkidle0' });
  const prose = await underline('.prose p a');
  assert(prose.length > 0 && prose.every(Boolean), 'Links in running text are underlined');
  for (const selector of ['.footer-grid nav a', '.breadcrumbs a', 'a.card', '.nav > a']) {
    assert(
      (await underline(selector)).every((value) => !value),
      `${selector} has no underline`,
    );
  }
  await links.goto(`${origin}/nl/wat-voel-ik/ik-twijfel-aan-mezelf/`, {
    waitUntil: 'networkidle0',
  });
  const standalone = await links.$$eval('a.text-link', (nodes) =>
    nodes
      .filter((node) => node.getClientRects().length)
      .map((node) => ({
        line: globalThis.getComputedStyle(node).textDecorationLine,
        arrow: globalThis.getComputedStyle(node, '::after').content,
      })),
  );
  assert(standalone.length > 0, 'Feeling page has a stand-alone link');
  for (const link of standalone) {
    assert(!link.line.includes('underline'), 'Stand-alone link has no permanent underline');
    assert(link.arrow.includes('→'), 'Stand-alone link shows an arrow');
  }
  await links.close();
  console.log(
    'Home hero without entry row; link hierarchy for inline, stand-alone, navigation and cards.',
  );

  /* Variant A on feeling pages: direct pressed buttons, focus stays, short status, no select. */
  for (const width of [390, 1280]) {
    const feeling = await browser.newPage();
    await feeling.setViewport({ width, height: 900 });
    await feeling.goto(`${origin}/nl/wat-voel-ik/ik-twijfel-aan-mezelf/`, {
      waitUntil: 'networkidle0',
    });
    assert.equal(await feeling.$('[data-pv-select]'), null, 'Variant A has no select');
    const buttons = await feeling.$$('[data-pv-scene]');
    assert(buttons.length >= 2, 'Feeling page offers direct example buttons');
    await buttons[1].click();
    const after = await feeling.evaluate(() => {
      const doc = globalThis.document;
      const lines = doc.querySelector('.pv--split [data-pv-panel]:not([hidden]) .pv-lines');
      return {
        pressed: [...doc.querySelectorAll('[data-pv-scene]')].map((node) =>
          node.getAttribute('aria-pressed'),
        ),
        focus: doc.activeElement?.dataset.pvScene,
        visible: [...doc.querySelectorAll('[data-pv-panel]:not([hidden])')].map(
          (node) => node.dataset.pvPanel,
        ),
        status: doc.querySelector('[data-pv-status]')?.textContent ?? '',
        columns: globalThis.getComputedStyle(lines).gridTemplateColumns.split(' ').length,
      };
    });
    assert.equal(after.pressed.filter((value) => value === 'true').length, 1);
    assert.equal(after.pressed[1], 'true');
    assert.equal(after.focus, '1', 'Focus stays on the activated button');
    assert.deepEqual(after.visible, ['1']);
    assert(after.status.length > 0, 'A short status names the example');
    assert.equal(after.columns, width >= 832 ? 2 : 1, `Perspectives layout at ${width}px`);
    await feeling.close();
  }
  console.log(
    'Feeling pages: pressed buttons, focus kept, short status, side by side on wide screens.',
  );

  /* Variant B-light: native disclosure, readable without JavaScript, everything in print. */
  for (const javascript of [true, false]) {
    const compare = await browser.newPage();
    await compare.setJavaScriptEnabled(javascript);
    await compare.setViewport({ width: 390, height: 844 });
    await compare.goto(`${origin}/nl/ontwerp-systeem/herkenning/`, { waitUntil: 'networkidle0' });
    const items = await compare.$$('#vergelijk-b .pvs-item');
    assert.equal(items.length, 4, 'B-light shows the four home situations');
    await compare.click('#vergelijk-b .pvs-item summary');
    assert(await compare.$eval('#vergelijk-b .pvs-item', (node) => node.open));
    await compare.emulateMediaType('print');
    const hidden = await compare.$$eval(
      '#vergelijk-b .pvs-item__felt',
      (nodes) => nodes.filter((node) => node.getClientRects().length === 0).length,
    );
    assert.equal(hidden, 0, 'Every situation prints in full');
    await compare.close();
  }
  console.log(
    'B-light: four situations, native disclosure, full print with and without JavaScript.',
  );

  /* Mobile menu safety: clear of the dock, Escape closes it, one current page, one link each. */
  for (const [width, height] of [
    [320, 200],
    [320, 568],
    [360, 740],
    [390, 844],
    [430, 932],
    [667, 375],
  ]) {
    const small = await browser.newPage();
    await small.setViewport({ width, height });
    await small.goto(`${origin}/nl/herstel/grenzen-leren-stellen/`, { waitUntil: 'networkidle0' });
    assert(
      await small.$eval('.header-help', (node) => node.getClientRects().length > 0),
      `Help link must be visible with the menu closed at ${width}px`,
    );
    await small.click('.mobile-menu > summary');
    await delay(100);
    const state = await small.evaluate(() => {
      const doc = globalThis.document;
      const panel = doc.querySelector('.mobile-menu__panel').getBoundingClientRect();
      const dock = doc.querySelector('.safety-dock').getBoundingClientRect();
      const hrefs = [...doc.querySelectorAll('.mobile-menu__panel a')].map((a) =>
        a.getAttribute('href'),
      );
      const visible = (node) => node.getClientRects().length > 0 && !node.closest('footer');
      const targets = [
        ...doc.querySelectorAll(
          '.site-header a, .site-header summary, .safety-dock a, .safety-dock button, .mobile-menu__panel a',
        ),
      ].filter(visible);
      return {
        overlap: dock.height > 0 && panel.bottom > dock.top - 8 && panel.right > dock.left,
        exits: [...doc.querySelectorAll('[data-safe-exit]')].filter(visible).length,
        label: doc.querySelector('.mobile-menu > summary').getAttribute('aria-label'),
        duplicates: hrefs.filter((href, index) => hrefs.indexOf(href) !== index),
        current: [...doc.querySelectorAll('header [aria-current="page"]')].filter(visible).length,
        search: [...doc.querySelectorAll('a[href="nl/zoeken/"]')].filter(visible).length,
        tooSmall: targets
          .map((node) => node.getBoundingClientRect())
          .filter((box) => box.width < 44 || box.height < 44).length,
      };
    });
    assert.equal(state.overlap, false, `Menu panel must stay clear of the dock at ${width}px`);
    assert.equal(state.label, 'Menu sluiten', 'Open menu button must be named for closing');
    assert.deepEqual(state.duplicates, [], 'One link per destination in the mobile menu');
    assert.equal(state.current, 0, 'A section link is not the current page');
    assert.equal(state.search, 1, 'Search appears once');
    assert.equal(state.exits, 1, 'Exactly one visible Verlaat site link');
    assert.equal(state.tooSmall, 0, `Mobile actions must be at least 44x44 at ${width}px`);
    /* Tab and Shift+Tab: every focused item stays inside the panel, on screen, not under the dock. */
    const focusVisible = () =>
      small.evaluate(() => {
        const doc = globalThis.document;
        const active = doc.activeElement;
        const panel = doc.querySelector('.mobile-menu__panel');
        if (!panel.contains(active)) return null;
        const box = active.getBoundingClientRect();
        const frame = panel.getBoundingClientRect();
        const dock = doc.querySelector('.safety-dock');
        const shield = dock.getClientRects().length ? dock.getBoundingClientRect() : null;
        const covered =
          shield &&
          box.bottom > shield.top &&
          box.top < shield.bottom &&
          box.right > shield.left &&
          box.left < shield.right;
        return (
          box.top >= frame.top - 0.5 &&
          box.bottom <= frame.bottom + 0.5 &&
          box.bottom <= globalThis.innerHeight + 0.5 &&
          !covered
        );
      });
    const shiftTab = async () => {
      await small.keyboard.down('Shift');
      await small.keyboard.press('Tab');
      await small.keyboard.up('Shift');
    };
    let seen = 0;
    for (let step = 0; step < 16; step += 1) {
      await small.keyboard.press('Tab');
      const visible = await focusVisible();
      if (visible === null) break;
      assert(visible, `Focused menu item ${step + 1} must be visible at ${width}x${height}`);
      seen += 1;
    }
    assert(seen >= 10, `Tab must reach every menu item at ${width}x${height}`);
    await shiftTab();
    for (let step = 0; step < seen; step += 1) {
      assert(await focusVisible(), `Shift+Tab item must be visible at ${width}x${height}`);
      await shiftTab();
    }
    await small.keyboard.press('Escape');
    await delay(100);
    assert(small.url().endsWith('/nl/herstel/grenzen-leren-stellen/'), 'Escape must not leave');
    assert.equal(await small.$eval('.mobile-menu', (node) => node.open), false);
    assert.equal(
      await small.evaluate(() => globalThis.document.activeElement?.getAttribute('aria-label')),
      'Menu openen',
      'Escape returns focus to the renamed menu button',
    );
    const position = await small.evaluate(() => Math.round(globalThis.scrollY));
    for (let press = 0; press < 3; press += 1) await small.keyboard.press('Escape');
    await delay(200);
    assert(small.url().endsWith('/nl/herstel/grenzen-leren-stellen/'), 'Repeated Escape stays');
    assert.equal(await small.evaluate(() => Math.round(globalThis.scrollY)), position);
    await small.close();
  }
  console.log(
    'Mobile menu: help visible when closed, clear of the dock, Escape closes and returns focus, one current page, one search link, 44px targets at 320x200, 320x568, 360, 390, 430 and landscape; every focused item visible, repeated Escape stays.',
  );

  const story = await browser.newPage();
  await story.setViewport({ width: 1280, height: 850 });
  await story.goto(`${origin}/nl/mijn-verhaal/`, { waitUntil: 'networkidle0' });
  const phases = await story.$$('.timeline-phase');
  assert.equal(phases.length, 3);
  for (const phase of phases.slice(0, 2)) {
    const geometry = await phase.evaluate((node) => {
      const label = node.querySelector('.timeline-phase__label');
      globalThis.scrollTo({
        top: node.getBoundingClientRect().top + globalThis.scrollY + 180,
        behavior: 'instant',
      });
      return {
        top: label.getBoundingClientRect().top,
        stickyTop: parseFloat(globalThis.getComputedStyle(label).top),
      };
    });
    assert(
      Math.abs(geometry.top - geometry.stickyTop) < 2,
      'The current phase label stays under navigation',
    );
  }
  await story.setViewport({ width: 375, height: 850 });
  assert.equal(
    await story.$eval(
      '.timeline-phase__label',
      (label) => globalThis.getComputedStyle(label).position,
    ),
    'static',
    'Small screens use a single reading column',
  );
  await story.close();

  for (const width of [960, 1440]) {
    const slow = await browser.newPage();
    await slow.setViewport({ width, height: 1000 });
    await slow.setCacheEnabled(false);
    await slow.setRequestInterception(true);
    slow.on('request', (request) =>
      request.resourceType() === 'font'
        ? setTimeout(() => request.continue(), 1800)
        : request.continue(),
    );
    await slow.goto(`${origin}/nl/mijn-verhaal/`, { waitUntil: 'domcontentloaded' });
    await delay(150);
    const geometry = () =>
      ['.site-header', '.nav', 'h1', 'main', 'body'].map((selector) => {
        const box = globalThis.document.querySelector(selector).getBoundingClientRect();
        return [selector, box.x, box.y, box.width, box.height];
      });
    const before = await slow.evaluate(geometry);
    await slow.evaluate(() => globalThis.document.fonts.ready);
    await delay(2000);
    assert.deepEqual(
      await slow.evaluate(geometry),
      before,
      `Late fonts must not reflow the page at ${width}px`,
    );
    await slow.close();
  }
  console.log('Slow fonts: no late reflow at 960 and 1440px with a 1.8-second font delay.');
} finally {
  await browser?.close();
  server.kill();
}
