import './style.scss';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';

const PageNotFound = () => (
  <div className="container-error-not-found">
    <div className="content">
      <img src="/images/logo/logo-hairun-large.png" alt="Logo" className="w-[300px]" />
      <div className="h-full w-full flex justify-center items-center">
        <Player
          src="/lotties/404-not-found.json"
          className="player w-full p-0 m-0"
          style={{ maxHeight: '500px', maxWidth: '500px' }}
          loop
          autoplay
        />
      </div>
    </div>
    <div className="button">
      <Link
        to={routes.authentified.subpaths.accueil.path}
        className="flex justify-center items-center gap-x-1 w-auto 3xl:py-5 py-4 duration-300 uppercase -mt-[80px] text-primary hover:underline hover:underline-offset-8 text-sm leading-4 font-medium"
      >
        RETOURNER A LA PAGE D&acute;ACCUEIL
        <Icon name="arrow-right" />
      </Link>
    </div>
  </div>
);

export default PageNotFound;
