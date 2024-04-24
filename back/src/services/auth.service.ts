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

class AuthService {
  async recoveryPassword(email: string) {
    try {
      const result = await this.getUserRepository().findOne({
        where: { email: email.trim() },
      });
      if (!result) throw new HttpNotFoundException("Le mail n'existe pas");
      try {
        const mailer = new Mailer(true);
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

      user.resetPasswordToken = resetPasswordToken;
      await AppDataSource.getRepository(User).save(user);

      const resetPasswordUrl = `${process.env.FRONT_END_BASE_ROUTE}reset-password?token=${resetPasswordToken}`;

      return resetPasswordUrl;
    } catch (error) {
      throw new HttpException(StatusCodes.GONE, { message: 'Ce lien est expiré' });
    }
  }

  async verifyResetPasswordUrlToken(token: string) {
    try {
      const user = await JwtService.verifyJwtResetPasswordToken(token);
      await this.getUserRepository().findOneOrFail({
        where: { uuid: user.uuid, resetPasswordToken: token },
      });
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
      const userValidTokenPayload = await jwtService.verifyJwtResetPasswordToken(token, true);
      user = await this.getUserRepository().findOneOrFail({
        where: { uuid: userValidTokenPayload.uuid },
        select: ['resetPasswordToken', 'email', 'password', 'uuid'],
      });
    } catch (_) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Une erreur s'est produite");
    }

    if (!(user.resetPasswordToken === token)) {
      throw new HttpException(StatusCodes.GONE, 'Ce lien est invalide');
    }

    const errors = await validate(resetPasswordDto);
    if (errors.length > 0) {
      const validationErrors = errors.map(({ property, constraints }: ValidationError) => ({
        property,
        constraints,
      }));

      throw new HttpException(422, validationErrors);
    }

    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new HttpException(StatusCodes.FORBIDDEN, {
        message: 'Le mot de passe ne correspond pas',
      });
    }

    try {
      user.password = await hashPassword(resetPasswordDto.password);
      user.resetPasswordToken = null;
      await this.getUserRepository().update({ uuid: user.uuid }, user);

      return 'ok';
    } catch (error) {
      throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  private getUserRepository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }
}

export default new AuthService();
