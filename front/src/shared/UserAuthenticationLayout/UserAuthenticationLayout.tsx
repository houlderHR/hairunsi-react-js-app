import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/paths';

interface UserAuthenticationProps {
  title: string | React.ReactNode;
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
    <div className="bg-primary h-full relative md:flex flex-col justify-end hidden">
      <img
        src="images/background/bg-only-left.png"
        alt="background"
        className="absolute z-0 w-full h-full top-0 left-0 bg-cover right-0 bg-no-repeat"
      />
      <div className="z-10 text-white mx-5 2xl:mx-[77px] mb-[40%]">
        <h3 className="xl:text-[40px] xl:leading-10 lgg:text-[50px] text-3xl lg:leading-9 2xl:leading-[50px] 3xl:leading-[55px] break-words font-normal">
          {title}
        </h3>
        {subTitle && (
          <span className="text-[12px] lg:text-[14px] 2xl:text-base mt-3 2xl:mt-5 inline-block leading-4">
            {subTitle}
          </span>
        )}
      </div>
    </div>
    <div className="flex w-full flex-col items-center justify-center py-6 2xl:py-4 px-4">
      <div className="flex flex-col w-full md:w-auto items-center">
        {showLogo && (
          <img
            src="images/logo/logo-hairun-no-text.png"
            alt="logo-hairun-no-text"
            className="w-16 h-20 bg-cover bg-no-repeat"
          />
        )}
        {contentTitle && (
          <h3 className="text-black-1 text-3xl font-medium mb-1 leading-9 mt-10 2xl:mt-20">
            {contentTitle}
          </h3>
        )}
        {children}
        {showLoginLink && (
          <div className="2xl:mt-20 mt-10 pt-7 border-t border-gray-5 text-black-1 md:px-11">
            <p className="text-xs md:text-sm leading-none md:leading-4 text-center">
              Vous avez d&eacute;ja un compte&nbsp;?&nbsp;
              <strong>
                <NavLink to={routes.unauthenticated.subpaths.login.path}>Connectez-vous</NavLink>
              </strong>
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default UserAuthenticationLayout;
