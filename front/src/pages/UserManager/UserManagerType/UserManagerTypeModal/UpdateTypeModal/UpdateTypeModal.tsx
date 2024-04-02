import { FC, useState } from 'react';
import Input from '../../../../../shared/authenticated/Input';
import InputIcon from '../../../../../shared/authenticated/Input/InputIcon';
import { ModalShowStateType } from '../../../../../shared/authenticated/Modal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import UpdateModal from '../../../../../shared/authenticated/Modal/UpdateModal';
import { UserType } from '../../constants';

interface UpdateModalTypeProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  user: UserType;
}

const UpdateTypeModal: FC<UpdateModalTypeProps> = ({ setShowModal, user }) => {
  const [show, setShow] = useState(false);
  return (
    <UpdateModal setShowModal={setShowModal} title="Modification de type">
      <div className="flex gap-4 flex-col w-full">
        <Input type="text" value={user.title} placeholder="Nom du type" />
        <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
          <InputIcon
            value={user.name}
            placeholder="Rôle"
            additionalClass="py-1 hover:bg-gray-50"
            additionalInputClass="text-base"
            icon="search"
            withClose
          />
          {show && <DropDown />}
        </div>
      </div>
    </UpdateModal>
  );
};

export default UpdateTypeModal;
