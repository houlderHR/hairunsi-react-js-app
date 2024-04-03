import { FC, PropsWithChildren } from 'react';
import Modal from '..';
import ButtonSimple from './ButtonSimple/ButtonSimple';

interface DeleteModalProps {
  onClose: () => void;
  title?: string;
  type?: string;
  icon?: string;
}

const DeleteModal: FC<PropsWithChildren<DeleteModalProps>> = ({ title, type, icon, onClose }) => (
  <Modal onClose={onClose} title={title}>
    <div className="mt-1 flex justify-center">
      <img src={`/icon/${icon}.svg`} alt="f4" srcSet="" />
    </div>
    <div className="text-center py-5 mb-8">
      <h2 className="text-secondary text-xl mb-2">
        Vous êtes sur le point de supprimer ce {type} d’utilisateur.
      </h2>
      <h3 className="text-gray-1 text-base">
        Etes-vous sûr de vouloir supprimer ce {type} d’utilisateur?{' '}
      </h3>
    </div>
    <div className="flex gap-2">
      <ButtonSimple
        title="Annuler"
        icon="x"
        addClass="bg-transparent border border-gray-1 text-black-1"
        onClick={() => ''}
      />
      <ButtonSimple
        title="Supprimer"
        icon="trash-1"
        addClass="bg-danger-2 text-white"
        onClick={() => ''}
      />
    </div>
  </Modal>
);

export default DeleteModal;
