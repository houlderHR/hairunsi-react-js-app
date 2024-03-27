import routes from '../../routes/paths';
interface ObjOption {
  src: string;
  title: string;
  path: string;
}
export const options: ObjOption[] = [
  {
    src: '/rocket-icon.svg',
    title: 'Projets',
    path: '/projects',
  },
  {
    src: '/user-setting-icon.svg',
    title: 'Gestion des utilisateurs',
    path: `${routes.authentified.subpaths.userManager.path}/${routes.authentified.subpaths.userManager.subpaths.type.path}`,
  },
  {
    src: '/leave-icon.svg',
    title: 'Congé',
    path: '/leave-day',
  },
];
