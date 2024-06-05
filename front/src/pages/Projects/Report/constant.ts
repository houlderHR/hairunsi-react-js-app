import { HeaderType } from '../../../shared/authenticated/Table/Table';

export type ReportType = {
  matricule: string;
  description: string;
  date: string;
  timeout: string;
  state: string;
};

const checkStatusColor = (data: ReportType) => {
  switch (data.state) {
    case 'Blocked':
      return 'text-red-500';
    case 'En cours':
      return 'text-secondary-2';
    case 'Terminé':
      return 'text-success-2';
    case 'Retard':
      return 'text-orange-500';
    default:
      return '';
  }
};

export const ReportHeading: HeaderType<ReportType>[] = [
  {
    name: 'description',
    associated: (data) => data.description,
    className: 'md:w-1/2 w-5/12',
    sort: true,
  },
  {
    name: 'Date',
    associated: (data) => data.date,
    sort: true,
    className: 'max-lg:hidden',
  },
  {
    name: 'Temp écoulé',
    associated: (data) => data.timeout,
  },
  {
    name: 'Status',
    associated: (data) => data.state,
    colClassName: (data) => checkStatusColor(data),
  },
  {
    name: '',
    associated: () => '',
    className: 'w-[5%]',
  },
];

export const ReportData: ReportType[] = [
  {
    matricule: 'm001',
    description:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue 1',
    date: '08/02/2005',
    timeout: '3,5 J/H',
    state: 'Blocked',
  },
  {
    matricule: 'm002',
    description:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue 2',
    date: '08/02/2005',
    timeout: '3,5 J/H',
    state: 'En cours',
  },
  {
    matricule: 'm003',
    description:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue 3',
    date: '08/02/2005',
    timeout: '3,5 J/H',
    state: 'Terminé',
  },
  {
    matricule: 'm004',
    description:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue 4',
    date: '08/02/2005',
    timeout: '3,5 J/H',
    state: 'Terminé',
  },
  {
    matricule: 'm005',
    description:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue 5',
    date: '08/02/2005',
    timeout: '3,5 J/H',
    state: 'Blocked',
  },
  {
    matricule: 'm006',
    description:
      'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue 6',
    date: '08/02/2005',
    timeout: '3,5 J/H',
    state: 'Retard',
  },
];

export const DataFilterStatus = [
  { id: '1', name: 'Bloqué' },
  { id: '2', name: 'En cours' },
  { id: '3', name: 'Retard' },
  { id: '4', name: 'Terminé' },
  { id: '0', name: 'Tout' },
];
