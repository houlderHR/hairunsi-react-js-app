import { FC, useEffect, useState } from 'react';
import useGetPermissionQuery from '../../../../../hooks/usePermission';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import { PermissionDto } from '../../../../dto/permission.dto';
import { MODULE_ROLE_LIST } from '../../constants';

interface CreateModalRoleProps {
  onClose: () => void;
}

const CreateRoleModal: FC<CreateModalRoleProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const { data, error, isLoading } = useGetPermissionQuery();
  const [moduleRole, setModuleRole] = useState<PermissionDto[]>([]);
  const [moduleListSelected, setmoduleListSelected] = useState<PermissionDto[]>([]);

  useEffect(() => {
    if (data) {
      setModuleRole(data);
    }
  }, [data]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const setValue = (elem: PermissionDto) => {
    const unselectedListModule = moduleRole.filter(
      (item: PermissionDto) => item.name !== elem.name,
    );
    setmoduleListSelected((prevList) => [...prevList, elem]);
    setModuleRole(unselectedListModule);
  };

  const deleteItem = (elem: PermissionDto) => {
    setmoduleListSelected((prevList) =>
      prevList.filter((item: PermissionDto) => item.name !== elem.name),
    );
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
                  title={item.name}
                  deleteItem={deleteItem}
                  key={item.id}
                />
              ))}
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default CreateRoleModal;
