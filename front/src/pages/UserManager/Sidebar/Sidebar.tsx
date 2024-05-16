import { FC } from 'react';
import useUserPermission from '../../../hooks/useUserPermission';
import routes from '../../../routes/paths';
import PERMISSIONS from '../../../utils/permissions';
import SidebarLink from './SidebarLink';

const Sidebar: FC = () => {
  const { allowPermission } = useUserPermission();

  return (
    <div className="lg:w-72 sm:w-52 w-16 bg-white border border-white-1 left-0 h-full fixed z-50">
      <SidebarLink
        url={routes.authentified.subpaths.userManager.subpaths.role.path}
        name="Rôle"
        icon="user-guard"
      />
      {allowPermission(PERMISSIONS.viewAll) && (
        <SidebarLink
          url={routes.authentified.subpaths.userManager.subpaths.type.path}
          name="Type"
          icon="user-notification"
        />
      )}
      <SidebarLink
        url={routes.authentified.subpaths.userManager.subpaths.user.path}
        name="Utilisateurs"
        icon="user"
      />
    </div>
  );
};

export default Sidebar;
