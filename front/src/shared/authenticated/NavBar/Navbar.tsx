<<<<<<< HEAD
import { FC } from 'react';
import Icon from '../../Icon';
import UserStatusBar from './UserStatusBar';

const Navbar: FC = () => (
  <div className="bg-primary z-10 fixed top-0 pl-5 text-white flex justify-between items-center h-14 w-full">
    <div className="flex items-center">
      <span className="inline-block sm:hidden">
        <Icon name="x" size={18.3} />
=======
import React from 'react';
import Icon from '../../Icon';
import UserStatusBar from './UserStatusBar';

const Navbar: React.FC = () => (
  <div className="bg-primary z-10 fixed top-0 pl-5 text-white flex justify-between items-center h-14 w-full">
    <div className="flex items-center">
      <span className="inline-block sm:hidden">
        <Icon name="x" size="18.3" />
>>>>>>> c1e59ef (fix:lint config)
      </span>
      <img
        src="/images/logo/logo-hairun-navbar.png"
        className="h-8 w-[85px] ml-10"
        alt="logo_hairun"
      />
    </div>
    <div className="flex h-full items-center justify-center">
      <span className="bg-secondary hidden shadow hover:shadow-xl duration-300 sm:flex h-9 w-9 rounded-full items-center justify-center">
<<<<<<< HEAD
        <Icon size={20} name="notification" />
=======
        <Icon size="20" name="notification" />
>>>>>>> c1e59ef (fix:lint config)
      </span>
      <UserStatusBar />
    </div>
  </div>
);

export default Navbar;
