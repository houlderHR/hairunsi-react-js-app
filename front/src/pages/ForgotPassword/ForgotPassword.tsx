import { FC } from 'react';
import Input from '../../shared/inputs/Input';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';

const ForgotPassword: FC = () => (
  <UserAuthenticationLayout
    showLogo
    showLoginLink
    title="Mot de passe oublié?"
    subTitle="Entrer dans le champ correspondant l'adresse e-mail
  que vous utilisez habituellement
  pour changer votre mot de passe."
    contentTitle="Récupération"
  >
    <div className="w-full">
      <p className="text-sm text-gray-1 mb-12 font-medium leading-4">
        Saisissez votre adresse e-mail dans le champ ci-dessous.
      </p>
      <Input type="email" placeholder="Email" additionalClass="focus:border-secondary border" />
      <Button>Envoyer</Button>
    </div>
  </UserAuthenticationLayout>
);

export default ForgotPassword;
