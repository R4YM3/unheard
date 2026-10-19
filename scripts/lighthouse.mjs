import { mkdir, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const port = 4322;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  '/nl/',
  '/nl/wat-voel-ik/ik-twijfel-aan-mezelf/',
  '/nl/begrippen/darvo/',
  '/nl/financieel-misbruik/',
  '/nl/mijn-verhaal/',
  '/nl/herstel/therapie/',
];
const chromePath =
  process.env.CHROME_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome');

const run = (command, args, options = {}) =>
  exec(command, args, { ...options, maxBuffer: 10 * 1024 * 1024 });

const waitForPreview = async () => {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`${origin}/nl/`);
      if (response.ok) return;
    } catch {
      // The preview daemon has not opened its listener yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview did not become available at ${origin}/nl/`);
};

await mkdir('work', { recursive: true });
try {
  await run('npm', ['exec', 'astro', 'preview', 'stop']).catch(() => undefined);
  await run('npm', ['exec', 'astro', 'preview', '--', '--host', '127.0.0.1', '--port', `${port}`]);
  await waitForPreview();
  for (const route of routes) {
    const reportPath = `work/lighthouse${route.replaceAll('/', '-') || '-home'}.json`;
    await run(
      process.execPath,
      [
        'node_modules/lighthouse/cli/index.js',
        `${origin}${route}`,
        '--only-categories=performance,accessibility,seo',
        '--preset=desktop',
        '--output=json',
        `--output-path=${reportPath}`,
        '--quiet',
        '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
      ],
      { env: { ...process.env, CHROME_PATH: chromePath } },
    );

    const report = JSON.parse(await readFile(reportPath, 'utf8'));
    const scores = Object.fromEntries(
      Object.entries(report.categories).map(([name, category]) => [
        name,
        Math.round(category.score * 100),
      ]),
    );
    console.log(
      `Lighthouse ${route}: performance ${scores.performance}, accessibility ${scores.accessibility}, SEO ${scores.seo}`,
    );
    if (scores.accessibility < 100)
      throw new Error(`${route}: Lighthouse accessibility score must be 100.`);
    if (scores.performance < 90)
      throw new Error(`${route}: Lighthouse performance score must be at least 90.`);
    if (scores.seo < 100 && process.env.NO_INDEX !== 'true')
      throw new Error(`${route}: Lighthouse SEO score must be 100 once noindex is removed.`);
  }
} finally {
  await run('npm', ['exec', 'astro', 'preview', 'stop']).catch(() => undefined);
}
