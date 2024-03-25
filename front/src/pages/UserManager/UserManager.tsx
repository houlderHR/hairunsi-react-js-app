import { Outlet } from 'react-router-dom';
import Navbar from '../../shared/Authentificated/NavBar';
import Icon from '../../shared/Icon';
import Sidebar from '../../shared/Authentificated/Sidebar';

const UserManager = () => {
  return (
    <>
      <Navbar />
      <div className="h-full">
        <div className="py-2 flex items-center pl-5 border-b bg-white border-gray-2 shadow-sm">
          <div className="flex gap-3 items-center">
            <Icon size="24.5" name="user-settings" />
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-normal text-black-1 font-medium leading-4">
                Gestion des utilisateurs
              </h2>
              <p className="text-gray-1 text-[10px] leading-3">Lister et gérer les utilisateurs</p>
            </div>
          </div>
        </div>
        <Sidebar />
        <div className="lg:ml-72 sm:ml-52 ml-16 md:px-14 px-6 h-full pt-6 flex flex-col">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserManager;
