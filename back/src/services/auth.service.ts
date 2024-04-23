import { StatusCodes } from 'http-status-codes';
<<<<<<< HEAD
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user.entity';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import Mailer from '../utils/mailer';
import HttpException from '../exceptions/HttpException';

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
=======
import HttpException from '../exceptions/HttpException';
import JwtService from './jwt.service';

class AuthService {
  async forgotPassword() {
    let token = await JwtService.generateJwtResetPassword();
    console.log(token);
  }

  async verifyResetPasswordUrlToken(token: string) {
    try {
      await JwtService.verifyJwtResetPasswordToken(token);
    } catch (error) {
      console.log(error);
      throw new HttpException(StatusCodes.UNAUTHORIZED, { error: 'Invalid url' });
>>>>>>> d39ebf8 (✨ Add signature url)
    }
  }
}

export default new AuthService();
