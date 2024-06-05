interface IProject {
  id: string;
  name: string;
  image: string;
  type: string;
  created_at: Date;
  description: string;
  responsible?: {
    name: string;
    image: string;
    post: {
      name: string;
    };
  };
  client: {
    name: string;
    id: string;
  };
}

export default IProject;
