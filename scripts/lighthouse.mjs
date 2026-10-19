import { mkdir, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const port = 4322;
const url = `http://127.0.0.1:${port}/nl/`;
const reportPath = 'work/lighthouse-home.json';
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
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview daemon has not opened its listener yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview did not become available at ${url}`);
};

await mkdir('work', { recursive: true });
try {
  await run('npm', ['exec', 'astro', 'preview', 'stop']).catch(() => undefined);
  await run('npm', ['exec', 'astro', 'preview', '--', '--host', '127.0.0.1', '--port', `${port}`]);
  await waitForPreview();
  await run(
    process.execPath,
    [
      'node_modules/lighthouse/cli/index.js',
      url,
      '--only-categories=performance,accessibility,seo',
      '--preset=desktop',
      '--output=json',
      `--output-path=${reportPath}`,
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
    ],
    { env: { ...process.env, CHROME_PATH: chromePath } },
  );
} finally {
  await run('npm', ['exec', 'astro', 'preview', 'stop']).catch(() => undefined);
}

const report = JSON.parse(await readFile(reportPath, 'utf8'));
const scores = Object.fromEntries(
  Object.entries(report.categories).map(([name, category]) => [
    name,
    Math.round(category.score * 100),
  ]),
);
console.log(
  `Lighthouse: performance ${scores.performance}, accessibility ${scores.accessibility}, SEO ${scores.seo}`,
);

if (scores.accessibility < 100) throw new Error('Lighthouse accessibility score must be 100.');
if (scores.performance < 90) throw new Error('Lighthouse performance score must be at least 90.');
if (scores.seo < 100 && process.env.NO_INDEX !== 'true')
  throw new Error('Lighthouse SEO score must be 100 once noindex is removed.');
