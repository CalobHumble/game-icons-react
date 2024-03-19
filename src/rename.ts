import upperFirst from 'lodash.upperfirst'

export const rename = (filename: string): string => {
  const base = filename.split('.').at(0);
  const parts = base?.split('-') ?? [];
  if (parts?.[0].match(/^\d/)) {
    const first = parts.shift() ?? '';
    parts.push(first);
  }
  return parts.map(part => upperFirst(part)).join('');
};