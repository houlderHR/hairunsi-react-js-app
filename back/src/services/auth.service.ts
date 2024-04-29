import { StatusCodes } from 'http-status-codes';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import Mailer from '../utils/mailer';
import HttpException from '../exceptions/HttpException';
import JwtService from './jwt.service';
import ResetPasswordDto from '../dto/auth/ResetPasswordDto';
import { ValidationError, validate } from 'class-validator';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../database/data-source';
import jwtService from './jwt.service';
import { hashPassword } from '../utils/bcrypt';
import { Repository } from 'typeorm';
import { ResetPasswordConfig } from '../utils/resetPasswordConfig';
class AuthService {
  async recoveryPassword(email: string) {
    try {
      const result = await this.getUserRepository().findOne({
        where: { email: email.trim() },
      });
      if (!result) throw new HttpNotFoundException("Le mail n'existe pas");
      try {
        const mailer = new Mailer();
        return await mailer.sendMail(
          'Récupération mot de passe',
          result.email,
          await this.generateForgotPasswordLink(result),
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

  async generateForgotPasswordLink(user: User) {
    try {
      let resetPasswordToken = await JwtService.generateJwtResetPassword(user);
      const resetPasswordUrl = `${process.env.FRONT_END_BASE_ROUTE}reset-password?token=${resetPasswordToken}`;

      return resetPasswordUrl;
    } catch (error) {
      throw new HttpException(StatusCodes.GONE, { message: 'Ce lien est expiré' });
    }
  }

  async verifyResetPasswordUrlToken(token: string) {
    try {
      const payloadUser = await JwtService.getJwtResetPasswordPayload(token);

      const user = await this.getUserRepository().findOneOrFail({
        where: { uuid: payloadUser.uuid },
        select: ['password', 'uuid', 'email'],
      });

      return await JwtService.verifyJwtResetPasswordToken(token, user);
    } catch (error) {
      if (error.status === StatusCodes.GONE) {
        throw error;
      }

      throw new HttpException(
        StatusCodes.GONE,
        'Ce lien de réinitialisation du mot de passe est expiré,veuillez rééssayer de nouveau',
      );
    }
  }

  async resetUserPassword(resetPasswordDto: ResetPasswordDto, token: string) {
    let user: User;
    try {
      const payloadUser = await JwtService.getJwtResetPasswordPayload(token);
      user = await this.getUserRepository().findOneOrFail({
        where: { uuid: payloadUser.uuid },
        select: ['email', 'lastname', 'firstname', 'password', 'uuid'],
      });

      await jwtService.verifyJwtResetPasswordToken(token, user, true);
    } catch (_) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Une erreur s'est produite");
    }

    const errors = await validate(resetPasswordDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    if (this.checkIfPasswordContainPersonalInformation(user, resetPasswordDto.password)) {
      const validationErrors = [
        {
          property: 'password',
          constraints: {
            containPersonalInformation:
              'Votre mot de passe ne doit pas contenir vos informations personelles',
          },
        },
      ];

      throw new HttpException(422, validationErrors);
    }

    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new HttpException(StatusCodes.FORBIDDEN, {
        message: 'Le mot de passe ne correspond pas',
      });
    }

    try {
      user.password = await hashPassword(resetPasswordDto.password);
      await this.getUserRepository().update({ uuid: user.uuid }, user);
      return { message: 'Mot de passe changé avec succés' };
    } catch (error) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  private checkIfPasswordContainPersonalInformation(user: User, password: string): boolean {
    let keyTest = { firstname: user.firstname, lastname: user.lastname, email: user.email };

    return Object.keys(keyTest).some((key) =>
      password.toLowerCase().trim().replace(/\s/g, '').includes(keyTest[key].toLowerCase()),
    );
  }

  private getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

export default new AuthService();
