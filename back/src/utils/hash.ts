import { genSalt, hash, compare } from 'bcrypt';

export const HashPassword = async (password: string) => {
  const salt = await genSalt();
  return await hash(password, salt);
};
export const ComparePassword = async (password: string, passwordLogin: string) => {
  return (await compare(passwordLogin, password)).valueOf();
};
