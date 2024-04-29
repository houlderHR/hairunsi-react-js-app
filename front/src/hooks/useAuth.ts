import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/paths';
import http from '../utils/http-common';
import { TOKEN_RESEND_MAIL } from '../utils/token-const';

const BASE_PATH = '/auth';

interface InputField {
  email: string;
}

export const getDecodeToken = async (token: string) => {
  const result = await http.post(
    `${BASE_PATH}/resend-mail-check-token`,
    {},
    {
      headers: { token_resend_mail: token },
    },
  );
  return result;
};

export const useSendMail = () =>
  useMutation({
    mutationFn: (data: InputField) =>
      http
        .post(
          `${BASE_PATH}/recovery-password`,
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
    queryKey: ['ValidToken'],
    queryFn: () => getDecodeToken(checkToken as string),
    retry: false,
  });
};
