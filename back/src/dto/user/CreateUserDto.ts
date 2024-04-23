import { IsDateString, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { UUID } from 'crypto';

class CreateUserDto {
  @IsString({ message: 'Le nom doit etre renseigné' })
  @MinLength(1, { message: 'Le nom doit comporter au moin une caractère' })
  @MaxLength(255, { message: 'Le nom ne doit pas dépasser les 255 caractères' })
  firstname: string;

  @IsString({ message: 'Le prenom doit etre renseigné' })
  @MinLength(1, { message: 'Le prenom doit comporter au moin une caractère' })
  @MaxLength(255, { message: 'Le prenom ne doit pas dépasser les 255 caractères' })
  lastname: string;

  @IsString({ message: "L'adresse email doit etre renseignée" })
  @MinLength(1, { message: "L'adresse email doit comporter au moin une caractère" })
  @MaxLength(255, { message: "L'adresse email ne doit pas dépasser les 255 caractères" })
  email: string;

  password: string;

  @IsDateString({}, { message: 'Le format du date est incorrect' })
  birth_date: Date;

  @IsUUID(undefined, { message: 'Le poste doit etre rensigner et valide' })
  post: UUID;
  @IsUUID(undefined, { message: 'Le role doit etre rensigner et valide' })
  role: UUID;
}

export default CreateUserDto;
