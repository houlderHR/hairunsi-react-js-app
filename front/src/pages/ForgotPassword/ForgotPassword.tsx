import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../shared/inputs/Input';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';

type InputField = {
  email: string;
};

const ForgotPassword: FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<InputField>();
  const onSubmit = handleSubmit((data) => console.log(data));
  const { onChange, onBlur, name, ref } = register('email');
  return (
    <UserAuthenticationLayout
      showLogo
      showLoginLink
      title="Mot de passe oublié?"
      subTitle="Entrer dans le champ correspondant l'adresse e-mail
  que vous utilisez habituellement
  pour changer votre mot de passe."
      contentTitle="Récupération"
    >
      <form onSubmit={onSubmit}>
        <input onChange={onChange} onBlur={onBlur} name={name} ref={ref} />
        <button
          type="button"
          onClick={() => {
            setValue('email', 'test');
          }}
        >
          ENVOYER
        </button>
      </form>
      {/* <form>
        <div className="w-full">
          <p className="text-sm text-gray-1 mb-12 font-medium leading-4">
            Saisissez votre adresse e-mail dans le champ ci-dessous.
          </p>
          <Input type="email" placeholder="Email" additionalClass="focus:border-secondary border" />
          <Button>Envoyer</Button>
        </div>
      </form> */}
    </UserAuthenticationLayout>
  );
};

export default ForgotPassword;
