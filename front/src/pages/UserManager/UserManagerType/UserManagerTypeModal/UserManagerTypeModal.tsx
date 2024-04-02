import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
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

  return null;
};

export default UserManagerTypeModal;
