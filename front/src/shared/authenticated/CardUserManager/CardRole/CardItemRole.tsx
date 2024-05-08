import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardItemRoleProps {
  title: string;
  icon?: string;
  addClass: string;
  deleteItem?: (elem: string) => void;
}

const CardItemRole: FC<CardItemRoleProps> = ({ title, icon, addClass, deleteItem }) => (
  <div
    className={twMerge(
      addClass,
      'flex justify-items-center border text-black-1 text-nowrap text-10px py-4px px-8px',
    )}
  >
    <span>{title}</span>
    {icon && deleteItem && (
      <div className="h-4 w-4 ml-1" role="presentation" onClick={() => deleteItem(title)}>
        <img className="bg-no-repeat bg-contain w-full h-full" src={`/icon/${icon}.svg`} alt="" />
      </div>
    )}
  </div>
);

export default CardItemRole;
