import { FC, useState } from 'react';
import Icon from '../../../../../../../shared/Icon';
import InputAddContact from './InputAddContact';

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
       <InputAddContact onCancel={handleClick}/>
      )}
    </div>
  );
};
export default AddContact;
