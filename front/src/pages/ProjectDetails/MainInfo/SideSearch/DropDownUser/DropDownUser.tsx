import { FC, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { UserProjectType } from '../constant';
import UserProjectCard from '../UserProjectCard';

interface DropDownProps {
  items: UserProjectType[];
  additionalClassItem?: string;
  additionalClassBlock?: string;
  setValue?: (elem: UserProjectType, e?: MouseEvent<HTMLElement>) => void;
  onClickItem?: () => void;
}

const DropDownUser: FC<DropDownProps> = ({
  items,
  setValue,
  onClickItem,
  additionalClassItem,
  additionalClassBlock,
}) => (
  <ul
    className={twMerge(
      additionalClassBlock,
      'bg-white border absolute w-full z-20 left-0 mt-2 max-h-62 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1',
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
            <UserProjectCard
              additionalClass="!border-none !py-1"
              user={item}
              showCheckbox={false}
            />
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
            <UserProjectCard
              additionalClass="!border-none !py-1"
              user={item}
              showCheckbox={false}
            />
          </li>
        ),
      )
    ) : (
      <li className="text-gray-1 text-center">----- Liste vide -----</li>
    )}
  </ul>
);
export default DropDownUser;
