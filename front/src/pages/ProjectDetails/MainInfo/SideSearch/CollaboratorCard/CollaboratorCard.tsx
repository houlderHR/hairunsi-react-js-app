import { FC, useState } from 'react';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../../shared/Icon';
import InputCheckbox from '../../InputCheckbox';

type CollaboratorCardType = {
  idCheckbox: string;
  showCheckbox: boolean;
};

const CollaboratorCard: FC<CollaboratorCardType> = ({ idCheckbox, showCheckbox = false }) => {
  const [selectValue, setSelectValue] = useState<{ name: string; id: string }>({
    id: '0',
    name: 'Responsable',
  });
  const [showRole, setShowRole] = useState(false);
  const dropdownItems = [
    { id: '0', name: 'Responsable' },
    { id: '1', name: 'Collaborateur' },
  ];
  const dropdownItemsEdit = [
    { id: '0', name: 'Supprimer', icon: 'x', hoveredColor: 'hover:!text-red-700' },
    { id: '1', name: 'Historique', icon: 'history', hoveredColor: 'hover:!text-black' },
  ];
  const onclickItem = () => {
    setShowRole((s) => !s);
  };

  return (
    <div className="border border-white-1 flex gap-x-28 rounded-xl py-2 px-3 relative">
      <div className="space-y-2">
        <div className="flex gap-x-2">
          <div className="w-10 h-10 bg-blue-200 rounded-full">
            <img src="/images/user.png" className="object-contain rounded-full" alt="" />
          </div>
          <div className="flex flex-col gap-y-[2px]">
            <span className="text-secondary text-md font-medium leading-[18.38px]">
              Wade Warren
            </span>
            <span className="text-xs text-secondary-2 leading-[13.79px] font-medium">En cours</span>
          </div>
        </div>
        <div>
          <div className="relative">
            <div
              role="presentation"
              onClick={onclickItem}
              className="flex rounded cursor-pointer px-[11px] py-1 flex-row justify-center justify-between items-center w-full h-full px-5 bg-white-2 text-black-1 hover:bg-gray-50;"
            >
              <div className="text-xs">{selectValue?.name}</div>
              <Icon name="chevron-down" width={16} height={16} className="text-black-1" />
            </div>
            {showRole && (
              <DropDown
                onClickItem={onclickItem}
                setValue={setSelectValue}
                additionalClassBlock="!px-0 !mx-0 !overflow-auto top-42 !absolute"
                additionalClassItem="!mx-0 !px-0 text-xs w-full text-center !rounded-none"
                items={dropdownItems}
              />
            )}
          </div>
        </div>
      </div>
      {showCheckbox && (
        <div className="mt-3">
          <InputCheckbox idCheckbox={idCheckbox} />
        </div>
      )}
      <div className="absolute w-7 h-7 flex justify-center items-center top-4 right-4 cursor-pointer">
        <Icon name="3points" className="  text-gray-4" width={4} height={14} />
      </div>
      <div className="absolute z-10 w-32 rounded right-5 top-9">
        <DropDown
          onClickItem={onclickItem}
          // setValue={setSelectValue}
          additionalClassBlock="!px-0 !mx-0 !overflow-auto top-42"
          additionalClassItem="!mx-0 !px-0 text-xs text-gray-4 w-full text-center !rounded-none"
          items={dropdownItemsEdit}
        />
      </div>
    </div>
  );
};

export default CollaboratorCard;
