import { FC, PropsWithChildren } from 'react';
import Modal from '..';
import ButtonSimple from './ButtonSimple/ButtonSimple';

interface DeleteModalProps {
  onClose: () => void;
  title?: string;
  icon?: string;
}

const DeleteModal: FC<PropsWithChildren<DeleteModalProps>> = ({
  children,
  title,
  icon,
  onClose,
}) => (
  <Modal onClose={onClose} title={title}>
    <span>{icon}</span>
    tmp
    {children}
    <div className="flex">
      <ButtonSimple
        title="Annuler"
        icon="x"
        addClass="bg-transparent border border-gray-1 text-black-1"
        onClick={() => ''}
      />
      <ButtonSimple title="Supprimer" onClick={() => ''} />
    </div>
  </Modal>
);

export default DeleteModal;
