import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DepartmentDto from '../../../../dto/department.dto';
import { SearchType } from '../../../../hooks/useSearch';
import { endpoint } from '../../../../routes/endpoints';
import routes from '../../../../routes/paths';
import { ModalShowStateType } from '../../../../shared/authenticated/Modal';
import DeleteModal from '../../../../shared/authenticated/Modal/DeleteModal';
import http from '../../../../utils/http-common';
import { QUERY_TOKEN_AUTH_KEY } from '../../../../utils/query.constants';
import CreateOrUpdateTypeModal from './CreateOrUpdateTypeModal';

interface UserManagerTypeModalProps {
  modalState: ModalShowStateType;
  setShowModal: React.Dispatch<React.SetStateAction<ModalShowStateType>>;
  department?: DepartmentDto;
}

const UserManagerTypeModal: FC<UserManagerTypeModalProps> = ({
  modalState,
  setShowModal,
  department,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: onDeleteDepartment, isPending } = useMutation({
    mutationKey: ['deleteDepartment', department?.id],
    mutationFn: () =>
      http
        .delete<DepartmentDto>(`${endpoint.department.delete}/${department?.id}`)
        .then((response) => response.data),
  });

  const onClose = () => {
    setShowModal(ModalShowStateType.CLOSE);
  };
  const onDelete = async () => {
    try {
      await onDeleteDepartment();
      onClose();
      await queryClient.invalidateQueries({ queryKey: [QUERY_TOKEN_AUTH_KEY] });
      await queryClient.invalidateQueries({ queryKey: ['department'] });
      await queryClient.invalidateQueries({ queryKey: [SearchType.TYPE] });
    } catch (error) {
      const errorResponse = error as AxiosError;
      if (errorResponse.status === 404) {
        await queryClient.invalidateQueries({ queryKey: ['department'] });
        onClose();
      }
      if (errorResponse.code === 'ERR_NETWORK') {
        navigate(routes.server_error.path);
      }
    }
  };

  if (modalState === ModalShowStateType.CREATE) {
    return <CreateOrUpdateTypeModal type="createDepartment" onClose={onClose} />;
  }

  if (department && modalState === ModalShowStateType.UPDATE) {
    return (
      <CreateOrUpdateTypeModal type="updateDepartment" onClose={onClose} department={department} />
    );
  }
  if (modalState === ModalShowStateType.DELETE) {
    return (
      <DeleteModal
        isDeleting={isPending}
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
