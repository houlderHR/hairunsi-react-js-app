import { useState } from 'react';
import Icon from '../../../../../../shared/Icon';
import Input from '../../../../../../shared/inputs/Input';
import EnvironmentList from './EnvironmentList';

const Environment = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full min-h-full flex flex-col">
      <div className="w-full p-10 flex flex-col gap-y-7">
        {!showForm ? (
          <div
            className="group w-full h-[76px] border-[1px] border-dashed border-[#bdbdbd] rounded-xl hover:border-solid hover:border-[#3E60C1] flex flex-row justify-center items-center gap-[14px] text-[#808080] hover:cursor-pointer"
            role="presentation"
            onClick={() => setShowForm(true)}
          >
            <Icon
              name="add-item"
              className="text-[#808080] group-hover:bg-[#3E60C1] group-hover:text-white"
            />
            <div className="group-hover:text-[#3E60C1]">Ajouter un environnement</div>
          </div>
        ) : (
          <div className="w-full h-[76px] flex flex-row justify-center items-center gap-1 lg:gap-5">
            <Input type="text" placeholder="Libellé" additionalClass="w-2/5" />
            <Input type="text" placeholder="Lien" additionalClass="w-2/5" />
            <div className="flex flex-row justify-evenly items-center w-1/5">
              <Icon
                name="x"
                className="text-[#808080] hover:text-red-500"
                size={24}
                onClick={() => setShowForm(false)}
              />
              <Icon name="x" className="text-[#808080] hover:text-green-500" size={24} />
            </div>
          </div>
        )}
        <div className="w-full space-y-4 max-h-[340px] flex flex-col overflow-y-scroll scroll-smooth">
          <EnvironmentList />
        </div>
      </div>
    </div>
  );
};

export default Environment;
