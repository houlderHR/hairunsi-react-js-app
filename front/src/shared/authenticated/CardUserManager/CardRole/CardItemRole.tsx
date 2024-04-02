import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const CardItemRole: FC<{ title: string; icon?: string; addClass: string }> = ({
  title,
  icon,
  addClass,
}) => (
  <div
    className={twMerge(
      addClass,
      'flex justify-items-center border text-black-1 text-nowrap text-10px py-4px px-8px',
    )}
  >
    <span>{title}</span>
    {icon && (
      <div className="h-4 w-4 ml-1">
        <img className="bg-no-repeat bg-contain w-full h-full" src={`/icon/${icon}.svg`} alt="F4" />
      </div>
    )}
  </div>
);

export default CardItemRole;
