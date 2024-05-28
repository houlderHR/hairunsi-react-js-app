import { Length, IsDefined, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateOrUpdateRoleDto {
  @Length(4, 255, {
    message: 'Le nom doit avoir au moins 4 caractères et éviter les espaces successives',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsDefined({ message: 'Vérifier le champ est défini' })
  @IsUUID(undefined, { each: true, message: 'Champ invalide (type : UUID)' })
  permissions: UUID[];
}
