import React from "react"
import Icon from "./Icon";
import PopupMenu from "./Popup";

interface SidebarListProps {
  name: string;
  icon: string;
  active?: boolean;
}

const SidebarListItem: React.FC<SidebarListProps> = ({ name, icon, active = false }) => {
  return <>
    <div className={`relative group sm:px-6 sm:py-3 px-3 py-3 mt-4 border-r-4 flex cursor-pointer flex-row items-center text-gray-1 gap-x-5 ${active ? "border-secondary-2 bg-secondary-light text-secondary-2" : "border-r-transparent"} duration-300 hover:border-secondary-2 hover:bg-secondary-light hover:text-secondary-2`}>
      <Icon height="22" width="18" name={icon} />
      <p className="text-base hidden sm:inline-block font-normal">{name}</p>
      <PopupMenu name={name} />
    </div>
  </>
}

export default SidebarListItem;