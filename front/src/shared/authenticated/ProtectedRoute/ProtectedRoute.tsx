import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/paths';
import { decodeToken } from '../../../utils/authentication';

interface Props {}

const ProtectedRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    decodeToken(token)
      .then(() => setIsAuthenticated(true))
      .catch(() => navigate(routes.unauthenticated.subpaths.login.path));
  });

  if (isAuthenticated) return children;
  return null;
};

export default ProtectedRoute;
