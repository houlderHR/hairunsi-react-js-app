import { FC, PropsWithChildren } from 'react';
import Modal from '..';

interface CreateModalProps {
  onClose: () => void;
}

const CreateModal: FC<PropsWithChildren<CreateModalProps>> = ({ children, onClose }) => (
  <Modal onClose={onClose} title="Création de type">
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
