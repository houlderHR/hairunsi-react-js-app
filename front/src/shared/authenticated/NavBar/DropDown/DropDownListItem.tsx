import { FC } from 'react';
import Icon from '../../../Icon';

interface DropDownListItemProps {
  name: string;
  icon: string;
}

const DropDownListItem: FC<DropDownListItemProps> = ({ name, icon }) => (
  <div className="flex hover:font-medium py-3 flex-row gap-4">
    <Icon className="hover:text-red-500" name={icon} />
    <p>{name}</p>
  </div>
);

export default DropDownListItem;
