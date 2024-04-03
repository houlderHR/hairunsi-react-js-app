import { FC, useState } from 'react';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import { TypeList } from '../../constants';

interface CreateModalTypeProps {
  onClose: () => void;
}

const CreateTypeModal: FC<CreateModalTypeProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);

  return (
    <CreateModal onClose={onClose} title="Création de type">
      <div className="flex gap-4 flex-col w-full">
        <Input type="text" placeholder="Nom du type" />
        <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
          <InputIcon
            placeholder="Rôle"
            additionalClass="py-1 hover:bg-gray-50"
            additionalInputClass="text-base"
            icon="search"
          />
          {show && <DropDown items={TypeList} />}
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateTypeModal;
