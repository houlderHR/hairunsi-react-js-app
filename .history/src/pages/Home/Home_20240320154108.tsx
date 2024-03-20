import { Link } from 'react-router-dom';
import React from 'react';
import bgHome from '../../assets/images/bg-home.svg';
import logo from '../../assets/images/logo.png';
import './Home.scss';

const Home = () => {
  return (
    <div  className='container-tm h-screen w-screen'>
      <div className='relative w-full h-full bg-primary flex justify-center items-center justify-self-center '>
        <div className='absolute xl:w-1/3 text-center z-50 flex-col justify-center'>
          <div className="flex justify-center items-center">  
            <img src={logo} alt="" />
          </div>
          <div className='mt-20 text-white'>
            <h2 className='welcome_text'>Bienvenue sur HaiRun SI!</h2>
            <h3 className='mx-36 mt-1 description'>Une plateforme de gestion et d'organisation en interne de vos rêves.</h3>
          </div>
          <Link to={'login'}>
            <button className='border border-white-300 rounded-md text-white uppercase mt-20 hover:cursor-pointer start_button'>Commencer</button>
          </Link>
        </div>
        <div className='fixed z-20 inset-0 h-full w-full bg-primary'>
          <img className="object-fit" src={bgHome} alt="F4" />
        </div>
      </div>
    </div>
  );
}

export default Home;