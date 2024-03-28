import React, { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import IconCard from './IconCard';

interface CardTypeProps {
  title: string;
  iconVisible?: boolean;
}

// CardType
const CardType: FC<PropsWithChildren<CardTypeProps>> = ({
  children,
  title,
  iconVisible = false,
}) => {
  const classes = twMerge(
    'p-6 border  cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300',
    iconVisible ? 'border-gray-3' : 'border-transparent',
  );
  return (
    <div className={classes}>
      <div className="flex flex-row justify-between">
        <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
        {iconVisible ? <IconCard /> : <IconCard withOther />}
      </div>
      {children}
    </div>
  );
};

export default CardType;
