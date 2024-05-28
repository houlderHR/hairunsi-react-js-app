export default interface DepartmentDto {
  id: string;
  name: string;
  role: Role;
}

export interface CreateOrUpdateDepartmentDto {
  name: string;
  role: string;
}

export interface Role {
  id: string;
  name: string;
}
