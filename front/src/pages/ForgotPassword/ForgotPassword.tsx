import axios from 'axios';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useSendMail from '../../hooks/useAuth';
import Input from '../../shared/inputs/Input';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
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
      await mutation.mutateAsync(data);
      navigate('/check-email');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorAxios(error.response?.data.error);
      } else {
        setErrorAxios('An error occurred');
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
    </UserAuthenticationLayout>
  );
};

export default ForgotPassword;
