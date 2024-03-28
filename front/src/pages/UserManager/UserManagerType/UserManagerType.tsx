import React, { useState } from 'react';
import CardType from '../../../shared/authenticated/CardType';
import HeadManager from '../../../shared/authenticated/HeadManager';
import { ModalShowState } from '../../../utils/type/ModalShowType';
import UserManagerTypeModal from './UserManagerTypeModal';

const UserManagerType: React.FC = () => {
  const [showModal, setShowModal] = useState<ModalShowState>({
    create: false,
    update: false,
    delete: false,
  });

  return (
    <>
      <HeadManager title="CREER UN NOUVEAU TYPE" openCreateModal={setShowModal} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        <CardType title="Direction" iconVisible name="Super admin" />
        <CardType title="Administration" name="Admin" />
        <CardType title="Commercial" name="Modérateur" />
        <CardType title="Responsable Prod" name="Chef" />
        <CardType title="Production" name="Employé" />
      </div>
      <UserManagerTypeModal modalState={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default UserManagerType;
