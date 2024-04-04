import './style.scss';
import { FC } from 'react';
import UserAuthentication from '../../shared/UserAuthentication';
import Button from '../../shared/UserAuthentication/Button';

const CheckPassword: FC = () => (
  <UserAuthentication
    title="Vérifiez votre e-mail"
    subTitle="Des instructions ont été envoyé dans votre boîte e-mail. Merci de le vérifier."
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
  </UserAuthentication>
);

export default CheckPassword;
