import { FC } from 'react';
import { UserType } from '../../../../pages/UserManager/UserManagerType/constants';
import Icon from '../../../Icon';
import CardUserManager from '../CardUserManager';

interface CardTypeProps {
  user: UserType;
  iconVisible?: boolean;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
}

// CardType
const CardType: FC<CardTypeProps> = ({
  user,
  openUpdateModal,
  openDeleteModal,
  iconVisible = false,
}) => (
  <CardUserManager
    openDeleteModal={openDeleteModal}
    openUpdateModal={openUpdateModal}
    title={user.title}
    iconVisible={iconVisible}
  >
    <div className="flex mt-4 flex-row justify-start gap-x-4">
      <Icon name="user-guard" height={22} width={18} />
      <p className="text-base">{user.name}</p>
    </div>
  </CardUserManager>
);

export default CardType;
