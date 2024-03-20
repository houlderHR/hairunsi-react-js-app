import React from 'react';
import bgHome from '../../assets/images/bg-home.svg';
import './Home.scss';

const Home = () => {
  return (
    <div  className='container-tmp h-screen w-screen'>
      <div className='relative w-full h-full bg-primary flex justify-center flex-items-center'>
        {/* <div className="absolute inset-0 bg-no-repeat bg-center bg-cover" style={{backgroundImage: `url(${bgHome})`}}></div> */}
        <div className='absolute text-center z-50 flex-col justify-center justify-items-center justify-self-center w-full h-full'>
          <div className="flex justify-center items-center">  
            <img src="src/assets/images/logo.png" className='' alt="F4" />
          </div>
          <div className='mt-20 text-white'>
            <h2 className='welcome_text'>Bienvenue sur HaiRun SI!</h2>
            <h3 className='font-bold'>Une plateforme de gestion et d'organisation en interne de vos rêves.</h3>
          </div>
          <button className='border border-white-300 rounded-md text-white uppercase mt-20 start_button'>Commencer</button>
        </div>
        <img className="absolute h-full w-full z-20 inset-0 bg-no-repeat bg-center bg-primary bg-cover" src={bgHome} alt="F4" />
      </div>
    </div>
  );
}

export default Home;