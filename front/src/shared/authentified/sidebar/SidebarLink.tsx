import React from "react"
import { NavLink } from "react-router-dom";
import UserManager from "../../../pages/userManager";
import Icon from "../../icon";
import PopupMenu from "../../popup";
import { LK_USERMANAGER } from "../../../routes/endpoints";

// Couleur du lien du sidebar en active ou non
const defaultLinkClass: string = `relative group sm:px-6 sm:py-3 px-3 py-3 mt-4 border-r-4 flex cursor-pointer flex-row items-center text-gray-1 gap-x-5 border-r-transparent duration-300 hover:border-secondary-2 hover:bg-secondary-light hover:text-secondary-2`;
const activeLinkClass: string = `!border-r-secondary-2 border-r-4 bg-secondary-light text-secondary-2`;

interface SidebarListProps {
  name: string;
  icon: string;
  url: string;
}

const SidebarLink: React.FC<SidebarListProps> = ({ name, icon, url }) => {
  console.log(url)
  return <>
    <NavLink
      to={`${LK_USERMANAGER}${url}`}
      className={({ isActive }) =>
        isActive ?
          activeLinkClass + " " + defaultLinkClass :
          defaultLinkClass}
    >
      <Icon height="22" width="18" name={icon} />
      <p className="text-base hidden sm:inline-block font-normal">{name}</p>
      <PopupMenu name={name} />
    </NavLink>
  </>
}

export default SidebarLink;