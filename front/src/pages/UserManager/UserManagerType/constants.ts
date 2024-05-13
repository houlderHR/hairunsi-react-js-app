export const TypeList = ['Super Admin', 'Admin', 'Modérateur', 'Chef', 'Employé'];
export interface UserType {
  name: string;
  role: {
    id: string;
    name: string;
  };
}
