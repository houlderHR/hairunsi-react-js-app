import { FC, PropsWithChildren } from 'react';
import Modal from '..';

interface CreateModalProps {
  onClose: () => void;
  title: string;
}

const CreateModal: FC<PropsWithChildren<CreateModalProps>> = ({ children, title, onClose }) => (
  <Modal onClose={onClose} title={title}>
    {children}
  </Modal>
);

export default CreateModal;
