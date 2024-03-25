import { Navigate, createBrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import UserManager from '../pages/userManager';
import UserManagerType from '../pages/userManager/userManagerType';
import { LK_USERMANAGER } from './endpoints';
=======
import UserManager from '../pages/UserManager';
import UserManagerType from '../pages/UserManager/UserManagerType';
import { LK_USERMANAGER } from './paths';
>>>>>>> a8eed9f (fix: linter)

const router = createBrowserRouter([
  {
    path: LK_USERMANAGER,
    element: <UserManager />,
    children: [
      {
        path: 'type',
        element: <UserManagerType />,
      },
      {
        path: 'user',
        element: <div>Utilisateurs</div>,
      },
      {
        path: 'role',
        element: <div>Rôle</div>,
      },
      {
        path: '*',
        element: <Navigate to="type" replace />,
      },
    ],
  },
]);

export default router;
