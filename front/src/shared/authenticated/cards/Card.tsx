<<<<<<< HEAD:front/src/shared/authenticated/CardType/CardType.tsx
import { FC } from 'react';
=======
import React from 'react';
import IconCard from './IconCard';
import Icon from '../../Icon';
>>>>>>> 84c509c (feat: refact components and create card role manager):front/src/shared/authenticated/cards/Card.tsx
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';
import IconCardType from './IconCardType';

interface CardTypeProps {
  title: string;
  iconVisible?: boolean;
  children: any;
}

// CardType
<<<<<<< HEAD:front/src/shared/authenticated/CardType/CardType.tsx
const CardType: FC<CardTypeProps> = ({ title, name, iconVisible = false }) => {
=======
const CardType: React.FC<CardTypeProps> = ({ title, iconVisible = false, children }) => {
>>>>>>> 84c509c (feat: refact components and create card role manager):front/src/shared/authenticated/cards/Card.tsx
  const classes = twMerge(
    'p-6 border  cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300',
    iconVisible ? 'border-gray-3' : 'border-transparent',
  );
  return (
<<<<<<< HEAD:front/src/shared/authenticated/CardType/CardType.tsx
    <div className={classes}>
      <div className="flex flex-row justify-between">
        <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
        {iconVisible ? <IconCardType /> : <IconCardType withOther={!iconVisible} />}
=======
    <>
      <div className={classes}>
        <div className="flex flex-row justify-between">
          <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
          {iconVisible ? <IconCard /> : <IconCard withOther={true} />}
        </div>
        {children}
>>>>>>> 84c509c (feat: refact components and create card role manager):front/src/shared/authenticated/cards/Card.tsx
      </div>
      <div className="flex mt-4 flex-row justify-start gap-x-4">
        <Icon name="user-guard" height={22} width={18} />
        <p className="text-base">{name}</p>
      </div>
    </div>
  );
};

export default CardType;
