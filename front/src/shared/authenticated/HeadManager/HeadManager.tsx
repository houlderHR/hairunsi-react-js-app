import { ChangeEvent, FC, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import useSearch from '../../../hooks/useSearch';
import InputIcon from '../../inputs/InputIcon';
import Button from '../buttons/Button';

interface HeadManagerProps {
  onOpen: () => void;
  title: string;
  searchType?: string;
}

const HeadManager: FC<HeadManagerProps> = ({ onOpen, title, searchType = 'user' }) => {
  const { data } = useSearch(searchType);
  const [search, setSearch] = useState('');
  const searchValue = useDebounce(search, 300);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex flex-row gap-x-4">
      <Button
        classTitle="hidden md:inline-block"
        onClick={onOpen}
        icon="add"
        title={title}
        variant="secondary"
      />
      <InputIcon icon="search" onChange={onChange} value={search} placeholder="Search" />
    </div>
  );
};

export default HeadManager;
