import './style.scss';
import { FC } from 'react';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';

const CheckEmailToResetPassword: FC = () => (
  <UserAuthenticationLayout
    title="Vérifiez votre e-mail"
    contentTitle="Vérification"
    subTitle="Des instructions ont été envoyées dans votre boîte e-mail. Merci de le vérifier."
    showLogo
    showLoginLink
  >
    <div className="container-check-password">
      <div className="content">
        <div className="description">
          V&eacute;rifiez votre bo&icirc;te e-mail. Pour r&eacute;initialiser votre mot de passe,
          suivez les instructions envoy&eacute;es dans votre boî&icirc;te e-mail.
        </div>
        <div className="confirmation">
          Vous n&apos;avez pas re&ccedil;u d&apos;e-mail ? V&eacute;rifiez vos spam ou essayez une
          autre adresse e-mail ou cliquez sur le bouton ci-dessous
        </div>
      </div>
      <div className="button">
        <Button>RENVOYER</Button>
      </div>
    </div>
  </UserAuthenticationLayout>
);

export default CheckEmailToResetPassword;
