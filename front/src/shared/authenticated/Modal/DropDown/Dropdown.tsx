import './style.scss';
import { FC, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type DropDownType = {
  id: string;
  name: string;
};
interface DropDownProps {
  items: DropDownType[];
  additionalClassItem?: string;
  additionalClassBlock?: string;
  setValue?: (elem: DropDownType, e?: MouseEvent<HTMLElement>) => void;
  onClickItem?: () => void;
}

const DropDown: FC<DropDownProps> = ({
  items,
  setValue,
  onClickItem,
  additionalClassItem,
  additionalClassBlock,
}) => (
  <ul
    className={twMerge(
      additionalClassBlock,
      'bg-white border absolute w-full z-20 left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1',
    )}
  >
    {items && items.length > 0 ? (
      items.map((item) =>
        setValue ? (
          <li
            className={twMerge(
              additionalClassItem,
              `px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md`,
            )}
            key={item.id}
            role="presentation"
            onClick={(e: MouseEvent<HTMLElement>) => {
              setValue(item, e);
              if (onClickItem) {
                onClickItem();
              }
            }}
          >
            <span className="">{item.name}</span>
          </li>
        ) : (
          <li
            className={twMerge(
              additionalClassItem,
              `px-8 cursor-pointer py-2 hover:bg-gray-50 rounded-md`,
            )}
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
