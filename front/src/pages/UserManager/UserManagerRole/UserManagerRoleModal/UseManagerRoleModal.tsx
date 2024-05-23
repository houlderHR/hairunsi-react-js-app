import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleResponseDto } from '../../../../dto/role.dto';
import { useDeleteRole } from '../../../../hooks/useRole';
import routes from '../../../../routes/paths';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import CreateOrUpdateRoleModal from './CreateOrUpdateRoleModal';

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
  const { mutateAsync: mutationDelete, isPending } = useDeleteRole(role?.id);
  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      await mutationDelete();
      setShowModal(ModalShowStateType.CLOSE);
    } catch (error) {
      navigate(routes.server_error.path);
    }
  };

  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateOrUpdateRoleModal onClose={onClose} />;
  }
  if (modalState === ModalShowStateType.DELETE) {
    return (
      <DeleteModal
        icon="role"
        description=" Vous êtes sur le point de supprimer ce rôle d’utilisateur."
        confirmation=" Etes-vous sûr de vouloir supprimer ce rôle d’utilisateur?"
        onClose={onClose}
        isDeleting={isPending}
        onDelete={onDelete}
      />
    );
  }
  if (role && modalState === ModalShowStateType.UPDATE) {
    return <CreateOrUpdateRoleModal updateRole={role} onClose={onClose} />;
  }

  return null;
};

export default UserManagerRoleModal;
