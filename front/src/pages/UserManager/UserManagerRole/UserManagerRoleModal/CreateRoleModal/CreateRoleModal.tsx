import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PermissionDto from '../../../../../dto/permission.dto';
import useGetPermissionQuery from '../../../../../hooks/usePermission';
import { useCreateRole } from '../../../../../hooks/useRole';
import Button from '../../../../../shared/authenticated/buttons/Button/Button';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';

interface CreateModalRoleProps {
  onClose: () => void;
}

const sortPermissionByName = (data: PermissionDto[]) =>
  data.sort((a: PermissionDto, b: PermissionDto) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

const CreateRoleModal: FC<CreateModalRoleProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const { data, error, isLoading } = useGetPermissionQuery();
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [permissionSelected, setPermissionSelected] = useState<PermissionDto[]>([]);
  const mutation = useCreateRole();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ role: string }>();
  const onSubmit = handleSubmit(async (value) => {
    console.log('Data: ', value);
    // try {
    //   const result = await mutation.mutateAsync(data);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     if (error.response?.status === 500 || error.code === 'ERR_NETWORK')
    //       navigate(routes.server_error.path);
    //     if (error.response?.data?.error) setErrorAxios(error.response?.data.error);
    //     else setErrorAxios(error.response?.data);
    //   } else {
    //     setErrorAxios("Une erreur s'est produite");
    //   }
    // }
  });
  useEffect(() => {
    if (data) {
      setPermissions(sortPermissionByName(data));
    }
  }, [data]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const setValue = (elem: PermissionDto) => {
    const unselectedPermission = permissions.filter(
      (item: PermissionDto) => item.name !== elem.name,
    );
    setPermissionSelected((prevList) => [...prevList, elem]);
    setPermissions(unselectedPermission);
  };

  const deleteItem = (elem: PermissionDto) => {
    setPermissionSelected((prevList) =>
      prevList.filter((item: PermissionDto) => item.name !== elem.name),
    );
    setPermissions((prevList) => {
      const result = [...prevList, elem];
      if (result.length >= 2) return sortPermissionByName(result);
      return result;
    });
  };

  return (
    <CreateModal onClose={onClose} title="Création de rôle">
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex gap-4 flex-col w-full">
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: 'Remplir le champ' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="text"
                placeholder="Nom du role"
                // additionalClass={twMerge(
                //   `${errors.name || errorAxios ? '!border-1 !border-red-500' : ''}`,
                //   'focus:border-secondary border',
                // )}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
            <InputIcon
              placeholder="Rôle"
              additionalClass="py-1 hover:bg-gray-50"
              additionalInputClass="text-base"
              icon="search"
            />
            {show && <DropDown items={permissions} setValue={setValue} />}
          </div>
          <div className="min-h-48">
            <div className="flex flex-wrap gap-2 ">
              {permissionSelected
                .filter((item) => item)
                .map((item) => (
                  <CardItemRole
                    addClass="rounded-md border-gray-4"
                    icon="x-1"
                    id={item.id}
                    title={item.name}
                    deleteItem={deleteItem}
                    key={item.id}
                  />
                ))}
            </div>
          </div>
        </div>
        <Button type="submit" title="Créer" variant="secondary-1" />
      </form>
    </CreateModal>
  );
};

export default CreateRoleModal;
