import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../../../routes/paths';

const menu = {
  active: 'border-b-2 border-secondary-2 text-secondary',
  inactive: '!border-none !text-gray-4',
};

const Menu: FC<{ id: string }> = ({ id }) => (
  <nav className="pl-[116px]">
    <ul className="flex gap-x-7 text-gray-4 text-xs font-bold leading-[18px] list-none">
      <NavLink
        to={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.main_info.path}`}
        className={({ isActive }) => (isActive ? menu.active : menu.inactive)}
      >
        <li>INFORMATIONS GENERALES</li>
      </NavLink>
      <NavLink
        to={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.daily.path}`}
        className={({ isActive }) => (isActive ? menu.active : menu.inactive)}
      >
        <li className="cursor-pointer">DAILY</li>
      </NavLink>
      <NavLink
        to={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.report.path}`}
        className={({ isActive }) => (isActive ? menu.active : menu.inactive)}
      >
        <li className="cursor-pointer">COMPTE RENDU</li>
      </NavLink>
    </ul>
  </nav>
);

export default Menu;
