/**
 * Checks every source URL in the content frontmatter and reports links that no longer work.
 * Run by hand (`npm run audit:sources`); it needs the network, so it is not part of CI.
 *
 * - 2xx/3xx: fine.
 * - 401/403/429: the site blocks scripted requests (e.g. Juridisch Loket, DOI resolvers);
 *   reported as "check by hand", not as broken.
 * - 5xx or a network error twice in a row: probably temporary; reported, not failed.
 * - 404/410 and other 4xx: broken; exit code 1.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'src/content';
const walk = async (directory) =>
  (
    await Promise.all(
      (await readdir(directory, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)],
      ),
    )
  ).flat();

const files = (await walk(root)).filter((file) => /\.(mdx?|ya?ml)$/.test(file));
const uses = new Map();
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/^\s*url:\s*'?(https:\/\/[^'\s]+)'?\s*$/gm)) {
    const list = uses.get(match[1]) ?? [];
    list.push(file);
    uses.set(match[1], list);
  }
}

const check = async (url) => {
  const attempt = async (method) => {
    const response = await fetch(url, {
      method,
      redirect: 'follow',
      signal: globalThis.AbortSignal.timeout(20000),
      headers: { 'user-agent': 'Mozilla/5.0 (source check)' },
    });
    return response.status;
  };
  try {
    const status = await attempt('HEAD');
    return status === 405 || status === 501 ? await attempt('GET') : status;
  } catch {
    try {
      return await attempt('GET');
    } catch (error) {
      return `error: ${error.cause?.code ?? error.name}`;
    }
  }
};

const urls = [...uses.keys()].sort();
const results = [];
let next = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (next < urls.length) {
      const url = urls[next];
      next += 1;
      let status = await check(url);
      if (typeof status !== 'number' || status >= 500) status = await check(url);
      results.push({ url, status });
    }
  }),
);

const blocked = results.filter((r) => [401, 403, 429].includes(r.status));
const temporary = results.filter((r) => typeof r.status !== 'number' || r.status >= 500);
const broken = results.filter(
  (r) =>
    typeof r.status === 'number' &&
    r.status >= 400 &&
    r.status < 500 &&
    ![401, 403, 429].includes(r.status),
);
console.log(`Checked ${results.length} source URLs in ${files.length} content files.`);
for (const r of blocked) console.log(`check by hand (${r.status}): ${r.url}`);
for (const r of temporary) console.log(`temporary, try again later (${r.status}): ${r.url}`);
for (const r of broken)
  console.log(`BROKEN (${r.status}): ${r.url}\n  used in: ${uses.get(r.url).join(', ')}`);
if (broken.length) process.exit(1);
console.log('No broken source URLs.');
