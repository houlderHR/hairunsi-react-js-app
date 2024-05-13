import PermissionDto from './permission.dto';

export default interface RoleDto {
  id: string;
  name: string;
  permissions: PermissionDto[];
}
