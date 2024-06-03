import { FC, useState } from 'react';
import InputIcon from '../../../../shared/inputs/InputIcon';
import CollaboratorCard from './CollaboratorCard';

const SideSearch: FC = () => {
  const [users, setUsers] = useState([0]);

  return (
    <div className="h-full w-full relative lg:w-[492px] bg-white border border-white-1 rounded-xl">
      <InputIcon
        icon="search"
        iconColor="text-gray-10"
        additionalInputClass="placeholder:text-gray-1"
        additionalClass="rounded-t-xl !rounded-b-none h-[56px] bg-white-2 sticky top-0 right-0 z-50"
        placeholder="Rechercher pour ajouter des collaborateurs"
      />
      <div className=" absolute z-32 top-1 right-0 h-full w-full rounded-xl overflow-auto">
        <div
          className={`h-full pt-12 overflow-auto ${
            users.length === 0 && 'flex justify-center items-center'
          }`}
        >
          {users.length === 0 ? (
            <div className="text-center flex flex-col items-center">
              <img src="/images/logo/empty-member.png" alt="" width={72} height={72} />
              <span className="mt-4 text-xs text-secondary-3 leading-[13.79px] text-normal">
                Aucun membre
              </span>
            </div>
          ) : (
            <div className="h-[2000px] py-[10px] px-[22px]">
              <h2 className="text-md text-black mt-4 mb-2 font-medium leading-[18.38px]">
                Responsables
              </h2>
              <div className="space-y-2">
                <CollaboratorCard showCheckbox={false} idCheckbox="checked1" />
                {/* <CollaboratorCard idCheckbox="checked2" /> */}
              </div>
              <h2 className="text-md text-black mt-4 mb-2 font-medium leading-[18.38px]">
                Collaborateurs
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideSearch;
