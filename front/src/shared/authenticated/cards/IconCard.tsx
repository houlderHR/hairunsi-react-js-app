import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';

interface IconBoxProps {
  withOther?: boolean;
}
// Icone de trash et edit chaque CardType
const IconCardType: FC<IconBoxProps> = ({ withOther }) => {
  const classes = twMerge(
    'flex flex-row gap-x-4 items-center group-hover:opacity-100 duration-300 ',
    withOther ? 'opacity-0' : 'opacity-100',
  );

  return (
    <div className={classes}>
      <Icon name="trash" className="hover:text-red-400 duration-300" height={15} width={11.67} />
      <span className="w-px h-4 bg-gray-3" />
      <Icon width={11.67} className="hover:text-secondary duration-300" height={15} name="pen" />
    </div>
  );
};

export default IconCardType;