import './style.scss';
import { FC, MouseEvent } from 'react';

type DropDownType = {
  id: string;
  name: string;
};
interface DropDownProps {
  items: DropDownType[];
  setValue?: (elem: DropDownType, e?: MouseEvent<HTMLElement>) => void;
  onClickItem?: () => void;
}

const DropDown: FC<DropDownProps> = ({ items, setValue, onClickItem }) => (
  <ul className="bg-white border absolute w-full z-20 left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1">
    {items.length > 0 ? (
      items.map((item) =>
        setValue ? (
          <li
            className="px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md"
            key={item.id}
            role="presentation"
            onClick={(e: MouseEvent<HTMLElement>) => {
              setValue(item, e);
              if (onClickItem) {
                onClickItem();
              }
            }}
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
      )
    ) : (
      <li className="text-gray-1 text-center">----- Liste vide -----</li>
    )}
  </ul>
);
export default DropDown;
