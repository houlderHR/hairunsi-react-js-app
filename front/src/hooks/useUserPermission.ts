import { useContext } from 'react';
import UserContext from '../shared/authenticated/userContext';

const useUserPermission = () => {
  const user = useContext(UserContext);

  return user?.post.department.role.permissions;
};

export default useUserPermission;
