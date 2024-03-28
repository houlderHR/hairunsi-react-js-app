import React from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';
import IconCardType from './IconCardType';

interface CardTypeProps {
  title: string;
  name: string;
  iconVisible?: boolean;
}

// CardType
const CardType: React.FC<CardTypeProps> = ({ title, name, iconVisible = false }) => {
  const classes = twMerge(
    'p-6 border  cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300',
    iconVisible ? 'border-gray-3' : 'border-transparent',
  );
  return (
    <div className={classes}>
      <div className="flex flex-row justify-between">
        <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
        {iconVisible ? <IconCardType /> : <IconCardType withOther />}
      </div>
      <div className="flex mt-4 flex-row justify-start gap-x-4">
        <Icon name="user-guard" height="22" width="18" />
        <p className="text-base">{name}</p>
      </div>
    </div>
  );
};

export default CardType;
