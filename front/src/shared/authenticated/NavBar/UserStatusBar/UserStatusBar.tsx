import { FC, useContext, useEffect, useState } from 'react';
import Icon from '../../../Icon';
import UserContext from '../../userContext';
import { UserDto } from '../../userContext/UserContext';
import Dropdown from '../DropDown';

interface IUserStatusBar {
  logout: () => void;
}

const UserStatusBar: FC<IUserStatusBar> = ({ logout }) => {
  const [show, setShow] = useState(false);
  const currentUser = useContext(UserContext);
  const [user, setUser] = useState<undefined | UserDto>(currentUser);
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  return (
    <div
      role="presentation"
      onClick={() => setShow((s) => !s)}
      className="flex cursor-pointer duration-200 ml-4 h-full relative items-center py-2.5 pr-6 justify-center hover:bg-secondary"
    >
      <span className="w-px h-full hidden sm:inline-block mr-4 bg-gray-50 opacity-30" />
      <div className="flex relative flex-row items-center gap-x-4">
        <img src={user?.image.path} className="w-8 h-8 rounded-full border-white border" alt="" />
        <div className=" hidden sm:flex flex-col">
          <h2 className="text-base font-medium truncate leading-4">
            {user?.lastname} <span className="uppercase">{user?.firstname.toUpperCase()}</span>
          </h2>
          <p className="text-[10px] leading-3 font-normal">Web Designer</p>
        </div>
        <Icon width={10} height={5} name="sharp-arrow-drop-down" />
        {show && (
          <div className="absolute z-10 -bottom-4 translate-y-full w-auto sm:w-full rounded text-[10px] bg-primary right-0">
            <Dropdown onClick={logout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatusBar;
