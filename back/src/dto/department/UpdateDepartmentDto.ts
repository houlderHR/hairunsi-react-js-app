import { IsUUID, Length } from 'class-validator';
import { Post } from '../../entities/post.entity';
import { UUID } from 'crypto';
import { Transform } from 'class-transformer';
import { capitalizeLetter } from '../../utils/utils.method';

export class UpdateDepartmentDto {
  @Length(4, 255, { message: 'Le nom doit etre superieur ou égal à 4' })
  @Transform(({ value }) => capitalizeLetter(value.trim().replace(/ +(?= )/g, '')))
  name: string;
  @IsUUID(undefined, { message: 'Le role doit etre rensigner et valide' })
  role: UUID;

  jobs?: Post[];
}
