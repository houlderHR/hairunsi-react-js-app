import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/paths';

interface Props {}

const PublicRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) navigate(routes.authentified.subpaths.accueil.path);
  });
  if (!token) return children;
  return null;
};

export default PublicRoute;
