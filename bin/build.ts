import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'svgson';
import upperFirst from 'lodash.upperfirst';

const rename = (filename: string): string => {
  const base = filename.split('.').at(0);
  const parts = base?.split('-') ?? [];
  if (parts?.[0].match(/^\d/)) {
    const first = parts.shift() ?? '';
    parts.push(first);
  }
  return parts.map(part => upperFirst(part)).join('');
};

const createReactIcon = (iconName: string, path: string): string => (
`/// GENERATE FILE
import React, { memo } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '../props';


const Icon = (props: IconProps): React.ReactElement => {
  const {
    color = 'black',
    size = 24,
    ...otherProps
  } = props;

  return <Svg width={size} height={size} viewBox="0 0 512 512" {...otherProps} >
    <Path fill={color} d="${path}" />
  </Svg>;
}

Icon.displayName = '${iconName}';

export const ${iconName} = memo<IconProps>(Icon);`);

const buildDir = './src';

// process icons by author
const authors = (await fs.readdir('./icons', { encoding: 'utf-8', withFileTypes: true })).filter(f => f.isDirectory() && f.name !== '.gitignore');
const rootIndex = path.join(buildDir, 'index.ts');

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
    await fs.appendFile(indexFile, `export * from './${iconName}';\r`);
  }

  await fs.appendFile(rootIndex, `export * as ${rename(author.name)} from './${author.name}';\r`);
}

