import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/Authentificated/NavBar';

const Authentified = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 h-full">
        <Outlet />
      </div>
    </>
  );
};

export default Authentified;
