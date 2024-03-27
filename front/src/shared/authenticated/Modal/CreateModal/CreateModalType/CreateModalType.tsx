import { useState } from 'react';
import CreateModal from '..';
import { ModalShowState } from '../../../../../utils/type/ModalShowType';
import Input from '../../../Input';
import InputIcon from '../../../Input/InputIcon';
import DropDown from './DropDown';

interface CreateModalTypeProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
}

const CreateModalType: React.FC<CreateModalTypeProps> = ({ setShowModal }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <CreateModal setShowModal={setShowModal}>
        <div className="flex gap-4 flex-col w-full">
          <Input type="text" placeholder="Nom du type" />
          <div onClick={() => setShow((s) => !s)} className="relative">
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
    </>
  );
};

export default CreateModalType;
