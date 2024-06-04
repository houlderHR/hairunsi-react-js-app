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
