import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import routes from '../../../routes/paths';
import Icon from '../../Icon';
import PopupMenu from '../../Popup';
import classes from './style';

interface SidebarListProps {
  name: string;
  icon: string;
  url: string;
}

const SidebarLink: React.FC<SidebarListProps> = ({ name, icon, url }) => {
  const activeLink = twMerge(classes.inactiveLink, classes.activeLink);

  return (
    <NavLink
      to={`${routes.authentified.subpaths.userManager.path}${url}`}
      className={({ isActive }) => (isActive ? activeLink : classes.inactiveLink)}
    >
      <Icon height="22" width="18" name={icon} />
      <p className="text-base hidden sm:inline-block font-normal">{name}</p>
      <PopupMenu name={name} />
    </NavLink>
  );
};

export default SidebarLink;
