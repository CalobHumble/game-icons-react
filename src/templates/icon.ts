export const createReactIcon = (iconName: string, path: string): string => {
  return `/// GENRATED FILE
import React from 'react';
import { IconBase } from '../IconBase';

export const ${iconName} = ({ color, size }: { color: string, size: number }): React.ReactElement => {
  return <IconBase color={color} size={size} path="${path}" name="${iconName}"/>
}
export default ${iconName};`;
}