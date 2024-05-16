import { useContext } from 'react';
import UserContext from '../shared/authenticated/userContext';

const useUserPermission = () => {
  const user = useContext(UserContext);

  const allowPermission = (permission: string): boolean =>
    user?.post.department.role.permissions?.map(({ name }) => name).includes(permission) ?? false;

  return { permissions: user?.post.department.role.permissions, allowPermission };
};

export default useUserPermission;
