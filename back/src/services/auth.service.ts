import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/user.entity';
import HttpNotFoundException from '../exceptions/HttpNotFoundException';
import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import sendMail from '../utils/sendMail';
import HttpException from '../exceptions/HttpException';

class AuthService {
  async recoveryPassword(email: string) {
    try {
      const result = await AppDataSource.getRepository(User).findOne({
        where: { email: email.trim() },
      });
      if (!result) throw new HttpNotFoundException("Le mail n'existe pas");
      try {
        return await sendMail('Récupération mot de passe', result.email, 'generatelink(user)');
      } catch (error) {
        throw new HttpException(StatusCodes.BAD_REQUEST, "Impossible d'envoyer le mail");
      }
    } catch (error) {
      if (error.status == StatusCodes.NOT_FOUND || error.status == StatusCodes.BAD_REQUEST)
        throw error;
      throw new InternalServerErrorException();
    }
  }
}

export default new AuthService();
