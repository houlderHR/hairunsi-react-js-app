import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import useSearch, { SearchType } from '../../../hooks/useSearch';
import InputIcon from '../../inputs/InputIcon';
import Button from '../buttons/Button';

interface HeadManagerProps<T> {
  onOpen: () => void;
  title: string;
  searchType?: SearchType;
  allowCreation?: boolean;
  pushSearch: (s: T[] | undefined) => void;
  getSearchLoading?: (isLoading: boolean) => void;
}

const HeadManager = <T,>({
  onOpen,
  title,
  pushSearch,
  allowCreation = true,
  searchType = SearchType.USER,
  getSearchLoading,
}: HeadManagerProps<T>) => {
  const [search, setSearch] = useState<string>('');
  const searchValue = useDebounce(search, 300);
  const { data, mutate, isFetching } = useSearch<T>(searchType, searchValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const loadSearch = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (searchValue !== '') {
      loadSearch();
    }
  }, [loadSearch, searchValue]);

  useEffect(() => {
    if (searchValue === '') {
      pushSearch(undefined);
      return;
    }
    pushSearch(data);
  }, [data, pushSearch, searchValue]);

  useEffect(() => getSearchLoading && getSearchLoading(isFetching), [isFetching, getSearchLoading]);

  return (
    <div className="flex flex-row gap-x-4 sticky top-32 z-50">
      {allowCreation && (
        <Button
          classTitle="hidden md:inline-block"
          onClick={onOpen}
          icon="add"
          title={title}
          variant="secondary"
        />
      )}
      <InputIcon icon="search" onChange={onChange} value={search} placeholder="Search" />
    </div>
  );
};

export default HeadManager;
