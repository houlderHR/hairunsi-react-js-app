const bcrypt = require('bcrypt');

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(+process.env.BCRYPT_SALT, (error, salt) => {
      if (error) {
        reject(error);
      }
      bcrypt.hash(password, salt, (error, hashed) => {
        if (error) reject(error);
        if (hashed) resolve(hashed);
      });
    });
  });
};
