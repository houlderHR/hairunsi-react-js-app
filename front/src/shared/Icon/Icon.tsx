import { FC } from 'react';

interface IconType {
  name: string;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const Icon: FC<IconType> = ({ name, width, height, className, onClick, size = 16 }) => (
  <svg className={className} width={width ?? size} height={height ?? size} onClick={onClick}>
    <use xlinkHref={`/icon/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
