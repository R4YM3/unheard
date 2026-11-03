import { readdir, readFile } from 'node:fs/promises';
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

const htmlFiles = (await walk('dist')).filter((file) => file.endsWith('.html'));
const routes = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (file !== join('dist', 'index.html') && html.includes('http-equiv="refresh"')) continue;
  routes.push(routeForFile(file));
}
routes.sort();
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

  // Pages are audited by a small pool of tabs per theme; results print in route order.
  const concurrency = Number(process.env.AXE_CONCURRENCY ?? 6);
  for (const theme of themes) {
    const results = new Array(routes.length);
    let next = 0;
    const worker = async () => {
      const page = await browser.newPage();
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme.media }]);
      await page.evaluateOnNewDocument(
        (choice) => globalThis.localStorage.setItem('ongehoord-theme', choice),
        theme.choice,
      );
      while (next < routes.length) {
        const index = next;
        next += 1;
        const route = routes[index];
        await page.goto(`${origin}${route}`, { waitUntil: 'load' });
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
        results[index] = await page.evaluate(
          async (tags) =>
            globalThis.axe.run(globalThis.document, { runOnly: { type: 'tag', values: tags } }),
          wcagTags,
        );
      }
      await page.close();
    };
    await Promise.all(Array.from({ length: Math.min(concurrency, routes.length) }, worker));
    routes.forEach((route, index) => {
      const { violations } = results[index];
      failures.push(
        ...violations.map((violation) => formatViolation(`${theme.name} ${route}`, violation)),
      );
      console.log(`Axe ${theme.name} ${route}: ${violations.length} violations`);
    });
  }

  if (failures.length) throw new Error(failures.join('\n'));
} finally {
  await browser?.close();
  server.kill();
}
