import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/Authentificated/NavBar';

const Authentified = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Authentified;
