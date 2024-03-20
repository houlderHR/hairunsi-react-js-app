import React from 'react';
import bgHome from '../../assets/images/bg-home.svg';
import './Home.scss';

const Home = () => {
  return (
    <div  className='container flex justify-center items-center h-screen w-screen'>
      <div className='relative w-full h-full bg-primary'>
        <div className="absolute top-0 inset-0 bg-no-repeat bg-center bg-cover" style={{backgroundImage: `url(${bgHome})`}}></div>
        {/* <img className="absolute inset-0 bg-no-repeat bg-center bg-primary bg-cover" src={bgHome} alt="F4" /> */}
        <div className='text-center flex-col justify-center justify-items-center justify-self-center w-full h-full'>
          <div className="flex justify-center items-center">  
            <img src="src/assets/images/logo.png" className='' alt="F4" />
          </div>
          <div className='mt-20 text-white'>
            <h2 className='welcome_text'>Bienvenue sur HaiRun SI!</h2>
            <h3 className='font-bold'>Une plateforme de gestion et d'organisation en interne de vos rêves.</h3>
          </div>
          <button className='border border-white-300 rounded-md text-white uppercase mt-20 start_button'>Commencer</button>
        </div>
      </div>
    </div>
  );
}

export default Home;