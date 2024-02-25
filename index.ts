import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'svgson';
import { createReactIcon } from './src/create';
import { rename } from './src/rename';

// process icons by author
const authors = (await fs.readdir('./icons', { encoding: 'utf-8', withFileTypes: true })).filter(f => f.isDirectory() && f.name !== '.gitignore');

for (const author of authors) {
  const outDir = `./dist/${author.name}`;
  const srcDir = `./icons/${author.name}`;
  await fs.mkdir(outDir, { recursive: true }).catch(_ => console.log(`Directory already exists: ${outDir}`));
  
  const icons = (await fs.readdir(srcDir, { encoding: 'utf-8' }));
  for (const icon of icons) {
    const fileName = path.basename(icon);
    const iconName = rename(fileName);
    const src = path.join(srcDir, icon);
    const dest = path.join(outDir, `${iconName}.tsx`);
    const svg = await fs.readFile(src, { encoding: 'utf-8' });
    const root = await parse(svg);
    const comp = createReactIcon(iconName, root.attributes, root.children.at(1)?.attributes['d'] || '');
    await fs.writeFile(dest, comp);
  }
}