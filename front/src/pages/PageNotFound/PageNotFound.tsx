import './style.scss';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';

const PageNotFound = () => (
  <UserAuthenticationLayout
    title={
      <div>
        Oops !<br /> Page non trouv&eacute;e
      </div>
    }
  >
    <div className="container-error-not-found">
      <div className="content">
        <div className="h-full w-full flex justify-center items-center">
          <Player
            src="/lotties/404-not-found.json"
            className="player w-md p-0 m-0"
            style={{ maxHeight: '500px', maxWidth: '500px' }}
            loop
            autoplay
          />
        </div>
      </div>
      <div className="button">
        <Link
          to={routes.unauthenticated.subpaths.login.path}
          className="flex justify-center items-center gap-x-1 w-full bg-primary 3xl:py-5 py-4  hover:bg-secondary duration-300 uppercase -mt-[50px] text-white rounded text-sm leading-4 font-medium"
        >
          VERS LA CONNEXION
          <Icon name="arrow-right" />
        </Link>
      </div>
    </div>
  </UserAuthenticationLayout>
);

export default PageNotFound;
