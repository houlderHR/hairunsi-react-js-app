import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import DepartmentDto, { CreateOrUpdateDepartmentDto } from '../dto/department.dto';
import { endpoint } from '../routes/endpoints';
import http from '../utils/http-common';
import { REGEX_ID } from '../utils/regex';

export const schema = yup.object({
  name: yup
    .string()
    .trim('Le nom du type doit contenir au moin 4 caractères')
    .required('Le nom du type est requis')
    .min(4, 'Le nom du type doit contenir au moin 4 caractères'),
  role: yup.string().required('Vous devez séléctionner un rôle').matches(REGEX_ID),
});

const createDepartment = (_department: CreateOrUpdateDepartmentDto) =>
  http
    .post<DepartmentDto>(endpoint.department.create, _department)
    .then((response) => response.data);

const updateDepartment = (_department: CreateOrUpdateDepartmentDto, department?: DepartmentDto) =>
  http
    .put<DepartmentDto>(`${endpoint.department.update}/${department?.id}`, _department)
    .then((response) => response.data);

const getActionDepartment = (type: 'createDepartment' | 'updateDepartment') => {
  switch (type) {
    case 'createDepartment':
      return createDepartment;
    case 'updateDepartment':
      return updateDepartment;
    default:
      return createDepartment;
  }
};

export const useFetchDepartment = (
  type: 'createDepartment' | 'updateDepartment',
  department?: DepartmentDto,
) =>
  useMutation({
    mutationKey: [type],
    mutationFn: (_department: CreateOrUpdateDepartmentDto) =>
      getActionDepartment(type)(_department, department),
  });
