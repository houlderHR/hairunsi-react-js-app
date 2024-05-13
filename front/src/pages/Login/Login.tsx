import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../../hooks/useAuth';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import Input from '../../shared/inputs/Input';
import InputIcon from '../../shared/inputs/InputIcon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import InputType from '../../shared/UserAuthenticationLayout/constants';
import manageErrorMessage from '../../utils/manageError';
import { REGEX_EMAIL } from '../../utils/regex';

const user = yup
  .object()
  .shape({
    email: yup.string().default('test@hairun-technology.com').max(255).matches(REGEX_EMAIL, {
      message: 'Vérifiez votre adresse email ! (vous@hairun-technology.com)',
    }),
    password: yup.string().default(undefined).required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const [match, setMatch] = useState<string[]>([]);
  const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);

  const toggleInputType = () => {
    if (inputType === InputType.TEXT) {
      setInputType(InputType.PASSWORD);
    } else {
      setInputType(InputType.TEXT);
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(user),
  });

  const onSubmit: SubmitHandler<{
    email?: string | undefined;
    password?: string | undefined;
  }> = async (data: { email?: string | undefined; password?: string | undefined }) => {
    const rememberMe = document.getElementById('remember') as HTMLInputElement;

    try {
      const response = await login(data.email, data.password, rememberMe);
      window.localStorage.setItem('token', response.data);
      navigate(routes.authentified.subpaths.accueil.path);
    } catch (error) {
      console.log('ERROR: ', error);

      const exceptions = error as AxiosError;
      if (exceptions.code === 'ERR_NETWORK') navigate(routes.server_error.path);
      setMatch(manageErrorMessage(exceptions));
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
      subTitle={
        <>
          Prêt à démarrer votre journée?
          <br />
          Connectez-vous avec votre identifiant et mot de passe pour accéder à la plateforme et ces
          fonctionnalités.
        </>
      }
      contentTitle="Connexion"
    >
      <div className="w-full text-center">
        <h3 className="text-xs lg:text-[14px] font-medium mt-0 3xl:mt-20 text-gray-1 text-center">
          Merci de vous connecter à votre compte HaiRun SI.
        </h3>
        <form className="mt-12 flex flex-col gap-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col relative">
            <Controller
              control={control}
              name="email"
              render={({ field: { ref, onChange, onBlur, value } }) => (
                <Input
                  placeholder="Adresse e-mail"
                  additionalClass={
                    (watch('email')?.match(REGEX_EMAIL) && value?.length > 0) || !watch('email')
                      ? '!py-3 xl:!py-4 text-sm 2xl:text-base'
                      : '!py-3 xl:!py-4 text-sm 2xl:text-base !border-1 !border-red-500'
                  }
                  type="text"
                  refs={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  required
                />
              )}
            />
            {watch('email') && errors && errors.email && (
              <div className="absolute text-red-500 my-0 ml-0 font-medium text-xs flex justify-start top-full mt-1 leading-none">
                {errors.email.message}
              </div>
            )}
          </div>
          <Controller
            control={control}
            name="password"
            render={({ field: { ref, onChange, onBlur, value } }) => (
              <InputIcon
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
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
                additionalInputClass="text-base placeholder:text-gray-1 text-sm 2xl:text-base leading-3 !py-3 xl:!py-4 focus:placeholder:opacity-0 pr-10"
                placeholder="Mot de passe"
                type={inputType}
              />
            )}
          />
          <div className="flex justify-left text-gray-1 mb-1">
            <label className="flex flex-row items-center" htmlFor="remember">
              <input type="checkbox" name="" id="remember" className="w-[18px] h-[18px]" />
              <span className="text-sm lg:text-sm inline-block ml-4">Se souvenir de moi</span>
            </label>
          </div>

          <div className="flex flex-col relative 2xl:mb-20 mb-10">
            <button
              type="submit"
              className={
                !watch('email')?.match(REGEX_EMAIL) || !watch('password')
                  ? 'mt-1 px-2 py-3 text-sm border text-white text-[14px] rounded-md uppercase bg-[#DEDEDE] !cursor-not-allowed'
                  : 'mt-1 px-2 py-3 text-sm border text-white text-[14px] rounded-md uppercase bg-primary'
              }
            >
              Se connecter
            </button>
            <div className="absolute top-full mt-1 flex flex-col justify-start items-start text-start">
              {!errors.email &&
                match.map((message: string) => (
                  <div
                    className="leading-none text-red-500 my-0 ml-0 text-xs font-medium"
                    key={message}
                  >
                    {message}
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <hr className="mx-20" />
            <span className="text-black-1 mt-7 text-sm lg:text-[14px]">
              Mot de passe oublié?&nbsp;
              <Link to={routes.unauthenticated.subpaths.forgotPassword.path}>
                <b>Cliquez ici.</b>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </UserAuthenticationLayout>
  );
};

export default Login;
