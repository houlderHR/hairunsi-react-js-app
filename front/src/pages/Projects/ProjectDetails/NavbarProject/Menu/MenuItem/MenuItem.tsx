import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type MenuItemProps = {
  url: string;
  name: string;
  additionalClassActive?: string;
  additionalClassInactive?: string;
  onclikedMenu: () => void;
};

const MenuItem: FC<MenuItemProps> = ({
  name,
  url,
  additionalClassActive,
  additionalClassInactive,
  onclikedMenu,
}) => {
  const menu = {
    active: 'border-b-2 border-secondary-2 text-secondary',
    inactive: '!border-none !text-gray-4',
  };

  return (
    <NavLink
      onClick={onclikedMenu}
      to={url}
      className={({ isActive }) =>
        isActive
          ? `${menu.active}  ${additionalClassActive}`
          : `${menu.inactive} ${additionalClassInactive}`
      }
    >
      <li className=" w-full">{name}</li>
    </NavLink>
  );
};

export default MenuItem;
