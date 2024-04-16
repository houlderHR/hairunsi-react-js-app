import { IsString, Length } from 'class-validator';
import { Post } from '../../entities/post.entity';

export class CreateDepartmentDto {
  @IsString({ message: 'Le nom doit etre une chaine de caractère' })
  @Length(4, 255, { message: 'Le nom doit etre superieur ou égal à 4' })
  name: string;

  jobs?: Post[];
}
