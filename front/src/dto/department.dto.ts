export default interface DepartmentDto {
  id: string;
  name: string;
  role: Role;
  posts: Post[];
}

interface Role {
  id: string;
  name: string;
}

interface Post {
  id: string;
  name: string;
}
