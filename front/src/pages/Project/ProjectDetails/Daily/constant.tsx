import { HeaderType } from '../../../../shared/authenticated/Table/Table';

export type DailyDataType = {
  matricule: string;
  name: string;
  date: string;
  objectif: string;
  membre: {
    matricule: string;
    name: string;
    timeout: string;
  }[];
  timeout: string;
};

export const DailyHeading: HeaderType<DailyDataType>[] = [
  {
    name: 'matricule',
    associated: (data) => data.matricule,
    className: 'uppercase',
  },
  {
    name: 'Responsable',
    associated: (data) => data.name,
    className: 'max-lg:hidden',
  },
  {
    name: 'Date',
    associated: (data) => data.date,
    className: 'max-lg:hidden',
  },
  {
    name: 'Objectif',
    className: 'xl:w-5/12',
    associated: (data) => data.objectif,
  },
  {
    name: 'Membre',
    associated: (data) => data.membre.length.toString(),
    className: 'max-lg:hidden',
  },
  {
    name: 'Temp écoulé',
    associated: (data) => data.timeout,
  },
  {
    name: '',
    associated: () => '',
    className: 'w-[5%]',
  },
];

export const DailyData: DailyDataType[] = [
  {
    matricule: 'm001',
    name: 'Tsiory',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: [
      {
        matricule: 'm001',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },

      {
        matricule: 'm007',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
      {
        matricule: 'm009',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
    ],
    timeout: '3,5 J/H',
    date: '08/02/2005',
  },
  {
    matricule: 'm002',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: [
      {
        matricule: 'm002',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
      {
        matricule: 'm007',
        name: 'Membre 7',
        timeout: '3.5J/H',
      },
    ],
    timeout: '3,5 J/H',
  },
  {
    matricule: 'm003',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: [
      {
        matricule: 'm005',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
      {
        matricule: 'm008',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
      {
        matricule: 'm009',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
    ],
    timeout: '3,5 J/H',
  },
  {
    matricule: 'm004',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: [
      {
        matricule: 'm007',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
    ],
    timeout: '3,5 J/H',
  },
  {
    matricule: 'm005',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: [
      {
        matricule: 'm009',
        name: 'Membre 1',
        timeout: '3.5J/H',
      },
    ],
    timeout: '3,5 J/H',
  },
];

export const filterNameData = [
  { id: '1', name: 'John Doe', email: 'JohnDoe@mail.com', avatar: 'profile.png' },
  {
    id: '2',
    name: 'John Doe 2',
    email: 'JohnDoe2@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '3',
    name: 'John Doe 3',
    email: 'JohnDoe3@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '4',
    name: 'Capitain Doe 4',
    email: 'JohnDoe4@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '5',
    name: 'John Doe 5',
    email: 'JohnDoe5@hairun-technology.com',
    avatar: 'profile.png',
  },
  {
    id: '6',
    name: 'Lenon Doe 6',
    email: 'JohnDoe6@hairun-technology.com',
    avatar: 'profile.png',
  },
];
