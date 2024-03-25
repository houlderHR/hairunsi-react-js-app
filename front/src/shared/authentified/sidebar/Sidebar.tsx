import React from "react";
import SidebarLink from "./SidebarLink";

const Sidebar: React.FC = () => {
  return <>
    <div className="lg:w-72 sm:w-52 w-16 bg-white border border-white-1 left-0 h-full fixed">
      <SidebarLink url="role" name="Rôle" icon="userGuard" />
      <SidebarLink url="type" name="Type" icon="userNotification" />
      <SidebarLink url="user" name="Utilisateurs" icon="user" />
    </div>
  </>
}

export default Sidebar;