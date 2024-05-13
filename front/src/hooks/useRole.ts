import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import RoleDto from '../dto/role.dto';
import http from '../utils/http-common';
import { QUERY_ROLE_KEY } from '../utils/query.constants';

const BASE_PATH = '/role';

export const useGetRoleQuery = () =>
  useQuery({
    queryKey: [QUERY_ROLE_KEY],
    queryFn: () => http.get(BASE_PATH).then((res) => res.data),
  });

export const useCreateRole = () =>
  useMutation({
    mutationFn: (data: RoleDto) => http.post(`${BASE_PATH}`, data).then((res) => res.data),
  });

export const useDeleteRole = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => http.delete(`${BASE_PATH}/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_ROLE_KEY] });
    },
  });
};
