import { FC } from 'react';
import { UserType } from '../../../../pages/UserManager/UserManagerType/constants';
import Icon from '../../../Icon';
import Card from '../Card';

interface CardTypeProps {
  user: UserType;
  iconVisible?: boolean;
  openUpdateModal: () => void;
}

// CardType
const CardType: FC<CardTypeProps> = ({ user, openUpdateModal, iconVisible = false }) => (
  <Card openUpdateModal={openUpdateModal} title={user.title} iconVisible={iconVisible}>
    <div className="flex mt-4 flex-row justify-start gap-x-4">
      <Icon name="user-guard" height={22} width={18} />
      <p className="text-base">{user.name}</p>
    </div>
  </Card>
);

export default CardType;
