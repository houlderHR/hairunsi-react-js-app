import { FC, useState } from 'react';
import CardType from '../../../shared/authenticated/cards/CardType';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import userData, { UserType } from './constants';
import UserManagerTypeModal from './UserManagerTypeModal';

const UserManagerType: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [user, setUser] = useState<UserType | undefined>();

  const openUpdateModal = (_user: UserType) => () => {
    setUser(_user);
    setShowModal(ModalShowStateType.UPDATE);
  };

  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU TYPE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {userData.map((_user: UserType, index: number) => (
          <CardType
            openUpdateModal={openUpdateModal(_user)}
            iconVisible={index === 0}
            user={_user}
            key={_user.name}
          />
        ))}
      </div>
      <UserManagerTypeModal user={user} modalState={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UserManagerType;
