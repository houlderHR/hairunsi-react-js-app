import axios from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import PermissionDto from '../../../../../dto/permission.dto';
import { RoleResponseDto } from '../../../../../dto/role.dto';
import useGetPermissionQuery from '../../../../../hooks/usePermission';
import { useCreateRole, useUpdateRole } from '../../../../../hooks/useRole';
import routes from '../../../../../routes/paths';
import Button from '../../../../../shared/authenticated/buttons/Button/Button';
import CardItemRole from '../../../../../shared/authenticated/CardUserManager/CardRole/CardItemRole';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import Loading from '../../../../../shared/Loading/Loading';

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

const CreateOrUpdateRoleModal: FC<CreateModalRoleProps> = ({ onClose, updateRole }) => {
  const [show, setShow] = useState(false);
  const [selectPermission, setSelectPermission] = useState(true);
  const { data, error, isLoading } = useGetPermissionQuery();
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [searchPermissions, setSearchPermissions] = useState<PermissionDto[]>([]);
  const [permissionSelected, setPermissionSelected] = useState<PermissionDto[]>([]);
  const [isAlreadyRendered, setIsAlreadyRendered] = useState(false);
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const [errorAxios, setErrorAxios] = useState('');
  const createUsermutation = useCreateRole();
  const updateUserMutation = useUpdateRole(updateRole?.id);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ role: string; permission: string }>();

  const onChangeRoleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const result = permissions.filter((item) => {
      const permissionName = item.name.toUpperCase();
      return permissionName.includes(e.target.value.toUpperCase());
    });
    setSearchPermissions(result);
  };
  const checker = (arr: string[], target: string[]) => target.every((v) => arr.includes(v));

  const onSubmit = handleSubmit(async (value) => {
    if (permissionSelected.length !== 0) setSelectPermission(true);
    else setSelectPermission(false);
    try {
      if (permissionSelected.length !== 0) {
        let result;
        const newRole = {
          name: value.role,
          permissions: permissionSelected.map((item) => item.id),
        };
        if (updateRole) {
          result = await updateUserMutation.mutateAsync(newRole);
          if (result) {
            const idPermission = updateRole.permissions.map((item) => item.id);
            if (
              newRole.permissions.length !== updateRole.permissions.length ||
              (!checker(newRole.permissions, idPermission) &&
                newRole.permissions.length === updateRole.permissions.length)
            )
              window.location.reload();
          }
        } else {
          result = await createUsermutation.mutateAsync(newRole);
        }
        if (result) onClose();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 500 || err.code === 'ERR_NETWORK')
          navigate(routes.server_error.path);
        if (err.response?.status === 422 || err.response?.status === 409) {
          setErrorAxios(err.response?.data.error);
        }
      } else {
        setErrorAxios("Une erreur s'est produite");
      }
    }
  });

  useEffect(() => {
    if (data) {
      const result = data.filter(
        (item: PermissionDto) => !updateRole?.permissions.some((exclu) => exclu.id === item.id),
      );
      setPermissions(sortPermissionByName(result));
      if (!isAlreadyRendered && updateRole) {
        setSelectPermission(true);
        setPermissionSelected(updateRole.permissions);
        setIsAlreadyRendered(true);
      }
    }
  }, [data, updateRole, isAlreadyRendered]);

  if (error) navigate(routes.server_error.path);
  if (isLoading) return <Loading />;

  const setValue = (elem: PermissionDto) => {
    const unselectedPermission = permissions.filter(
      (item: PermissionDto) => item.name !== elem.name,
    );
    const unselectedSearchPermissions = searchPermissions.filter(
      (item: PermissionDto) => item.name !== elem.name,
    );
    setSelectPermission(true);
    setPermissionSelected((prevList) => [...prevList, elem]);
    setPermissions(unselectedPermission);
    setSearchPermissions(unselectedSearchPermissions);
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
    setSearchPermissions((prevList) => [...prevList, elem]);
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
                  placeholder="Nom du rôle"
                  additionalClass={twMerge(
                    `${errors.role || errorAxios ? '!border-1 !border-red-500' : ''}`,
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
              {errorAxios && <p className="text-red-500 text-xs font-medium">{errorAxios}</p>}
            </div>
          </div>
          <div role="presentation" onClick={() => setShow((s) => !s)} className="relative">
            <InputIcon
              placeholder="Rechercher module"
              additionalClass="py-1 hover:bg-gray-50"
              additionalInputClass="text-base"
              onChange={onChangeRoleInput}
              value={search}
              icon="search"
            />
            {show && (
              <DropDown
                items={search !== '' ? searchPermissions : permissions}
                setValue={setValue}
              />
            )}
          </div>
          <div className="min-h-48">
            {!selectPermission && (
              <p className="text-red-500 text-xs font-medium">
                Séléctionner au moins une permission
              </p>
            )}
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
        <Button type="submit" title={updateRole ? 'Modifier' : 'Créer'} variant="secondary-1" />
      </form>
    </CreateModal>
  );
};

export default CreateOrUpdateRoleModal;
