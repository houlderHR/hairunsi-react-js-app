type DailyHeaderType = { name: string; associated: string; width?: string };

export const DailyHeading: DailyHeaderType[] = [
  {
    name: 'matricule',
    associated: 'matricule',
  },
  {
    name: 'Responsable',
    associated: 'name',
  },
  {
    name: 'Date',
    associated: 'date',
  },
  {
    name: 'Objectif',
    width: '2',
    associated: 'objectif',
  },
  {
    name: 'Membre',
    associated: 'membre',
  },
  {
    name: 'Temp écoulé',
    associated: 'timeout',
  },
  {
    name: '',
    associated: 'action',
  },
];

export const DailyData: Record<string, string | number> = {
  matricule: 'm001',
  name: 'Tsiory',
  date: '08/02/2005',
  objectif:
    'Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue,Un petit objectif trè longue',
  membre: 4,
  timeout: '3,5 J/H',
  action: '',
};
