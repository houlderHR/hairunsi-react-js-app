import { FC, useState } from 'react';
import Input from '../../../../../shared/authenticated/Input';
import InputIcon from '../../../../../shared/authenticated/Input/InputIcon';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import UpdateModal from '../../../../../shared/authenticated/Modal/UpdateModal';
import Icon from '../../../../../shared/Icon';
import { TypeList, UserType } from '../../constants';

interface UpdateModalTypeProps {
  onClose: () => void;
  user: UserType;
  setValue: (elem: string) => void;
}

const UpdateTypeModal: FC<UpdateModalTypeProps> = ({ onClose, user, setValue }) => {
  const [show, setShow] = useState(false);
  return (
    <UpdateModal onClose={onClose} title="Modification de type">
      <div className="flex gap-4 flex-col w-full">
        <Input type="text" value={user.title} placeholder="Nom du type" />
        <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
          <InputIcon
            value={user.name}
            placeholder="Rôle"
            additionalClass="py-1 hover:bg-gray-50"
            additionalInputClass="text-base"
            icon="search"
            endIcon={<Icon name="x" size={12} className="text-gray-500" />}
          />
          {show && <DropDown items={TypeList} setValue={setValue} />}
        </div>
      </div>
    </UpdateModal>
  );
};

export default UpdateTypeModal;
