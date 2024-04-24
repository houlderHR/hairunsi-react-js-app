import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import useCheckPasswordValidationLink from '../../hooks/useResetPasswordValidationLink';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import InputIcon from '../../shared/inputs/InputIcon';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
import InputType from '../../shared/UserAuthenticationLayout/constants';
import http from '../../utils/http-common';

const mapError = (
  error: { property: string; constraints: Record<string, string> }[],
  cb: (property: 'password' | 'confirmPassword', type: 'min' | 'matches' | 'oneOf') => void,
) => {
  let property: 'password' | 'confirmPassword' = 'password';
  let type: 'min' | 'matches' | 'oneOf' = 'min';
  for (let i = 0; i < error.length; i += 1) {
    if (error[i].property === 'password') {
      property = 'password';
      if (error[i].constraints.isStrongPassword) {
        type = 'matches';
      }
      if (error[i].constraints.minLength) {
        type = 'min';
      }
      break;
    }
    property = 'confirmPassword';
    type = 'oneOf';
  }
  cb(property, type);
};

const schema = yup.object({
  password: yup
    .string()
    .min(8, 'doit contenir au moin 8 caractères')
    .required()
    .matches(/^(?=.*[A-Z])/, '  doit contenir au moin une lettre majuscule')
    .matches(/^(?=.*[0-9])/, '  doit contenir au moin un nombre')
    .matches(/^(?=.*[!@#$%^&§_*])/, '  doit contenir au moin une caractère spéciale'),
  confirmPassword: yup
    .string()
    .required(' doit etre requis')
    .oneOf([yup.ref('password')], ' doit correspondre'),
});

const ResetPassword = () => {
  const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);
  const { isUrlValid, isValidationLoading, isUrlError, token } = useCheckPasswordValidationLink();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const toggleInputType = () => {
    if (inputType === InputType.TEXT) {
      setInputType(InputType.PASSWORD);
    } else {
      setInputType(InputType.TEXT);
    }
  };

  const onSubmit = async (data: {
    password: string | undefined;
    confirmPassword: string | undefined;
  }) => {
    try {
      await http.post('auth/reset-password', data, {
        headers: {
          token_password: token,
        },
      });

      navigate(routes.unauthenticated.subpaths.resetPasswordSuccess.path);
    } catch (error) {
      const responseError = error as AxiosError;
      if (responseError.response?.status === 500) {
        navigate(routes.unauthenticated.subpaths.errorResetPassword.path);
      }

      if (responseError.response?.status === 422) {
        const err = responseError.response?.data?.error;
        mapError(err, (property, type) => {
          setError(property, { type });
        });
      }
    }
  };

  return (
    <UserAuthenticationLayout
      title="Créer un nouveau mot de passe"
      subTitle="Saisissez votre nouveau mot de passe pour accéder de nouveau à vote compte."
      contentTitle="Réinitialisation"
      showLogo
      showLoginLink
    >
      {isValidationLoading && <p>Chargement ...</p>}
      {isUrlError && (
        <p className="text-xs lg:text-sm text-gray-1 font-medium text-center leading-4">
          Votre lien de réinitialisation du mot de passe est éxpiré,veuillez
          <strong>
            <NavLink
              className="text-secondary"
              to={routes.unauthenticated.subpaths.forgotPassword.path}
            >
              &nbsp;rééssayer
            </NavLink>
          </strong>
          !
        </p>
      )}
      {/* {JSON.stringify(errors)} */}
      {!isUrlValid && (
        <>
          <p className="text-xs lg:text-sm text-gray-1 font-medium leading-4">
            Entrez et confirmez votre nouveau mot de passe
          </p>
          <div className="text-xs lg:text-sm font-medium leading-4 text-gray-1 mt-12">
            <h4>Afin de prot&eacute;ger votre compte, votre mot de passe doit :</h4>
            <ul className="list-disc mt-4 list-inside">
              <li className={twMerge(errors.password?.type === 'min' && 'text-red-500')}>
                Au moins contenir 8 charact&egrave;res
              </li>
              <li className={twMerge(errors.password?.type === 'matches' && 'text-red-500')}>
                Contenir au moins une majuscule, un charactère sp&eacute;cial et un chiffre
              </li>
              <li>Ne pas contenir vos donn&eacute;es personnels</li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 flex flex-col cursor-pointer gap-5 w-full"
          >
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <div className="relative">
                  <InputIcon
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    value={value}
                    endIcon={
                      <Icon
                        name="eye"
                        className="hover:text-secondary !h-3 lg:h-[15px]"
                        onClick={toggleInputType}
                        height={15}
                        width={22}
                      />
                    }
                    additionalClass={twMerge(
                      errors.password &&
                        'outline-red-500 outline outline-2 text-red-500 !border-transparent ',
                      'bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl pr-10',
                    )}
                    additionalInputClass={twMerge(
                      'text-base text-sm 2xl:text-base !py-3 xl:!py-4 placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 ',
                      errors.password && 'placeholder:text-red-400',
                    )}
                    placeholder="Nouveau mot de passe"
                    type={inputType}
                  />
                  {errors.password && (
                    <span className="text-red-500 absolute left-1 top-full mt-0.5 text-xs font-medium">
                      Le mot de passe {errors.password.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <div className="relative">
                  <InputIcon
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    value={value}
                    endIcon={
                      <Icon
                        name="eye"
                        className="hover:text-secondary !h-3 lg:h-[15px]"
                        onClick={toggleInputType}
                        height={15}
                        width={22}
                      />
                    }
                    additionalClass={twMerge(
                      errors.confirmPassword &&
                        'outline-red-500 outline text-red-500 outline-2 placeholder:text-red-500 !border-transparent',
                      'bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl pr-10',
                    )}
                    additionalInputClass={twMerge(
                      'text-base text-sm 2xl:text-base !py-3 xl:!py-4 placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 ',
                      errors.confirmPassword && 'placeholder:text-red-400',
                    )}
                    placeholder="Nouveau mot de passe"
                    type={inputType}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 absolute left-1 top-full mt-1 text-xs font-medium">
                      Le mot de passe {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Button disabled={isLoading}>CONFIRMER</Button>
          </form>
        </>
      )}
    </UserAuthenticationLayout>
  );
};

export default ResetPassword;
