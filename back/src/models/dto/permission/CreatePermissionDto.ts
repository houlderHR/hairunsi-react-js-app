import { Length } from 'class-validator';

export class CreatePermissionDto {
  @Length(4, 255, { message: 'tsy mety e' })
  name: string;
}
