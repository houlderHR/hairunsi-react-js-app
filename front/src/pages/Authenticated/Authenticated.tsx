import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/authenticated/NavBar';

<<<<<<< HEAD
const Authenticated: FC = () => (
=======
const Authenticated = () => (
>>>>>>> c1e59ef (fix:lint config)
  <div className="min-h-screen h-full bg-gray-50">
    <Navbar />
    <div className="h-full">
      <Outlet />
    </div>
  </div>
);

export default Authenticated;
