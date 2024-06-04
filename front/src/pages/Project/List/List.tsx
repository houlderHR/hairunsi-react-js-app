import './style.scss';
import { FC } from 'react';
import IProject from '../IProject';
import Card from './Card';

const List: FC<{ projects: IProject[] }> = ({ projects }) => (
  <div className="list">
    {projects.map((project: IProject) => (
      <Card project={project} key={project.id} />
    ))}
  </div>
);

export default List;
