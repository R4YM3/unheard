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
  await Promise.all([page.waitForNavigation(), page.keyboard.press('Escape')]);
  assert.equal(
    new URL(page.url()).hostname,
    'www.knmi.nl',
    'Second Escape retains the safe-exit behavior',
  );
  await page.close();
  console.log(
    'Desktop: hover, pointer transfer, keyboard, dismissal, safe exit and stable header across five widths.',
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
      ['Het verhaal', 'Waarom Ongehoord', 'Werkwijze'],
    );
    await mobile.goto(`${origin}/nl/`, { waitUntil: 'networkidle0' });
    assert.equal(
      await mobile.$eval('.home-hero__copy .button', (node) => node.getAttribute('href')),
      'nl/hulpmiddelen/help-me-woorden-vinden/',
    );
    assert(await mobile.$('.word-finder-invite a[href="nl/hulpmiddelen/help-me-woorden-vinden/"]'));
    if (javascript) {
      /* As many examples as the page offers (home shows four). */
      const exampleCount = await mobile.$$eval('[data-pv-select] option', (nodes) => nodes.length);
      assert(exampleCount >= 1, 'Expected at least one perspective example');
      for (let index = 0; index < exampleCount; index += 1) {
        await mobile.select('[data-pv-select]', String(index));
        assert.deepEqual(
          await mobile.$$eval('[data-pv-panel]:not([hidden])', (nodes) =>
            nodes.map((node) => node.dataset.pvPanel),
          ),
          [String(index)],
        );
      }
      await mobile.emulateMediaType('print');
      assert.equal(
        await mobile.$$eval(
          '[data-pv-panel]',
          (nodes) =>
            nodes.filter((node) => globalThis.getComputedStyle(node).display !== 'none').length,
        ),
        await mobile.$$eval('[data-pv-panel]', (nodes) => nodes.length),
        'All examples must print',
      );
    } else {
      assert.equal(
        await mobile.$$eval(
          '[data-pv-panel]',
          (nodes) =>
            nodes.filter((node) => globalThis.getComputedStyle(node).display !== 'none').length,
        ),
        await mobile.$$eval('[data-pv-panel]', (nodes) => nodes.length),
        'All examples remain readable without JavaScript',
      );
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
    'Mobile: original active-section links, prominent finder entry, every example selectable, no-JS and print content.',
  );

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
