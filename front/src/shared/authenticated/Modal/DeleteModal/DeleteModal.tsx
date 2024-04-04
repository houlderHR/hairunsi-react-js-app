import { FC, PropsWithChildren } from 'react';
import CustomizableButton from '../../buttons/CustomizableButton';
import Modal from '..';

interface DeleteModalProps {
  onClose: () => void;
  title?: string;
  description: string;
  confirmation: string;
  icon?: string;
}

const DeleteModal: FC<PropsWithChildren<DeleteModalProps>> = ({
  title,
  description,
  confirmation,
  icon,
  onClose,
}) => (
  <Modal onClose={onClose} title={title}>
    <div className="mt-1 flex justify-center">
      <img src={`/icon/${icon}.svg`} alt="f4" srcSet="" />
    </div>
    <div className="text-center py-5 mb-10">
      <h2 className="text-secondary text-xl mb-3 font-medium">{description}</h2>
      <h3 className="text-gray-1 text-base">{confirmation}</h3>
    </div>
    <div className="flex gap-2">
      <CustomizableButton
        title="Annuler"
        icon="x"
        addClass="bg-transparent border border-gray-1 text-black-1"
        onClick={onClose}
      />
      <CustomizableButton
        title="Supprimer"
        icon="trash-1"
        iconSize={18}
        addClass="bg-danger-2 text-white"
        onClick={() => ''}
      />
    </div>
  </Modal>
);

export default DeleteModal;
