import { User } from '../entities/user.entity';
import Unauthorized from '../exceptions/Unauthorized';
import { ResetPasswordConfig } from '../utils/resetPasswordConfig';
import { RESET_PASSWORD_PRIVATE_KEY, SECRET_KEY_TOKEN_RESEND_MAIL } from '../utils/token';
import userService from './user.service';

var jwt = require('jsonwebtoken');

class JwtService {
  generateJwtResetPassword(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data: { uuid: user.uuid, email: user.email } },
        `${RESET_PASSWORD_PRIVATE_KEY}${user.password}`,
        { expiresIn: ResetPasswordConfig.duration },
        (error, token) => {
          if (error) {
            reject(error);
          }

          if (token) {
            resolve(token);
          }
        },
      );
    });
  }

  async verifyJwtResetPasswordToken(
    token: string,
    user: User,
    ignoreJwtTimeout?: boolean,
  ): Promise<{ uuid: string; email: string }> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        `${RESET_PASSWORD_PRIVATE_KEY}${user.password}`,
        { ignoreExpiration: ignoreJwtTimeout },
        (error, decoded) => {
          if (error) {
            reject(error);
          }

          if (decoded) {
            resolve(decoded.data);
          }
        },
      );
    });
  }

  getJwtResetPasswordPayload(token: string): Promise<{ uuid: string; email?: string }> {
    return new Promise((resolve, reject) => {
      const decoded = jwt.decode(token);
      if (!decoded) reject(decoded);
      if (decoded) resolve(decoded.data);
    });
  }

  async generateTokenClassic(email: string) {
    const user = await userService.checkIfUserWithThisEmailAlreadyExists(email);
    if (user) {
      return new Promise((resolve, reject) => {
        jwt.sign(
          { data: { email: email } },
          SECRET_KEY_TOKEN_RESEND_MAIL + user.password,
          (error, token) => {
            if (error) {
              reject(error);
            }

            if (token) {
              resolve(token);
            }
          },
        );
      });
    }
  }

  async verifyTokenClassicForRecoveryPwd(token: string) {
    const data = await this.getJwtResetPasswordPayload(token);
    const user = await userService.checkIfUserWithThisEmailAlreadyExists(data.email);
    if (user) {
      return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY_TOKEN_RESEND_MAIL + user.password, (error, token) => {
          if (error) {
            reject(error);
          }
          if (token) {
            resolve(token);
          }
        });
      });
    }
    throw new Unauthorized('Token non autorisé');
  }
}

export default new JwtService();
