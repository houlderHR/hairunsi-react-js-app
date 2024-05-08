import { FC } from 'react';
import InputIcon from '../../inputs/InputIcon';
import Button from '../buttons/Button';

interface HeadManagerProps {
  onOpen: () => void;
  title: string;
}

const HeadManager: FC<HeadManagerProps> = ({ onOpen, title }) => (
  <div className="flex flex-row gap-x-4">
    <Button
      classTitle="hidden md:inline-block"
      onClick={onOpen}
      icon="add"
      title={title}
      variant="secondary"
    />
    <InputIcon icon="search" placeholder="Search" />
  </div>
);

export default HeadManager;
