import { IsDefined, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import REGEX from '../../utils/regex';

class LoginDto {
  @IsString({ message: "L'adresse email doit etre renseignée" })
  @MinLength(1, { message: "L'adresse email doit comporter au moin une caractère" })
  @MaxLength(255, { message: "L'adresse email ne doit pas dépasser les 255 caractères" })
  @Matches(REGEX.EMAIL, { message: "Le format de l'adresse n'est pas valide." })
  email: string;

  @IsDefined({ message: 'Vérifier que le champ existe bien.' })
  @IsString({ message: 'Le mot de passe doit etre renseigné' })
  password: string;
}

export default LoginDto;
