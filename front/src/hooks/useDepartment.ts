import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import DepartmentDto from '../dto/department.dto';
import http from '../utils/http-common';
import { REGEX_ID } from '../utils/regex';

export const schema = yup.object({
  name: yup
    .string()
    .required('Le nom du département est requis')
    .min(4, 'Le nom du département doit contenir au moin 4 caractères'),
  role: yup.string().required('Vous devez séléctionner un rôle').matches(REGEX_ID),
});

const createDepartment = (_department: { name: string | undefined; role: string | undefined }) =>
  http.post<DepartmentDto>(`department`, _department).then((response) => response.data);

const updateDepartment = (
  _department: { name: string | undefined; role: string | undefined },
  department?: DepartmentDto,
) =>
  http
    .put<DepartmentDto>(`department/${department?.id}`, _department)
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
    mutationFn: (_department: { name: string | undefined; role: string | undefined }) =>
      getActionDepartment(type)(_department, department),
  });
