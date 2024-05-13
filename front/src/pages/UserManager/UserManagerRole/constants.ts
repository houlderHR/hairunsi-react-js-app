export type RoleType = {
  id: string;
  name: string;
  permissions: Array<{ id: string; name: string }>;
};

export type UserObject = {
  id: number;
  role: string;
  module: string[];
};

export const MODULE_ROLE_LIST = [
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
];

const USER_TYPE_LIST = [
  {
    id: 0,
    role: 'Super Admin',
    module: [
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
  },
  {
    id: 1,
    role: 'Admin',
    module: [
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
  },
  {
    id: 2,
    role: 'Moderateur',
    module: [
      'Accès projet',
      'Accès utilisateur',
      'Création utilisateur',
      'Modification utilisateur',
      'Attribution type',
      'Suppression projet',
      'Ajout documents',
      'Suppression documents',
    ],
  },
  {
    id: 3,
    role: 'Chef',
    module: [
      'Création projet',
      'Modification projet',
      'Attribution type',
      'Suppression projet',
      'Ajout documents',
      'Suppression documents',
    ],
  },
  {
    id: 4,
    role: 'Chef',
    module: [
      'Accès utilisateur',
      'Modification utilisateur',
      'Ajout documents',
      'Suppression documents',
    ],
  },
];

export default USER_TYPE_LIST;
