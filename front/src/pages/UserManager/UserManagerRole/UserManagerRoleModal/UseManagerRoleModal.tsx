import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import CreateRoleModal from './CreateRoleModal';

interface UserManagerRoleModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const UserManagerRoleModal: FC<UserManagerRoleModalProps> = ({ modalState, setShowModal }) => {
  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateRoleModal onClose={onClose} />;
  }

  return null;
};

export default UserManagerRoleModal;
