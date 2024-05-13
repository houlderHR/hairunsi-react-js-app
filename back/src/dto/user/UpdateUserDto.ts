import { IsDateString, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { UUID } from 'crypto';

class UpdateUserDto {
  @IsString({ message: 'Le nom doit etre renseigner' })
  @MinLength(1, { message: 'Le nom doit comporter au moin une caractère' })
  @MaxLength(255, { message: 'Le nom ne doit pas dépasser les 255 caractères' })
  firstname: string;

  @IsString({ message: 'Le prenom doit etre renseigner' })
  @MinLength(1, { message: 'Le prenom doit comporter au moin une caractère' })
  @MaxLength(255, { message: 'Le prenom ne doit pas dépasser les 255 caractères' })
  lastname: string;

  @IsDateString({}, { message: 'Le format du date est incorrect' })
  birth_date: Date;
  @IsUUID(undefined, { message: 'Le poste doit etre rensigner et valide' })
  post: UUID;
}

export default UpdateUserDto;
