import { FC, PropsWithChildren } from 'react';

type DropDownItemProp = {
  onClick?: () => void;
};

const DropDownItem: FC<PropsWithChildren<DropDownItemProp>> = ({ onClick, children }) => (
  <li
    className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md"
    role="presentation"
    onClick={onClick}
  >
    {children}
  </li>
);

export default DropDownItem;
