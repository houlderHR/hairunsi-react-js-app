import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/paths';
import Icon from '../../../shared/Icon';
import UserAuthentication from '..';
import Button from '../Button';

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
        Votre mot de passe a &eacute;t&eacute; cr&eacute;&eacute; avec succ&egrave;s. Vous pouvez
        maintenant acc&eacute;der &agrave; votre espace priv&eacute;.
      </span>
      <Button>
        <NavLink
          to={routes.unauthenticated.subpaths.login.path}
          className="flex flex-row items-center justify-center h-full w-full gap-6"
        >
          Se conn&eacute;cter
          <span>
            <Icon name="arrow-right" width={18} height={10} />
          </span>
        </NavLink>
      </Button>
    </div>
  </UserAuthentication>
);

export default ResetPasswordSuccess;
