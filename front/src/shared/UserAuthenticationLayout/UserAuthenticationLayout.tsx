import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/paths';

interface UserAuthenticationProps {
  title: string;
  subTitle?: string;
  showLogo?: boolean;
  contentTitle?: string;
  showLoginLink?: boolean;
}

/**
 * Composant de base pour la partie:
 *  Login
 *  ResetPassword
 *  ResetPasswordSuccess
 *  ResetPasswordError
 *  PasswordRecovery
 *  EmailVerification
 */
const UserAuthenticationLayout: FC<PropsWithChildren<UserAuthenticationProps>> = ({
  title,
  subTitle,
  contentTitle,
  children,
  showLogo = false,
  showLoginLink = false,
}) => (
  <div className="grid md:grid-cols-[30%_70%] md:px-0 px-4 h-full min-h-screen">
    <div className="bg-primary h-full relative md:flex flex-col hidden">
      <img
        src="images/background/bg-only-left.png"
        alt="background"
        className="absolute z-0 w-full h-full top-0 left-0 bg-cover right-0 bg-no-repeat"
      />
      <div className="z-10 mt-auto xl:mb-80 mb-52 text-white mx-5 2xl:mx-[77px]">
        <h3 className="lg:text-[54px] text-4xl leading-9 lg:leading-[60px] break-words font-normal">
          {title}
        </h3>
        {subTitle && <span className="text-base mt-1 leading-2">{subTitle}</span>}
      </div>
    </div>
    <div className="flex w-full flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center">
        {showLogo && (
          <img
            src="images/logo/logo-hairun-no-text.png"
            alt="logo-hairun-no-text"
            className="w-16 h-20 bg-cover bg-no-repeat"
          />
        )}
        {contentTitle && (
          <h3 className="text-black-1 text-3xl font-medium mb-1 leading-9 mt-20">{contentTitle}</h3>
        )}
        {children}
        {showLoginLink && (
          <div className="mt-20 pt-7 border-t border-gray-5 text-black-1 px-11">
            <p className="text-sm leading-4">
              Vous avez d&eacute;ja un compte&nbsp;?&nbsp;
              <strong>
                <NavLink to={routes.unauthenticated.subpaths.login.path}>
                  Conn&eacute;ctez-vous
                </NavLink>
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default UserAuthenticationLayout;
