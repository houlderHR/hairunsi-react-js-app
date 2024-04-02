import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import IconCard from './IconCard';

interface CardProps {
  title: string;
  iconVisible?: boolean;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ children, title, iconVisible = false }) => {
  const classes = twMerge(
    'p-6 border  cursor-default group hover:border-gray-3 w-full bg-white text-gray-1 rounded-xl duration-300',
    iconVisible ? 'border-gray-3' : 'border-transparent',
  );
  return (
    <div className={classes}>
      <div className="flex flex-row justify-between">
        <h3 className="text-secondary truncate font-medium leading-6">{title}</h3>
        <IconCard withOther={!iconVisible} />
      </div>
      {children}
    </div>
  );
};

export default Card;
