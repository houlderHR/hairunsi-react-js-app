import { FC } from 'react';

interface IconType {
  name: string;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

const Icon: FC<IconType> = ({ name, width, height, className, size = 16 }) => (
  <svg className={className} width={width ?? size} height={height ?? size}>
    <use xlinkHref={`/icon/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
