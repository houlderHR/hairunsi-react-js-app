import { FC, PropsWithChildren } from 'react';
import Modal from '..';

interface UpdateModalProps {
  onClose: () => void;
  title: string;
}

const UpdateModal: FC<PropsWithChildren<UpdateModalProps>> = ({ children, title, onClose }) => (
  <Modal onClose={onClose} title={title}>
    {children}
  </Modal>
);

export default UpdateModal;
