import { Navigate, createBrowserRouter } from 'react-router-dom';
import UserManager from '../pages/userManager';
import UserManagerType from '../pages/userManager/userManagerType';
import { LK_USERMANAGER } from './endpoints';

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
