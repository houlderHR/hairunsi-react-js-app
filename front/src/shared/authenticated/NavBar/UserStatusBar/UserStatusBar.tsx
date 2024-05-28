import { FC, useContext, useEffect, useState } from 'react';
import Icon from '../../../Icon';
import UserContext from '../../userContext';
import Dropdown from '../DropDown';

interface IUserStatusBar {
  logout: () => void;
}

const UserStatusBar: FC<IUserStatusBar> = ({ logout }) => {
  const [show, setShow] = useState(false);
  const currentUser = useContext(UserContext);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = currentUser?.image.path || '';
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [currentUser?.image.path]);
  return (
    <div
      role="presentation"
      onClick={() => setShow((s) => !s)}
      className="flex cursor-pointer duration-200 ml-4 h-full relative items-center py-2.5 pr-6 justify-center hover:bg-secondary"
    >
      <span className="w-px h-full hidden sm:inline-block mr-4 bg-gray-50 opacity-30" />
      <div className="flex relative flex-row items-center gap-x-4">
        <img
          src={isValid ? currentUser?.image.path : '/images/logo/logo-hairun-no-text.png'}
          className={`w-8 h-8 ${isValid ? 'rounded-full border-white border' : ''} `}
          alt=""
          id="user-profile"
        />
        <div className=" hidden sm:flex flex-col">
          <h2 className="text-base font-medium truncate leading-4">
            {currentUser?.lastname}{' '}
            <span className="uppercase">{currentUser?.firstname.toUpperCase()}</span>
          </h2>
          <p className="text-[10px] leading-3 font-normal">{currentUser?.post.name}</p>
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
