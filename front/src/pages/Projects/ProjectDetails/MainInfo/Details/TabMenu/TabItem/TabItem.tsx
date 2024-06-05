import { FC, useState } from 'react';
import Icon from '../../../../../../../shared/Icon';

type TabItemProps = {
  id: number;
  name: string;
  icon: string;
  activeTab?: number;
  onClick?: (id: number) => void;
};

const TabItem: FC<TabItemProps> = ({ id, name, icon, onClick, activeTab }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={id}
      onClick={() => onClick!(id)}
      className={`px-4 py-3 rounded-xl focus:outline-none ${
        activeTab === id ? 'bg-white text-secondary-2' : 'text-gray-1'
      }`}
    >
      <Icon className="block lg:hidden" height={22} width={18} name={icon} />
      {isHovered && (
        <div className="absolute lg:hidden bottom-10 mt-2 p-2 bg-gray-800 text-white rounded-lg shadow-lg">
          {name}
        </div>
      )}
      <p className="hidden lg:block">{name}</p>
    </button>
  );
};

export default TabItem;
