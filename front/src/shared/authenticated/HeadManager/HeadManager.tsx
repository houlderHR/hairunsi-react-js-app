import { FC } from 'react';
import InputIcon from '../../inputs/InputIcon';
import ButtonAdd from '../buttons/ButtonAdd';

interface HeadManagerProps {
  onOpen: () => void;
  title: string;
}

const HeadManager: FC<HeadManagerProps> = ({ onOpen, title }) => (
  <div className="flex flex-row gap-x-4">
    <ButtonAdd
      onClick={onOpen}
      title={title}
      additionalClass="md:min-w-60 hover:bg-secondary duration-300"
    />
    <InputIcon icon="search" placeholder="Search" />
  </div>
);

export default HeadManager;
