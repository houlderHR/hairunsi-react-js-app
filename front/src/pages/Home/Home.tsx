import './Home.scss';
<<<<<<< HEAD
import { FC } from 'react';
=======
>>>>>>> c1e59ef (fix:lint config)
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import StartButtonOutlined from './StartButtonOutlined';

<<<<<<< HEAD
const Home: FC = () => (
=======
const Home = () => (
>>>>>>> c1e59ef (fix:lint config)
  <div className="home-container h-screen w-full">
    <div className="relative w-full h-full bg-primary flex justify-center items-center justify-self-center">
      <div className="absolute md:w-1/3 text-center z-50 flex flex-col justify-center">
        <div className="flex justify-center items-center">
          <img
            src="images/logo/logo-hairun.png"
            className="logo flex justify-center items-center"
            alt=""
          />
        </div>
        <div className="mt-20 text-white">
          <h2 className="text-2xl xl:text-4xl font-bold xl:font-normal">
            Bienvenue sur HaiRun SI!
          </h2>
<<<<<<< HEAD
          <h3 className="mt-1 text-sm text-center xl:text-base px-12 sm:px-3.5 xl:px-mety">
            Une plateforme de gestion et d&apos;organisation en interne de vos r&ecirc;ves.
          </h3>
        </div>
        <Link to={routes.unauthenticated.subpaths.login.path}>
          <StartButtonOutlined title="commencer" />
=======
          <h3 className="mt-1 text-sm text-center xl:text-base px-12 sm:px-3.5 2xl:px-36">
            Une plateforme de gestion et d&apos;organisation en interne de vos rêves.
          </h3>
        </div>
        <Link to={routes.unauthenticated.subpaths.login.path}>
          <StartButton title="commencer" />
>>>>>>> c1e59ef (fix:lint config)
        </Link>
      </div>
      <div className="absolute bg-cover z-20 inset-0 h-full w-full bg-no-repeat bg-svg" />
    </div>
  </div>
);

export default Home;
