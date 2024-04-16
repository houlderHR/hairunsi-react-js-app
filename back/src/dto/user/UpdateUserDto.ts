import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

class UpdateUserDto {
  @IsString({ message: 'Le nom doit etre renseigner' })
  @MinLength(1, { message: 'Le nom doit comporter au moin une caractère' })
  @MaxLength(255, { message: 'Le nom ne doit pas dépasser les 255 caractères' })
  firstname: string;

  @IsString({ message: 'Le prenom doit etre renseigner' })
  @MinLength(1, { message: 'Le prenom doit comporter au moin une caractère' })
  @MaxLength(255, { message: 'Le prenom ne doit pas dépasser les 255 caractères' })
  lastname: string;

  @IsDate({ message: 'La date de naissance doit etre rensigner' })
  birth_date: Date;
}

export default UpdateUserDto;
