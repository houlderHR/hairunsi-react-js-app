import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user.entity';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import Mailer from '../utils/mailer';
import HttpException from '../exceptions/HttpException';
import JwtService from './jwt.service';
import ResetPasswordDto from '../dto/auth/ResetPasswordDto';
import { ValidationError, validate } from 'class-validator';

class AuthService {
  async recoveryPassword(email: string) {
    try {
      const result = await AppDataSource.getRepository(User).findOne({
        where: { email: email.trim() },
      });
      if (!result) throw new HttpNotFoundException("Le mail n'existe pas");
      try {
        const mailer = new Mailer(true);
        return await mailer.sendMail(
          'Récupération mot de passe',
          result.email,
          'generatelink(user)',
        );
      } catch (error) {
        throw new HttpException(StatusCodes.BAD_REQUEST, "Impossible d'envoyer le mail");
      }
    } catch (error) {
      if (error.status == StatusCodes.NOT_FOUND || error.status == StatusCodes.BAD_REQUEST)
        throw error;
      throw new InternalServerErrorException();
    }
  }

  async generateForgotPasswordLink() {
    try {
      let resetPasswordToken = await JwtService.generateJwtResetPassword();
      const resetPasswordUrl = `${process.env.FRONT_END_BASE_ROUTE}?token=${resetPasswordToken}`;
      // Send forgot password to email
      return resetPasswordUrl;
    } catch (error) {
      throw new HttpException(StatusCodes.GONE, { message: 'Ce lien est expiré' });
    }
  }

  async verifyResetPasswordUrlToken(token: string) {
    try {
      await JwtService.verifyJwtResetPasswordToken(token);
    } catch (error) {
      console.log(error);
      throw new HttpException(StatusCodes.UNAUTHORIZED, { error: 'Invalid url' });
    }
  }

  async resetUserPassword(resetPasswordDto: ResetPasswordDto) {
    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new HttpException(StatusCodes.FORBIDDEN, {
        message: 'Le mot de passe ne correspond pas',
      });
    }

    const errors = await validate(resetPasswordDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    // edit user password
    // Hash password
    // Save new user password
  }
}

export default new AuthService();
