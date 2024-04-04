const routes = {
  authentified: {
    path: '',
    subpaths: {
      accueil: { path: 'accueil' },
      project: { path: '/projects' },
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
    },
  },
};

export default routes;
