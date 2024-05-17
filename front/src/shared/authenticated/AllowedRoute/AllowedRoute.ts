import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/paths';

interface Props {
  isAllowed: boolean;
}

const AllowedRoute: FC<PropsWithChildren<Props>> = ({ children, isAllowed }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) navigate(routes.not_found.path);
  }, [isAllowed, navigate]);

  if (isAllowed) return children;
  return null;
};

export default AllowedRoute;
