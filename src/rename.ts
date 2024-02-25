import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase';
import deburr from 'lodash.deburr';

export const rename = (filename: string): string => {
  const base = filename.split('.').at(0);
  const parts = base?.split('-') ?? [];
  if (parts && parts[0].match(/^\d/)) {
    const first = parts.shift() ?? '';
    parts.push(first);
  }
  return parts.map(part => upperFirst(part)).join('');
};