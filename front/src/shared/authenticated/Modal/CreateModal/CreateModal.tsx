import React, { PropsWithChildren } from 'react';
import Modal from '..';
import { ModalShowState } from '../../../../utils/type/ModalShowType';

interface CreateModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
}

const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = ({ children, setShowModal }) => {
  return (
    <>
      <Modal setShowModal={setShowModal} title="Création de type">
        {children}
        <button className="w-full bg-secondary py-4 text-sm rounded mt-4 hover:bg-primary font-medium duration-300 text-base text-white">
          Créer
        </button>
      </Modal>
    </>
  );
};

export default CreateModal;
