import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const port = 4327;
const origin = `http://127.0.0.1:${port}`;
const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome');
const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const themes = [
  { name: 'light', media: 'light', choice: 'light' },
  { name: 'dark', media: 'dark', choice: 'dark' },
];

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

const routeForFile = (file) => {
  const route = file
    .replace(/^dist/, '')
    .replace(/index\.html$/, '')
    .replace(/\\/g, '/');
  return route || '/';
};

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(`${origin}/nl/`)).ok) return;
    } catch {
      // The static server has not opened its listener yet.
    }
    await delay(150);
  }
  throw new Error(`Accessibility audit server did not become available at ${origin}.`);
};

const formatViolation = (route, violation) => {
  const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ');
  return `${route}: ${violation.id} (${violation.help}) at ${targets}`;
};

const routes = (await walk('dist'))
  .filter((file) => file.endsWith('.html'))
  .map(routeForFile)
  .sort();
const server = spawn(
  'python3',
  ['-m', 'http.server', `${port}`, '--bind', '127.0.0.1', '--directory', 'dist'],
  {
    stdio: 'ignore',
  },
);
let browser;

try {
  await waitForServer();
  browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
  const failures = [];

  for (const theme of themes) {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme.media }]);
    await page.evaluateOnNewDocument(
      (choice) => globalThis.localStorage.setItem('ongehoord-theme', choice),
      theme.choice,
    );

    for (const route of routes) {
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0' });
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const result = await page.evaluate(
        async (tags) =>
          globalThis.axe.run(globalThis.document, { runOnly: { type: 'tag', values: tags } }),
        wcagTags,
      );
      failures.push(
        ...result.violations.map((violation) =>
          formatViolation(`${theme.name} ${route}`, violation),
        ),
      );
      console.log(`Axe ${theme.name} ${route}: ${result.violations.length} violations`);
    }
    await page.close();
  }

  if (failures.length) throw new Error(failures.join('\n'));
} finally {
  await browser?.close();
  server.kill();
}
