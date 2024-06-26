import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../Icon';
import UserStatusBar from './UserStatusBar';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.clear();
    navigate('/');
  };
  return (
    <div className="bg-primary z-[55] fixed top-0 pl-5 text-white flex justify-between items-center h-14 w-full">
      <div className="flex items-center">
        <span className="inline-block sm:hidden">
          <Icon name="x" size={18.3} />
        </span>
        <img
          src="/images/logo/logo-hairun-navbar.png"
          className="h-8 w-[85px] ml-10"
          alt="logo_hairun"
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <span className="bg-secondary hidden shadow hover:shadow-xl duration-300 sm:flex h-9 w-9 rounded-full items-center justify-center">
          <Icon size={20} name="notification" />
        </span>
        <UserStatusBar logout={logout} />
      </div>
    </div>
  );
};

export default Navbar;
