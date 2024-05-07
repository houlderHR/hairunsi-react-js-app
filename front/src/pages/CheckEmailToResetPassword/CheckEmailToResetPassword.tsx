import './style.scss';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckTokenSendMail, useSendMail } from '../../hooks/useAuth';
import routes from '../../routes/paths';
import Loading from '../../shared/Loading/Loading';
import UserAuthenticationLayout from '../../shared/UserAuthenticationLayout';
import Button from '../../shared/UserAuthenticationLayout/Button';
import { EMAIL_RESET_PW, TOKEN_RESEND_MAIL } from '../../utils/token-const';

const CheckEmailToResetPassword: FC = () => {
  const [errorAxios, setErrorAxios] = useState('');
  const mutation = useSendMail();
  const navigate = useNavigate();
  const [isAuthorize, setIsAuthorize] = useState(false);
  const checkEmail = localStorage.getItem(EMAIL_RESET_PW);
  const { data, isLoading } = useCheckTokenSendMail();

  useEffect(() => {
    if (!isLoading) {
      setIsAuthorize(true);
      if (!data || checkEmail === null || checkEmail === '') {
        localStorage.removeItem(EMAIL_RESET_PW);
        localStorage.removeItem(TOKEN_RESEND_MAIL);
        navigate(routes.unauthenticated.subpaths.login.path);
      }
    }
  }, [setIsAuthorize, data, checkEmail, isLoading, navigate]);

  const resendEmail = async () => {
    try {
      const email = checkEmail || '';
      await mutation.mutateAsync({ email });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 500) navigate(routes.server_error.path);
        setErrorAxios(err.response?.data);
      } else {
        setErrorAxios("Une erreur s'est produite");
      }
    }
  };
  if (isAuthorize)
    return (
      <UserAuthenticationLayout
        title={
          <span>
            Vérifiez votre <br />
            e-mail
          </span>
        }
        contentTitle="Vérification"
        subTitle="Des instructions ont été envoyées dans votre boîte e-mail. Merci de le vérifier."
        showLogo
        showLoginLink
      >
        <div className="container-check-password">
          <div className="content">
            <div className="description">
              V&eacute;rifiez votre bo&icirc;te e-mail. Pour r&eacute;initialiser votre mot de
              passe, suivez les instructions envoy&eacute;es dans votre bo&icirc;te e-mail.
            </div>
            <div className="confirmation">
              Vous n&apos;avez pas re&ccedil;u d&apos;e-mail ? V&eacute;rifiez vos spam ou essayez
              une autre adresse e-mail ou cliquez sur le bouton ci-dessous
            </div>
          </div>
          {mutation.isPending && <Loading />}
          {!mutation.isPending && !errorAxios && (
            <div className="button">
              <Button type="button" onClick={resendEmail}>
                RENVOYER
              </Button>
            </div>
          )}
          {errorAxios && <p className="text-red-500 text-sm pt-2">{errorAxios}</p>}
        </div>
      </UserAuthenticationLayout>
    );
  return null;
};

export default CheckEmailToResetPassword;
