import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import ItemDropdown from '../../ItemDropdown';

interface DropDownProps {
  additionalClass?: string;
}

const MenuDropDown = {
  Delete: {
    icon: 'x',
    value: 'Supprimer',
    hoveredColor: 'hover:!text-red-700',
  },
  Renewal: {
    icon: 'renewal',
    value: 'Renouvellement',
    hoveredColor: 'hover:!text-black',
  },
  History: {
    icon: 'history',
    value: 'Historique',
    hoveredColor: 'hover:!text-black',
  },
};

const OptionMenuDropdown: FC<DropDownProps> = ({ additionalClass }) => (
  <ul
    className={twMerge(
      additionalClass,
      'bg-white border relative w-full z-20 left-0 mt-2 max-h-32 overflow-y-scroll border-gray-50 shadow  rounded px-4 py-1',
    )}
  >
    <ItemDropdown
      additionalClassItem="!mx-0 text-xs w-full text-center !rounded-none"
      icon={MenuDropDown.Delete.icon}
      name={MenuDropDown.Delete.value}
      hoveredColor={MenuDropDown.Delete.hoveredColor}
    />
    <ItemDropdown
      additionalClassItem="!mx-0 text-xs w-full text-center !rounded-none"
      icon={MenuDropDown.Renewal.icon}
      name={MenuDropDown.Renewal.value}
      hoveredColor={MenuDropDown.Renewal.hoveredColor}
    />
    <ItemDropdown
      additionalClassItem="!mx-0 text-xs w-full text-center !rounded-none"
      icon={MenuDropDown.History.icon}
      name={MenuDropDown.History.value}
      hoveredColor={MenuDropDown.History.hoveredColor}
    />
  </ul>
);
export default OptionMenuDropdown;
