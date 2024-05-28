import routes from '../../routes/paths';

interface ObjOption {
  src: string;
  title: string;
  path: string;
}
const options: ObjOption[] = [
  {
    src: 'rocket-icon',
    title: 'Projets',
    path: routes.authentified.subpaths.project.path,
  },
  {
    src: 'user-setting-icon',
    title: 'Gestion des utilisateurs',
    path: `${routes.authentified.subpaths.userManager.path}${routes.authentified.subpaths.userManager.subpaths.user.path}`,
  },
  {
    src: 'leave-icon',
    title: 'Congé',
    path: routes.authentified.subpaths.leaveDay.path,
  },
];

export default options;
