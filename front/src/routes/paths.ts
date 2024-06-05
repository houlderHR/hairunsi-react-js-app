const routes = {
  authentified: {
    path: '',
    subpaths: {
      accueil: { path: '/accueil' },
      project: {
        path: '/projects',
        subpaths: {
          id: {
            path: '/:id/',
            subpaths: {
              main_info: { path: 'main-info' },
              daily: { path: 'daily' },
              report: { path: 'report' },
            },
          },
        },
      },
      leaveDay: { path: '/leave-day' },
      userManager: {
        path: '/user-manager/',
        subpaths: {
          type: { path: 'type' },
          user: { path: 'user' },
          role: { path: 'role' },
        },
      },
    },
  },
  unauthenticated: {
    path: '/',
    subpaths: {
      login: {
        path: '/login',
      },
      resetPassword: {
        path: '/reset-password',
      },
      resetPasswordSuccess: {
        path: '/reset-password-success',
      },
      forgotPassword: {
        path: '/forgot-password',
      },
      redirectEmail: {
        path: 'redirect-email',
      },
      checkPassword: {
        path: '/reset-password-error',
      },
      checkEmailToResetPassword: {
        path: '/check-email',
      },
      errorResetPassword: {
        path: '/reset-password-fail',
      },
    },
  },
  server_error: { path: '/server-error' },
  not_found: { path: '/not_found' },
};

export default routes;
