import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import PermissionDto from '../../../../dto/permission.dto';

interface CardItemRoleProps {
  icon?: string;
  id: string;
  title: string;
  addClass?: string;
  deleteItem?: (item: PermissionDto) => void;
}

const CardItemRole: FC<CardItemRoleProps> = ({ id, title, icon, addClass, deleteItem }) => (
  <div
    className={twMerge(
      addClass,
      'flex justify-items-center border text-black-1 text-nowrap text-10px py-1 px-2',
    )}
  >
    <span>{title}</span>
    {icon && deleteItem && (
      <div
        className="h-4 w-4 ml-1"
        role="presentation"
        onClick={() => deleteItem({ id, name: title })}
      >
        <img className="bg-no-repeat bg-contain w-full h-full" src={`/icon/${icon}.svg`} alt="" />
      </div>
    )}
  </div>
);

export default CardItemRole;
