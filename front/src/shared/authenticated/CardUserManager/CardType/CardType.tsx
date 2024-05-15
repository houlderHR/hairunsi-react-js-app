import { FC } from 'react';
import DepartmentDto from '../../../../dto/department.dto';
import Icon from '../../../Icon';
import CardUserManager from '../CardUserManager';

interface CardTypeProps {
  department: DepartmentDto;
  isRemovable: boolean;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
}

const CardType: FC<CardTypeProps> = ({
  department,
  openUpdateModal,
  openDeleteModal,
  isRemovable,
}) => (
  <CardUserManager
    openDeleteModal={openDeleteModal}
    openUpdateModal={openUpdateModal}
    title={department.name}
    isRemovable={isRemovable}
  >
    <div className="flex mt-4 flex-row justify-start gap-x-4">
      <Icon name="user-guard" height={22} width={18} />
      <p className="text-base">{department.role.name}</p>
    </div>
  </CardUserManager>
);

export default CardType;
