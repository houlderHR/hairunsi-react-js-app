import { Department } from '../../entities/department.entity';
import { Permission } from '../../entities/permission.entity';

export class ResponseRoleDto {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  departments: Department[];
  permissions: Permission[];
  isSeed?: boolean;
}
