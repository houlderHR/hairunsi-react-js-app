const routes = {
  userManager: {
    path: '/user-manager/',
    subpaths: {
      type: { path: 'type' },
      user: { path: 'path' },
      role: { path: 'role' },
    },
  },
};

export default routes;
