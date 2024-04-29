import { User } from '../entities/user.entity';
import { ResetPasswordConfig } from '../utils/resetPasswordConfig';

var jwt = require('jsonwebtoken');

class JwtService {
  generateJwtResetPassword(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data: { uuid: user.uuid, email: user.email } },
        `${process.env.RESET_PASSWORD_PRIVATE_KEY}${user.password}`,
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
        `${process.env.RESET_PASSWORD_PRIVATE_KEY}${user.password}`,
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

  getJwtResetPasswordPayload(token: string): Promise<{ uuid: string }> {
    return new Promise((resolve, reject) => {
      const decoded = jwt.decode(token);
      if (!decoded) reject(decoded);
      if (decoded) resolve(decoded.data);
    });
  }
}

export default new JwtService();
