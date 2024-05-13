export default interface ObjDetail {
  matricule: string;
  firstname: string;
  lastname: string;
  birth_date: string;
  post: { name: string; department: { name: string } };
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
