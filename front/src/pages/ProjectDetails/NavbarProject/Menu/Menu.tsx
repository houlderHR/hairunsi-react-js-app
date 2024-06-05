import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../../../routes/paths';
import Icon from '../../../../shared/Icon';

const menu = {
  active: 'border-b-2 border-secondary-2 text-secondary',
  inactive: '!border-none !text-gray-4',
};

const Menu: FC<{ id: string }> = ({ id }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const onclikedMenu = () => {
    setIsDropdown(!isDropdown);
  };
  return (
    <nav className="md:pl-[116px] transition ease-in-out duration-500">
      <div
        role="presentation"
        className="absolute z-[1000] hover:cursor-pointer right-2 top-3 md:hidden"
        onClick={onclikedMenu}
      >
        <Icon name="bars-solid" size={20} />
      </div>
      {isDropdown && (
        <ul className="absolute  transition shadow-bottom bg-white w-full  px-4 border-b-1 pb-5 flex md:hidden flex-col text-gray-4 text-xs font-bold leading-[18px] list-none">
          <NavLink
            onClick={onclikedMenu}
            to={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.main_info.path}`}
            className={({ isActive }) =>
              isActive
                ? `${menu.active}  px-2 py-2 !border-none text-secondary hover:bg-white-1`
                : `${menu.inactive} hover:bg-white-1 px-2 py-2`
            }
          >
            <li className=" w-full">INFORMATIONS GENERALES</li>
          </NavLink>
          <NavLink
            onClick={onclikedMenu}
            to={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.daily.path}`}
            className={({ isActive }) =>
              isActive
                ? `${menu.active} hover:bg-white-1 px-2 py-2 !border-b-none !border-none text-secondary`
                : `${menu.inactive} hover:bg-white-1 px-2 py-2`
            }
          >
            <li className="cursor-pointer">DAILY</li>
          </NavLink>
          <NavLink
            onClick={onclikedMenu}
            to={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.report.path}`}
            className={({ isActive }) =>
              isActive
                ? `${menu.active} hover:bg-white-1 px-2 py-2 !border-b-none !border-none text-secondary`
                : `${menu.inactive} hover:bg-white-1 px-2 py-2`
            }
          >
            <li className="cursor-pointer">COMPTE RENDU</li>
          </NavLink>
        </ul>
      )}
      <ul className="hidden md:block md:relative md:flex md:gap-x-7 text-gray-4 text-xs font-bold leading-[18px] list-none">
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
};

export default Menu;
