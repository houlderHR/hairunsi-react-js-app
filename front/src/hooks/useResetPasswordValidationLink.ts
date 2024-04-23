import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes/paths';
import http from '../utils/http-common';

export const TOKEN_QUERY_PARAM = '?token=';

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

const useCheckPasswordValidationLink = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isSuccess: isUrlValid,
    isLoading: isValidationLoading,
    isError: isUrlError,
  } = useQuery({
    queryKey: ['ValidUrl'],
    queryFn: () => fetchValidationUrl(location.search.replace(TOKEN_QUERY_PARAM, '')),
    retry: false,
  });

  useEffect(() => {
    if (!location.search.startsWith(TOKEN_QUERY_PARAM)) {
      navigate(routes.unauthenticated.subpaths.login.path);
    }
  });

  return { isUrlValid, isValidationLoading, isUrlError };
};

export default useCheckPasswordValidationLink;
