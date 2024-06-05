export enum PostProject {
  RESPONSABLE = 'Responsable',
  COLLABORATOR = 'Collaborateur',
}

export const mockUserResponsable: UserProjectType[] = [
  {
    id: '0',
    name: 'Wade Warren',
    image: '/images/other/user1.png',
    email: 'test@mail.com',
    post: '',
    fonction: {
      isResponsable: true,
      isActif: true,
    },
    contrat: {
      id: '0',
      name: '',
      startContrat: '',
      endContrat: '',
      isEndContract: false,
    },
  },
  {
    id: '1',
    name: 'Darlene Robertson',
    image: '/images/other/user2.png',
    email: 'test@mail.com',
    post: '',
    fonction: {
      isResponsable: true,
      isActif: false,
    },
    contrat: {
      id: '0',
      name: '',
      startContrat: '',
      endContrat: '',
      isEndContract: false,
    },
  },
];

export const mockUserCollaborator: UserProjectType[] = [
  {
    id: '0',
    name: 'Wade Warren',
    image: '/images/other/user1.png',
    email: 'test@mail.com',
    post: 'Directeur',
    fonction: {
      isResponsable: false,
      isActif: true,
    },
    contrat: {
      id: '0',
      name: 'Contrat 1',
      startContrat: '22 Fév 22',
      endContrat: '02 Juil 22',
      isEndContract: false,
    },
  },
  {
    id: '1',
    name: 'Darlene Robertson',
    image: '/images/other/user2.png',
    email: 'test@mail.com',
    post: 'Developpeur JS',
    fonction: {
      isResponsable: false,
      isActif: false,
    },
    contrat: {
      id: '0',
      name: 'Contrat 2',
      startContrat: '22 Fév 22',
      endContrat: '02 Juil 22',
      isEndContract: false,
    },
  },
];

export type Contract = {
  id: string;
  name: string;
  startContrat: string;
  endContrat: string;
  isEndContract: boolean;
};

export type UserProjectType = {
  id: string;
  name: string;
  email: string;
  image: string;
  post: string;
  fonction: {
    isResponsable: boolean;
    isActif: boolean;
  };
  contrat: Contract;
};
