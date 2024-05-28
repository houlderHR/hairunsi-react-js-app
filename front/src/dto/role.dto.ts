import DepartmentDto from './department.dto';
import PermissionDto from './permission.dto';

export interface RoleResponseDto {
  id: string;
  name: string;
  isSeed?: boolean;
  permissions: PermissionDto[];
  departments: DepartmentDto[];
}

export interface CreateRoleDto {
  name: string;
  permissions: string[];
}
