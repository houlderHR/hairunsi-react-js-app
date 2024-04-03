import { FC, useState } from 'react';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import Input from '../../../../../shared/authenticated/Input';
import InputIcon from '../../../../../shared/authenticated/Input/InputIcon';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import { MODULE_ROLE_LIST } from '../../constants';

interface CreateModalRoleProps {
  onClose: () => void;
}

const CreateRoleModal: FC<CreateModalRoleProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const [moduleRole, setModuleRole] = useState(MODULE_ROLE_LIST);
  const [moduleListSelected, setmoduleListSelected] = useState<string[]>([]);

  const setValue = (elem: string) => {
    const unselectedListModule = moduleRole.filter((item) => item !== elem);
    setmoduleListSelected((prevList) => [...prevList, elem]);
    setModuleRole(unselectedListModule);
  };

  const deleteItem = (elem: string) => {
    setmoduleListSelected((prevList) => prevList.filter((item) => item !== elem));
    setModuleRole((prevList) => [...prevList, elem]);
  };

  return (
    <CreateModal onClose={onClose} title="Création de rôle">
      <div className="flex gap-4 flex-col w-full">
        <Input type="text" placeholder="Nom du role" />
        <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
          <InputIcon
            placeholder="Rôle"
            additionalClass="py-1 hover:bg-gray-50"
            additionalInputClass="text-base"
            icon="search"
          />
          {show && <DropDown items={moduleRole} setValue={setValue} />}
        </div>
        <div className="min-h-48">
          <div className="flex flex-wrap gap-2 ">
            {moduleListSelected
              .filter((item) => item)
              .map((item) => (
                <CardItemRole
                  addClass="rounded-md border-gray-4"
                  icon="x-1"
                  title={item}
                  deleteItem={deleteItem}
                  key={item}
                />
              ))}
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateRoleModal;
