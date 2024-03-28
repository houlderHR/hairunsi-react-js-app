import React from 'react';

interface IconType {
  name: string;
  size?: string;
  width?: string;
  height?: string;
}

const Icon: React.FC<IconType> = ({ name, width, height, size = '16' }) => (
  <div style={{ height: `${height ?? size}px`, width: `${width ?? size}px` }}>
    <img className="bg-no-repeat bg-contain w-full h-full" src={`/icon/${name}.svg`} alt="" />
  </div>
);

export default Icon;
