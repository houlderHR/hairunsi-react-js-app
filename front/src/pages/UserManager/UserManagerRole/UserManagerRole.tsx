import { FC, useState } from 'react';
import { SearchType } from '../../../hooks/useSearch';
import CardRole from '../../../shared/authenticated/CardUserManager/CardRole';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import USER_TYPE_LIST, { RoleType, UserObject } from './constants';
import UserManagerRoleModal from './UserManagerRoleModal';

const UserManagerRole: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const [user, setUser] = useState<UserObject | undefined>();
  const [roles, setRole] = useState<RoleType[] | undefined>();

  const pushRoleType = (_role: RoleType[] | undefined) => {
    setRole(_role);
  };
  const openUpdateModal = (userData: UserObject) => () => {
    setShowModal(ModalShowStateType.UPDATE);
    setUser(userData);
  };
  const openDeleteModal = () => {
    setShowModal(ModalShowStateType.DELETE);
  };

  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU ROLE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
        searchType={SearchType.ROLE}
        pushSearch={pushRoleType}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        {roles?.length === 0 &&
          USER_TYPE_LIST.map((item, index) => (
            <CardRole
              key={item.id}
              openUpdateModal={openUpdateModal(item)}
              openDeleteModal={openDeleteModal}
              title={item.role}
              maxElement={11}
              iconVisible={index === 0}
              items={item.module}
            />
          ))}
        {roles?.map((item, index) => (
          <CardRole
            key={item.id}
            title={item.name}
            maxElement={11}
            iconVisible={index === 0}
            items={item.permissions.map((p) => p.name)}
          />
        ))}
      </div>
      <UserManagerRoleModal user={user} modalState={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UserManagerRole;
