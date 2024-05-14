import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { SearchType } from '../../../../hooks/useSearch';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import http from '../../../../utils/http-common';
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
  const queryClient = useQueryClient();
  const {
    mutateAsync: onDeleteDepartment,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ['deleteDepartment'],
    mutationFn: () =>
      http.delete<DepartmentType>(`department/${department?.id}`).then((response) => response.data),
  });

  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };
  const onDelete = async () => {
    try {
      await onDeleteDepartment();
      await queryClient.invalidateQueries({ queryKey: ['department'] });
      await queryClient.invalidateQueries({ queryKey: [SearchType.TYPE] });
      onClose();
    } catch (error) {
      console.log(error);
    }
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
        onDelete={onDelete}
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
