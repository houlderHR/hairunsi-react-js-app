import { yupResolver } from '@hookform/resolvers/yup';
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
import Spinner from '../../../../../shared/Spinner';
import schemaCreateRole from '../../../../../utils/yup.schema';

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
  const [errorAxios, setErrorAxios] = useState<string[]>([]);
  const { mutateAsync: createUsermutation, isPending: isPendingCreate } = useCreateRole();
  const { mutateAsync: updateUserMutation, isPending: isPendingUpdate } = useUpdateRole(
    updateRole?.id,
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreateRole),
  });

  const onChangeRoleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const result = permissions.filter((item) => {
      const permissionName = item.name.toUpperCase();
      return permissionName.includes(e.target.value.toUpperCase());
    });
    setSearchPermissions(result);
  };

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
          result = await updateUserMutation(newRole);
        } else {
          result = await createUsermutation(newRole);
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
        setErrorAxios(["Une erreur s'est produite"]);
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
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Nom du rôle"
                  additionalClass={twMerge(
                    `${errors.role || errorAxios.length > 0 ? '!border-1 !border-red-500' : ''}`,
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
              {errorAxios &&
                errorAxios.map((item) => (
                  <p className="text-red-500 text-xs font-medium" key={item}>
                    {item}
                  </p>
                ))}
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
        <Button
          type="submit"
          disabled={isPendingCreate || isPendingUpdate}
          title={
            <>
              {!isPendingCreate && !isPendingUpdate && updateRole && 'Modifier'}
              {!isPendingCreate && !isPendingUpdate && !updateRole && 'Créer'}
              {(isPendingCreate || isPendingUpdate) && (
                <div className="flex flex-row justify-center">
                  <Spinner />
                </div>
              )}
            </>
          }
          variant="secondary-1"
        />
      </form>
    </CreateModal>
  );
};

export default CreateOrUpdateRoleModal;
