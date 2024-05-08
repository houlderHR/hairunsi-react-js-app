import './style.scss';
import { FC, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';

const ErrorResetPassword: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (!state?.isResetPasswordError) {
      navigate(routes.unauthenticated.subpaths.login.path);
    }
    return () => {
      window.history.replaceState({}, '');
    };
  });

  if (state?.isResetPasswordError) {
    return (
      <UserAuthenticationLayout title="Echec de la réinitialisation du mot de passe">
        <div className="container-error">
          <div className="content">
            <img src="/icon/warning.svg" alt="warning" className="warning" />
            <div className="title">
              <div className="description">Une erreur s&apos;est produite !</div>
              <div className="confirmation">
                Il y a eu une erreur lors de la r&eacute;initialisation de votre mot de passe.
                Veuillez r&eacute;essayer plus tard !
              </div>
            </div>
          </div>
          <div className="button">
            <Button type="button">
              <Link
                to={routes.unauthenticated.subpaths.login.path}
                className="flex flex-row w-full items-center justify-center gap-4"
              >
                VERS LA CONNEXION
                <Icon name="arrow-right" />
              </Link>
            </Button>
          </div>
        </div>
      </UserAuthenticationLayout>
    );
  }

  return null;
};

export default ErrorResetPassword;
