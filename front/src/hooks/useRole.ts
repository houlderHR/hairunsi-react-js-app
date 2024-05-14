import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateRoleDto } from '../dto/role.dto';
import http from '../utils/http-common';
import { QUERY_ROLE_KEY } from '../utils/query.constants';

const BASE_PATH = '/role';

export const useGetRoleQuery = () =>
  useQuery({
    queryKey: [QUERY_ROLE_KEY],
    queryFn: () => http.get(BASE_PATH).then((res) => res.data),
  });

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) => http.post(`${BASE_PATH}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
    },
  });
};

export const useUpdateRole = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) =>
      http.put(`${BASE_PATH}/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
    },
  });
};

export const useDeleteRole = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => http.delete(`${BASE_PATH}/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
    },
  });
};
