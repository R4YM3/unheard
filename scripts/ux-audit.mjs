/**
 * Browser checks that the static audit cannot do:
 * - every page fits 320/375/430/1440 px wide viewports without horizontal scrolling;
 * - without JavaScript, all perspective-switch content, glossary entries and search results
 *   are visible, and enhancement-only controls stay hidden;
 * - with JavaScript, the "Wat je hoort. Wat je voelt." component passes axe colour contrast in light and
 *   dark themes, and the tabs respond to the keyboard.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const port = 4329;
const origin = `http://127.0.0.1:${port}`;
const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome');
const widths = [320, 375, 430, 1440];

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)],
      ),
    )
  ).flat();
};
const routes = [];
for (const file of (await walk('dist')).filter((name) => name.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) continue;
  routes.push(file.replace(/^dist/, '').replace(/index\.html$/, '') || '/');
}
routes.sort();

const server = spawn(
  'python3',
  ['-m', 'http.server', `${port}`, '--bind', '127.0.0.1', '--directory', 'dist'],
  { stdio: 'ignore' },
);
const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(`${origin}/nl/`)).ok) return;
    } catch {
      // Not listening yet.
    }
    await delay(150);
  }
  throw new Error('UX audit server did not start.');
};

const failures = [];
let browser;
try {
  await waitForServer();
  browser = await puppeteer.launch({ executablePath: chromePath, headless: true });

  // 1. Narrow viewports, with and without JavaScript: each width/JS combination in its own tab,
  //    all at once.
  const combinations = [true, false].flatMap((javascript) =>
    widths.map((width) => ({ javascript, width })),
  );
  await Promise.all(
    combinations.map(async ({ javascript, width }) => {
      const page = await browser.newPage();
      await page.setJavaScriptEnabled(javascript);
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      for (const route of routes) {
        await page.goto(`${origin}${route}`, {
          // The root deliberately redirects after 450ms; wait for that navigation before measuring.
          waitUntil: route === '/' && javascript ? 'networkidle0' : 'load',
        });
        const overflow = await page.evaluate(() => {
          const doc = globalThis.document.documentElement;
          const offenders = [...globalThis.document.querySelectorAll('main *')]
            .filter((element) => element.getBoundingClientRect().right > doc.clientWidth + 1)
            .slice(0, 3)
            .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
          return { scroll: doc.scrollWidth, client: doc.clientWidth, offenders };
        });
        if (overflow.scroll > overflow.client + 1)
          failures.push(
            `${route} @${width}px js=${javascript}: horizontal overflow ${overflow.scroll}>${overflow.client} (${overflow.offenders.join(', ')})`,
          );
      }
      await page.close();
    }),
  );
  console.log(`Viewport checks: ${routes.length} routes × ${widths.length} widths × JS on/off`);

  // 2. No-JS content coverage.
  const noJs = await browser.newPage();
  await noJs.setJavaScriptEnabled(false);
  await noJs.setViewport({ width: 1280, height: 900 });
  for (const route of routes) {
    await noJs.goto(`${origin}${route}`, { waitUntil: 'load' });
    const state = await noJs.evaluate(() => {
      const visible = (element) => globalThis.getComputedStyle(element).display !== 'none';
      const all = (selector) => [...globalThis.document.querySelectorAll(selector)];
      return {
        panels: all('.pv-panel').length,
        hiddenPanels: all('.pv-panel, [data-pv-panel]').filter((element) => !visible(element))
          .length,
        visibleControls: all(
          '[data-pv-tabs], [data-pv-choice], [data-filter], [data-finder-controls]',
        ).filter(visible).length,
        hiddenItems: all('[data-filter-item], .finder-step, .finder-all__card').filter(
          (element) => !visible(element),
        ).length,
      };
    });
    if (state.hiddenPanels)
      failures.push(`${route} no-JS: ${state.hiddenPanels} perspective panels hidden`);
    if (state.visibleControls)
      failures.push(`${route} no-JS: enhancement-only controls visible without JavaScript`);
    if (state.hiddenItems) failures.push(`${route} no-JS: filterable items hidden`);
  }
  await noJs.close();
  console.log('No-JS checks done');

  // Timeline disclosures must show exactly one sign in both native states.
  const timelinePage = await browser.newPage();
  await timelinePage.setJavaScriptEnabled(false);
  await timelinePage.goto(`${origin}/nl/mijn-verhaal/`, { waitUntil: 'networkidle0' });
  /* While the timeline is withheld (legal review), there are no disclosures to check. */
  const withheld = await timelinePage.$('.timeline-withheld');
  for (const selector of withheld
    ? []
    : [
        '.st__row--context details.st__card',
        '#moment-1 .st__moments details',
        'details.st__rail',
      ]) {
    const summary = await timelinePage.$(`${selector} > summary`);
    if (!summary) throw new Error(`Missing timeline disclosure: ${selector}`);
    await summary.focus();
    for (const [key, expected] of [
      ['', '+'],
      ['Enter', '−'],
      ['Space', '+'],
    ]) {
      if (key) await timelinePage.keyboard.press(key);
      const signs = await summary.evaluate((element) => {
        const content = (node) => globalThis.getComputedStyle(node, '::after').content;
        return [element, element.querySelector('.timeline-toggle')]
          .filter(Boolean)
          .map(content)
          .map((value) => value.replaceAll('"', ''))
          .filter((value) => value && !['none', 'normal'].includes(value));
      });
      if (signs.length !== 1 || signs[0] !== expected)
        failures.push(`${selector}: expected one ${expected}, got ${JSON.stringify(signs)}`);
    }
  }
  await timelinePage.close();
  console.log('Timeline disclosures: one +/− sign and native keyboard toggling');

  // 3. Perspective: both sides visible, example buttons work, contrast in both themes.
  const pvRoutes = [];
  for (const route of routes) {
    const html = await readFile(join('dist', route, 'index.html'), 'utf8').catch(() => '');
    if (/<div\b[^>]*\sdata-pv(?=[\s=>])/.test(html)) pvRoutes.push(route);
  }
  // Both themes at once, three tabs each, sharing one queue of routes per theme.
  const checkPerspective = async (theme, queue) => {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme }]);
    await page.evaluateOnNewDocument(
      (choice) => globalThis.localStorage.setItem('ongehoord-theme', choice),
      theme,
    );
    while (queue.length > 0) {
      const route = queue.shift();
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' });
      // Both sides of a scenario are always visible together.
      const sides = await page.$$eval(
        '[data-pv-panel]:not([hidden]) .pv-line',
        (lines) =>
          lines.filter((line) => globalThis.getComputedStyle(line).display !== 'none').length,
      );
      if (sides !== 2)
        failures.push(`${route} ${theme}: expected both sides visible, saw ${sides}`);
      const buttons = await page.$$('[data-pv-scene]');
      if (buttons.length > 1) {
        await buttons[1].focus();
        await page.keyboard.press('Enter');
        const state = await page.evaluate(() => ({
          pressed: globalThis.document
            .querySelectorAll('[data-pv-scene]')[1]
            .getAttribute('aria-pressed'),
          shown: [...globalThis.document.querySelectorAll('[data-pv-panel]')]
            .filter((panel) => !panel.hidden)
            .map((panel) => panel.dataset.pvPanel),
        }));
        if (state.pressed !== 'true' || state.shown.join() !== '1')
          failures.push(`${route} ${theme}: choosing the second example did not show it alone`);
      }
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const result = await page.evaluate(() =>
        globalThis.axe.run(globalThis.document.querySelector('.pv'), {
          runOnly: {
            type: 'rule',
            values: ['color-contrast', 'aria-valid-attr-value', 'button-name'],
          },
        }),
      );
      for (const violation of result.violations)
        failures.push(
          `${route} ${theme} perspective: ${violation.id} at ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`,
        );
    }
    await page.close();
  };
  await Promise.all(
    ['light', 'dark'].flatMap((theme) => {
      const queue = [...pvRoutes];
      return [1, 2, 3].map(() => checkPerspective(theme, queue));
    }),
  );
  console.log(`Perspective checks: ${pvRoutes.length} routes × 2 themes`);

  const linkedExample = await browser.newPage();
  const id = 'perspectief-scene-2';
  await linkedExample.goto(`${origin}/nl/#${id}`);
  await linkedExample.waitForSelector(`#${id}`, { visible: true });
  const followUpRoutes = await linkedExample.$$eval(`#${id} a`, (links) =>
    links.map((link) => link.href),
  );
  if (followUpRoutes.length === 0) failures.push('Money example: missing follow-up links');
  for (const route of followUpRoutes) {
    if (!(await fetch(route)).ok) failures.push('Money example: broken follow-up link');
  }
  await linkedExample.close();

  // 4. Word finder: keyboard-only route, overview, privacy and contrast in both themes.
  const finderRoute = '/nl/hulpmiddelen/help-me-woorden-vinden/';
  for (const theme of ['light', 'dark']) {
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 800 });
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: theme },
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
    await page.evaluateOnNewDocument(
      (choice) => globalThis.localStorage.setItem('ongehoord-theme', choice),
      theme,
    );
    await page.goto(`${origin}${finderRoute}`, { waitUntil: 'networkidle0' });
    const lateRequests = [];
    page.on('request', (request) => lateRequests.push(request.url()));
    const fail = (message) => failures.push(`${finderRoute} ${theme}: ${message}`);
    const press = async (selector, key = 'Space') => {
      await page.focus(selector);
      await page.keyboard.press(key);
    };
    const visibleStep = () =>
      page.$$eval('[data-step]', (steps) =>
        steps.filter((step) => !step.hidden).map((step) => step.dataset.step),
      );
    if ((await visibleStep()).join() !== '0') fail('expected only the first question');
    await press('input[value="twijfel"]');
    await press('[data-finder-next]', 'Enter');
    const focused = await page.evaluate(() =>
      globalThis.document.activeElement?.hasAttribute('data-step-focus'),
    );
    if (!focused) fail('focus did not move to the next question');
    await press('[data-finder-skip]', 'Enter');
    await press('[data-finder-prev]', 'Enter');
    if ((await visibleStep()).join() !== '1') fail('back button did not return a step');
    for (let step = 1; step < 4; step += 1) await press('[data-finder-next]', 'Enter');
    await press('input[value="geen-zicht"]');
    await press('[data-finder-next]', 'Enter');
    await press('input[value="niet-veilig"]');
    await press('[data-finder-next]', 'Enter');
    const overview = await page.evaluate(() => {
      const doc = globalThis.document;
      const result = doc.querySelector('[data-finder-result]');
      return {
        shown: !result.hidden,
        focus: doc.activeElement?.id,
        text: result.innerText,
        url: globalThis.location.href,
        storage: Object.keys(globalThis.localStorage).filter((key) => key !== 'ongehoord-theme'),
        session: Object.keys(globalThis.sessionStorage),
        links: [...result.querySelectorAll('a[href^="nl/"]')].map((link) => link.href),
      };
    });
    if (!overview.shown) fail('overview did not appear');
    if (overview.focus !== 'finder-result-heading') fail('focus did not move to the overview');
    for (const expected of [
      'Eerst je veiligheid',
      'Wat je herkende',
      'Vragen om bij stil te staan',
    ])
      if (!overview.text.includes(expected)) fail(`overview misses “${expected}”`);
    const verdict = overview.text
      .replace(/geen (?:uitslag|score)/gi, '')
      .match(/\d+\s?%|\bscore\b|\buitslag\b/i);
    if (verdict) fail(`overview contains a score or percentage (“${verdict[0]}”)`);
    if (overview.url !== `${origin}${finderRoute}`) fail('answers leaked into the URL');
    if (overview.storage.length || overview.session.length) fail('answers were stored');
    if (lateRequests.length) fail(`network requests during the route: ${lateRequests.join(', ')}`);
    for (const link of overview.links) {
      const response = await fetch(link);
      if (!response.ok) fail(`overview link ${link} returned ${response.status}`);
    }
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const axe = await page.evaluate(() =>
      globalThis.axe.run(globalThis.document.querySelector('[data-finder]'), {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      }),
    );
    for (const violation of axe.violations)
      fail(`${violation.id} at ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`);
    await press('[data-finder-clear]', 'Enter');
    const cleared = await page.evaluate(() => ({
      checked: globalThis.document.querySelectorAll('[data-finder] input:checked').length,
      resultHidden: globalThis.document.querySelector('[data-finder-result]').hidden,
    }));
    if (cleared.checked || !cleared.resultHidden) fail('“Wis alles” did not clear the answers');
    await page.close();
  }
  console.log('Word finder checks: keyboard route, privacy and contrast × 2 themes');
} finally {
  await browser?.close();
  server.kill();
}
if (failures.length) throw new Error(failures.join('\n'));
console.log('UX audit passed.');
