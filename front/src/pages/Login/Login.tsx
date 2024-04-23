import { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
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
      title={
        <span>
          Bienvenue sur <br /> <strong>HaiRun SI</strong> !
        </span>
      }
      subTitle="Prêt à démarrer votre journée? Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces fonctionnalités."
      contentTitle="Connexion"
    >
      <div className="text-center w-full">
        <h3 className="text-xs lg:text-[14px] mt-5 3xl:mt-20 text-gray-1 md:px-20">
          Merci de vous connecter à votre compte HaiRun SI
        </h3>
        <div className="mt-12 flex flex-col gap-y-5 w-full">
          <Input
            placeholder="Adresse e-mail"
            additionalClass="!py-3 xl:!py-4 text-sm 2xl:text-base"
            type="text"
          />
          <InputIcon
            endIcon={
              <Icon
                name="eye"
                className="hover:text-secondary !h-3 lg:h-[15px]"
                onClick={toggleInputType}
                height={15}
                width={22}
              />
            }
            additionalClass="bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl"
            additionalInputClass="text-base placeholder:text-gray-1 text-sm 2xl:text-base leading-3 !py-3 xl:!py-4 focus:placeholder:opacity-0 "
            placeholder="Mot de passe"
            type={inputType}
          />
          <div className="flex justify-left text-gray-1 mb-4">
            <label className="flex flex-row items-center" htmlFor="remember">
              <input type="checkbox" name="" id="remember" />
              <span className="text-xs lg:text-sm inline-block ml-2">Se souvenir de moi</span>
            </label>
          </div>
          <button
            type="button"
            className="mt-2 mb-10 2xl:mb-20 px-2 py-3 text-xs lg:text-sm border bg-grey1 text-white text-[14px] rounded-md uppercase bg-gray-7"
          >
            Se connecter
          </button>
          <hr className="mx-20" />
          <span className="text-black-1 mt-8 text-sm lg:text-[14px]">
            Mot de passe oublié?&nbsp;
            <Link to={routes.unauthenticated.subpaths.forgotPassword.path}>
              <b>Cliquez ici.</b>
            </Link>
          </span>
        </div>
      </div>
    </UserAuthenticationLayout>
  );
};

export default Login;
