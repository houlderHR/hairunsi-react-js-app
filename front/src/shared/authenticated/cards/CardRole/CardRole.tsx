import React from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../Card';
import CardContentRole from './CardContentRole';

interface CardTypeProps {
  title: string;
  items: string[];
  iconVisible?: boolean;
}

// CardType
const CardRole: React.FC<CardTypeProps> = ({ title, items, iconVisible = false }) => {
  const classes = twMerge(
    'p-6 border  cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300',
    iconVisible ? 'border-gray-3' : 'border-transparent',
  );
  return (
    <>
      <Card title={title} children={<CardContentRole items={items} />} />
    </>
  );
};

export default CardRole;
