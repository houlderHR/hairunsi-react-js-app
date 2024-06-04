import { HeaderType } from '../../../shared/authenticated/Table/Table';

type DailyDataType = {
  matricule: string;
  name: string;
  date: string;
  objectif: string;
  membre: number;
  timeout: string;
};

export const DailyHeading: HeaderType<DailyDataType>[] = [
  {
    name: 'matricule',
    associated: (data) => data.matricule,
  },
  {
    name: 'Responsable',
    associated: (data) => data.name,
  },
  {
    name: 'Date',
    associated: (data) => data.date,
  },
  {
    name: 'Objectif',
    width: '3',
    associated: (data) => data.objectif,
  },
  {
    name: 'Membre',
    associated: (data) => data.membre.toString(),
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
    membre: 4,
    timeout: '3,5 J/H',
    date: '08/02/2005',
  },
  {
    matricule: 'm002',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: 4,
    timeout: '3,5 J/H',
  },
  {
    matricule: 'm003',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: 4,
    timeout: '3,5 J/H',
  },
  {
    matricule: 'm004',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: 4,
    timeout: '3,5 J/H',
  },
  {
    matricule: 'm005',
    name: 'Tsiory',
    date: '08/02/2005',
    objectif:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
    membre: 4,
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
    name: 'John Doe 4',
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
    name: 'John Doe 6',
    email: 'JohnDoe6@hairun-technology.com',
    avatar: 'profile.png',
  },
];
