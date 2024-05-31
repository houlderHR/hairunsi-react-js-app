import './style.scss';
import Card from './Card';
import projects from './constants';

const List = () => (
  <div className="list">
    {projects.map(
      (project: {
        name: string;
        image: string;
        type: string;
        created_at: Date;
        description: string;
        responsible: {
          name: string;
          image: string;
          post: {
            name: string;
          };
        };
      }) => (
        <Card project={project} />
      ),
    )}
  </div>
);

export default List;
