import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const walk = async d => { const all=await readdir(d,{withFileTypes:true}); return (await Promise.all(all.map(e=>e.isDirectory()?walk(join(d,e.name)):join(d,e.name)))).flat(); };
const files=(await walk('dist')).filter(f=>f.endsWith('.html')); let bad=[];
for(const file of files){const html=await readFile(file,'utf8');if(!html.includes('http-equiv="refresh"')&&!html.includes('<main'))bad.push(`${file}: missing main`);if(!html.includes('<title>'))bad.push(`${file}: missing title`);if(!html.includes('<base href='))bad.push(`${file}: missing base URL`);if(/href="\/nl\//.test(html))bad.push(`${file}: GitHub Pages-unsafe root link`)}
if(bad.length)throw new Error(bad.join('\n'));console.log(`Audited ${files.length} HTML pages.`);
