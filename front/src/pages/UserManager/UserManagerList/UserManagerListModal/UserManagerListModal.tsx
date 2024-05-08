import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import ObjDetail from '../obj-detail';
import CreateOrUpdateUserModal from './CreateOrUpdateUserModal';

interface UserManagerUserModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  user: ObjDetail | null;
  setUser: React.Dispatch<React.SetStateAction<ObjDetail | null>>;
}

const UserManagerUserModal: FC<UserManagerUserModalProps> = ({
  modalState,
  user,
  setUser,
  setShowModal,
}) => {
  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
    setUser(null);
  };
  if (modalState === ModalShowStateType.CREATE || modalState === ModalShowStateType.UPDATE)
    return <CreateOrUpdateUserModal user={user} onClose={onClose} />;
  if (modalState === ModalShowStateType.DELETE)
    return (
      <DeleteModal
        description="Vous êtes sur le point d’enlever cet utilisateur."
        confirmation="Etes-vous sûr de vouloir supprimer cet utilisateur ?"
        onClose={onClose}
        icon="delete-user"
      />
    );

  return null;
};
export default UserManagerUserModal;
