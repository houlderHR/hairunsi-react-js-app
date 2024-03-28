import './style.scss';
import { FC } from 'react';

const DropDown: FC = () => (
  <ul className="bg-white border absolute w-full left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1">
    <li className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md">Super Admin</li>
    <li className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md">Admin</li>

    <li className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md">Modérateur</li>

    <li className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md">Chef</li>

    <li className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md">Employé</li>
  </ul>
);

export default DropDown;
