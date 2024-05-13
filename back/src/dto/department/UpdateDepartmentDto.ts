import { IsUUID, Length } from 'class-validator';
import { Post } from '../../entities/post.entity';
import { UUID } from 'crypto';

export class UpdateDepartmentDto {
  @Length(4, 255, { message: 'Le nom doit etre superieur ou égal à 4' })
  name: string;
  @IsUUID(undefined, { message: 'Le role doit etre rensigner et valide' })
  role: UUID;

  jobs?: Post[];
}
