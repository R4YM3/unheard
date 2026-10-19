import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const port = 4326;
const origin = `http://127.0.0.1:${port}`;
const outputDirectory = 'work/visual-audit';
const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome');

const pages = [
  { id: 'home', reference: 'references/homepage.html', route: '/nl/' },
  { id: 'story', reference: 'references/mijn-verhaal.html', route: '/nl/mijn-verhaal/' },
  {
    id: 'self-doubt',
    reference: 'references/zelftwijfel.html',
    route: '/nl/wat-voel-ik/ik-twijfel-aan-mezelf/',
  },
  { id: 'darvo', reference: 'references/darvo.html', route: '/nl/begrippen/darvo/' },
  { id: 'therapy', reference: 'references/herstel-therapie.html', route: '/nl/herstel/therapie/' },
  {
    id: 'financial-abuse',
    reference: 'references/financieel-misbruik.html',
    route: '/nl/financieel-misbruik/',
  },
];

const viewports = [
  { id: 'desktop', width: 1440, height: 1200 },
  { id: 'tablet', width: 768, height: 1100 },
  { id: 'mobile', width: 390, height: 844 },
];

const startServer = () =>
  spawn('python3', ['-m', 'http.server', `${port}`, '--bind', '127.0.0.1', '--directory', 'dist'], {
    stdio: 'ignore',
  });

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(`${origin}/nl/`)).ok) return;
    } catch {
      // The server needs a moment before it accepts connections.
    }
    await delay(150);
  }
  throw new Error(`Visual audit server did not become available at ${origin}.`);
};

const referenceUrl = (reference) => new URL(`../${reference}`, import.meta.url).href;

const capture = async (page, url, outputPath, viewport) => {
  await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outputPath, fullPage: true });
};

await mkdir(outputDirectory, { recursive: true });
const server = startServer();
let browser;

try {
  await waitForServer();
  browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.evaluateOnNewDocument(() =>
    globalThis.localStorage.setItem('ongehoord-theme', 'light'),
  );

  for (const viewport of viewports) {
    const viewportDirectory = `${outputDirectory}/${viewport.id}`;
    await mkdir(viewportDirectory, { recursive: true });
    for (const item of pages) {
      await capture(
        page,
        referenceUrl(item.reference),
        `${viewportDirectory}/${item.id}-reference.png`,
        viewport,
      );
      await capture(
        page,
        `${origin}${item.route}`,
        `${viewportDirectory}/${item.id}-current.png`,
        viewport,
      );
      console.log(`${viewport.id}: ${item.id}`);
    }
  }
} finally {
  await browser?.close();
  server.kill();
}
