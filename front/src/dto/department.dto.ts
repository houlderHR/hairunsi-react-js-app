export default interface DepartmentDto {
  id: string;
  name: string;
  role: Role;
}

interface Role {
  id: string;
  name: string;
}
