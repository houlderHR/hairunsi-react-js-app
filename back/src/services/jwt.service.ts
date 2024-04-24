import { User } from '../entities/user.entity';

var jwt = require('jsonwebtoken');

class JwtService {
  generateJwtResetPassword(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data: { userId: user.uuid, email: user.email } },
        process.env.RESET_PASSWORD_PRIVATE_KEY,
        { expiresIn: +process.env.RESET_PASSWORD_TOKEN_DURATION },
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
    ignoreJwtTimeout?: boolean,
  ): Promise<{ uuid: string; email: string }> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.RESET_PASSWORD_PRIVATE_KEY,
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
}

export default new JwtService();
