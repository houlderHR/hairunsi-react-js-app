import { FC, PropsWithChildren } from 'react';
import Button from '../../buttons/Button';
import Modal from '..';

interface CreateModalProps {
  onClose: () => void;
  title: string;
}

const CreateModal: FC<PropsWithChildren<CreateModalProps>> = ({ children, title, onClose }) => (
  <Modal onClose={onClose} title={title}>
    {children}
    <Button title="Créer" variant="secondary-1" />
  </Modal>
);

export default CreateModal;
