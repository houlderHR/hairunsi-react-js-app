import { useMutation } from '@tanstack/react-query';
import http from '../utils/http-common';

export enum SearchType {
  USER = 'user',
  TYPE = 'type',
  ROLE = 'role',
}

const searchUser = (search: string) => http.get('/user/search', { data: search });
const searchRole = (search: string) => http.get('/user/role', { data: search });
const searchDepartment = (search: string) => http.get('/user/type', { data: search });

const getMutationSearchType = (searchType?: string) => {
  switch (searchType) {
    case SearchType.USER:
      return searchUser;
      break;
    case SearchType.ROLE:
      return searchRole;
      break;
    case SearchType.TYPE:
      return searchDepartment;
      break;
    default:
      return searchUser;
  }
};

const useSearch = (searchType?: string) => {
  const { data, mutate } = useMutation({
    mutationKey: [searchType],
    mutationFn: (search: string) => getMutationSearchType(searchType)(search),
  });

  return { data, mutate };
};

export default useSearch;
