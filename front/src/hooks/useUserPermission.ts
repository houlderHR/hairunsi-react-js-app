import { useContext } from 'react';
import UserContext from '../shared/authenticated/userContext';

const useUserPermission = () => {
  const user = useContext(UserContext);

  const allowPermission = (permission: string): boolean =>
    user?.post.department.role.permissions
      ?.map(({ name }) => name.toUpperCase())
      .includes(permission.toUpperCase()) ?? false;

  return { permissions: user?.post.department.role.permissions, allowPermission };
};

export default useUserPermission;
