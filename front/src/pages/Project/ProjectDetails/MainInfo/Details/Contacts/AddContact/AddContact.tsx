import { FC, useState } from 'react';
import Icon from '../../../../../../../shared/Icon';
import Input from '../../../../../../../shared/inputs/Input';
import InputIcon from '../../../../../../../shared/inputs/InputIcon';

const AddContact: FC = () => {
  const [isCliked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isCliked);
  };
  return (
    <div className="bg-white">
      {!isCliked ? (
        <div
          role="presentation"
          onClick={handleClick}
          className="group text-base text-gray-1 border-gray-9 rounded-lg border border-dashed hover:border-solid hover:border-[#3E60C1] hover:text-[#3E60C1] py-5 px-4 hover:cursor-pointer relative w-full flex justify-center gap-x-2 items-center"
        >
          <Icon
            name="add-item"
            className="text-[#808080] group-hover:bg-[#3E60C1] group-hover:text-white"
          />
          <span>Ajouter un contact</span>
        </div>
      ) : (
        <div className="flex gap-x-4 text-gray-1">
          <InputIcon
            icon="search"
            onChange={() => {}}
            iconColor="text-gray-10"
            additionalInputClass="placeholder:text-gray-1"
            additionalClass="rounded-md h-[56px] bg-white-2 sticky top-0 right-0 z-[500]"
            placeholder="Rechercher client"
          />
          <Input type="text" placeholder="Libellé" />
          <Input type="text" placeholder="Contact" />
          <div className="flex gap-x-4 items-center">
            <div
              role="presentation"
              className="h-6 w-6 flex justify-center items-center hover:text-secondary cursor-pointer"
              onClick={handleClick}
            >
              <Icon name="x" />
            </div>
            <div
              role="presentation"
              className="h-6 w-6 flex justify-center items-center hover:text-secondary cursor-pointer"
              onClick={handleClick}
            >
              <Icon name="right" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddContact;
