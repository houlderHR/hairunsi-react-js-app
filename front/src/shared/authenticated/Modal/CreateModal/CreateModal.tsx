import React, { FC, PropsWithChildren } from 'react';
import Modal from '..';
import { ModalShowStateType } from '../Modal';

interface CreateModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const CreateModal: FC<PropsWithChildren<CreateModalProps>> = ({ children, setShowModal }) => (
  <Modal setShowModal={setShowModal} title="Création de type">
    {children}
    <button
      type="button"
      className="w-full bg-secondary py-4 text-sm rounded mt-4 hover:bg-primary font-medium duration-300 text-base text-white"
    >
      Créer
    </button>
  </Modal>
);

export default CreateModal;
