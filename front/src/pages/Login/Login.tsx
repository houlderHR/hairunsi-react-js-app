import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import Input from '../../shared/inputs/Input';
import InputIcon from '../../shared/inputs/InputIcon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import InputType from '../../shared/UserAuthenticationLayout/constants';
import http from '../../utils/http-common';

interface IUser {
  'E-mail': string;
  'Mot de passe': string;
}

const Login = () => {
  const [match, setMatch] = useState<string>('');
  const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);

  const toggleInputType = () => {
    if (inputType === InputType.TEXT) {
      setInputType(InputType.PASSWORD);
    } else {
      setInputType(InputType.TEXT);
    }
  };
  const { register, handleSubmit } = useForm<IUser>();
  const email = register('E-mail');
  const pass = register('Mot de passe');

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    let response;
    try {
      response = await http.post('/auth/login', {
        email: data['E-mail'],
        password: data['Mot de passe'],
      });
      window.localStorage.setItem('user', response.data);
      window.location.replace('/accueil');
    } catch (error) {
      const err = error.response.data;
      if (err.status === 422) {
        err.error.map((e) => {
          if (e.constraints.matches) {
            return setMatch(e.constraints.matches);
          }
          return '';
        });
      }
      if (err.status === 404) {
        setMatch(err.error);
      }
      if (err.status === 401) {
        setMatch(err.error);
      }
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
        <form className="mt-12 flex flex-col gap-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Adresse e-mail"
            additionalClass="!py-3 xl:!py-4 text-sm 2xl:text-base"
            type="text"
            refs={email.ref}
            name={email.name}
            onChange={email.onChange}
            onBlur={email.onBlur}
            required
          />
          <InputIcon
            required
            inputs={pass}
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

          <div className="text-red-500 my-0 ml-0 font-thin flex justify-start">{match}</div>
          <button
            type="submit"
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
        </form>
      </div>
    </UserAuthenticationLayout>
  );
};

export default Login;
