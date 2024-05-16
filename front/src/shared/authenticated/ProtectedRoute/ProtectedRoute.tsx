import { AxiosResponse } from 'axios';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../../../hooks/useAuth';
import routes from '../../../routes/paths';
import UserContext from '../userContext';
import { UserDto } from '../userContext/UserContext';

interface Props {}

const ProtectedRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const [user, setUser] = useState<UserDto>();

  useEffect(() => {
    decodeToken(token)
      .then((response: AxiosResponse<{ decodedToken: { user: UserDto } }>) => {
        setUser(response.data.decodedToken.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        window.localStorage.removeItem('token');
        navigate(routes.unauthenticated.subpaths.login.path);
      });
  }, [navigate, token]);

  if (isAuthenticated) return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  return null;
};

export default ProtectedRoute;
