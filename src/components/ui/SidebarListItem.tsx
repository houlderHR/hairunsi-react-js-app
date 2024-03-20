import React from "react"
import Icon from "./Icon";

interface SidebarListProps {
  name: string;
  icon: string;
  active?: boolean;
}

const SidebarListItem: React.FC<SidebarListProps> = ({name,icon,active = false}) => {
  return <>
    <div className={`px-6 py-3 mt-4 border-r-4 flex cursor-pointer flex-row items-center text-gray-1 gap-x-5 ${active ? "border-secondary-2 bg-secondary-light text-secondary-2" : "border-r-transparent"}`}>
      <Icon height="22" width="18" name={icon} />
      <p className="text-base font-normal">{name}</p>
    </div>
  </>
}

export default SidebarListItem;