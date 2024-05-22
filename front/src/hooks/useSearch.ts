import { useQuery } from '@tanstack/react-query';
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
      return search<T>('/user/search');
    case SearchType.ROLE:
      return search<T>('/role/search');
    case SearchType.TYPE:
      return search<T>('/department/search');
    default:
      return search<T>('/user/search');
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
