import {
  IsDateString,
  IsString,
  IsStrongPassword,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';
import REGEX from '../../utils/regex';

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
  @Matches(REGEX.EMAIL, { message: "Le format de l'adresse n'est pas valide." })
  email: string;

  @MinLength(8, { message: 'Le mot de passe est trop court (8 caractères au moins) ' })
  @MaxLength(255, { message: 'Le mot de passe ne doit pas dépasser les 255 caractères' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'Votre mot de passe est très vulnérable' },
  )
  password: string;

  @IsString({ message: 'Le format du date est incorrect' })
  birth_date: Date;

  @IsUUID(undefined, { message: 'Le poste doit etre rensigner et valide' })
  post: UUID;
}

export default CreateUserDto;
