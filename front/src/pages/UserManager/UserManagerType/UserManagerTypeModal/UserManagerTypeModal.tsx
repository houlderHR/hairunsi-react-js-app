import { ModalShowState } from '../../../../utils/type/ModalShowType';
import CreateModalType from './CreateModalType';

interface UserManagerTypeModalProps {
  modalState: ModalShowState;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowState>>;
}

const UserManagerTypeModal: React.FC<UserManagerTypeModalProps> = ({ modalState, setShowModal }) =>
  modalState.create && <CreateModalType setShowModal={setShowModal} />;

export default UserManagerTypeModal;
