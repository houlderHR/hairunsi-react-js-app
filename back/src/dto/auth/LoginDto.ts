import { IsDefined, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import REGEX from '../../utils/regex';

class LoginDto {
  @Matches(REGEX.EMAIL, { message: "Le format de l'adresse n'est pas valide." })
  @IsDefined({ message: 'Vérifier que le champ "E-mail" existe bien.' })
  email: string;

  @IsDefined({ message: 'Vérifier que le champ "Mot de passe" existe bien.' })
  @IsString({ message: 'Le mot de passe doit etre renseigné' })
  password: string;

  @IsDefined({
    message: "Vérifier que l'utilisateur a bien mentionné si il veut qu'on se souvienne de lui",
  })
  duration: string;
}

export default LoginDto;
