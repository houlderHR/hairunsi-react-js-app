import { FC, useState } from 'react';
import PermissionDto from '../../../../dto/permission.dto';
import CardUserManager from '../CardUserManager';
import CardItemRole from './CardItemRole';

interface CardRoleProps {
  title: string;
  isRemovable?: boolean;
  items: PermissionDto[];
  maxElement: number;
  iconVisible?: boolean;
  openUpdateModal?: () => void;
  openDeleteModal?: () => void;
}

const CardRole: FC<CardRoleProps> = ({
  title,
  items,
  isRemovable,
  maxElement,
  openUpdateModal = () => {},
  openDeleteModal = () => {},
  iconVisible = false,
}) => {
  const [isDrop, setIsDrop] = useState(false);
  return (
    <CardUserManager
      title={title}
      isRemovable={isRemovable}
      iconVisible={iconVisible}
      openUpdateModal={openUpdateModal}
      openDeleteModal={openDeleteModal}
    >
      <div className="transition ease-in duration-300 flex mt-4 gap-2 flex-wrap justify-start">
        {!isDrop
          ? items
              .filter((_, index) => index < maxElement)
              .map((item) => (
                <CardItemRole
                  id={item.id}
                  addClass="rounded border-secondary-3 "
                  title={item.name}
                  key={item.id}
                />
              ))
          : items.map((item) => (
              <CardItemRole
                id={item.id}
                addClass="rounded border-secondary-3 "
                title={item.name}
                key={item.id}
              />
            ))}
        {items.length > maxElement && (
          <button
            type="button"
            onClick={() => {
              setIsDrop((s) => !s);
            }}
            className="bg-secondary-3 flex px-8px text-sm rounded transition ease-in duration-300  text-white h-[25px] hover:bg-gray-3"
          >
            {isDrop ? (
              <span className="m-0 pt-[2px]">x</span>
            ) : (
              <span className="mt-0 p-0">...</span>
            )}
          </button>
        )}
      </div>
    </CardUserManager>
  );
};

export default CardRole;
