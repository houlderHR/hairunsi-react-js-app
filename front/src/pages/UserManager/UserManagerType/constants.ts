export interface UserType {
  title: string;
  name: string;
}

const UserData: UserType[] = [
  {
    title: 'Direction',
    name: 'Super admin',
  },
  {
    title: 'Administration',
    name: 'Admin',
  },
  {
    title: 'Commercial',
    name: 'Modérateur',
  },
  {
    title: 'Responsable Prod',
    name: 'Chef',
  },
  {
    title: 'Production',
    name: 'Employé',
  },
];

export default UserData;
