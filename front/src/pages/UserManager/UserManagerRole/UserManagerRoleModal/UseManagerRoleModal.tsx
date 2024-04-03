import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal/DeleteModal';
import { UserObject } from '../constants';
import CreateRoleModal from './CreateRoleModal';
import UpdateRoleModal from './UpdateRoleModal';

interface UserManagerRoleModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  user?: UserObject;
}

const UserManagerRoleModal: FC<UserManagerRoleModalProps> = ({
  modalState,
  setShowModal,
  user,
}) => {
  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateRoleModal onClose={onClose} />;
  }
  if (modalState === ModalShowStateType.DELETE) {
    return <DeleteModal onClose={onClose} />;
  }
  if (user && modalState === ModalShowStateType.UPDATE) {
    return <UpdateRoleModal user={user} onClose={onClose} />;
  }

  return null;
};

export default UserManagerRoleModal;
