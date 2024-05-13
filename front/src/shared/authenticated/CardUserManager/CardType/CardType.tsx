import { FC } from 'react';
import { DepartmentType } from '../../../../pages/UserManager/UserManagerType/type';
import Icon from '../../../Icon';
import CardUserManager from '../CardUserManager';

interface CardTypeProps {
  department: DepartmentType;
  iconVisible?: boolean;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
}

// CardType
const CardType: FC<CardTypeProps> = ({
  department,
  openUpdateModal,
  openDeleteModal,
  iconVisible = false,
}) => (
  <CardUserManager
    openDeleteModal={openDeleteModal}
    openUpdateModal={openUpdateModal}
    title={department.name}
    iconVisible={iconVisible}
  >
    <div className="flex mt-4 flex-row justify-start gap-x-4">
      <Icon name="user-guard" height={22} width={18} />
      <p className="text-base">{department.role.name}</p>
    </div>
  </CardUserManager>
);

export default CardType;
