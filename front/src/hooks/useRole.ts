import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateRoleDto } from '../dto/role.dto';
import { ROLE } from '../routes/endpoints';
import http from '../utils/http-common';
import { QUERY_ROLE_KEY, QUERY_TOKEN_AUTH_KEY } from '../utils/query.constants';
import { SearchType } from './useSearch';

export const useGetRoleQuery = () =>
  useQuery({
    queryKey: [QUERY_ROLE_KEY],
    queryFn: () => http.get(ROLE.BASE_PATH).then((res) => res.data),
  });

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) =>
      http.post(`${ROLE.BASE_PATH}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
      queryClient.invalidateQueries({ queryKey: [SearchType.ROLE] });
    },
  });
};

export const useUpdateRole = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleDto) =>
      http.put(`${ROLE.BASE_PATH}/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
      queryClient.invalidateQueries({ queryKey: [SearchType.ROLE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_TOKEN_AUTH_KEY] });
    },
  });
};

export const useDeleteRole = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => http.delete(`${ROLE.BASE_PATH}/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
      queryClient.invalidateQueries({ queryKey: [SearchType.ROLE] });
    },
  });
};
