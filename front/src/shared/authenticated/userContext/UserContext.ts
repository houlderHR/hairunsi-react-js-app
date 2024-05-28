import { createContext } from 'react';

export interface UserDto {
  uuid: string;
  matricule: string;
  firstname: string;
  lastname: string;
  email: string;
  birth_date: string;
  image: {
    path: string;
  };
  post: {
    id: string;
    name: string;
    department: {
      id: string;
      name: string;
      role: {
        name: string;
        permissions: {
          name: string;
          id: string;
        }[];
      };
    };
  };
}

const UserContext = createContext<UserDto | undefined>(undefined);

export default UserContext;
