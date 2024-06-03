import { FC, useState } from 'react';
import InputIcon from '../../../../shared/inputs/InputIcon';

const SideSearch: FC = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="h-full w-full relative lg:w-[492px] bg-white border border-white-1 rounded-xl">
      <InputIcon
        icon="search"
        iconColor="text-gray-10"
        additionalInputClass="placeholder:text-gray-1"
        additionalClass="rounded-t-xl h-[56px] bg-white-2 sticky top-0 right-0 z-50"
        placeholder="Rechercher pour ajouter des collaborateurs"
      />
      <div className=" absolute z-32 top-0 right-0 h-full w-full rounded-xl overflow-auto">
        <div
          className={`h-full pt-14 overflow-auto ${
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
            <div className="h-[2000px] bg-blue-200">fds</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideSearch;
