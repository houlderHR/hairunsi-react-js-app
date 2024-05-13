export const TypeList = ['Super Admin', 'Admin', 'Modérateur', 'Chef', 'Employé'];
export interface DepartmentType {
  id: string;
  name: string;
  role: {
    id: string;
    name: string;
  };
}
