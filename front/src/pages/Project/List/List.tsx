import './style.scss';
import { FC } from 'react';
import IProject from '../IProject';
import Card from './Card';

const List: FC<{ projects: IProject[] }> = ({ projects }) => (
  <div className="list">
    {projects.map((project: IProject, index: number) => (
      <Card
        project={project}
        index={project.id + index.toString()}
        key={project.id + index.toString()}
      />
    ))}
  </div>
);

export default List;
