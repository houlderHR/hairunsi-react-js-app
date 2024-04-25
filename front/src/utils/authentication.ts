import { AxiosError } from 'axios';
import http from './http-common';

interface IUser {
  'E-mail': string;
  'Mot de passe': string;
}

export const login = async (data: IUser, rememberMe: HTMLInputElement) => {
  const user = await http.post('/auth/login', {
    email: data['E-mail'],
    password: data['Mot de passe'],
    duration: rememberMe?.checked ? '7d' : '1d',
  });

  return user;
};

export const decodeToken = (token: string | null) => http.post('/auth/decode-token', { token });

export const manageErrorMessage = (errors: AxiosError) => {
  switch (errors?.response?.data?.status) {
    case 422:
      errors?.response?.data?.error.map((e) => {
        if (e.constraints.matches) {
          return e.constraints.matches;
        }
        return '';
      });
      break;
    case 404:
      return errors?.response?.data?.error;
    case 401:
      return errors?.response?.data?.error;
    default:
      return errors?.response?.data?.error;
  }
};
