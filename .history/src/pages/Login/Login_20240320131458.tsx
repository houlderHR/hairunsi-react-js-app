import React from 'react';
import bgLogin from '../../assets/images/bg-login.svg';
import logo from '../../assets/images/logo1.png';
import './Login.scss';

const Login = () => {
  return (
    <div className='flex'>
      <div className='relative h-screen left_grid bg-red-300'>
        <div className="absolute z-20 text-white px-24 description_welcome">
          <h2 className='welcome_login p-0 m-0'>Bienvenue sur</h2>
          <span className='welcome_login font-bold'>HaiRun SI !</span>
          <p className='mt-2 desc_login'>Prêt à démarrer votre journée ?<br /> Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités</p>
        </div>
        <img src={bgLogin} alt="" className="bg-primary absolute z-10 object-fill inset-0 h-full w-full" />
      </div>
      <div className='w-full h-full flex justify-center flex-items-center'>
        <div>
          <img src={logo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login;