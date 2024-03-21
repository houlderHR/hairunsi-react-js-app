import SidebarListItem from "./ui/SidebarListItem";

const Sidebar = () => {
  return <>
    <div className="lg:w-72 sm:w-52 w-16 bg-white border border-white-1 left-0 h-full fixed">
      <SidebarListItem name="Rôle" icon="userGuard"/>
      <SidebarListItem name="Type" icon="userNotification" active={true}/>
      <SidebarListItem name="Utilisateurs" icon="user"/>
    </div>
  </>
}

export default Sidebar;