import { FC, useState } from 'react';
import Input from '../../../../../shared/authenticated/Input';
import InputIcon from '../../../../../shared/authenticated/Input/InputIcon';
import { ModalShowStateType } from '../../../../../shared/authenticated/Modal';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';

interface CreateModalTypeProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const CreateTypeModal: FC<CreateModalTypeProps> = ({ setShowModal }) => {
  const [show, setShow] = useState(false);
  return (
    <CreateModal setShowModal={setShowModal}>
      <div className="flex gap-4 flex-col w-full">
        <Input type="text" placeholder="Nom du type" />
        <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
          <InputIcon
            placeholder="Rôle"
            additionalClass="py-1 hover:bg-gray-50"
            additionalInputClass="text-base"
            icon="search"
          />
          {show && <DropDown />}
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateTypeModal;