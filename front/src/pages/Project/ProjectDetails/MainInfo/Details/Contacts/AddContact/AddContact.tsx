import { FC, useState } from 'react';
import Icon from '../../../../../../../shared/Icon';
import Input from '../../../../../../../shared/inputs/Input';

type AddContactProps = {
  onClick?: () => void;
};

const AddContact: FC<AddContactProps> = ({ onClick }) => {
  const [isCliked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isCliked);
  };
  return (
    <div className="bg-white ">
      {!isCliked ? (
        <div
          role="presentation"
          onClick={handleClick}
          className="group text-base text-gray-1 border-gray-9 rounded-lg border border-dashed hover:border-solid hover:border-[#3E60C1] hover:text-[#3E60C1] py-3 px-4 hover:cursor-pointer relative w-full flex justify-center gap-x-2 items-center"
        >
          <Icon
            name="add-item"
            className="text-[#808080] group-hover:bg-[#3E60C1] group-hover:text-white"
          />
          <span>Ajouter un contact</span>
        </div>
      ) : (
        <div className="flex gap-x-4">
          <Input type="text" />
          <Input type="text" />
          <Input type="text" />
          <div className="flex items-center">
            <Icon name="x" />
            <Icon name="right" />
          </div>
        </div>
      )}
    </div>
  );
};
export default AddContact;
