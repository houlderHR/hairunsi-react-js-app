import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecodeTokenAuth } from '../../../hooks/useAuth';
import routes from '../../../routes/paths';
import UserContext from '../userContext';
import { UserDto } from '../userContext/UserContext';

interface Props {}

const ProtectedRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data: tokenDecoded, isLoading, isError } = useDecodeTokenAuth();
  const token = window.localStorage.getItem('token');
  const [user, setUser] = useState<UserDto>();

  useEffect(() => {
    if (!isLoading && tokenDecoded) {
      setUser(tokenDecoded.data.decodedToken.user);
      setIsAuthenticated(true);
    }
    if (isError) {
      window.localStorage.removeItem('token');
      navigate(routes.unauthenticated.subpaths.login.path);
    }
  }, [isError, isLoading, navigate, token, tokenDecoded]);

  if (isAuthenticated) return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  return null;
};

export default ProtectedRoute;
