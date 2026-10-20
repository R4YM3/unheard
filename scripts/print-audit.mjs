import { mkdir, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import puppeteer from 'puppeteer-core';

const port = 4328;
const origin = `http://127.0.0.1:${port}`;
const outputDirectory = 'work/print-audit';
const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome');

const routes = [
  { id: 'home', route: '/nl/', required: ['Wat herken jij?', 'Er mag weer ruimte ontstaan.'] },
  {
    id: 'story',
    route: '/nl/mijn-verhaal/',
    required: ['De weg waarop ik mezelf kwijtraakte.', 'Wie werd ik?', 'Voor mijn kinderen.'],
  },
  {
    id: 'emotion',
    route: '/nl/wat-voel-ik/ik-twijfel-aan-mezelf/',
    required: [
      'Wat er gezegd wordt',
      'Wat ik vanbinnen voel',
      'Een grens aangeven',
      'Bevestiging zoeken',
    ],
  },
  { id: 'emotion-hub', route: '/nl/wat-voel-ik/', required: ['Waar kan ik beginnen?'] },
  { id: 'pattern', route: '/nl/begrippen/darvo/', required: ['Wat betekent DARVO?'] },
  { id: 'glossary', route: '/nl/begrippen/', required: ['Alle begrippen', 'DARVO'] },
  {
    id: 'knowledge',
    route: '/nl/begrijp-het/conflict-of-patroon/',
    required: ['Wat er gezegd wordt', 'Bronnen'],
  },
  { id: 'financial-hub', route: '/nl/begrijp-het/financieel-misbruik/', required: ['Wat is het?'] },
  { id: 'recovery-hub', route: '/nl/herstel/', required: ['Herstel'] },
  {
    id: 'therapy',
    route: '/nl/herstel/therapievormen/schematherapie/',
    required: ['Vragen die je kunt stellen'],
  },
  {
    id: 'tool',
    route: '/nl/hulpmiddelen/wat-voel-ik-en-wat-heb-ik-nodig/',
    required: ['vragenkaart'],
  },
  { id: 'help', route: '/nl/hulp-vinden/', required: ['112', '113', '0800-2000'] },
  { id: 'stats', route: '/nl/mannen-in-cijfers/', required: ['Beperkingen', '4,9%'] },
  { id: 'search', route: '/nl/zoeken/', required: ['Alle pagina’s'] },
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
      // The static server needs a moment before it accepts connections.
    }
    await delay(150);
  }
  throw new Error(`Print audit server did not become available at ${origin}.`);
};

const visibility = async (page, selector) =>
  page
    .$eval(selector, (element) => globalThis.getComputedStyle(element).display !== 'none')
    .catch(() => false);

await mkdir(outputDirectory, { recursive: true });
const server = startServer();
let browser;

try {
  await waitForServer();
  browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

  for (const item of routes) {
    await page.goto(`${origin}${item.route}`, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');

    const printState = {
      headerHidden: !(await visibility(page, '.site-header')),
      footerHidden: !(await visibility(page, '.site-footer')),
      themeHidden: !(await visibility(page, '.theme-toggle')),
      hiddenPanelsVisible: await page.evaluate(() =>
        [
          ...globalThis.document.querySelectorAll(
            '[data-pv-panel], .pv-panel, .glossary-item, details > :not(summary)',
          ),
        ].every((element) => globalThis.getComputedStyle(element).display !== 'none'),
      ),
      detailsExpanded: await page.evaluate(() =>
        [...globalThis.document.querySelectorAll('details:not([open]) > :not(summary)')].every(
          (element) => globalThis.getComputedStyle(element).display !== 'none',
        ),
      ),
      privateInputHidden: await page.evaluate(() =>
        [...globalThis.document.querySelectorAll('textarea')].every(
          (element) => globalThis.getComputedStyle(element).display === 'none',
        ),
      ),
      text: await page.evaluate(() => globalThis.document.body.innerText),
    };
    if (!printState.headerHidden || !printState.footerHidden || !printState.themeHidden)
      throw new Error(`${item.route}: print UI must hide site navigation and fixed controls.`);
    if (!printState.hiddenPanelsVisible)
      throw new Error(`${item.route}: print must reveal tab panel content.`);
    if (!printState.privateInputHidden)
      throw new Error(`${item.route}: private answers must be excluded from print by default.`);
    if (!printState.detailsExpanded)
      throw new Error(`${item.route}: print must reveal collapsed detail content.`);
    for (const expected of item.required) {
      if (!printState.text.toLowerCase().includes(expected.toLowerCase()))
        throw new Error(`${item.route}: missing printed content: ${expected}`);
    }

    const outputPath = `${outputDirectory}/${item.id}.pdf`;
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    const file = await stat(outputPath);
    if (file.size < 10_000) throw new Error(`${item.route}: generated PDF is unexpectedly small.`);
    console.log(`Print ${item.route}: ${file.size} bytes`);
  }
} finally {
  await browser?.close();
  server.kill();
}
