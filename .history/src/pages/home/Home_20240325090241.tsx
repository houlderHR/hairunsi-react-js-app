import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Home.scss';
import { LK_home } from '../../routes/endpoints';
import UnauthButton from '../../shared/unauthentified/buttons';

const Home = () => {
  return (
    <div  className="home-container h-screen w-screen">
      <div className="relative w-full h-full bg-primary flex justify-center items-center justify-self-center">
        <div className="absolute md:w-1/3 text-center z-50 flex flex-col justify-center">
          <div className="flex justify-center items-center">  
            <img src={logo} className="logo flex justify-center items-center" alt="" />
          </div>
          <div className="mt-20 text-white">
            <h2 className="text-2xl xl:text-4xl font-bold xl:font-normal">Bienvenue sur HaiRun SI!</h2>
            <h3 className="mt-1 text-sm text-center xl:text-base px-12 sm:px-3.5 xl:px-36">Une plateforme de gestion et d'organisation en interne de vos rêves.</h3>
          </div>
          <Link to={LK_home}>
            <UnauthButton title='commencer'/>
          </Link>
        </div>
        <div className="absolute bg-cover z-20 inset-0 h-full w-full bg-no-repeat bg-svg">
        </div>
      </div>
    </div>
  );
}

export default Home;