import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UNAUTHENTICATED, { AUTH } from '../routes/endpoints';
import routes from '../routes/paths';
import http from '../utils/http-common';
import { QUERY_TOKEN_AUTH_KEY, QUERY_TOKEN_SENDMAIL_KEY } from '../utils/query.constants';
import { TOKEN_RESEND_MAIL } from '../utils/token-const';

interface InputField {
  email: string;
}

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

export const getDecodeTokenResendMail = async (token: string) => {
  const result = await http.post(
    `${AUTH.BASE_PATH}/resend-mail-check-token`,
    {},
    {
      headers: { token_resend_mail: token },
    },
  );
  return result;
};

export const getDecodeTokenAuth = async (token: string) => {
  const result = await http.post(UNAUTHENTICATED.decode_token, { token });
  return result;
};

export const useDecodeTokenAuth = () => {
  const token = window.localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate(routes.unauthenticated.subpaths.login.path);
    }
  });
  return useQuery({
    queryKey: [QUERY_TOKEN_AUTH_KEY],
    queryFn: () => getDecodeTokenAuth(token as string),
    retry: false,
  });
};

export const useSendMail = () =>
  useMutation({
    mutationFn: (data: InputField) =>
      http
        .post(
          `${AUTH.BASE_PATH}/recovery-password`,
          { email: data.email },
          {
            headers: { Authorization: `email: ${data}`, 'x-user-email': data.email },
          },
        )
        .then((res) => res.data),
  });

export const useCheckTokenSendMail = () => {
  const checkToken = localStorage.getItem(TOKEN_RESEND_MAIL);
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkToken) {
      navigate(routes.unauthenticated.subpaths.login.path);
    }
  });
  return useQuery({
    queryKey: [QUERY_TOKEN_SENDMAIL_KEY],
    queryFn: () => getDecodeTokenResendMail(checkToken as string),
    retry: false,
  });
};
