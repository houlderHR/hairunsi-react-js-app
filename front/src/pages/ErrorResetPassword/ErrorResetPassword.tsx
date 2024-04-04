import './style.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';

const ErrorResetPassword: FC = () => (
  <UserAuthenticationLayout title="Echec de la réinitialisation du mot de passe">
    <div className="container-error">
      <div className="content">
        <img src="/icon/warning.svg" alt="warning" className="warning" />
        <div className="title">
          <div className="description">Une erreur s&apos;est produite !</div>
          <div className="confirmation">
            Il y a eu une erreur lors de la r&eacute;initialisation de votre mot de passe. Veuillez
            r&eacute;essayer plus tard !
          </div>
        </div>
      </div>
      <div className="button">
        <Link to={routes.unauthenticated.subpaths.login.path}>
          <Button>
            <div className="redirect">
              <div>VERS LA CONNEXION</div>
              <img src="/icon/arrow-right.svg" alt="right" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  </UserAuthenticationLayout>
);

export default ErrorResetPassword;
