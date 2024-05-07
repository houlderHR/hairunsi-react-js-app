import './style.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../Icon';
import UserAuthenticationLayout from '../UserAuthenticationLayout';
import Button from '../UserAuthenticationLayout/Button';

const InternalServerError: FC = () => (
  <UserAuthenticationLayout title="Quelque chose s'est mal passé.">
    <div className="container-error">
      <div className="content">
        <img src="/icon/warning.svg" alt="warning" className="warning" />
        <div className="title">
          <div className="description">Une erreur s&apos;est produite !</div>
          <div className="confirmation">Ce n&apos;est pas vous, c&apos;est nous.</div>
        </div>
      </div>
      <div className="button">
        <Button type="button">
          <Link
            to={routes.authentified.subpaths.accueil.path}
            className="flex flex-row w-full items-center justify-center gap-4"
          >
            VERS L&apos;ACCUEIL
            <Icon name="arrow-right" />
          </Link>
        </Button>
      </div>
    </div>
  </UserAuthenticationLayout>
);

export default InternalServerError;
