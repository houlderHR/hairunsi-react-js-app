import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
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

  return null;
};
export default UserManagerUserModal;
