import { FC, useState } from 'react';
import Input from '../../../../../shared/authenticated/Input';
import InputIcon from '../../../../../shared/authenticated/Input/InputIcon';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import ModalShowStateType from '../../../../../utils/type/ModalShowType';

interface CreateModalTypeProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const CreateModalType: FC<CreateModalTypeProps> = ({ setShowModal }) => {
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

export default CreateModalType;
