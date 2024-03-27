import { createBrowserRouter, Navigate } from 'react-router-dom';
import Accueil from '../pages/Accueil';
import Authenticated from '../pages/Authenticated/Authenticated';
import Home from '../pages/Home';
import UserManager from '../pages/UserManager';
import UserManagerType from '../pages/UserManager/UserManagerType';
import routes from './paths';
<<<<<<< HEAD
=======
import Authenticated from '../pages/Authenticated/Authenticated';
import Home from '../pages/Home';
import Accueil from '../pages/Accueil';
import UserManagerRole from '../pages/UserManager/UserManagerRole';
>>>>>>> 84c509c (feat: refact components and create card role manager)

const router = createBrowserRouter([
  {
    path: routes.unauthenticated.path,
    element: <Home />,
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
            element: <div>Utilisateurs</div>,
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
