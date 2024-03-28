import { FC } from 'react';
import Icon from '../../../Icon';

interface DropDownListItemProps {
  name: string;
  icon: string;
}

<<<<<<< HEAD
const DropDownListItem: FC<DropDownListItemProps> = ({ name, icon }) => (
=======
const DropDownListItem: React.FC<DropDownListItemProps> = ({ name, icon }) => (
>>>>>>> c1e59ef (fix:lint config)
  <div className="flex hover:font-medium py-3 flex-row gap-4">
    <Icon className="hover:text-red-500" name={icon} />
    <p>{name}</p>
  </div>
);

export default DropDownListItem;
