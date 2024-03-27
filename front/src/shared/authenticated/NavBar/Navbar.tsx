import React from 'react';
import UserStatusBar from './UserStatusBar';
import Icon from '../../Icon';

const Navbar: React.FC = () => {
  return (
    <>
      <div className="bg-primary z-10 fixed top-0 pl-5 text-white flex justify-between items-center h-14 w-full">
        <div className="flex items-center">
          <span className="inline-block sm:hidden">
            <Icon name="x" size="18.3" />
          </span>
          <img
            src="/images/logo/logo-hairun-navbar.png"
            className="h-8 w-[85px] ml-10"
            alt="logo_hairun"
          />
        </div>
        <div className="flex h-full items-center justify-center">
          <span className="bg-secondary hidden shadow hover:shadow-xl duration-300 sm:flex h-9 w-9 rounded-full items-center justify-center">
            <Icon size="20" name="notification" />
          </span>
          <UserStatusBar />
        </div>
      </div>
    </>
  );
};

export default Navbar;
