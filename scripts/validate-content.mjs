import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const walk = async d => (await Promise.all((await readdir(d,{withFileTypes:true})).map(e => e.isDirectory() ? walk(join(d,e.name)) : join(d,e.name)))).flat();
const files = await walk('src/content/articles');
for (const file of files) { const text = await readFile(file,'utf8'); if (!text.startsWith('---') || !/^published: (true|false)$/m.test(text)) throw new Error(`Invalid frontmatter: ${file}`); }
console.log(`Validated ${files.length} content files.`);
