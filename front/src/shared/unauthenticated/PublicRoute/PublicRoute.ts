import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/paths';
import http from '../../../utils/http-common';

interface Props {}

const PublicRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    http
      .post('/auth/decode-token', { token })
      .then(() => navigate(routes.authentified.subpaths.accueil.path))
      .catch(() => setIsAuthenticated(false));
  });

  if (!isAuthenticated) return children;
  return null;
};

export default PublicRoute;
