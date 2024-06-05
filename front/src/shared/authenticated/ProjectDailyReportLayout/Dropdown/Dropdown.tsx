import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropDownProps {
  classNames?: string;
}

const DropDown: FC<PropsWithChildren<DropDownProps>> = ({ classNames, children }) => (
  <ul
    className={twMerge(
      'bg-white border absolute w-full z-20 left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1',
      classNames,
    )}
  >
    {children}
  </ul>
);
export default DropDown;