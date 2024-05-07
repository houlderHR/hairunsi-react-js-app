import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import useResetPassword from '../../hooks/useResetPassword';
import routes from '../../routes/paths';
import Icon from '../../shared/Icon';
import InputIcon from '../../shared/inputs/InputIcon';
import Spinner from '../../shared/Spinner';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
import InputType from '../../shared/UserAuthenticationLayout/constants';
import http from '../../utils/http-common';
import { EMAIL_RESET_PW, TOKEN_RESEND_MAIL } from '../../utils/token-const';

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
    .oneOf([yup.ref('password')], ' ne correspond pas'),
});

type ResetPasswordErrorType = {
  status: number;
  error: { property: string; constraints: Record<string, string> }[];
};

const ResetPassword = () => {
  const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);
  const { isUrlValid, isValidationLoading, isUrlError, token, mapError, refetch, isFetching } =
    useResetPassword();
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, disabled },
    setError,
    setFocus,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const navigate = useNavigate();
  localStorage.removeItem(TOKEN_RESEND_MAIL);
  localStorage.removeItem(EMAIL_RESET_PW);
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

      navigate(routes.unauthenticated.subpaths.resetPasswordSuccess.path, {
        state: { isResetPasswordSuccess: true },
      });
    } catch (error) {
      const responseError = error as AxiosError;
      if (responseError.response?.status === 500) {
        navigate(routes.unauthenticated.subpaths.errorResetPassword.path, {
          state: { isResetPasswordError: false },
        });
      }

      if (responseError.response?.status === 422) {
        const { error: errorResponse } = responseError.response?.data as ResetPasswordErrorType;
        mapError(errorResponse, (property, type, message) => {
          if (Array.isArray(property)) {
            property.map((_property) => setError(_property, { type, message }));
            setFocus(property[0]);
            return;
          }
          setError(property, { type, message });
          setFocus(property);
        });
      }

      if (responseError.response?.status === 410) {
        refetch();
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
      {(isValidationLoading || isFetching) && <Spinner />}
      {isUrlError && (
        <p className="md:w-[50vw] w-full text-xs lg:text-sm text-gray-1 font-medium text-center leading-4">
          Votre lien de r&eacute;initialisation du mot de passe est &eacute;xpir&eacute;,veuillez
          <strong>
            <NavLink
              className="text-secondary"
              to={routes.unauthenticated.subpaths.forgotPassword.path}
            >
              &nbsp;r&eacute;&eacute;ssayer
            </NavLink>
          </strong>
          !
        </p>
      )}
      {isUrlValid && !isFetching && (
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
              <li
                className={twMerge(
                  errors.password?.type === 'containPersonalInformation' && 'text-red-500',
                )}
              >
                Ne pas contenir vos donn&eacute;es personnels
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 flex flex-col cursor-pointer gap-7 md:gap-5 w-full"
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
                      errors.password && '!border-red-500 border !border-1 text-red-500',
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
                    <span className="text-red-500 absolute left-1 leading-[11px] top-full mt-0.5 text-xs font-medium">
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
                    additionalClass={twMerge(
                      errors.confirmPassword &&
                        '!border-red-500 border !border-1 text-red-500 placeholder:text-red-500',
                      'bg-transparent border rounded border-gray-1 active:border-secondary border text-base text-xl pr-10',
                    )}
                    additionalInputClass={twMerge(
                      'text-base text-sm 2xl:text-base !py-3 xl:!py-4 placeholder:text-gray-1 leading-3 py-4 focus:placeholder:opacity-0 ',
                      errors.confirmPassword && 'placeholder:text-red-400',
                    )}
                    placeholder="Confirmer votre mot de passe"
                    type={inputType}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 absolute left-1 leading-[11px] top-full mt-0.5 text-xs font-medium">
                      Le mot de passe {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Button
              type="submit"
              additionalClass="flex flex-row items-center justify-center gap-2 justify-center"
              disabled={isLoading || isSubmitting || disabled}
            >
              CONFIRMER
              {isSubmitting && <Spinner />}
            </Button>
          </form>
        </>
      )}
    </UserAuthenticationLayout>
  );
};

export default ResetPassword;
