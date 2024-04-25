import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes/paths';
import http from '../utils/http-common';

export const TOKEN_QUERY_PARAM = '?token=';

const mapError = (
  error: { property: string; constraints: Record<string, string> }[],
  cb: (
    property: 'password' | 'confirmPassword',
    type: 'min' | 'matches' | 'oneOf' | 'containPersonalInformation',
    message?: string,
  ) => void,
) => {
  let property: 'password' | 'confirmPassword' = 'password';
  let type: 'min' | 'matches' | 'oneOf' | 'containPersonalInformation' = 'min';
  let message = '';
  for (let i = 0; i < error.length; i += 1) {
    if (error[i].property === 'password') {
      property = 'password';
      if (error[i].constraints.isStrongPassword) {
        type = 'matches';
      }
      if (error[i].constraints.minLength) {
        type = 'min';
      }
      if (error[i].constraints.containPersonalInformation) {
        type = 'containPersonalInformation';
        message = ' ne doit pas contenir vos informations personelles';
      }
      break;
    }
    property = 'confirmPassword';
    type = 'oneOf';
  }
  cb(property, type, message);
};

const fetchValidationUrl = async (token: string) => {
  const response = await http.post(
    'auth/forgot-password-check-url',
    {},
    {
      headers: {
        token_password: token,
      },
    },
  );
  return response;
};

const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = location.search.replace(TOKEN_QUERY_PARAM, '');

  const {
    isSuccess: isUrlValid,
    isLoading: isValidationLoading,
    isError: isUrlError,
    refetch,
  } = useQuery({
    queryKey: ['ValidUrl'],
    queryFn: () => fetchValidationUrl(location.search.replace(TOKEN_QUERY_PARAM, '')),
    retry: false,
    refetchInterval: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (!location.search.startsWith(TOKEN_QUERY_PARAM)) {
      navigate(routes.unauthenticated.subpaths.forgotPassword.path);
    }
  });

  return { isUrlValid, isValidationLoading, isUrlError, token, refetch, mapError };
};

export default useResetPassword;
