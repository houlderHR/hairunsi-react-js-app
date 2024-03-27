import React from 'react';
import IconCard from '../IconCard';
import Icon from '../../../Icon';
import { twMerge } from 'tailwind-merge';
import CardContentType from './CardContentType';
import Card from '../Card';

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
    <>
      <Card title={title} children={<CardContentType name={name} />} />
    </>
  );
};

export default CardType;
