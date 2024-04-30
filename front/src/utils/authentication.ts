import { AxiosError } from 'axios';
import UNAUTHENTICATED from '../routes/endpoints';
import http from './http-common';

type ErrorLoginWithConstraints = {
  status: number;
  error: { property: string; constraints: Record<string, string> }[];
};
type ErrorLoginWithoutConstraints = {
  status: number;
  error: string;
};

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
  let errorLoginWithConstraints: ErrorLoginWithConstraints;
  let errorLoginWithoutConstraints: ErrorLoginWithoutConstraints;
  switch (errors?.response?.status) {
    case 422:
      errorLoginWithConstraints = errors.response?.data as ErrorLoginWithConstraints;
      for (let i = 0; i < errorLoginWithConstraints.error.length; i += 1) {
        const element = errorLoginWithConstraints.error[i];
        if (element.constraints.isDefined) {
          returnedErrors.push(element.constraints.isDefined);
        }
      }
      break;
    default:
      errorLoginWithoutConstraints = errors.response?.data as ErrorLoginWithoutConstraints;
      returnedErrors.push(errorLoginWithoutConstraints.error);
      break;
  }
  return returnedErrors;
};
