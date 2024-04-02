import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import CreateRoleModal from './CreateRoleModal';

interface UserManagerRoleModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const UserManagerRoleModal: FC<UserManagerRoleModalProps> = ({ modalState, setShowModal }) =>
  modalState === ModalShowStateType.CREATE && <CreateRoleModal setShowModal={setShowModal} />;

export default UserManagerRoleModal;
