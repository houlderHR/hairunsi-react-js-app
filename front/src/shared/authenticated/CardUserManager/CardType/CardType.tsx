import { FC } from 'react';
import DepartmentDto from '../../../../dto/department.dto';
import useUserPermission from '../../../../hooks/useUserPermission';
import PERMISSIONS from '../../../../utils/permissions';
import Icon from '../../../Icon';
import CardUserManager from '../CardUserManager';

interface CardTypeProps {
  department: DepartmentDto;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
}

const CardType: FC<CardTypeProps> = ({ department, openUpdateModal, openDeleteModal }) => {
  const { allowPermission } = useUserPermission();
  return (
    <CardUserManager
      openDeleteModal={openDeleteModal}
      openUpdateModal={openUpdateModal}
      title={department.name}
      isRemovable={allowPermission(PERMISSIONS.removeAll)}
      isEditable={allowPermission(PERMISSIONS.updateAll)}
    >
      <div className="flex mt-4 flex-row justify-start gap-x-4">
        <Icon name="user-guard" height={22} width={18} />
        <p className="text-base">{department.role.name}</p>
      </div>
    </CardUserManager>
  );
};

export default CardType;
