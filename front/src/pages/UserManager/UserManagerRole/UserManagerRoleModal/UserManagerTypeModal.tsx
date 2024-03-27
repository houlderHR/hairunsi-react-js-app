import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import CreateTypeModal from './CreateTypeModal';

interface UserManagerTypeModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
}

const UserManagerTypeModal: FC<UserManagerTypeModalProps> = ({ modalState, setShowModal }) =>
  modalState === ModalShowStateType.CREATE && <CreateTypeModal setShowModal={setShowModal} />;

export default UserManagerTypeModal;
