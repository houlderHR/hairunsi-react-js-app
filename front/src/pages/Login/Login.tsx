import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../shared/Icon';
import Input from '../../shared/inputs/Input';
import InputIcon from '../../shared/inputs/InputIcon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import InputType from '../../shared/UserAuthenticationLayout/constants';

const Login = () => {
  const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);

  const toggleInputType = () => {
    if (inputType === InputType.TEXT) {
      setInputType(InputType.PASSWORD);
    } else {
      setInputType(InputType.TEXT);
    }
  };

  return (
    <UserAuthenticationLayout
      showLogo
      title="Bienvenue sur HaiRun SI !"
      subTitle="Prêt à démarrer votre journée ?
    Connectez-vous avec votre identifiant et mot de passe
    pour caccéder à la plateforme et ces fonctionnalités."
    >
      <div className="text-center w-full">
        <h2 className="mt-20 text-[32px] text-black-1">Connexion</h2>
        <h3 className="text-[14px] text-gray-1 md:px-20">
          Merci de vous connecter à votre compte HaiRun SI
        </h3>
        <div className="mt-12 flex flex-col gap-y-5 w-full">
          <Input placeholder="Adresse e-mail" type="text" />
          <InputIcon
            endIcon={
              <Icon
                name="eye"
                className="hover:text-secondary"
                onClick={toggleInputType}
                height={15}
                width={22}
              />
            }
            additionalClass="bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl"
            additionalInputClass="text-base placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 "
            placeholder="Mot de passe"
            type={inputType}
          />
          <div className="flex justify-left text-gray-1 mb-4">
            <label htmlFor="remember">
              <input type="checkbox" name="" id="remember" /> &nbsp;&nbsp;&nbsp;Se souvenir de moi
            </label>
          </div>
          <button
            type="button"
            className="mt-2 mb-20 px-2 py-3 border bg-grey1 text-white text-[14px] rounded-md uppercase bg-gray-7"
          >
            Se connecter
          </button>
          <hr className="mx-20" />
          <span className="text-black1 mt-8 text-[14px]">
            Mot de passe oublié?{' '}
            <Link to="/">
              <b>Cliquez ici.</b>
            </Link>
          </span>
        </div>
      </div>
    </UserAuthenticationLayout>
  );
};

export default Login;
