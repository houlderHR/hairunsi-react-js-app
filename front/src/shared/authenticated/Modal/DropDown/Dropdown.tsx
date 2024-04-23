import './style.scss';
import { FC } from 'react';
import { PermissionDto } from '../../../../pages/dto/permission.dto';

interface DropDownProps {
  items: PermissionDto[];
  setValue?: (elem: PermissionDto) => void;
}

const DropDown: FC<DropDownProps> = ({ items, setValue }) => (
  <ul className="bg-white border absolute w-full left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1">
    {items.map((item) =>
      setValue ? (
        <li
          className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md"
          key={item.id}
          role="presentation"
          onClick={() => setValue(item)}
        >
          {item.name}
        </li>
      ) : (
        <li
          className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md"
          key={item.id}
          role="presentation"
        >
          {item.name}
        </li>
      ),
    )}
  </ul>
);
export default DropDown;
