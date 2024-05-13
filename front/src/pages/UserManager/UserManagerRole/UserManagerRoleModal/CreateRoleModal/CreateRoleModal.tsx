import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import PermissionDto from '../../../../../dto/permission.dto';
import { RoleResponseDto } from '../../../../../dto/role.dto';
import useGetPermissionQuery from '../../../../../hooks/usePermission';
import { useCreateRole } from '../../../../../hooks/useRole';
import routes from '../../../../../routes/paths';
import Button from '../../../../../shared/authenticated/buttons/Button/Button';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';

interface CreateModalRoleProps {
  onClose: () => void;
  updateRole?: RoleResponseDto;
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

const CreateRoleModal: FC<CreateModalRoleProps> = ({ onClose, updateRole }) => {
  const [show, setShow] = useState(false);
  const [selectPermission, setSelectPermission] = useState(false);
  const { data, error, isLoading } = useGetPermissionQuery();
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [permissionSelected, setPermissionSelected] = useState<PermissionDto[]>([]);
  const [isAlreadyRendered, setIsAlreadyRendered] = useState(false);
  const navigate = useNavigate();
  const [errorAxios, setErrorAxios] = useState('');
  const mutation = useCreateRole();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ role: string; permission: string }>();
  const onSubmit = handleSubmit(async (value) => {
    if (permissionSelected.length !== 0) setSelectPermission(true);
    else setSelectPermission(false);
    try {
      if (permissionSelected.length !== 0) {
        const newRole = {
          name: value.role,
          permissions: permissionSelected.map((item) => item.id),
        };
        const result = await mutation.mutateAsync(newRole);
        if (result) onClose();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500 || err.code === 'ERR_NETWORK')
          navigate(routes.server_error.path);
        if (err.response?.data?.error) setErrorAxios(err.response?.data.error);
        else setErrorAxios(err.response?.data);
      } else {
        setErrorAxios("Une erreur s'est produite");
      }
    }
  });

  useEffect(() => {
    if (data) {
      setPermissions(sortPermissionByName(data));
    }
    if (!isAlreadyRendered && updateRole) {
      setSelectPermission(true);
      setPermissionSelected(sortPermissionByName(updateRole.permissions));
      // const resultat = permissions.filter(
      //   (item) => !updateRole!.permissions.some((exclu) => exclu.id === item.id),
      // );
      // console.log('result: ', resultat);
      // setPermissions(resultat);
      setIsAlreadyRendered(true);
    }
  }, [data, isAlreadyRendered, updateRole]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const setValue = (elem: PermissionDto) => {
    const unselectedPermission = permissions.filter(
      (item: PermissionDto) => item.name !== elem.name,
    );
    setSelectPermission(true);
    setPermissionSelected((prevList) => [...prevList, elem]);
    setPermissions(unselectedPermission);
  };

  const deleteItem = (elem: PermissionDto) => {
    setPermissionSelected((prevList) => {
      if (prevList.length > 1) setSelectPermission(true);
      else setSelectPermission(false);
      return prevList.filter((item: PermissionDto) => item.name !== elem.name);
    });
    setPermissions((prevList) => {
      const result = [...prevList, elem];
      if (result.length >= 2) return sortPermissionByName(result);
      return result;
    });
  };

  return (
    <CreateModal onClose={onClose} title={updateRole ? 'Modification rôle' : 'Création de rôle'}>
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex gap-4 flex-col w-full">
          <div>
            <Controller
              name="role"
              control={control}
              defaultValue={updateRole ? updateRole.name : ''}
              rules={{
                required: { value: true, message: 'Remplir le champ' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Nom du role"
                  additionalClass={twMerge(
                    `${errors.role ? '!border-1 !border-red-500' : ''}`,
                    'focus:border-secondary border',
                  )}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <div className=" top-full mt-1">
              {errors.role && (
                <p className="text-red-500 text-xs font-medium">{errors.role.message}</p>
              )}
            </div>
          </div>
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
            {!selectPermission && (
              <p className="text-red-500 text-xs font-medium">
                Vous devez séléctionner des permissions
              </p>
            )}
            {errorAxios && <p className="text-red-500 text-xs font-medium">{errorAxios}</p>}
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
