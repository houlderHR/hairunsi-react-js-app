import React from 'react';
import bgLogin from '../../assets/images/bg-login.svg';
import './Login.scss';

const Login = () => {
  return (
    <div className='flex'>
      <div>
        <div className="r">
          <h2>Bienvenue sur HaiRun SI !</h2>
          <p>Prêt à démarrer votre journée ? Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités</p>
        </div>
        <div>
          <img src={bgLogin} alt="" className="bg-primary absolute"/>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Login;