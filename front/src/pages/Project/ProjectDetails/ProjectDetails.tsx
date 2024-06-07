import { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NavBarProject from './NavbarProject';

const ProjectDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="min-h-screen text-black h-full bg-gray-8">
      <NavBarProject id={id ?? ''} image="/images/logo/panda.png" name="Gen - General Enterprise" />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectDetails;
