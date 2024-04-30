import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/paths';

interface Props {}

const PublicRoute: FC<PropsWithChildren<Props>> = ({ children }) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');

  if (token) navigate(routes.authentified.subpaths.accueil.path);
  return children;
};

export default PublicRoute;
