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
import { Repository } from 'typeorm';
import LoginDto from '../dto/auth/LoginDto';
import { plainToClass } from 'class-transformer';
import { ComparePassword, hashPassword } from '../utils/hash';
import Unauthorized from '../exceptions/Unauthorized';
import { sign, verify } from 'jsonwebtoken';

import { checkIfPasswordContainPersonalInformation } from '../utils/utils.method';
import { TOKEN_KEY } from '../utils/token';
import userService from './user.service';
class AuthService {
  async recoveryPassword(email: string) {
    try {
      const result = await this.getUserRepository().findOne({
        where: { email: email.trim() },
      });
      if (!result) throw new HttpNotFoundException("Le mail n'existe pas");
      try {
        const link = await this.generateForgotPasswordLink(result);
        const mailer = await Mailer.getInstance();
        const path = 'templates/reset-password/reset-password.hbs';
        return await mailer.sendMail(
          'Récupération de mot de passe',
          result.lastname,
          result.email,
          link,
          path,
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

  async sendNotificationPassword(email: string, username: string) {
    try {
      const mailer = await Mailer.getInstance();
      const path = 'templates/notification-password/notification-password.hbs';
      const resetPwLink = `${process.env.FRONT_END_BASE_ROUTE}forgot-password`;
      return await mailer.sendMail(
        'Mot de passe',
        username,
        email,
        'HairunTest@123.',
        path,
        resetPwLink,
      );
    } catch (error) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Impossible d'envoyer le mail");
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

  async verifyTokenForRecoveryPwd(token: string) {
    try {
      const decode = await jwtService.verifyTokenClassicForRecoveryPwd(token);
      return decode;
    } catch (error) {
      throw new HttpException(StatusCodes.GONE, "Impossible d'accéder à cette page");
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
    } catch (_) {
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
    } catch (_) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Une erreur s'est produite");
    }

    try {
      await jwtService.verifyJwtResetPasswordToken(token, user, true);
    } catch (_) {
      throw new HttpException(
        StatusCodes.GONE,
        'Ce lien de réinitialisation du mot de passe est expiré,veuillez rééssayer de nouveau',
      );
    }

    const errors = await validate(resetPasswordDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    if (checkIfPasswordContainPersonalInformation(user, resetPasswordDto.password)) {
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

  async login(userDto: LoginDto) {
    const errors = await validate(plainToClass(LoginDto, userDto));
    if (errors.length > 0) {
      const errorsMessage = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, errorsMessage);
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: { email: userDto.email },
      relations: ['post.department.role.permissions', 'image'],
    });

    if (user) {
      if (await ComparePassword(user.password, userDto.password))
        return sign({ user }, TOKEN_KEY, { expiresIn: userDto.duration });
      throw new Unauthorized('Mot de passe incorrect');
    }
    throw new HttpNotFoundException("Cet utilisateur n'existe pas");
  }

  async decodeToken(token: string) {
    try {
      const decodedToken = verify(token, TOKEN_KEY);
      const user = await userService.getUserById(decodedToken.user.uuid);
      return { authorized: true, decodedToken: { user } };
    } catch (error) {
      throw new Unauthorized('Expiré');
    }
  }

  private getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

export default new AuthService();
