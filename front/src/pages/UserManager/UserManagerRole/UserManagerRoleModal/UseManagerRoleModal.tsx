import { FC } from 'react';
import { RoleResponseDto } from '../../../../dto/role.dto';
// import UpdateRoleModal from './UpdateRoleModal';
import { useDeleteRole } from '../../../../hooks/useRole';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import CreateRoleModal from './CreateOrUpdateRoleModal';

interface UserManagerRoleModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  role?: RoleResponseDto;
}

const UserManagerRoleModal: FC<UserManagerRoleModalProps> = ({
  modalState,
  setShowModal,
  role,
}) => {
  const mutation = useDeleteRole(role?.id);

  const onDelete = async () => {
    try {
      await mutation.mutateAsync();
      setShowModal(ModalShowStateType.CLOSE);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateRoleModal onClose={onClose} />;
  }
  if (modalState === ModalShowStateType.DELETE) {
    return (
      <DeleteModal
        icon="role"
        description=" Vous êtes sur le point de supprimer ce rôle d’utilisateur."
        confirmation=" Etes-vous sûr de vouloir supprimer ce rôle d’utilisateur?"
        onClose={onClose}
        onDelete={onDelete}
      />
    );
  }
  if (role && modalState === ModalShowStateType.UPDATE) {
    return <CreateRoleModal updateRole={role} onClose={onClose} />;
  }

  return null;
};

export default UserManagerRoleModal;
