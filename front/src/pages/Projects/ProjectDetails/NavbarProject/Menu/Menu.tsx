import { FC, useState } from 'react';
import routes from '../../../../../routes/paths';
import Icon from '../../../../../shared/Icon';
import MenuItem from './MenuItem';

const Menu: FC<{ id: string }> = ({ id }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const onclikedMenu = () => {
    setIsDropdown(!isDropdown);
  };
  return (
    <nav className="lg:pl-[116px] transition ease-in-out duration-500">
      <div
        role="presentation"
        className="absolute z-[1000] hover:cursor-pointer right-2 top-3 lg:hidden"
        onClick={onclikedMenu}
      >
        {isDropdown ? <Icon name="x" size={20} /> : <Icon name="bars-solid" size={20} />}
      </div>
      {isDropdown && (
        <ul className="absolute  transition shadow-bottom bg-white w-full  px-4 border-b-1 pb-5 flex lg:hidden flex-col text-gray-4 text-xs font-bold leading-[18px] list-none">
          <MenuItem
            url={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.main_info.path}`}
            name="INFORMATIONS GENERALES"
            additionalClassActive="px-2 py-2 !border-none text-secondary hover:bg-white-1"
            additionalClassInactive="hover:bg-white-1 px-2 py-2"
            onclikedMenu={onclikedMenu}
          />
          <MenuItem
            url={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.daily.path}`}
            name="DAILY"
            additionalClassActive="px-2 py-2 !border-none text-secondary hover:bg-white-1"
            additionalClassInactive="hover:bg-white-1 px-2 py-2"
            onclikedMenu={onclikedMenu}
          />
          <MenuItem
            url={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.report.path}`}
            name="COMPTE RENDU"
            additionalClassActive="px-2 py-2 !border-none text-secondary hover:bg-white-1"
            additionalClassInactive="hover:bg-white-1 px-2 py-2"
            onclikedMenu={onclikedMenu}
          />
        </ul>
      )}
      <ul className="hidden lg:block lg:relative lg:flex lg:gap-x-7 text-gray-4 text-xs font-bold leading-[18px] list-none">
        <MenuItem
          url={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.main_info.path}`}
          name="INFORMATIONS GENERALES"
          onclikedMenu={onclikedMenu}
        />
        <MenuItem
          url={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.daily.path}`}
          name="DAILY"
          onclikedMenu={onclikedMenu}
        />
        <MenuItem
          url={`${routes.authentified.subpaths.project.path}/${id}/${routes.authentified.subpaths.project.subpaths.id.subpaths.report.path}`}
          name="COMPTE RENDU"
          onclikedMenu={onclikedMenu}
        />
      </ul>
    </nav>
  );
};

export default Menu;
