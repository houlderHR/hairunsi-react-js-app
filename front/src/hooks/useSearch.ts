import { useQuery } from '@tanstack/react-query';
import http from '../utils/http-common';

export enum SearchType {
  USER = 'userSearch',
  TYPE = 'typeSearch',
  ROLE = 'roleSearch',
}

const searchUser = <T>(search: string) =>
  http.get<T[]>('/user/search', { params: { search } }).then((response) => response.data);
const searchRole = <T>(search: string) =>
  http.get<T[]>('/role/search', { params: { search } }).then((response) => response.data);
const searchDepartment = <T>(search: string) =>
  http.get<T[]>('/department/search', { params: { search } }).then((response) => response.data);

const getMutationSearchType = <T>(searchType?: string) => {
  switch (searchType) {
    case SearchType.USER:
      return searchUser<T>;
      break;
    case SearchType.ROLE:
      return searchRole<T>;
      break;
    case SearchType.TYPE:
      return searchDepartment<T>;
      break;
    default:
      return searchUser;
  }
};

const useSearch = <T>(searchType: string, searchValue: string) => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: [searchType],
    queryFn: () => getMutationSearchType<T>(searchType)(searchValue),
    enabled: !!searchValue,
  });

  return { data, mutate: refetch, isFetching };
};

export default useSearch;
