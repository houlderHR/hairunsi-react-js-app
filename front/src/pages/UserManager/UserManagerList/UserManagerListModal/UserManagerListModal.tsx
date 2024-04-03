import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import ObjDetail from '../obj-detail';
import CreateUserModal from './CreateUserModal';
import UpdateUserModal from './UpdateUserModal';

interface UserManagerUserModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  user: ObjDetail | null;
}

const UserManagerUserModal: FC<UserManagerUserModalProps> = ({
  modalState,
  user,
  setShowModal,
}) => {
  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };
  if (modalState === ModalShowStateType.CREATE) return <CreateUserModal onClose={onClose} />;
  if (modalState === ModalShowStateType.UPDATE)
    return <UpdateUserModal user={user} onClose={onClose} />;
  return null;
};
export default UserManagerUserModal;
