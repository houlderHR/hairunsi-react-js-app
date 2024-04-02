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
  if (modalState === ModalShowStateType.CREATE)
    return <CreateTypeModal setShowModal={setShowModal} />;

  if (user && modalState === ModalShowStateType.UPDATE)
    return <UpdateTypeModal setShowModal={setShowModal} user={user} />;

  return null;
};

export default UserManagerTypeModal;
