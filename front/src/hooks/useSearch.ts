import { useMutation } from '@tanstack/react-query';
import http from '../utils/http-common';

export enum SearchType {
  USER = 'user',
  TYPE = 'type',
  ROLE = 'role',
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

const useSearch = <T>(searchType?: string) => {
  const { data, mutate } = useMutation({
    mutationKey: [searchType],
    mutationFn: (search: string) => getMutationSearchType<T>(searchType)(search),
  });

  return { data, mutate };
};

export default useSearch;
