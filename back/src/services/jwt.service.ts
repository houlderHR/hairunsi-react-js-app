var jwt = require('jsonwebtoken');

class JwtService {
  async generateJwtResetPassword() {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data: { userId: 1 } },
        process.env.RESET_PASSWORD_PRIVATE_KEY,
        { expiresIn: 60 },
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

  async verifyJwtResetPasswordToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.RESET_PASSWORD_PRIVATE_KEY, (error, decoded) => {
        if (error) {
          reject(error);
        }

        if (decoded) {
          console.log(decoded);
          resolve(decoded);
        }
      });
    });
  }
}

export default new JwtService();
