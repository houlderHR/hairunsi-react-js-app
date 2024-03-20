import React from 'react';
import bgLogin from '../../assets/images/bg-login.svg';
import './Login.scss';

const Login = () => {
  return (
    <div className='flex'>
      <div className='relative h-screen w-1/3 bg-red-300'>
        <div className="">
          <h2>Bienvenue sur HaiRun SI !</h2>
          <p>Prêt à démarrer votre journée ? Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités</p>
        </div>
        <img src={bgLogin} alt="" className="bg-primary fixed inset-0 h-full" />
      </div>
      <div className='w-2/3 bg-green-200'>

      </div>
    </div>
  )
}

export default Login;