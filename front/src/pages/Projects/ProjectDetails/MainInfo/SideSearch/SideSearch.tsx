import { FC, useState } from 'react';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import Icon from '../../../../../shared/Icon';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import { mockUserCollaborator, mockUserResponsable, UserProjectType } from './constant';
import DropDownUser from './DropDownUser';
import UserProjectCard from './UserProjectCard';

const SideSearch: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [userResponsable, setUserResponsable] = useState(mockUserResponsable);
  const [userCollaborator, setUserCollaborator] = useState(mockUserCollaborator);

  const [userSelected, setUserSelected] =
    useState<{ id: string; name: string }[]>(mockUserResponsable);
  const [showBlocAddUser, setShowBlocAddUser] = useState(false);
  const [showDropDownSearch, setShowDropDownSearch] = useState(false);
  const addAllUserSelected = () => {
    setShowBlocAddUser(false);
  };
  const selectUserOnDropdown = () => {
    setShowBlocAddUser(true);
  };

  const setValue = (user: UserProjectType) => {
    setUserSelected([user]);
  };

  return (
    <div
      className={`absolute bottom-0 z-[500] top-4 h-full w-full right-0 lg:!top-0 lg:translate-x-0 transform lg:relative lg:w-[400px] xl:w-[492px] bg-white border border-white-1 rounded-xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="!bg-white rounded-xl"
        role="presentation"
        onClick={() => setShowDropDownSearch((preview) => !preview)}
      >
        <InputIcon
          icon="search"
          onChange={() => {}}
          iconColor="text-gray-10"
          additionalInputClass="placeholder:text-gray-1"
          additionalClass="rounded-t-xl !rounded-b-none h-[56px] bg-white-2 sticky top-0 right-0 z-[500]"
          placeholder="Rechercher pour ajouter des collaborateurs"
        />
        {showDropDownSearch && (
          <div className="absolute right-3 left-3 z-50">
            <DropDownUser
              setValue={setValue}
              onClickItem={selectUserOnDropdown}
              items={userResponsable}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col h-full !rounded-xl !relative">
        {showBlocAddUser && (
          <div className="relative bg-white z-40">
            <div className="border relative pb-6">
              <div className="pt-2 pb-6 px-5  flex flex-wrap gap-2">
                {userSelected.map((userItem) => (
                  <CardItemRole
                    key={userItem.id}
                    id={userItem.id}
                    addClass="!rounded-lg border-gray-4 !py-px"
                    icon="x-1"
                    deleteItem={() => {}}
                    title={userItem.name}
                  />
                ))}
              </div>
              <div
                role="presentation"
                onClick={addAllUserSelected}
                className="absolute z-40 left-8 bottom-2 flex items-center gap-x-2 text-[10px] text-secondary-2 mt-1 font-normal rounded-md px-3 py-[2px] hover:bg-secondary-5 transition ease-in-out duration-300 hover:cursor-pointer"
              >
                <Icon name="right" size={10} />
                <span>Ajouter</span>
              </div>
            </div>
          </div>
        )}
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
                  <div className="py-[10px]  pt-4">
                    <div className="px-[22px]">
                      <h2 className="text-md text-black  mb-2 font-medium leading-[18.38px] ">
                        Responsables
                      </h2>

                      <div className="space-y-2 pb-4">
                        {userResponsable.map((user) => (
                          <UserProjectCard key={user.id} showCheckbox showDetails user={user} />
                        ))}
                      </div>
                    </div>
                    <p className="w-full h-px bg-white-1" />
                    <div className="px-[22px]">
                      <h2 className="text-md text-black pt-4 mb-2 font-medium leading-[18.38px] ">
                        Collaborateurs
                      </h2>
                      <div className="space-y-2">
                        {userCollaborator.map((user) => (
                          <UserProjectCard
                            key={user.id}
                            showCheckbox={false}
                            showDetails
                            user={user}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
    // <div>
    //   <button
    //     type="button"
    //     onClick={toggleMenu}
    //     className="p-2 absolute left-0 bg-blue-500 text-white rounded"
    //   >
    //     {isOpen ? 'Close Menu' : 'Open Menu'}
    //   </button>

    //   <div
    // //     className={`fixed z-[1000] top-30 right-0 h-full w-64 bg-gray-800 text-white transform ${
    //       isOpen ? 'translate-x-0' : 'translate-x-full'
    //     } transition-transform duration-300 ease-in-out`}
    //   >
    //     <div className="p-4">
    //       <ul>
    //         <li className="mt-4">Home</li>
    //         <li className="mt-4">About</li>
    //         <li className="mt-4">Services</li>
    //         <li className="mt-4">Contact</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SideSearch;
