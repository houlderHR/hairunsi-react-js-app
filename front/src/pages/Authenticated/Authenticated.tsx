import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/authenticated/NavBar';

const Authenticated = () => {
  return (
    <>
      <div className="min-h-screen h-full bg-gray-50">
        <Navbar />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Authenticated;
