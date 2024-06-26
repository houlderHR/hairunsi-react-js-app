import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import DepartmentDto, {
  CreateOrUpdateDepartmentDto,
  Role,
} from '../../../../../dto/department.dto';
import { schema, useFetchDepartment } from '../../../../../hooks/useDepartment';
import { SearchType } from '../../../../../hooks/useSearch';
import routes from '../../../../../routes/paths';
import Button from '../../../../../shared/authenticated/buttons/Button';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../../shared/Icon';
import InputController from '../../../../../shared/inputs/InputController';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import Spinner from '../../../../../shared/Spinner';
import http from '../../../../../utils/http-common';
import mapError from '../../../../../utils/mapErrorResponse';
import { QUERY_TOKEN_AUTH_KEY } from '../../../../../utils/query.constants';

interface CreateModalTypeProps {
  onClose: () => void;
  type: 'createDepartment' | 'updateDepartment';
  department?: DepartmentDto;
}

const CreateOrUpdateTypeModal: FC<CreateModalTypeProps> = ({ onClose, type, department }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: onMutateDepartment, isPending } = useFetchDepartment(type, department);
  const {
    control,
    handleSubmit,
    setValue: setRoleTypeValue,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: department?.name ?? '', role: department?.role.id ?? '' },
  });
  const {
    data: roles,
    isLoading: isLoadingRoles,
    isSuccess: isRoleGettedSuccessfully,
  } = useQuery<Role[], AxiosError>({
    queryKey: ['dropdownRole'],
    queryFn: () => http.get<Role[]>('role').then((response) => response.data),
  });
  const [searchRole, setSearchRole] = useState<string | undefined>(undefined);

  const toggleShow = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    clearErrors('role');
    setShow((s) => !s);
  };

  const getRole = (_role: Role, e?: MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setShow(false);
    setSearchRole(undefined);
    setRoleTypeValue('role', _role.id);
  };

  const createOrUpdateDepartment = async (_data: CreateOrUpdateDepartmentDto) => {
    try {
      await onMutateDepartment({ ..._data });
      onClose();
      await queryClient.invalidateQueries({ queryKey: ['department'] });
      await queryClient.invalidateQueries({ queryKey: [QUERY_TOKEN_AUTH_KEY] });
      await queryClient.invalidateQueries({ queryKey: [SearchType.TYPE] });
    } catch (error) {
      const errorResponse = error as AxiosError<{
        status: number;
        error: { property: 'name' | 'role'; constraints: Record<string, string> }[];
      }>;
      if (errorResponse.response?.status === 422 && errorResponse.response?.data) {
        mapError<'name' | 'role'>(
          errorResponse.response?.data?.error,
          (_property, _type, _message) => {
            setError(_property, { type: _type, message: _message });
          },
        );
      }
      if (errorResponse.response?.status === 409) {
        setError('name', { message: 'Le type existe déja' });
      }
      if (errorResponse.code === 'ERR_NETWORK') {
        navigate(routes.server_error.path);
      }
    }
  };

  return (
    <CreateModal
      onClose={onClose}
      title={type === 'createDepartment' ? 'Création de type' : 'Modification type'}
    >
      <form onSubmit={handleSubmit(createOrUpdateDepartment)}>
        <div className="flex gap-4 flex-col w-full">
          <div className="relative">
            <InputController
              placeholder="Nom du type"
              name="name"
              control={control}
              isError={errors.name !== undefined}
              type="text"
            />
            {errors.name && (
              <span className="text-red-500 absolute left-1 leading-[11px] top-full mt-0.5 text-xs font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
          {isLoadingRoles && (
            <Spinner additionalClassName="w-8 h-8 mx-auto flex items-center justify-center" />
          )}
          {isRoleGettedSuccessfully && (
            <div role="presentation" onClick={toggleShow} className="relative">
              <InputIcon
                value={searchRole ?? roles.find((role) => role.id === getValues('role'))?.name}
                placeholder="Rôle"
                additionalClass={twMerge(
                  errors.role && '!border-red-500 border !border-1 text-red-500',
                  'bg-transparent border rounded border-gray-1 active:border-secondary border pr-10',
                )}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchRole(e.target.value)}
                additionalInputClass={twMerge(
                  errors.role && 'placeholder:text-red-500',
                  'text-base',
                )}
                icon="search"
                endIcon={<Icon name="x" size={12} className="text-gray-500" />}
              />
              {errors.role && (
                <span className="text-red-500 absolute left-1 leading-[11px] top-full mt-0.5 text-xs font-medium">
                  {errors.role.message}
                </span>
              )}
              {show && (
                <DropDown
                  items={roles.filter((role) =>
                    role.name.toLowerCase().includes((searchRole ?? '').toLowerCase()),
                  )}
                  setValue={getRole}
                />
              )}
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          title={
            <div className="flex flex-row gap-2">
              {type === 'createDepartment' ? 'Créer' : 'Modifier'}
              {isPending && <Spinner />}
            </div>
          }
          variant="secondary-1"
        />
      </form>
    </CreateModal>
  );
};

export default CreateOrUpdateTypeModal;
