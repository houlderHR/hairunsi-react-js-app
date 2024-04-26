import axios from 'axios';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useSendMail from '../../hooks/useAuth';
import { TOKEN_QUERY_PARAM } from '../../hooks/useResetPasswordValidationLink';
import Input from '../../shared/inputs/Input';
import Loading from '../../shared/Loading/Loading';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
import { EMAIL_RESET_PW } from '../../utils/react-query-key';
import REGEX_MAIL_HAIRUN from '../../utils/regex';

export type InputField = {
  email: string;
};
const ForgotPassword: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputField>();
  const mutation = useSendMail();
  const navigate = useNavigate();
  const [errorAxios, setErrorAxios] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await mutation.mutateAsync(data);
      localStorage.setItem(TOKEN_QUERY_PARAM, result.token);
      navigate('/check-email');
      localStorage.setItem(EMAIL_RESET_PW, data.email);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) setErrorAxios(error.response?.data.error);
        else setErrorAxios(error.response?.data);
      } else {
        setErrorAxios("Une erreur s'est produite");
      }
    }
  });

  return (
    <UserAuthenticationLayout
      showLogo
      showLoginLink
      title="Mot de passe oublié?"
      subTitle="Entrer dans le champ correspondant l'adresse e-mail que vous utilisez habituellement pour changer votre mot de passe."
      contentTitle="Récupération"
    >
      {mutation.isPending ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit} className="w-full">
          <p className="text-sm text-gray-1 mb-12 font-medium leading-4">
            Saisissez votre adresse e-mail dans le champ ci-dessous.
          </p>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: 'Remplir le champ' },
              pattern: {
                value: REGEX_MAIL_HAIRUN,
                message: 'Le mail doit se terminer par @hairun-technology.com',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="email"
                placeholder="Email"
                additionalClass="focus:border-secondary border"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm pt-2">{errors.email.message}</p>}
          {errorAxios && <p className="text-red-500 text-sm pt-2">{errorAxios}</p>}
          <Button type="submit">Envoyer</Button>
        </form>
      )}
    </UserAuthenticationLayout>
  );
};

export default ForgotPassword;
