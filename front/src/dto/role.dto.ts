import PermissionDto from './permission.dto';

export interface RoleResponseDto {
  id: string;
  name: string;
  permissions: PermissionDto[];
}

export interface CreateRoleDto {
  name: string;
  permissions: string[];
}
