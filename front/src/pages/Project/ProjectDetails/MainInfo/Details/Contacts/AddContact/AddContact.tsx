import { FC } from 'react';
import Icon from '../../../../../../../shared/Icon';

const AddContact: FC = () => (
  <div className="bg-white ">
    <div className="group text-gray-1 border-[#bdbdbd] rounded-xl border border-dashed hover:border-solid hover:border-[#3E60C1] hover:text-[#3E60C1] py-3 px-4 hover:cursor-pointer relative w-full flex justify-center gap-x-2 items-center">
      <Icon name="add-item"  className="text-[#808080] group-hover:bg-[#3E60C1] group-hover:text-white" /> <span>Ajouter un contact</span>
    </div>
  </div>
);
export default AddContact;