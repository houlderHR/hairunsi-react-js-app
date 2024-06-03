import { FC } from 'react';
import InputIcon from '../../../../shared/inputs/InputIcon';

const SideSearch: FC = () => (
  <div className="h-full lg:w-[492px] bg-white border border-white-1 rounded-xl text-black-200">
    <InputIcon
      icon="search"
      iconColor="text-gray-10"
      additionalInputClass="placeholder:text-gray-1"
      additionalClass="rounded-t-xl h-[56px] bg-white-2 "
      placeholder="Rechercher pour ajouter des collaborateurs"
    />
    &nbsp;
  </div>
);

export default SideSearch;
