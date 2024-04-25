import './style.scss';
import axios from 'axios';
import { FC, useState } from 'react';
import useSendMail from '../../hooks/useAuth';
import Loading from '../../shared/Loading/Loading';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
import { EMAIL_RESET_PW } from '../../utils/react-query-key';

const CheckEmailToResetPassword: FC = () => {
  const [errorAxios, setErrorAxios] = useState('');
  const mutation = useSendMail();
  const resendEmail = async () => {
    try {
      const email = localStorage.getItem(EMAIL_RESET_PW) || '';
      await mutation.mutateAsync({ email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorAxios(error.response?.data.error);
      } else {
        setErrorAxios("Une erreur s'est produite");
      }
    }
  };

  return localStorage.getItem(EMAIL_RESET_PW) ? (
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
            suivez les instructions envoy&eacute;es dans votre bo&icirc;te e-mail.
          </div>
          <div className="confirmation">
            Vous n&apos;avez pas re&ccedil;u d&apos;e-mail ? V&eacute;rifiez vos spam ou essayez une
            autre adresse e-mail ou cliquez sur le bouton ci-dessous
          </div>
        </div>
        {mutation.isPending ? (
          <Loading />
        ) : (
          <div className="button">
            <Button type="button" onClick={resendEmail}>
              RENVOYER
            </Button>
          </div>
        )}
      </div>
    </UserAuthenticationLayout>
  ) : (
    <div>Veuillez réessayer après 2 jours</div>
  );
};

export default CheckEmailToResetPassword;
