import { IsDate, IsDateString, IsNumber, Length } from 'class-validator';

export class CreateOrUpdateFileDto {
  @Length(4, 255, { message: 'Le nom doit avoir au minimum 4 caractères' })
  name: string;
  @Length(6, 255, { message: 'Le lien doit avoir au minimum 4 caractères' })
  path: string;
  @Length(4, 255, { message: 'Le type doit avoir au minimum 4 caractères' })
  type: string;
  @IsNumber({}, { message: 'Size doit être un nombre' })
  size: number;
}
