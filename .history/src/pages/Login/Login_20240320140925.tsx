import React from 'react';
import bgLogin from '../../assets/images/bg-login.svg';
import logo from '../../assets/images/logo1.png';
import './Login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex h-screen'>
      <div className='relative h-screen left_grid bg-red-300'>
        <div className="absolute z-20 text-white px-24 description_welcome">
          <h2 className='welcome_login p-0 m-0' >Bienvenue sur</h2>
          <span className='welcome_login font-bold'>HaiRun SI !</span>
          <p className='mt-2 desc_login'>Prêt à démarrer votre journée ?<br /> Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités</p>
        </div>
        <img src={bgLogin} alt="" className="bg-primary absolute z-10 object-fill inset-0 h-full w-full" />
      </div>
      <div className='w-full h-full flex justify-center'>
        <div className='w-1/3 text-center flex flex-col justify-center flex-items-center'>
          <div className='flex justify-center'>
            <img src={logo} alt="" />
          </div>
          <h2 className='mt-20' style={{fontSize:"32px"}}>Connexion</h2>
          <h3 style={{fontSize:"14px"}}>Merci de vous connecter à votre compte HaiRun SI</h3>
          <div className='mt-10 mb-5'>
            <input type="text" className="border mb-3 px-3 py-3 w-full rounded-md" name="" placeholder="Adresse e-mail" id="" /><br />
            <input type="text" name="" className="border px-3 py-3 w-full rounded-md" placeholder="Mot de passe" id="" />
          </div>
          <div className="flex justify-left text-grey2 mb-4">
            <input type="checkbox" name="" id="remember" />&nbsp;&nbsp;&nbsp; <label htmlFor="remember">Se souvenir de moi</label>
          </div>
          <button className="mt-2 mb-20 px-2 py-3 border bg-grey1 text-white rounded-md uppercase" style={{fontSize:'14px'}}>Se connecter</button>
          <hr className="mx-20"/>
          <span className="text-black1 mt-10" style={{fontSize:'14px'}}>Mot de passe oublié? <Link to={'/'}><b>Cliquez ici.</b></Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login;