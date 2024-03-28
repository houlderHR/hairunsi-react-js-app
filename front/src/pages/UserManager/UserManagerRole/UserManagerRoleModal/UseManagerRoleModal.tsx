import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import CreateTypeModal from './CreateRoleModal';

interface UserManagerRoleModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const UserManagerRoleModal: FC<UserManagerRoleModalProps> = ({ modalState, setShowModal }) =>
  modalState === ModalShowStateType.CREATE && <CreateTypeModal setShowModal={setShowModal} />;

export default UserManagerRoleModal;
