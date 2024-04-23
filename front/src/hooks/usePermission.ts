import { useQuery } from '@tanstack/react-query';
import http from '../utils/http-common';
import { QUERY_PERMISSION_KEY } from '../utils/query.constants';

const BASE_PATH = '/permission';

const useGetPermissionQuery = () =>
  useQuery({
    queryKey: [QUERY_PERMISSION_KEY],
    queryFn: () => http.get(BASE_PATH).then((res) => res.data),
  });

export default useGetPermissionQuery;
