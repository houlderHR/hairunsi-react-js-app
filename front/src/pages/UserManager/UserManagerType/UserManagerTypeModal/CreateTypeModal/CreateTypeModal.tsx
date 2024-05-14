import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, MouseEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import routes from '../../../../../routes/paths';
import Button from '../../../../../shared/authenticated/buttons/Button';
import CreateModal from '../../../../../shared/authenticated/Modal/CreateModal';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import Icon from '../../../../../shared/Icon';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import Loading from '../../../../../shared/Loading/Loading';
import Spinner from '../../../../../shared/Spinner';
import http from '../../../../../utils/http-common';
import mapError from '../../../../../utils/mapErrorResponse';
import { REGEX_ID } from '../../../../../utils/regex';
import { DepartmentType } from '../../type';

interface CreateModalTypeProps {
  onClose: () => void;
}

const schema = yup.object({
  name: yup
    .string()
    .required('Le nom du département est requis')
    .min(4, 'Le nom du département doit contenir au moin 4 caractères'),
  role: yup.string().required('Vous devez séléctionner un rôle').matches(REGEX_ID),
});

const CreateTypeModal: FC<CreateModalTypeProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: onCreateDepartment, isPending } = useMutation({
    mutationKey: ['createDepartment'],
    mutationFn: (_department: { name: string | undefined; role: string | undefined }) =>
      http.post<DepartmentType>(`department`, _department).then((response) => response.data),
  });
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
  });
  const {
    data: roles,
    isLoading: isLoadingRoles,
    isSuccess: isRoleGettedSuccessfully,
  } = useQuery({
    queryKey: ['dropdownRole'],
    queryFn: () =>
      http.get<{ id: string; name: string }[]>('role').then((response) => response.data),
  });

  const toggleShow = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    clearErrors('role');
    setShow((s) => !s);
  };

  const getRole = (department: { id: string; name: string }, e?: MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setShow(false);
    setRoleTypeValue('role', department.id);
  };

  const createDepartment = async (_data: {
    name: string | undefined;
    role: string | undefined;
  }) => {
    try {
      await onCreateDepartment({ ..._data });
      await queryClient.invalidateQueries({ queryKey: ['department'] });
      onClose();
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
        setError('name', { message: 'Le département existe déja' });
      }
      if (errorResponse.code === 'ERR_NETWORK') {
        navigate(routes.server_error.path);
      }
    }
  };

  const onSubmit = (data: { name: string | undefined; role: string | undefined }) => {
    createDepartment({ ...data });
  };

  return (
    <CreateModal onClose={onClose} title="Création de type">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 flex-col w-full">
          <div className="relative">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <Input
                  value={value}
                  type="text"
                  placeholder="Nom du type"
                  onChange={onChange}
                  onBlur={onBlur}
                  refs={ref}
                  additionalClass={twMerge(
                    errors.name && '!border-red-500 border !border-1 text-red-500',
                    'bg-transparent border rounded border-gray-1 active:border-secondary border pr-10',
                  )}
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 absolute left-1 leading-[11px] top-full mt-0.5 text-xs font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
          {isLoadingRoles && <Loading />}
          {isRoleGettedSuccessfully && (
            <div role="presentation" onClick={toggleShow} className="relative">
              <InputIcon
                value={roles.find((role) => role.id === getValues('role'))?.name}
                placeholder="Rôle"
                additionalClass={twMerge(
                  errors.role && '!border-red-500 border !border-1 text-red-500',
                  'bg-transparent border rounded border-gray-1 active:border-secondary border pr-10',
                )}
                onChange={() => {}}
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
              {show && <DropDown items={roles} setValue={getRole} />}
            </div>
          )}
        </div>
        <Button
          disabled={isPending}
          title={<div className="flex flex-row gap-2">Créer{isPending && <Spinner />}</div>}
          variant="secondary-1"
        />
      </form>
    </CreateModal>
  );
};

export default CreateTypeModal;
