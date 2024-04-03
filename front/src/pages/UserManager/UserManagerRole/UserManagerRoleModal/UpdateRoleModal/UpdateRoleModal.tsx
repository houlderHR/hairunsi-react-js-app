import { FC, useEffect, useState } from 'react';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import UpdateModal from '../../../../../shared/authenticated/Modal/UpdateModal';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import { MODULE_ROLE_LIST, UserObject } from '../../constants';

interface UpdateModalRoleProps {
  onClose: () => void;
  user?: UserObject;
}

const UpdateRoleModal: FC<UpdateModalRoleProps> = ({ onClose, user }) => {
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

  useEffect(() => {
    if (user) setmoduleListSelected(user.module);
  }, [user]);

  return (
    <UpdateModal onClose={onClose} title="Modification rôle">
      <div className="flex gap-4 flex-col w-full">
        <Input type="text" placeholder="Nom du role" value={user?.role} />
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
    </UpdateModal>
  );
};

export default UpdateRoleModal;
