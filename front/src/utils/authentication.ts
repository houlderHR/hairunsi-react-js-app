import { AxiosError } from 'axios';
import UNAUTHENTICATED from '../routes/endpoints';
import http from './http-common';

export const login = async (
  email: string | undefined,
  password: string | undefined,
  rememberMe: HTMLInputElement,
) => {
  const user = await http.post(UNAUTHENTICATED.login, {
    email,
    password,
    duration: rememberMe?.checked ? '7d' : '1d',
  });

  return user;
};

export const decodeToken = (token: string | null) =>
  http.post(UNAUTHENTICATED.decode_token, { token });

export const manageErrorMessage = (errors: AxiosError) => {
  const returnedErrors: string[] = [];
  switch (errors?.response?.data?.status) {
    case 422:
      for (let i = 0; i < errors.response.data?.error.length; i += 1) {
        const element = errors.response.data?.error[i];
        if (element.constraints.isDefined) {
          returnedErrors.push(element.constraints.isDefined);
        }
      }
      break;
    default:
      returnedErrors.push(errors?.response?.data?.error);
      break;
  }
  return returnedErrors;
};
