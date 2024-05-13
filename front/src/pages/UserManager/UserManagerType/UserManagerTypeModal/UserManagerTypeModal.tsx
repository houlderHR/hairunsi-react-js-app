import { FC } from 'react';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import { DepartmentType } from '../type';
import CreateTypeModal from './CreateTypeModal';
import UpdateTypeModal from './UpdateTypeModal';

interface UserManagerTypeModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  department?: DepartmentType;
}

const UserManagerTypeModal: FC<UserManagerTypeModalProps> = ({
  modalState,
  setShowModal,
  department,
}) => {
  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateTypeModal onClose={onClose} />;
  }

  if (department && modalState === ModalShowStateType.UPDATE) {
    return <UpdateTypeModal onClose={onClose} department={department} />;
  }
  if (modalState === ModalShowStateType.DELETE) {
    return (
      <DeleteModal
        icon="role"
        description=" Vous êtes sur le point de supprimer ce type d’utilisateur."
        confirmation=" Etes-vous sûr de vouloir supprimer ce type d’utilisateur?"
        onClose={onClose}
      />
    );
  }

  return null;
};

export default UserManagerTypeModal;
