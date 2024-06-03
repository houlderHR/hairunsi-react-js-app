import { FC, useState } from 'react';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../../shared/Icon';
import InputCheckbox from '../../InputCheckbox';

type Contract = {
  name: string;
  startContrat: string;
  endContrat: string;
  isEndContract: boolean;
};
type UserCardType = {
  name: string;
  image: string;
  post: string;
  fonction: {
    isResponsable: boolean;
    isActif: boolean;
  };
  contrat: Contract;
};

type CollaboratorCardType = {
  idCheckbox: string;
  showCheckbox: boolean;
  sideIcon?: string;
  user?: UserCardType;
};

const CollaboratorCard: FC<CollaboratorCardType> = ({
  idCheckbox,
  showCheckbox = false,
  sideIcon,
  user,
}) => {
  const [selectValue, setSelectValue] = useState<{ name: string; id: string }>({
    id: '0',
    name: 'Responsable',
  });
  const [showOption, setShowOption] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const dropdownItems = [
    { id: '0', name: 'Responsable' },
    { id: '1', name: 'Collaborateur' },
  ];
  const dropdownItemsEdit = [
    { id: '0', name: 'Supprimer', icon: 'x', hoveredColor: 'hover:!text-red-700' },
    { id: '1', name: 'Historique', icon: 'history', hoveredColor: 'hover:!text-black' },
  ];
  const onclickDropdownItem = () => {
    setShowRole((preview) => !preview);
  };
  const selectMenu = () => {
    setShowOption((preview) => !preview);
  };
  return (
    <div className="border border-white-1 flex gap-x-28 rounded-xl py-2 px-3 relative">
      <div>
        <div className="space-y-2">
          <div className="flex gap-x-2">
            <div className="w-10 h-10 bg-blue-200 rounded-full">
              <img src={user?.image} className="object-contain rounded-full" alt="" />
            </div>
            <div className="flex flex-col gap-y-[2px]">
              <span className="text-secondary text-md font-medium leading-[18.38px]">
                {user?.name}
              </span>
              {showCheckbox &&
                (isChecked ? (
                  <span className="text-xs text-secondary-2 leading-[13.79px] font-medium">
                    En cours
                  </span>
                ) : (
                  <span className="text-xs text-gray-1 leading-[13.79px] font-medium">
                    En supens
                  </span>
                ))}
              {!showCheckbox && (
                <span className="text-xs text-secondary-2 leading-[13.79px] font-medium">
                  {user?.post}
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="relative max-w-[120px]">
              <div
                role="presentation"
                onClick={onclickDropdownItem}
                className="flex rounded  cursor-pointer px-[11px] py-1 flex-row justify-center justify-between items-center w-full h-full px-5 bg-white-2 text-black-1 hover:bg-gray-50;"
              >
                <div className="text-xs">{selectValue?.name}</div>
                <Icon name="chevron-down" width={16} height={16} className="text-black-1" />
              </div>
              {showRole && (
                <DropDown
                  onClickItem={onclickDropdownItem}
                  setValue={setSelectValue}
                  additionalClassBlock="!px-0 !mx-0 !overflow-auto top-42 !absolute"
                  additionalClassItem="!mx-0 !px-0 text-xs w-full text-center !rounded-none"
                  items={dropdownItems}
                />
              )}
            </div>
          </div>
        </div>
        {user && !showCheckbox && (
          <div className="mt-3 text-gray-1">
            <span className="text-md font-medium">Contrat 1</span>
            <div className="flex gap-x-2 text-xs mt-1 font-normal leading-[14px]">
              {user?.contrat.isEndContract ? (
                <>
                  <Icon name="right" size={16} />
                  <span>Terminé</span>
                </>
              ) : (
                // 22 Fév 2022 08 Juil 2022
                <>
                  <span>{user.contrat.startContrat}</span>
                  <Icon name="right-fleche" height={12} width={16} />
                  <span>{user.contrat.endContrat}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {user && showCheckbox && (
        <div className="mt-3 absolute right-28">
          <InputCheckbox isChecked={user.fonction.isActif} idCheckbox={idCheckbox} />
        </div>
      )}
      {sideIcon && (
        <div
          role="presentation"
          onClick={selectMenu}
          className="absolute w-7 h-7 flex justify-center items-center top-4 right-4 cursor-pointer"
        >
          <Icon name={sideIcon} className="  text-gray-4" size={14} />
        </div>
      )}
      {showOption && sideIcon !== 'x' && (
        <div className="absolute z-10 w-32 rounded right-5 top-9">
          <DropDown
            additionalClassBlock="!px-0 !mx-0 !overflow-auto top-42"
            additionalClassItem="!mx-0 !px-0 text-xs text-gray-4 w-full text-center !rounded-none"
            items={dropdownItemsEdit}
          />
        </div>
      )}
    </div>
  );
};

export default CollaboratorCard;
