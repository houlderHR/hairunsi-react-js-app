import { IsString, IsStrongPassword, MinLength } from 'class-validator';

class ResetPasswordDto {
  @IsString({ message: 'Le mot de passe doit etre une chaine de caractere' })
  @MinLength(8, { message: 'Votre mot de passe doit au moin contenir 8 caractères' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'Votre mot de passe est tres vulnerable' },
  )
  password: string;

  confirmPassword: string;
}

export default ResetPasswordDto;
