var jwt = require('jsonwebtoken');

class JwtService {
  async generateJwtResetPassword() {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data: { userId: 1 } },
        'reset-password-secret-key-hairun-to-introduce-in-dotenv-after',
        { expiresIn: 60 },
        (error, token) => {
          if (token) {
            resolve(token);
          }

          reject(error);
        },
      );
    });
  }

  async verifyJwtResetPasswordToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        'reset-password-secret-key-hairun-to-introduce-in-dotenv-after',
        (error, decoded) => {
          if (error) {
            reject(error);
          }

          if (token) {
            resolve(decoded);
          }
        },
      );
    });
  }
}

export default new JwtService();
