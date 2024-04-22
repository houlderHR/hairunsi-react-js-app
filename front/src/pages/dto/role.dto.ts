import { PermissionDto } from './permission.dto';

export interface RoleDto {
  id: string;
  name: string;
  permissions: PermissionDto[];
}
