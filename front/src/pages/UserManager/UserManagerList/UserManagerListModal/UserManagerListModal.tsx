import { FC } from 'react';
import ObjDetail from '../../../../dto/user.dto';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import CreateOrUpdateUserModal from './CreateOrUpdateUserModal';

interface UserManagerUserModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  user: ObjDetail | null;
  setUser: React.Dispatch<React.SetStateAction<ObjDetail | null>>;
  onDelete: () => void;
  isDeleting?: boolean;
}

const UserManagerUserModal: FC<UserManagerUserModalProps> = ({
  modalState,
  user,
  setUser,
  setShowModal,
  onDelete,
  isDeleting,
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
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
    );

  return null;
};
export default UserManagerUserModal;
