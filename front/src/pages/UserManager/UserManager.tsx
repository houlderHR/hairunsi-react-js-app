import { Outlet } from 'react-router-dom';
import Icon from '../../shared/Icon';
import Sidebar from './Sidebar';

const UserManager = () => (
  <div className="h-full pt-[101px] ">
    <div className="fixed w-full top-14 z-40">
      <div className="py-2 flex items-center pl-5 border-b bg-white z-0 border-gray-2 shadow-sm">
        <div className="flex gap-3 items-center">
          <Icon size={24.5} name="user-settings" />
          <div className="flex flex-col justify-sd tart items-start">
            <h2 className="text-normal text-black-1 font-medium leading-4">
              Gestion des utilisateurs
            </h2>
            <p className="text-gray-1 text-[10px] leading-3">Lister et gérer les utilisateurs</p>
          </div>
        </div>
      </div>
    </div>

    <Sidebar />
    <div className="bg-gray-8 w-full h-20 fixed z-40" />
    <div className="lg:ml-72 sm:ml-52 ml-16 z-0 md:px-14 px-6 h-full pt-6 pb-6 flex flex-col ">
      <Outlet />
    </div>
  </div>
);

export default UserManager;
