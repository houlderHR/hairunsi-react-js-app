import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '../../../../../../shared/Icon';

type ItemDropdownProps = {
  icon?: string;
  additionalClassItem?: string;
  name: string;
  hoveredColor?: string;
  onClick?: () => void;
  setValue?: (elem: string) => void;
};

const ItemDropdown: FC<ItemDropdownProps> = ({
  icon,
  additionalClassItem,
  name,
  hoveredColor,
  onClick,
  setValue,
}) => (
  <div
    className={twMerge(
      additionalClassItem,
      `px-4 cursor-pointer py-2 hover:bg-gray-50 rounded-md ${
        icon && `flex items-center gap-x-4`
      } ${hoveredColor}`,
    )}
    role="presentation"
    onClick={() => {
      if (setValue) setValue(name);
      if (onClick) {
        onClick();
      }
    }}
  >
    {icon && <Icon name={icon} size={12} />}
    <span>{name}</span>
  </div>
);

export default ItemDropdown;
