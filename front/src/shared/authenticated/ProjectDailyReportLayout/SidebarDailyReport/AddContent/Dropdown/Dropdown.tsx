import { FC, PropsWithChildren } from 'react';

interface DropDownProps {}

const DropDown: FC<PropsWithChildren<DropDownProps>> = ({ children }) => (
  <ul className="bg-white border absolute w-full z-20 left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1">
    {children}
  </ul>
);
export default DropDown;
