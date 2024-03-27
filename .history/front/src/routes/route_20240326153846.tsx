import { Navigate, createBrowserRouter } from 'react-router-dom';
import UserManager from '../pages/UserManager';
import UserManagerType from '../pages/UserManager/UserManagerType';
import routes from './paths';
import Authentified from '../pages/Authentificated/Authentificated';

const router = createBrowserRouter([
  {
    path: routes.authentified.path,
    element: <Authentified />,
    children: [
      {
        path: routes.authentified.subpaths.userManager.path,
        children: [
          {
            path: routes.authentified.subpaths.userManager.path,
            element: <UserManagerType />,
          },
          {
            path: routes.authentified.subpaths.userManager.subpaths.user.path,
            element: <div>Utilisateurs</div>,
          },
          {
            path: routes.authentified.subpaths.userManager.subpaths.role.path,
            element: <div>Rôle</div>,
          },
          {
            path: '*',
            element: (
              <Navigate to={routes.authentified.subpaths.userManager.subpaths.type.path} replace />
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
