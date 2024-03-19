import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'svgson';
import { createReactIcon } from './templates/icon';
import { rename } from './rename';

const buildDir = './build';

// process icons by author
const authors = (await fs.readdir('./icons', { encoding: 'utf-8', withFileTypes: true })).filter(f => f.isDirectory() && f.name !== '.gitignore');

for (const author of authors) {
  const outDir = path.join(buildDir, author.name);
  const srcDir = path.join('./icons', author.name);
  await fs.mkdir(outDir, { recursive: true }).catch(_ => console.log(`Directory already exists: ${outDir}`));
  
  // convert all icons
  const icons = (await fs.readdir(srcDir, { encoding: 'utf-8' }));
  const indexFile = path.join(outDir, 'index.tsx');
  for (const icon of icons) {
    const fileName = path.basename(icon);
    const iconName = rename(fileName);
    const src = path.join(srcDir, icon);
    const dest = path.join(outDir, `${iconName}.tsx`);
    const svg = await fs.readFile(src, { encoding: 'utf-8' });
    const root = await parse(svg);
    const comp = createReactIcon(iconName, root.children.at(1)?.attributes.d || '');
    await fs.writeFile(dest, comp);
    await fs.appendFile(indexFile, `export * from './${iconName}';\r`)
  }
}

// copy over IconBase
await fs.copyFile('./src/IconBase.tsx', './build/IconBase.tsx');