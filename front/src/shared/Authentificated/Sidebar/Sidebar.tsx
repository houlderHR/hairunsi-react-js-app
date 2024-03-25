import React from 'react';
import SidebarLink from './SidebarLink';
import routes from '../../../routes/paths';

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="lg:w-72 sm:w-52 w-16 bg-white border border-white-1 left-0 h-full fixed">
        <SidebarLink url={routes.userManager.subpaths.role.path} name="Rôle" icon="user-guard" />
        <SidebarLink
          url={routes.userManager.subpaths.type.path}
          name="Type"
          icon="user-notification"
        />
        <SidebarLink url={routes.userManager.subpaths.user.path} name="Utilisateurs" icon="user" />
      </div>
    </>
  );
};

export default Sidebar;
