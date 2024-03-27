import { Navigate, createBrowserRouter } from 'react-router-dom';
import UserManager from '../pages/UserManager';
import UserManagerType from '../pages/UserManager/UserManagerType';
import routes from './paths';

const router = createBrowserRouter([
  {
    path: routes.authentified.path,
    element: <UserManager />,
    children: [
      {
        path: routes.userManager.subpaths.type.path,
        element: <UserManagerType />,
      },
      {
        path: routes.userManager.subpaths.user.path,
        element: <div>Utilisateurs</div>,
      },
      {
        path: routes.userManager.subpaths.role.path,
        element: <div>Rôle</div>,
      },
      {
        path: '*',
        element: <Navigate to={routes.userManager.subpaths.type.path} replace />,
      },
    ],
  },
]);

export default router;
