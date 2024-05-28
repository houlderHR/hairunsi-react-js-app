import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import useSearch, { SearchType } from '../../../hooks/useSearch';
import routes from '../../../routes/paths';
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
  const { data, refetch: mutate, isFetching, error } = useSearch<T>(searchType, searchValue);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      mutate();
    }
  }, [mutate, searchValue]);

  useEffect(() => {
    if (error?.code === 'ERR_NETWORK') {
      navigate(routes.server_error.path);
    }
  }, [error?.code, error, navigate]);

  useEffect(() => {
    if (searchValue.trim().length === 0) {
      pushSearch(undefined);
      return;
    }
    if (data) {
      pushSearch(data);
    }
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
