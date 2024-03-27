import React from 'react';
import InputIcon from '../Input/InputIcon';
import ButtonAdd from '../buttons/ButtonAdd';
import { ModalShowState } from '../../../utils/type/ModalShowType';

interface HeadManagerProps {
  openCreateModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
  title: string;
}

const HeadManager: React.FC<HeadManagerProps> = ({ openCreateModal, title }) => {
  return (
    <>
      <div className="flex flex-row gap-x-4">
        <ButtonAdd
          openModal={openCreateModal}
          title={title}
          additionalClass="md:min-w-60 hover:bg-secondary duration-300"
        />
        <InputIcon icon="search" placeholder="Search" />
      </div>
    </>
  );
};

export default HeadManager;
