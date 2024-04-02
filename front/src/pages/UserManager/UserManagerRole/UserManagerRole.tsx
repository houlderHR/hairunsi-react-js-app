import { FC, useState } from 'react';
import CardRole from '../../../shared/authenticated/CardUserManager/CardRole';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';
import RoleItems from './constants';
import UserManagerRoleModal from './UserManagerRoleModal';

const UserManagerRole: FC = () => {
  const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);
  const openUpdateModal = () => () => {
    setShowModal(ModalShowStateType.UPDATE);
  };
  return (
    <>
      <HeadManager
        title="CREER UN NOUVEAU ROLE"
        onOpen={() => setShowModal(ModalShowStateType.CREATE)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        <CardRole
          openUpdateModal={openUpdateModal}
          title="Super Admin"
          maxElement={11}
          iconVisible
          items={RoleItems.superAdmin}
        />
        <CardRole
          openUpdateModal={openUpdateModal}
          title="Admin"
          maxElement={11}
          items={RoleItems.Admin}
        />
        <CardRole
          openUpdateModal={openUpdateModal}
          title="Modérateur"
          maxElement={11}
          items={RoleItems.Moderator}
        />
        <CardRole
          openUpdateModal={openUpdateModal}
          title="Chef"
          maxElement={11}
          items={RoleItems.Chef}
        />
        <CardRole
          openUpdateModal={openUpdateModal}
          title="Employé"
          maxElement={11}
          items={RoleItems.Employ}
        />
      </div>
      <UserManagerRoleModal modalState={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UserManagerRole;
