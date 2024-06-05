import { FC } from 'react';
import Menu from './Menu';

const NavBarProject: FC<{ id: string; image: string; name: string }> = ({ id, image, name }) => (
  <div className="sticky w-full top-14 z-40 border-b bg-white border-gray-2 shadow-sm">
    <div className="pt-[3px] pb-[12px] flex items-center pl-4 ">
      <div className="flex gap-4 items-center">
        <div className="h-10 w-10">
          <img className="object-contain" src={image} alt="" />
        </div>
        <div className="flex flex-col justify-start items-start">
          <h2 className="text-[22px] text-primary font-medium leading-[25.28px]">{name}</h2>
        </div>
      </div>
    </div>
    <Menu id={id} />
  </div>
);

export default NavBarProject;
