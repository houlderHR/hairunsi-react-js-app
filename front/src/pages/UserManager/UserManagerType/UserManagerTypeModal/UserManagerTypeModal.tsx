import { FC } from 'react';
import ModalShowState from '../../../../utils/type/ModalShowType';
import CreateModalType from './CreateModalType';

interface UserManagerTypeModalProps {
  modalState: ModalShowState;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
}

const UserManagerTypeModal: FC<UserManagerTypeModalProps> = ({ modalState, setShowModal }) =>
  modalState === ModalShowState.CREATE && <CreateModalType setShowModal={setShowModal} />;

export default UserManagerTypeModal;
