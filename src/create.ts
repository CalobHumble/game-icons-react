export const createReactIcon = (iconName: string, attrs: Record<string, string>, path: string): string => {
  return `/// GENRATED FILE
import React from 'react';
export const ${iconName} = ({ color, size }: { color: string, size: number }): React.ReactElement => {
  return <svg ${Object.keys(attrs).map(v => `${v}="${attrs[v]}"`).join(" ")} width={size} height={size} >
    <path fill={color} d="${path}" />
  </svg>;
}
export default ${iconName};`;
}