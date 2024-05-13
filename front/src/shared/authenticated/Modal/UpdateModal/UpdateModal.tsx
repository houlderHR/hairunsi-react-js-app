import { FC, PropsWithChildren } from 'react';
import Button from '../../buttons/Button';
import Modal from '..';

interface UpdateModalProps {
  onClose: () => void;
  title: string;
}

const UpdateModal: FC<PropsWithChildren<UpdateModalProps>> = ({ children, title, onClose }) => (
  <Modal onClose={onClose} title={title}>
    {children}
    {/* <Button title="Modifier" variant="secondary-1" /> */}
  </Modal>
);

export default UpdateModal;
