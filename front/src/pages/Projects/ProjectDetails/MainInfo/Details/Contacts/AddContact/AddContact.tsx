import { FC } from 'react';
import Icon from '../../../../../../../shared/Icon';

const AddContact: FC = () => (
  <div className="bg-white ">
    <div className="text-gray-1 border-gray-9 rounded-md border-1 border-dashed py-3 px-4 border border-white-1 relative w-full flex justify-center gap-x-2 items-center">
      <Icon name="add-solid" /> <span>Ajouter un contact</span>
    </div>
  </div>
);
export default AddContact;
