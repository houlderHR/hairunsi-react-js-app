import React from 'react';
import bgLogin from '../../assets/images/bg-login.svg';
import './Login.scss';

const Login = () => {
  return (
    <div className='flex'>
      <div className='relative h-screen left_grid bg-red-300'>
        <div className="absolute z-20 text-white px-24 desc_welcome">
          <h2 className='welcome_login'>Bienvenue sur</h2>
          <span className='welcome_login font-bold'>HaiRun SI !</span>
          <p className='desc_login'>Prêt à démarrer votre journée ? Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités</p>
        </div>
        <img src={bgLogin} alt="" className="bg-primary absolute z-10 object-fill inset-0 h-full w-full" />
      </div>
      <div className=''>

      </div>
    </div>
  )
}

export default Login;