import routes from '../../routes/paths';

interface ObjOption {
  src: string;
  title: string;
  path: string;
}
const options: ObjOption[] = [
  {
    src: '/icon/rocket-icon.svg',
    title: 'Projets',
    path: routes.authentified.subpaths.project.path,
  },
  {
    src: '/icon/user-setting-icon.svg',
    title: 'Gestion des utilisateurs',
    path: `${routes.authentified.subpaths.userManager.path}${routes.authentified.subpaths.userManager.subpaths.user.path}`,
  },
  {
    src: '/icon/leave-icon.svg',
    title: 'Congé',
    path: routes.authentified.subpaths.leaveDay.path,
  },
];

export default options;
