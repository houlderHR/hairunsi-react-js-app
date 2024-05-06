import { FC, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';

const ResetPasswordSuccess: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (!state?.isResetPasswordSuccess) {
      navigate(routes.unauthenticated.subpaths.login.path);
    }
    return () => {
      window.history.replaceState({}, '');
    };
  });

  if (state?.isResetPasswordSuccess) {
    return (
      <UserAuthenticationLayout
        title="Réinitialisation de
      mot de passe réussi"
      >
        <div className="flex flex-col justify-center items-center">
          <Icon
            name="confeti"
            size={112}
            className="text-secondary mb-12 hover:text-primary duration-300"
          />
          <h3 className="font-medium text-3xl text-black-1 leading-9 mb-1">F&eacute;licitation</h3>
          <span className="text-gray-1 text-sm leading-4 font-medium text-center">
            Votre mot de passe a &eacute;t&eacute; cr&eacute;&eacute; avec succ&egrave;s. Vous
            pouvez maintenant acc&eacute;der &agrave; votre espace priv&eacute;.
          </span>
          <NavLink
            to={routes.unauthenticated.subpaths.login.path}
            className="w-full bg-primary 3xl:py-5 py-4  hover:bg-secondary duration-300 uppercase mt-3 md:mt-10 text-white rounded text-sm leading-4 font-medium flex items-center justify-center gap-5"
          >
            Se conn&eacute;cter
            <span>
              <Icon name="arrow-right" width={18} height={10} />
            </span>
          </NavLink>
        </div>
      </UserAuthenticationLayout>
    );
  }

  return null;
};

export default ResetPasswordSuccess;
