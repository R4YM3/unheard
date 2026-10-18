import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const walk = async d => (await readdir(d,{withFileTypes:true})).flatMap(async e => e.isDirectory() ? await walk(join(d,e.name)) : [join(d,e.name)]);
const files = (await Promise.all((await walk('src/content/articles')).map(async x=>x))).flat();
for (const file of files) { const text = await readFile(file,'utf8'); if (!text.startsWith('---') || !/^published: (true|false)$/m.test(text)) throw new Error(`Invalid frontmatter: ${file}`); }
console.log(`Validated ${files.length} content files.`);
