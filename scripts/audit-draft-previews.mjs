/** Review selected drafts in a disposable copy. Never publish or alter the real checkout. */
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';

const drafts = [
  {
    id: 'recognition-afterwards',
    slug: 'waarom-zag-ik-het-toen-niet',
    required: ['Een ander moment geeft een ander zicht', 'Na een breuk, of in een nieuwe relatie'],
  },
  {
    id: 'sexual-pressure',
    slug: 'seksuele-druk-en-dwang',
    required: ['Instemming vraagt ruimte', 'Verschil in verlangen is geen mishandeling'],
  },
  {
    id: 'digital-control',
    slug: 'digitale-controle-en-stalking',
    required: ['Dreigen met privébeelden', 'Een veilige eerste stap'],
  },
];

const root = process.cwd();
const temporary = await mkdtemp(join(tmpdir(), 'unheard-draft-review-'));
const env = {
  ...process.env,
  NO_INDEX: 'true',
  SITE_URL: 'https://unheard.support',
  PUBLIC_CLOUDFLARE_BEACON_TOKEN: '',
};
const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: temporary, env, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) =>
      code === 0 ? resolve() : reject(new Error(`${command} failed: ${code ?? signal}`)),
    );
  });

try {
  const excluded = new Set(['.git', '.astro', 'node_modules', 'dist', 'work']);
  for (const entry of await readdir(root)) {
    if (!excluded.has(entry))
      await cp(join(root, entry), join(temporary, entry), { recursive: true });
  }
  await symlink(join(root, 'node_modules'), join(temporary, 'node_modules'), 'dir');

  for (const draft of drafts) {
    const file = join(temporary, 'src/content/articles/begrijp-het', `${draft.slug}.md`);
    const source = await readFile(file, 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter || !/^published: false$/m.test(frontmatter[1])) {
      throw new Error(`${draft.slug}: expected an unpublished draft; update the review list.`);
    }
    await writeFile(
      file,
      source.replace(frontmatter[0], frontmatter[0].replace('published: false', 'published: true')),
    );
  }

  await run('npm', ['run', 'build']);
  const routes = drafts.map(({ id, slug, required }) => ({
    id,
    route: `/nl/begrijp-het/${slug}/`,
    required,
    screenshots: true,
  }));
  for (const { route } of routes) {
    const html = await readFile(join(temporary, 'dist', route, 'index.html'), 'utf8');
    if (!/<meta\s+name="robots"\s+content="[^"]*noindex/.test(html)) {
      throw new Error(`${route}: draft preview must remain noindex.`);
    }
  }
  console.log('All three draft routes rendered with noindex; real checkout and dist untouched.');

  if (!process.argv.includes('--build-only')) {
    const manifest = join(temporary, 'review-routes.json');
    await writeFile(manifest, JSON.stringify(routes));
    env.PRINT_REVIEW_ROUTES = manifest;
    await run('node', ['scripts/print-audit.mjs']);
    await run('node', ['scripts/axe-audit.mjs']);
    await run('node', ['scripts/ux-audit.mjs']);
  } else {
    console.log('Build-only review: no browser, accessibility or print checks performed.');
  }
} finally {
  // Keep review images even if a later browser assertion fails; never retain the draft build.
  try {
    await mkdir(join(root, 'work/draft-review'), { recursive: true });
    await cp(join(temporary, 'work/print-audit'), join(root, 'work/draft-review'), {
      recursive: true,
    });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Could not preserve draft review images:', error);
      process.exitCode = 1;
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
