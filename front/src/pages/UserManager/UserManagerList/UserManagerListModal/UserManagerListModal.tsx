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
  if (modalState === ModalShowStateType.CREATE)
    return <CreateUserModal setShowModal={setShowModal} />;
  if (modalState === ModalShowStateType.UPDATE)
    return <UpdateUserModal user={user} setShowModal={setShowModal} />;
  return null;
};
export default UserManagerUserModal;
