import React from "react";
import Icon from "./ui/Icon";

const Navbar: React.FC = () => {
  return <>
    <div className="bg-primary pl-5 pr-6 text-white flex justify-between items-center h-14 w-full">
      <div className="flex items-center">
        <Icon name="x" size="18.3"/>
        <img src="/logo/logo_hairun.png" className="h-8 w-[85px] ml-10" alt="logo_hairun" />
      </div>
      <div className="flex h-full items-center justify-center p-2.5">
        <span className="bg-secondary h-9 w-9 rounded-full flex items-center justify-center">
          <Icon size="20" name="notification"/>
        </span>
        <span className="inline-block w-px mx-4 h-full bg-gray-50 opacity-30"></span>
        <div className="flex gap-x-4 items-center justify-center">
          <img src="/image/profile.png" className="w-8 h-8 rounded-full border-white border" alt="" />
          <div>
            <h2 className="text-base font-medium leading-4">Darlene Robertson</h2>
            <p className="text-xs font-normal">Web Designer</p>
          </div>
          <Icon width="10" height="5" name="SharpArrowDropDown"/>
        </div>
      </div>
    </div>
  </>
}

export default Navbar;