import { useQuery } from '@tanstack/react-query';
import http from '../utils/http-common';
import { QUERY_ROLE_KEY } from '../utils/query.constants';

export const useGetRoleQuery = () =>
  useQuery({
    queryKey: [QUERY_ROLE_KEY],
    queryFn: () => http.get('/role').then((res) => res.data),
  });

export const useDeleteRole = (id: string) =>
  useQuery({
    queryKey: [QUERY_ROLE_KEY],
    queryFn: () => http.get(`/role/${id}`).then((res) => res.data),
  });
