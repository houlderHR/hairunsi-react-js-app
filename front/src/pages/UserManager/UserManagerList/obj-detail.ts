export default interface ObjDetail {
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
        permissions: string[];
      };
    };
  };
}

export interface TitleDetail {
  matricule: string;
  firstname: string;
  lastname: string;
  birth_date: string;
  department: string;
}

export type UserType = {
  id: string;
  matricule: string;
  firstname: string;
  lastname: string;
  post: { name: string; department: { name: string } };
  birth_date: string;
};
