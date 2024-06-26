import { FC, PropsWithChildren } from 'react';
import Spinner from '../../../Spinner';
import Button from '../../buttons/Button';
import Modal from '..';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description: string;
  confirmation: string;
  isDeleting?: boolean;
  icon?: string;
}

const DeleteModal: FC<PropsWithChildren<DeleteModalProps>> = ({
  title,
  description,
  confirmation,
  icon,
  onClose,
  onDelete,
  isDeleting,
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
      <Button
        title="Annuler"
        icon="x"
        className="uppercase text-black-1 !border-gray-9 text-sm font-medium"
        onClick={onClose}
      />
      <Button
        onClick={onDelete}
        title={
          <span className="flex flex-row gap-1 items-center justify-center">
            {isDeleting ? <Spinner additionalClassName="!text-white fill-red-400" /> : 'Supprimer'}
          </span>
        }
        icon={!isDeleting ? 'trash-1' : ''}
        className="uppercase text-sm font-medium"
        iconSize={18}
        variant="danger"
      />
    </div>
  </Modal>
);

export default DeleteModal;
