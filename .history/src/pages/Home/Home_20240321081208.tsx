import { Link } from 'react-router-dom';
import bgHome from '../../assets/images/bg-home.svg';
import bgMobile from '../../assets/images/bg-mobile.svg';
import logo from '../../assets/images/logo.png';
import './Home.scss';

const Home = () => {
  return (
    <div  className="h-screen w-screen">
      <div className="relative w-full h-full bg-primary flex justify-center items-center justify-self-center">
        <div className="absolute xl:w-1/3 text-center z-50 flex flex-col justify-center">
          <div className="flex justify-center items-center">  
            <img src={logo} className="logo flex justify-center items-center" alt="" />
          </div>
          <div className="mt-20 text-white">
            <h2 className="welcome_text">Bienvenue sur HaiRun SI!</h2>
            <h3 className="mx-36 mt-1 description">Une plateforme de gestion et d'organisation en interne de vos rêves.</h3>
          </div>
          <Link to={'login'}>
            <button className="border border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer start_button">Commencer</button>
          </Link>
        </div>
        <div className="absolute bg-contain z-20 inset-0 h-full w-full" style={{backgroundImage: `url(${bgHome})`}}>
          {/* <img className="object-fit hidden xl:block xs:h-screen bg-primary" src={bgHome} alt="" />
          <img className="object-fit xl:hidden  xs:h-screen" src={bgMobile} alt="" /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;