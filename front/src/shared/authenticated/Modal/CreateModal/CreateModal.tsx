import React, { PropsWithChildren } from 'react';
import { ModalShowState } from '../../../../utils/type/ModalShowType';
import Modal from '..';

interface CreateModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
}

const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = ({ children, setShowModal }) => (
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
