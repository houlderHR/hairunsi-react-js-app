import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, MouseEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import Button from '../../../../../shared/authenticated/buttons/Button';
import DropDown from '../../../../../shared/authenticated/Modal/DropDown';
import UpdateModal from '../../../../../shared/authenticated/Modal/UpdateModal';
import Icon from '../../../../../shared/Icon';
import Input from '../../../../../shared/inputs/Input';
import InputIcon from '../../../../../shared/inputs/InputIcon';
import http from '../../../../../utils/http-common';
import { DepartmentType } from '../../type';

const schema = yup.object({
  name: yup.string().required().min(4, 'Le nom du département doit contenir au moin 4 caractères'),
  role: yup
    .string()
    .required()
    .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/),
});

interface UpdateModalTypeProps {
  onClose: () => void;
  department: DepartmentType;
}

const UpdateTypeModal: FC<UpdateModalTypeProps> = ({ onClose, department }) => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: onUpdateDepartment } = useMutation({
    mutationKey: ['department', { department }],
    mutationFn: (_department: { name: string; role: string }) =>
      http
        .put<DepartmentType>(`department/${department?.id}`, _department)
        .then((response) => response.data),
  });

  const updateDepartment = async (_data: { name: string; role: string }) => {
    try {
      await onUpdateDepartment(_data);
      await queryClient.invalidateQueries({ queryKey: ['department'] });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const { data: roles } = useQuery({
    queryKey: ['dropdownRole'],
    queryFn: () =>
      http.get<{ id: string; name: string }[]>('role').then((response) => response.data),
  });
  const {
    control,
    handleSubmit,
    setValue: setRoleTypeValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: department.name, role: department.role.id },
  });

  const toggleShow = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShow((s) => !s);
  };

  const getRole = (id: string, e?: MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setShow(false);
    setRoleTypeValue('role', id);
  };

  const onSubmit = (data: { name: string; role: string }) => {
    updateDepartment({ ...data });
  };

  return (
    <UpdateModal onClose={onClose} title="Modification de type">
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
          <div role="presentation" onClick={toggleShow} className="relative">
            <InputIcon
              value={roles?.filter((role) => role.id === getValues('role'))[0].name}
              placeholder="Rôle"
              additionalClass="py-1 hover:bg-gray-50"
              onChange={() => {}}
              additionalInputClass="text-base"
              icon="search"
              endIcon={<Icon name="x" size={12} className="text-gray-500" />}
            />
            {show && <DropDown items={roles} setValue={getRole} />}
          </div>
        </div>
        <Button title="Modifier" variant="secondary-1" />
      </form>
    </UpdateModal>
  );
};

export default UpdateTypeModal;
