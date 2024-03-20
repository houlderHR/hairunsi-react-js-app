import React from 'react';
import bgLogin from '../../assets/images/bg-login.svg';
import './Login.scss';

const Login = () => {
  return (
    <div className='flex'>
      <div className='relative h-screen left_grid bg-red-300'>
        <div className="absolute z-20 text-white flex flex-col justify-center justify-items-center justify-self-center h-full bg-red-200">
          <h2 className=''>Bienvenue sur HaiRun SI !</h2>
          <p>Prêt à démarrer votre journée ? Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités</p>
        </div>
        <img src={bgLogin} alt="" className="bg-primary absolute z-10 object-fill inset-0 h-full w-full" />
      </div>
      <div className=''>

      </div>
    </div>
  )
}

export default Login;