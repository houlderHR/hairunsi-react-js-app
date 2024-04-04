import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import { UserType } from '../constants';
import CreateTypeModal from './CreateTypeModal';
import UpdateTypeModal from './UpdateTypeModal';

interface UserManagerTypeModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  user?: UserType;
}

const UserManagerTypeModal: FC<UserManagerTypeModalProps> = ({
  modalState,
  setShowModal,
  user,
}) => {
  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateTypeModal onClose={onClose} />;
  }

  if (user && modalState === ModalShowStateType.UPDATE) {
    return <UpdateTypeModal onClose={onClose} user={user} />;
  }
  if (modalState === ModalShowStateType.DELETE) {
    return (
      <DeleteModal
        icon="role"
        description=" Vous êtes sur le point de supprimer ce type d’utilisateur."
        confirmation=" Etes-vous sûr de vouloir supprimer ce type d’utilisateur?"
        onClose={onClose}
      />
    );
  }

  return null;
};

export default UserManagerTypeModal;
