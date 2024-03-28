import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import CreateTypeModal from './CreateRoleModal';

interface UserManagerRoleModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const UserManagerTypeModal: FC<UserManagerRoleModalProps> = ({ modalState, setShowModal }) =>
  modalState === ModalShowStateType.CREATE && <CreateTypeModal setShowModal={setShowModal} />;

export default UserManagerTypeModal;
