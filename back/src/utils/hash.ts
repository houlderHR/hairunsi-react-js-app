import { genSalt, hash, compare } from 'bcrypt';
import { BCRYPT_SALT } from './token';

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    genSalt(BCRYPT_SALT, (error, salt) => {
      if (error) {
        reject(error);
      }
      hash(password, salt, (error, hashed) => {
        if (error) reject(error);
        if (hashed) resolve(hashed);
      });
    });
  });
};

export const ComparePassword = async (password: string, passwordLogin: string) => {
  return (await compare(passwordLogin, password)).valueOf();
};
