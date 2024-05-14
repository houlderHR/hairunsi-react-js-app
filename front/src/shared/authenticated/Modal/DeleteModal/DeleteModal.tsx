import { FC, PropsWithChildren } from 'react';
import Button from '../../buttons/Button';
import Modal from '..';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description: string;
  confirmation: string;
  icon?: string;
  onDelete: () => void;
}

const DeleteModal: FC<PropsWithChildren<DeleteModalProps>> = ({
  title,
  description,
  confirmation,
  icon,
  onClose,
  onDelete,
}) => (
  <Modal onClose={onClose} title={title}>
    <div className="mt-1 flex justify-center">
      <img src={`/icon/${icon}.svg`} width={74} height={74} alt="f4" />
    </div>
    <div className="text-center py-5 mb-10">
      <h2 className="text-secondary text-xl mb-3 font-medium">{description}</h2>
      <h3 className="text-gray-1 text-base">{confirmation}</h3>
    </div>
    <div className="flex flex-col md:flex-row gap-2">
      <Button title="Annuler" icon="x" className="uppercase" onClick={onClose} />
      <Button
        onClick={onDelete}
        title="Supprimer"
        icon="trash-1"
        className="uppercase"
        iconSize={18}
        variant="danger"
        onClick={onDelete}
      />
    </div>
  </Modal>
);

export default DeleteModal;
