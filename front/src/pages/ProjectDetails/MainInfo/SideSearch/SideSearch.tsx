import { ChangeEvent, FC, useState } from 'react';
import CardItemRole from '../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import Icon from '../../../../shared/Icon';
import InputIcon from '../../../../shared/inputs/InputIcon';
import { mockUserCollaborator, mockUserResponsable } from './constant';
import DropDownUser from './DropDownUser';
import UserProjectCard from './UserProjectCard';

const SideSearch: FC = () => {
  const [userResponsable, setUserResponsable] = useState(mockUserResponsable);
  const [userCollaborator, setUserCollaborator] = useState(mockUserCollaborator);
  const [userSelected, setUserSelected] =
    useState<{ id: string; name: string }[]>(mockUserResponsable);
  const [showDropDownSearch, setShowDropDownSearch] = useState(false);

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    // setSearch(e.target.value);
    // const result = permissions.filter((item) => {
    //   const permissionName = item.name.toUpperCase();
    //   const valueRemovedSpace = e.target.value
    //     .split(' ')
    //     .filter((_item) => _item !== '')
    //     .join(' ');
    //   return permissionName.includes(valueRemovedSpace.toUpperCase());
    // });
    // setSearchPermissions(result);
  };

  return (
    <div className="h-full w-full relative lg:w-[492px] bg-white border border-white-1 rounded-xl">
      <div
        className="!bg-white rounded-xl"
        role="presentation"
        onClick={() => setShowDropDownSearch((preview) => !preview)}
      >
        <InputIcon
          icon="search"
          iconColor="text-gray-10"
          onChange={onSearchInput}
          additionalInputClass="placeholder:text-gray-1"
          additionalClass="rounded-t-xl !rounded-b-none h-[56px] bg-white-2 sticky top-0 right-0 z-[500]"
          placeholder="Rechercher pour ajouter des collaborateurs"
        />
        {showDropDownSearch && (
          <div className="absolute z-50 w-full">
            <DropDownUser items={userResponsable} />
          </div>
        )}
      </div>
      <div className="flex flex-col h-full !rounded-xl !relative">
        {/* {userSelected.length > 0 && (
          <div className="relative bg-white z-40">
            <div className="border relative pb-6">
              <div className="pt-2 pb-6 px-5  flex flex-wrap gap-2">
                {userSelected.map((userItem) => (
                  <CardItemRole
                    id={userItem.id}
                    addClass="!rounded-lg border-gray-4 !py-px"
                    icon="x-1"
                    deleteItem={() => {}}
                    title={userItem.name}
                  />
                ))}
              </div>
              <div className="absolute z-40 left-8 bottom-2 flex items-center gap-x-2 text-[10px] text-secondary-2 mt-1 font-normal rounded-md px-3 py-[2px] hover:bg-secondary-5 transition ease-in-out duration-300 hover:cursor-pointer">
                <Icon name="right" size={10} />
                <span>Ajouter</span>
              </div>
            </div>
          </div>
        )} */}
        <div className="relative -mt-2 h-full ">
          <div className="absolute -top-12 bg-white !z-20 pb-5 bottom-0 right-0 h-full w-full rounded-xl overflow-auto">
            <div
              className={`h-full pt-12 overflow-auto ${
                userResponsable.length === 0 && 'flex justify-center items-center'
              }`}
            >
              {userResponsable.length === 0 ? (
                <div className="text-center flex flex-col items-center">
                  <img src="/images/logo/empty-member.png" alt="" width={72} height={72} />
                  <span className="mt-4 text-xs text-secondary-3 leading-[13.79px] text-normal">
                    Aucun membre
                  </span>
                </div>
              ) : (
                userResponsable.length > 0 && (
                  <div className="h-[2000px] py-[10px] px-[22px]">
                    <h2 className="text-md text-black mt-4 mb-2 font-medium leading-[18.38px]">
                      Responsables
                    </h2>
                    <div className="space-y-2">
                      {userResponsable.map((user) => (
                        <UserProjectCard showCheckbox showDetails user={user} />
                      ))}
                    </div>
                    <h2 className="text-md text-black mt-4 mb-2 font-medium leading-[18.38px]">
                      Collaborateurs
                    </h2>
                    <div className="space-y-2">
                      {userCollaborator.map((user) => (
                        <UserProjectCard showCheckbox={false} showDetails user={user} />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSearch;
