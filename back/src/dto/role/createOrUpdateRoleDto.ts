import { Length, IsDefined } from 'class-validator';
import { Permission } from '../../entities/permission.entity';

export class CreateOrUpdateRoleDto {
  @Length(4, 255, { message: 'Le nom doit avoir au minimum 4 caractères' })
  name: string;

  @IsDefined({ message: 'Vérifier le champ est défini' })
  permissions: Permission[];
}
