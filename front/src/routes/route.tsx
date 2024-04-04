import { createBrowserRouter, Navigate } from 'react-router-dom';
import Accueil from '../pages/Accueil';
import Authenticated from '../pages/Authenticated';
import Home from '../pages/Home';
import ResetPassword from '../pages/UserAuthentication/ResetPassword';
import ResetPasswordSuccess from '../pages/UserAuthentication/ResetPassworSuccess';
import UserManager from '../pages/UserManager';
import UserManagerList from '../pages/UserManager/UserManagerList/UserManagerList';
import UserManagerRole from '../pages/UserManager/UserManagerRole';
import UserManagerType from '../pages/UserManager/UserManagerType';
import routes from './paths';

const router = createBrowserRouter([
  {
    path: routes.unauthenticated.path,
    element: <Home />,
  },
  {
    path: routes.unauthenticated.subpaths.resetPassword.path,
    element: <ResetPassword />,
  },
  {
    path: routes.unauthenticated.subpaths.ResetPasswordSuccess.path,
    element: <ResetPasswordSuccess />,
  },
  {
    path: routes.authentified.path,
    element: <Authenticated />,
    children: [
      {
        path: routes.authentified.subpaths.accueil.path,
        element: <Accueil />,
      },
      {
        path: routes.authentified.subpaths.userManager.path,
        element: <UserManager />,
        children: [
          {
            path: routes.authentified.subpaths.userManager.subpaths.type.path,
            element: <UserManagerType />,
          },
          {
            path: routes.authentified.subpaths.userManager.subpaths.user.path,
            element: <UserManagerList />,
          },
          {
            path: routes.authentified.subpaths.userManager.subpaths.role.path,
            element: <UserManagerRole />,
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
