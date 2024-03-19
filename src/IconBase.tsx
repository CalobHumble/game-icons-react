// biome-ignore lint/style/useImportType: React needed for DOM
import React from 'react';

interface IconBaseProps {
  color?: string,
  size: number,
  path: string,
  name: string,
}

export const IconBase = (props: IconBaseProps): React.ReactElement => {
  const {
    color,
    size,
    path,
    name,
  } = props;

  return <svg role="figure" aria-label={name} width={size ?? 32} height={size ?? 32} viewBox='0 0 512 512'>
    <path fill={color ?? '#000'} d={path} />
  </svg>;
}

export default IconBase;