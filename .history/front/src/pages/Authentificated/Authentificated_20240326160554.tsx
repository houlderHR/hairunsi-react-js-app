import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/Authentificated/NavBar';

const Authentificated = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 h-full">
        <Outlet />
      </div>
    </>
  );
};

export default Authentificated;
