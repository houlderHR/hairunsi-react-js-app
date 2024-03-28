import { FC } from 'react';

interface IconType {
  name: string;
  size?: number;
  width?: number;
  height?: number;
}

const Icon: FC<IconType> = ({ name, width, height, size = 16 }) => (
  <div style={{ height: `${height ?? size}px`, width: `${width ?? size}px` }}>
    <img className="bg-no-repeat bg-contain w-full h-full" src={`/icon/${name}.svg`} alt="" />
  </div>
);

export default Icon;
