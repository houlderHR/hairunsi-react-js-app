import React, { FC } from 'react';
import ModalShowStateType from '../../../utils/type/ModalShowType';
import ButtonAdd from '../buttons/ButtonAdd';
import InputIcon from '../Input/InputIcon';

interface HeadManagerProps {
  openCreateModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  title: string;
}

const HeadManager: FC<HeadManagerProps> = ({ openCreateModal, title }) => (
  <div className="flex flex-row gap-x-4">
    <ButtonAdd
      openModal={openCreateModal}
      title={title}
      additionalClass="md:min-w-60 hover:bg-secondary duration-300"
    />
    <InputIcon icon="search" placeholder="Search" />
  </div>
);

export default HeadManager;
