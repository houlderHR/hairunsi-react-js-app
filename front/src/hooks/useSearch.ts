import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { endpoint } from '../routes/endpoints';
import http from '../utils/http-common';

export enum SearchType {
  USER = 'userSearch',
  TYPE = 'typeSearch',
  ROLE = 'roleSearch',
}

const search =
  <T>(path: string) =>
  (_search: string) =>
    http.get<T[]>(path, { params: { search: _search } }).then((response) => response.data);

const getMutationSearchType = <T>(searchType?: string) => {
  switch (searchType) {
    case SearchType.USER:
      return search<T>(endpoint.user.search);
    case SearchType.ROLE:
      return search<T>(endpoint.role.search);
    case SearchType.TYPE:
      return search<T>(endpoint.department.search);
    default:
      return search<T>(endpoint.department.search);
  }
};

const useSearch = <T>(searchType: string, searchValue: string) =>
  useQuery<T[], AxiosError>({
    queryKey: [searchType],
    queryFn: () => getMutationSearchType<T>(searchType)(searchValue.trim()),
    enabled: !!searchValue.trim(),
  });

export default useSearch;
