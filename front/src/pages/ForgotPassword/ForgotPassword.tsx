import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSendMail from '../../hooks/useAuth';
import Input from '../../shared/inputs/Input';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';

export type InputField = {
  email: string;
};

const ForgotPassword: FC = () => {
  const { control, handleSubmit } = useForm<InputField>();
  const onSubmit = handleSubmit((data) => );

  const sendMail =(data: InputField)=> {
      useSendMail(data)
  }

  return (
    <UserAuthenticationLayout
      showLogo
      showLoginLink
      title="Mot de passe oublié?"
      subTitle="Entrer dans le champ correspondant l'adresse e-mail que vous utilisez habituellement pour changer votre mot de passe."
      contentTitle="Récupération"
    >
      <form onSubmit={onSubmit}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
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
        <Button type="submit">Envoyer</Button>
      </form>
    </UserAuthenticationLayout>
  );
};

export default ForgotPassword;
