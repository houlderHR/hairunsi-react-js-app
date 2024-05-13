import { FC, useState } from 'react';
import { SearchType } from '../../../hooks/useSearch';
import CardType from '../../../shared/authenticated/CardUserManager/CardType';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import { UserType } from './constants';
import UserManagerTypeModal from './UserManagerTypeModal';

const UserManagerType: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [user, setUser] = useState<UserType | undefined>();
  const [type, setType] = useState<UserType[] | undefined>();

  const pushSearchType = (_type: UserType[] | undefined) => {
    setType(_type);
  };

  const openUpdateModal = (_user: UserType) => () => {
    setUser(_user);
    setShowModal(ModalShowStateType.UPDATE);
  };
  const openDeleteModal = () => {
    setShowModal(ModalShowStateType.DELETE);
  };
  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU TYPE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
        pushSearch={pushSearchType}
        searchType={SearchType.TYPE}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {type?.map((_user: UserType, index: number) => (
          <CardType
            openUpdateModal={openUpdateModal(_user)}
            openDeleteModal={openDeleteModal}
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
