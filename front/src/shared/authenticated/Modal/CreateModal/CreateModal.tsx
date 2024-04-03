import { FC, PropsWithChildren } from 'react';
import Modal from '..';

interface CreateModalProps {
  onClose: () => void;
  title: string;
}

const CreateModal: FC<PropsWithChildren<CreateModalProps>> = ({ children, title, onClose }) => (
  <Modal onClose={onClose} title={title}>
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
