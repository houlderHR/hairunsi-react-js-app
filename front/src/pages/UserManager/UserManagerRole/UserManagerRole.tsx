import React, { useState } from 'react';
import CardRole from '../../../shared/authenticated/cards/CardRole';
import HeadManager from '../../../shared/authenticated/HeadManager';
import UserManagerRoleModal from './UserManagerRoleModal';
import { ModalShowStateType } from '../../../shared/authenticated/Modal';

const items = {
  superAdmin: [
    'Accès projet',
    'Création projet',
    'Modification projet',
    'Accès utilisateur',
    'Création utilisateur',
    'Modification utilisateur',
    'Attribution rôle',
    'Attribution type',
    'Suppression projet',
    'Ajout documents',
    'Suppression documents',
  ],
  Admin: [
    'Accès projet',
    'Création projet',
    'Modification projet',
    'Accès utilisateur',
    'Création utilisateur',
    'Attribution type',
    'Suppression projet',
    'Ajout documents',
    'Suppression documents',
  ],
  Moderator: [
    'Accès projet',
    'Accès utilisateur',
    'Création utilisateur',
    'Modification utilisateur',
    'Attribution type',
    'Suppression projet',
    'Ajout documents',
    'Suppression documents',
  ],
  Chef: [
    'Création projet',
    'Modification projet',
    'Attribution type',
    'Suppression projet',
    'Ajout documents',
    'Suppression documents',
  ],
  Employ: [
    'Accès utilisateur',
    'Modification utilisateur',
    'Ajout documents',
    'Suppression documents',
  ],
};

const [showModal, setShowModal] = useState<ModalShowStateType>(ModalShowStateType.CLOSE);

const UserManagerRole: React.FC = () => (
  <>
    <HeadManager title="CREER UN NOUVEAU ROLE" openCreateModal={setShowModal} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
      <CardRole title="Super Admin" iconVisible items={items.superAdmin} />
      <CardRole title="Admin" items={items.Admin} />
      <CardRole title="Modérateur" items={items.Moderator} />
      <CardRole title="Chef" items={items.Chef} />
      <CardRole title="Employé" items={items.Employ} />
    </div>
    <UserManagerRoleModal modalState={showModal} setShowModal={setShowModal} />
  </>
);

export default UserManagerRole;
