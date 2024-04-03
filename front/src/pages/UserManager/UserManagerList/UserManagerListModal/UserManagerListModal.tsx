import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import CreateUserModal from './CreateUserModal';

interface UserManagerUserModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const UserManagerUserModal: FC<UserManagerUserModalProps> = ({ modalState, setShowModal }) =>
  modalState === ModalShowStateType.CREATE && <CreateUserModal setShowModal={setShowModal} />;
export default UserManagerUserModal;
