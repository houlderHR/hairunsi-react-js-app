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
}) => (
  <>
    {modalState === ModalShowStateType.CREATE && <CreateTypeModal setShowModal={setShowModal} />}
    {user && modalState === ModalShowStateType.UPDATE && (
      <UpdateTypeModal setShowModal={setShowModal} user={user} />
    )}
  </>
);

export default UserManagerTypeModal;
