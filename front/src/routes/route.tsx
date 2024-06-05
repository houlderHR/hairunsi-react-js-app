import { createBrowserRouter, Navigate } from 'react-router-dom';
import Accueil from '../pages/Accueil';
import Authenticated from '../pages/Authenticated';
import CheckEmailToResetPassword from '../pages/CheckEmailToResetPassword';
import ErrorResetPassword from '../pages/ErrorResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Project from '../pages/Project';
import ProjectDetails from '../pages/Project/ProjectDetails';
import MainInfo from '../pages/Project/ProjectDetails/MainInfo';
import RedirectEmail from '../pages/RedirectEmail';
import ResetPassword from '../pages/ResetPassword';
import ResetPasswordSuccess from '../pages/ResetPassworSuccess';
import UserManager from '../pages/UserManager';
import UserManagerList from '../pages/UserManager/UserManagerList/UserManagerList';
import UserManagerRole from '../pages/UserManager/UserManagerRole';
import UserManagerType from '../pages/UserManager/UserManagerType';
import ProtectedRoute from '../shared/authenticated/ProtectedRoute/ProtectedRoute';
import InternalServerError from '../shared/InternalServerError/InternalServerError';
import PageNotFound from '../shared/PageNotFound/PageNotFound';
import PublicRoute from '../shared/unauthenticated/PublicRoute/PublicRoute';
import routes from './paths';

const router = createBrowserRouter([
  {
    path: routes.unauthenticated.path,
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.login.path,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.resetPassword.path,
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.forgotPassword.path,
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.redirectEmail.path,
    element: (
      <PublicRoute>
        <RedirectEmail />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.resetPasswordSuccess.path,
    element: (
      <PublicRoute>
        <ResetPasswordSuccess />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.checkEmailToResetPassword.path,
    element: (
      <PublicRoute>
        <CheckEmailToResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: routes.unauthenticated.subpaths.errorResetPassword.path,
    element: (
      <PublicRoute>
        <ErrorResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: routes.authentified.path,
    element: (
      <ProtectedRoute>
        <Authenticated />
      </ProtectedRoute>
    ),
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
              <Navigate to={routes.authentified.subpaths.userManager.subpaths.user.path} replace />
            ),
          },
        ],
      },
      {
        path: routes.authentified.subpaths.project.path,
        element: <Project />,
      },
      {
        path: `${routes.authentified.subpaths.project.path}${routes.authentified.subpaths.project.subpaths.id.path}`,
        element: <ProjectDetails />,
        children: [
          {
            path: routes.authentified.subpaths.project.subpaths.id.subpaths.main_info.path,
            element: <MainInfo />,
          },
          {
            path: routes.authentified.subpaths.project.subpaths.id.subpaths.daily.path,
            element: <MainInfo />,
          },
          {
            path: routes.authentified.subpaths.project.subpaths.id.subpaths.report.path,
            element: <MainInfo />,
          },
        ],
      },
      { path: routes.authentified.subpaths.project.path, element: <Project /> },
    ],
  },
  {
    path: routes.server_error.path,
    element: <InternalServerError />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default router;
