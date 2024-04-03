import { FC } from 'react';
import Icon from '../../../../shared/Icon';
import UserAuthentication from '../..';
import Button from '../../Button';

const ResetPasswordSuccess: FC = () => (
  <UserAuthentication
    title="Réinitialisation de
  mot de passe réussi"
  >
    <div className="flex flex-col justify-center items-center">
      <Icon
        name="confeti"
        size={112}
        className="text-secondary mb-12 hover:text-primary duration-300"
      />
      <h3 className="font-medium text-3xl text-black-1 leading-9 mb-1">F&eacute;licitation</h3>
      <span className="text-gray-1 text-sm leading-4 font-medium">
        Votre mot de passe a été créé avec succès. Vous pouvez maintenant accéder à votre espace
        privé.
      </span>
      <Button>
        <span className="flex flex-row items-center justify-center w-full gap-6">
          Se conn&eacute;cter{' '}
          <span>
            <Icon name="arrow-right" width={18} height={10} />
          </span>
        </span>
      </Button>
    </div>
  </UserAuthentication>
);
export default ResetPasswordSuccess;
